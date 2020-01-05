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
    $username = $request->get('username');
    $password = $request->get('password');

    if ($username) {
        $sql = "SELECT * FROM users WHERE username = '$username' and password = '$password'";
        $user = $app['db']->fetchAssoc($sql);

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

$app->get('/todo/', function (Request $request) use ($app) {
  if (null === $user = $app['session']->get('user')) {
      return $app->redirect('/login');
  }

  $contentType = $request->headers->get('Content-Type');

  $sql = "SELECT * FROM todos WHERE user_id = '${user['id']}'";
  $todos = $app['db']->fetchAll($sql);

  if (strpos($contentType, 'application/json') === false) {
      return $app['twig']->render('todos.html', [
          'todos' => $todos,
      ]);
  } else {
      return json_encode($todos);
  }

});

$app->get('/todo/{id}', function ($id, Request $request) use ($app) {
    if (null === $user = $app['session']->get('user')) {
        return $app->redirect('/login');
    }

    $user_id = $user['id'];
    $contentType = $request->headers->get('Content-Type');

    if ($id){
        $sql = "SELECT * FROM todos WHERE id = '$id'";
        $todo = $app['db']->fetchAssoc($sql);

        // Error if item not found
        if ($todo == null) {
          return new Response('Not found', 404);
      }

      // Error if item belongs to a different user
        if ($user_id != $todo['user_id']) {
          return new Response('Forbidden', 403);
      }

        if (strpos($contentType, 'application/json') === false) {
            return $app['twig']->render('todo.html', [
                'todo' => $todo,
            ]);
        } else {
            return json_encode($todo);
        }

    } else {
        $sql = "SELECT * FROM todos WHERE user_id = '${user['id']}'";
        $todos = $app['db']->fetchAll($sql);

        if (strpos($contentType, 'application/json') === false) {
            return $app['twig']->render('todos.html', [
                'todos' => $todos,
            ]);
        } else {
            return json_encode($todos);
        }
    }
})
->value('id', null);


$app->post('/todo/add', function (Request $request) use ($app) {
    if (null === $user = $app['session']->get('user')) {
        return $app->redirect('/login');
    }

    $user_id = $user['id'];
    $data = json_decode($request->getContent(), true);
    $description = $data['description'];
    $contentType = $request->headers->get('Content-Type');

    $sql = "INSERT INTO todos (user_id, description) VALUES ('$user_id', '$description')";
    $app['db']->executeUpdate($sql);

    if (strpos($contentType, 'application/json') === false) {
        return $app->redirect('/todo');
    } else {
        return json_encode(array('success' => true));
    }
});

$app->match('/todo/delete/{id}', function (Request $request, $id) use ($app) {
  if (null === $user = $app['session']->get('user')) {
    return $app->redirect('/login');
  }


    $sql = "DELETE FROM todos WHERE id = '$id'";
    $app['db']->executeUpdate($sql);

    return json_encode(array('success' => true));
});


$app->match('/todo/complete/{id}', function (Request $request, $id) use ($app) {
  if (null === $user = $app['session']->get('user')) {
    return $app->redirect('/login');
  }

    $sql = "UPDATE todos SET completed = 1 - completed WHERE id = '$id'";
    $app['db']->executeUpdate($sql);

    $contentType = $request->headers->get('Content-Type');
    if (strpos($contentType, 'application/json') === false) {
        return $app->redirect('/todo');
    } else {
        return json_encode(array('success' => true));
    }
});
