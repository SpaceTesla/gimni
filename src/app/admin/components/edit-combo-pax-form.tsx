import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface ComboPax {
  id: string;
  combo_id: string;
  pax_range: string;
  price_per_pax: number;
}

interface EditComboPaxFormProps {
  comboPax: ComboPax;
  onSave: (comboPax: ComboPax) => void;
  onClose: () => void;
}

export function EditComboPaxForm({
  comboPax,
  onSave,
  onClose,
}: EditComboPaxFormProps) {
  const [formData, setFormData] = useState(comboPax);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price_per_pax' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="combo_id">Combo ID</Label>
        <Input
          id="combo_id"
          name="combo_id"
          value={formData.combo_id}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="pax_range">Pax Range</Label>
        <Input
          id="pax_range"
          name="pax_range"
          value={formData.pax_range}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="price_per_pax">Price per Pax</Label>
        <Input
          id="price_per_pax"
          name="price_per_pax"
          type="number"
          step="0.01"
          value={formData.price_per_pax}
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
