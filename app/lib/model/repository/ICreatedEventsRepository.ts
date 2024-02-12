import { Loadable } from "@/lib/utils/Loadable";
import { CreatedEvent } from "../entity/CreatedEvent";

export interface ICreatedEventsRepository {
  getCreatedEvents(): Loadable<CreatedEvent[]>;
  refetchEvents(): void;
  createEvent(
    name: string,
    isstrict: boolean,
    rollcalls: {
      description: string;
      location: [lat: number, lng: number][];
      timestart: string;
      timeend: string;
    }[],
  ): Promise<void>;
}
