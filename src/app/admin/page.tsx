'use client';

import { useState } from 'react';
import { MenuItems } from './components/menu-items';
import { Combos } from './components/combos';
import { ComboPax } from './components/combo-pax';
import { Sidebar } from './components/sidebar';
import { Input } from '@/components/ui/input';

type TableType = 'menuItems' | 'combos' | 'comboPax';

export default function AdminPage() {
  const [activeTable, setActiveTable] = useState<TableType>('menuItems');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex min-h-screen w-full bg-white">
      <Sidebar activeTable={activeTable} setActiveTable={setActiveTable} />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-4">
          <h1 className="mb-8 mt-4 text-center text-4xl font-bold">
            Admin Dashboard
          </h1>
          <Input
            type="search"
            placeholder="Search..."
            className="mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {activeTable === 'menuItems' && <MenuItems searchTerm={searchTerm} />}
          {activeTable === 'combos' && <Combos searchTerm={searchTerm} />}
          {activeTable === 'comboPax' && <ComboPax searchTerm={searchTerm} />}
        </div>
      </div>
    </div>
  );
}
