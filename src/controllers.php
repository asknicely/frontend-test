<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\JsonResponse;

//add the flashbag in controller to get the message, but cant figure out how to implement the message in frondend, so the flashbag havnt use.
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
    if (null === $user = $app['session']->get('user')) {
        return $app->redirect('/login');
    }

    $contentType = $request->headers->get('Content-Type');

    if ($id){
        $sql = "SELECT * FROM todos WHERE id = '$id'";
        $todo = $app['db']->fetchAssoc($sql);

        //check if this user have auth to check this todo, compare the seesion user id with todo user id
        //try to use flashbag and httpstatus to return the message to frontend, but dont know how to implement the message in frontend

        // if($user['id'] != $todo['user_id']){
        //     // $response=new Response();
        //     // $response->setStatusCode(401, 'You are not authorized to view this page.');
        //     // return $response;
        //     // return new JsonResponse('You are not authorized to view this page.',401);
        //     // $app['session']->getFlashBag()->add('error', 'You are not authorized to view this page.');
        //     return $app->redirect('/todo');
        // }

        if (strpos($contentType, 'application/json') === false) {

            //check if this user have auth to check this todo, compare the seesion user id with todo user id, if yes, return auth=0
            if($user['id'] != $todo['user_id']){
                return $app['twig']->render('todo.html', [
                    'auth' => 0,
                ]);
            }
            //if the user is authorized to this todo, return auth=1
            else{
                return $app['twig']->render('todo.html', [
                    'todo' => $todo,
                    'auth'  => 1,
                ]);
            }
            
        } else {
            return json_encode($todo);
        }

    } else {
        //select the todo list of this user and order by the todo_id and show the incomplete before the completed todo.
        $sql = "SELECT * FROM todos WHERE user_id = '${user['id']}' ORDER BY completed ASC , id DESC";

        //count the numbers of todo in order to do the Pagination in frondend
        $sqlcount = "SELECT COUNT(*) FROM todos WHERE user_id = '${user['id']}'";
        $total= $app['db']->fetchColumn($sqlcount);
        $todos = $app['db']->fetchAll($sql);

        if (strpos($contentType, 'application/json') === false) {
            return $app['twig']->render('todos.html', [
                'todos' => $todos,
                'total' => $total,
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
    $description = $request->get('description');
    $contentType = $request->headers->get('Content-Type');

    //add validation to description in backend. The description can not be null.
    //But the validation also done in frondend.
    $validator = Validation::createValidator();
    $notBlankContraint=new Assert\NotBlank();
    $notBlankContraint->message = "Description can not be blank";
    $errors = $violations = $validator->validate($description,$notBlankContraint);

    if(0 === count($errors)){
        $sql = "INSERT INTO todos (user_id, description) VALUES ('$user_id', '$description')";
        $app['db']->executeUpdate($sql);

        if (strpos($contentType, 'application/json') === false) {
            $app['session']->getFlashBag()->add('success', 'You have been successfully added a todo.');
            return $app->redirect('/todo');
        } else {
            return json_encode(array('success' => true));
        }
    }
    else{
        $app['session']->getFlashBag()->add('error', $errors[0]->getMessage());
        return $app->redirect('/todo');
    }
    

    
});


$app->match('/todo/delete/{id}', function (Request $request, $id) use ($app) {

    $sql = "DELETE FROM todos WHERE id = '$id'";
    $app['db']->executeUpdate($sql);

    $contentType = $request->headers->get('Content-Type');

    if (strpos($contentType, 'application/json') === false) {
        $app['session']->getFlashBag()->add('success', 'You have been successfully deleted a todo.');
        return $app->redirect('/todo');
    } else {
        return json_encode(array('success' => true));
    }
});


$app->match('/todo/complete/{id}', function (Request $request, $id) use ($app) {

    $sql = "UPDATE todos SET completed = 1 WHERE id = '$id'";
    $app['db']->executeUpdate($sql);

    $contentType = $request->headers->get('Content-Type');
    if (strpos($contentType, 'application/json') === false) {
        $app['session']->getFlashBag()->add('success', 'You have been successfully completed a todo.');
        return $app->redirect('/todo');
    } else {
        return json_encode(array('success' => true));
    }
});
