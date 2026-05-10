import { CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';
import { GlassPanel, SectionHeader, PrimaryCTA, GhostButton } from './glass';

export function SuccessStep({
  onViewProfile,
  onBackToDashboard,
}: {
  onViewProfile: () => void;
  onBackToDashboard: () => void;
}) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <GlassPanel className="p-10 text-center">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0b3d84] to-[#6EE7F5] flex items-center justify-center shadow-[0_0_40px_rgba(110,231,245,0.5)] mb-6">
          <CheckCircle2 size={32} className="text-white" />
        </div>

        <SectionHeader icon={<Sparkles size={14} />}>Profile Published</SectionHeader>
        <h1 className="text-3xl text-white mb-3">Your knowledge panel is live.</h1>
        <p className="text-white/60 mb-8 max-w-lg mx-auto">
          Your public profile has been generated with verified Schema.org JSON-LD and submitted to Google,
          Bing, and AI answer engines. Indexing typically completes within 24–72 hours.
        </p>

        <div className="grid sm:grid-cols-3 gap-3 mb-10 text-left">
          <StatusPill label="Profile published" status="done" />
          <StatusPill label="Schema validated" status="done" />
          <StatusPill label="Engines notified" status="processing" />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <PrimaryCTA onClick={onViewProfile}>
            View Public Profile <ExternalLink size={16} />
          </PrimaryCTA>
          <GhostButton onClick={onBackToDashboard}>Back to dashboard</GhostButton>
        </div>
      </GlassPanel>
    </div>
  );
}

function StatusPill({ label, status }: { label: string; status: 'done' | 'processing' }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 flex items-center gap-2">
      <span
        className={`w-2 h-2 rounded-full ${
          status === 'done'
            ? 'bg-[#6EE7F5] shadow-[0_0_8px_#6EE7F5]'
            : 'bg-amber-400 animate-pulse'
        }`}
      />
      <span className="text-xs text-white/80">{label}</span>
    </div>
  );
}
