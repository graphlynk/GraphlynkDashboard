import { Tier } from '../../App';

interface KeywordsContentProps {
  tier: Tier;
}

export function KeywordsContent({ tier }: KeywordsContentProps) {
  return (
    <div className="p-8">
      <h1 className="text-2xl text-[#E6E9EE] mb-4">Keywords & Entities</h1>
      <p className="text-[#98A2B3]">Keywords dashboard coming soon...</p>
    </div>
  );
}
