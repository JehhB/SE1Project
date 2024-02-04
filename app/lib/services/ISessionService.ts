import { AuthResponse, AuthTokenResponsePassword } from "@supabase/supabase-js";

export type SessionResponse =
  | { data: { session_token: string }; error: null }
  | { data: null; error: string };

export interface ISessionService {
  signin(email: string, password: string): Promise<AuthResponse>;
  login(email: string, password: string): Promise<AuthTokenResponsePassword>;
  logout(): Promise<void>;
  createSession(): Promise<SessionResponse>;
}

export default ISessionService;
