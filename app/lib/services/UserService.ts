import { SupabaseClient } from "@supabase/supabase-js";
import IUserService from "./IUserService";
import { Database } from "../model/source/supabase.type";

export class UserService implements IUserService {
  constructor(private supabase: SupabaseClient<Database>) {}

  async setUserName(userName: string): Promise<void> {
    const user = await this.supabase.auth.getUser();
    if (user.error) throw user.error;

    const res = await this.supabase
      .from("profiles")
      .upsert(
        { userid: user.data.user.id, username: userName },
        { onConflict: "userid" },
      )
      .select();
    if (res.error) throw res.error;
  }

  async getUserName(): Promise<string> {
    const user = await this.supabase.auth.getUser();
    if (user.error) throw user.error;

    const res = await this.supabase
      .from("profiles")
      .select("username")
      .eq("userid", user.data.user.id)
      .single();
    if (res.error) throw res.error;

    return res.data.username;
  }
}
