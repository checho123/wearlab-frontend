import { useState } from 'react';
import { saveSession } from '../../lib/auth';
import type { AuthResponse } from '../../types/index';

const API_URL = import.meta.env.PUBLIC_API_URL ?? 'http://localhost:3000';

interface Props {
  onClose: () => void;
}

export default function LoginModal({ onClose }: Props) {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register
  const [regNickname, setRegNickname] = useState('');
  const [regFullname, setRegFullname] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<'NONE' | 'USER'>('USER');
  const [registered, setRegistered] = useState(false);

  async function handleLogin() {
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data: AuthResponse = await res.json();
      if (!res.ok || !data.success) {
        setError('Credenciales incorrectas. Verifica tu email y contraseña.');
        return;
      }
      saveSession(data.data.accessToken, data.data.refreshToken, data.data.user);

      // Redirigir según role
      const role = data.data.user.role;
      if (role === 'ADMIN' || role === 'SUPER_ADMIN' || role === 'DESIGNER') {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/catalogo';
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister() {
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: regNickname,
          fullname: regFullname,
          email: regEmail,
          phone: regPhone,
          password: regPassword,
          role: regRole,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message ?? 'Error al registrarse.');
        return;
      }
      setRegistered(true);
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl p-8 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#555] hover:text-white transition-colors text-xl leading-none"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="mb-6 text-center">
          <span className="font-serif text-2xl font-bold tracking-widest text-white">
            WEAR<span className="text-[#c41a1a]">LAB</span>
          </span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#1f1f1f] mb-6">
          {(['login', 'register'] as const).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(''); setRegistered(false); }}
              className={`flex-1 pb-3 text-sm font-medium transition-colors capitalize ${
                tab === t
                  ? 'text-white border-b-2 border-[#c41a1a]'
                  : 'text-[#555] hover:text-[#888]'
              }`}
            >
              {t === 'login' ? 'Iniciar sesión' : 'Registrarse'}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-[#1a0505] border border-[#c41a1a]/30 rounded-lg text-[#c41a1a] text-sm">
            {error}
          </div>
        )}

        {/* LOGIN */}
        {tab === 'login' && (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
              className="w-full bg-[#111] border border-[#1f1f1f] rounded-lg px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#c41a1a] transition-colors"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="w-full bg-[#111] border border-[#1f1f1f] rounded-lg px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#c41a1a] transition-colors"
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#c41a1a] hover:bg-[#a51616] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors text-sm tracking-wide"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
            <p className="text-center text-xs text-[#444]">
              ¿Olvidaste tu contraseña?{' '}
              <a href="#" className="text-[#b8912a] hover:underline">Recupérala aquí</a>
            </p>
          </div>
        )}

        {/* REGISTER */}
        {tab === 'register' && !registered && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Nombre completo"
                value={regFullname}
                onChange={e => setRegFullname(e.target.value)}
                className="col-span-2 w-full bg-[#111] border border-[#1f1f1f] rounded-lg px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#c41a1a] transition-colors"
              />
              <input
                type="text"
                placeholder="Nickname"
                value={regNickname}
                onChange={e => setRegNickname(e.target.value)}
                className="w-full bg-[#111] border border-[#1f1f1f] rounded-lg px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#c41a1a] transition-colors"
              />
              <input
                type="tel"
                placeholder="Teléfono"
                value={regPhone}
                onChange={e => setRegPhone(e.target.value)}
                className="w-full bg-[#111] border border-[#1f1f1f] rounded-lg px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#c41a1a] transition-colors"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={regEmail}
              onChange={e => setRegEmail(e.target.value)}
              className="w-full bg-[#111] border border-[#1f1f1f] rounded-lg px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#c41a1a] transition-colors"
            />
            <input
              type="password"
              placeholder="Contraseña (mínimo 8 caracteres)"
              value={regPassword}
              onChange={e => setRegPassword(e.target.value)}
              className="w-full bg-[#111] border border-[#1f1f1f] rounded-lg px-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#c41a1a] transition-colors"
            />
            {/* Selector de rol */}
            <div className="flex gap-3">
              {(['USER', 'NONE'] as const).map(r => (
                <button
                  key={r}
                  onClick={() => setRegRole(r)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    regRole === r
                      ? 'bg-[#c41a1a] border-[#c41a1a] text-white'
                      : 'bg-transparent border-[#1f1f1f] text-[#555] hover:border-[#333]'
                  }`}
                >
                  {r === 'USER' ? 'Cliente' : 'Solo explorar'}
                </button>
              ))}
            </div>
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-[#c41a1a] hover:bg-[#a51616] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors text-sm tracking-wide"
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </div>
        )}

        {/* REGISTRO EXITOSO */}
        {tab === 'register' && registered && (
          <div className="text-center space-y-4">
            <div className="text-4xl">✉️</div>
            <p className="text-white font-medium">¡Cuenta creada!</p>
            <p className="text-[#666] text-sm">
              Revisa tu email para verificar tu cuenta antes de iniciar sesión.
            </p>
            <button
              onClick={() => { setRegistered(false); setTab('login'); }}
              className="text-[#b8912a] text-sm hover:underline"
            >
              Ir a iniciar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}