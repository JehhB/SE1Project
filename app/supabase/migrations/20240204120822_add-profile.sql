CREATE TABLE Profiles
(
    profileId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    userId UUID UNIQUE NOT NULL,
    username VARCHAR(63) NOT NULL,
    FOREIGN KEY (userId) REFERENCES auth.users(id)
);

ALTER TABLE RegisteredEvents DROP CONSTRAINT registeredevents_eventid_fkey;

ALTER TABLE Rollcalls DROP CONSTRAINT rollcalls_eventid_fkey;

ALTER TABLE Attendances DROP CONSTRAINT attendances_rollcallid_fkey;

ALTER TABLE Attendances DROP CONSTRAINT attendances_registeredeventid_fkey;

ALTER TABLE RegisteredEvents
    ALTER COLUMN registeredEventId TYPE UUID USING registeredEventId::UUID,
    ALTER COLUMN eventId TYPE UUID USING eventId::UUID,
    ALTER COLUMN userId TYPE UUID USING userId::UUID;

ALTER TABLE Events
    ALTER COLUMN eventId TYPE UUID USING eventId::UUID,
    ALTER COLUMN creatorId TYPE UUID USING creatorId::UUID;

ALTER TABLE Rollcalls
    ALTER COLUMN rollcallId TYPE UUID USING rollcallId::UUID,
    ALTER COLUMN eventId TYPE UUID USING eventId::UUID;

ALTER TABLE Attendances
    ALTER COLUMN attendanceId TYPE UUID USING attendanceId::UUID,
    ALTER COLUMN registeredEventId TYPE UUID USING registeredEventId::UUID,
    ALTER COLUMN rollcallId TYPE UUID USING rollcallId::UUID;

ALTER TABLE RegisteredEvents ADD CONSTRAINT registeredevents_eventid_fkey FOREIGN KEY (eventId) REFERENCES Events(eventId);

ALTER TABLE Attendances ADD CONSTRAINT attendances_rollcallid_fkey FOREIGN KEY (rollcallId) REFERENCES Rollcalls(rollcallId);

ALTER TABLE Attendances ADD CONSTRAINT attendances_registeredeventid_fkey FOREIGN KEY (registeredEventId) REFERENCES RegisteredEvents(registeredEventId);

ALTER TABLE Rollcalls ADD CONSTRAINT rollcalls_eventid_fkey FOREIGN KEY (eventId) REFERENCES Events(eventId);
