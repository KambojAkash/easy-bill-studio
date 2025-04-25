
import React, { useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { useReactToPrint } from 'react-to-print';
import { useToast } from '@/hooks/use-toast';
import InvoiceForm from '@/components/InvoiceForm';
import InvoicePreview from '@/components/InvoicePreview';
import { InvoiceData } from '@/types';
import { createEmptyInvoice } from '@/utils/invoiceUtils';
import { FileText, Edit } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('edit');
  const [invoice, setInvoice] = useState<InvoiceData>(createEmptyInvoice());
  const previewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
    documentTitle: `Invoice-${invoice.invoiceNumber}`,
    onAfterPrint: () => {
      toast({
        title: "PDF Created",
        description: "Your invoice has been exported to PDF.",
      });
    },
  });

  const handleUpdateInvoice = (updatedInvoice: InvoiceData) => {
    setInvoice(updatedInvoice);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b py-4 px-6">
        <div className="container">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">EasyBill Studio</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="container mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="edit" className="flex items-center gap-1">
                  <Edit className="h-4 w-4" />
                  Edit
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  Preview
                </TabsTrigger>
              </TabsList>
              
              {activeTab === 'preview' && (
                <Button onClick={handlePrint}>
                  Export PDF
                </Button>
              )}
            </div>
            
            <TabsContent value="edit" className="mt-0">
              <InvoiceForm 
                initialInvoice={invoice}
                onUpdateInvoice={handleUpdateInvoice}
                onExportPdf={() => {
                  setActiveTab('preview');
                  setTimeout(() => {
                    handlePrint();
                  }, 300);
                }}
              />
            </TabsContent>
            
            <TabsContent value="preview" className="mt-0 flex justify-center">
              <div ref={previewRef}>
                <InvoicePreview invoice={invoice} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="bg-white border-t py-3 px-6">
        <div className="container text-center text-sm text-muted-foreground">
          EasyBill Studio © {new Date().getFullYear()} - Professional Invoice Generator
        </div>
      </footer>
    </div>
  );
};

export default Index;
