
import React, { useState, useRef } from 'react';
import { Business } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BusinessInfoProps {
  business: Business;
  setBusiness: React.Dispatch<React.SetStateAction<Business>>;
}

const BusinessInfo: React.FC<BusinessInfoProps> = ({ business, setBusiness }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusiness({ ...business, [name]: value });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBusiness({ ...business, logoUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setBusiness({ ...business, logoUrl: undefined });
  };

  const onButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle>Your Business Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            {business.logoUrl ? (
              <div className="relative inline-block mb-4">
                <img 
                  src={business.logoUrl} 
                  alt="Business logo" 
                  className="h-20 object-contain border rounded p-2"
                />
                <button 
                  onClick={removeLogo}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow"
                  aria-label="Remove logo"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div 
                className={`file-drop-area mb-4 ${dragActive ? 'active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={onButtonClick}
              >
                <UploadIcon className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">Drag & drop your logo or click to browse</p>
                <input
                  ref={fileInputRef}
                  onChange={handleChange}
                  accept="image/*"
                  type="file"
                  className="hidden"
                  id="logo-upload"
                />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="business-name">Business Name</Label>
            <Input
              id="business-name"
              name="name"
              value={business.name}
              onChange={handleInputChange}
              placeholder="Your Business Name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="business-email">Email</Label>
            <Input
              id="business-email"
              name="email"
              type="email"
              value={business.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="business-phone">Phone (Optional)</Label>
            <Input
              id="business-phone"
              name="phone"
              value={business.phone || ''}
              onChange={handleInputChange}
              placeholder="(123) 456-7890"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="business-website">Website (Optional)</Label>
            <Input
              id="business-website"
              name="website"
              value={business.website || ''}
              onChange={handleInputChange}
              placeholder="www.yourbusiness.com"
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="business-address">Address</Label>
            <Textarea
              id="business-address"
              name="address"
              value={business.address}
              onChange={handleInputChange}
              placeholder="Your business address"
              rows={2}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessInfo;
