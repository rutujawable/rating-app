import axios from 'axios';

const API = axios.create({ baseURL: process.env.SERVERURL || "https://rating-app-qpj6.onrender.com" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = token;
  }
  return req;
});

export default API;