<?php

require_once __DIR__ . '/lib/autoloader.php';

use Model\Source\Database;
use Model\Entity\Event;
use Model\Repository\EventRepositoryImpl;
use Model\Repository\UserRepositoryImpl;
use Util\Auth;
use Util\JWTManager;

session_start();

$database = new Database(
    $_ENV['MYSQL_HOST'] ?? 'localhost',
    $_ENV['MYSQL_DATABASE'] ?? 'database',
    $_ENV['MYSQL_USER'] ?? 'root',
    $_ENV['MYSQL_PASSWORD'] ?? null,
);
$eventRepository = new EventRepositoryImpl($database->pdo);
$userRepository = new UserRepositoryImpl($database->pdo);

$jwtManager = new JWTManager($_ENV['JWT_KEY']);
$auth = new Auth($jwtManager);

function error(int $errorCode = 400, string $errorMessage = "Invalid request") {
    http_response_code($errorCode);
    echo $errorMessage;
    exit();
}

switch ($_SERVER["REQUEST_METHOD"]) {
    case 'GET':
        if (isset($_GET['eventId'])) {
            $event = $eventRepository->getEvent($_GET['eventId']);
            Event::respond($event);
            exit();
        }
        break;
    case 'POST':
        if (!isset($_POST['eventName']) or
            !isset($_POST['isStrict'])) break;

        $userId = $auth->getAuth();
        if ($userId === false) error(500, "Unauthorized");

        $user = $userRepository->getUser($userId);
        if (is_null($user)) error(500, "Unautorized");

        $event = new Event("", $_POST['eventName'], $user->userId, $_POST['isStrict']);
        $eventId = $eventRepository->addEvent($event);

        header('Content-Type: application/json');
        echo json_encode(array("eventId" => $eventId));
        exit();
        break;
}

error();