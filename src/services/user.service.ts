// src/services/userService.ts
import { api } from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "ARTIST" | "USER";
  createdAt: string;
}

export async function getAllUsersApi(): Promise<User[]> {
  const response = await api.get("/users"); // Ajusta a rota conforme o teu backend (ex: /admin/users)
  return response.data.data || response.data;
}