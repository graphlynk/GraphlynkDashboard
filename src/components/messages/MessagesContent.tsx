import { Tier } from '../../App';

interface MessagesContentProps {
  tier: Tier;
}

export function MessagesContent({ tier }: MessagesContentProps) {
  return (
    <div className="p-8">
      <h1 className="text-2xl text-[#E6E9EE] mb-4">Messages</h1>
      <p className="text-[#98A2B3]">Intent-first messaging coming soon...</p>
    </div>
  );
}
