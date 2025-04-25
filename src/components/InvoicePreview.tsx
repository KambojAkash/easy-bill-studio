import React from 'react';
import { InvoiceData } from '@/types';
import { cn } from '@/lib/utils';
import { 
  calculateSubtotal, 
  calculateTaxAmount, 
  calculateTotal, 
  formatCurrency 
} from '@/utils/invoiceUtils';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';

interface InvoicePreviewProps {
  invoice: InvoiceData;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ invoice }) => {
  const subtotal = calculateSubtotal(invoice.lineItems);
  const taxAmount = calculateTaxAmount(subtotal, invoice.taxRate.rate);
  const total = calculateTotal(subtotal, taxAmount);

  const templateStyles = {
    modern: 'font-sans text-invoice-blue',
    minimal: 'font-mono text-gray-800',
    professional: 'font-serif text-slate-800',
    creative: 'font-sans text-purple-600',
    corporate: 'font-sans text-blue-800',
    boutique: 'font-serif text-pink-700',
  }[invoice.template] || 'font-sans';

  const headerStyles = {
    modern: 'border-b-2 border-blue-500',
    minimal: 'border-none',
    professional: 'border-b border-slate-200',
    creative: 'bg-gradient-to-r from-purple-100 to-transparent p-4 rounded-lg',
    corporate: 'bg-blue-50 p-4',
    boutique: 'border-b-2 border-pink-200',
  }[invoice.template] || '';

  const itemStyles = {
    modern: 'hover:bg-blue-50',
    minimal: 'border-b border-gray-100',
    professional: 'hover:bg-slate-50',
    creative: 'hover:bg-purple-50 rounded-lg',
    corporate: 'hover:bg-blue-50',
    boutique: 'hover:bg-pink-50',
  }[invoice.template] || '';

  return (
    <div className={cn("invoice-preview", templateStyles)}>
      <div className={cn("flex justify-between items-start mb-8", headerStyles)}>
        <div>
          <h1 className="text-3xl font-bold mb-1 text-invoice-blue">INVOICE</h1>
          <p className="text-lg font-medium">#{invoice.invoiceNumber}</p>
        </div>
        {invoice.business.logoUrl && (
          <div className="ml-4">
            <img 
              src={invoice.business.logoUrl} 
              alt="Business logo" 
              className="h-16 object-contain"
            />
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-sm font-semibold text-gray-500 mb-1">FROM</h2>
          <p className="font-medium">{invoice.business.name}</p>
          <p className="whitespace-pre-line text-sm text-gray-600">{invoice.business.address}</p>
          {invoice.business.phone && <p className="text-sm text-gray-600">{invoice.business.phone}</p>}
          <p className="text-sm text-gray-600">{invoice.business.email}</p>
          {invoice.business.website && <p className="text-sm text-gray-600">{invoice.business.website}</p>}
        </div>
        
        <div>
          <h2 className="text-sm font-semibold text-gray-500 mb-1">BILL TO</h2>
          <p className="font-medium">{invoice.client.name}</p>
          <p className="whitespace-pre-line text-sm text-gray-600">{invoice.client.address}</p>
          {invoice.client.phone && <p className="text-sm text-gray-600">{invoice.client.phone}</p>}
          <p className="text-sm text-gray-600">{invoice.client.email}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <div className="flex mb-1">
            <div className="w-1/2">
              <h2 className="text-sm font-semibold text-gray-500">INVOICE DATE</h2>
              <p>{format(invoice.dateIssued, 'MMM dd, yyyy')}</p>
            </div>
            <div className="w-1/2">
              <h2 className="text-sm font-semibold text-gray-500">DUE DATE</h2>
              <p>{format(invoice.dateDue, 'MMM dd, yyyy')}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className={cn("border-t border-b", invoice.template === 'minimal' ? 'border-gray-200' : 'border-current')}>
              <th className="text-left py-3 px-4 text-sm font-semibold">Item</th>
              <th className="text-center py-3 px-2 text-sm font-semibold">Qty</th>
              <th className="text-right py-3 px-2 text-sm font-semibold">Rate</th>
              <th className="text-right py-3 px-4 text-sm font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.lineItems.map((item) => (
              <tr key={item.id} className={cn("border-b border-current/10", itemStyles)}>
                <td className="text-left py-4 px-4">{item.description}</td>
                <td className="text-center py-4 px-2">{item.quantity}</td>
                <td className="text-right py-4 px-2">
                  {formatCurrency(item.unitPrice, invoice.currency)}
                </td>
                <td className="text-right py-4 px-4">
                  {formatCurrency(item.amount, invoice.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-end">
        <div className="w-full md:w-64">
          <div className="flex justify-between py-2">
            <span className="font-medium">Subtotal</span>
            <span>{formatCurrency(subtotal, invoice.currency)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-invoice-gray">
            <span className="font-medium">{invoice.taxRate.name}</span>
            <span>{formatCurrency(taxAmount, invoice.currency)}</span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold">
              {formatCurrency(total, invoice.currency)}
            </span>
          </div>
        </div>
      </div>
      
      {invoice.notes && (
        <div className="mt-8 pt-4 border-t border-current/20">
          <h2 className="text-sm font-semibold opacity-70 mb-1">NOTES</h2>
          <p className="text-sm opacity-70 whitespace-pre-line">{invoice.notes}</p>
        </div>
      )}
    </div>
  );
};

export default InvoicePreview;
