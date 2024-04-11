import axios from "axios";
const baseURL = "https://server-sticky-note-app.vercel.app/api";
// const baseURL = process.env.REACT_APP_URL_API_SERVER_STICKY_APP;

const instance = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
});

export default instance;
