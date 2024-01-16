<?php

namespace Model\Repository;

use Model\Entity\RegisteredEvent;
use PDO;

class RegisteredEventRepositoryImpl implements RegisteredEventRepository
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    /**
     * add register event
     * 
     * @param RegisterEvent $registerEvent register event to be added
     * @return string id of the inserted register id
     */
    public function addRegisterEvent(RegisteredEvent $registeredEvent): string
    {
        $query = "INSERT INTO RegisteredEvents (registeredEventId, eventId, sessionId, userId) VALUES (:id, :eventId, :sessionId, :userId)";
        $statement = $this->db->prepare($query);
        $id = uniqid();
        $statement->bindParam(':id', $id);
        $statement->bindParam(':eventId', $registeredEvent->eventId);
        $statement->bindParam(':sessionId', $registeredEvent->sessionId);
        $statement->bindParam(':userId', $registeredEvent->userId);
        $statement->execute();

        // Return the last inserted ID
        return $id;
    }

    /** 
     * get registered event specified corresponding $registeredEventId
     * 
     * @param string $registeredEventId id to find
     * @return ?RegisteredEvent registered event corresponding $registeredEventId, null if it doesn't exist
     */
    public function getRegisteredEvent(string $registeredEventId): ?RegisteredEvent
    {
        $query = "SELECT * FROM RegisteredEvents WHERE registeredEventId = :registeredEventId";
        $statement = $this->db->prepare($query);
        $statement->bindParam(':registeredEventId', $registeredEventId);
        $statement->execute();

        $result = $statement->fetch(PDO::FETCH_ASSOC);

        if (!$result) {
            return null; // Registered event not found
        }

        // Assuming you have a constructor in the RegisteredEvent class that sets properties
        return new RegisteredEvent($result['registeredEventId'], $result['eventId'], $result['sessionId'], $result['userId']);
    }

    /**
     * get registered events of user
     * 
     * @param string $userId id of user to find registered events
     * @return RegisteredEvent[] return array of registered events by the user
     */
    public function getRegisteredEventsOfUser(string $userId): array
    {
        $query = "SELECT * FROM RegisteredEvents WHERE userId = :userId";
        $statement = $this->db->prepare($query);
        $statement->bindParam(':userId', $userId);
        $statement->execute();

        $registeredEvents = [];

        while ($result = $statement->fetch(PDO::FETCH_ASSOC)) {
            // Assuming you have a constructor in the RegisteredEvent class that sets properties
            $registeredEvents[] = new RegisteredEvent($result['registeredEventId'], $result['eventId'], $result['sessionId'], $result['userId']);
        }

        return $registeredEvents;
    }
}
