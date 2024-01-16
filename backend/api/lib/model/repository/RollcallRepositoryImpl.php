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
        $query = "SELECT * FROM Rollcalls WHERE rollcallId = :rollcallId";
        $statement = $this->db->prepare($query);
        $statement->bindParam(':rollcallId', $rollcallId);
        $statement->execute();

        $result = $statement->fetch(PDO::FETCH_ASSOC);

        if (!$result) {
            return null; // Rollcall not found
        }

        // Assuming you have a constructor in the Rollcall class that sets properties
        return new Rollcall($result['rollcallId'], $result['eventId'], $result['location'], $result['timeStart'], $result['timeEnd']);
    }

    /** 
     * add new rollcall, and return eventId
     * 
     * @param Rollcall $rollcall to be inserted
     * @return string id of newly inserted rollcall
    */
    public function addRollcall(Rollcall $rollcall): string {
        $query = "INSERT INTO Rollcalls (rollcallId, eventId, location, timeStart, timeEnd) VALUES (:rollcallId, :eventId, :location, :timeStart, :timeEnd)";
        $statement = $this->db->prepare($query);
        $id = uniqid();
        $statement->bindParam(':rollcallId', $id);
        $statement->bindParam(':eventId', $rollcall->eventId);
        $statement->bindParam(':location', $rollcall->location);
        $statement->bindParam(':timeStart', $rollcall->timeStart);
        $statement->bindParam(':timeEnd', $rollcall->timeEnd);
        $statement->execute();

        // Return the last inserted ID
        return $id;
    }

    /**
     * get rollcall of an event
     * 
     * @param string $event event to find rollcalls
     * @return Rollcall[]
     */
    public function getRollcallByEvent(string $eventId): array {
        $query = "SELECT * FROM Rollcalls WHERE eventId = :eventId";
        $statement = $this->db->prepare($query);
        $statement->bindParam(':eventId', $eventId);
        $statement->execute();

        $rollcalls = [];

        while ($result = $statement->fetch(PDO::FETCH_ASSOC)) {
            // Assuming you have a constructor in the Rollcall class that sets properties
            $rollcalls[] = new Rollcall($result['rollcallId'], $result['eventId'], $result['location'], $result['timeStart'], $result['timeEnd']);
        }

        return $rollcalls;
    }
}
