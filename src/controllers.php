<?php

$app['twig'] = $app->share($app->extend('twig', function($twig, $app) {
    $twig->addGlobal('user', $app['session']->get('user'));
    return $twig;
}));


// include auth middleware
include 'auth.php';

// include cors middleware
include 'cors.php';
$app->after($cors);

// homepage
include 'routes/homepage.php';
$app->mount('/', $homepage);

// login page
include 'routes/login.php';
$app->mount('/', $user_login);


// todos
include 'routes/todo/delete.php';
$app->mount('/todo', $todo_delete);

include 'routes/todo/complete.php';
$app->mount('/todo', $todo_complete);

include 'routes/todo/add.php';
$app->mount('/todo', $todo_add);

include 'routes/todo/list.php';
$app->mount('/todo', $todo_list);
