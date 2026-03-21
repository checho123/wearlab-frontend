import { useState } from 'react';

const API_URL = import.meta.env.PUBLIC_API_URL ?? 'http://localhost:3000';

type UserType = 'USER' | 'DESIGNER';

export default function RegisterForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');

  async function handleRegister() {
    if (!fullname || !email || !phone || !password) {
      setError('Completa los campos obligatorios.');
      return;
    }
    if (userType === 'DESIGNER' && !bio) {
      setError('La biografía es obligatoria para diseñadores.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const body: Record<string, string> = {
        fullname, email, phone, password,
        role: 'NONE',
        nickname: nickname || email.split('@')[0],
      };
      if (userType === 'DESIGNER') body.bio = bio;

      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message ?? 'Error al registrarse.');
        return;
      }
      setSuccess(true);
    } catch {
      setError('Error de conexión.');
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-red-700 transition-colors";
  const labelClass = "text-xs font-semibold text-black tracking-widest uppercase";

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0a0a0a]">

      {/* ── LADO IZQUIERDO NEGRO ── */}
      <div className="hidden md:flex flex-1 flex-col justify-between p-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, rgba(196,26,26,0.13) 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }} />
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-10 opacity-[0.06] pointer-events-none">
          <div className="col-start-1 col-end-3 row-start-1 row-end-4 bg-red-700 rounded-sm m-1" />
          <div className="col-start-3 col-end-6 row-start-2 row-end-6 bg-[#b8912a] rounded-sm m-1" />
          <div className="col-start-6 col-end-9 row-start-1 row-end-3 bg-red-700 rounded-sm m-1" />
          <div className="col-start-2 col-end-5 row-start-6 row-end-9 bg-[#b8912a] rounded-sm m-1" />
          <div className="col-start-5 col-end-8 row-start-5 row-end-8 bg-red-700 rounded-sm m-1" />
          <div className="col-start-1 col-end-4 row-start-8 row-end-11 bg-neutral-600 rounded-sm m-1" />
          <div className="col-start-4 col-end-7 row-start-9 row-end-11 bg-[#b8912a] rounded-sm m-1" />
        </div>

        <a href="/" className="relative z-10 flex items-center gap-2 w-fit group no-underline">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs font-black text-white tracking-widest uppercase border-b-2 border-white pb-px group-hover:text-neutral-400 group-hover:border-neutral-400 transition-colors">
            Volver a la tienda
          </span>
        </a>

        <div className="relative z-10">
          <div className="w-8 h-0.5 bg-red-700 mb-5" />
          <h1 className="font-serif text-6xl font-bold text-white leading-tight tracking-tight">
            Únete a<br />la nueva<br /><span className="text-red-700">moda.</span>
          </h1>
          <p className="text-neutral-600 text-xs tracking-widest uppercase mt-6">
            Marketplace · Configurador 3D · Colombia
          </p>
        </div>
      </div>

      {/* ── LADO DERECHO ── */}
      <div className="w-full md:w-1/2 shrink-0 bg-white flex flex-col justify-center px-12 py-10 overflow-y-auto">

        {/* ── PASO 1: SELECTOR DE ROL ── */}
        {step === 1 && (
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8">
              <span className="font-serif text-2xl font-bold tracking-widest text-black">
                WEAR<span className="text-red-700">LAB</span>
              </span>
              <div className="mt-5">
                <span className="text-xs font-bold text-neutral-400 tracking-widest uppercase">Paso 1 de 2</span>
                <h2 className="font-serif text-3xl font-bold text-black mt-2 leading-tight">
                  ¿Cómo quieres<br />unirte?
                </h2>
                <p className="text-sm text-neutral-400 mt-2">Elige tu rol para personalizar tu experiencia</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-7">

              {/* Card Cliente */}
              <div
                onClick={() => setUserType('USER')}
                className={`rounded-2xl p-6 cursor-pointer border transition-all duration-200 ${
                  userType === 'USER'
                    ? 'bg-[#0a0a0a] border-red-700'
                    : 'bg-[#111] border-[#1f1f1f] hover:border-neutral-700'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                  userType === 'USER' ? 'bg-[#1a0000]' : 'bg-[#1a1a1a]'
                }`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke={userType === 'USER' ? '#c41a1a' : '#555'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="3" y1="6" x2="21" y2="6" stroke={userType === 'USER' ? '#c41a1a' : '#555'} strokeWidth="1.5"/>
                    <path d="M16 10a4 4 0 01-8 0" stroke={userType === 'USER' ? '#c41a1a' : '#555'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="font-serif text-base font-bold text-white mb-2">Cliente</div>
                <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                  Compra y configura prendas únicas en 3D.
                </p>
                <div className="flex flex-col gap-1.5 mb-5">
                  {['Catálogo 3D', 'Pedidos', 'Historial'].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <div className={`w-1 h-1 rounded-full ${userType === 'USER' ? 'bg-red-700' : 'bg-neutral-600'}`} />
                      <span className="text-xs text-neutral-500">{item}</span>
                    </div>
                  ))}
                </div>
                <div className={`w-full py-2.5 rounded-lg border text-center text-xs font-bold tracking-widest uppercase transition-colors ${
                  userType === 'USER'
                    ? 'border-red-700 text-red-700'
                    : 'border-neutral-700 text-neutral-600'
                }`}>
                  {userType === 'USER' ? '✓ Seleccionado' : 'Seleccionar'}
                </div>
              </div>

              {/* Card Diseñador */}
              <div
                onClick={() => setUserType('DESIGNER')}
                className={`rounded-2xl p-6 cursor-pointer border transition-all duration-200 ${
                  userType === 'DESIGNER'
                    ? 'bg-[#0a0a0a] border-[#b8912a]'
                    : 'bg-[#111] border-[#1f1f1f] hover:border-neutral-700'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                  userType === 'DESIGNER' ? 'bg-[#0f0c00]' : 'bg-[#1a1a1a]'
                }`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 20h9" stroke={userType === 'DESIGNER' ? '#b8912a' : '#555'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke={userType === 'DESIGNER' ? '#b8912a' : '#555'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="font-serif text-base font-bold text-white mb-2">Diseñador</div>
                <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                  Publica diseños y llega a compradores.
                </p>
                <div className="flex flex-col gap-1.5 mb-5">
                  {['Panel propio', 'Colecciones', 'Ventas'].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <div className={`w-1 h-1 rounded-full ${userType === 'DESIGNER' ? 'bg-[#b8912a]' : 'bg-neutral-600'}`} />
                      <span className="text-xs text-neutral-500">{item}</span>
                    </div>
                  ))}
                </div>
                <div className={`w-full py-2.5 rounded-lg border text-center text-xs font-bold tracking-widest uppercase transition-colors ${
                  userType === 'DESIGNER'
                    ? 'border-[#b8912a] text-[#b8912a]'
                    : 'border-neutral-700 text-neutral-600'
                }`}>
                  {userType === 'DESIGNER' ? '✓ Seleccionado' : 'Seleccionar'}
                </div>
              </div>
            </div>

            <button
              onClick={() => userType && setStep(2)}
              disabled={!userType}
              className={`w-full py-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                userType
                  ? userType === 'USER'
                    ? 'bg-red-700 hover:bg-red-600 text-white'
                    : 'bg-[#b8912a] hover:bg-[#a07820] text-white'
                  : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
              }`}
            >
              {userType
                ? `Continuar como ${userType === 'USER' ? 'Cliente' : 'Diseñador'} →`
                : 'Selecciona una opción'}
            </button>

            <p className="text-center text-xs text-neutral-400 mt-5">
              ¿Ya tienes cuenta?{' '}
              <a href="/auth/login" className="text-[#b8912a] font-semibold hover:underline no-underline">
                Inicia sesión
              </a>
            </p>
          </div>
        )}

        {/* ── PASO 2: FORMULARIO ── */}
        {step === 2 && (
          <div className="max-w-md mx-auto w-full">
            {success ? (
              <div className="flex flex-col items-center justify-center gap-5 py-10">
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="#c41a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black">¡Cuenta creada!</h3>
                <p className="text-sm text-neutral-400 text-center">
                  Revisa tu email para verificar tu cuenta antes de iniciar sesión.
                </p>
                <a href="/auth/login" className="text-xs font-bold tracking-widest uppercase text-[#b8912a] border-b border-[#b8912a] pb-px no-underline">
                  Ir a iniciar sesión →
                </a>
              </div>
            ) : (
              <>
                <div className="mb-7">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 text-xs text-neutral-400 hover:text-black transition-colors bg-transparent border-none cursor-pointer p-0 mb-5"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Volver a elegir rol
                  </button>
                  <span className="font-serif text-2xl font-bold tracking-widest text-black">
                    WEAR<span className="text-red-700">LAB</span>
                  </span>
                  <div className="mt-4">
                    <span className="text-xs font-bold text-neutral-400 tracking-widest uppercase">Paso 2 de 2</span>
                    <h2 className="text-2xl font-bold text-black mt-1">
                      {userType === 'USER' ? 'Crea tu cuenta' : 'Perfil de diseñador'}
                    </h2>
                    <p className="text-sm text-neutral-400 mt-1">
                      {userType === 'USER'
                        ? 'Completa tus datos para empezar a comprar'
                        : 'Cuéntanos sobre ti y tu trabajo'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {error && (
                    <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className={labelClass}>Nombre completo *</label>
                      <input type="text" value={fullname} onChange={e => setFullname(e.target.value)} placeholder="Tu nombre" className={inputClass} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className={labelClass}>Teléfono *</label>
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+57 300..." className={inputClass} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Email *</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" className={inputClass} />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Contraseña *</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 8 caracteres" className={inputClass} />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>
                      Nickname <span className="text-neutral-400 normal-case tracking-normal font-normal text-xs">(opcional)</span>
                    </label>
                    <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} placeholder="tunickname" className={inputClass} />
                  </div>

                  {/* Bio — solo diseñador, obligatorio */}
                  {userType === 'DESIGNER' && (
                    <div className="flex flex-col gap-1.5">
                      <label className={labelClass}>Biografía *</label>
                      <textarea
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                        placeholder="Cuéntanos sobre tu estilo y experiencia como diseñador..."
                        rows={4}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-red-700 transition-colors resize-none"
                      />
                    </div>
                  )}

                  <button
                    onClick={handleRegister}
                    disabled={loading}
                    className={`w-full py-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white ${
                      userType === 'DESIGNER'
                        ? 'bg-[#b8912a] hover:bg-[#a07820]'
                        : 'bg-red-700 hover:bg-red-600'
                    }`}
                  >
                    {loading ? 'Creando cuenta...' : userType === 'DESIGNER' ? 'Registrarme como Diseñador' : 'Crear cuenta'}
                  </button>

                  <p className="text-center text-xs text-neutral-400">
                    ¿Ya tienes cuenta?{' '}
                    <a href="/auth/login" className="text-[#b8912a] font-semibold hover:underline no-underline">
                      Inicia sesión
                    </a>
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}