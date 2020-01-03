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
        $app = require __DIR__.'/../../src/silex/app.php';
        require __DIR__.'/../../config/dev.php';
        require __DIR__.'/../../src/silex/controllers.php';
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

        $this->assertCount(1, $crawler->filter('div#app'));
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
            ->with("SELECT * FROM users WHERE username = ? and password = SHA2(CONCAT(salt, ?, salt), 256)", [
                'user1',
                'user1',
            ])
            ->willReturn($user);
        $this->app['db'] = $db;
        $client = $this->createClient();
        $client->request('POST', '/login', [], [], [], json_encode([
            'username' => 'user1',
            'password' => 'user1',
        ]));

        // check that user is set correctly
        $this->assertEquals($user, $this->app['session']->get('user'));

        // check that client is redirected correctly
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertEquals("{\"success\":true,\"user\":{\"username\":\"user1\"}}", $client->getResponse()->getContent());
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
        $client->request('POST', '/logout');

        // check that user is removed from the session
        $this->assertEquals(null, $this->app['session']->get('user'));

        // check that client is redirected correctly
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertEquals("{\"success\":true}", $client->getResponse()->getContent());
    }

    /**
     * Test todo api with no user
     */
    public function testTodoNoUser()
    {
        // check that todo page restricted to logged in users
        $this->app['session']->set('user', null);

        $client = $this->createClient();
        $client->request('GET', '/api/v1/todo/1');
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
                'description' => 'mock todo description',
                'completed' => '1',
            ],
        ];

        $db = $this->mockDb(['fetchAll']);
        $db->expects($this->any())
            ->method('fetchAll')
            ->with("SELECT id, description, completed FROM todos WHERE user_id = ?", [
                1,
            ])
            ->willReturn($todos);
        $this->app['db'] = $db;

        $client = $this->createClient();
        $crawler = $client->request('GET', '/api/v1/todo', [], [], ['CONTENT_TYPE' => 'application/json']);
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertEquals('{"success":true,"todos":[{"id":123,"description":"mock todo description","completed":"1"}]}', $client->getResponse()->getContent());
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
            'description' => 'mock todo description',
            'completed' => '1',
        ];

        $db = $this->mockDb(['fetchAssoc']);

        $db->expects($this->any())
            ->method('fetchAssoc')
            ->with("SELECT id, description, completed FROM todos WHERE id = ?", [
                123,
            ])
            ->willReturn($todo);
        $this->app['db'] = $db;

        $client = $this->createClient();
        $crawler = $client->request('GET', '/api/v1/todo/123', [], [], ['CONTENT_TYPE' => 'application/json']);
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertEquals('{"success":true,"todo":{"id":123,"description":"mock todo description","completed":"1"}}', $client->getResponse()->getContent());
    }

    /**
     * Test todo api adding with no user
     */
    public function testTodoAddNoUser()
    {
        // check that todo add feature restricted to logged in users
        $this->app['session']->set('user', null);

        $client = $this->createClient();
        $client->request('POST', '/api/v1/todo/add');
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

        $db = $this->mockDb(['insert', 'fetchAssoc', 'lastInsertId']);

        $db->expects($this->any())
            ->method('insert')
            ->with("todos", [
                "user_id" => 1,
                "description" => 'mock todo description',
                'completed' => '0',
            ]);
        $db->expects($this->any())
            ->method('lastInsertId')
            ->willReturn(1234);

        $db->expects($this->any())
            ->method('fetchAssoc')
            ->with("SELECT id, description, completed FROM todos WHERE id = ?", [1234])
            ->willReturn([
                'id' => 1234,
                'description' => 'mock todo description',
                'completed' => '0',
            ]);

        $this->app['db'] = $db;

        $client = $this->createClient();
        $data = json_encode([
            'description' => 'mock todo description',
        ]);
        $client->request('POST', '/api/v1/todo/add', [], [], ['CONTENT_TYPE' => 'application/json'], $data);
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertEquals('{"success":true,"todo":{"id":1234,"description":"mock todo description","completed":"0"}}', $client->getResponse()->getContent());
    }

    /**
     * Test todo api deleting with no user
     */
    public function testTodoDeleteNoUser()
    {
        // check that todo add feature restricted to logged in users
        $this->app['session']->set('user', null);

        $client = $this->createClient();
        $client->request('POST', '/api/v1/todo/delete/123');
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
        $uri = '';
        $client->request('POST', '/api/v1/todo/delete/123', [], [], ['CONTENT_TYPE' => 'application/json']);
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertEquals('{"success":true}', $client->getResponse()->getContent());
    }

    /**
     * Test todo api completing with no user
     */
    public function testTodoCompleteNoUser()
    {
        // check that todo add feature restricted to logged in users
        $this->app['session']->set('user', null);

        $client = $this->createClient();
        $client->request('POST', '/api/v1/todo/complete/123');
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
            ->with("UPDATE todos SET completed = ? WHERE id = ? and user_id = ?", [
                '1',
                123,
                1,
            ]);
        $this->app['db'] = $db;

        $body = json_encode([
            'completed' => '1',
        ]);

        $client = $this->createClient();
        $client->request('POST', '/api/v1/todo/complete/123', [], [], ['CONTENT_TYPE' => 'application/json'], $body);
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertEquals('{"success":true}', $client->getResponse()->getContent());
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
