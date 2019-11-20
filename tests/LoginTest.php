<?php

require 'config.php';
use PHPUnit\Framework\TestCase;

class LoginTest extends TestCase
{
    private $http;

    public function setUp(): void
    {
        global $test_url;
        $this->http = new GuzzleHttp\Client(['base_uri' => $test_url . '/']);
    }

    public function tearDown(): void
    {
        $this->http = null;
    }

    public function testLoginWithoutUserPass()
    {

        // test if user can login without entering
        // username and password
        $login = [
            'username' => '',
            'password' => ''
        ];

        $response = $this->http->request('POST', '/login', [
            'form_params' => $login
        ]);
        
        $this->assertEquals(200, $response->getStatusCode());
    
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);

        $responseBody = json_decode($response->getBody());
        // var_dump($responseBody);
        
        $this->assertEquals(404, $responseBody->status);
        $this->assertEquals("error", $responseBody->statusTxt);
        $this->assertRegexp('/username and password are required/', $responseBody->msg);
        
    }


    public function testLoginWithWrongUserPass()
    {

        // test if user can login with
        // invalid user / pass
        $login = [
            'username' => 'abcdef',
            'password' => '123456'
        ];

        $response = $this->http->request('POST', '/login', [
            'form_params' => $login
        ]);
        
        $this->assertEquals(200, $response->getStatusCode());
    
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);

        $responseBody = json_decode($response->getBody());
        // var_dump($responseBody);

        $this->assertEquals(404, $responseBody->status);
        $this->assertEquals("error", $responseBody->statusTxt);
        $this->assertRegexp('/login is not successful/', $responseBody->msg);
        
    }
    
    public function testLoginCorrectly()
    {

        // test if user can login using 
        // valid username and password
        $login = [
            'username' => 'user1',
            'password' => 'user1'
        ];

        $response = $this->http->request('POST', '/login', [
            'form_params' => $login
        ]);
        
        $this->assertEquals(200, $response->getStatusCode());
    
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);

        $responseBody = json_decode($response->getBody());
        // var_dump($responseBody);
        
        $this->assertEquals(200, $responseBody->status);
        $this->assertEquals("ok", $responseBody->statusTxt);
        $this->assertRegexp('/login is successful/', $responseBody->msg);
        $this->assertNotEmpty($responseBody->token);

        
    }      

}