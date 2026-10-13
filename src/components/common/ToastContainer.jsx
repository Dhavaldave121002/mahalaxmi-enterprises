import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts } = useStore();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full px-4">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let borderClass = 'border-brand-emerald text-emerald-950 bg-white/95';
        let iconColor = 'text-brand-emerald';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          borderClass = 'border-rose-400 text-rose-950 bg-white/95';
          iconColor = 'text-rose-600';
        } else if (toast.type === 'info') {
          Icon = Info;
          borderClass = 'border-brand-indigo text-indigo-950 bg-white/95';
          iconColor = 'text-brand-indigo';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 animate-slide-in ${borderClass}`}
          >
            <div className="flex items-center space-x-3">
              <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
              <p className="text-sm font-medium leading-tight">{toast.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
