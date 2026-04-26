"use client";

import type { GroupSettingsForm } from "@/types";
import FormField from "@/components/ui/FormField";

const GROUP_TYPE_OPTIONS = [
  { value: "saving", label: "Saving" },
  { value: "welfare", label: "Welfare" },
  { value: "investment", label: "Investment" },
  { value: "merry-go-round", label: "Merry-Go-Round" },
];

const DAY_OPTIONS = [
  { value: "", label: "Select Day (Optional)" },
  ...["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(
    (d) => ({ value: d, label: d })
  ),
];

interface Props {
  data: GroupSettingsForm;
  onChange: (data: GroupSettingsForm) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function StepGroupSettings({ data, onChange, onNext, onPrev }: Props) {
  const isValid = data.groupType && data.minimumContribution > 0;

  const handle =
    (field: keyof GroupSettingsForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const val =
        field === "minimumContribution" ? Number(e.target.value) : e.target.value;
      onChange({ ...data, [field]: val });
    };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <FormField
        as="select"
        label="Group Type"
        required
        value={data.groupType}
        onChange={handle("groupType") as React.ChangeEventHandler<HTMLSelectElement>}
        hint="Choose the structure that best fits your group"
        options={GROUP_TYPE_OPTIONS}
      />

      <FormField
        label="Minimum Contribution (KES)"
        required
        type="number"
        min={1}
        value={data.minimumContribution}
        onChange={handle("minimumContribution")}
        hint="Set the minimum amount members must contribute"
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        <FormField
          as="select"
          label="Meeting Day"
          value={data.meetingDay}
          onChange={handle("meetingDay") as React.ChangeEventHandler<HTMLSelectElement>}
          hint="Day of the week the group meets"
          options={DAY_OPTIONS}
        />
        <FormField
          label="Meeting Time"
          type="time"
          value={data.meetingTime}
          onChange={handle("meetingTime")}
          hint="Time the group meets"
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
          disabled={!isValid}
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}