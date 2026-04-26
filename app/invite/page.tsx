"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Users, ArrowRight } from "lucide-react";
import { MOCK_CHAMAS, MOCK_USER } from "@/lib/mockData";
import { formatKES } from "@/lib/utils";
import type { Chama } from "@/types";

type State = "loading" | "found" | "already_member" | "invalid";

function InviteContent() {
  const params = useSearchParams();
  const router = useRouter();

  const chamaId = params.get("chama");
  const ref = params.get("ref");

  const [state, setState] = useState<State>("loading");
  const [chama, setChama] = useState<Chama | null>(null);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    if (!chamaId || !ref) { setState("invalid"); return; }
    const found = MOCK_CHAMAS.find((c) => c.id === chamaId);
    if (!found) { setState("invalid"); return; }
    const alreadyMember = found.members.some((m) => m.id === MOCK_USER.id);
    setChama(found);
    setState(alreadyMember ? "already_member" : "found");
  }, [chamaId, ref]);

  const handleJoin = () => {
    setJoined(true);
    setTimeout(() => router.push("/chamas"), 2000);
  };

  if (state === "loading") {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <div style={{
          width: "2rem", height: "2rem", borderRadius: "50%",
          border: "3px solid var(--brand)", borderTopColor: "transparent",
          animation: "spin 0.8s linear infinite",
        }} />
      </div>
    );
  }

  if (state === "invalid") {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <div className="card" style={{ maxWidth: "24rem", width: "100%", textAlign: "center", display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
          <XCircle size={40} style={{ color: "var(--danger, #ef4444)" }} />
          <h1 style={{ fontSize: "1.25rem", fontWeight: 700, fontFamily: "var(--font-sora)" }}>Invalid Invite Link</h1>
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
            This invite link is invalid or has expired. Ask the chama admin to generate a new one.
          </p>
          <button type="button" className="btn btn-primary" onClick={() => router.push("/chamas")}>
            Go to My Chamas
          </button>
        </div>
      </div>
    );
  }

  if (state === "already_member") {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <div className="card" style={{ maxWidth: "24rem", width: "100%", textAlign: "center", display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
          <CheckCircle size={40} style={{ color: "var(--brand)" }} />
          <h1 style={{ fontSize: "1.25rem", fontWeight: 700, fontFamily: "var(--font-sora)" }}>Already a Member</h1>
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
            You are already a member of <strong>{chama?.name}</strong>.
          </p>
          <button type="button" className="btn btn-primary" onClick={() => router.push(`/chamas/${chama?.id}`)}>
            View Chama <ArrowRight size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", padding: "1rem" }}>
      <div className="card" style={{ maxWidth: "26rem", width: "100%", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {joined ? (
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
            <CheckCircle size={48} style={{ color: "var(--brand)" }} />
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, fontFamily: "var(--font-sora)" }}>Welcome aboard!</h2>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
              You have joined <strong>{chama?.name}</strong>. Redirecting…
            </p>
          </div>
        ) : (
          <>
            <div>
              <p style={{ fontSize: "0.75rem", color: "var(--brand)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.375rem" }}>
                You have been invited to join
              </p>
              <h1 style={{ fontSize: "1.375rem", fontWeight: 700, fontFamily: "var(--font-sora)", color: "var(--text-primary)" }}>
                {chama?.name}
              </h1>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: "0.375rem" }}>
                {chama?.description}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { label: "Group type", value: chama?.groupType },
                { label: "Members", value: `${chama?.members.length} members` },
                { label: "Min. contribution", value: formatKES(chama?.minimumContribution ?? 0) },
                { label: "Meeting day", value: chama?.meetingDay ?? "—" },
                { label: "Total value", value: formatKES(chama?.totalValue ?? 0) },
              ].map((r) => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid var(--border-subtle)" }}>
                  <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>{r.label}</span>
                  <span style={{ fontSize: "0.8125rem", fontWeight: 600, textTransform: r.label === "Group type" ? "capitalize" : "none" }}>{r.value}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.75rem", background: "var(--surface-alt, var(--border-subtle))", borderRadius: "var(--radius)" }}>
              <Users size={16} style={{ color: "var(--brand)", flexShrink: 0 }} />
              <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                Joining as <strong>{MOCK_USER.firstName} {MOCK_USER.lastName}</strong> · {MOCK_USER.phone}
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={() => router.push("/chamas")}>
                Decline
              </button>
              <button type="button" className="btn btn-primary" style={{ flex: 1 }} onClick={handleJoin}>
                Join Chama
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function InvitePage() {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <div style={{
          width: "2rem", height: "2rem", borderRadius: "50%",
          border: "3px solid var(--brand)", borderTopColor: "transparent",
          animation: "spin 0.8s linear infinite",
        }} />
      </div>
    }>
      <InviteContent />
    </Suspense>
  );
}