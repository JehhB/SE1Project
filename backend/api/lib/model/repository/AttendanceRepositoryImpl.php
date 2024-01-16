<?php

namespace Model\Repository;

use Model\Entity\Attendance;

class AttendanceRepositoryImpl implements AttendanceRepository {
    /**
     * get attendance associated with attendance id
     * 
     * @param string $attendanceId id of the event to retrieve
     * @return ?Attendance null if no attendance corresponding rallcall id, otherwise return specified event
     */
    public function getAttendance(string $attendanceId): ?Attendance {
        // TODO:
    }

    /** 
     * add new attendance, and return eventId
     * 
     * @param Attendance $attendance to be inserted
     * @return string id of newly inserted attendance
    */
    public function addAttendance(Attendance $attendance): string {
        // TODO:
    }

    /**
     * get attendance of an registered event
     * 
     * @param string $registeredEventId id of the registered event to find attendance
     * @return Attendance[]
     */
    public function getAttendanceByRegisteredEvent(string $registeredEventId): array {
        // TODO:
    }
}