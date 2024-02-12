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
        "id:eventid,name:eventname,isstrict,rollcalls(id:rollcallid,location,timestart,timeend,description)",
      )
      .order("eventid")
      .eq("creatorid", userId);

    if (resp.error) throw resp.error;

    return resp.data;
  }

  async createEvent(
    name: string,
    isstrict: boolean,
    rollcalls: {
      description: string;
      location: [lat: number, lng: number][];
      timestart: string;
      timeend: string;
    }[],
  ): Promise<void> {
    const user = await this.supabase.auth.getUser();
    if (user.data === null || user.data.user === null)
      throw Error("Not authenticated");
    const userId = user.data.user.id;

    const event = await this.supabase
      .from("events")
      .insert({ creatorid: userId, eventname: name, isstrict })
      .select("eventid");
    if (event.error) throw event.error;
    const eventid = event.data[0].eventid;

    const rollcall = await this.supabase
      .from("rollcalls")
      .insert(rollcalls.map((rollcall) => ({ eventid, ...rollcall })));
    if (rollcall.error) throw rollcall.error;
  }
}
