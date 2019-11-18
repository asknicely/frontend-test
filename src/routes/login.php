<?php

use Firebase\JWT\JWT;
use Symfony\Component\HttpFoundation\Request;

$user_login = $app['controllers_factory'];
$user_login->post('/login', function (Request $request) use ($app) {

    // make sure these inputs are safe for SQL
    $username = addslashes($request->get('username'));
    $password = addslashes($request->get('password'));

    // make sure the username and password 
    // are filled first
    if (!$username || !$password) {
        return $app->json([
            'status' => 404,
            'statusTxt' => 'error',
            'msg' => 'username and password are required',
        ]);          
    }

    // since username and password 
    // are included in the post request
    if ($username && $password) {
        
        $sql = "SELECT * FROM users WHERE username = '$username' and password = '$password'";
        $user = $app['db']->fetchAssoc($sql);

        if ($user) {

            // user is found in the db
            // then create token & jwt
            $token = array(
                "username" => $username,
                "password" => $password,
                "login" => time(),
                "expire" => time() + $app['config']['jwt']['expire']
            );
            
            $jwt = JWT::encode($token, $app['config']['jwt']['secret']);
            
            // return jwt & token
            return $app->json([
                'status' => 200,
                'statusTxt' => 'ok',
                'msg' => 'login is successful',
                'token' => $jwt,
            ]);

        }
        else {

            // user is not found
            // return an error
            return $app->json([
                'status' => 404,
                'statusTxt' => 'error',
                'msg' => 'login is not successful',
            ]);

        }
        
    }

});