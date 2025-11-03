import { Tier } from '../../App';

interface ProductsContentProps {
  tier: Tier;
}

export function ProductsContent({ tier }: ProductsContentProps) {
  return (
    <div className="p-8">
      <h1 className="text-2xl text-[#E6E9EE] mb-4">Digital Products</h1>
      <p className="text-[#98A2B3]">Products dashboard coming soon...</p>
    </div>
  );
}
