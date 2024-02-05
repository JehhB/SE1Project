import { makeObservable, observable } from "mobx";
import IUserDao from "./IUserDoa";
import { StorageController, makePersistable } from "mobx-persist-store";

export class UserDao implements IUserDao {
  @observable public username: string = "";

  constructor() {
    makeObservable(this);
  }

  public static createUserDao(storage: StorageController) {
    const dao = new UserDao();
    makePersistable(dao, {
      name: "UserDao",
      properties: ["username"],
      storage,
    });
    return dao;
  }
}
