<?php

namespace Model\Source;

use PDO;

class DatabaseMock
{
    public ?PDO $db;

    public function __construct()
    {
        $this->db = new PDO('sqlite::memory:');
        $this->db->exec('
            CREATE TABLE Users (
                userId TEXT PRIMARY KEY,
                userName TEXT NOT NULL,
                email TEXT NOT NULL,
                passwordhash TEXT NOT NULL
            )
        ');
        $this->db->exec('
            CREATE TABLE Events (
                eventId TEXT PRIMARY KEY,
                eventName TEXT NOT NULL,
                creatorId TEXT NOT NULL,
                isStrict BOOLEAN,
                FOREIGN KEY (creatorId) REFERENCES Users(userid)
            )
        ');
        $this->db->exec('
            CREATE TABLE RegisteredEvents (
                registeredEventId TEXT PRIMARY KEY,
                eventId TEXT NOT NULL,
                sessionId TEXT NOT NULL,
                registeredName TEXT NOT NULL,
                userId TEXT,
                FOREIGN KEY (eventId) REFERENCES Events(eventId),
                FOREIGN KEY (userId) REFERENCES Users(userid)
            )
        ');
        $this->db->exec('
            CREATE TABLE Rollcalls (
                rollcallId TEXT PRIMARY KEY,
                eventId TEXT NOT NULL,
                location TEXT NOT NULL,
                timeStart DATETIME NOT NULL,
                timeEnd DATETIME NOT NULL,
                FOREIGN KEY (eventId) REFERENCES Events(eventId)
            )
        ');
        $this->db->exec('
            CREATE TABLE Attendances (
                attendanceId TEXT PRIMARY KEY,
                registeredEventId TEXT NOT NULL,
                rollcallId TEXT NOT NULL,
                timestamp DATETIME NOT NULL,
                isAccepted BOOLEAN,
                FOREIGN KEY (registeredEventId) REFERENCES RegisteredEvents(registeredEventId),
                FOREIGN KEY (rollcallId) REFERENCES Rollcalls(rollcallId)
            )
        ');
    }
}
