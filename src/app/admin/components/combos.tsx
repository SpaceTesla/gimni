// src/app/admin/components/combos.tsx
import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
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
import { EditComboForm } from './edit-combo-form';
import { DeleteConfirmDialog } from './delete-confirm-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import Combo from '@/types/combo';

export function Combos({ searchTerm }: { searchTerm: string }) {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [editingCombo, setEditingCombo] = useState<Combo | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deletingComboId, setDeletingComboId] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Combo[]>('/api/combos')
      .then((response: AxiosResponse<Combo[]>) => {
        setCombos(response.data);
      })
      .catch((error: AxiosError) => {
        console.error('Error fetching combos:', error);
      });
  }, []);

  const filteredCombos = combos.filter((combo) =>
    combo.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleUpdate = (updatedCombo: Combo) => {
    setCombos((prevCombos) =>
      prevCombos.map((combo) =>
        combo.id === updatedCombo.id ? updatedCombo : combo,
      ),
    );
    setEditingCombo(null);
    setIsEditDialogOpen(false);
  };

  const handleAdd = (newCombo: Combo) => {
    setCombos((prevCombos) => [
      ...prevCombos,
      { ...newCombo, id: String(prevCombos.length + 1) },
    ]);
    setIsAddDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setCombos((prevCombos) => prevCombos.filter((combo) => combo.id !== id));
    setDeletingComboId(null);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Combos</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Combo
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Rice</TableHead>
            <TableHead>Bread</TableHead>
            <TableHead>Starter</TableHead>
            <TableHead>Gravy</TableHead>
            <TableHead>Dal</TableHead>
            <TableHead>Salad</TableHead>
            <TableHead>Dessert</TableHead>
            <TableHead>Papad</TableHead>
            <TableHead>Chutney</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCombos.map((combo) => (
            <TableRow key={combo.id}>
              <TableCell>{combo.name}</TableCell>
              <TableCell>{Number(combo.price).toFixed(2)}</TableCell>
              <TableCell>{combo.rice}</TableCell>
              <TableCell>{combo.bread}</TableCell>
              <TableCell>{combo.starter}</TableCell>
              <TableCell>{combo.gravy}</TableCell>
              <TableCell>{combo.dal}</TableCell>
              <TableCell>{combo.salad}</TableCell>
              <TableCell>{combo.dessert}</TableCell>
              <TableCell>{combo.papad}</TableCell>
              <TableCell>{combo.chutney}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setEditingCombo(combo);
                    setIsEditDialogOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setDeletingComboId(String(combo.id))}
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
            <DialogTitle>Edit Combo</DialogTitle>
          </DialogHeader>
          {editingCombo && (
            <EditComboForm
              combo={editingCombo}
              onSave={handleUpdate}
              onClose={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Combo</DialogTitle>
          </DialogHeader>
          <EditComboForm
            combo={{
              id: '',
              name: '',
              price: 0,
              rice: 0,
              bread: 0,
              starter: 0,
              gravy: 0,
              dal: 0,
              salad: 0,
              dessert: 0,
              papad: 0,
              chutney: 0,
            }}
            onSave={handleAdd}
            onClose={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        isOpen={!!deletingComboId}
        onClose={() => setDeletingComboId(null)}
        onConfirm={() => {
          if (deletingComboId !== null) {
            handleDelete(deletingComboId);
          }
        }}
      />
    </div>
  );
}
