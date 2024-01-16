<?php

namespace Model\Repository;

use Model\Entity\Rollcall;

interface RollcallRepository {
    /**
     * get rollcall associated with rollcall id
     * 
     * @param string $rollcallId id of the event to retrieve
     * @return ?Rollcall null if no rollcall corresponding rallcall id, otherwise return specified event
     */
    public function getRollcall(string $rollcallId): ?Rollcall;

    /** 
     * add new rollcall, and return eventId
     * 
     * @param Rollcall $rollcall to be inserted
     * @return string id of newly inserted rollcall
    */
    public function addRollcall(Rollcall $rollcall): string;

    /**
     * get rollcall of an event
     * 
     * @param string $event event to find rollcalls
     * @return Rollcall[]
     */
    public function getRollcallByEvent(string $eventId): array;
}