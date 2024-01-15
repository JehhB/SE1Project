<?php

namespace Model\Repository;

use Model\Entity\RegisteredEvent;
use Model\Entity\User;
use PDO;

class RegisteredEventRepositoryImpl implements RegisteredEventRepository{
    private PDO $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }


    /**
     * add register event
     * 
     * @param RegisterEvent $registerEvent register event to be added
     * @return string id of the inserted register id
     */
    public function addRegisterEvent(RegisteredEvent $registeredEvent) : string
    {
        // TODO: pagawa
    }

    /** 
     * get registered event specified corresponding $registeredEventId
     * 
     * @param string $registeredEventId id to find
     * @return ?RegisteredEvent registered event corresponding $registeredEvent, null if it doesn't exist
    */
    public function getRegisteredEvent(string $registeredEventId) : ?RegisteredEvent {
        // TODO: pagawa
    }

    /**
     * get registered events of user
     * 
     * @param string $userId id of user to find registered events
     * @return RegisteredEvent[] return array of registered events by the user
     */
    public function getRegisteredEventsOfUser(string $userId): array {
        // TODO: pagawa
    }
}