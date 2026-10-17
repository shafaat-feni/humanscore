import React from 'react';

interface AdSlotProps {
  adSlotId?: string;
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ adSlotId, className = '' }) => {
  const adsEnabled = false; // Set to true only after AdSense approval and publisher ID setup

  if (!adsEnabled) {
    return (
      <div className={`border border-dashed border-slate-300 bg-slate-50 rounded-xl p-4 text-center text-xs text-slate-400 ${className}`}>
        [Advertisement Space — Configured for Future AdSense Integration]
      </div>
    );
  }

  return (
    <div className={`ad-container my-4 ${className}`}>
      {/* Inserts legitimate AdSense snippet when enabled */}
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot={adSlotId || 'XXXXXXXXXX'}
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
};