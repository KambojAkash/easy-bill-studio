
import { LineItemType, InvoiceData, Currency, TaxRate } from '@/types';

export const calculateLineItemAmount = (
  quantity: number,
  unitPrice: number
): number => {
  return quantity * unitPrice;
};

export const calculateSubtotal = (lineItems: LineItemType[]): number => {
  return lineItems.reduce((total, item) => total + item.amount, 0);
};

export const calculateTaxAmount = (
  subtotal: number,
  taxRate: TaxRate
): number => {
  return subtotal * (taxRate.rate / 100);
};

export const calculateTotal = (
  subtotal: number,
  taxAmount: number
): number => {
  return subtotal + taxAmount;
};

export const formatCurrency = (
  amount: number,
  currency: Currency
): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: 2,
  }).format(amount);
};

export const generateInvoiceNumber = (prefix: string = 'INV'): string => {
  // Generate a formatted date string
  const now = new Date();
  const year = now.getFullYear().toString().slice(2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  
  // Generate a random 4-digit number
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  
  return `${prefix}-${year}${month}-${randomDigits}`;
};

export const getDefaultDueDate = (dateIssued: Date): Date => {
  const dueDate = new Date(dateIssued);
  dueDate.setDate(dueDate.getDate() + 30); // Default: 30 days from issue date
  return dueDate;
};

export const currencyList: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: '$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
];

export const taxRates: TaxRate[] = [
  { id: 'none', name: 'No Tax', rate: 0 },
  { id: 'vat5', name: 'VAT 5%', rate: 5 },
  { id: 'vat10', name: 'VAT 10%', rate: 10 },
  { id: 'vat15', name: 'VAT 15%', rate: 15 },
  { id: 'vat20', name: 'VAT 20%', rate: 20 },
  { id: 'gst5', name: 'GST 5%', rate: 5 },
];

export const createEmptyInvoice = (): InvoiceData => {
  const dateIssued = new Date();
  
  return {
    id: crypto.randomUUID(),
    invoiceNumber: generateInvoiceNumber(),
    dateIssued,
    dateDue: getDefaultDueDate(dateIssued),
    client: {
      id: crypto.randomUUID(),
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
  };
};
