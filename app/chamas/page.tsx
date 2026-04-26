import Link from "next/link";
import { Plus, Users, CheckCircle, Clock, XCircle } from "lucide-react";
import { MOCK_CHAMAS } from "@/lib/mockData";
import { formatKES } from "@/lib/utils";
import type { ChamaStatus } from "@/types";

function StatusBadge({ status }: { status: ChamaStatus }) {
  const map = {
    active: { label: "ACTIVE", cls: "badge-green", icon: <CheckCircle size={11} /> },
    pending: { label: "PENDING", cls: "badge-blue", icon: <Clock size={11} /> },
    inactive: { label: "INACTIVE", cls: "badge-red", icon: <XCircle size={11} /> },
  } as const;
  const { label, cls, icon } = map[status];
  return (
    <span className={`badge ${cls}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
      {icon} {label}
    </span>
  );
}

export default function ChamasPage() {
  const totalGroups = MOCK_CHAMAS.length;
  const totalValue = MOCK_CHAMAS.reduce((s, c) => s + c.totalValue, 0);
  const totalContributions = MOCK_CHAMAS.reduce((s, c) => s + c.totalContributions, 0);
  const totalLoans = MOCK_CHAMAS.reduce((s, c) => s + c.activeLoans, 0);
  const active = MOCK_CHAMAS.filter((c) => c.status === "active").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, fontFamily: "var(--font-sora)", color: "var(--text-primary)" }}>
            My Chamas
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
            Manage and track your chama groups
          </p>
        </div>
        <Link href="/chamas/create" className="btn btn-primary">
          <Plus size={15} />
          Create Chama
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(12rem, 1fr))", gap: "1rem" }}>
        {[
          { label: "Total Groups", value: String(totalGroups), icon: <Users size={18} /> },
          { label: "Total Value", value: formatKES(totalValue), icon: "💰" },
          { label: "Total Contributions", value: formatKES(totalContributions), icon: "📈" },
          { label: "Active Loans", value: formatKES(totalLoans), icon: "🔴" },
        ].map((s) => (
          <div key={s.label} className="card" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>{s.label}</p>
              <p style={{ fontSize: "1.375rem", fontWeight: 700, fontFamily: "var(--font-sora)" }}>{s.value}</p>
            </div>
            <span style={{ fontSize: "1.125rem" }}>{s.icon}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 16rem", gap: "1rem", alignItems: "start" }}>
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: "0.9375rem", fontWeight: 600 }}>Chama Performance</h2>
            <input type="search" placeholder="Search Chamas…" className="input-base" style={{ width: "12rem", height: "2rem", fontSize: "0.8125rem" }} />
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Group Name", "No. of Members", "Status", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "0.75rem 1.25rem", textAlign: "left", fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-muted)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_CHAMAS.map((c) => (
                <tr key={c.id} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  <td style={{ padding: "0.875rem 1.25rem" }}>
                    <p style={{ fontSize: "0.875rem", fontWeight: 500 }}>{c.name}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>{c.groupType}</p>
                  </td>
                  <td style={{ padding: "0.875rem 1.25rem", fontSize: "0.875rem", fontWeight: 600 }}>
                    {c.members.length}
                  </td>
                  <td style={{ padding: "0.875rem 1.25rem" }}>
                    <StatusBadge status={c.status} />
                  </td>
                  <td style={{ padding: "0.875rem 1.25rem" }}>
                    <Link
                      href={`/chamas/${c.id}`}
                      style={{ fontSize: "0.875rem", color: "var(--info)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.25rem" }}
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="card">
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, marginBottom: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CheckCircle size={15} style={{ color: "var(--brand)" }} /> Status
            </h3>
            {[
              { label: "Active Groups", value: active },
              { label: "Pending Approvals", value: 0 },
              { label: "Inactive Groups", value: MOCK_CHAMAS.length - active },
            ].map((r) => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid var(--border-subtle)" }}>
                <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>{r.label}</span>
                <span style={{ fontSize: "0.8125rem", fontWeight: 600 }}>{r.value}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, marginBottom: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              🔄 Recent Activity
            </h3>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>No recent activity</p>
          </div>
        </div>
      </div>
    </div>
  );
}