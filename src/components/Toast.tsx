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
          className={`fixed bottom-4 right-4 px-6 py-4 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white flex items-center space-x-3 min-w-[300px] cursor-pointer`}
          onClick={onClose}
        >
          <span className="text-2xl">
            {toast.type === 'success' ? '✅' : '❌'}
          </span>
          <p className="flex-1">{toast.message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast; 