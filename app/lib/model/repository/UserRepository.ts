import IUserService from "@/lib/services/IUserService";
import IUserRepository from "./IUserRepository";
import IUserDao from "../dao/IUserDoa";
import { runInAction } from "mobx";
import { SupabaseClient } from "@supabase/supabase-js";

export class UserRepository implements IUserRepository {
  constructor(
    protected userDao: IUserDao,
    protected userService: IUserService,
  ) {}

  registerListener(supabase: SupabaseClient) {
    const subscription = supabase.auth.onAuthStateChange((event) => {
      if (event == "SIGNED_IN") {
        this.getUserName();
      } else if (event == "SIGNED_OUT") {
        runInAction(() => {
          this.userDao.username = "";
        });
      }
    });
  }

  getUserName(): string {
    this.userService
      .getUserName()
      .then((username) => {
        runInAction(() => {
          this.userDao.username = username;
        });
      })
      .catch((error) => {
        console.log(error);
      });

    return this.userDao.username;
  }

  setUserName(username: string): void {
    const prev = this.userDao.username;
    this.userService
      .setUserName(username)
      .then(() => {
        runInAction(() => {
          this.userDao.username = username;
        });
      })
      .catch((error) => {
        console.log(error);
        this.userDao.username = prev;
      });
    this.userDao.username = username;
  }
}
