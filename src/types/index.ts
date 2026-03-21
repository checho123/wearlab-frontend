export type Role = 'NONE' | 'USER' | 'DESIGNER' | 'ADMIN' | 'SUPER_ADMIN';

export interface SessionUser {
  guid: string;
  email: string;
  nickname: string;
  fullname: string;
  role: Role;
  status: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    user: SessionUser;
  };
}