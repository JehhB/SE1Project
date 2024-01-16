<?php

namespace Model\Entity;

/**
 * @property string $rollcallId id of the rollcall
 * @property string $eventId id of the event this rollcall belongs to
 * @property string $location valid location for to take attendance
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
     * Function to send a json representation of rollcall as response
     * error code is 404 if $rollcall is null, otherwise 200
     * 
     * @param ?Rollcall $rollcall rall call to send
     */
    public static function respond(?Rollcall $rollcall) {
        // TODO: pagawa
    }
}