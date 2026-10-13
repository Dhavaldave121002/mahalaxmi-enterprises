import React, { useState } from 'react';
import { MessageCircle, X, Send, CheckCircle2, Sparkles, FileText, Package } from 'lucide-react';

export const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const WHATSAPP_NUMBER = '919876543210'; // Representative WhatsApp Business number

  const quickPrompts = [
    { label: '📦 Bulk Rate Sheet (50+ pcs)', text: 'Hello Mahalaxmi Enterprises! Please share the Wholesale Bulk Rate Sheet & GST catalog.' },
    { label: '🧵 Fabric Swatch Kit', text: 'Namaste! I would like to request a free Fabric & Towel Swatch Sample Kit for my store.' },
    { label: '🚚 Check Dispatch Status', text: 'Hi, I need assistance tracking my recent textile order dispatch from your mill.' },
    { label: '💬 Talk to Mill Specialist', text: 'Hello, I have a custom sizing / embroidery requirement for hotel linens.' }
  ];

  const handleSend = (textToSend) => {
    const finalMsg = textToSend || message || 'Hello Mahalaxmi Enterprises! I am interested in your direct mill textile products.';
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMsg)}`;
    window.open(url, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans print:hidden">
      {/* Expanded Chat Popover */}
      {isOpen && (
        <div className="mb-3 w-[330px] sm:w-[360px] bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-xl font-bold border border-white/30">
                  ML
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h4 className="font-semibold text-sm leading-tight flex items-center gap-1.5">
                  Mahalaxmi Mill Desk
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                </h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                  Replies in &lt; 5 minutes • Loom Direct
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-slate-50 space-y-3 max-h-[340px] overflow-y-auto text-xs">
            {/* Greeting Balloon */}
            <div className="bg-white p-3 rounded-xl rounded-tl-sm shadow-sm border border-slate-100 text-slate-700 leading-relaxed">
              <p className="font-medium text-slate-900 mb-1">🙏 Namaste!</p>
              <p>Welcome to <strong>Mahalaxmi Enterprises</strong>. Need instant wholesale pricing, GST invoice assistance, or loom dispatch queries?</p>
            </div>

            {/* Quick Action Chips */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Quick Inquiries
              </p>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt.text)}
                  className="w-full text-left px-3 py-2 bg-white hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-800 border border-slate-200/90 rounded-lg text-slate-700 transition-all text-xs font-medium flex items-center justify-between group shadow-2xs"
                >
                  <span>{prompt.label}</span>
                  <Send className="w-3 h-3 opacity-0 group-hover:opacity-100 text-emerald-600 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(message);
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your textile inquiry..."
              className="flex-1 text-xs px-3 py-2 bg-slate-100 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 placeholder-slate-400"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors shadow-sm"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
        aria-label="Open WhatsApp Support"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-7 h-7 group-hover:rotate-6 transition-transform" />
            {/* Pulse Indicator */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white text-[9px] text-white font-bold items-center justify-center">1</span>
            </span>
          </>
        )}
      </button>
    </div>
  );
};
