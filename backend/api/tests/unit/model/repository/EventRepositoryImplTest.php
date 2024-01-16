<?php

use PHPUnit\Framework\TestCase;
use Model\Entity\Event;
use Model\Source\DatabaseMock;
use Model\Repository\EventRepositoryImpl;

class EventRepositoryImplTest extends TestCase
{
    private ?DatabaseMock $database;

    public function test_When_AccessingNotExistingEvent_Expect_ReturnNull()
    {
        $repository = new EventRepositoryImpl($this->database->db);
        $event = $repository->getEvent("not existing event id");

        $this->assertNull($event);
    }

    public function test_When_AddingNewEvent_Expect_ReturnNewEventId()
    {
        $repository = new EventRepositoryImpl($this->database->db);
        $event = new Event("temp id", "event name", "creatorId", true);

        $eventId = $repository->addEvent($event);

        $this->assertNotSame($event->eventId, $eventId);
    }

    public function test_When_AddingNewEvent_Expect_AddedEventToHaveSameValues()
    {
        $repository = new EventRepositoryImpl($this->database->db);
        $event = new Event("temp id", "event name", "creatorId", true);

        $eventId = $repository->addEvent($event);
        $addedEvent = $repository->getEvent($eventId);

        $this->assertSame($eventId, $addedEvent->eventId);
        $this->assertSame($event->name, $addedEvent->name);
        $this->assertSame($event->creatorId, $addedEvent->creatorId);
        $this->assertEquals($event->isStrict, $addedEvent->isStrict);
    }

    public function test_When_GettingEventByUserWithNoEvent_Expect_EmptyResult()
    {
        $repository = new EventRepositoryImpl($this->database->db);
        $event = new Event("temp id", "event name", "creatorId", true);
        $repository->addEvent($event);

        $events = $repository->getEventByUser("user id with no events");
        $this->assertEmpty($events);
    }

    public function test_When_GettingEventByUser_Expect_CountOfResultToEqualNumberOfCreatedEvent()
    {
        $repository = new EventRepositoryImpl($this->database->db);
        $userId = "creatorId";
        $event = new Event("temp id", "event name", $userId, true);

        $repository->addEvent($event);
        $repository->addEvent($event);
        $repository->addEvent($event);

        $events = $repository->getEventByUser($userId);
        $this->assertCount(3, $events);
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
