import type { SessionUser } from '../types/index';

const TOKEN_KEY = 'wearlab_access_token';
const REFRESH_KEY = 'wearlab_refresh_token';
const USER_KEY = 'wearlab_user';

// Guardar sesión después del login
export function saveSession(accessToken: string, refreshToken: string, user: SessionUser): void {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Leer usuario de la sesión
export function getSessionUser(): SessionUser | null {
  if (typeof window === 'undefined') return null; // SSR guard
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

// Leer access token
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

// Leer refresh token
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_KEY);
}

// Cerrar sesión
export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}

// Verificar si hay sesión activa
export function isAuthenticated(): boolean {
  return !!getAccessToken() && !!getSessionUser();
}

// Helper para fetch autenticado
export function authHeaders(): HeadersInit {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}