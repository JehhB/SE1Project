<?php

use PHPUnit\Framework\TestCase;
use Model\Entity\Attendance;
use Model\Source\DatabaseMock;
use Model\Repository\AttendanceRepositoryImpl;

class AttendanceRepositoryImplTest extends TestCase
{
    private ?DatabaseMock $database;

    public function test_When_AccessingNotExistingAttendance_Expect_ReturnNull()
    {
        $repository = new AttendanceRepositoryImpl($this->database->db);
        $attendance = $repository->getAttendance("not existing attendance id");

        $this->assertNull($attendance);
    }

    public function test_When_AddingNewAttendance_Expect_ReturnNewAttendanceId()
    {
        $repository = new AttendanceRepositoryImpl($this->database->db);
        $attendance = new Attendance("temp id", "registered event id", "rollcall id", "timestamp");

        $attendanceId = $repository->addAttendance($attendance);

        $this->assertNotSame($attendance->attendanceId, $attendanceId);
    }

    public function test_When_AddingNewAttendance_Expect_AddedAttendanceToHaveSameValues()
    {
        $repository = new AttendanceRepositoryImpl($this->database->db);
        $attendance = new Attendance("temp id", "registered event id", "rollcall id", "timestamp");

        $attendanceId = $repository->addAttendance($attendance);
        $addedAttendance = $repository->getAttendance($attendanceId);

        $this->assertSame($attendanceId, $addedAttendance->attendanceId);
        $this->assertSame($attendance->registeredEventId, $addedAttendance->registeredEventId);
        $this->assertSame($attendance->rollcallId, $addedAttendance->rollcallId);
        $this->assertSame($attendance->timestamp, $addedAttendance->timestamp);
    }

    public function test_When_GettingAttendanceByEventWithNoAttendance_Expect_EmptyResult()
    {
        $repository = new AttendanceRepositoryImpl($this->database->db);
        $attendance = new Attendance("temp id", "registered event id", "rollcall id", "timestamp");
        $repository->addAttendance($attendance);

        $attendances = $repository->getAttendanceByRegisteredEvent("event id with no attendances");
        $this->assertEmpty($attendances);
    }

    public function test_When_GettingAttendanceByEvent_Expect_CountOfResultToEqualNumberOfCreatedAttendance()
    {
        $repository = new AttendanceRepositoryImpl($this->database->db);
        $registeredEventId = "registered event id";
        $attendance = new Attendance("temp id", $registeredEventId, "creatorId", true);

        $repository->addAttendance($attendance);
        $repository->addAttendance($attendance);
        $repository->addAttendance($attendance);

        $attendances = $repository->getAttendanceByRegisteredEvent($registeredEventId);
        $this->assertCount(3, $attendances);
    }

    protected function setUp(): void
    {
        $this->database = new DatabaseMock();
    }

    protected function tearDown(): void
    {
        $this->database = null;
    }
}
