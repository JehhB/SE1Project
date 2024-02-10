import ISessionDao from "@/lib/model/dao/ISessionDao";
import ISessionRepository from "@/lib/model/repository/ISessionRepository";
import { ISessionService } from "@/lib/services/ISessionService";
import { SupabaseClient } from "@supabase/supabase-js";
import { runInAction } from "mobx";
import { isHydrated } from "mobx-persist-store";

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
    if (this.sessionDao.session_token == null && isHydrated(this.sessionDao)) {
      this.sessionService
        .createSession()
        .then((resp) => {
          runInAction(() => {
            this.sessionDao.session_token = resp;
          });
        })
        .catch((error) => {
          console.error(error);
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

  async signup(email: string, password: string): Promise<void> {
    const resp = await this.sessionService.signup(email, password);
    if (resp.error) throw resp.error;
  }

  async login(email: string, password: string): Promise<void> {
    const resp = await this.sessionService.login(email, password);
    if (resp.error) throw resp.error;
  }

  logout(): Promise<void> {
    runInAction(() => {
      this.sessionDao.user_id = null;
    });
    return this.sessionService.logout();
  }
}

export default SessionRepository;
