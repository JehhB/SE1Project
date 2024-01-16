<?php

namespace Model\Repository;

use Model\Entity\Attendance;
use PDO;

class AttendanceRepositoryImpl implements AttendanceRepository
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    /**
     * Get attendance associated with attendance id
     *
     * @param string $attendanceId Id of the event to retrieve
     * @return ?Attendance|null Null if no attendance corresponding to the ID, otherwise return specified event
     */
    public function getAttendance(string $attendanceId): ?Attendance
    {
        // TODO:
        $query = "SELECT * FROM Attendances WHERE attendanceId = :id";
        $statement = $this->db->prepare($query);
        $statement->bindParam(':id', $attendanceId);
        $statement->execute();

        $result = $statement->fetch(PDO::FETCH_ASSOC);

        if (!$result) {
            return null; // Event not found
        }

        // Assuming you have a constructor in the Event class that sets properties
        return new Attendance($result['attendanceId'], $result['registeredEventId'], $result['rollcallId'], $result['timestamp']);
    }

    /**
     * Add new attendance and return attendance ID
     *
     * @param Attendance $attendance To be inserted
     * @return string Id of the newly inserted attendance
     */
    public function addAttendance(Attendance $attendance): string
    {
        // TODO:
        $query = "INSERT INTO Attendances (attendanceId, registeredEventId, rollcallId,timestamp) VALUES (:attendanceId, :registeredEventId, :rollcallId,:timestamp)";
        $id = uniqid();
        $statement = $this->db->prepare($query);
        $statement->bindParam(':attendanceId', $id);
        $statement->bindParam(':registeredEventId', $attendance->registeredEventId);
        $statement->bindParam(':rollcallId', $attendance->rollcallId);
        $statement->bindParam(':timestamp', $attendance->timestamp);
        $statement->execute();

        // Return the last inserted ID
        return $id;
    }

    /**
     * Get attendance of a registered event
     *
     * @param string $registeredEventId Id of the registered event to find attendance
     * @return Attendance[]
     */
    public function getAttendanceByRegisteredEvent(string $registeredEventId): array
    {
        // TODO:
        $query = "SELECT * FROM Attendances WHERE registeredEventId = :registeredEventId";
        $statement = $this->db->prepare($query);
        $statement->bindParam(':registeredEventId', $registeredEventId);
        $statement->execute();

        $attendance = [];

        while ($result = $statement->fetch(PDO::FETCH_ASSOC)) {
            $attendance[] = new Attendance($result['attendanceId'], $result['registeredEventId'], $result['rollcallId'], $result['timestamp']);
        }

        return $attendance;
    }
}
