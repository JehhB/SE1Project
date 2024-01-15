<?php

namespace Model\Repository;

use Model\Entity\Event;
use PDO;

class EventRepositoryImpl implements EventRepository
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    /**
     * get event associated with eventId
     * 
     * @param string $eventId id of the event to retrieve
     * @return ?Event null if no event corresponding evendId, otherwise return specified event
     */
    public function getEvent(string $eventId): ?Event
    {
        $query = "SELECT * FROM events WHERE id = :id";
        $statement = $this->db->prepare($query);
        $statement->bindParam(':id', $eventId);
        $statement->execute();

        $result = $statement->fetch(PDO::FETCH_ASSOC);

        if (!$result) {
            return null; // Event not found
        }

        // Assuming you have a constructor in the Event class that sets properties
        return new Event($result['id'], $result['evetName'], $result['date']);
    }

    /** 
     * add new event, and return eventId
     * 
     * @param Event $event to be inserted
     * @return string id of newly inserted event
    */
    public function addEvent(Event $event): string
    {
        $query = "INSERT INTO events (name, date) VALUES (:name, :date)";
        $statement = $this->db->prepare($query);
        $statement->bindParam(':name', $event->getName());
        $statement->bindParam(':date', $event->getDate());
        $statement->execute();

        // Return the last inserted ID
        return $this->db->lastInsertId();
    }
}
