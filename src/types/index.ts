
export type Currency = {
  code: string;
  symbol: string;
  name: string;
};

export type LineItemType = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
};

export type TaxRate = {
  id: string;
  name: string;
  rate: number;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  address: string;
  phone?: string;
};

export type Business = {
  name: string;
  address: string;
  phone?: string;
  email: string;
  website?: string;
  logoUrl?: string;
};

export type InvoiceData = {
  id: string;
  invoiceNumber: string;
  dateIssued: Date;
  dateDue: Date;
  client: Client;
  business: Business;
  lineItems: LineItemType[];
  taxRate: TaxRate;
  notes?: string;
  currency: Currency;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
};
