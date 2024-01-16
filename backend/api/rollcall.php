<?php

require_once __DIR__ . '/lib/autoloader.php';

use Model\Entity\Event;
use Model\Entity\Rollcall;
use Model\Source\Database;
use Model\Repository\EventRepositoryImpl;
use Model\Repository\RollcallRepositoryImpl;
use Util\JWTManager;
use Util\Auth;


function error(int $errorCode = 400, string $errorMessage = "Invalid request") {
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
$eventRepository = new EventRepositoryImpl($database->pdo);
$rollcallRepository = new RollcallRepositoryImpl($database->pdo);

$jwtManager = new JWTManager($_ENV['JWT_KEY']);
$auth = new Auth($jwtManager);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $userId = $auth->getAuth();
        if ($userId === false) error(500, "Unauthorized");

        if (!isset($_POST['eventId']) or
            !isset($_POST['location']) or
            !isset($_POST['timeStart']) or 
            !isset($_POST['timeEnd'])) error();

        $event = $eventRepository->getEvent('eventId');
        if ($event === null) error();
        if ($event->creatorId != $userId) error();

        $rollcall = new Rollcall("", $_POST['eventId'], $_POST['location'], $_POST['timeStart'], $_POST['timeEnd']);
        $rollcallId = $rollcallRepository->addRollcall($rollcall);
        exit();
        break;
    case 'GET':
        if (isset($_GET['eventId'])) {
            $rollcalls = $rollcallRepository->getRollcallByEvent($_GET['eventId']);
            header('Content-Type: application/json');
            echo json_encode($rollcalls);
            exit();
        } 

        if (!isset($_GET['rollcallId'])) error();
        $rollcall = $rollcallRepository->getRollcall($_GET['rollcallId']);
        Event::respond($rollcall);
        break;
}

error();