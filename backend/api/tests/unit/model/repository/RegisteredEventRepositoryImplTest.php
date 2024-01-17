<?php

use Model\Entity\RegisteredEvent;
use Model\Repository\RegisteredEventRepositoryImpl;
use Model\Source\DatabaseMock;
use PHPUnit\Framework\TestCase;

class RegisteredEventRepositoryImplTest extends TestCase {
    private ?DatabaseMock $database = null;

    public function test_When_AccessingNotExistingRegisteredEvent_Expect_ReturnNull() {
        $repository = new RegisteredEventRepositoryImpl($this->database->db);
        $registeredEvent = $repository->getRegisteredEvent("not existing registered event id");

        $this->assertNull($registeredEvent);
    }

    public function test_When_AddingNewRegisteredEvent_Expect_ReturnNewRegisterdEventId() {
        $repository = new RegisteredEventRepositoryImpl($this->database->db);
        $regEvent = new RegisteredEvent("temp id", "event id", "session id", "name", null);

        $regEventId = $repository->addRegisterEvent($regEvent);

        $this->assertNotSame($regEvent->eventId, $regEventId);
    }

    public function test_When_AddingNewRegisteredEvent_Expect_AddedRegisteredEventToHaveSameValues() {
        $repository = new RegisteredEventRepositoryImpl($this->database->db);
        $regEvent = new RegisteredEvent("temp id", "event id", "session id", "name", null);

        $regEventId = $repository->addRegisterEvent($regEvent);
        $addedRegEvent = $repository->getRegisteredEvent($regEventId);

        $this->assertSame($regEventId, $addedRegEvent->registeredEventId);
        $this->assertSame($regEvent->eventId, $addedRegEvent->eventId);
        $this->assertSame($regEvent->sessionId, $addedRegEvent->sessionId);
        $this->assertSame($regEvent->registeredName, $addedRegEvent->registeredName);
        $this->assertSame($regEvent->userId, $addedRegEvent->userId);
    }

    public function test_When_GettingRegisteredEventByUserWithNoEvent_Expect_EmptyResult() {
        $repository = new RegisteredEventRepositoryImpl($this->database->db);
        $regEvent = new RegisteredEvent("temp id", "event id", "session id", "name", null);
        $repository->addRegisterEvent($regEvent);

        $events = $repository->getRegisteredEventsOfUser("user id with no registerd events");
        $this->assertEmpty($events);
    }

    public function test_When_GettingRegisteredEventByUser_Expect_CountOfResultToEqualNumberOfRegisteredEvent() {
        $repository = new RegisteredEventRepositoryImpl($this->database->db);
        $userId = "creatorId";
        $regEvent = new RegisteredEvent("temp id", "event id", "session id", "name", $userId);

        $repository->addRegisterEvent($regEvent);
        $repository->addRegisterEvent($regEvent);
        $repository->addRegisterEvent($regEvent);

        $events = $repository->getRegisteredEventsOfUser($userId);
        $this->assertCount(3, $events);
    }

    public function test_When_GettingRegisteredEventByAuthForStrictEvent_Expect_OneResultForMatchingSessionId() {
        $repository = new RegisteredEventRepositoryImpl($this->database->db);

        $userId = "user_id";
        $sessionId = "session_id";
        $otherSessionId = "other" . $sessionId;
        $eventId1 = "event_id1";
        $eventId2 = "event_id2";

        $this->database->db->exec("INSERT INTO Events (eventId, eventName, creatorId, isStrict) VALUES
            ('$eventId1', 'Event Strict 1', 'creator_id', true),
            ('$eventId2', 'Event Strict 2', 'creator_id', true)");

        $regEvent1 = new RegisteredEvent("temp_id", $eventId1, $sessionId, "name", null);
        $regEvent2 = new RegisteredEvent("temp_id", $eventId2 , $otherSessionId, "name", $userId);

        $expectedId = $repository->addRegisterEvent($regEvent1);
        $repository->addRegisterEvent($regEvent2);

        $result = $repository->getRegisteredEventByAuth($userId, $sessionId);

        $this->assertCount(1, $result);
        $this->assertSame($expectedId, $result[0]->registeredEventId);
    }

    public function test_When_GettingRegisteredEventByAuthForNonStrictEvent_Expect_FourResultForMatchingUserId() {
        $repository = new RegisteredEventRepositoryImpl($this->database->db);

        $userId = "user_id";
        $sessionId = "session_id";
        $otherSessionId = "other" . $sessionId;
        $eventId1 = "event_id1";
        $eventId2 = "event_id2";

        $this->database->db->exec("INSERT INTO Events (eventId, eventName, creatorId, isStrict) VALUES
            ('$eventId1', 'Event Strict 1', 'creator_id', true),
            ('$eventId2', 'Event Strict 2', 'creator_id', false)");

        $repository->addRegisterEvent(new RegisteredEvent("temp_id", $eventId1, $sessionId, "name", $userId));
        $repository->addRegisterEvent(new RegisteredEvent("temp_id", $eventId2, $otherSessionId, "name", $userId));
        $repository->addRegisterEvent(new RegisteredEvent("temp_id", $eventId1, $sessionId, "name", null));
        $repository->addRegisterEvent(new RegisteredEvent("temp_id", $eventId2, $sessionId, "name", null));

        $result = $repository->getRegisteredEventByAuth($userId, $sessionId);

        $this->assertCount(4, $result);
    }

    protected function setUp() : void {
        $this->database = new DatabaseMock();
    }

    protected function tearDown() : void {
        $this->database = null;
    }
}