import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  iconColor?: string;
}

export default function StatCard({ label, value, icon, iconColor }: StatCardProps) {
  return (
    <div
      className="card"
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "1rem",
      }}
    >
      <div>
        <p
          style={{
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
            marginBottom: "0.25rem",
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            fontFamily: "var(--font-sora)",
            lineHeight: 1.2,
          }}
        >
          {value}
        </p>
      </div>
      <span
        style={{
          color: iconColor ?? "var(--brand)",
          flexShrink: 0,
          marginTop: "0.125rem",
        }}
      >
        {icon}
      </span>
    </div>
  );
}