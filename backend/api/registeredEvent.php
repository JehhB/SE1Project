<?php
require_once __DIR__ . '/lib/autoloader.php';

use Model\Entity\RegisteredEvent;
use Model\Repository\EventRepositoryImpl;
use Model\Repository\RegisteredEventRepositoryImpl;
use Model\Source\Database;
use Util\Auth;
use Util\JWTManager;

$database = new Database(
    $_ENV['MYSQL_HOST'] ?? 'localhost',
    $_ENV['MYSQL_DATABASE'] ?? 'database',
    $_ENV['MYSQL_USER'] ?? 'root',
    $_ENV['MYSQL_PASSWORD'] ?? null,
);

$eventRepository = new EventRepositoryImpl($database->pdo);
$registeredEventRepository = new RegisteredEventRepositoryImpl($database->pdo);

$jwtManager = new JWTManager($_ENV['JWT_KEY']);
$auth = new Auth($jwtManager);

function error(int $errorCode = 400, string $errorMessage = "Invalid request") {
    http_response_code($errorCode);
    echo $errorMessage;
    exit();
}

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['registeredEventId'])) {
            $registeredEvent = $registeredEventRepository->getRegisteredEvent($_GET['registeredEventId']);
            RegisteredEvent::respond($registeredEvent);
            exit();
        }

        $userId = $auth->getAuth();
        if ($userId === false) error(500, "Unauthorized request");
        $registeredEvents = $registeredEventRepository->getRegisteredEventsOfUser($_SESSION['userId']);

        header('Content-Type: application/json');
        echo json_encode($registeredEvents);
        exit();
        break;
    case 'POST':
        $authPayload = $auth->getAuthPayload();
        if ($authPayload === null) error(500, "Unauthorized reqest");

        if (!isset($_POST['eventId']) || !isset($_POST['registeredName'])) error();
        $event = $eventRepository->getEvent($_POST['eventId']);
        if ($event === null) error();

        $registeredEvent = new RegisteredEvent("", $_POST['eventId'], $authPayload['sessId'], $_POST['registeredName'], $authPayload['userId'] ?? null);
        $registeredEventId = $registeredEventRepository->addRegisterEvent($registeredEvent);

        header('Content-Type: application/json');
        echo json_encode(array('registeredEventId' => $registeredEventId));
        break;
}

error();