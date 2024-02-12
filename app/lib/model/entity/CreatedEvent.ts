import { Json } from "../source/supabase.type";

export type CreatedEvent = {
  id: string;
  name: string;
  isstrict: boolean;
  rollcalls: {
    id: string;
    description: string;
    location: Json;
    timestart: string;
    timeend: string;
  }[];
};
