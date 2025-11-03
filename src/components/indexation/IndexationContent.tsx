import { Tier } from '../../App';

interface IndexationContentProps {
  tier: Tier;
}

export function IndexationContent({ tier }: IndexationContentProps) {
  return (
    <div className="p-8">
      <h1 className="text-2xl text-[#E6E9EE] mb-4">Indexation & Crawl</h1>
      <p className="text-[#98A2B3]">Indexation dashboard coming soon...</p>
    </div>
  );
}
