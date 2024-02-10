import { CreatedEvent } from "../entity/CreatedEvent";
import { ICreatedEventsRepository } from "./ICreatedEventsRepository";
import { makeObservable, observable, runInAction } from "mobx";
import { Loadable, failed, loaded, loading } from "@/lib/utils/Loadable";
import { ICreatedEventsService } from "@/lib/services/ICreatedEventsService";

export class CreatedEventsRepository implements ICreatedEventsRepository {
  @observable createdEvents: Loadable<CreatedEvent[]>;

  constructor(protected createdEventsService: ICreatedEventsService) {
    makeObservable(this);
    this.createdEvents = loading();
    this.refetchEvents();
  }

  refetchEvents(): void {
    console.log(this);
    this.createdEventsService
      .getCreatedEvents()
      .then((events) => {
        runInAction(() => {
          this.createdEvents = loaded(events);
        });
      })
      .catch((error) => {
        runInAction(() => {
          this.createdEvents = failed(new Error(error.message));
        });
      });
  }

  getCreatedEvents(): Loadable<CreatedEvent[]> {
    return this.createdEvents;
  }
}
