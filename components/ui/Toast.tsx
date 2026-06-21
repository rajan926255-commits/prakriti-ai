'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type = 'info', isVisible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    error: <AlertTriangle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-amber-500" />
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-4 right-4 z-[100] flex items-center gap-3 px-4 py-3 glass-card bg-dark-forest-200/90 shadow-xl border-white/20"
        >
          {icons[type]}
          <span className="text-sm font-medium text-white">{message}</span>
          <button onClick={onClose} aria-label="Close notification" className="p-1 hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <X className="w-4 h-4 text-white/50 hover:text-white" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
