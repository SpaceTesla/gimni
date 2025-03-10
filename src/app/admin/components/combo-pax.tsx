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
  combo_name: string;
  pax_range: string;
  price_per_pax: number;
}

export function ComboPax({ searchTerm }: { searchTerm: string }) {
  const [comboPaxItems, setComboPaxItems] = useState<ComboPax[]>([]);
  const [editingComboPax, setEditingComboPax] = useState<ComboPax | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deletingComboPaxId, setDeletingComboPaxId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    axios
      .get<ComboPax[]>('/api/pax/all')
      .then((response: AxiosResponse<ComboPax[]>) => {
        setComboPaxItems(response.data);
      })
      .catch((error: AxiosError) => {
        console.error('Error fetching combo pax items:', error);
      });
  }, []);

  const filteredComboPaxItems = comboPaxItems.filter(
    (item) =>
      (item.combo_name && item.combo_name.includes(searchTerm)) ||
      (item.pax_range && item.pax_range.includes(searchTerm)),
  );

  const handleUpdate = async (updatedComboPax: ComboPax) => {
    try {
      const response = await axios.put<ComboPax>('/api/pax', updatedComboPax);
      setComboPaxItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedComboPax.id ? response.data : item,
        ),
      );
      setEditingComboPax(null);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating combo pax:', error);
    }
  };

  const handleAdd = async (newComboPax: ComboPax) => {
    try {
      const response = await axios.post<ComboPax>('/api/pax', newComboPax);
      setComboPaxItems((prevItems) => [...prevItems, response.data]);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error adding combo pax:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete('/api/pax', { data: { id } });
      setComboPaxItems((prevItems) =>
        prevItems.filter((item) => item.id !== id),
      );
      setDeletingComboPaxId(null);
    } catch (error) {
      console.error('Error deleting combo pax:', error);
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Combo Pax</h2>
        {/*<Button onClick={() => setIsAddDialogOpen(true)}>*/}
        {/*  <Plus className="mr-2 h-4 w-4" /> Add Combo Pax*/}
        {/*</Button>*/}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Combo Name</TableHead>
            <TableHead>Pax Range</TableHead>
            <TableHead>Price per Pax</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredComboPaxItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.combo_name}</TableCell>
              <TableCell>{item.pax_range}</TableCell>
              <TableCell>{Number(item.price_per_pax).toFixed(2)}</TableCell>
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
                {/*<Button*/}
                {/*  variant="ghost"*/}
                {/*  onClick={() => setDeletingComboPaxId(item.id)}*/}
                {/*>*/}
                {/*  <Trash2 className="h-4 w-4" />*/}
                {/*</Button>*/}
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
            comboPax={{
              id: '',
              combo_id: '',
              combo_name: '',
              pax_range: '',
              price_per_pax: 0,
            }}
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
