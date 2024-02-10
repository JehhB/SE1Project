import { AuthResponse, AuthTokenResponsePassword } from "@supabase/supabase-js";

export interface ISessionService {
  signup(email: string, password: string): Promise<AuthResponse>;
  login(email: string, password: string): Promise<AuthTokenResponsePassword>;
  logout(): Promise<void>;
  createSession(): Promise<string>;
  getUserId(): Promise<string>;
}

export default ISessionService;
