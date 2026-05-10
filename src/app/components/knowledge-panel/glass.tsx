import { ReactNode } from 'react';

export function GlassPanel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-[#6EE7F5]/20 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_30px_rgba(110,231,245,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeader({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 uppercase tracking-[0.18em] text-[11px] text-[#6EE7F5]/90 mb-4">
      <span className="text-[#6EE7F5]">{icon}</span>
      <span className="text-white/70">{children}</span>
    </div>
  );
}

export function PrimaryCTA({
  children,
  onClick,
  type = 'button',
  disabled,
  className = '',
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-white bg-gradient-to-r from-[#0b3d84] to-[#6EE7F5] shadow-[0_0_30px_rgba(110,231,245,0.4)] hover:shadow-[0_0_45px_rgba(110,231,245,0.7)] transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-white/80 border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-[#6EE7F5]/30 transition-all disabled:opacity-40"
    >
      {children}
    </button>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-white/60 mb-2">{label}</span>
      {children}
      {hint && <span className="block mt-1.5 text-[11px] text-white/40">{hint}</span>}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl bg-[#16181D] border border-white/5 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-[#6EE7F5]/50 focus:ring-2 focus:ring-[#6EE7F5]/30 transition-all ${props.className ?? ''}`}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-xl bg-[#16181D] border border-white/5 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-[#6EE7F5]/50 focus:ring-2 focus:ring-[#6EE7F5]/30 transition-all resize-none ${props.className ?? ''}`}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-xl bg-[#16181D] border border-white/5 px-4 py-3 text-white outline-none focus:border-[#6EE7F5]/50 focus:ring-2 focus:ring-[#6EE7F5]/30 transition-all ${props.className ?? ''}`}
    />
  );
}
