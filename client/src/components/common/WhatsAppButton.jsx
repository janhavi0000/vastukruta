import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const WhatsAppButton = () => {
  const { settings } = useSettings();
  const [showTooltip, setShowTooltip] = useState(false);

  const rawNumber = (settings?.whatsapp || '919823045678').replace(/[^0-9]/g, '');
  const message = encodeURIComponent(
    `Hello Ar. Pranali Ghorpade, I am contacting you from the Vastukruta website regarding a project consultation.`
  );
  const whatsappUrl = `https://wa.me/${rawNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip on hover */}
      <div className="mr-3 hidden md:flex items-center bg-charcoal-dark text-ivory text-xs px-3 py-2 rounded shadow-lg border border-border-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        <span>Connect on WhatsApp with Principal Architect</span>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Ar. Pranali Ghorpade on WhatsApp"
        className="relative flex items-center justify-center w-13 h-13 p-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-ivory"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-taupe rounded-full border-2 border-ivory"></span>
      </a>
    </div>
  );
};

export default WhatsAppButton;
