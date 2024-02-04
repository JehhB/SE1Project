import { StorageController, makePersistable } from "mobx-persist-store";
import ISessionDao from "./ISessionDao";
import { makeObservable, observable } from "mobx";

export class SessionDao implements ISessionDao {
  @observable public session_token: string | null = null;
  @observable public user_id: string | null = null;

  constructor(public storage: StorageController) {
    makeObservable(this);
    makePersistable(this, {
      name: "SessionDao",
      storage,
      properties: ["session_token", "user_id"],
    });
  }
}

export default SessionDao;
