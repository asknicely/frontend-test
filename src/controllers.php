<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;

function fetch_user_todo($app) {
    $user = $app['session']->get('user');
    $sql = "SELECT * FROM todos WHERE user_id = '${user['id']}' ORDER BY completed";
    return $app['db']->fetchAll($sql);
}

function has_access($app, $id) {
    $user = $app['session']->get('user');
    $sql = "SELECT * FROM todos WHERE id = '$id'";
    $todo = $app['db']->fetchAssoc($sql);

    if ($todo === false) {
        return false;
    }

    if ($todo['user_id'] !== $user['id']) {
        return false;
    }

    return true;
}

$check_user_logged_in = function (Request $request, Application $app) {
    if (null === $user = $app['session']->get('user')) {
        return $app->redirect('/login');
    }
};

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


$app->get('/todo/{id}', function ($id, Request $request) use ($app) {
    $contentType = $request->headers->get('Content-Type');

    if ($id){
        $user = $app['session']->get('user');
        $sql = "SELECT * FROM todos WHERE id = '$id'";
        $todo = $app['db']->fetchAssoc($sql);

        if ($todo === false) {
          return $app['twig']->render('404.html');
        }

        if ($todo['user_id'] !== $user['id']) {
          return $app['twig']->render('403.html');
        }

        if (strpos($contentType, 'application/json') === false) {
            return $app['twig']->render('todo.html', [
                'todo' => $todo,
            ]);
        } else {
            return json_encode($todo);
        }

    } else {
        $todos = fetch_user_todo($app);

        if (strpos($contentType, 'application/json') === false) {
            return $app['twig']->render('todos.html', [
                'todos' => $todos,
            ]);
        } else {
            return json_encode($todos);
        }
    }
})
->value('id', null)->before($check_user_logged_in);


$app->post('/todo/add', function (Request $request) use ($app) {
    $user = $app['session']->get('user');
    $user_id = $user['id'];
    $description = $request->get('description');
    $contentType = $request->headers->get('Content-Type');

    if ($description !== "") {
      $sql = "INSERT INTO todos (user_id, description) VALUES ('$user_id', '$description')";
      $app['db']->executeUpdate($sql);
    }

    if (strpos($contentType, 'application/json') === false) {
        return $app->redirect('/todo');
    } else {
        return json_encode(fetch_user_todo($app));
    }
})->before($check_user_logged_in);


$app->match('/todo/delete/{id}', function (Request $request, $id) use ($app) {
    if (!has_access($app, $id)) {
      return $app->redirect('/todo');
    };

    $sql = "DELETE FROM todos WHERE id = '$id'";
    $app['db']->executeUpdate($sql);

    $contentType = $request->headers->get('Content-Type');
    if (strpos($contentType, 'application/json') === false) {
        return $app->redirect('/todo');
    } else {
        return json_encode(fetch_user_todo($app));
    }
})->before($check_user_logged_in);


$app->match('/todo/complete/{id}', function (Request $request, $id) use ($app) {
    if (!has_access($app, $id)) {
      return $app->redirect('/todo');
    };

    $sql = "UPDATE todos SET completed = 1 WHERE id = '$id'";
    $app['db']->executeUpdate($sql);

    $contentType = $request->headers->get('Content-Type');
    if (strpos($contentType, 'application/json') === false) {
        return $app->redirect('/todo');
    } else {
        return json_encode(fetch_user_todo($app));
    }
})->before($check_user_logged_in);

// Handle error pages, comment out for debugging
$app->error(function (\Exception $e, $code) use ($app) {
  switch ($code) {
      case 404:
          $message = $app['twig']->render('404.html');
          break;
      default:
          $message = $app['twig']->render('500.html');
  }
  return new Response($message, $code);
});
