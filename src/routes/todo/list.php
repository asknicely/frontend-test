<?php

use Firebase\JWT\JWT;
use Symfony\Component\HttpFoundation\Request;

$todo_list = $app['controllers_factory'];
$todo_list->get('/{id}', function ($id, Request $request) use ($app) {

    // get decoded jwt info
    global $decoded;

    // make these variables 
    // safe first
    $safe_id   = addslashes($id);
    $safe_user = addslashes($decoded->username);

    if ($id) {

        // return a single todo
        // for that user

        // get todo details
        $sql = "SELECT * FROM todos WHERE id = '$safe_id'";
        $todo = $app['db']->fetchAssoc($sql);
        if (!$todo) { $todo = []; }

        // get user details
        $sql = "SELECT * FROM users WHERE username = '$safe_user'";
        $user = $app['db']->fetchAssoc($sql);
        if (!$user) { $user = []; }

        // if any of them not found , 
        // return an error
        if (!$todo || !$user) {
            return $app->json([
                'status' => 404,
                'statusTxt' => 'error',
                'msg' => 'todo item is not found',
            ]);              
        }        

        // if this todo doesn't belong to this user
        // then give an error
        if ($user['id'] != $todo['user_id']) {
            return $app->json([
                'status' => 401,
                'statusTxt' => 'error',
                'msg' => 'proper authorization is needed to see this item',
            ]);              
        }
        else {

            // return a todo item
            return $app->json([
                'status' => 200,
                'statusTxt' => 'ok',
                'msg' => 'todo detail returned',
                'result' => $todo,
            ]); 
        }

    }
    else {

        // return a full todo list
        // for that user
        $sql = "
        SELECT todos.* 
        FROM users, todos 
        WHERE 
            username = '$safe_user' AND 
            todos.user_id = users.id 
        ";
        $todo = $app['db']->fetchAll($sql);
        if (!$todo) { $todo = []; }

        // return todo list
        return $app->json([
            'status' => 200,
            'statusTxt' => 'ok',
            'msg' => 'todo list returned',
            'result' => $todo,
        ]);         

    }

})
->value('id', null)
->before($auth);