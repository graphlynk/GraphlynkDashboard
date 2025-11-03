import { Tier } from '../../App';

interface ProfileContentProps {
  tier: Tier;
}

export function ProfileContent({ tier }: ProfileContentProps) {
  return (
    <div className="p-8">
      <h1 className="text-2xl text-[#E6E9EE] mb-4">Profile & Links</h1>
      <p className="text-[#98A2B3]">Profile editor coming soon...</p>
    </div>
  );
}
