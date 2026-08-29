import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_Server_URL}/api`,
  withCredentials: true,
});

export default api;