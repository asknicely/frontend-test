<?php

$homepage = $app['controllers_factory'];
$homepage->match('/', function () use ($app) {
    return $app->json([
        'status' => 200,
        'statusTxt' => 'ok',
        'contents' => file_get_contents('README.md'),
    ]);
});
