CREATE TABLE Users (
    userid VARCHAR(64) PRIMARY KEY,
    userName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    passwordhash VARCHAR(255) NOT NULL
);

CREATE TABLE Events (
    eventId VARCHAR(64) PRIMARY KEY,
    eventName VARCHAR(255) NOT NULL,
    creatorId VARCHAR(64) NOT NULL,
    isStrict BOOLEAN,
    FOREIGN KEY (creatorId) REFERENCES Users(userid)
);

CREATE TABLE RegisteredEvents (
    registeredEventId VARCHAR(64) PRIMARY KEY,
    eventId VARCHAR(64) NOT NULL,
    userId VARCHAR(64),
    FOREIGN KEY (eventId) REFERENCES Events(eventId),
    FOREIGN KEY (userId) REFERENCES Users(userid)
);

CREATE TABLE Rollcalls (
    rollcallId VARCHAR(64) PRIMARY KEY,
    eventId VARCHAR(64) NOT NULL,
    location TEXT NOT NULL,
    timeStart DATETIME NOT NULL,
    timeEnd DATETIME NOT NULL,
    FOREIGN KEY (eventId) REFERENCES Events(eventId)
);

CREATE TABLE Attendances (
    attendanceId VARCHAR(64) PRIMARY KEY,
    registeredEventId VARCHAR(64) NOT NULL,
    rollcallId VARCHAR(64) NOT NULL,
    timestamp DATETIME NOT NULL,
    isAccepted BOOLEAN,
    FOREIGN KEY (registeredEventId) REFERENCES RegisteredEvents(registeredEventId),
    FOREIGN KEY (rollcallId) REFERENCES Rollcalls(rollcallId)
);