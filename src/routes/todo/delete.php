<?php

use Firebase\JWT\JWT;
use Symfony\Component\HttpFoundation\Request;

include 'auth.php';

$todo_delete = $app['controllers_factory'];
$todo_delete->get('/delete/{id}', function ($id, Request $request) use ($app) {

    // get decoded jwt info
    global $decoded;
    
    // make these variables 
    // safe first
    $safe_id   = addslashes($id);
    $safe_user = addslashes($decoded->username);

    if ($id) {

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
                'msg' => 'proper authorization is needed to delete this item',
            ]);              
        }
        else {

            // finally, delete todo from db
            $sql = "DELETE FROM todos WHERE id = '$safe_id'";
            $app['db']->executeUpdate($sql);

            // return an ok
            return $app->json([
                'status' => 200,
                'statusTxt' => 'ok',
                'msg' => 'todo detail deleted',
            ]);

        }
        
    }
    else {

        // return an error 
        // if id is not found
        return $app->json([
            'status' => 404,
            'statusTxt' => 'error',
            'msg' => 'todo item is not found',
        ]);         

    }

})
->value('id', null)
->before($auth);