import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../localization/translations';

export type TabType = 'tasks' | 'notes-and-links' | 'settings';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenQuickCapture: () => void;
  language: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenQuickCapture,
  language,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe bg-[#faf8ff]/90 dark:bg-[#0c0e14]/90 backdrop-blur-xl border-t border-slate-200/70 dark:border-white/[0.08] shadow-[0_-4px_24px_rgba(15,23,42,0.06)] transition-colors">
      <div className="h-16 max-w-xl mx-auto px-4 flex items-center justify-between relative">
        {/* Tasks Tab */}
        <button
          onClick={() => onSelectTab('tasks')}
          className={`flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 transition-all ${
            currentTab === 'tasks'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold drop-shadow-[0_0_8px_rgba(99,102,241,0.35)]'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[24px] ${
              currentTab === 'tasks' ? 'material-symbols-fill' : ''
            }`}
          >
            check_circle
          </span>
          <span className="text-[11px] font-medium mt-0.5">{t.tasks}</span>
        </button>

        {/* Notes & Links Tab */}
        <button
          onClick={() => onSelectTab('notes-and-links')}
          className={`flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 transition-all ${
            currentTab === 'notes-and-links'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold drop-shadow-[0_0_8px_rgba(99,102,241,0.35)]'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[24px] ${
              currentTab === 'notes-and-links' ? 'material-symbols-fill' : ''
            }`}
          >
            bookmarks
          </span>
          <span className="text-[11px] font-medium mt-0.5">{t.notesAndLinks}</span>
        </button>

        {/* Floating Raised Action Button for Quick Capture */}
        <div className="flex-1 flex items-center justify-center">
          <button
            onClick={onOpenQuickCapture}
            aria-label={t.quickCapture}
            className="-top-4 relative flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/40 active:scale-90 transition-all border border-white/20 focus:outline-none"
          >
            <span className="material-symbols-outlined text-[28px]">add</span>
          </button>
        </div>

        {/* Settings Tab */}
        <button
          onClick={() => onSelectTab('settings')}
          className={`flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 transition-all ${
            currentTab === 'settings'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold drop-shadow-[0_0_8px_rgba(99,102,241,0.35)]'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[24px] ${
              currentTab === 'settings' ? 'material-symbols-fill' : ''
            }`}
          >
            tune
          </span>
          <span className="text-[11px] font-medium mt-0.5">{t.settings}</span>
        </button>
      </div>
    </nav>
  );
};
