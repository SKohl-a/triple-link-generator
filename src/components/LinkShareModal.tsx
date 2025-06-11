
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, QrCode, Link, IceCream, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import QRCodeGenerator from './QRCodeGenerator';

interface LinkShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LinkShareModal: React.FC<LinkShareModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('url');
  const [urlLink, setUrlLink] = useState('https://example.com/your-content');
  const [iceCreamLink, setIceCreamLink] = useState('https://icecream.app/sweet-treats/12345');
  const [anonymousLink, setAnonymousLink] = useState('https://anon.link/secret/abc123def');
  const [showQR, setShowQR] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Link has been copied to your clipboard.",
    });
  };

  const getCurrentLink = () => {
    switch (activeTab) {
      case 'url': return urlLink;
      case 'icecream': return iceCreamLink;
      case 'anonymous': return anonymousLink;
      default: return '';
    }
  };

  const canGenerateQR = activeTab !== 'url';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Share a link</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="url" className="flex items-center gap-2">
              <Link className="w-4 h-4" />
              URL Link
            </TabsTrigger>
            <TabsTrigger value="icecream" className="flex items-center gap-2">
              <IceCream className="w-4 h-4" />
              Ice Cream
            </TabsTrigger>
            <TabsTrigger value="anonymous" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Anonymous
            </TabsTrigger>
          </TabsList>

          <TabsContent value="url" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url-link">URL Link</Label>
              <div className="flex space-x-2">
                <Input
                  id="url-link"
                  value={urlLink}
                  onChange={(e) => setUrlLink(e.target.value)}
                  className="flex-1"
                  placeholder="Enter your URL"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopy(urlLink)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Share your regular URL link. QR code generation is not available for URL links.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="icecream" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="icecream-link">Ice Cream Link</Label>
              <div className="flex space-x-2">
                <Input
                  id="icecream-link"
                  value={iceCreamLink}
                  onChange={(e) => setIceCreamLink(e.target.value)}
                  className="flex-1"
                  placeholder="Enter your ice cream link"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopy(iceCreamLink)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowQR(showQR === 'icecream' ? null : 'icecream')}
                >
                  <QrCode className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Share your sweet ice cream content with a special themed link.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="anonymous" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="anonymous-link">Anonymous Link</Label>
              <div className="flex space-x-2">
                <Input
                  id="anonymous-link"
                  value={anonymousLink}
                  onChange={(e) => setAnonymousLink(e.target.value)}
                  className="flex-1"
                  placeholder="Enter your anonymous link"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopy(anonymousLink)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowQR(showQR === 'anonymous' ? null : 'anonymous')}
                >
                  <QrCode className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Share content anonymously without revealing your identity.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {showQR && canGenerateQR && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-medium mb-4">QR Code</h3>
            <QRCodeGenerator 
              text={getCurrentLink()} 
              onClose={() => setShowQR(null)}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LinkShareModal;
