import { InvoiceData, Currency, TaxRate, LineItemType } from '@/types';

export const formatCurrency = (amount: number, currency: Currency): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code,
  }).format(amount);
};

export const calculateLineItemAmount = (item: LineItemType): number => {
  return item.quantity * item.unitPrice;
};

export const calculateSubtotal = (lineItems: LineItemType[]): number => {
  return lineItems.reduce((sum, item) => sum + item.amount, 0);
};

export const calculateTaxAmount = (subtotal: number, taxRate: number): number => {
  return subtotal * (taxRate / 100);
};

export const calculateTotal = (subtotal: number, taxAmount: number): number => {
  return subtotal + taxAmount;
};

export const generateInvoiceNumber = (): string => {
  const now = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `INV-${now}-${random}`;
};

export const currencyList: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar' },
];

export const taxRates: TaxRate[] = [
  { id: 'standard', name: 'Standard Tax', rate: 20 },
  { id: 'reduced', name: 'Reduced Tax', rate: 5 },
  { id: 'exempt', name: 'Exempt', rate: 0 },
];

export const createEmptyInvoice = (): InvoiceData => ({
  id: crypto.randomUUID(),
  invoiceNumber: generateInvoiceNumber(),
  dateIssued: new Date(),
  dateDue: new Date(new Date().setDate(new Date().getDate() + 30)),
  client: {
    id: '',
    name: '',
    email: '',
    address: '',
  },
  business: {
    name: '',
    address: '',
    email: '',
  },
  lineItems: [],
  taxRate: taxRates[0],
  currency: currencyList[0],
  status: 'draft',
  template: 'modern',
});
