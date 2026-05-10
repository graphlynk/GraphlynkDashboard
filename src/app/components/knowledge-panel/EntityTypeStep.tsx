import { ArrowLeft, ArrowRight, Book, Building2, Music, Rocket, Star, User } from 'lucide-react';
import { GhostButton, PrimaryCTA } from './glass';
import { EntityCategory, IntakeData } from './types';

type Option = {
  id: EntityCategory;
  title: string;
  description: string;
  icon: typeof User;
  schemaType: IntakeData['entityType'];
};

const OPTIONS: Option[] = [
  {
    id: 'personal-brand',
    title: 'Personal Brand',
    description: 'Coaches, consultants, executives, speakers, professionals',
    icon: User,
    schemaType: 'Person',
  },
  {
    id: 'musician',
    title: 'Musician / Artist',
    description: 'Solo artists, bands, DJs, producers',
    icon: Music,
    schemaType: 'Person',
  },
  {
    id: 'author',
    title: 'Author',
    description: 'Fiction & non-fiction writers',
    icon: Book,
    schemaType: 'Person',
  },
  {
    id: 'founder',
    title: 'Founder / Entrepreneur',
    description: 'Startup founders, business owners',
    icon: Rocket,
    schemaType: 'Person',
  },
  {
    id: 'public-figure',
    title: 'Public Figure',
    description: 'Athletes, politicians, journalists, actors',
    icon: Star,
    schemaType: 'Person',
  },
  {
    id: 'organization',
    title: 'Organization / Local Business',
    description: 'Companies, agencies, nonprofits, local businesses',
    icon: Building2,
    schemaType: 'Organization',
  },
];

export function EntityTypeStep({
  data,
  setData,
  onBack,
  onContinue,
}: {
  data: IntakeData;
  setData: (d: IntakeData) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  const selected = data.entityCategory;

  const select = (opt: Option) => {
    setData({
      ...data,
      entityCategory: opt.id,
      entityType: opt.schemaType,
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-6 py-10 sm:py-16">
      {/* Headline */}
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#6EE7F5]/30 bg-[#6EE7F5]/5 text-[10px] uppercase tracking-[0.18em] text-[#6EE7F5] mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6EE7F5] shadow-[0_0_6px_#6EE7F5]" />
          Step 1 of 6 — Entity Type
        </div>
        <h1 className="text-3xl sm:text-4xl text-white leading-tight mb-3">
          What kind of entity are we building?
        </h1>
        <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base">
          This determines how Google and AI engines understand you.
        </p>
      </div>

      {/* Card grid: 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => select(opt)}
              className={`group relative text-left rounded-2xl border backdrop-blur-xl p-6 sm:p-7 transition-all duration-300 ${
                isSelected
                  ? 'border-[#6EE7F5]/70 bg-[#6EE7F5]/[0.06] scale-[1.02] shadow-[0_0_40px_rgba(110,231,245,0.45)]'
                  : 'border-[#6EE7F5]/15 bg-white/[0.04] hover:border-[#6EE7F5]/50 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(110,231,245,0.3)]'
              }`}
            >
              {/* Selected indicator */}
              {isSelected && (
                <span className="absolute top-4 right-4 w-5 h-5 rounded-full bg-gradient-to-br from-[#0b3d84] to-[#6EE7F5] flex items-center justify-center shadow-[0_0_12px_rgba(110,231,245,0.6)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
              )}

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#0b3d84] to-[#6EE7F5] shadow-[0_0_25px_rgba(110,231,245,0.5)]'
                    : 'bg-[#16181D] border border-[#6EE7F5]/20 group-hover:border-[#6EE7F5]/50'
                }`}
              >
                <Icon
                  size={26}
                  className={isSelected ? 'text-white' : 'text-[#6EE7F5]'}
                  strokeWidth={1.75}
                />
              </div>

              <h3 className="text-white text-lg mb-1.5">{opt.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{opt.description}</p>
            </button>
          );
        })}
      </div>

      {/* Footer actions */}
      <div className="mt-10 sm:mt-14 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 text-white/60 hover:text-white transition-colors text-sm py-3 sm:py-0"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <PrimaryCTA onClick={onContinue} disabled={!selected} className="w-full sm:w-auto">
          Continue <ArrowRight size={16} />
        </PrimaryCTA>
      </div>
    </div>
  );
}
