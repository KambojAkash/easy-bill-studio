
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckIcon, LayoutTemplate } from 'lucide-react';

interface InvoiceTemplateProps {
  selectedTemplate: string;
  onSelectTemplate: (template: string) => void;
}

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary with blue accents',
    preview: 'M',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Sleek and minimalist black & white design',
    preview: 'Mi',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Traditional serif-based business layout',
    preview: 'P',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Playful design with purple gradients',
    preview: 'C',
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Structured layout with blue tones',
    preview: 'Co',
  },
  {
    id: 'boutique',
    name: 'Boutique',
    description: 'Elegant design with pink accents',
    preview: 'B',
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
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <LayoutTemplate className="h-5 w-5" />
              Invoice Templates
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <div className={`aspect-video w-full mb-3 rounded flex items-center justify-center text-2xl font-semibold
                  ${template.id === 'modern' ? 'bg-blue-100 text-blue-600' : ''}
                  ${template.id === 'minimal' ? 'bg-gray-100 text-gray-600' : ''}
                  ${template.id === 'professional' ? 'bg-slate-100 text-slate-600' : ''}
                  ${template.id === 'creative' ? 'bg-purple-100 text-purple-600' : ''}
                  ${template.id === 'corporate' ? 'bg-blue-100 text-blue-800' : ''}
                  ${template.id === 'boutique' ? 'bg-pink-100 text-pink-600' : ''}
                `}>
                  {template.preview}
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
