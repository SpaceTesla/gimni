import { MenuSection as MenuSectionType } from '@/data/menu';
import { MenuItem } from './menu-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MenuSectionProps {
  section: MenuSectionType;
}

export function MenuSection({ section }: MenuSectionProps) {
  return (
    <Card className="mx-auto mb-4 max-w-xl break-inside-avoid overflow-hidden rounded-2xl bg-brown-leaf">
      <CardHeader>
        <CardTitle className="-mx-6 -mt-6 bg-red-highlight p-2 text-center text-xl font-bold text-white">
          {section.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        {section.items.map((item, index) => (
          <MenuItem key={`${item.name}-${index}`} item={item} />
        ))}
      </CardContent>
    </Card>
  );
}
