<?php

/**
 * @license none
 */
namespace FrontendTest;

use Silex\Provider\DoctrineServiceProvider;
use Silex\WebTestCase;

/**
 * Class ControllerTest
 * unit tests for src/controllers.php
 */
class ControllerTest extends WebTestCase
{
    /**
     * Creates the application.
     *
     * @return \Symfony\Component\HttpKernel\HttpKernel
     */
    public function createApplication()
    {
        global $app;
        chdir('src');
        $app = require __DIR__.'/../src/app.php';
        require __DIR__.'/../config/dev.php';
        require __DIR__.'/../src/controllers.php';
        $app['debug'] = true;
        $app['session.test'] = true;
        unset($app['exception_handler']);

        return $app;
    }

    /**
     * Tests the root route /
     */
    public function testReadMe()
    {
        $client = $this->createClient();
        $crawler = $client->request('GET', '/');

        $this->assertTrue($client->getResponse()->isOk());
        $this->assertCount(1, $crawler->filter('h1:contains("README")'));
    }

    /**
     * Tests if the login form shows
     */
    public function testLoginNoUsername()
    {
        $client = $this->createClient();
        $crawler = $client->request('GET', '/login');

        $this->assertTrue($client->getResponse()->isOk());
        $this->assertCount(1, $crawler->filter('form[action="/login"]'));
    }

    /**
     * Tests if the user gets assigned to the session upon login
     * @todo add unit test for incorrect username / password
     */
    public function testLogin()
    {
        $user = [
            'username' => 'user1',
            'password' => 'user1',
        ];
        $db = $this->mockDb(['fetchAssoc']);
        $db->expects($this->any())
            ->method('fetchAssoc')
            ->with("SELECT * FROM users WHERE username = ? and password = ?", [
                'user1',
                'user1',
            ])
            ->willReturn($user);
        $this->app['db'] = $db;
        $client = $this->createClient();
        $client->request('POST', '/login', [
            'username' => 'user1',
            'password' => 'user1',
        ]);

        // check that user is set correctly
        $this->assertEquals($user, $this->app['session']->get('user'));

        // check that client is redirected correctly
        $this->assertEquals(302, $client->getResponse()->getStatusCode());
        $this->assertEquals('/todo', $client->getResponse()->headers->get('location'));
    }

    /**
     * Tests if the user is removed from the session upon logout
     */
    public function testLogout()
    {
        $this->app['session']->set('user', [
            'username' => 'user1',
            'password' => 'user1',
        ]);

        $client = $this->createClient();
        $client->request('GET', '/logout');

        // check that user is removed from the session
        $this->assertEquals(null, $this->app['session']->get('user'));

        // check that client is redirected correctly
        $this->assertEquals(302, $client->getResponse()->getStatusCode());
        $this->assertEquals('/', $client->getResponse()->headers->get('location'));
    }

    /**
     * Test todo api with no user
     */
    public function testTodoNoUser()
    {
        // check that todo page restricted to logged in users
        $this->app['session']->set('user', null);

        $client = $this->createClient();
        $client->request('GET', '/todo/1');
        $this->assertEquals(302, $client->getResponse()->getStatusCode());
        $this->assertEquals('/login', $client->getResponse()->headers->get('location'));
    }

    /**
     * Test todo api list
     */
    public function testTodoList()
    {
        $this->app['session']->set('user', [
            'id' => 1,
            'username' => 'user1',
            'password' => 'user1',
        ]);

        $todos = [
            [
                'id' => 123,
                'user_id' => 1,
                'description' => 'mock todo description',
            ],
        ];

        $db = $this->mockDb(['fetchAll']);
        $db->expects($this->any())
            ->method('fetchAll')
            ->with("SELECT * FROM todos WHERE user_id = ?", [
                1,
            ])
            ->willReturn($todos);
        $this->app['db'] = $db;

        $client = $this->createClient();
        $crawler = $client->request('GET', '/todo');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertCount(1, $crawler->filter('tr td a:contains("mock todo description")'));
        $this->assertCount(1, $crawler->filter('tr td:contains("123")'));
    }

    /**
     * Test todo api single item
     */
    public function testTodoItem()
    {
        $this->app['session']->set('user', [
            'id' => 1,
            'username' => 'user1',
            'password' => 'user1',
        ]);

        $todo = [
                'id' => 123,
                'user_id' => 1,
                'description' => 'mock todo description',
        ];

        $db = $this->mockDb(['fetchAssoc']);

        $db->expects($this->any())
            ->method('fetchAssoc')
            ->with("SELECT * FROM todos WHERE id = ?", [
                123,
            ])
            ->willReturn($todo);
        $this->app['db'] = $db;

        $client = $this->createClient();
        $crawler = $client->request('GET', '/todo/123');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertCount(1, $crawler->filter('h1:contains("Todo:")'));
        $this->assertCount(1, $crawler->filter('tr td:contains("123")'));
        $this->assertCount(1, $crawler->filter('tr td:contains("mock todo description")'));
        $this->assertCount(1, $crawler->filter('form[action="/todo/delete/123"]'));
    }

