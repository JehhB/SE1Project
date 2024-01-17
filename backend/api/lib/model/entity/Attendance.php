<?php

namespace Model\Entity;

/**
 * @property string $attendanceId id of the the attendance
 * @property string $registeredEventId id of the registered event
 * @property string $rollcallId id of the rollcall
 * @property string $timestamp timestamp when the attendance is made
 */
class Attendance {
    public string $attendanceId;
    public string $registeredEventId;
    public string $rollcallId;
    public string $timestamp;

    public function __construct(string $attendanceId, string $registeredEventId, string $rollcallId, string $timestamp) {
        $this->attendanceId = $attendanceId;
        $this->rollcallId = $rollcallId;
        $this->timestamp = $timestamp;
        $this->registeredEventId = $registeredEventId;
    }

     /**
     * Function to send a json representation of attendance as response
     * error code is 404 if $attendance is null, otherwise 200
     * 
     * @param ?attendance $attendance rall call to send
     */
    public static function respond(?Attendance $attendance) {
        // TODO: pagawa
        if ($attendance === null) {
            http_response_code(404);
            echo json_encode(['error' => 'Event not found']);
        } else {
            http_response_code(200);
            echo json_encode([
                'attendanceId' => $attendance->attendanceId,
                'registeredEventId' => $attendance->registeredEventId,
                'rollcallId' => $attendance->rollcallId,
                'timestamp' => $attendance->timestamp,
               
            ]);
        }
    }
}