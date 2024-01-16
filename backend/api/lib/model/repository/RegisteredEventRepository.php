<?php

namespace Model\Repository;

use Model\Entity\RegisteredEvent;
use Model\Entity\User;

interface RegisteredEventRepository {
    /**
     * add register event
     * 
     * @param RegisterEvent $registerEvent register event to be added
     * @return string id of the inserted register id
     */
    public function addRegisterEvent(RegisteredEvent $registeredEvent) : string;
    
    /** 
     * get registered event specified corresponding $registeredEventId
     * 
     * @param string $registeredEventId id to find
     * @return ?RegisteredEvent registered event corresponding $registeredEvent, null if it doesn't exist
    */
    public function getRegisteredEvent(string $registeredEventId) : ?RegisteredEvent;

    /**
     * get registered events of user
     * 
     * @param string $userId id of user to find registered events
     * @return RegisteredEvent[] return array of registered events by the user
     */
    public function getRegisteredEventsOfUser(string $userId): array;

    /**
     * get registered events depending on authentication, 
     * if event is strict only return registered events with same sessionId
     * otherwise return registered events with same userId
     * 
     * @param ?string $userId id of user
     * @param string $sessionId id of session to check
     * @return RegisteredEvent[] return array of registered events by the session
     */
    public function getRegisteredEventByAuth(?string $userId, string $sessionId) : array;
}