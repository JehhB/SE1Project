import ISessionDao from "@/lib/model/dao/ISessionDao";
import ISessionRepository from "@/lib/model/repository/ISessionRepository";
import { ISessionService } from "@/lib/services/ISessionService";
import { SupabaseClient } from "@supabase/supabase-js";
import { runInAction } from "mobx";

export class SessionRepository implements ISessionRepository {
  constructor(
    protected sessionDao: ISessionDao,
    protected sessionService: ISessionService,
  ) {}

  registerListeners(supabase: SupabaseClient) {
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      runInAction(() => {
        if (event == "SIGNED_IN") {
          this.sessionDao.user_id = session?.user.id ?? null;
        } else if (event == "SIGNED_OUT") {
          this.sessionDao.user_id = null;
        }
      });
    });

    return subscription.data.subscription.unsubscribe;
  }

  getSessionToken(): string | null {
    if (this.sessionDao.session_token == null) {
      this.sessionService.createSession().then((resp) => {
        if (resp.data == null) throw new Error(resp.error);
        runInAction(() => {
          this.sessionDao.session_token = resp.data.session_token;
        });
      });
    }

    return this.sessionDao.session_token;
  }

  getUserId(): string | null {
    this.sessionService
      .getUserId()
      .then((userId) => {
        runInAction(() => {
          this.sessionDao.user_id = userId;
        });
      })
      .catch((error) => {
        console.log(error);
      });

    return this.sessionDao.user_id;
  }

  async signin(email: string, password: string): Promise<void> {
    const resp = await this.sessionService.signin(email, password);
    if (resp.error) throw resp.error;
  }

  async login(email: string, password: string): Promise<void> {
    const resp = await this.sessionService.login(email, password);
    if (resp.error) throw resp.error;
  }

  logout(): Promise<void> {
    return this.sessionService.logout().then(() => {
      runInAction(() => {
        this.sessionDao.user_id = null;
      });
    });
  }
}

export default SessionRepository;
