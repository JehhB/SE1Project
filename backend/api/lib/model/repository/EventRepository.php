<?php

namespace Model\Repository;

use Model\Entity\Event;

interface EventRepository {
    /**
     * get event associated with eventId
     * 
     * @param string $eventId id of the event to retrieve
     * @return ?Event null if no event corresponding evendId, otherwise return specified event
     */
    public function getEvent(string $eventId): ?Event;

    /** 
     * add new event, and return eventId
     * 
     * @param Event $event to be inserted
     * @return string id of newly inserted event
    */
    public function addEvent(Event $event): string;
}

