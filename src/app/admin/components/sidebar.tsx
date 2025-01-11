import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

type TableType = 'menuItems' | 'combos' | 'comboPax';

interface SidebarProps {
  activeTable: TableType;
  setActiveTable: (table: TableType) => void;
}

export function Sidebar({ activeTable, setActiveTable }: SidebarProps) {
  return (
    <div className="w-64 pb-12">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Tables
          </h2>
          <div className="space-y-1">
            <Button
              variant={activeTable === 'menuItems' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTable('menuItems')}
            >
              Menu Items
            </Button>
            <Button
              variant={activeTable === 'combos' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTable('combos')}
            >
              Combos
            </Button>
            <Button
              variant={activeTable === 'comboPax' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTable('comboPax')}
            >
              Combo Pax
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
