import {
  AuthResponse,
  AuthTokenResponsePassword,
  SupabaseClient,
} from "@supabase/supabase-js";
import ISessionService from "./ISessionService";
import { Database } from "../model/source/supabase.type";
import { Platform } from "react-native";
import * as Device from "expo-device";

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

  async createSession(): Promise<string> {
    const resp = await this.supabase.functions.invoke<{
      token: string;
    }>("createSession", {
      method: "POST",
      body: { platform: Platform.OS, os: Device.osName },
    });
    if (resp.error) throw resp.error;

    return resp.data!.token;
  }

  async getUserId(): Promise<string> {
    const resp = await this.supabase.auth.getSession();
    if (resp.error) throw resp;
    if (resp.data.session === null) throw Error("Not authenticated");

    return resp.data.session.user.id;
  }
}
