'use client';

import React from 'react';

interface TransparentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const TransparentPopup = ({ 
  isOpen, 
  onClose, 
  children 
}: TransparentPopupProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white/5 backdrop-blur-lg border border-white/30 rounded-xl max-w-5xl w-full h-full p-8 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl transition-colors"
        >
          ×
        </button>
        
        {/* Content container with full height */}
        <div className="text-gray-100 [&>*]:text-current space-y-6 h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};