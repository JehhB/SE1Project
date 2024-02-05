export interface IUserService {
  setUserName(userName: string): Promise<void>;
  getUserName(): Promise<string>;
}

export default IUserService;
