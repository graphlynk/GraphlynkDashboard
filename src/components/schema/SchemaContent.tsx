import { Tier } from '../../App';

interface SchemaContentProps {
  tier: Tier;
}

export function SchemaContent({ tier }: SchemaContentProps) {
  return (
    <div className="p-8">
      <h1 className="text-2xl text-[#E6E9EE] mb-4">Schema Health</h1>
      <p className="text-[#98A2B3]">Schema dashboard coming soon...</p>
    </div>
  );
}
