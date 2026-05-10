import { useMemo, useState } from 'react';
import { Check, Code2, Copy, Info } from 'lucide-react';

type Props = {
  schema?: Record<string, unknown> | unknown[];
  json?: string;
  maxHeight?: number;
  className?: string;
};

export function LiveSchemaPreview({ schema, json, maxHeight = 480, className = '' }: Props) {
  const source = useMemo(() => {
    if (typeof json === 'string') return json;
    return JSON.stringify(schema ?? {}, null, 2);
  }, [schema, json]);

  const lines = source.split('\n');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* noop */
    }
  };

  return (
    <div
      className={`rounded-2xl border border-[#6EE7F5]/25 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_30px_rgba(110,231,245,0.12)] overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between gap-2 px-5 py-3.5 border-b border-[#6EE7F5]/20 bg-gradient-to-r from-[#6EE7F5]/[0.06] to-transparent">
        <div className="flex items-center gap-2 uppercase tracking-[0.18em] text-[11px] text-[#6EE7F5]">
          <Code2 size={14} />
          <span className="text-white/80">Schema Markup Preview</span>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-white/40">JSON-LD</span>
      </div>

      <div
        className="grid grid-cols-[auto_1fr] bg-[#0B0D10] overflow-auto"
        style={{ maxHeight }}
      >
        <div
          aria-hidden
          className="select-none text-right pr-3 pl-4 py-4 border-r border-white/5 text-[12px] leading-[1.65] font-mono text-white/25"
        >
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        <pre className="py-4 px-4 text-[12px] leading-[1.65] font-mono text-white/85 whitespace-pre">
          <code dangerouslySetInnerHTML={{ __html: highlight(source) }} />
        </pre>
      </div>

      <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-t border-white/5 bg-white/[0.02]">
        <StatusPill
          tone="success"
          icon={<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />}
        >
          Schema valid
        </StatusPill>
        <StatusPill tone="info" icon={<Info size={11} className="text-[#6EE7F5]" />}>
          Validated against Schema.org
        </StatusPill>

        <button
          onClick={handleCopy}
          className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:border-[#6EE7F5]/40 hover:bg-[#6EE7F5]/[0.06] transition-all text-[11px]"
        >
          {copied ? (
            <>
              <Check size={12} className="text-[#6EE7F5]" /> Copied
            </>
          ) : (
            <>
              <Copy size={12} /> Copy JSON-LD
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function StatusPill({
  children,
  icon,
  tone,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  tone: 'success' | 'info';
}) {
  const toneCls =
    tone === 'success'
      ? 'border-emerald-400/30 bg-emerald-400/[0.06] text-emerald-200'
      : 'border-[#6EE7F5]/30 bg-[#6EE7F5]/[0.06] text-[#6EE7F5]';
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] ${toneCls}`}
    >
      {icon}
      {children}
    </span>
  );
}

function highlight(src: string): string {
  const escaped = src.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const tokens: string[] = [];
  const placeholder = (i: number) => ` ${i} `;
  let working = escaped;

  working = working.replace(/\/\*[\s\S]*?\*\//g, (m) => {
    tokens.push(`<span style="color:#6B7280">${m}</span>`);
    return placeholder(tokens.length - 1);
  });
  working = working.replace(/\/\/[^\n]*/g, (m) => {
    tokens.push(`<span style="color:#6B7280">${m}</span>`);
    return placeholder(tokens.length - 1);
  });
  working = working.replace(/("(?:\\.|[^"\\])*")(\s*:)/g, (_m, k, c) => {
    tokens.push(`<span style="color:#6EE7F5">${k}</span>${c}`);
    return placeholder(tokens.length - 1);
  });
  working = working.replace(/"(?:\\.|[^"\\])*"/g, (m) => {
    tokens.push(`<span style="color:#7EE787">${m}</span>`);
    return placeholder(tokens.length - 1);
  });
  working = working.replace(/\b(true|false|null)\b/g, (m) => {
    tokens.push(`<span style="color:#A78BFA">${m}</span>`);
    return placeholder(tokens.length - 1);
  });
  working = working.replace(/-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g, (m) => {
    tokens.push(`<span style="color:#FBBF24">${m}</span>`);
    return placeholder(tokens.length - 1);
  });

  return working.replace(/ (\d+) /g, (_m, i) => tokens[Number(i)]);
}
