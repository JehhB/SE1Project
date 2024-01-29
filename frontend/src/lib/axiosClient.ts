import axios from 'axios';

export const axiosClient = axios.create({baseURL: 'http://192.168.137.1:8080'});
export default axiosClient;
