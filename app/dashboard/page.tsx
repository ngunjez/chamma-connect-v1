import {
  CreditCard,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import {
  MOCK_USER,
  MOCK_STATS,
  MOCK_TRANSACTIONS,
  MOCK_GOALS,
  MOCK_CHAMAS,
} from "@/lib/mockData";
import { formatKES, relativeDate } from "@/lib/utils";

export default function DashboardPage() {
  const name = MOCK_USER.firstName.toLowerCase();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            fontFamily: "var(--font-sora)",
          }}
        >
          Welcome back, {name}
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
          Here&apos;s what&apos;s happening with your chama
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))",
          gap: "1rem",
        }}
      >
        <StatCard
          label="Total Contributions"
          value={formatKES(MOCK_STATS.totalContributions)}
          icon={<CreditCard size={20} />}
          iconColor="var(--brand)"
        />
        <StatCard
          label="Income Analysis"
          value={formatKES(MOCK_STATS.incomeAnalysis)}
          icon={<TrendingUp size={20} />}
          iconColor="var(--brand)"
        />
        <StatCard
          label="Expense Analysis"
          value={formatKES(MOCK_STATS.expenseAnalysis)}
          icon={<TrendingDown size={20} />}
          iconColor="var(--danger)"
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 22rem",
          gap: "1rem",
        }}
      >
        <div className="card">
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              marginBottom: "1rem",
              color: "var(--text-primary)",
            }}
          >
            Group Comparison
          </h2>
          {MOCK_CHAMAS.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "3rem 1rem",
                color: "var(--text-muted)",
                fontSize: "0.875rem",
              }}
            >
              No group data available for comparison
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {MOCK_CHAMAS.map((c) => {
                const pct = Math.round((c.totalContributions / c.totalValue) * 100);
                return (
                  <div key={c.id}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.375rem",
                      }}
                    >
                      <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                        {c.name}
                      </span>
                      <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                        {formatKES(c.totalValue)}
                      </span>
                    </div>
                    <div
                      style={{
                        height: "0.5rem",
                        borderRadius: "9999px",
                        backgroundColor: "var(--surface-alt)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${pct}%`,
                          height: "100%",
                          backgroundColor: "var(--brand)",
                          borderRadius: "9999px",
                          transition: "width 0.8s ease",
                        }}
                      />
                    </div>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                      {pct}% contributed of total value
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="card">
            <h2
              style={{
                fontSize: "0.9375rem",
                fontWeight: 600,
                marginBottom: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--text-primary)",
              }}
            >
              <CheckCircle2 size={16} style={{ color: "var(--brand)" }} />
              My Goals
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {MOCK_GOALS.map((g) => {
                const pct = Math.round((g.current / g.target) * 100);
                return (
                  <div key={g.id}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.375rem",
                      }}
                    >
                      <span style={{ fontSize: "0.8125rem", fontWeight: 500 }}>
                        {g.title}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        {pct}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: "0.375rem",
                        borderRadius: "9999px",
                        backgroundColor: "var(--surface-alt)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${pct}%`,
                          height: "100%",
                          backgroundColor: "var(--brand)",
                          borderRadius: "9999px",
                        }}
                      />
                    </div>
                    <p style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                      {formatKES(g.current)} / {formatKES(g.target)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card">
            <h2
              style={{
                fontSize: "0.9375rem",
                fontWeight: 600,
                marginBottom: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--text-primary)",
              }}
            >
              <RefreshCw size={16} style={{ color: "var(--info)" }} />
              Recent Transactions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {MOCK_TRANSACTIONS.slice(0, 4).map((t) => (
                <div
                  key={t.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.75rem",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t.description}
                    </p>
                    <p style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>
                      {t.chamaName} · {relativeDate(t.date)}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      color: t.type === "credit" ? "var(--brand)" : "var(--danger)",
                      flexShrink: 0,
                    }}
                  >
                    {t.type === "credit" ? "+" : "-"}
                    {formatKES(t.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}