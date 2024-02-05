import { SupabaseClient } from "@supabase/supabase-js";

export interface IUserRepository {
  getUserName(): string;
  setUserName(username: string): void;
}

export default IUserRepository;
