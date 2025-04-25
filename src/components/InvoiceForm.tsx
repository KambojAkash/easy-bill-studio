import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { InvoiceData, LineItemType, Client, Business, Currency, TaxRate } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Plus, FileText, Download, Save } from 'lucide-react';
import LineItem from './LineItem';
import ClientInfo from './ClientInfo';
import BusinessInfo from './BusinessInfo';
import { calculateSubtotal, calculateTaxAmount, calculateTotal, calculateLineItemAmount, formatCurrency, currencyList, taxRates, createEmptyInvoice } from '@/utils/invoiceUtils';
import { cn } from '@/lib/utils';
import InvoiceTemplates from './InvoiceTemplates';

interface InvoiceFormProps {
  initialInvoice?: InvoiceData;
  onUpdateInvoice: (invoice: InvoiceData) => void;
  onExportPdf: () => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ 
  initialInvoice, 
  onUpdateInvoice, 
  onExportPdf 
}) => {
  const { toast } = useToast();
  const [invoice, setInvoice] = useState<InvoiceData>(initialInvoice || createEmptyInvoice());
  const [client, setClient] = useState<Client>(invoice.client);
  const [business, setBusiness] = useState<Business>(invoice.business);
  
  const subtotal = calculateSubtotal(invoice.lineItems);
  const taxAmount = calculateTaxAmount(subtotal, invoice.taxRate);
  const total = calculateTotal(subtotal, taxAmount);

  useEffect(() => {
    setInvoice(prev => ({
      ...prev,
      client,
      business
    }));
  }, [client, business]);

  useEffect(() => {
    onUpdateInvoice(invoice);
  }, [invoice, onUpdateInvoice]);

  const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const handleDateChange = (field: 'dateIssued' | 'dateDue', date: Date | undefined) => {
    if (date) {
      setInvoice({ ...invoice, [field]: date });
    }
  };

  const handleCurrencyChange = (value: string) => {
    const selected = currencyList.find(c => c.code === value);
    if (selected) {
      setInvoice({ ...invoice, currency: selected });
    }
  };

  const handleTaxRateChange = (value: string) => {
    const selected = taxRates.find(t => t.id === value);
    if (selected) {
      setInvoice({ ...invoice, taxRate: selected });
    }
  };

  const addLineItem = () => {
    const newItem: LineItemType = {
      id: crypto.randomUUID(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      amount: 0,
    };
    
    setInvoice({
      ...invoice,
      lineItems: [...invoice.lineItems, newItem],
    });
  };

  const updateLineItem = (id: string, updatedItem: LineItemType) => {
    setInvoice({
      ...invoice,
      lineItems: invoice.lineItems.map(item => 
        item.id === id ? updatedItem : item
      ),
    });
  };

  const removeLineItem = (id: string) => {
    setInvoice({
      ...invoice,
      lineItems: invoice.lineItems.filter(item => item.id !== id),
    });
  };

  const handleSave = () => {
    toast({
      title: "Invoice Saved",
      description: "Your invoice has been saved as a draft.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">New Invoice</h1>
          <p className="text-muted-foreground">Create and customize your invoice</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button variant="outline" onClick={onExportPdf}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>
      
      <InvoiceTemplates
        selectedTemplate={invoice.template}
        onSelectTemplate={(template) => setInvoice({ ...invoice, template })}
      />
      
      <BusinessInfo business={business} setBusiness={setBusiness} />
      <ClientInfo client={client} setClient={setClient} />
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                name="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={handleInvoiceChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateIssued">Issue Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !invoice.dateIssued && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {invoice.dateIssued ? format(invoice.dateIssued, 'PP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={invoice.dateIssued}
                    onSelect={(date) => handleDateChange('dateIssued', date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateDue">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !invoice.dateDue && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {invoice.dateDue ? format(invoice.dateDue, 'PP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={invoice.dateDue}
                    onSelect={(date) => handleDateChange('dateDue', date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={invoice.currency.code}
                onValueChange={handleCurrencyChange}
              >
                <SelectTrigger id="currency" className="w-full">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencyList.map(currency => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name} ({currency.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate</Label>
              <Select
                value={invoice.taxRate.id}
                onValueChange={handleTaxRateChange}
              >
                <SelectTrigger id="taxRate" className="w-full">
                  <SelectValue placeholder="Select tax rate" />
                </SelectTrigger>
                <SelectContent>
                  {taxRates.map(tax => (
                    <SelectItem key={tax.id} value={tax.id}>
                      {tax.name} ({tax.rate}%)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {invoice.lineItems.length > 0 && (
              <div className="grid grid-cols-12 gap-2 mb-2 text-sm font-medium text-muted-foreground px-2">
                <div className="col-span-12 sm:col-span-5">Description</div>
                <div className="col-span-4 sm:col-span-2">Quantity</div>
                <div className="col-span-4 sm:col-span-2">Unit Price</div>
                <div className="col-span-3 sm:col-span-2">Amount</div>
                <div className="col-span-1"></div>
              </div>
            )}
            
            {invoice.lineItems.map(item => (
              <LineItem
                key={item.id}
                item={item}
                currency={invoice.currency.symbol}
                onUpdate={(updatedItem) => updateLineItem(item.id, updatedItem)}
                onRemove={() => removeLineItem(item.id)}
              />
            ))}
            
            <Button 
              variant="outline" 
              onClick={addLineItem} 
              className="mt-2"
            >
              <Plus size={16} className="mr-1" /> Add Item
            </Button>
            
            <div className="flex justify-end mt-6">
              <div className="w-full md:w-64 space-y-2">
                <div className="flex justify-between py-2">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal, invoice.currency)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>{invoice.taxRate.name} ({invoice.taxRate.rate}%)</span>
                  <span>{formatCurrency(taxAmount, invoice.currency)}</span>
                </div>
                <div className="flex justify-between py-2 border-t">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">
                    {formatCurrency(total, invoice.currency)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            name="notes"
            value={invoice.notes || ''}
            onChange={handleInvoiceChange}
            placeholder="Additional notes for the client (payment terms, thank you message, etc.)"
            rows={3}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceForm;
