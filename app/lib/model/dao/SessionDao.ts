import { StorageController, makePersistable } from "mobx-persist-store";
import ISessionDao from "./ISessionDao";
import { makeObservable, observable } from "mobx";

export class SessionDao implements ISessionDao {
  @observable public session_token: string | null = null;
  @observable public user_id: string | null = null;

  constructor() {
    makeObservable(this);
  }

  public static createSessionDao(storage: StorageController) {
    const dao = new SessionDao();
    makePersistable(dao, {
      name: "SessionDao",
      storage,
      properties: ["session_token", "user_id"],
    });
    return dao;
  }
}

export default SessionDao;
