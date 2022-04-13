<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

function getTodos($app, $user_id) {
    $sql = "SELECT todos.id, todos.user_id, todos.description, todos.completed, users.username FROM todos, users WHERE todos.user_id = '$user_id' AND users.id = '$user_id'";
    $todos = $app['db']->fetchAll($sql);

    return $todos;
}

$app['twig'] = $app->share($app->extend('twig', function($twig, $app) {
    $twig->addGlobal('user', $app['session']->get('user'));
    return $twig;
}));

$app->get('/', function () use ($app) {
    return $app['twig']->render('index.html', [
        'readme' => file_get_contents('README.md')
    ]);
});


$app->get('/login', function (Request $request) use ($app) {
    if (null !== $user = $app['session']->get('user')) {
        return $app->redirect('/todos');
    }

    return $app['twig']->render('login.html');
});


$app->post('/login', function (Request $request) use ($app) {
    $username = $request->get('username');
    $password = $request->get('password');

    if ($username && $password) {
        $sql = "SELECT * FROM users WHERE username = '$username' and password = '$password'";
        $user = $app['db']->fetchAssoc($sql);

        if ($user) {
            $app['session']->set('user', $user);
            return $app->redirect('/todo');
        }
    }

    return $app['twig']->render('login.html');
});


$app->get('/logout', function () use ($app) {
    $app['session']->set('user', null);
    return $app->redirect('/');
});


$app->get('/todo/{id}', function (Request $request, $id) use ($app) {
    $isRoute = strpos($request->headers->get('Content-Type'), 'application/json') === false;

    if (null === $user = $app['session']->get('user')) {
        if ($isRoute) return $app->redirect('/login');

        return $app->abort(403);
    }

    $user_id = $user['id'];

    if ($id) {        
        $sql = "SELECT * FROM todos WHERE id = '$id' and user_id = '$user_id'";
        $todo = $app['db']->fetchAssoc($sql);

        if (!$todo) {
            return $app->redirect('/todo');
        }

        return $app['twig']->render('todos.html', [
            'todo_id' => $id,
        ]);
    } else {
        if ($isRoute) {
            return $app['twig']->render('todos.html', [
                'todo_id' => false,
            ]);
        }
    
        return json_encode(getTodos($app, $user_id));
    }
})
->value('id', null);


$app->post('/todo', function (Request $request) use ($app) {
    if (null === $user = $app['session']->get('user')) {
        return $app->abort(403);
    }

    if (strpos($request->headers->get('Content-Type'), 'application/json') === false) {
        return $app->abort(404);
    }

    $user_id = $user['id'];

    $parameters = json_decode($request->getContent());
    $description = $parameters->{'description'};

    if (strlen($description) < 1) {
        return $app->abort(400);
    }

    $sql = "INSERT INTO todos (user_id, description) VALUES ('$user_id', '$description')";
    $app['db']->executeUpdate($sql);

    return json_encode(getTodos($app, $user_id));
});

$app->patch('/todo/{id}/update', function (Request $request, $id) use ($app) {
    if (null === $user = $app['session']->get('user')) {
        return $app->abort(403);
    }

    if (strpos($request->headers->get('Content-Type'), 'application/json') === false) {
        return $app->abort(404);
    }

    $user_id = $user['id'];

    $parameters = json_decode($request->getContent());
    $id = $parameters->{'id'};
    $description = $parameters->{'description'};
    $completed = $parameters->{'completed'};

    $sql = "SELECT * FROM todos WHERE id = '$id' and user_id = '$user_id'";
    $todo = $app['db']->fetchAssoc($sql);

    if (!$todo) {
        return $app->abort(400);
    }    

    $sql = "UPDATE todos SET description = '$description', completed = '$completed' WHERE id = '$id' and user_id = '$user_id'";
    $app['db']->executeUpdate($sql);

    return json_encode(getTodos($app, $user_id));
})
->value('id', null);


$app->patch('/todo/{id}/complete', function (Request $request, $id) use ($app) {
    if (null === $user = $app['session']->get('user')) {
        return $app->abort(403);
    }

    if (strpos($request->headers->get('Content-Type'), 'application/json') === false) {
        return $app->abort(404);
    }

    $user_id = $user['id'];

    $sql = "SELECT * FROM todos WHERE id = '$id' and user_id = '$user_id'";
    $todo = $app['db']->fetchAssoc($sql);

    if (!$todo) {
        return $app->abort(400);
    }

    $completed = $todo['completed'] === '1' ? '0' : '1';

    $sql = "UPDATE todos SET completed = '$completed' WHERE id = '$id' and user_id = '$user_id'";
    $app['db']->executeUpdate($sql);

    return json_encode(getTodos($app, $user_id));
})
->value('id', null);


$app->delete('/todo/{id}', function (Request $request, $id) use ($app) {
    if (null === $user = $app['session']->get('user')) {
        return $app->abort(403);
    }

    if (strpos($request->headers->get('Content-Type'), 'application/json') === false) {
        return $app->abort(404);
    }

    $user_id = $user['id'];

    $sql = "DELETE FROM todos WHERE id = '$id' and user_id = '$user_id'";
    $app['db']->executeUpdate($sql);

    return json_encode(getTodos($app, $user_id));
})
->value('id', null);