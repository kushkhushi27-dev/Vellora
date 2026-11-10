import React, { useState } from 'react';
import { Eye, EyeOff, AlertTriangle } from 'lucide-react';

interface SpoilerShieldProps {
  children: React.ReactNode;
  label?: string;
  defaultRevealed?: boolean;
  className?: string;
}

export const SpoilerShield: React.FC<SpoilerShieldProps> = ({
  children,
  label = 'Potential Plot Spoilers Ahead',
  defaultRevealed = false,
  className = '',
}) => {
  const [revealed, setRevealed] = useState(defaultRevealed);

  if (revealed) {
    return (
      <div className={`relative rounded-xl border border-vellora-gold/30 bg-vellora-gold/5 p-4 transition-all ${className}`}>
        <div className="flex items-center justify-between pb-2 border-b border-vellora-gold/15 mb-2 text-xs text-vellora-gold font-medium">
          <span className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-vellora-gold" /> Spoiler Revealed
          </span>
          <button
            onClick={() => setRevealed(false)}
            className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-vellora-gold transition-colors"
          >
            <EyeOff className="w-3 h-3" /> Hide Spoiler
          </button>
        </div>
        <div className="text-sm text-gray-200 leading-relaxed">{children}</div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setRevealed(true)}
      className={`group relative overflow-hidden rounded-xl border border-dashed border-vellora-gold/40 bg-[#0F1115]/90 p-5 text-center cursor-pointer transition-all hover:border-vellora-gold hover:bg-[#13171F] ${className}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setRevealed(true);
        }
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-vellora-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10 flex flex-col items-center justify-center gap-2">
        <div className="w-8 h-8 rounded-full bg-vellora-gold/15 flex items-center justify-center text-vellora-gold group-hover:scale-110 transition-transform">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-vellora-gold">
          {label}
        </p>
        <p className="text-[11px] text-gray-400 flex items-center gap-1">
          <Eye className="w-3 h-3 text-vellora-gold" /> Click to unveil guarded marginalia
        </p>
      </div>
    </div>
  );
};

