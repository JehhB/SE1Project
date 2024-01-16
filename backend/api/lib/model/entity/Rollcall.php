<?php

namespace Model\Entity;

/**
 * @property string $rollcallId id of the rollcall
 * @property string $eventId id of the event this rollcall belongs to
 * @property string $location valid location for taking attendance
 * @property string $timeStart timestamp to start taking event
 * @property string $timeEnd timestamp to end taking event
 */
class Rollcall {
    public string $rollcallId;
    public string $eventId;
    public string $location;
    public string $timeStart;
    public string $timeEnd;

    public function __construct(string $rollcallId, string $eventId, string $location, string $timeStart, string $timeEnd) {
        $this->rollcallId = $rollcallId;
        $this->eventId = $eventId;
        $this->location = $location;
        $this->timeStart = $timeStart;
        $this->timeEnd = $timeEnd;
    }

    /**
     * Function to send a JSON representation of rollcall as response
     * Error code is 404 if $rollcall is null, otherwise 200
     * 
     * @param ?Rollcall $rollcall Rollcall to send
     */
    public static function respond(?Rollcall $rollcall) {
        if ($rollcall === null) {
            // Rollcall not found, respond with 404
            http_response_code(404);
            echo json_encode(['error' => 'Rollcall not found']);
        } else {
            // Rollcall found, respond with 200 and the JSON representation
            http_response_code(200);
            echo json_encode([
                'rollcallId' => $rollcall->rollcallId,
                'eventId' => $rollcall->eventId,
                'location' => $rollcall->location,
                'timeStart' => $rollcall->timeStart,
                'timeEnd' => $rollcall->timeEnd,
            ]);
        }
    }
}
