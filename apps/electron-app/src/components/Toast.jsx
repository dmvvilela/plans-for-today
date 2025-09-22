import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      {type === 'success' ? (
        <Check size={18} />
      ) : (
        <X size={18} />
      )}
      <span>{message}</span>
    </div>
  );
};

export default Toast;