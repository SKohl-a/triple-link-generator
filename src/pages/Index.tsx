
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import LinkShareModal from '@/components/LinkShareModal';

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Link Sharing Hub</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your content with different types of links. Generate QR codes for iframe and anonymous links.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="text-lg px-8 py-6 h-auto"
            size="lg"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share a Link
          </Button>
          
          <div className="text-sm text-muted-foreground">
            <p>Choose from URL, Iframe, or Anonymous link types</p>
            <p>QR codes available for Iframe and Anonymous links</p>
          </div>
        </div>

        <LinkShareModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </div>
    </div>
  );
};

export default Index;
