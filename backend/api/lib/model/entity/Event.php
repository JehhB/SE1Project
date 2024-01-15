<?php

namespace Model\Entity;

class Event {
    public string $eventId;
    public string $name;
    public string $creatorId;
    public bool $isStrict;

    public function __construct(string $eventId, string $name, string $creatorId, bool $isStrict)
    {
        $this->eventId = $eventId;
        $this->name = $name;
        $this->creatorId = $creatorId;
        $this->isStrict = $isStrict;
    }

    public static function respond(?Event $event): void
    {
        if ($event === null) {
            http_response_code(404);
            echo json_encode(['error' => 'Event not found']);
        } else {
            http_response_code(200);
            echo json_encode([
                'eventId' => $event->eventId,
                'name' => $event->name,
                'creatorId' => $event->creatorId,
                'isStrict' => $event->isStrict,
            ]);
        }
    }
}
