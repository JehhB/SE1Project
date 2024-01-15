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

    public function getEvent(string $eventId): ?Event
    {
        $query = "SELECT * FROM Events WHERE eventId = :id";
        $statement = $this->db->prepare($query);
        $statement->bindParam(':id', $eventId);
        $statement->execute();

        $result = $statement->fetch(PDO::FETCH_ASSOC);

        if (!$result) {
            return null; // Event not found
        }

        // Assuming you have a constructor in the Event class that sets properties
        return new Event($result['eventId'], $result['eventName'], $result['creatorId'], $result['isStrict']);
    }

    public function addEvent(Event $event): string
    {
        $query = "INSERT INTO Events (eventId, eventName, creatorId, isStrict) VALUES (:eventId, :eventName, :creatorId, :isStrict)";
        $id = uniqid();
        $statement = $this->db->prepare($query);
        $statement->bindParam(':eventId', $id); // Assuming your Event class has getId() method
        $statement->bindParam(':eventName', $event->name);
        $statement->bindParam(':creatorId', $event->creatorId);
        $statement->bindParam(':isStrict', $event->isStrict, PDO::PARAM_BOOL); // Assuming isStrict is a boolean field
        $statement->execute();

        // Return the last inserted ID
        return $id;
    }

    /**
     * Retrieves events created by a specific user.
     *
     * @param string $userId User ID to find created events
     * @return Event[] Array of Event objects
     */
    public function getEventByUser(string $userId): array
    {
        $query = "SELECT * FROM Events WHERE creatorId = :creatorId";
        $statement = $this->db->prepare($query);
        $statement->bindParam(':creatorId', $userId);
        $statement->execute();

        $events = [];

        while ($result = $statement->fetch(PDO::FETCH_ASSOC)) {
            $events[] = new Event($result['eventId'], $result['eventName'], $result['creatorId'], $result['isStrict']);
        }

        return $events;
    }
}
