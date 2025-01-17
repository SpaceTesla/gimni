'use client';

import { useState, useEffect } from 'react';
import { MenuItems } from './components/menu-items';
import { Combos } from './components/combos';
import { ComboPax } from './components/combo-pax';
import { Sidebar } from './components/sidebar';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';

type TableType = 'menuItems' | 'combos' | 'comboPax';

const AdminPage = () => {
  const [activeTable, setActiveTable] = useState<TableType>('menuItems');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        router.replace('/login');
      }
    };
    checkSession();
  }, [router]);

  return (
    <div className="flex min-h-screen w-full bg-white">
      <Sidebar activeTable={activeTable} setActiveTable={setActiveTable} />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-4">
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
};

export default AdminPage;
