'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'; // adjust import if needed
import { Button } from '@/components/ui/button';

interface VehicleSummaryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  markdown: string;
}

export function VehicleSummaryModal({ open, onOpenChange, title, markdown }: VehicleSummaryModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle>{title || 'Vehicle Summary'}</DialogTitle>
        </DialogHeader>
        <div className="flex justify-end mb-2">
          <Button size="sm" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy Markdown'}
          </Button>
        </div>
        <div className="prose max-w-none overflow-y-auto" style={{ maxHeight: '70vh' }}>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
        <DialogClose asChild>
          <Button variant="outline" className="mt-4 w-full">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
