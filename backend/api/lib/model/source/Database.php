<?php

namespace Model\Source;

use PDO;

class Database {
    public PDO $pdo;

    public function __construct(?string $hostname = null, ?string $dbname = null, ?string $user = null, ?string $password = null) {
        $hostname ??= 'localhost';
        $dbname ??= 'database';

        $this->pdo = new PDO("mysql:host=$hostname;dbname=$dbname", $user, $password);
    }
}