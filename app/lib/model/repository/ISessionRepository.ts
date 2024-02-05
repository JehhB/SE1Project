export interface ISessionRepository {
  signin(email: string, password: string): Promise<void>;
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  getSessionToken(): string | null;
  getUserId(): string | null;
}

export default ISessionRepository;
