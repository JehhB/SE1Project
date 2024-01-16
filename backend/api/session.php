<?php

require_once __DIR__ . '/lib/autoloader.php';

use Util\JWTManager;
use Util\Auth;

$jwtManager = new JWTManager($_ENV['JWT_KEY']);
$auth = new Auth($jwtManager);

if($_SERVER['REQUEST_METHOD'] == 'GET') {
    $auth->createSession();
}