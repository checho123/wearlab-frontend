import { useState, useEffect, useRef } from "react";
import { LogOut, User, ChevronDown } from "lucide-react";
import { getSessionUser, clearSession } from "../../lib/auth";
import type { Role } from "../../types/index";

export default function TopbarProfile() {
  const [fullname, setFullname] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail]       = useState('');
  const [role, setRole]         = useState<Role>('NONE');
  const [open, setOpen]         = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user = getSessionUser();
    if (user) {
      setFullname(user.fullname);
      setNickname(user.nickname ?? '');
      setEmail(user.email);
      setRole(user.role);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const roleLabel =
    role === "ADMIN" || role === "SUPER_ADMIN" ? "Admin" :
    role === "DESIGNER" ? "Diseñador" : "Usuario";

  const roleColor =
    role === "ADMIN" || role === "SUPER_ADMIN" ? "#c41a1a" :
    role === "DESIGNER" ? "#b8912a" : "#555";

  const initial = (fullname?.[0] ?? roleLabel[0]).toUpperCase();

  function handleLogout() {
    clearSession();
    window.location.href = "/";
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 bg-transparent border-none cursor-pointer p-0 group"
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ background: roleColor }}
        >
          {initial}
        </div>
        <div className="text-left">
          <div className="text-sm text-white font-medium group-hover:text-neutral-300 transition-colors leading-tight">
            {fullname || roleLabel}
          </div>
          <div className="text-xs leading-tight flex items-center gap-1" style={{ color: roleColor }}>
            {roleLabel}
            <ChevronDown
              size={11}
              className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </div>
        </div>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-[#111] border border-[#1f1f1f] rounded-lg overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-[#1f1f1f]">
            <div className="text-xs text-white font-medium truncate">{fullname}</div>
            <div className="text-xs text-neutral-600 truncate mt-0.5">
              {nickname ? `@${nickname}` : email}
            </div>
          </div>
          <a
            href="/dashboard/profile"
            className="flex items-center gap-2 px-4 py-2.5 text-xs text-neutral-400 hover:text-white hover:bg-[#1a1a1a] transition-colors no-underline"
          >
            <User size={12} className="shrink-0" />
            Ver perfil
          </a>
          <div className="border-t border-[#1f1f1f]" />
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-red-900 hover:text-red-600 hover:bg-[#1a0000] transition-colors bg-transparent border-none cursor-pointer"
          >
            <LogOut size={12} className="shrink-0" />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}