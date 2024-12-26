import { Building2 } from 'lucide-react';

// Brand Icons Component
function BrandIcon({ name }: { name: string }) {
  return (
    <div className="flex h-20 min-w-[200px] items-center justify-center rounded-lg bg-white/50 px-6 backdrop-blur transition-colors hover:bg-white/80">
      <Building2 className="h-8 w-8 text-[#FF3B30]" />
      <span className="ml-2 font-semibold text-gray-800">{name}</span>
    </div>
  );
}

export default BrandIcon;
