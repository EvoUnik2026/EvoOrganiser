import React from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
  actionText?: string;
  onAction?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, actionText, onAction }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 max-w-sm mx-auto bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between z-50 border border-white/10 dark:border-black/10 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
      <div className="flex items-center gap-2.5 min-w-0 pr-2">
        <span className="material-symbols-outlined text-[20px] text-sky-400 dark:text-sky-600 shrink-0 material-symbols-fill">
          check_circle
        </span>
        <span className="text-sm font-medium truncate">{message}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {actionText && (
          <button
            onClick={() => {
              if (onAction) onAction();
              onClose();
            }}
            className="text-indigo-300 dark:text-indigo-600 font-semibold text-xs px-2 py-1 rounded hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
          >
            {actionText}
          </button>
        )}
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white dark:hover:text-slate-900 p-0.5 rounded-full transition-colors"
          aria-label="Dismiss toast"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </div>
  );
};
