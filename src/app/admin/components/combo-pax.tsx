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
import { EditComboPaxForm } from './edit-combo-pax-form';
import { DeleteConfirmDialog } from './delete-confirm-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ComboPax {
  id: string;
  combo_id: string;
  pax_range: string;
  price_per_pax: number;
}

const initialComboPax: ComboPax[] = [
  {
    id: '1',
    combo_id: '1036028941438255105',
    pax_range: '10-20',
    price_per_pax: 173.0,
  },
  {
    id: '2',
    combo_id: '1036028941438255105',
    pax_range: '20-30',
    price_per_pax: 150.0,
  },
  {
    id: '3',
    combo_id: '1036028941438255105',
    pax_range: '30-50',
    price_per_pax: 143.0,
  },
];

export function ComboPax({ searchTerm }: { searchTerm: string }) {
  const [comboPaxItems, setComboPaxItems] =
    useState<ComboPax[]>(initialComboPax);
  const [editingComboPax, setEditingComboPax] = useState<ComboPax | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deletingComboPaxId, setDeletingComboPaxId] = useState<string | null>(
    null,
  );

  const filteredComboPaxItems = comboPaxItems.filter(
    (item) =>
      item.combo_id.includes(searchTerm) || item.pax_range.includes(searchTerm),
  );

  const handleUpdate = (updatedComboPax: ComboPax) => {
    setComboPaxItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedComboPax.id ? updatedComboPax : item,
      ),
    );
    setEditingComboPax(null);
    setIsEditDialogOpen(false);
  };

  const handleAdd = (newComboPax: ComboPax) => {
    setComboPaxItems((prevItems) => [
      ...prevItems,
      { ...newComboPax, id: String(prevItems.length + 1) },
    ]);
    setIsAddDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setComboPaxItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setDeletingComboPaxId(null);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Combo Pax</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Combo Pax
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Combo ID</TableHead>
            <TableHead>Pax Range</TableHead>
            <TableHead>Price per Pax</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredComboPaxItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.combo_id}</TableCell>
              <TableCell>{item.pax_range}</TableCell>
              <TableCell>{item.price_per_pax.toFixed(2)}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setEditingComboPax(item);
                    setIsEditDialogOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setDeletingComboPaxId(item.id)}
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
            <DialogTitle>Edit Combo Pax</DialogTitle>
          </DialogHeader>
          {editingComboPax && (
            <EditComboPaxForm
              comboPax={editingComboPax}
              onSave={handleUpdate}
              onClose={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Combo Pax</DialogTitle>
          </DialogHeader>
          <EditComboPaxForm
            comboPax={{ id: '', combo_id: '', pax_range: '', price_per_pax: 0 }}
            onSave={handleAdd}
            onClose={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        isOpen={!!deletingComboPaxId}
        onClose={() => setDeletingComboPaxId(null)}
        onConfirm={() => {
          if (deletingComboPaxId) {
            handleDelete(deletingComboPaxId);
          }
        }}
      />
    </div>
  );
}
