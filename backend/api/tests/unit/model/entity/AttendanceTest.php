<?php

use PHPUnit\Framework\TestCase;
use Model\Entity\Attendance;

final class AttendanceTest extends TestCase {

    public function test_When_AttendanceIsNotNull_Expect_OutputJson() : void {
        $attendance = new Attendance("attendance id", "registered event id", "rollcall id", "timestamp");

        Attendance::respond($attendance);
        $output = json_decode($this->getActualOutputForAssertion());
        $this->assertSame($attendance->attendanceId, $output->attendanceId);
        $this->assertSame($attendance->registeredEventId, $output->registeredEventId);
        $this->assertSame($attendance->rollcallId, $output->rollcallId);
        $this->assertSame($attendance->timestamp, $output->timestamp);
    }

    public function test_When_AttendanceIsNull_Expect_ResponseCodeToBe404() : void { 
        Attendance::respond(null);
        $this->assertSame(404, Model\Entity\http_response_code());
    }
}