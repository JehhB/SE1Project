export interface ISessionDao {
  session_token: string | null;
  access_token: string | null;
}

export default ISessionDao;
