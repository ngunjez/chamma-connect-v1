"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Bell,
  MessageSquare,
  Sun,
  Moon,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { MOCK_USER } from "@/lib/mockData";
import { getInitials } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    href: "/chamas",
    label: "My Chamas",
    icon: <Users size={18} />,
  },
];

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleTheme = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };

  const initials = getInitials(MOCK_USER.firstName, MOCK_USER.lastName);
  const displayName = `${MOCK_USER.firstName} ${MOCK_USER.lastName}`.toLowerCase();

  return (
    <div
      className="app-shell"
      style={{
        display: "flex",
        minHeight: "100dvh",
        backgroundColor: "var(--background)",
      }}
    >
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 40,
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        style={{
          width: collapsed ? "4rem" : "var(--sidebar-width)",
          flexShrink: 0,
          borderRight: "1px solid var(--border)",
          backgroundColor: "var(--surface)",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.25s ease",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: mobileOpen ? 0 : undefined,
          zIndex: 50,
          overflowX: "hidden",
        }}
        className="hidden md:flex"
      >
        <div
          style={{
            padding: "1rem",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            justifyContent: collapsed ? "center" : "space-between",
          }}
        >
          {!collapsed && (
            <Link
              href="/dashboard"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  width: "1.75rem",
                  height: "1.75rem",
                  borderRadius: "0.5rem",
                  background: "var(--brand)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: "var(--font-sora)",
                }}
              >
                CC
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sora)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "var(--text-primary)",
                }}
              >
                ChamaConnect
              </span>
            </Link>
          )}
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setCollapsed((c) => !c)}
            aria-label="Toggle sidebar"
            style={{ padding: "0.25rem" }}
          >
            <ChevronLeft
              size={16}
              style={{
                transform: collapsed ? "rotate(180deg)" : undefined,
                transition: "transform 0.25s",
              }}
            />
          </button>
        </div>

        <nav style={{ flex: 1, padding: "0.75rem 0.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "var(--radius-sm)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: active ? 600 : 400,
                  color: active ? "var(--brand)" : "var(--text-secondary)",
                  backgroundColor: active ? "var(--brand-subtle)" : "transparent",
                  transition: "all 0.15s",
                  justifyContent: collapsed ? "center" : undefined,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
                title={collapsed ? item.label : undefined}
              >
                <span style={{ flexShrink: 0 }}>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          marginLeft: collapsed ? "4rem" : "var(--sidebar-width)",
          transition: "margin-left 0.25s ease",
          minWidth: 0,
        }}
        className="md:ml-[var(--sidebar-width)]"
      >
        <header
          style={{
            height: "3.5rem",
            borderBottom: "1px solid var(--border)",
            backgroundColor: "var(--surface)",
            display: "flex",
            alignItems: "center",
            padding: "0 1.25rem",
            gap: "0.75rem",
            position: "sticky",
            top: 0,
            zIndex: 30,
          }}
        >
          <button
            className="btn btn-ghost btn-sm md:hidden"
            onClick={() => setMobileOpen(true)}
            style={{ padding: "0.375rem" }}
          >
            <Menu size={18} />
          </button>

          <div style={{ flex: 1, maxWidth: "24rem" }}>
            <input
              type="search"
              placeholder="Search users or messages"
              className="input-base"
              style={{ height: "2.25rem", fontSize: "0.8125rem" }}
            />
          </div>

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <button
              className="btn btn-ghost btn-sm"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{ padding: "0.375rem" }}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              className="btn btn-ghost btn-sm"
              style={{ padding: "0.375rem" }}
              aria-label="Notifications"
            >
              <Bell size={16} />
            </button>
            <button
              className="btn btn-ghost btn-sm"
              style={{ padding: "0.375rem" }}
              aria-label="Messages"
            >
              <MessageSquare size={16} />
            </button>

            {/* Avatar */}
            <div
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                background: "var(--brand)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#fff",
                cursor: "pointer",
              }}
            >
              {initials}
            </div>
            <span
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                display: "none",
              }}
              className="sm:block"
            >
              {displayName}
            </span>
          </div>
        </header>

        <main style={{ flex: 1, padding: "1.5rem", overflow: "auto" }}>
          {children}
        </main>

        <footer
          style={{
            padding: "1rem 1.25rem",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            textAlign: "center",
            borderTop: "1px solid var(--border)",
          }}
        >
          © 2026 Chama Connect — Admin
        </footer>
      </div>
    </div>
  );
}