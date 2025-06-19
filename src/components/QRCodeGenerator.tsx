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
const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  text,
  onClose
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const {
    toast
  } = useToast();
  useEffect(() => {
    generateQRCode();
  }, [text]);
  const generateQRCode = async () => {
    if (!canvasRef.current) return;
    try {
      await QRCode.toCanvas(canvasRef.current, text, {
        width: 180,
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
        variant: "destructive"
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
      description: "QR code has been downloaded."
    });
  };
  const copyQRCode = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(blob => {
        if (blob) {
          const item = new ClipboardItem({
            'image/png': blob
          });
          navigator.clipboard.write([item]);
          toast({
            title: "Copied",
            description: "QR code has been copied to clipboard."
          });
        }
      });
    } catch (error) {
      console.error('Error copying QR code:', error);
      toast({
        title: "Error",
        description: "Failed to copy QR code.",
        variant: "destructive"
      });
    }
  };
  return <div className="flex justify-center">
      <Card className="w-fit border-0 shadow-none bg-transparent">
        <CardContent className="p-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-3 bg-white rounded-lg border shadow-sm">
              <canvas ref={canvasRef} className="block" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={downloadQRCode} className="flex items-center gap-2 h-8 px-3">
                <Download className="w-3 h-3" />
                Download
              </Button>
              <Button variant="outline" size="sm" onClick={copyQRCode} className="flex items-center gap-2 h-8 px-3">
                <Copy className="w-3 h-3" />
                Copy
              </Button>
            </div>
            
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default QRCodeGenerator;