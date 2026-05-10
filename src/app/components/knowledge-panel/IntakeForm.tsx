import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { IntakeData } from './types';
import { EntityTypeStep } from './EntityTypeStep';
import { IntakeAccordion } from './IntakeAccordion';

export function IntakeForm({
  data,
  setData,
  onComplete,
}: {
  data: IntakeData;
  setData: (d: IntakeData) => void;
  onComplete: () => void;
}) {
  const [step, setStep] = useState<1 | 2>(1);

  if (step === 1) {
    return (
      <EntityTypeStep
        data={data}
        setData={setData}
        onBack={() => {
          /* parent handles exit */
        }}
        onContinue={() => setStep(2)}
      />
    );
  }

  return (
    <IntakeAccordion
      data={data}
      setData={setData}
      onSave={() => toast.success('Progress saved')}
      onPublish={onComplete}
    />
  );
}
