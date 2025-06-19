import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, QrCode, Link, SquareCode, User, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import QRCodeGenerator from './QRCodeGenerator';

interface LinkShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LinkShareModal: React.FC<LinkShareModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('url');
  const [urlLink, setUrlLink] = useState('https://example.com/your-content');
  const [iframeLink, setIframeLink] = useState('<iframe src="https://example.com/embed" width="100%" height="400"></iframe>');
  const [anonymousLink, setAnonymousLink] = useState('https://anon.link/secret/abc123def');
  const [showQR, setShowQR] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Link has been copied to your clipboard."
    });
  };

  const getCurrentLink = () => {
    switch (activeTab) {
      case 'url':
        return urlLink;
      case 'iframe':
        return iframeLink;
      case 'anonymous':
        return anonymousLink;
      default:
        return '';
    }
  };

  const canGenerateQR = activeTab !== 'iframe';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Public URL - Form/Packet Name</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="url" className="flex items-center gap-2">
              <Link className="w-4 h-4" />
              URL Link
            </TabsTrigger>
            <TabsTrigger value="iframe" className="flex items-center gap-2">
              <SquareCode className="w-4 h-4" />
              Iframe
            </TabsTrigger>
            <TabsTrigger value="anonymous" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Anonymous
              <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="url" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url-link">URL Link</Label>
              <div className="flex space-x-2">
                <Input id="url-link" value={urlLink} onChange={e => setUrlLink(e.target.value)} className="flex-1" placeholder="Enter your URL" />
                <Button variant="outline" size="icon" onClick={() => handleCopy(urlLink)}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setShowQR(showQR === 'url' ? null : 'url')}>
                  <QrCode className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Share your regular URL link.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="iframe" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="iframe-link">Iframe Code</Label>
              <div className="flex space-x-2">
                <Input id="iframe-link" value={iframeLink} onChange={e => setIframeLink(e.target.value)} className="flex-1" placeholder="Enter your iframe code" />
                <Button variant="outline" size="icon" onClick={() => handleCopy(iframeLink)}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Share your iframe embed code for easy integration into websites. QR code generation is not available for iframe code.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="anonymous" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="anonymous-link">Anonymous Link</Label>
              <div className="flex space-x-2">
                <Input id="anonymous-link" value={anonymousLink} onChange={e => setAnonymousLink(e.target.value)} className="flex-1" placeholder="Enter your anonymous link" />
                <Button variant="outline" size="icon" onClick={() => handleCopy(anonymousLink)}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setShowQR(showQR === 'anonymous' ? null : 'anonymous')}>
                  <QrCode className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Share content anonymously without revealing your identity.
              </p>
            </div>
          </TabsContent>

          {showQR && canGenerateQR && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-medium mb-4">QR Code</h3>
              <QRCodeGenerator text={getCurrentLink()} onClose={() => setShowQR(null)} />
            </div>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LinkShareModal;
