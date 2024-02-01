CREATE TABLE Events
(
    eventId VARCHAR(63) PRIMARY KEY,
    eventName VARCHAR(255) NOT NULL,
    creatorId UUID NOT NULL,
    isStrict BOOLEAN,
    FOREIGN KEY (creatorId) REFERENCES auth.users(id)
);

CREATE TABLE RegisteredEvents
(
    registeredEventId VARCHAR(63) PRIMARY KEY,
    eventId VARCHAR(63) NOT NULL,
    sessionId VARCHAR(63) NOT NULL,
    registeredName VARCHAR(255) NOT NULL,
    userId UUID,
    FOREIGN KEY (eventId) REFERENCES Events(eventId),
    FOREIGN KEY (userId) REFERENCES auth.users(id)
);

CREATE TABLE Rollcalls
(
    rollcallId VARCHAR(63) PRIMARY KEY,
    eventId VARCHAR(63) NOT NULL,
    location TEXT NOT NULL,
    timeStart TIMESTAMP NOT NULL,
    timeEnd TIMESTAMP NOT NULL,
    FOREIGN KEY (eventId) REFERENCES Events(eventId)
);

CREATE TABLE Attendances
(
    attendanceId VARCHAR(63) PRIMARY KEY,
    registeredEventId VARCHAR(63) NOT NULL,
    rollcallId VARCHAR(63) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    FOREIGN KEY (registeredEventId) REFERENCES RegisteredEvents(registeredEventId),
    FOREIGN KEY (rollcallId) REFERENCES Rollcalls(rollcallId)
);
