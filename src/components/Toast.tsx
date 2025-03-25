import { motion, AnimatePresence } from 'framer-motion';
import { ToastMessage } from '../types/api';
import { useEffect } from 'react';

interface ToastProps {
  toast: ToastMessage | null;
  onClose?: () => void;
}

const Toast = ({ toast, onClose }: ToastProps) => {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, x: 20 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={`fixed bottom-4 right-4 px-6 py-4 rounded-2xl backdrop-blur-sm ${
            toast.type === 'success' 
              ? 'bg-green-50/90 text-green-800 shadow-[4px_4px_10px_0_rgba(0,128,0,0.1),-4px_-4px_10px_0_rgba(255,255,255,0.9)]' 
              : 'bg-red-50/90 text-red-800 shadow-[4px_4px_10px_0_rgba(255,0,0,0.1),-4px_-4px_10px_0_rgba(255,255,255,0.9)]'
          } flex items-center space-x-3 min-w-[300px] cursor-pointer hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] transition-all`}
          onClick={onClose}
        >
          <span className={`text-2xl w-8 h-8 flex items-center justify-center rounded-full ${
            toast.type === 'success'
              ? 'bg-green-100/80 shadow-[2px_2px_4px_rgba(0,128,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.9)]'
              : 'bg-red-100/80 shadow-[2px_2px_4px_rgba(255,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.9)]'
          }`}>
            {toast.type === 'success' ? '✅' : '❌'}
          </span>
          <p className="flex-1">{toast.message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast; 