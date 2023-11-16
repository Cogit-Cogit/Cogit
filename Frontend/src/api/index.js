import axios from 'axios';

export const BASE_URL = `${process.env.NEXT_PUBLIC_API}`;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Accept: 'application/json',
    // Authorization: 'Bearer ' + `${process.env.NEXT_PUBLIC_TOKEN}`,
  },
});

// Request 🧑
instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers.Authorization = accessToken;
  }

  return config;
});

// Response 🧑
instance.interceptors.response.use();

export default instance;
