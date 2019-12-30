<?php

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

const API_BASE = '/api/v1';

$app['twig'] = $app->share($app->extend('twig', function ($twig, $app) {
    $twig->addGlobal('user', $app['session']->get('user'));

    return $twig;
}));

$app->before(function (Request $request) use ($app) {
    $contentType = $request->headers->get('Content-Type');
    $isAPI = strpos($request->getRequestUri(), '/api') === 0;
    $isntJSON = strpos($contentType, 'application/json') === false;
    $isntAuth = $app['session']->get('user') === null;

    // only allow json requests to the api
    if ($isAPI && ($isntJSON || $isntAuth)) {
        return $app->redirect('/login');
    }
}, Application::EARLY_EVENT);

/**
 * Workaround to get silex to work as a SPA
 */
$app->error(function (Exception $e) use ($app) {
    $user = $app['session']->get('user');

    return $app['twig']->render('vue.html', [
        'code' => $e ? $e->getCode() : null,
        'message' => $e ? $e->getMessage() : null,
        'username' => $user ? $user['username'] : null,
    ]);
});

$app->post('/login', function (Request $request) use ($app) {
    $body = json_decode($request->getContent());
    $username = $body->username;
    $password = $body->password;

    if ($username) {
        $sql = "SELECT * FROM users WHERE username = ? and password = SHA2(CONCAT(salt, ?, salt), 256)";
        try {
            $user = $app['db']->fetchAssoc($sql, [
                $username,
                $password,
            ]);

            if ($user) {
                $app['session']->set('user', $user);

                return json_encode([
                    'success' => true,
                    'user' => [
                        'username' => $user['username'],
                    ],
                ]);
            }
        } catch (\Exception $ex) {
            return json_encode([
                'success' => false,
                'reason' => 'Something went wrong',
            ]);
        }

        return json_encode([
            'success' => false,
            'reason' => 'User not found',
        ]);
    }

    return json_encode(array('success' => false));
});

$app->post('/logout', function () use ($app) {
    $app['session']->set('user', null);

    return json_encode([
        'success' => true,
    ]);
});

$app->get(API_BASE.'/todo/{id}', function ($id, Request $request) use ($app) {
    $user = $app['session']->get('user');

    if ($id) {
        $sql = "SELECT * FROM todos WHERE id = ?";
        $todo = $app['db']->fetchAssoc($sql, [$id]);

        return json_encode($todo);
    }

    $sql = "SELECT * FROM todos WHERE user_id = ?";
    $todos = $app['db']->fetchAll($sql, [$user['id']]);

    return json_encode($todos);
})
    ->value('id', null);

$app->post(API_BASE.'/todo/add', function (Request $request) use ($app) {
    $user = $app['session']->get('user');

    $userId = $user['id'];
    $description = $request->get('description');

    $sql = "INSERT INTO todos (user_id, description) VALUES (?, ?)";
    $app['db']->executeUpdate($sql, [
        $userId,
        $description,
    ]);

    return json_encode(array('success' => true));
});


$app->post(API_BASE.'/todo/delete/{id}', function (Request $request, $id) use ($app) {
    $user = $app['session']->get('user');

    $sql = "DELETE FROM todos WHERE id = ? and user_id = ?";
    $app['db']->executeUpdate($sql, [
        $id,
        $user['id'],
    ]);

    return json_encode(array('success' => true));
});


$app->post(API_BASE.'/todo/complete/{id}', function (Request $request, $id) use ($app) {
    $user = $app['session']->get('user');

    $sql = "UPDATE todos SET completed = 1 WHERE id = ? and user_id = ?";
    $app['db']->executeUpdate($sql, [
        $id,
        $user['id'],
    ]);

    return json_encode(array('success' => true));
});
