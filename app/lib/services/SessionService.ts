import {
  AuthResponse,
  AuthTokenResponsePassword,
  SupabaseClient,
} from "@supabase/supabase-js";
import ISessionService, { SessionResponse } from "./ISessionService";

export class SessionService implements ISessionService {
  constructor(private supabase: SupabaseClient) {}

  signin(email: string, password: string): Promise<AuthResponse> {
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
}
