<?php

require_once __DIR__ . "/lib/autoloader.php";

use Model\Entity\User;
use Model\Source\Database;
use Model\Repository\UserRepositoryImpl;
use Util\Auth;
use Util\JWTManager;

function error(int $errorCode = 400, string $errorMessage = "Invalid request")
{
    http_response_code($errorCode);
    echo $errorMessage;
    exit();
}

$database = new Database(
    $_ENV['MYSQL_HOST'] ?? 'localhost',
    $_ENV['MYSQL_DATABASE'] ?? 'database',
    $_ENV['MYSQL_USER'] ?? 'root',
    $_ENV['MYSQL_PASSWORD'] ?? null,
);
$jwtManager = new JWTManager($_ENV['JWT_KEY']);
$auth = new Auth($jwtManager);
$userRepository = new UserRepositoryImpl($database->pdo);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['userId'])) {
            $user = $userRepository->getUser($_GET['userId']);
            User::respond($user);
            exit();
        }
        break;
    case 'POST':
        if (!isset($_POST['action'])) break;
        switch ($_POST['action']) {
            case 'login':
                if (
                    !isset($_POST['email']) or
                    !isset($_POST['password'])
                ) break;
                $userId = $userRepository->authenticateUser($_POST['email'], $_POST['password']);
                if ($userId === false) error(401, "Unauthorized request");
                $auth->authUser($userId);
                exit();
                break;
            case 'signin':
                if (
                    !isset($_POST['email']) or
                    !isset($_POST['password']) or
                    !isset($_POST['username']) or
                    !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) or
                    strlen($_POST['password']) < 8
                ) break;
                $user = new User("", $_POST['username'], $_POST['email'], password_hash($_POST['password'], PASSWORD_DEFAULT));
                $userId = $userRepository->addUser($user);
                $auth->authUser($userId);
                exit();
                break;
        }
        break;
}

error();
