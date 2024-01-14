<?php

namespace Model\Source;

use PDO;

class DatabaseMock {
    public ?PDO $db;

    public function __construct() {
        $this->db = new PDO('sqlite::memory:');
        $this->db->exec('
        CREATE TABLE User (
            userId TEXT PRIMARY KEY,
            userName TEXT,
            email TEXT,
            passwordHash TEXT
        )
        ');
        $this->db->exec('
        CREATE TABLE Event (
            eventId TEXT PRIMARY KEY,
            creatorId TEXT,
            eventName TEXT,
            isStrict BOOLEAN,
            FOREIGN KEY (creatorId) REFERENCES User(userId)
        )
        ');
    }
}