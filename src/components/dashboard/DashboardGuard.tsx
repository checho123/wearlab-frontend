import { useEffect, useState } from "react";
import { getSessionUser } from "../../lib/auth";
import type { SessionUser } from "../../types/index";

interface Props {
  onReady: (user: SessionUser) => void;
}

export default function DashboardGuard({ onReady }: Props) {
  useEffect(() => {
    const u = getSessionUser();
    if (!u) {
      window.location.href = "/auth/login";
      return;
    }
    onReady(u);
  }, []);

  return null;
}