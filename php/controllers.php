<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app['twig'] = $app->share($app->extend('twig', function($twig, $app) {
    $twig->addGlobal('user', $app['session']->get('user'));

    $distStyles = array_filter(scandir('web/dist/css'), function ($filename) {
        return endsWith($filename, '.css');
    });

    $twig->addGlobal('dist_styles', $distStyles);

    $distScripts = array_filter(scandir('web/dist/js'), function ($filename) {
        return endsWith($filename, '.js');
    });

    // reverse to give chunk-vendors priority
    $twig->addGlobal('dist_scripts', array_reverse($distScripts));

    return $twig;
}));


$app->get('/', function () use ($app) {
    return $app['twig']->render('index.html', [
        'readme' => file_get_contents('README.md'),
    ]);
});


$app->match('/login', function (Request $request) use ($app) {
    $username = $request->get('username');
    $password = $request->get('password');

    if ($username) {
        $sql = "SELECT * FROM users WHERE username = '$username' and password = '$password'";
        $user = $app['db']->fetchAssoc($sql);

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
    if (null === $user = $app['session']->get('user')) {
        return $app->redirect('/login');
    }

    $user_id = $user['id'];
    $jsonRequest = isJsonRequest('GET', $request);

    if ($id) {
        $sql = "SELECT * FROM todos WHERE id = '$id'";
        $todo = $app['db']->fetchAssoc($sql);
    
        if ($todo == null) {
            $responseText = $jsonRequest
                ? 'Not found'
                : $app['twig']->render('error.html', [
                        'code' => 404,
                        'message' => 'Todo not found'
                    ]);

            return new Response($responseText, 404);
        }

        // encode user input description to prevent xss attacks
        $todo['description'] = $app->escape($todo['description']);

        if ($user_id != $todo['user_id']) {
            $responseText = $jsonRequest
                ? 'Forbidden'
                : $app['twig']->render('error.html', [
                        'code' => 403,
                        'message' => 'Access to Todo denied'
                    ]);

            return new Response($responseText, 403);
        }

        if ($jsonRequest) {
            return json_encode($todo);
        } else {
            return $app['twig']->render('todo.html', [
                'todo' => $todo,
            ]);
        }

    } else {
        $sql = "SELECT * FROM todos WHERE user_id = '$user_id'";
        $todos = $app['db']->fetchAll($sql);

        foreach ($todos as $todo) {
            // encode user input description to prevent xss attacks
            $todo['description'] = $app->escape($todo['description']);
        }

        if ($jsonRequest) {
            return json_encode($todos);
        } else {
            return $app['twig']->render('todos.html', [
                'todos' => $todos,
            ]);
        }
    }
})
->value('id', null);


$app->post('/todo/add', function (Request $request) use ($app) {
    $jsonRequest = isJsonRequest('POST', $request);

    if (null === $user = $app['session']->get('user')) {
        if ($jsonRequest) {
            return new Response('Unauthorized', 401);
        } else {
            return $app->redirect('/login');
        }
    }

    $user_id = $user['id'];

    if ($jsonRequest) {
        $data = json_decode($request->getContent(), true);
        $description = $data['description'];
    } else {
        $description = $request->get('description');
    }

    if ($description == null || $description == '') {
        $responseText = $jsonRequest
            ? 'Bad request'
            : $app['twig']->render('error.html', [
                    'code' => 400,
                    'message' => 'Invalid Todo description'
                ]);

        return new Response($responseText, 400);
    }

    $sql = "INSERT INTO todos (user_id, description) VALUES ('$user_id', '$description')";
    $app['db']->executeUpdate($sql);

    if ($jsonRequest) {
        return json_encode(array('success' => true));
    } else {
        return $app->redirect('/todo');
    }
});


$app->delete('/todo/{id}', function (Request $request, $id) use ($app) {
    if (null === $user = $app['session']->get('user')) {
        return new Response('Unauthorized', 401);
    }

    $user_id = $user['id'];
    $sql = "SELECT * FROM todos WHERE id = '$id'";
    $todo = $app['db']->fetchAssoc($sql);

    if ($todo == null) {
        return new Response('Not found', 404);
    }

    if ($user_id != $todo['user_id']) {
        return new Response('Forbidden', 403);
    }

    $sql = "DELETE FROM todos WHERE id = '$id' AND user_id = '$user_id'";
    $app['db']->executeUpdate($sql);

    return json_encode(array('success' => true));
});


$app->patch('/todo/{id}', function (Request $request, $id) use ($app) {
    if (null === $user = $app['session']->get('user')) {
        return new Response('Unauthorized', 401);
    }

    $user_id = $user['id'];
    $sql = "SELECT * FROM todos WHERE id = '$id'";
    $todo = $app['db']->fetchAssoc($sql);

    if ($todo == null) {
        return new Response('Not found', 404);
    }

    if ($user_id != $todo['user_id']) {
        return new Response('Forbidden', 403);
    }

    // toggle completed state of todo
    $sql = "UPDATE todos SET completed = 1 - completed WHERE id = '$id' AND user_id = '$user_id'";
    $app['db']->executeUpdate($sql);

    return json_encode(array('success' => true));
});
