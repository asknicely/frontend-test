<?php

use Firebase\JWT\JWT;
use Symfony\Component\HttpFoundation\Request;

$todo_add = $app['controllers_factory'];
$todo_add->post('/add', function (Request $request) use ($app) {

    // get decoded jwt info
    global $decoded;
    
    // make these variables 
    // safe first
    $safe_user = addslashes($decoded->username);
    $description = addslashes($request->get('description'));

    // get user id
    $sql  = "SELECT * FROM users WHERE username = '$safe_user'";
    $user = $app['db']->fetchAssoc($sql);

    // return an error if not found
    if (!$user) {
        return $app->json([
            'status' => 404,
            'statusTxt' => 'error',
            'msg' => 'user is not found',
        ]);
    }

    // make this safe first
    $user_id = addslashes($user['id']);

    // finally insert the todo item
    $sql = "INSERT INTO todos (user_id, description) VALUES ('$user_id', '$description')";
    $app['db']->executeUpdate($sql);
    
    // return an ok
    return $app->json([
        'status' => 200,
        'statusTxt' => 'ok',
        'msg' => 'todo item added',
    ]);

})
->before($auth);