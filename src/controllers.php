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


$app->get('/api/requestAuth', function () use ($app) {
    $xsrfToken = md5(uniqid());
    $app['session']->set('xsrfToken', $xsrfToken);

    return json_encode(array('token' => $xsrfToken));
});

$app->match('/api/login', function (Request $request) use ($app) {
    $username = $app->escape($request->get('username'));
    $password = $app->escape($request->get('password'));

    $xsrfToken = $app['session']->get('xsrfToken');
    $requestToken = $request->headers->get('Authorization');

    if (empty($xsrfToken) || empty($requestToken) || $xsrfToken !== $requestToken) {
        $response = new Response(json_encode(array('msg' => 'Request unauthorized')));
        return $response->setStatusCode(401);
    }

    if ($username) {
        $sql = "SELECT * FROM users WHERE username = '$username' and password = '$password'";
        $user = $app['db']->fetchAssociative($sql);

        if ($user){
            $app['session']->set('user', $user);
            return json_encode(
                array(
                    'id'        => $user['id'],
                    'username'  => $user['username'],
                )
            );
        }
    }

    $response = new Response(json_encode(array('msg' => 'Invalid username or password')));
    return $response->setStatusCode(500);
});


$app->get('/api/logout', function () use ($app) {
    $app['session']->set('user', null);
    $app['session']->set('xsrfToken', null);
    return json_encode(array('success' => true));
});

$app->match('/api/list', function (Request $request) use ($app) {
    if (null === $user = $app['session']->get('user')) {
        return $app->redirect('/login');
    }

    $xsrfToken = $app['session']->get('xsrfToken');
    $requestToken = $request->headers->get('Authorization');

    if (empty($xsrfToken) || empty($requestToken) || $xsrfToken !== $requestToken) {
        $response = new Response(json_encode(array('msg' => 'Request unauthorized')));
        return $response->setStatusCode(401);
    }
    $sql = "SELECT * FROM todos";
    $todos = $app['db']->fetchAllAssociative($sql);

    return $app->json($todos);
});


$app->get('/api/todo/{id}', function ($id, Request $request) use ($app) {
    if (null === $user = $app['session']->get('user')) {
        return $app->redirect('/login');
    }

    $contentType = $request->headers->get('Content-Type');

    $xsrfToken = $app['session']->get('xsrfToken');
    $requestToken = $request->headers->get('Authorization');

    if (empty($xsrfToken) || empty($requestToken) || $xsrfToken !== $requestToken) {
        $response = new Response(json_encode(array('msg' => 'Request unauthorized')));
        return $response->setStatusCode(401);
    }

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

$app->post('/api/todo/add', function (Request $request) use ($app) {
    if (null === $user = $app['session']->get('user')) {
        return $app->redirect('/login');
    }

    $xsrfToken = $app['session']->get('xsrfToken');
    $requestToken = $request->headers->get('Authorization');

    if (empty($xsrfToken) || empty($requestToken) || $xsrfToken !== $requestToken) {
        $response = new Response(json_encode(array('msg' => 'Request unauthorized')));
        return $response->setStatusCode(401);
    }

    $user_id = $user['id'];
    $description = $app->escape($request->get('description'));
    $contentType = $request->headers->get('Content-Type');
    $sql = "INSERT INTO todos (user_id, description) VALUES ('$user_id', '$description')";
    $app['db']->executeUpdate($sql);

    if (strpos($contentType, 'application/json') === false) {
        return $app->redirect('/todo');
    } else {
       return json_encode(array('success' => true));
    }
});


$app->match('/api/todo/delete/{id}', function (Request $request, $id) use ($app) {
    $xsrfToken = $app['session']->get('xsrfToken');
    $requestToken = $request->headers->get('Authorization');

    if (empty($xsrfToken) || empty($requestToken) || $xsrfToken !== $requestToken) {
        $response = new Response(json_encode(array('msg' => 'Request unauthorized')));
        return $response->setStatusCode(401);
    }

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
    $xsrfToken = $app['session']->get('xsrfToken');
    $requestToken = $request->headers->get('Authorization');

    if (empty($xsrfToken) || empty($requestToken) || $xsrfToken !== $requestToken) {
        $response = new Response(json_encode(array('msg' => 'Request unauthorized')));
        return $response->setStatusCode(401);
    }

    $sql = "UPDATE todos SET completed = 1 WHERE id = '$id'";
    $app['db']->executeUpdate($sql);

    $contentType = $request->headers->get('Content-Type');
    if (strpos($contentType, 'application/json') === false) {
        return $app->redirect('/todo');
    } else {
        return json_encode(array('success' => true));
    }
});
