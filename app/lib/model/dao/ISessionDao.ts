export interface ISessionDao {
  session_token: string | null;
  user_id: string | null;
}

export default ISessionDao;
