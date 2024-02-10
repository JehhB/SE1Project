import { CreatedEvent } from "../model/entity/CreatedEvent";

export interface ICreatedEventsService {
  getCreatedEvents(): Promise<CreatedEvent[]>;
}
