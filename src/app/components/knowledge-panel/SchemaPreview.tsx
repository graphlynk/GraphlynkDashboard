import { Code2, ShieldCheck } from 'lucide-react';
import { GlassPanel, SectionHeader } from './glass';
import { IntakeData } from './types';
import { buildSchema, schemaCompleteness } from './buildSchema';

export function SchemaPreview({ data }: { data: IntakeData }) {
  const schema = buildSchema(data);
  const completeness = schemaCompleteness(data);
  const json = JSON.stringify(schema, null, 2);

  return (
    <GlassPanel className="p-6 sticky top-6">
      <SectionHeader icon={<Code2 size={14} />}>Live Schema.org JSON-LD</SectionHeader>

      {/* Completeness ring */}
      <div className="flex items-center gap-4 mb-5">
        <div className="relative w-14 h-14">
          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="url(#grad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${completeness} 100`}
              pathLength={100}
              style={{ filter: 'drop-shadow(0 0 6px rgba(110,231,245,0.6))' }}
            />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0b3d84" />
                <stop offset="100%" stopColor="#6EE7F5" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs text-white">
            {completeness}%
          </span>
        </div>
        <div>
          <div className="text-sm text-white">Panel Readiness</div>
          <div className="text-xs text-white/50 flex items-center gap-1.5 mt-0.5">
            <ShieldCheck size={12} className="text-[#6EE7F5]" />
            Updates as you type
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-[#0B0D10] border border-white/5 p-4 max-h-[480px] overflow-auto">
        <pre className="text-[12px] leading-relaxed text-white/80 whitespace-pre-wrap break-words font-mono">
          <code dangerouslySetInnerHTML={{ __html: highlight(json) }} />
        </pre>
      </div>

      <p className="text-[11px] text-white/40 mt-3">
        This snippet will be injected into your public profile's <span className="text-[#6EE7F5]">&lt;head&gt;</span> on publish.
      </p>
    </GlassPanel>
  );
}

function highlight(json: string) {
  const escaped = json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped
    .replace(/("(?:\\.|[^"\\])*")(\s*:)/g, '<span style="color:#6EE7F5">$1</span>$2')
    .replace(/:\s*("(?:\\.|[^"\\])*")/g, ': <span style="color:#fff">$1</span>')
    .replace(/\b(true|false|null)\b/g, '<span style="color:#a78bfa">$1</span>')
    .replace(/(-?\d+\.?\d*)/g, '<span style="color:#fbbf24">$1</span>');
}
