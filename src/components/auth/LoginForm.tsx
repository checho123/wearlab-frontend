import { useState } from "react";
import { saveSession } from "../../lib/auth";
import type { AuthResponse } from "../../types/index";

const API_URL = import.meta.env.PUBLIC_API_URL ?? "http://localhost:3000";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    if (!email || !password) {
      setError("Completa todos los campos.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      // Detecta si es email o nickname
      const isEmail = email.includes("@");
      const body = isEmail
        ? { email, password }
        : { nickname: email, password };

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data: AuthResponse = await res.json();
      if (!res.ok || !data.success) {
        setError("Credenciales incorrectas. Verifica tus datos.");
        return;
      }
      saveSession(
        data.data.accessToken,
        data.data.refreshToken,
        data.data.user,
      );
      const role = data.data.user.role;
      window.location.href =
        role === "ADMIN" || role === "SUPER_ADMIN" || role === "DESIGNER"
          ? "/dashboard"
          : "/catalogo";
    } catch {
      setError("Error de conexión. Verifica que el servidor esté activo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0a0a0a]">
      {/* ── LADO IZQUIERDO NEGRO CON TEXTURA ── */}
      <div className="hidden md:flex flex-1 flex-col justify-between p-10 relative overflow-hidden">
        {/* Textura de puntos */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, #c41a1a22 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Bloques decorativos de color */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-10 opacity-[0.06] pointer-events-none">
          <div className="col-start-1 col-end-3 row-start-1 row-end-4 bg-red-700 rounded-sm m-1" />
          <div className="col-start-3 col-end-6 row-start-2 row-end-6 bg-[#b8912a] rounded-sm m-1" />
          <div className="col-start-6 col-end-9 row-start-1 row-end-3 bg-red-700 rounded-sm m-1" />
          <div className="col-start-2 col-end-5 row-start-6 row-end-9 bg-[#b8912a] rounded-sm m-1" />
          <div className="col-start-5 col-end-8 row-start-5 row-end-8 bg-red-700 rounded-sm m-1" />
          <div className="col-start-1 col-end-4 row-start-8 row-end-11 bg-neutral-600 rounded-sm m-1" />
          <div className="col-start-4 col-end-7 row-start-9 row-end-11 bg-[#b8912a] rounded-sm m-1" />
        </div>

        {/* Bloques decorativos */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-900/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#b8912a]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        {/* Volver a la tienda — arriba izquierda */}
        <a
          href="/"
          className="relative z-10 flex items-center gap-2 w-fit group no-underline"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8L10 4"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs font-black text-white tracking-widest uppercase border-b-2 border-white pb-px group-hover:text-neutral-400 group-hover:border-neutral-400 transition-colors">
            Volver a la tienda
          </span>
        </a>

        {/* Texto editorial — abajo izquierda */}
        <div className="relative z-10">
          <div className="w-8 h-0.5 bg-red-700 mb-5" />
          <h1 className="font-serif text-6xl font-bold text-white leading-tight tracking-tight">
            La moda
            <br />
            que te
            <br />
            <span className="text-red-700">define.</span>
          </h1>
          <p className="text-neutral-600 text-xs tracking-widest uppercase mt-6">
            Marketplace · Configurador 3D · Colombia
          </p>
        </div>
      </div>

      {/* ── LADO DERECHO BLANCO ── */}
      <div className="w-full md:w-1/2 shrink-0 bg-white flex flex-col justify-center px-16 py-12 relative">
        {/* Volver — solo mobile */}
        <a
          href="/"
          className="md:hidden absolute top-6 left-6 flex items-center gap-2 no-underline group"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8L10 4"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs font-black text-black tracking-widest uppercase border-b-2 border-black pb-px">
            Volver
          </span>
        </a>

        {/* Logo + título */}
        <div className="mb-10 max-w-sm mx-auto w-full">
          <span className="font-serif text-2xl font-bold tracking-widest text-black">
            WEAR<span className="text-red-700">LAB</span>
          </span>
          <div className="mt-6">
            <h2 className="text-3xl font-bold text-black">Bienvenido</h2>
            <p className="text-sm text-neutral-400 mt-2">
              Inicia sesión en tu cuenta
            </p>
          </div>
        </div>

        {/* Formulario */}
        <div className="flex flex-col gap-4 max-w-sm mx-auto w-full">
          {error && (
            <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-black tracking-widest uppercase">
              Email o Nickname
            </label>
            <input
              type="text" // ← cambia de "email" a "text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email o nickname"
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-red-700 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-black tracking-widest uppercase">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="••••••••"
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3.5 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-red-700 transition-colors"
            />
          </div>

          <div className="text-center py-1">
            <a
              href="/auth/forgot"
              className="text-sm font-semibold text-[#b8912a] border-b border-[#b8912a] pb-px hover:opacity-70 transition-opacity no-underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-red-700 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold tracking-widest uppercase py-4 rounded-lg transition-colors"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

          <p className="text-center text-xs text-neutral-400">
            ¿No tienes cuenta?{" "}
            <a
              href="/auth/register"
              className="text-[#b8912a] font-semibold hover:underline no-underline"
            >
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
