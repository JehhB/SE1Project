<?php

namespace Model\Repository;

use Model\Entity\Rollcall;
use PDO;

class RollcallRepositoryImpl implements RollcallRepository {
    private PDO $db;

    public function __construct(PDO $db = null)
    {
        $this->db = $db;
    }

    /**
     * get rollcall associated with rollcall id
     * 
     * @param string $rollcallId id of the event to retrieve
     * @return ?Rollcall null if no rollcall corresponding rallcall id, otherwise return specified event
     */
    public function getRollcall(string $rollcallId): ?Rollcall {
        // TODO:
    }

    /** 
     * add new rollcall, and return eventId
     * 
     * @param Rollcall $rollcall to be inserted
     * @return string id of newly inserted rollcall
    */
    public function addRollcall(Rollcall $rollcall): string {
        // TODO:
    }

    /**
     * get rollcall of an event
     * 
     * @param string $event event to find rollcalls
     * @return Rollcall[]
     */
    public function getRollcallByEvent(string $eventId): array {
        // TODO:
    }

}