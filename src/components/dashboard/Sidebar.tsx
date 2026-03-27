import type { Role } from "../../types/index";
import {
  LayoutDashboard,
  Users,
  Tag,
  List,
  ShoppingBag,
  Store,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getSessionUser } from "../../lib/auth";

interface Props {
  currentPath: string;
}

const adminLinks = [
  { href: "/dashboard",            label: "Overview",   icon: LayoutDashboard },
  { href: "/dashboard/designers",  label: "Designers",  icon: Users },
  { href: "/dashboard/garments",   label: "Garments",   icon: Tag },
  { href: "/dashboard/categories", label: "Categories", icon: List },
  { href: "/dashboard/orders",     label: "Orders",     icon: ShoppingBag },
];

const designerLinks = [
  { href: "/dashboard",           label: "Overview",    icon: LayoutDashboard },
  { href: "/dashboard/garments",  label: "My garments", icon: Tag },
  { href: "/dashboard/orders",    label: "My orders",   icon: ShoppingBag },
];

const userLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/orders", label: "My orders", icon: ShoppingBag },
];

export default function Sidebar({ currentPath }: Props) {
  const [role, setRole] = useState<Role>("NONE");

  useEffect(() => {
    const user = getSessionUser();
    if (user) setRole(user.role);
  }, []);

  const mainLinks =
    role === "ADMIN" || role === "SUPER_ADMIN"
      ? adminLinks
      : role === "DESIGNER"
        ? designerLinks
        : userLinks;

  const isActive = (href: string) =>
    href === "/dashboard"
      ? currentPath === "/dashboard"
      : currentPath.startsWith(href);

  const linkClass = (href: string) =>
    isActive(href)
      ? "flex items-center gap-3 px-5 py-2.5 text-sm no-underline border-l-2 text-white bg-[#160000] border-red-700"
      : "flex items-center gap-3 px-5 py-2.5 text-sm no-underline border-l-2 text-neutral-500 border-transparent hover:text-neutral-300 hover:bg-[#111] transition-colors";

  return (
    <aside className="w-55 min-w-55 bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-[#1a1a1a]">
        <a
          href="/"
          className="font-serif text-lg font-bold tracking-widest text-white no-underline"
        >
          WEAR<span className="text-red-700">LAB</span>
        </a>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        <span className="block px-5 py-2 text-[9px] text-neutral-700 tracking-[2px] uppercase">
          Gestión
        </span>
        {mainLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.href}
              href={link.href}
              className={linkClass(link.href)}
            >
              <Icon size={15} className="shrink-0" />
              {link.label}
            </a>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-[#1a1a1a]">
        <a
          href="/"
          className="flex items-center gap-2 text-xs text-neutral-600 hover:text-neutral-400 transition-colors no-underline"
        >
          <Store size={13} className="shrink-0" />
          Volver a la tienda
        </a>
      </div>
    </aside>
  );
}
