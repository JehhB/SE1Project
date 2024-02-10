import {
  AuthResponse,
  AuthTokenResponsePassword,
  SupabaseClient,
} from "@supabase/supabase-js";
import ISessionService, { SessionResponse } from "./ISessionService";
import { Database } from "../model/source/supabase.type";

export class SessionService implements ISessionService {
  constructor(private supabase: SupabaseClient<Database>) {}

  signup(email: string, password: string): Promise<AuthResponse> {
    return this.supabase.auth.signUp({ email, password });
  }

  login(email: string, password: string): Promise<AuthTokenResponsePassword> {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  async logout(): Promise<void> {
    const resp = await this.supabase.auth.signOut();
    if (resp.error) throw resp.error;
  }

  createSession(): Promise<SessionResponse> {
    throw new Error("Method not implemented.");
  }

  async getUserId(): Promise<string> {
    const resp = await this.supabase.auth.getSession();
    if (resp.error) throw resp;
    if (resp.data.session === null) throw Error("Not authenticated");

    return resp.data.session.user.id;
  }
}
