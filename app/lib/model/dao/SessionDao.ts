import { makePersistable } from "mobx-persist-store";
import ISessionDao from "./ISessionDao";
import { observable } from "mobx";
import { storage } from "../source/storage";

export class SessionDao implements ISessionDao {
  @observable public session_token: string | null = null;
  @observable public access_token: string | null = null;
}

export function createSessionDao() {
  const dao = new SessionDao();
  makePersistable(dao, {
    name: "SessionDao",
    storage,
    properties: ["session_token", "session_token"],
  });
  return dao;
}
