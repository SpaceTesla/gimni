import { MenuItem as MenuItemType } from '@/data/menu';

interface MenuItemProps {
  item: MenuItemType;
  points?: boolean;
  index?: number;
}

export function MenuItem({ item, points, index }: MenuItemProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-200">
        {points ? (
          <div className={'flex gap-2'}>
            <span>{(index ?? 0) + 1}.</span>
            <span>{item.name}</span>
          </div>
        ) : (
          item.name
        )}
      </span>
      {item.price && <span className="text-gray-300">₹{item.price}</span>}
    </div>
  );
}
