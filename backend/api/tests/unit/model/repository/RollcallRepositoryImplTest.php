<?php

use PHPUnit\Framework\TestCase;
use Model\Source\DatabaseMock;
use Model\Entity\Rollcall;
use Model\Repository\RollcallRepositoryImpl;

class RollcallRepositoryImplTest extends TestCase
{
    private ?DatabaseMock $database;

    public function test_When_AccessingNotExistingRollcall_Expect_ReturnNull()
    {
        $repository = new RollcallRepositoryImpl($this->database->db);
        $rollcall = $repository->getRollcall("not existing rollcal id");

        $this->assertNull($rollcall);
    }

    public function test_When_AddingNewRollcall_Expect_ReturnNewRollcallId()
    {
        $repository = new RollcallRepositoryImpl($this->database->db);
        $rollcall = new Rollcall("temp id", "event id", "location", "timestart", "timeend");

        $rollcallId = $repository->addRollcall($rollcall);

        $this->assertNotSame($rollcall->rollcallId, $rollcallId);
    }

    public function test_When_AddingNewRollcall_Expect_AddedRollcallToHaveSameValues()
    {
        $repository = new RollcallRepositoryImpl($this->database->db);
        $rollcall = new Rollcall("temp id", "event id", "location", "timestart", "timeend");

        $rollcallId = $repository->addRollcall($rollcall);
        $addedRollcall = $repository->getRollcall($rollcallId);

        $this->assertSame($rollcallId, $addedRollcall->rollcallId);
        $this->assertSame($rollcall->eventId, $addedRollcall->eventId);
        $this->assertSame($rollcall->location, $addedRollcall->location);
        $this->assertEquals($rollcall->timeStart, $addedRollcall->timeStart);
        $this->assertEquals($rollcall->timeEnd, $addedRollcall->timeEnd);
    }

    public function test_When_GettingRollcallByEventWithNoRollcall_Expect_EmptyResult()
    {
        $repository = new RollcallRepositoryImpl($this->database->db);
        $rollcall = new Rollcall("temp id", "event id", "location", "timestart", "timeend");
        $repository->addRollcall($rollcall);

        $rollcalls = $repository->getRollcallByEvent("event id with no rollcalls");
        $this->assertEmpty($rollcalls);
    }

    public function test_When_GettingRollcallByEvent_Expect_CountOfResultToEqualNumberOfCreatedRollcall()
    {
        $repository = new RollcallRepositoryImpl($this->database->db);
        $eventId = "event id";
        $rollcall = new Rollcall("temp id", $eventId, "location", "timestart", "timeend");

        $repository->addRollcall($rollcall);
        $repository->addRollcall($rollcall);
        $repository->addRollcall($rollcall);

        $rollcalls = $repository->getRollcallByEvent($eventId);
        $this->assertCount(3, $rollcalls);
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
