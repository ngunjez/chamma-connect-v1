"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import StepIndicator from "@/components/ui/StepIndicator";
import StepBasicInfo from "@/components/chama/StepBasicInfo";
import StepGroupSettings from "@/components/chama/StepGroupSettings";
import StepPayments from "@/components/chama/StepPayments";
import StepCommunication from "@/components/chama/StepCommunication";
import StepMembers from "@/components/chama/StepMembers";
import type { CreateChamaState } from "@/types";

const STEPS = [
  { label: "Basic Info", sublabel: "Group name and description" },
  { label: "Group Settings", sublabel: "Type and contribution" },
  { label: "Payments", sublabel: "Set up collection point" },
  { label: "Communication", sublabel: "Add social links" },
  { label: "Members", sublabel: "Add group members" },
];

const INITIAL_STATE: CreateChamaState = {
  step: 1,
  basicInfo: { name: "", description: "" },
  groupSettings: { groupType: "saving", minimumContribution: 1000, meetingDay: "", meetingTime: "" },
  payment: { method: "platform", destinationPaybill: "", accountNumber: "", consumerKey: "", consumerSecret: "", shortcode: "", passkey: "" },
  communication: { communicationLink: "", documentTitle: "", documentType: "", documentContent: "", documentFile: null },
  members: [],
};

export default function CreateChamaPage() {
  const router = useRouter();
  const [state, setState] = useState<CreateChamaState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);

  const setStep = (step: number) => setState((s) => ({ ...s, step }));

  const handleSubmit = async () => {
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    router.push("/chamas");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "52rem", margin: "0 auto" }}>
      {/* Back link */}
      <Link
        href="/chamas"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.375rem",
          fontSize: "0.875rem",
          color: "var(--text-secondary)",
          textDecoration: "none",
        }}
      >
        <ArrowLeft size={14} />
        Back to Chamas
      </Link>

      {/* Page title */}
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, fontFamily: "var(--font-sora)", color: "var(--text-primary)" }}>
          Create New Chama
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
          Complete all steps to set up your savings group
        </p>
      </div>

      {/* Stepper */}
      <StepIndicator steps={STEPS} currentStep={state.step} />

      {/* Form card */}
      <div className="card" style={{ padding: "1.5rem" }}>
        {state.step === 1 && (
          <StepBasicInfo
            data={state.basicInfo}
            onChange={(d) => setState((s) => ({ ...s, basicInfo: d }))}
            onNext={() => setStep(2)}
            onCancel={() => router.push("/chamas")}
          />
        )}
        {state.step === 2 && (
          <StepGroupSettings
            data={state.groupSettings}
            onChange={(d) => setState((s) => ({ ...s, groupSettings: d }))}
            onNext={() => setStep(3)}
            onPrev={() => setStep(1)}
          />
        )}
        {state.step === 3 && (
          <StepPayments
            data={state.payment}
            onChange={(d) => setState((s) => ({ ...s, payment: d }))}
            onNext={() => setStep(4)}
            onPrev={() => setStep(2)}
          />
        )}
        {state.step === 4 && (
          <StepCommunication
            data={state.communication}
            onChange={(d) => setState((s) => ({ ...s, communication: d }))}
            onNext={() => setStep(5)}
            onPrev={() => setStep(3)}
          />
        )}
        {state.step === 5 && (
          <StepMembers
            members={state.members}
            onChange={(m) => setState((s) => ({ ...s, members: m }))}
            onSubmit={handleSubmit}
            onPrev={() => setStep(4)}
            submitting={submitting}
          />
        )}
      </div>
    </div>
  );
}