import { useState } from 'react';
import { CheckoutStep } from './CheckoutStep';
import { IntakeForm } from './IntakeForm';
import { SuccessStep } from './SuccessStep';
import { emptyIntake, FlowStage, IntakeData } from './types';

export function KnowledgePanelFlow({
  onViewProfile,
  onExit,
}: {
  onViewProfile: () => void;
  onExit: () => void;
}) {
  const [stage, setStage] = useState<FlowStage>('checkout');
  const [data, setData] = useState<IntakeData>(emptyIntake);

  return (
    <div className="min-h-full bg-[#0B0D10] relative">
      {/* Ambient background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-[#0b3d84]/25 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-10 right-1/4 w-[480px] h-[480px] bg-[#6EE7F5]/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1.5s' }}
        />
      </div>

      <div className="relative z-10">
        {stage === 'checkout' && <CheckoutStep onPaid={() => setStage('intake')} />}
        {stage === 'intake' && (
          <IntakeForm data={data} setData={setData} onComplete={() => setStage('success')} />
        )}
        {stage === 'success' && (
          <SuccessStep onViewProfile={onViewProfile} onBackToDashboard={onExit} />
        )}
      </div>
    </div>
  );
}
