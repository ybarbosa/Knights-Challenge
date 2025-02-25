import axios from "axios";
const baseURL = `http://${process.env.VUE_APP_URL}:${process.env.VUE_APP_API_PORT}`

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});
