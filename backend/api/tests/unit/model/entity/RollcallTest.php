<?php

use PHPUnit\Framework\TestCase;
use Model\Entity\Rollcall;

final class EventTest extends TestCase {

    public function test_When_RollcallIsNotNull_Expect_OutputJson() : void {
        $rollcall = new Rollcall("rollcall id", "event id", "location", "timestart", "timeend");

        Rollcall::respond($rollcall);
        $output = json_decode($this->getActualOutputForAssertion());
        $this->assertSame($rollcall->rollcallId, $output->rollcallId);
        $this->assertSame($rollcall->eventId, $output->eventId);
        $this->assertSame($rollcall->location, $output->location);
        $this->assertSame($rollcall->timeStart, $output->timeStart);
        $this->assertSame($rollcall->timeEnd, $output->timeEnd);
    }

    public function test_When_EventIsNull_Expect_ResponseCodeToBe404() : void { 
        Rollcall::respond(null);
        $this->assertSame(404, Model\Entity\http_response_code());
    }
}