"use client";

import type { BasicInfoForm } from "@/types";
import FormField from "@/components/ui/FormField";

interface Props {
  data: BasicInfoForm;
  onChange: (data: BasicInfoForm) => void;
  onNext: () => void;
  onCancel: () => void;
}

export default function StepBasicInfo({ data, onChange, onNext, onCancel }: Props) {
  const isValid = data.name.trim().length >= 2 && data.description.trim().length >= 5;

  const handle = (field: keyof BasicInfoForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => onChange({ ...data, [field]: e.target.value });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <FormField
        label="Group Name"
        required
        value={data.name}
        onChange={handle("name")}
        placeholder="e.g. Umoja Savings Circle"
        hint="Give your chama a clear, descriptive name"
        maxLength={80}
      />
      <FormField
        as="textarea"
        label="Description"
        required
        value={data.description}
        onChange={handle("description") as React.ChangeEventHandler<HTMLTextAreaElement>}
        placeholder="Describe the purpose and goals of your chama"
        hint="Describe the purpose and goals of your chama"
        rows={4}
      />

      <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
        <button
          type="button"
          className="btn btn-secondary btn-lg"
          style={{ flex: 1 }}
          onClick={onCancel}
        >
          Cancel
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