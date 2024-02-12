import { CreatedEvent } from "../model/entity/CreatedEvent";

export interface ICreatedEventsService {
  getCreatedEvents(): Promise<CreatedEvent[]>;
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
