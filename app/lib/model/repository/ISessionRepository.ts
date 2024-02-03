export interface ISessionRepository {
  signin(email: string, password: string): void;
  login(email: string, password: string): void;
  getSessionToken(): string | null;
}

export default ISessionRepository;
