"use client";

import type { CommunicationForm, DocumentType } from "@/types";
import FormField from "@/components/ui/FormField";
import FileUpload from "@/components/ui/FileUpload";

const DOC_TYPE_OPTIONS = [
  { value: "", label: "Select Type (optional)" },
  { value: "constitution", label: "Constitution" },
  { value: "minutes", label: "Minutes" },
  { value: "policy", label: "Policy" },
  { value: "other", label: "Other" },
];

interface Props {
  data: CommunicationForm;
  onChange: (data: CommunicationForm) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function StepCommunication({ data, onChange, onNext, onPrev }: Props) {
  const set =
    (field: keyof CommunicationForm) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      onChange({ ...data, [field]: e.target.value });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <FormField
        label="Communication Link"
        placeholder="https://chat.whatsapp.com/... or Telegram link"
        value={data.communicationLink}
        onChange={set("communicationLink")}
        type="url"
        hint="Share your WhatsApp or Telegram group link (optional)"
      />

      <div
        className="alert-info"
        style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}
      >
        <span>💡</span>
        <span>You can add or update the communication link later when your group is created.</span>
      </div>

      <div
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3
            style={{
              fontSize: "0.9375rem",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            Upload a group document (optional)
          </h3>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            You can do this now or later from group settings.
          </span>
        </div>

        <FormField
          label="Document Title"
          placeholder="e.g. Constitution"
          value={data.documentTitle}
          onChange={set("documentTitle")}
        />

        <FormField
          as="select"
          label="Document Type"
          value={data.documentType}
          onChange={set("documentType") as React.ChangeEventHandler<HTMLSelectElement>}
          options={DOC_TYPE_OPTIONS}
        />

        <FormField
          as="textarea"
          label="Document Content"
          placeholder="Paste the document content or a short summary"
          value={data.documentContent}
          onChange={set("documentContent") as React.ChangeEventHandler<HTMLTextAreaElement>}
          hint="Leave empty if you're attaching a file."
          rows={4}
        />

        <FileUpload
          label="Attach File (optional)"
          hint="PDF, DOC, DOCX up to 10MB"
          accept=".pdf,.doc,.docx"
          value={data.documentFile}
          onChange={(file) => onChange({ ...data, documentFile: file })}
        />
      </div>

      <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
        <button type="button" className="btn btn-secondary btn-lg" style={{ flex: 1 }} onClick={onPrev}>
          Previous
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{ flex: 1 }}
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}