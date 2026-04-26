import { Check } from "lucide-react";

interface Step {
  label: string;
  sublabel: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number; // 1-based
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 0,
        width: "100%",
        overflowX: "auto",
        paddingBottom: "0.25rem",
      }}
      role="list"
      aria-label="Form steps"
    >
      {steps.map((step, idx) => {
        const num = idx + 1;
        const done = num < currentStep;
        const active = num === currentStep;

        return (
          <div
            key={step.label}
            style={{ display: "flex", alignItems: "flex-start", flex: 1 }}
            role="listitem"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.375rem",
                minWidth: "4rem",
              }}
            >
              <div
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  border: `2px solid ${done || active ? "var(--brand)" : "var(--border)"}`,
                  backgroundColor: done
                    ? "var(--brand)"
                    : active
                    ? "var(--brand-subtle)"
                    : "var(--surface-alt)",
                  color: done
                    ? "#fff"
                    : active
                    ? "var(--brand)"
                    : "var(--text-muted)",
                  transition: "all 0.25s ease",
                  flexShrink: 0,
                }}
                aria-current={active ? "step" : undefined}
              >
                {done ? <Check size={13} strokeWidth={3} /> : num}
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: active ? 600 : 400,
                    color: active ? "var(--text-primary)" : "var(--text-muted)",
                    lineHeight: 1.3,
                  }}
                >
                  {step.label}
                </div>
                <div
                  style={{
                    fontSize: "0.6875rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.3,
                  }}
                >
                  {step.sublabel}
                </div>
              </div>
            </div>

            {idx < steps.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: "2px",
                  marginTop: "1rem",
                  backgroundColor:
                    num < currentStep ? "var(--brand)" : "var(--border)",
                  borderRadius: "1px",
                  transition: "background-color 0.3s ease",
                  minWidth: "1rem",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}