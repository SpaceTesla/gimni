import { MenuItem as MenuItemType } from '@/data/menu';

interface MenuItemProps {
  item: MenuItemType;
}

export function MenuItem({ item }: MenuItemProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-200">{item.name}</span>
      <span className="text-gray-300">₹{item.price}</span>
    </div>
  );
}
