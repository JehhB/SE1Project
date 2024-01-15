<?php

namespace Model\Entity;

/**
 * @property string $eventId ID corresponding to event
 * @property string $name Name of event
 * @property string $creatorId user that created event
 * @property bool $isStrict indicate if event attendance is strict
 */
class Event {
    public string $eventId;
    public string $name;
    public string $creatorId;
    public bool $isStrict;

    /**
     * @param string $eventId ID corresponding to event
     * @param string $name Name of event
     * @param string $creatorId user that created event
     * @param bool $isStrict indicate if event attendance is strict
     */
    public function __construct(string $eventId, string $name, string $creatorId, bool $isStrict)
    {
        $this->eventId = $eventId;
        $this->name = $name;
        $this->creatorId = $creatorId;
        $this->isStrict = $isStrict;
    }

     /**
     * Function to send a json representation of event as response
     * error code is 404 if $event is null, otherwise 200
     * 
     * @param ?Event 
     */
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
