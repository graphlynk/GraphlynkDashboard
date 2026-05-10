import { useState } from 'react';
import { Check, CreditCard, Lock, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { GlassPanel, SectionHeader, PrimaryCTA, Field, TextInput } from './glass';

const FEATURES = [
  'Verified Schema.org JSON-LD generation',
  'Auto-published public profile page',
  'Knowledge Graph submission to Google & Bing',
  'AI engine entity registration (ChatGPT, Perplexity, Gemini)',
  'sameAs link verification across 30+ profiles',
  '12 months of monitoring & re-submissions',
];

export function CheckoutStep({ onPaid }: { onPaid: () => void }) {
  const [processing, setProcessing] = useState(false);
  const [card, setCard] = useState({ number: '', name: '', exp: '', cvc: '' });

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => onPaid(), 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-[1.1fr_1fr] gap-8">
      {/* Plan summary */}
      <GlassPanel className="p-8">
        <SectionHeader icon={<Sparkles size={14} />}>Knowledge Panel Service</SectionHeader>
        <h1 className="text-3xl text-white mb-2">Knowledge Panel — Lifetime Setup</h1>
        <p className="text-white/60 mb-8">
          One-time fee. We generate your verified Schema.org entity, publish your public profile,
          and submit it to every major search and AI engine.
        </p>

        <div className="flex items-baseline gap-3 mb-8">
          <span className="text-5xl text-white">$499</span>
          <span className="text-white/50 line-through">$799</span>
          <span className="px-2 py-1 rounded-md text-xs bg-[#6EE7F5]/10 text-[#6EE7F5] border border-[#6EE7F5]/30">
            Launch pricing
          </span>
        </div>

        <ul className="space-y-3 mb-8">
          {FEATURES.map((f) => (
            <li key={f} className="flex items-start gap-3 text-white/80">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-[#6EE7F5]/15 border border-[#6EE7F5]/40 flex items-center justify-center flex-shrink-0">
                <Check size={12} className="text-[#6EE7F5]" />
              </span>
              <span className="text-sm">{f}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 text-xs text-white/50 border-t border-white/5 pt-5">
          <ShieldCheck size={14} className="text-[#6EE7F5]" />
          30-day money-back guarantee · SSL secured · No recurring charges
        </div>
      </GlassPanel>

      {/* Payment form */}
      <GlassPanel className="p-8">
        <SectionHeader icon={<CreditCard size={14} />}>Payment</SectionHeader>
        <h2 className="text-xl text-white mb-6">Complete your purchase</h2>

        <form onSubmit={handlePay} className="space-y-5">
          <Field label="Card number">
            <TextInput
              required
              placeholder="1234 5678 9012 3456"
              value={card.number}
              onChange={(e) => setCard({ ...card, number: e.target.value })}
            />
          </Field>
          <Field label="Cardholder name">
            <TextInput
              required
              placeholder="Name on card"
              value={card.name}
              onChange={(e) => setCard({ ...card, name: e.target.value })}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Expiry">
              <TextInput
                required
                placeholder="MM / YY"
                value={card.exp}
                onChange={(e) => setCard({ ...card, exp: e.target.value })}
              />
            </Field>
            <Field label="CVC">
              <TextInput
                required
                placeholder="•••"
                value={card.cvc}
                onChange={(e) => setCard({ ...card, cvc: e.target.value })}
              />
            </Field>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-5">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <Lock size={12} /> Encrypted payment
            </div>
            <span className="text-white text-lg">Total: $499.00</span>
          </div>

          <PrimaryCTA type="submit" disabled={processing} className="w-full">
            {processing ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Zap size={16} />
                Pay $499 & Start Setup
              </>
            )}
          </PrimaryCTA>
        </form>
      </GlassPanel>
    </div>
  );
}
