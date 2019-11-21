AskNicely PHP frontend test
===========================


### Application
The TODO App allows a user to add reminders of things they need to do. Here are the requirements for the app.
* Users can add, delete and see their todos.
* All the todos are private, users can't see other user's todos.
* Users must be logged in order to add/delete/see their todos.

Credentials:
* username: **user1**
* password: **user1**

#### Homepage:
![Homepage](/web/img/homepage.png?raw=true "Homepage")

#### Login page:
![Login page](/web/img/login-page.png?raw=true "Login page")

#### Todos:
![Todos](/web/img/todos.png?raw=true "Todos")

### Requirements
* php 5.3+
* mysql
* A github account

### Updated Installation Guide
**/!\ You need to fork this repository. See [How to submit your work?](#how-to-submit-your-work)**
```sh

php composer.phar install
cp config/config.yml.dist config/config.yml
mysql -u root <database> < resources/database.sql
mysql -u root <database> < resources/fixtures.sql


To start the backend at port 4000 (linked to React front end), please use :

php -S localhost:4000 -t web/ web/index.php


To run PHPUnit for backend unit testing, please make sure that backend is running at port 4000 and use command :

vendor/bin/phpunit


Then please run the front end by using these commands : 

cd frontend
npm start

To run Jest + Enzyme unit testing for front-end, please use : 

npm test





```sh
### Installation
**/!\ You need to fork this repository. See [How to submit your work?](#how-to-submit-your-work)**
```sh
php composer.phar install
cp config/config.yml.dist config/config.yml
mysql -u root <database> < resources/database.sql
mysql -u root <database> < resources/fixtures.sql
php -S localhost:1337 -t web/ web/index.php
```
You can change the database connection from the file `config/config.yml`.

### Instructions

You will be asked to improve the code of this app with the following tasks.

You can complete the tasks in any order.

### What we are looking for?
1. Separate your <b>commits by task</b> and use the following format for your commit messages: TASK-{task number}: {meaningful message}
2. We care about UI/UX, any attention to detail in the UI will be noticed. Please dont hack in UI changes. 
3. Simple clear code comments are helpful.   

### Tasks
* TASK 1: As a user I can mark a todo as completed.
* TASK 2: Using JQuery, Vue.js, or React render the todo list dynamically and allow the delete and completed buttons to work via Ajax<br>
 We care about the user experience here, this might be animation?  
 
    

Extra tasks:
- Fix any bugs you may find.
- Fix any security issues you may find.
- Adding a few unit tests to show us that you understand how they work is a bonus. 

### Documentation
This app use [Silex](http://silex.sensiolabs.org/), a  micro-framework based on the Symfony2 Components.
Documentation can be found here: http://silex.sensiolabs.org/documentation


### How to submit your work?

1. ##### First you need to fork this repository.
![Forking a repo](/web/img/fork.png?raw=true "Forking a repo")

2. ##### Then clone your fork locally.
![Cloning a repo](/web/img/clone.png?raw=true "Cloning a repo")

3. ##### Install the app locally. See the [Installation Guide] (#Installation).

4. ##### Once you've completed your work, you can submit a pull-request to the remote repository.
![ a Pull Request](/web/img/pull-request.png?raw=true "Creating a Pull Request")

5. ##### Review your changes and validate.
![Validating a Pull Request](/web/img/pull-request-review.png?raw=true "Validating a Pull Request")



And you're done!


More documentation on Github:
* https://help.github.com/articles/fork-a-repo/
* https://help.github.com/articles/using-pull-requests/

