<?php

use Silex\Provider\DoctrineServiceProvider;
use Silex\WebTestCase;

class ControllerTest extends WebTestCase {

    private function mockDb($methods) {
        return $this->getMockBuilder(DoctrineServiceProvider::class)
            ->setMethods($methods)
            ->getMock();
    }

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

    public function testReadMe()
    {
        $client = $this->createClient();
        $crawler = $client->request('GET', '/');

        $this->assertTrue($client->getResponse()->isOk());
        $this->assertCount(1, $crawler->filter('h1:contains("README")'));
    }

    public function testLoginNoUsername()
    {
        $client = $this->createClient();
        $crawler = $client->request('GET', '/login');

        $this->assertTrue($client->getResponse()->isOk());
        $this->assertCount(1, $crawler->filter('form[action="/login"]'));
    }

    public function testLogin()
    {
        $user = [
            'username' => 'user1',
            'password' => 'user1'
        ];
        $db = $this->mockDb(['fetchAssoc']);
        $db->expects($this->any())
            ->method('fetchAssoc')
            ->with("SELECT * FROM users WHERE username = ? and password = ?", [
                'user1',
                'user1'
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

    public function testLogout()
    {
        $this->app['session']->set('user', [
            'username' => 'user1',
            'password' => 'user1'
        ]);

        $client = $this->createClient();
        $client->request('GET', '/logout');

        // check that user is removed from the session
        $this->assertEquals(null, $this->app['session']->get('user'));

        // check that client is redirected correctly
        $this->assertEquals(302, $client->getResponse()->getStatusCode());
        $this->assertEquals('/', $client->getResponse()->headers->get('location'));
    }
}