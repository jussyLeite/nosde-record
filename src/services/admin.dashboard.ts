import type { AdminDashboardResponse } from '../types/AdminDashboard';
import { api } from './api';

export async function getAdminDashboardStatistics() {

  const response =
    await api.get<AdminDashboardResponse>(
      "/admin/dashboard"
    );

  return response.data.data;
}