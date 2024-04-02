import axios from "axios";
const baseURL = "https://server-sticky-note-app.vercel.app/api";

const instance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export default instance;
