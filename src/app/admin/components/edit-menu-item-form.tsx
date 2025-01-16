import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import MenuItem from '@/types/menu';

interface EditMenuItemFormProps {
  item: MenuItem;
  onSave: (item: MenuItem) => void;
  onClose: () => void;
  isEdit: boolean;
}

export function EditMenuItemForm({
  item,
  onSave,
  onClose,
  isEdit,
}: EditMenuItemFormProps) {
  const [formData, setFormData] = useState({
    ...item,
    price: item.price.toString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedItem = {
        ...formData,
        price: parseFloat(formData.price) || 0,
      };
      if (isEdit) {
        await axios.put('/api/menu', updatedItem);
      } else {
        await axios.post('/api/menu', updatedItem);
      }
      onSave(updatedItem);
    } catch (error) {
      console.error('Error saving menu item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="type">Type</Label>
        <Input
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="diet">Diet</Label>
        <Input
          id="diet"
          name="diet"
          value={formData.diet}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
