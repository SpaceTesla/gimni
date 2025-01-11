import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface Combo {
  id: string;
  name: string;
  price: number;
  rice: number;
  bread: number;
  starter: number;
  gravy: number;
  dal: number;
  salad: number;
  dessert: number;
  papad: number;
  chutney: number;
}

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
      <div>
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
      <div>
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
      <div>
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
      <div>
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
      <div>
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
      <div>
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
      <div>
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
      <div>
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
      <div>
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
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
