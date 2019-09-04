<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app['twig'] = $app->share($app->extend('twig', function($twig, $app) {
    $twig->addGlobal('user', $app['session']->get('user'));
    return $twig;
}));

$app->get('/', function () use ($app) {
    return $app['twig']->render('index.html', [
        'readme' => file_get_contents('README.md'),
    ]);
});

$app->match('/login', function (Request $request) use ($app) {
    $accept_json = strpos($request->headers->get('Accept'), 'application/json') !== false;
    $username = $request->get('username');
    $password = $request->get('password');
    $user = NULL;

    if ($username) {
        $sql = "SELECT * FROM users WHERE username = '$username' LIMIT 1";
        $user = $app['db']->fetchAssoc($sql);
    }
    
    if ($user) {
        if ($user['password'] === $password) {
            $app['session']->set('user', $user);
            return $accept_json 
                ? $app->json(array('id' => $user['id'], 'username' => $user['username']))
                : $app->redirect('/todo');
        } else {
            return $accept_json
                ? $app->json(array('message' => 'Wrong password'), 400)
                : $app['twig']->render('login.html', array());
        }
    } else {
        return $accept_json
            ? $app->json(array('message' => 'Username is not registered'), 400)
            : $app['twig']->render('login.html', array());
    }
});


$app->match('/logout', function (Request $request) use ($app) {
    $accept_json = strpos($request->headers->get('Accept'), 'application/json') !== false;
    $app['session']->set('user', null);
    return $accept_json
        ? $app->json(null, 204) 
        : $app->redirect('/');
});

$app->get('/todo/{id}', function (Request $request, $id) use ($app) {
    $accept_json = strpos($request->headers->get('Accept'), 'application/json') !== false;

    if (null === $user = $app['session']->get('user')) {
        return $accept_json 
            ? $app->json(array('message' => 'Unauthorized'), 401)
            : $app->redirect('/login');
    }

    if ($id){
        $sql = "SELECT * FROM todos WHERE id = '$id'";
        $todo = $app['db']->fetchAssoc($sql);
        return $accept_json 
            ? json_encode($todo) 
            : $app['twig']->render('todo.html', [
                'todo' => $todo,
            ]);
    } else {
        $sql = "SELECT * FROM todos WHERE user_id = '${user['id']}'";
        $todos = $app['db']->fetchAll($sql);
        return $accept_json 
            ? json_encode($todos) 
            : $app['twig']->render('todos.html', [
                'todos' => $todos,
            ]);
    }
})
->value('id', null);


$app->post('/todo/add', function (Request $request) use ($app) {
    $accept_json = strpos($request->headers->get('Accept'), 'application/json') !== false;

    if (null === $user = $app['session']->get('user')) {
        return $accept_json 
            ? $app->json(array('message' => 'Unauthorized'), 401)
            : $app->redirect('/login');
    }

    $user_id = $user['id'];
    $description = $request->get('description');

    $sql = "INSERT INTO todos (user_id, description) VALUES ('$user_id', '$description')";
    if (1 === $app['db']->executeUpdate($sql)) {
        $last_insert_id = $app['db']->lastInsertId();
        $sql = "SELECT * FROM todos WHERE id = '$last_insert_id'";
        $todo = $app['db']->fetchAssoc($sql);
    }

    return $accept_json
        ? ($todo 
            ? $app->json(array('success' => true, 'todo' => $todo), 201)
            : $app->json(array('message' => 'Interval Server Error', 500))) 
        : $app->redirect('/todo');
});


$app->match('/todo/delete/{id}', function (Request $request, $id) use ($app) {
    $accept_json = strpos($request->headers->get('Accept'), 'application/json') !== false;

    if (null === $user = $app['session']->get('user')) {
        return $accept_json 
            ? $app->json(array('message' => 'Unauthorized'), 401)
            : $app->redirect('/login');
    }
    
    $sql = "DELETE FROM todos WHERE id = '$id'";
    $result = $app['db']->executeUpdate($sql);

    return $accept_json 
        ? $app->json(array('success' => $result === 1), $result === 1 ? 200 : 500)
        : $app->redirect('/todo');
});


$app->match('/todo/complete/{id}', function (Request $request, $id) use ($app) {
    $accept_json = strpos($request->headers->get('Accept'), 'application/json') !== false;

    if (null === $user = $app['session']->get('user')) {
        return $accept_json 
            ? $app->json(array('message' => 'Unauthorized'), 401)
            : $app->redirect('/login');
    }

    $sql = "UPDATE todos SET completed = 1 WHERE id = '$id'";
    $result = $app['db']->executeUpdate($sql);

    return $accept_json 
        ? $app->json(array('success' => $result === 1), $result === 1 ? 200 : 500)
        : $app->redirect('/todo');
});