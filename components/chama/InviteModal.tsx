"use client";

import { useEffect, useState } from "react";
import { X, Copy, Check, QrCode, Link2 } from "lucide-react";
import { generateInviteLink, generateQRCode } from "@/lib/utils";
import { MOCK_USER } from "@/lib/mockData";

interface InviteModalProps {
  chamaId: string;
  chamaName: string;
  onClose: () => void;
}

export default function InviteModal({
  chamaId,
  chamaName,
  onClose,
}: InviteModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const inviteLink = generateInviteLink(chamaId, MOCK_USER.id);

  useEffect(() => {
    generateQRCode(inviteLink).then(setQrDataUrl);
  }, [inviteLink]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "1.5rem",
          width: "100%",
          maxWidth: "26rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          boxShadow: "var(--shadow-md)",
        }}
        className="animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <QrCode size={18} style={{ color: "var(--brand)" }} />
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              Invite to {chamaName}
            </h2>
          </div>
          <button
            className="btn btn-ghost btn-sm"
            onClick={onClose}
            style={{ padding: "0.25rem" }}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt={`QR code to join ${chamaName}`}
              style={{
                width: "14rem",
                height: "14rem",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
              }}
            />
          ) : (
            <div
              style={{
                width: "14rem",
                height: "14rem",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "var(--surface-alt)",
              }}
            >
              <span
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "50%",
                  border: "3px solid var(--brand)",
                  borderTopColor: "transparent",
                }}
                className="animate-spin"
              />
            </div>
          )}
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>
            Scan this QR code to join the chama
          </p>
        </div>

        <div>
          <p
            style={{
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: "var(--text-secondary)",
              marginBottom: "0.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
            }}
          >
            <Link2 size={13} />
            Or share this link
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <input
              readOnly
              value={inviteLink}
              className="input-base"
              style={{
                flex: 1,
                fontSize: "0.75rem",
                color: "var(--text-muted)",
              }}
              onFocus={(e) => e.target.select()}
            />
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={copyLink}
              style={{ flexShrink: 0 }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>
          Your member ID is embedded in the link — the chama admin will see who referred them.
        </p>
      </div>
    </div>
  );
}