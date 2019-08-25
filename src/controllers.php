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
    
    $twig->addGlobal('dist_scripts', array_reverse($distScripts));
     
    return $twig;
}));

$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});


$app->get('/', function () use ($app) {
    return $app['twig']->render('index.html', [
        'readme' => file_get_contents('README.md'),
    ]);
});


$app->match('/login', function (Request $request) use ($app) {
    $username = $request->request->get('username');
    $password = $request->request->get('password');

  if ($username) {
         $sql = "SELECT * FROM users WHERE username = '$username' and password = '$password'";
         $user = $app['db']->fetchAssoc($sql);
 
         if ($user){
             $app['session']->set('user', $user);
             return $app->json($user, 200);
            
         }else{
           $error = array('error' => 'User not found');
           return new Response(json_encode($error), 400);
         }
     }
     return $app->json('', 204);
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

    if ($id){
        $sql = "SELECT * FROM todos WHERE id = '$id'";
        $todo = $app['db']->fetchAssoc($sql);

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
        return json_encode($todos);
    }
})
->value('id', null);


$app->post('/todo/add', function (Request $request) use ($app) {
    if (null === $user = $app['session']->get('user')) {
        return $app->redirect('/login');
    }

    $user_id = $user['id'];
    $description = $request->request->get('description');
    $contentType = $request->headers->get('Content-Type');

    $sql = "INSERT INTO todos (user_id, description) VALUES ('$user_id', '$description')";
    $app['db']->executeUpdate($sql);

    return json_encode(array('success' => true));
   
});


$app->match('/todo/delete/{id}', function (Request $request, $id) use ($app) {

    $sql = "DELETE FROM todos WHERE id = '$id'";
    $app['db']->executeUpdate($sql);

    return json_encode(array('success' => true));
   
});


$app->match('/todo/complete/{id}', function (Request $request, $id) use ($app) {

    $sql = "UPDATE todos SET completed = 1 WHERE id = '$id'";
    $app['db']->executeUpdate($sql);

    $contentType = $request->headers->get('Content-Type');
    if (strpos($contentType, 'application/json') === false) {
        return $app->redirect('/todo');
    } else {
        return json_encode(array('success' => true));
    }
});
