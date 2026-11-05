import React from 'react';
import { Sprout } from 'lucide-react';

interface CropLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
  sublabel?: string;
}

/**
 * CropLoader - Replaces generic circular spinners and buffering circles with an
 * authentic agricultural crop seedling / sprout icon with smooth rotational and pulse animation.
 */
export const CropLoader: React.FC<CropLoaderProps> = ({
  size = 'md',
  className = '',
  label,
  sublabel,
}) => {
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  }[size];

  const boxSizes = {
    sm: 'p-1.5',
    md: 'p-2.5',
    lg: 'p-3.5',
    xl: 'p-5',
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center gap-2.5 text-center ${className}`}>
      <div className="relative inline-flex items-center justify-center">
        {/* Soft emerald radial glow */}
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md animate-pulse pointer-events-none" />
        {/* Crop Sprout Icon with calm rotational animation */}
        <div className={`relative ${boxSizes} rounded-2xl bg-emerald-950/80 border border-emerald-400/50 shadow-md flex items-center justify-center`}>
          <Sprout className={`${iconSizes} text-emerald-400 animate-crop-spin`} />
        </div>
      </div>
      {label && (
        <span className="text-xs sm:text-sm font-bold text-gray-800 dark:text-emerald-100 font-mono tracking-wide">
          {label}
        </span>
      )}
      {sublabel && (
        <span className="text-[11px] text-gray-500 max-w-xs leading-tight">
          {sublabel}
        </span>
      )}
    </div>
  );
};

/**
 * InlineCropSpinner - A drop-in replacement for inline `<Loader2 className="... animate-spin" />`
 */
export const InlineCropSpinner: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <Sprout className={`animate-crop-spin text-emerald-500 shrink-0 ${className}`} />
);
