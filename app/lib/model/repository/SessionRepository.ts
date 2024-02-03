import ISessionDao from "@/lib/model/dao/ISessionDao";
import ISessionRepository from "@/lib/model/repository/ISessionRepository";
import { ISessionService } from "@/lib/services/ISessionService";

export class SessionRepository implements ISessionRepository {
  constructor(
    protected sessionDao: ISessionDao,
    protected sessionService: ISessionService,
  ) {}

  getSessionToken(): string | null {
    if (this.sessionDao.access_token == null) {
      this.sessionService.createSession().then((resp) => {
        if (resp.data == null) throw new Error(resp.error);
        this.sessionDao.access_token = resp.data.session_token;
      });
    }

    return this.sessionDao.access_token;
  }

  signin(email: string, password: string): void {
    this.sessionService
      .signin(email, password)
      .then((resp) => {
        if (resp.error !== null) throw resp.error;
      })
      .catch((error) => console.error(error));
  }

  login(email: string, password: string): void {
    this.sessionService
      .login(email, password)
      .then((resp) => {
        if (resp.data == null) throw resp.error;
        this.sessionDao.access_token = resp.data.session?.access_token ?? null;
      })
      .catch((error) => console.error(error));
  }
}

export default SessionRepository;
