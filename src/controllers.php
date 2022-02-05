<?php


use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app->extend('twig', function($twig, $app) {
    $twig->addGlobal('user', $app['session']->get('user'));

    return $twig;
});

$app->match('/', function () use ($app) {
    return $app['twig']->render('index.html');
});

$app->match('/{path}', function () use ($app) {
    return $app['twig']->render('index.html');
});


$app->get('/api/todo/{id}', function ($id, Request $request) use ($app) {
    if (null === $user = $app['session']->get('user')) {
        return $app->redirect('/login');
    }

    $contentType = $request->headers->get('Content-Type');

    if ($id){
        $sql = "SELECT * FROM todos WHERE id = '$id'";
        $todo = $app['db']->fetchAssoc($sql);

        if (strpos($contentType, 'application/json') === false) {
        } else {
            return json_encode($todo);
        }

    } else {
        $sql = "SELECT * FROM todos WHERE user_id = '${user['id']}'";
        $todos = $app['db']->fetchAllAssociative($sql);

        if (strpos($contentType, 'application/json') === false) {
        } else {
            return json_encode($todos);
        }
    }
})
    ->value('id', null);

$app->match('/api/list', function () use ($app) {
    if (null === $user = $app['session']->get('user')) {
        return json_encode(array('authenticated' => false));
    }

    $sql = "SELECT * FROM todos";
    $todos = $app['db']->fetchAllAssociative($sql);

    return $app->json($todos);
});



$app->match('/login', function (Request $request) use ($app) {
    $username = $request->get('username');
    $password = $request->get('password');

    if ($username) {
        $sql = "SELECT * FROM users WHERE username = '$username' and password = '$password'";
//        var_dump($app['db']); die;
        $user = $app['db']->fetchAssociative($sql);

        if ($user){
            $app['session']->set('user', $user);
            return $app->redirect('/todo');
        }
    }

    return $app['twig']->render('login.html', array());
});


$app->get('/logout', function () use ($app) {
    $app['session']->set('user', null);
    return $app->redirect('/');
});





$app->post('/todo/add', function (Request $request) use ($app) {
    if (null === $user = $app['session']->get('user')) {
        return $app->redirect('/login');
    }

    $user_id = $user['id'];
    $description = $request->get('description');
    $contentType = $request->headers->get('Content-Type');

    $sql = "INSERT INTO todos (user_id, description) VALUES ('$user_id', '$description')";
    $app['db']->executeUpdate($sql);

    if (strpos($contentType, 'application/json') === false) {
        return $app->redirect('/todo');
    } else {
//        return json_encode(array('success' => true));
        return $app->json(['response' => 'success']);
    }
});


$app->match('/todo/delete/{id}', function (Request $request, $id) use ($app) {

    $sql = "DELETE FROM todos WHERE id = '$id'";
    $app['db']->executeUpdate($sql);

    $contentType = $request->headers->get('Content-Type');
    if (strpos($contentType, 'application/json') === false) {
        return $app->redirect('/todo');
    } else {
        return json_encode(array('success' => true));
    }
});


$app->match('/api/todo/complete/{id}', function (Request $request, $id) use ($app) {

    $sql = "UPDATE todos SET completed = 1 WHERE id = '$id'";
    $app['db']->executeUpdate($sql);

    $contentType = $request->headers->get('Content-Type');
    if (strpos($contentType, 'application/json') === false) {
        return $app->redirect('/todo');
    } else {
        return json_encode(array('success' => true));
    }
});
