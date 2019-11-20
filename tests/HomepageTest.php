<?php

require 'config.php';
use PHPUnit\Framework\TestCase;

class HomepageTest extends TestCase
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

    public function testGet()
    {

        // test if user can get the / content 
        $response = $this->http->request('GET', '/');
        $this->assertEquals(200, $response->getStatusCode());
    
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);

        $responseBody = json_decode($response->getBody());
        $this->assertEquals(200, $responseBody->status);
        $this->assertEquals("ok", $responseBody->statusTxt);
        $this->assertRegexp('/AskNicely PHP frontend test/', $responseBody->contents);
        
    }

}