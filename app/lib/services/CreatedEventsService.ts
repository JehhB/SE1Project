import { SupabaseClient } from "@supabase/supabase-js";
import { ICreatedEventsService } from "./ICreatedEventsService";
import { Database } from "../model/source/supabase.type";
import { CreatedEvent } from "../model/entity/CreatedEvent";

export class CreatedEventsService implements ICreatedEventsService {
  constructor(protected supabase: SupabaseClient<Database>) {}

  async getCreatedEvents(): Promise<CreatedEvent[]> {
    const session = await this.supabase.auth.getSession();
    if (session.error) throw session.error;
    if (session.data.session === null) throw Error("Not authenticated");

    const userId = session.data.session.user.id;
    const resp = await this.supabase
      .from("events")
      .select(
        "id:eventid,name:eventname,isstrict,rollcalls(id:rollcallid,location,timestart,timeend)",
      )
      .order("eventid")
      .eq("creatorid", userId);

    if (resp.error) throw resp.error;

    return resp.data;
  }
}
