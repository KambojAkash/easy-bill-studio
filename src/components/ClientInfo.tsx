
import React from 'react';
import { Client } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ClientInfoProps {
  client: Client;
  setClient: React.Dispatch<React.SetStateAction<Client>>;
}

const ClientInfo: React.FC<ClientInfoProps> = ({ client, setClient }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle>Client Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="client-name">Client Name</Label>
            <Input
              id="client-name"
              name="name"
              value={client.name}
              onChange={handleInputChange}
              placeholder="Client or Company Name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="client-email">Email</Label>
            <Input
              id="client-email"
              name="email"
              type="email"
              value={client.email}
              onChange={handleInputChange}
              placeholder="client@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="client-phone">Phone (Optional)</Label>
            <Input
              id="client-phone"
              name="phone"
              value={client.phone || ''}
              onChange={handleInputChange}
              placeholder="(123) 456-7890"
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="client-address">Address</Label>
            <Textarea
              id="client-address"
              name="address"
              value={client.address}
              onChange={handleInputChange}
              placeholder="Client Address"
              rows={2}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientInfo;
