
import React from 'react';
import { LineItemType } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { calculateLineItemAmount } from '@/utils/invoiceUtils';

interface LineItemProps {
  item: LineItemType;
  onUpdate: (updatedItem: LineItemType) => void;
  onRemove: () => void;
  currency: string;
}

const LineItem: React.FC<LineItemProps> = ({ item, onUpdate, onRemove, currency }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    let updatedItem = { ...item, [name]: value };
    
    if (name === 'quantity' || name === 'unitPrice') {
      const quantity = name === 'quantity' ? parseFloat(value) || 0 : item.quantity;
      const unitPrice = name === 'unitPrice' ? parseFloat(value) || 0 : item.unitPrice;
      
      updatedItem = {
        ...updatedItem,
        quantity,
        unitPrice,
        amount: calculateLineItemAmount(quantity, unitPrice),
      };
    }
    
    onUpdate(updatedItem);
  };

  return (
    <div className="grid grid-cols-12 gap-2 mb-2 items-start">
      <div className="col-span-12 sm:col-span-5">
        <Input
          name="description"
          value={item.description}
          onChange={handleChange}
          placeholder="Item description"
        />
      </div>
      <div className="col-span-4 sm:col-span-2">
        <Input
          name="quantity"
          type="number"
          min="0"
          step="1"
          value={item.quantity || ''}
          onChange={handleChange}
          placeholder="Qty"
        />
      </div>
      <div className="col-span-4 sm:col-span-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{currency}</span>
          </div>
          <Input
            name="unitPrice"
            type="number"
            min="0"
            step="0.01"
            className="pl-7"
            value={item.unitPrice || ''}
            onChange={handleChange}
            placeholder="Price"
          />
        </div>
      </div>
      <div className="col-span-3 sm:col-span-2">
        <Input
          value={item.amount.toFixed(2)}
          readOnly
          className="bg-muted"
        />
      </div>
      <div className="col-span-1">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onRemove} 
          className="h-10 w-10"
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
  );
};

export default LineItem;
