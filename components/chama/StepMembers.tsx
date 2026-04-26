"use client";

import { useState } from "react";
import { UserPlus, Trash2 } from "lucide-react";
import type { MemberForm, MemberRole } from "@/types";
import FormField from "@/components/ui/FormField";

const ROLE_OPTIONS = [
  { value: "member", label: "Member" },
  { value: "admin", label: "Admin" },
  { value: "treasurer", label: "Treasurer" },
  { value: "secretary", label: "Secretary" },
];

const EMPTY_MEMBER: MemberForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  role: "member",
};

interface Props {
  members: MemberForm[];
  onChange: (members: MemberForm[]) => void;
  onSubmit: () => void;
  onPrev: () => void;
  submitting: boolean;
}

export default function StepMembers({
  members,
  onChange,
  onSubmit,
  onPrev,
  submitting,
}: Props) {
  const [draft, setDraft] = useState<MemberForm>(EMPTY_MEMBER);
  const [errors, setErrors] = useState<Partial<MemberForm>>({});

  const validate = (): boolean => {
    const e: Partial<MemberForm> = {};
    if (!draft.firstName.trim()) e.firstName = "Required";
    if (!draft.lastName.trim()) e.lastName = "Required";
    if (!draft.phone.trim()) e.phone = "Required";
    if (!draft.email.trim()) e.email = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const addMember = () => {
    if (!validate()) return;
    onChange([...members, draft]);
    setDraft(EMPTY_MEMBER);
    setErrors({});
  };

  const removeMember = (idx: number) => {
    onChange(members.filter((_, i) => i !== idx));
  };

  const updateDraft =
    (field: keyof MemberForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setDraft((d) => ({ ...d, [field]: e.target.value }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div
        className="alert-brand"
        style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}
      >
        <span>👥</span>
        <span>Add all members who will be part of this chama.</span>
      </div>

      {members.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {members.map((m, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.625rem 0.875rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
                backgroundColor: "var(--surface-alt)",
              }}
            >
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
                  flexShrink: 0,
                }}
              >
                {m.firstName[0]}{m.lastName[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-primary)" }}>
                  {m.firstName} {m.lastName}
                </p>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  {m.phone} · {m.role}
                </p>
              </div>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => removeMember(idx)}
                style={{ padding: "0.25rem", color: "var(--danger)" }}
                aria-label="Remove member"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.875rem",
          padding: "1rem",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--border)",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <FormField
            label="First Name"
            placeholder="John"
            value={draft.firstName}
            onChange={updateDraft("firstName")}
            error={errors.firstName}
          />
          <FormField
            label="Last Name"
            placeholder="Doe"
            value={draft.lastName}
            onChange={updateDraft("lastName")}
            error={errors.lastName}
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <FormField
            label="Phone Number"
            placeholder="+254712345678"
            value={draft.phone}
            onChange={updateDraft("phone")}
            type="tel"
            error={errors.phone}
          />
          <FormField
            label="Email"
            placeholder="john@example.com"
            value={draft.email}
            onChange={updateDraft("email")}
            type="email"
            error={errors.email}
          />
        </div>
        <FormField
          as="select"
          label="Role"
          value={draft.role}
          onChange={updateDraft("role") as React.ChangeEventHandler<HTMLSelectElement>}
          options={ROLE_OPTIONS}
        />
        <button
          type="button"
          className="btn btn-secondary"
          style={{ width: "100%" }}
          onClick={addMember}
        >
          <UserPlus size={15} />
          Add Member
        </button>
      </div>

      <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
        <button
          type="button"
          className="btn btn-secondary btn-lg"
          style={{ flex: 1 }}
          onClick={onPrev}
          disabled={submitting}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{ flex: 1 }}
          onClick={onSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  width: "1rem",
                  height: "1rem",
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "#fff",
                }}
                className="animate-spin"
              />
              Creating…
            </span>
          ) : (
            "Create Chama"
          )}
        </button>
      </div>
    </div>
  );
}