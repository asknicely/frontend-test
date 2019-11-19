<?php

use Firebase\JWT\JWT;
use Symfony\Component\HttpFoundation\Request;

$auth = function (Request $request) use ($app) {

    // prepare variable for decoded jwt info
    global $decoded;

    $token = $request->headers->get('Authorization');

    // if no token found,
    // reject the request ...

    if (!$token) {
        return $app->json([
            'status' => 401,
            'statusTxt' => 'error',
            'msg' => 'authorization is needed',
        ]);
    }

    // extract the data from the token now ...
    $decoded = JWT::decode($token, $app['config']['jwt']['secret'], array('HS256'));

    // check if it is expired or not 
    if ($decoded->expire < time()) {
        return $app->json([
            'status' => 401,
            'statusTxt' => 'error',
            'msg' => 'token is expired',
        ]);        
    }

};