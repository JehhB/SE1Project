import { Loadable } from "@/lib/utils/Loadable";
import { CreatedEvent } from "../entity/CreatedEvent";

export interface ICreatedEventsRepository {
  getCreatedEvents(): Loadable<CreatedEvent[]>;
  refetchEvents(): void;
}
