import { Tier } from '../../App';

interface SettingsContentProps {
  tier: Tier;
}

export function SettingsContent({ tier }: SettingsContentProps) {
  return (
    <div className="p-8">
      <h1 className="text-2xl text-[#E6E9EE] mb-4">Settings</h1>
      <p className="text-[#98A2B3]">Settings panel coming soon...</p>
    </div>
  );
}
