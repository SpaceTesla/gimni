import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EditMenuItemForm } from './edit-menu-item-form';
import { DeleteConfirmDialog } from './delete-confirm-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  type: string;
  diet: string;
  price: number;
}

const initialMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Jal Jeera',
    category: 'Other',
    type: 'Welcome Drink',
    diet: 'Veg',
    price: 50.0,
  },
  {
    id: '2',
    name: 'Fresh Lime Juice',
    category: 'Other',
    type: 'Welcome Drink',
    diet: 'Veg',
    price: 50.0,
  },
  {
    id: '3',
    name: 'Lemon Mint Cooler',
    category: 'Other',
    type: 'Welcome Drink',
    diet: 'Veg',
    price: 50.0,
  },
  {
    id: '4',
    name: 'Veg Cutlet',
    category: 'Bengali',
    type: 'Starter',
    diet: 'Veg',
    price: 40.0,
  },
  {
    id: '5',
    name: 'Gobi Manchurian',
    category: 'Non-Bengali',
    type: 'Starter',
    diet: 'Veg',
    price: 40.0,
  },
  {
    id: '6',
    name: 'Veg Manchurian',
    category: 'Non-Bengali',
    type: 'Starter',
    diet: 'Veg',
    price: 40.0,
  },
  {
    id: '7',
    name: 'Potato Chilli',
    category: 'Non-Bengali',
    type: 'Starter',
    diet: 'Veg',
    price: 40.0,
  },
];

export function MenuItems({ searchTerm }: { searchTerm: string }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.diet.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleUpdate = (updatedItem: MenuItem) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item,
      ),
    );
    setEditingItem(null);
    setIsEditDialogOpen(false);
  };

  const handleAdd = (newItem: MenuItem) => {
    setMenuItems((prevItems) => [
      ...prevItems,
      { ...newItem, id: String(prevItems.length + 1) },
    ]);
    setIsAddDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setDeletingItemId(null);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Menu Items</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Menu Item
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Diet</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.diet}</TableCell>
              <TableCell>{item.price.toFixed(2)}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setEditingItem(item);
                    setIsEditDialogOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setDeletingItemId(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <EditMenuItemForm
              item={editingItem}
              onSave={handleUpdate}
              onClose={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Menu Item</DialogTitle>
          </DialogHeader>
          <EditMenuItemForm
            item={{
              id: '',
              name: '',
              category: '',
              type: '',
              diet: '',
              price: 0,
            }}
            onSave={handleAdd}
            onClose={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        isOpen={!!deletingItemId}
        onClose={() => setDeletingItemId(null)}
        onConfirm={() => {
          if (deletingItemId) {
            handleDelete(deletingItemId);
          }
        }}
      />
    </div>
  );
}
