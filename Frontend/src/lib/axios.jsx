import axios from "axios";
//in production there is nothing like locahost so we have to make it dynamic
const Base_URL =import.meta.env.MODE === "development" ? "http://localhost:3000/api":".api"
const api = axios.create({
  baseURL: Base_URL,
});

export default api;
