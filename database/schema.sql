CREATE TABLE Users
(
    userId VARCHAR(63) PRIMARY KEY,
    userName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    passwordhash VARCHAR(255) NOT NULL
);

CREATE TABLE Events
(
    eventId VARCHAR(63) PRIMARY KEY,
    eventName VARCHAR(255) NOT NULL,
    creatorId VARCHAR(63) NOT NULL,
    isStrict BOOLEAN,
    FOREIGN KEY (creatorId) REFERENCES Users(userid)
);

CREATE TABLE RegisteredEvents
(
    registeredEventId VARCHAR(63) PRIMARY KEY,
    eventId VARCHAR(63) NOT NULL,
    sessionId VARCHAR(63) NOT NULL,
    registeredName varchar(255) NOT NULL,
    userId VARCHAR(63),
    FOREIGN KEY (eventId) REFERENCES Events(eventId),
    FOREIGN KEY (userId) REFERENCES Users(userid)
);

CREATE TABLE Rollcalls
(
    rollcallId VARCHAR(63) PRIMARY KEY,
    eventId VARCHAR(63) NOT NULL,
    location TEXT NOT NULL,
    timeStart DATETIME NOT NULL,
    timeEnd DATETIME NOT NULL,
    FOREIGN KEY (eventId) REFERENCES Events(eventId)
);

CREATE TABLE Attendances
(
    attendanceId VARCHAR(63) PRIMARY KEY,
    registeredEventId VARCHAR(63) NOT NULL,
    rollcallId VARCHAR(63) NOT NULL,
    timestamp DATETIME NOT NULL,
    FOREIGN KEY (registeredEventId) REFERENCES RegisteredEvents(registeredEventId),
    FOREIGN KEY (rollcallId) REFERENCES Rollcalls(rollcallId)
);