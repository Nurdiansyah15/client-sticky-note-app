import axios from "axios";
const baseURL = "http://localhost:3001/api";

const instance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export default instance;
