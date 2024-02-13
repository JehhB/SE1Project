alter table Events enable row level security;

create policy "authenticated users can create events"
on Events for insert
to authenticated
with check ( (select auth.uid()) = creatorId );

create policy "creator can view their event"
on Events for select
to authenticated
using ( (select auth.uid()) = creatorId );

alter table Rollcalls enable row level security;

CREATE OR REPLACE FUNCTION check_event_creator(
    event_id_in UUID,
    creator_id_in UUID
)
RETURNS BOOLEAN 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM Events 
        WHERE eventId = event_id_in AND creatorId = creator_id_in
    );
END;
$$;

create policy "rollcalls can must be assigned to event created by authenticated user"
on Rollcalls for insert
to authenticated
with check ( check_event_creator(eventId, (select auth.uid())) );

create policy "event creator can view their rollcalls"
on Rollcalls for select
to authenticated
using ( check_event_creator(eventId, (select auth.uid())) );

alter table Profiles enable row level security;

create policy "authenticated user can create own profile"
on Profiles for insert
to authenticated
with check ( (select auth.uid()) = userId );

create policy "authenticated user can view their own profile"
on Profiles for select
to authenticated
using ( (select auth.uid()) = userId );

alter table Attendances enable row level security;

alter table RegisteredEvents enable row level security;
