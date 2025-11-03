import { Tier } from '../../App';

interface SearchContentProps {
  tier: Tier;
}

export function SearchContent({ tier }: SearchContentProps) {
  return (
    <div className="p-8">
      <h1 className="text-2xl text-[#E6E9EE] mb-4">Search</h1>
      <p className="text-[#98A2B3]">Search functionality coming soon...</p>
    </div>
  );
}
