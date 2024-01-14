<?php

use PHPUnit\Framework\TestCase;
use Model\Entity\Event;
use Model\Source\DatabaseMock;
use Model\Repository\EventRepositoryImpl;

class EventRepositoryImplTest extends TestCase {
    private ?DatabaseMock $database;

    public function test_When_AccessingNotExistingEvent_Expect_ReturnNull() {
        $repository = new EventRepositoryImpl($this->database->db);
        $event = $repository->getEvent("not existing event id");

        $this->assertNull($event);
    }

    public function test_When_AddingNewEvent_Expect_ReturnNewEventId() {
        $repository = new EventRepositoryImpl($this->database->db);
        $event = new Event("temp id", "event name", "creatorId", true);

        $eventId = $repository->addEvent($event);

        $this->assertNotSame($event->eventId, $eventId);
    }

    public function test_When_AddingNewEvent_Expect_AddedEventToHaveSameValues() {
        $repository = new EventRepositoryImpl($this->database->db);
        $event = new Event("temp id", "event name", "creatorId", true);

        $eventId = $repository->addEvent($event);
        $addedEvent = $repository->getEvent($eventId);

        $this->assertSame($eventId, $addedEvent->eventId);
        $this->assertSame($event->name, $addedEvent->name);
        $this->assertSame($event->creatorId, $addedEvent->creatorId);
        $this->assertSame($event->isStrict, $addedEvent->isStrict);
    }

    protected function setUp(): void {
        $this->database = new DatabaseMock();
    }

    protected function tearDown(): void {
        $this->database = null;
    }
}