    /**
     * Test todo api adding with no user
     */
    public function testTodoAddNoUser()
    {
        // check that todo add feature restricted to logged in users
        $this->app['session']->set('user', null);

        $client = $this->createClient();
        $client->request('POST', '/todo/add');
        $this->assertEquals(302, $client->getResponse()->getStatusCode());
        $this->assertEquals('/login', $client->getResponse()->headers->get('location'));
    }

    /**
     * Test todo api adding with user, json response vs non json response
     */
    public function testTodoAdd()
    {
        $this->app['session']->set('user', [
            'id' => 1,
            'username' => 'user1',
            'password' => 'user1',
        ]);

        $db = $this->mockDb(['executeUpdate']);

        $db->expects($this->any())
            ->method('executeUpdate')
            ->with("INSERT INTO todos (user_id, description) VALUES (?, ?)", [
                1,
                'mock todo description',
            ]);
        $this->app['db'] = $db;

        $client = $this->createClient();
        // check JSON request
        $crawler = $client->request('POST', '/todo/add', [
            'description' => 'mock todo description',
            ], [
            ], [
            'CONTENT_TYPE' => 'application/json',
        ]);
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertCount(1, $crawler->filter("p:contains(\"{\"success\": \"true\"}\")"));

        // check non JSON request
        $client->request('POST', '/todo/add', [
            'description' => 'mock todo description',
        ]);
        $this->assertEquals(302, $client->getResponse()->getStatusCode());
        $this->assertEquals('/todo', $client->getResponse()->headers->get('location'));
    }

    /**
     * Test todo api deleting with no user
     */
    public function testTodoDeleteNoUser()
    {
        // check that todo add feature restricted to logged in users
        $this->app['session']->set('user', null);

        $client = $this->createClient();
        $client->request('POST', '/todo/delete/123');
        $this->assertEquals(302, $client->getResponse()->getStatusCode());
        $this->assertEquals('/login', $client->getResponse()->headers->get('location'));
    }

    /**
     * Test todo api deleting with user, json response vs non json response
     */
    public function testTodoDelete()
    {
        $this->app['session']->set('user', [
            'id' => 1,
            'username' => 'user1',
            'password' => 'user1',
        ]);

        $db = $this->mockDb(['executeUpdate']);

        $db->expects($this->any())
            ->method('executeUpdate')
            ->with("DELETE FROM todos WHERE id = ? and user_id = ?", [
                123,
                1,
            ]);
        $this->app['db'] = $db;

        $client = $this->createClient();
        // check JSON request
        $crawler = $client->request('POST', '/todo/delete/123', [
            ], [
            ], [
            'CONTENT_TYPE' => 'application/json',
        ]);
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertCount(1, $crawler->filter("p:contains(\"{\"success\": \"true\"}\")"));

        // check non JSON request
        $client->request('POST', '/todo/delete/123');
        $this->assertEquals(302, $client->getResponse()->getStatusCode());
        $this->assertEquals('/todo', $client->getResponse()->headers->get('location'));
    }

    /**
     * Test todo api completing with no user
     */
    public function testTodoCompleteNoUser()
    {
        // check that todo add feature restricted to logged in users
        $this->app['session']->set('user', null);

        $client = $this->createClient();
        $client->request('POST', '/todo/complete/123');
        $this->assertEquals(302, $client->getResponse()->getStatusCode());
        $this->assertEquals('/login', $client->getResponse()->headers->get('location'));
    }

    /**
     * Test todo api completing with user, json response vs non json response
     */
    public function testTodoComplete()
    {
        $this->app['session']->set('user', [
            'id' => 1,
            'username' => 'user1',
            'password' => 'user1',
        ]);

        $db = $this->mockDb(['executeUpdate']);

        $db->expects($this->any())
            ->method('executeUpdate')
            ->with("UPDATE todos SET completed = 1 WHERE id = ? and user_id = ?", [
                123,
                1,
            ]);
        $this->app['db'] = $db;

        $client = $this->createClient();
        // check JSON request
        $crawler = $client->request('POST', '/todo/complete/123', [
            ], [
            ], [
            'CONTENT_TYPE' => 'application/json',
        ]);
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertCount(1, $crawler->filter("p:contains(\"{\"success\": \"true\"}\")"));

        // check non JSON request
        $client->request('POST', '/todo/complete/123');
        $this->assertEquals(302, $client->getResponse()->getStatusCode());
        $this->assertEquals('/todo', $client->getResponse()->headers->get('location'));
    }

    /**
     * Short hand method for setting up the mocked database service
     * @param $methods
     *
     * @return \PHPUnit_Framework_MockObject_MockObject
     */
    private function mockDb($methods)
    {
        return $this->getMockBuilder(DoctrineServiceProvider::class)
            ->setMethods($methods)
            ->getMock();
    }
}
