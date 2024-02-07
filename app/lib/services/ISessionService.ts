import { AuthResponse, AuthTokenResponsePassword } from "@supabase/supabase-js";

export type SessionResponse =
  | { data: { session_token: string }; error: null }
  | { data: null; error: string };

export interface ISessionService {
  signup(email: string, password: string): Promise<AuthResponse>;
  login(email: string, password: string): Promise<AuthTokenResponsePassword>;
  logout(): Promise<void>;
  createSession(): Promise<SessionResponse>;
  getUserId(): Promise<string>;
}

export default ISessionService;
