"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, CheckCircle2 } from "lucide-react";
import type { PaymentForm } from "@/types";
import FormField from "@/components/ui/FormField";

interface Props {
  data: PaymentForm;
  onChange: (data: PaymentForm) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function StepPayments({ data, onChange, onNext, onPrev }: Props) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const set = (field: keyof PaymentForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange({ ...data, [field]: e.target.value });

  const selectMethod = (method: "platform" | "direct") => {
    setShowAdvanced(false);
    onChange({ ...data, method });
  };

  const isValid =
    data.method === "platform"
      ? data.destinationPaybill.trim().length >= 5
      : data.shortcode.trim().length >= 5;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        <MethodCard
          icon="🏦"
          title="Platform (Recommended)"
          description="ChamaConnect collects on your behalf. Zero setup needed."
          selected={data.method === "platform"}
          onClick={() => selectMethod("platform")}
        />
        <MethodCard
          icon="📱"
          title="Your Own Paybill"
          description="Payments go directly into your group's M-Pesa Paybill."
          selected={data.method === "direct"}
          onClick={() => selectMethod("direct")}
        />
      </div>

      {data.method === "platform" && (
        <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "var(--brand-subtle)",
              border: "1px solid rgb(34 197 94 / 0.2)",
              fontSize: "0.8125rem",
              color: "var(--brand)",
              display: "flex",
              gap: "0.5rem",
              alignItems: "flex-start",
            }}
          >
            <CheckCircle2 size={15} style={{ flexShrink: 0, marginTop: "0.1rem" }} />
            Members pay via M-Pesa STK Push. Funds are held securely on the platform and disbursed to your group on schedule.
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <FormField
              label="Your Paybill Number"
              placeholder="e.g. 174379"
              value={data.destinationPaybill}
              onChange={set("destinationPaybill")}
              hint="Funds will be routed here after collection."
            />
            <FormField
              label="Account Reference (Optional)"
              placeholder="e.g. CHAMA001"
              value={data.accountNumber}
              onChange={set("accountNumber")}
              hint="Shows on members' M-Pesa confirmation SMS."
            />
          </div>
        </div>
      )}

      {data.method === "direct" && (
        <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "var(--info-subtle)",
              border: "1px solid rgb(59 130 246 / 0.2)",
              fontSize: "0.8125rem",
              color: "var(--info)",
              display: "flex",
              gap: "0.5rem",
              alignItems: "flex-start",
            }}
          >
            <span style={{ flexShrink: 0 }}>ℹ️</span>
            Members will pay directly into your group&apos;s Paybill via M-Pesa STK Push. Enter your Paybill number below — that&apos;s all you need to get started.
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <FormField
              label="Your Paybill Number"
              required
              placeholder="e.g. 602426"
              value={data.shortcode}
              onChange={set("shortcode")}
              hint="Your M-Pesa Paybill or Till number."
            />
            <FormField
              label="Account Reference (Optional)"
              placeholder="e.g. CHAMA001"
              value={data.accountNumber}
              onChange={set("accountNumber")}
              hint="Shows on members' M-Pesa confirmation SMS."
            />
          </div>

          <div
            style={{
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}
          >
            <button
              type="button"
              onClick={() => setShowAdvanced((v) => !v)}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "var(--surface-alt)",
                border: "none",
                cursor: "pointer",
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "var(--text-secondary)",
              }}
            >
              <span>Advanced: Connect via Daraja API (optional)</span>
              {showAdvanced ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>

            {showAdvanced && (
              <div
                className="animate-fade-in"
                style={{
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.875rem",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                  Optionally connect your Safaricom Daraja app to enable automated STK Push directly from your Paybill.{" "}
                  <a
                    href="https://developer.safaricom.co.ke/MyApps"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--brand)", display: "inline-flex", alignItems: "center", gap: "0.2rem", textDecoration: "none" }}
                  >
                    Get credentials <ExternalLink size={11} />
                  </a>
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <FormField
                    label="Consumer Key"
                    placeholder="From Daraja portal"
                    value={data.consumerKey}
                    onChange={set("consumerKey")}
                    type="password"
                  />
                  <FormField
                    label="Consumer Secret"
                    placeholder="From Daraja portal"
                    value={data.consumerSecret}
                    onChange={set("consumerSecret")}
                    type="password"
                  />
                </div>
                <FormField
                  label="Passkey"
                  placeholder="STK Push passkey from Daraja"
                  value={data.passkey}
                  onChange={set("passkey")}
                  type="password"
                />
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
        <button type="button" className="btn btn-secondary btn-lg" style={{ flex: 1 }} onClick={onPrev}>
          Previous
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{ flex: 1 }}
          disabled={!isValid}
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

interface MethodCardProps {
  icon: string;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

function MethodCard({ icon, title, description, selected, onClick }: MethodCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "1rem",
        borderRadius: "var(--radius-sm)",
        border: `2px solid ${selected ? "var(--brand)" : "var(--border)"}`,
        backgroundColor: selected ? "var(--brand-subtle)" : "var(--surface-alt)",
        textAlign: "left",
        cursor: "pointer",
        transition: "all 0.15s ease",
        display: "flex",
        flexDirection: "column",
        gap: "0.375rem",
      }}
      aria-pressed={selected}
    >
      <span style={{ fontSize: "1.25rem" }}>{icon}</span>
      <span style={{ fontSize: "0.875rem", fontWeight: 600, color: selected ? "var(--brand)" : "var(--text-primary)" }}>
        {title}
      </span>
      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
        {description}
      </span>
    </button>
  );
}