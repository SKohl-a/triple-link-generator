
import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QRCodeGeneratorProps {
  text: string;
  onClose: () => void;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ text, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    generateQRCode();
  }, [text]);

  const generateQRCode = async () => {
    if (!canvasRef.current) return;
    
    try {
      await QRCode.toCanvas(canvasRef.current, text, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      
      const dataUrl = canvasRef.current.toDataURL();
      setQrDataUrl(dataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: "Error",
        description: "Failed to generate QR code.",
        variant: "destructive",
      });
    }
  };

  const downloadQRCode = () => {
    if (!qrDataUrl) return;
    
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrDataUrl;
    link.click();
    
    toast({
      title: "Downloaded",
      description: "QR code has been downloaded.",
    });
  };

  const copyQRCode = async () => {
    if (!canvasRef.current) return;
    
    try {
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          const item = new ClipboardItem({ 'image/png': blob });
          navigator.clipboard.write([item]);
          toast({
            title: "Copied",
            description: "QR code has been copied to clipboard.",
          });
        }
      });
    } catch (error) {
      console.error('Error copying QR code:', error);
      toast({
        title: "Error",
        description: "Failed to copy QR code.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <canvas ref={canvasRef} className="border rounded-lg" />
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={downloadQRCode}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={copyQRCode}
              className="flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Scan this QR code to access the link
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRCodeGenerator;
