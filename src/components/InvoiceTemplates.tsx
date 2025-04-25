
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckIcon } from 'lucide-react';

interface InvoiceTemplateProps {
  selectedTemplate: string;
  onSelectTemplate: (template: string) => void;
}

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Professional and clean design',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary layout with bold elements',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant style',
  }
];

const InvoiceTemplates: React.FC<InvoiceTemplateProps> = ({
  selectedTemplate,
  onSelectTemplate,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Invoice Templates</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                  selectedTemplate === template.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => onSelectTemplate(template.id)}
              >
                <div className="aspect-video w-full bg-muted mb-3 rounded flex items-center justify-center">
                  {template.name[0]}
                </div>
                <div>
                  <h4 className="font-medium">{template.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {template.description}
                  </p>
                </div>
                {selectedTemplate === template.id && (
                  <div className="absolute top-2 right-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceTemplates;
