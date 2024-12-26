import { Utensils } from 'lucide-react';

function DishCard({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className="flex min-w-[300px] items-center rounded-lg bg-white/50 p-4 backdrop-blur transition-colors hover:bg-white/80">
      <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#FFB800]/10">
        <Utensils className="h-8 w-8 text-[#FFB800]" />
      </div>
      <div className="ml-4">
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

export default DishCard;
