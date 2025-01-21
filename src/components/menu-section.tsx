import { MenuSection as MenuSectionType } from '@/data/menu';
import { MenuItem } from './menu-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MenuSectionProps {
  section: MenuSectionType;
  itemClassName?: string;
  sectionClassName?: string;
}

export function MenuSection({
  section,
  itemClassName,
  sectionClassName,
}: MenuSectionProps) {
  return (
    <Card
      className={`mx-auto mb-4 max-w-xl break-inside-avoid overflow-hidden rounded-2xl bg-brown-leaf ${sectionClassName}`}
    >
      <CardHeader>
        <CardTitle
          className={`-mx-6 -mt-6 p-2 text-center text-xl font-bold ${section.title === 'NOTE' ? 'bg-yellow-highlight text-black' : 'bg-red-highlight text-white'}`}
        >
          {section.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        {section.items.map((item, index) => (
          <MenuItem
            key={`${item.name}-${index}`}
            item={item}
            points={section.title === 'NOTE'}
            index={index}
            className={`${itemClassName} ${section.title === 'NOTE' ? 'italic' : ''}`}
          />
        ))}
      </CardContent>
    </Card>
  );
}
