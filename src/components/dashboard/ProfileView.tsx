import { useState, useEffect } from "react";
import { getSessionUser } from "../../lib/auth";
import type { Role, SessionUser } from "../../types/index";

const ROLE_LABEL: Record<Role, string> = {
  NONE:        "Sin rol",
  USER:        "Usuario",
  DESIGNER:    "Diseñador",
  ADMIN:       "Admin",
  SUPER_ADMIN: "Super Admin",
};

const ROLE_COLOR: Record<Role, string> = {
  NONE:        "#555",
  USER:        "#555",
  DESIGNER:    "#b8912a",
  ADMIN:       "#c41a1a",
  SUPER_ADMIN: "#c41a1a",
};

export default function ProfileView() {
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const u = getSessionUser();
    if (!u) {
      window.location.href = "/auth/login";
      return;
    }
    setUser(u);
  }, []);

  if (!user) return null;

  const role       = user.role ?? "NONE";
  const roleLabel  = ROLE_LABEL[role];
  const roleColor  = ROLE_COLOR[role];
  const initial    = (user.fullname?.[0] ?? roleLabel[0]).toUpperCase();
  const isActive   = user.status?.toUpperCase() === "ACTIVE";

  return (
    <div className="max-w-2xl space-y-5">

      {/* Avatar + name card */}
      <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-6 flex items-center gap-5">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shrink-0"
          style={{ background: roleColor }}
        >
          {initial}
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-white truncate m-0 leading-tight">
            {user.fullname}
          </h2>
          {user.nickname && (
            <p className="text-sm text-neutral-500 mt-0.5 m-0">@{user.nickname}</p>
          )}
          <span
            className="inline-block mt-2 text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full border"
            style={{ color: roleColor, borderColor: roleColor + "55", background: roleColor + "18" }}
          >
            {roleLabel}
          </span>
        </div>
      </div>

      {/* Info fields */}
      <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl divide-y divide-[#1a1a1a]">
        <Field label="Email" value={user.email} />
        <Field label="Nickname" value={user.nickname ? `@${user.nickname}` : "—"} />
        <Field label="ID de cuenta" value={user.guid} mono />
        <div className="px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-neutral-500 uppercase tracking-widest font-medium">Estado</span>
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
              isActive
                ? "bg-emerald-900/40 text-emerald-400 border border-emerald-800/50"
                : "bg-neutral-800 text-neutral-500 border border-neutral-700"
            }`}
          >
            {isActive ? "Activo" : user.status ?? "Desconocido"}
          </span>
        </div>
      </div>

    </div>
  );
}

function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="px-6 py-4 flex items-center justify-between gap-4">
      <span className="text-xs text-neutral-500 uppercase tracking-widest font-medium shrink-0">
        {label}
      </span>
      <span className={`text-sm text-neutral-200 truncate ${mono ? "font-mono text-xs text-neutral-400" : ""}`}>
        {value}
      </span>
    </div>
  );
}
