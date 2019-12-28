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
        try {
            $user = $app['db']->fetchAssoc($sql, [
                $username,
                $password,
            ]);

            if ($user) {
                $app['session']->set('user', $user);

                return $app->redirect('/todo');
            }
        } catch (Exception $exception) {
            return $exception->getMessage();
        }
    }

    return $app['twig']->render('login.html', array());
});


$app->get('/logout', function () use ($app) {
    $app['session']->set('user', null);

    return $app->redirect('/');
});


$app->get('/todo/{id}', function ($id, Request $request) use ($app) {
    if (null === $user = $app['session']->get('user')) {
        return $app->redirect('/login');
    }

    $contentType = $request->headers->get('Content-Type');

    if ($id) {
        $sql = "SELECT * FROM todos WHERE id = '$id'";
        $todo = $app['db']->fetchAssoc($sql);

        if (strpos($contentType, 'application/json') === false) {
            return $app['twig']->render('todo.html', [
                'todo' => $todo,
            ]);
        }

        return json_encode($todo);
    }

    $sql = "SELECT * FROM todos WHERE user_id = '${user['id']}'";
    $todos = $app['db']->fetchAll($sql);

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

    $sql = "INSERT INTO todos (user_id, description) VALUES ('$userId', '$description')";
    $app['db']->executeUpdate($sql);

    if (strpos($contentType, 'application/json') === false) {
        return $app->redirect('/todo');
    }

    return json_encode(array('success' => true));
});


$app->match('/todo/delete/{id}', function (Request $request, $id) use ($app) {

    $sql = "DELETE FROM todos WHERE id = '$id'";
    $app['db']->executeUpdate($sql);

    $contentType = $request->headers->get('Content-Type');
    if (strpos($contentType, 'application/json') === false) {
        return $app->redirect('/todo');
    }

    return json_encode(array('success' => true));
});


$app->match('/todo/complete/{id}', function (Request $request, $id) use ($app) {

    $sql = "UPDATE todos SET completed = 1 WHERE id = '$id'";
    $app['db']->executeUpdate($sql);

    $contentType = $request->headers->get('Content-Type');
    if (strpos($contentType, 'application/json') === false) {
        return $app->redirect('/todo');
    }

    return json_encode(array('success' => true));
});
