import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

interface BaseProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  rightLabel?: React.ReactNode;
}

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & { as?: "input" };

type SelectProps = BaseProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    as: "select";
    options: { value: string; label: string }[];
  };

type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" };

type FormFieldProps = InputProps | SelectProps | TextareaProps;

export default function FormField(props: FormFieldProps) {
  const { label, hint, error, required, rightLabel, as = "input", ...rest } = props;

  const id = `field-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <label
          htmlFor={id}
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "var(--text-primary)",
          }}
        >
          {label}
          {required && (
            <span style={{ color: "var(--danger)", marginLeft: "0.125rem" }}>
              *
            </span>
          )}
        </label>
        {rightLabel && (
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            {rightLabel}
          </span>
        )}
      </div>

      {as === "select" && "options" in props ? (
        <select
          id={id}
          className="input-base"
          {...(rest as SelectHTMLAttributes<HTMLSelectElement>)}
          style={{ ...(rest.style ?? {}) }}
        >
          {props.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : as === "textarea" ? (
        <textarea
          id={id}
          className="input-base"
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          className="input-base"
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          style={{
            borderColor: error ? "var(--danger)" : undefined,
            ...(rest.style ?? {}),
          }}
        />
      )}

      {hint && !error && (
        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{hint}</p>
      )}
      {error && (
        <p style={{ fontSize: "0.75rem", color: "var(--danger)" }}>{error}</p>
      )}
    </div>
  );
}