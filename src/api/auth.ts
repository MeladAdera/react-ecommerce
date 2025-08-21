// src/api/auth.ts
import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

interface User {
  username: string;
  password: string;
}

export const login = async (credentials: User) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data.token; // سيُرجع توكن وهمي من API
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};

export const getUser = async (token: string) => {
  const response = await axios.get(`${API_URL}/users/1`, { // استخدام مستخدم وهمي
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};