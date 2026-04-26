"use client";

import { useRef, useState, DragEvent, ChangeEvent } from "react";
import { Upload, File, X } from "lucide-react";

interface FileUploadProps {
  label?: string;
  hint?: string;
  accept?: string;
  value: File | null;
  onChange: (file: File | null) => void;
}

export default function FileUpload({
  label = "Attach File",
  hint = "PDF, DOC, DOCX up to 10MB",
  accept = ".pdf,.doc,.docx",
  value,
  onChange,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange(file);
    e.target.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    if (file) onChange(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
      {label && (
        <label
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "var(--text-primary)",
          }}
        >
          {label}
        </label>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        style={{ display: "none" }}
        aria-hidden="true"
      />

      {value ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem 1rem",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--brand)",
            backgroundColor: "var(--brand-subtle)",
          }}
        >
          <File size={18} style={{ color: "var(--brand)", flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--text-primary)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {value.name}
            </p>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              {(value.size / 1024).toFixed(1)} KB
            </p>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={handleRemove}
            aria-label="Remove file"
            style={{ padding: "0.25rem", color: "var(--danger)" }}
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={(e) => e.key === "Enter" && handleClick()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`file-upload-zone${dragging ? " dragover" : ""}`}
          aria-label="Upload file"
          style={{ cursor: "pointer" }}
        >
          <Upload
            size={24}
            style={{
              color: dragging ? "var(--brand)" : "var(--text-muted)",
              margin: "0 auto 0.5rem",
              display: "block",
              transition: "color 0.2s",
            }}
          />
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
              marginBottom: "0.25rem",
            }}
          >
            <span style={{ color: "var(--brand)", fontWeight: 600 }}>
              Click to upload
            </span>{" "}
            or drag and drop
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            {hint}
          </p>
        </div>
      )}
    </div>
  );
}