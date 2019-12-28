<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app['twig'] = $app->share($app->extend('twig', function ($twig, $app) {
    $twig->addGlobal('user', $app['session']->get('user'));

    return $twig;
}));


$app->get('/', function () use ($app) {
    return $app['twig']->render('index.html', [
        'readme' => file_get_contents('../README.md'),
    ]);
});

$app->match('/login', function (Request $request) use ($app) {
    $username = $request->get('username');
    $password = $request->get('password');

    if ($username) {
        $sql = "SELECT * FROM users WHERE username = ? and password = ?";
        $user = $app['db']->fetchAssoc($sql, [
            $username,
            $password,
        ]);

        if ($user) {
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


$app->get('/todo/{id}', function ($id, Request $request) use ($app) {
    $user = $app['session']->get('user');
    if (null === $user) {
        return $app->redirect('/login');
    }

    $contentType = $request->headers->get('Content-Type');

    if ($id) {
        $sql = "SELECT * FROM todos WHERE id = ?";
        $todo = $app['db']->fetchAssoc($sql, [$id]);

        if (strpos($contentType, 'application/json') === false) {
            return $app['twig']->render('todo.html', [
                'todo' => $todo,
            ]);
        }

        return json_encode($todo);
    }

    $sql = "SELECT * FROM todos WHERE user_id = ?";
    $todos = $app['db']->fetchAll($sql, [$user['id']]);

    if (strpos($contentType, 'application/json') === false) {
        return $app['twig']->render('todos.html', [
            'todos' => $todos,
        ]);
    }

    return json_encode($todos);
})
    ->value('id', null);


$app->post('/todo/add', function (Request $request) use ($app) {
    if (null === $user = $app['session']->get('user')) {
        return $app->redirect('/login');
    }

    $userId = $user['id'];
    $description = $request->get('description');
    $contentType = $request->headers->get('Content-Type');

    $sql = "INSERT INTO todos (user_id, description) VALUES (?, ?)";
    $app['db']->executeUpdate($sql, [
        $userId,
        $description,
    ]);

    if (strpos($contentType, 'application/json') === false) {
        return $app->redirect('/todo');
    }

    return json_encode(array('success' => true));
});


$app->match('/todo/delete/{id}', function (Request $request, $id) use ($app) {
    if (null === $user = $app['session']->get('user')) {
        return $app->redirect('/login');
    }

    $sql = "DELETE FROM todos WHERE id = ? and user_id = ?";
    $app['db']->executeUpdate($sql, [
        $id,
        $user['id'],
    ]);

    $contentType = $request->headers->get('Content-Type');
    if (strpos($contentType, 'application/json') === false) {
        return $app->redirect('/todo');
    }

    return json_encode(array('success' => true));
});


$app->match('/todo/complete/{id}', function (Request $request, $id) use ($app) {
    if (null === $user = $app['session']->get('user')) {
        return $app->redirect('/login');
    }

    $sql = "UPDATE todos SET completed = 1 WHERE id = ? and user_id = ?";
    $app['db']->executeUpdate($sql, [
        $id,
        $user['id'],
    ]);

    $contentType = $request->headers->get('Content-Type');
    if (strpos($contentType, 'application/json') === false) {
        return $app->redirect('/todo');
    }

    return json_encode(array('success' => true));
});
