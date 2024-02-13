import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase.type";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);

export default supabase;