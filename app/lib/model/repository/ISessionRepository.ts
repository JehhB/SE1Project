export interface ISessionRepository {
  signin(email: string, password: string): Promise<void>;
  login(email: string, password: string): Promise<void>;
  getSessionToken(): string | null;
}

export default ISessionRepository;
