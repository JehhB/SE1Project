<?php


use PHPUnit\Framework\TestCase;
use Model\Entity\Event;

final class EventTest extends TestCase {

    public function test_When_EventIsNotNull_Expect_OutputJson() : void {
        $event = new Event("eventId", "name", "user id", false);

        Event::respond($event);
        $output = json_decode($this->getActualOutputForAssertion());
        $this->assertSame($event->eventId, $output->eventId);
        $this->assertSame($event->name, $output->name);
        $this->assertSame($event->isStrict, $output->isStrict);
    }

    public function test_When_EventIsNull_Expect_ResponseCodeToBe404() : void { 
        Event::respond(null);
        $this->assertSame(404, Model\Entity\http_response_code());
    }
}