<?php

require 'config.php';
use PHPUnit\Framework\TestCase;

class TodoTest extends TestCase
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

    public function getToken()
    {

        // login to the system using the correct 
        // user and password , and return the token

        $login = [
            'username' => 'user1',
            'password' => 'user1'
        ];

        $response = $this->http->request('POST', '/login', [ 'form_params' => $login ]);
        $responseBody = json_decode($response->getBody());

        return [
            'Authorization' => $responseBody->token,
        ];        
        
    }

    public function getFixtureTodo()
    {

        // an example for fixture
        $data = [ 'description' => 'This is a unit test - afLwj4dNXRMC278HaCs5LZr5nyZzXmCUWWXeT2Gms5KQJUhVxx' ];
        return $data;      
        
    }    

    public function getTodoList()
    {

        // function to get list of todos of current user
        // authenticated by token

        $response = $this->http->request('POST', '/todo', [
            'headers' => $this->getToken(),
            'form_params' => []
        ]);        
        
        return json_decode($response->getBody());
        
    }

    public function createTodo()
    {

        // function to create Todo item
        $response = $this->http->request('POST', '/todo/add', [
            'form_params' => $this->getFixtureTodo(),
            'headers' => $this->getToken(),
        ]);

        return $response;
        
    }

    public function deleteTodo($id)
    {

        // function to delete Todo
        $response = $this->http->request('POST', '/todo/delete', [
            'form_params' => [ 'id' => $id ],
            'headers' => $this->getToken(),
        ]);

        return $response;
        
    }    

    public function testTodoListWithoutToken()
    {

        // test if user can view todo without token
        $response = $this->http->request('POST', '/todo', [
            'form_params' => []
        ]);
        
        $this->assertEquals(200, $response->getStatusCode());
    
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);

        $responseBody = json_decode($response->getBody());
        // var_dump($responseBody);
        
        $this->assertEquals(401, $responseBody->status);
        $this->assertEquals("error", $responseBody->statusTxt);
        $this->assertRegexp('/authorization is needed/', $responseBody->msg);
        
    }

    public function testTodoListWithToken()
    {

        // test if user can view todos with proper token
        $response = $this->http->request('POST', '/todo', [
            'headers' => $this->getToken(),
            'form_params' => []
        ]);        
        
        $this->assertEquals(200, $response->getStatusCode());
    
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);

        $responseBody = json_decode($response->getBody());
        // var_dump($responseBody);

        $this->assertEquals(200, $responseBody->status);
        $this->assertEquals("ok", $responseBody->statusTxt);
        $this->assertRegexp('/todo list returned/', $responseBody->msg);        
        
    }

    public function testTodoAddWithoutToken()
    {

        // test if user can add Todo item without token
        $response = $this->http->request('POST', '/todo/add', [
            'form_params' => $this->getFixtureTodo(),
        ]);
        
        $this->assertEquals(200, $response->getStatusCode());
    
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);

        $responseBody = json_decode($response->getBody());
        // var_dump($responseBody);
        
        $this->assertEquals(401, $responseBody->status);
        $this->assertEquals("error", $responseBody->statusTxt);
        $this->assertRegexp('/authorization is needed/', $responseBody->msg);
        
    }

    public function testTodoAddWithToken()
    {

        // test if user can add Todo item with valid token
        // get before data
        $beforeAdd = $this->getTodoList();
        $beforeLastElement = end($beforeAdd->result);
        $beforeArrayCount = count($beforeAdd->result);

        $response = $this->createTodo();
        $this->assertEquals(200, $response->getStatusCode());
    
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);

        $responseBody = json_decode($response->getBody());
        // var_dump($responseBody);
        
        $this->assertEquals(200, $responseBody->status);
        $this->assertEquals("ok", $responseBody->statusTxt);
        $this->assertRegexp('/todo item added/', $responseBody->msg);

        
        // get new data
        $fixture = $this->getFixtureTodo();
        $afterAdd = $this->getTodoList();
        $afterLastElement = end($afterAdd->result);
        $afterArrayCount = count($afterAdd->result);
        
        // check it again after add
        $this->assertEquals($beforeArrayCount + 1, $afterArrayCount);        
        $this->assertEquals($fixture['description'], $afterLastElement->description);
        
        // delete it
        $this->deleteTodo($afterLastElement->id);
        
    }

    public function testTodoDeleteWithToken()
    {

        // test if user can delete a Todo item with valid token
        // get before data
        $beforeAdd = $this->getTodoList();
        $beforeLastElement = end($beforeAdd->result);
        $beforeArrayCount = count($beforeAdd->result);

        // add first
        $response = $this->createTodo();

        // get last id
        $afterAdd = $this->getTodoList();
        $afterAddLastElement = end($afterAdd->result);
        $afterAddArrayCount = count($afterAdd->result);
        $deleteId = $afterAddLastElement->id;


        // now test delete wrong ID
        $response = $this->deleteTodo($deleteId + 100);
        $this->assertEquals(200, $response->getStatusCode());
    
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);

        $responseBody = json_decode($response->getBody());
        // var_dump($responseBody);

        $this->assertEquals(404, $responseBody->status);
        $this->assertEquals("error", $responseBody->statusTxt);
        $this->assertRegexp('/todo item is not found/', $responseBody->msg);           



        // now test delete correct ID
        $response = $this->deleteTodo($deleteId);
        $this->assertEquals(200, $response->getStatusCode());
    
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);

        $responseBody = json_decode($response->getBody());
        // var_dump($responseBody);

        $this->assertEquals(200, $responseBody->status);
        $this->assertEquals("ok", $responseBody->statusTxt);
        $this->assertRegexp('/todo detail deleted/', $responseBody->msg);
        

        // get last id
        $afterDelete = $this->getTodoList();
        $afterDeleteLastElement = end($afterDelete->result);
        $afterDeleteArrayCount = count($afterDelete->result);

        // make sure the item deleted
        $this->assertEquals($afterAddArrayCount - 1, $afterDeleteArrayCount);        
        
    }    

}