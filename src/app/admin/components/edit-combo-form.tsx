import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import Combo from '@/types/combo';

interface EditComboFormProps {
  combo: Combo;
  onSave: (combo: Combo) => void;
  onClose: () => void;
}

export function EditComboForm({ combo, onSave, onClose }: EditComboFormProps) {
  const [formData, setFormData] = useState(combo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'name' ? value : parseInt(value, 10),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put<Combo>('/api/combos', formData);
      onSave(response.data);
    } catch (error) {
      console.error('Error updating combo:', error);
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
      <div className="flex space-x-4">
        <div className="flex-1">
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
        <div className="flex-1">
          <Label htmlFor="rice">Rice</Label>
          <Input
            id="rice"
            name="rice"
            type="number"
            value={formData.rice}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <Label htmlFor="bread">Bread</Label>
          <Input
            id="bread"
            name="bread"
            type="number"
            value={formData.bread}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="starter">Starter</Label>
          <Input
            id="starter"
            name="starter"
            type="number"
            value={formData.starter}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <Label htmlFor="gravy">Gravy</Label>
          <Input
            id="gravy"
            name="gravy"
            type="number"
            value={formData.gravy}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="dal">Dal</Label>
          <Input
            id="dal"
            name="dal"
            type="number"
            value={formData.dal}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <Label htmlFor="salad">Salad</Label>
          <Input
            id="salad"
            name="salad"
            type="number"
            value={formData.salad}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="dessert">Dessert</Label>
          <Input
            id="dessert"
            name="dessert"
            type="number"
            value={formData.dessert}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <Label htmlFor="papad">Papad</Label>
          <Input
            id="papad"
            name="papad"
            type="number"
            value={formData.papad}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="chutney">Chutney</Label>
          <Input
            id="chutney"
            name="chutney"
            type="number"
            value={formData.chutney}
            onChange={handleChange}
            required
          />
        </div>
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
