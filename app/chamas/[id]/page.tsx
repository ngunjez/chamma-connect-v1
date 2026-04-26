"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft, Users, CheckCircle, Clock, XCircle,
  TrendingUp, Wallet, FileText, Calendar, Phone,
  Mail, Shield, UserPlus,
} from "lucide-react";
import { MOCK_CHAMAS, MOCK_TRANSACTIONS } from "@/lib/mockData";
import { formatKES, relativeDate } from "@/lib/utils";
import InviteModal from "@/components/chama/InviteModal";
import type { ChamaStatus, MemberRole } from "@/types";

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

function RoleBadge({ role }: { role: MemberRole }) {
  const map = {
    admin: { label: "Admin", cls: "badge-red" },
    treasurer: { label: "Treasurer", cls: "badge-green" },
    secretary: { label: "Secretary", cls: "badge-blue" },
    member: { label: "Member", cls: "" },
  } as const;
  const { label, cls } = map[role];
  return <span className={`badge ${cls}`}>{label}</span>;
}

type Tab = "overview" | "members" | "transactions" | "documents";

export default function ChamaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const chama = MOCK_CHAMAS.find((c) => c.id === id);
  if (!chama) notFound();

  const [tab, setTab] = useState<Tab>("overview");
  const [showInvite, setShowInvite] = useState(false);

  const chamaTransactions = MOCK_TRANSACTIONS.filter(
    (t) => t.chamaName === chama.name
  );

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "members", label: `Members (${chama.members.length})` },
    { key: "transactions", label: "Transactions" },
    { key: "documents", label: "Documents" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Back + header */}
      <div>
        <Link
          href="/chamas"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.375rem",
            fontSize: "0.8125rem", color: "var(--text-muted)", textDecoration: "none",
            marginBottom: "1rem",
          }}
        >
          <ArrowLeft size={14} /> Back to Chamas
        </Link>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 700, fontFamily: "var(--font-sora)", color: "var(--text-primary)" }}>
                {chama.name}
              </h1>
              <StatusBadge status={chama.status} />
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{chama.description}</p>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {chama.groupType} · Since {new Date(chama.createdAt).toLocaleDateString("en-KE", { month: "long", year: "numeric" })}
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowInvite(true)}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", flexShrink: 0 }}
          >
            <UserPlus size={15} /> Invite Member
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(11rem, 1fr))", gap: "1rem" }}>
        {[
          { label: "Total Value", value: formatKES(chama.totalValue), icon: <Wallet size={16} /> },
          { label: "Contributions", value: formatKES(chama.totalContributions), icon: <TrendingUp size={16} /> },
          { label: "Active Loans", value: formatKES(chama.activeLoans), icon: "🔴" },
          { label: "Members", value: String(chama.members.length), icon: <Users size={16} /> },
          { label: "Min. Contribution", value: formatKES(chama.minimumContribution), icon: "📅" },
        ].map((s) => (
          <div key={s.label} className="card" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>{s.label}</p>
              <p style={{ fontSize: "1.25rem", fontWeight: 700, fontFamily: "var(--font-sora)" }}>{s.value}</p>
            </div>
            <span style={{ fontSize: "1rem", color: "var(--brand)" }}>{s.icon}</span>
          </div>
        ))}
      </div>

      <div style={{ borderBottom: "1px solid var(--border)", display: "flex", gap: "0" }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            style={{
              padding: "0.625rem 1.25rem",
              fontSize: "0.875rem",
              fontWeight: tab === t.key ? 600 : 400,
              color: tab === t.key ? "var(--brand)" : "var(--text-muted)",
              background: "none",
              border: "none",
              borderBottom: tab === t.key ? "2px solid var(--brand)" : "2px solid transparent",
              cursor: "pointer",
              marginBottom: "-1px",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Calendar size={15} style={{ color: "var(--brand)" }} /> Meeting Schedule
            </h3>
            {[
              { label: "Day", value: chama.meetingDay ?? "—" },
              { label: "Time", value: chama.meetingTime ?? "—" },
              { label: "Communication", value: chama.communicationLink ? "WhatsApp Group" : "—" },
            ].map((r) => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.375rem 0", borderBottom: "1px solid var(--border-subtle)" }}>
                <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>{r.label}</span>
                <span style={{ fontSize: "0.8125rem", fontWeight: 500 }}>
                  {r.label === "Communication" && chama.communicationLink
                    ? <a href={chama.communicationLink} target="_blank" rel="noreferrer" style={{ color: "var(--info)", textDecoration: "none" }}>Open Link</a>
                    : r.value}
                </span>
              </div>
            ))}
          </div>

          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Wallet size={15} style={{ color: "var(--brand)" }} /> Payment Config
            </h3>
            {[
              { label: "Method", value: chama.payment.method === "platform" ? "Via Platform" : "Direct M-Pesa" },
              { label: chama.payment.method === "platform" ? "Paybill" : "Shortcode", value: chama.payment.destinationPaybill ?? chama.payment.shortcode ?? "—" },
              { label: "Account No.", value: chama.payment.accountNumber ?? "—" },
            ].map((r) => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.375rem 0", borderBottom: "1px solid var(--border-subtle)" }}>
                <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>{r.label}</span>
                <span style={{ fontSize: "0.8125rem", fontWeight: 500 }}>{r.value}</span>
              </div>
            ))}
          </div>

          <div className="card" style={{ gridColumn: "1 / -1" }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, marginBottom: "0.875rem" }}>Savings Progress</h3>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", marginBottom: "0.5rem" }}>
              <span style={{ color: "var(--text-muted)" }}>Contributions vs Total Value</span>
              <span style={{ fontWeight: 600 }}>{Math.round((chama.totalContributions / chama.totalValue) * 100)}%</span>
            </div>
            <div style={{ height: "8px", background: "var(--border)", borderRadius: "99px", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${Math.round((chama.totalContributions / chama.totalValue) * 100)}%`,
                background: "var(--brand)",
                borderRadius: "99px",
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
              <span>{formatKES(chama.totalContributions)} contributed</span>
              <span>{formatKES(chama.totalValue)} total value</span>
            </div>
          </div>
        </div>
      )}

      {tab === "members" && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Member", "Contact", "Role", "Joined"].map((h) => (
                  <th key={h} style={{ padding: "0.75rem 1.25rem", textAlign: "left", fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-muted)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chama.members.map((m) => (
                <tr key={m.id} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  <td style={{ padding: "0.875rem 1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      <div style={{
                        width: "2rem", height: "2rem", borderRadius: "50%",
                        background: "var(--brand)", display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: "0.75rem", fontWeight: 700,
                        color: "#fff", flexShrink: 0,
                      }}>
                        {m.avatarInitials}
                      </div>
                      <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                        {m.firstName} {m.lastName}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "0.875rem 1.25rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      <span style={{ fontSize: "0.8125rem", display: "flex", alignItems: "center", gap: "0.25rem", color: "var(--text-secondary)" }}>
                        <Phone size={11} /> {m.phone}
                      </span>
                      <span style={{ fontSize: "0.8125rem", display: "flex", alignItems: "center", gap: "0.25rem", color: "var(--text-muted)" }}>
                        <Mail size={11} /> {m.email}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "0.875rem 1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                      <Shield size={12} style={{ color: "var(--text-muted)" }} />
                      <RoleBadge role={m.role} />
                    </div>
                  </td>
                  <td style={{ padding: "0.875rem 1.25rem", fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                    {relativeDate(m.joinedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "transactions" && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          {chamaTransactions.length === 0 ? (
            <p style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.875rem" }}>
              No transactions yet for this chama.
            </p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Description", "Date", "Amount"].map((h) => (
                    <th key={h} style={{ padding: "0.75rem 1.25rem", textAlign: "left", fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-muted)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chamaTransactions.map((t) => (
                  <tr key={t.id} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.875rem 1.25rem", fontSize: "0.875rem" }}>{t.description}</td>
                    <td style={{ padding: "0.875rem 1.25rem", fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                      {relativeDate(t.date)}
                    </td>
                    <td style={{ padding: "0.875rem 1.25rem" }}>
                      <span style={{
                        fontSize: "0.875rem", fontWeight: 600,
                        color: t.type === "credit" ? "var(--brand)" : "var(--danger, #ef4444)",
                      }}>
                        {t.type === "credit" ? "+" : "−"}{formatKES(t.amount)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {tab === "documents" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {chama.documents.length === 0 ? (
            <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
              <FileText size={32} style={{ color: "var(--text-muted)", margin: "0 auto 0.75rem" }} />
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>No documents uploaded yet.</p>
            </div>
          ) : (
            chama.documents.map((doc) => (
              <div key={doc.id} className="card" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <FileText size={20} style={{ color: "var(--brand)", flexShrink: 0, marginTop: "0.125rem" }} />
                  <div>
                    <p style={{ fontSize: "0.875rem", fontWeight: 600 }}>{doc.title}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>{doc.type}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                      Uploaded {relativeDate(doc.uploadedAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {showInvite && (
        <InviteModal
          chamaId={chama.id}
          chamaName={chama.name}
          onClose={() => setShowInvite(false)}
        />
      )}
    </div>
  );
}