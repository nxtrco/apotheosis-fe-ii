'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'; // adjust import if needed
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

interface VehicleSummaryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  markdown: string;
}

export function VehicleSummaryModal({ open, onOpenChange, title, markdown }: VehicleSummaryModalProps) {
  const [copied, setCopied] = useState(false);

  const markdownToPlainText = (md: string): string => {
    let text = md;
    // Remove fenced code block markers but keep content
    text = text.replace(/```[\s\S]*?```/g, (block) => block.replace(/```/g, ''));
    // Inline code: `code` -> code
    text = text.replace(/`([^`]*)`/g, '$1');
    // Headings: remove leading # markers
    text = text.replace(/^#{1,6}\s*/gm, '');
    // Images: ![alt](url) -> alt
    text = text.replace(/!\[([^\]]*)\]\([^\)]*\)/g, '$1');
    // Links: [text](url) -> text
    text = text.replace(/\[([^\]]+)\]\([^\)]*\)/g, '$1');
    // Bold/italic: **strong** or *em* -> plain
    text = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
    text = text.replace(/(\*|_)(.*?)\1/g, '$2');
    // Blockquotes: > quote -> quote
    text = text.replace(/^\s{0,3}>\s?/gm, '');
    // Lists: remove bullet/number markers
    text = text.replace(/^\s*([-+*])\s+/gm, '');
    text = text.replace(/^\s*\d+\.\s+/gm, '');
    // Horizontal rules
    text = text.replace(/^\s*(-{3,}|\*{3,}|_{3,})\s*$/gm, '');
    // Trim trailing spaces on lines
    text = text.replace(/[ \t]+$/gm, '');
    // Collapse excessive blank lines
    text = text.replace(/\n{3,}/g, '\n\n');
    return text.trim();
  };

  const handleCopy = () => {
    const plain = markdownToPlainText(markdown);
    navigator.clipboard.writeText(plain);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full bg-white/95 backdrop-blur-sm border border-slate-200 shadow-2xl rounded-2xl p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-slate-900">
            {title || 'Vehicle Summary'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-end mb-6">
          <Button
            size="sm"
            onClick={handleCopy}
            className="bg-slate-900 hover:bg-slate-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {copied ? (
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4" /> Copied!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Copy className="h-4 w-4" /> Copy Report
              </span>
            )}
          </Button>
        </div>
        
        <div className="prose prose-slate max-w-none overflow-y-auto rounded-xl bg-slate-50 p-6 border border-slate-200 text-slate-900" style={{ maxHeight: '60vh' }}>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </DialogContent>
    </Dialog>
  );
}
