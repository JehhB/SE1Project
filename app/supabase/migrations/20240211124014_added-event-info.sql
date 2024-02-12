ALTER TABLE Rollcalls
ADD COLUMN description VARCHAR(63) NOT NULL DEFAULT 'Rollcall';

ALTER TABLE Rollcalls
ALTER COLUMN description DROP DEFAULT;

ALTER TABLE Rollcalls
ALTER COLUMN location SET DATA TYPE JSON USING location::json;

ALTER TABLE Events 
ALTER COLUMN isStrict SET NOT NULL;

ALTER TABLE Events
ALTER COLUMN eventId SET DEFAULT uuid_generate_v4();

ALTER TABLE RegisteredEvents
ALTER COLUMN registeredEventId SET DEFAULT uuid_generate_v4();

ALTER TABLE Rollcalls
ALTER COLUMN rollcallId SET DEFAULT uuid_generate_v4();

ALTER TABLE Attendances
ALTER COLUMN attendanceId SET DEFAULT uuid_generate_v4();
