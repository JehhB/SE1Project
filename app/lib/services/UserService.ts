import { SupabaseClient } from "@supabase/supabase-js";
import IUserService from "./IUserService";
import { Database } from "../model/source/supabase.type";

export class UserService implements IUserService {
  constructor(private supabase: SupabaseClient<Database>) {}

  async setUserName(userName: string): Promise<void> {
    const session = await this.supabase.auth.getSession();
    if (session.error) throw session.error;
    if (session.data.session === null) throw Error("Not authenticated");
    const userId = session.data.session.user.id;

    const res = await this.supabase
      .from("profiles")
      .upsert({ userid: userId, username: userName }, { onConflict: "userid" })
      .select();
    if (res.error) throw res.error;
  }

  async getUserName(): Promise<string> {
    const session = await this.supabase.auth.getSession();
    if (session.error) throw session.error;
    if (session.data.session === null) throw Error("Not authenticated");
    const userId = session.data.session.user.id;

    const res = await this.supabase
      .from("profiles")
      .select("username")
      .eq("userid", userId)
      .single();
    if (res.error) throw res.error;

    return res.data.username;
  }
}