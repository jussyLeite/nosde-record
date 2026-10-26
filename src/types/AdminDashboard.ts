export interface AdminDashboardStatistics {
  users: number;
  artists: number;
  songs: number;
  submissions: number;
  streams: number;
  downloads: number;
  //likes: number;
}

export interface AdminDashboardResponse {
  success: boolean;
  data: AdminDashboardStatistics;
}
