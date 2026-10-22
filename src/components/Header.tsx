import React from 'react';
import { UserProfile, Language } from '../types';
import { TabType } from './BottomNav';
import { TRANSLATIONS } from '../localization/translations';

interface HeaderProps {
  title: string;
  isSubScreen?: boolean;
  onBack?: () => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  onOpenQuickCapture: () => void;
  onOpenOnboarding: () => void;
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  user: UserProfile;
  language: Language;
  onToggleLang?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  isSubScreen = false,
  onBack,
  onOpenSearch,
  onOpenProfile,
  onOpenQuickCapture,
  onOpenOnboarding,
  currentTab,
  onSelectTab,
  user,
  language,
}) => {
  const isRtl = language === 'ar';
  const t = TRANSLATIONS[language];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#faf8ff]/90 dark:bg-[#0c0e14]/90 backdrop-blur-xl pt-safe border-b border-slate-200/70 dark:border-white/[0.08] shadow-[0_1px_8px_rgba(0,0,0,0.03)] transition-colors">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left Slot: Back Button, Brand & Logo */}
        <div className="flex items-center gap-3 min-w-0">
          {isSubScreen && onBack ? (
            <button
              onClick={onBack}
              aria-label="Go back"
              className="w-10 h-10 -ml-1.5 flex items-center justify-center rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/10 active:scale-95 transition-all shrink-0"
            >
              <span className="material-symbols-outlined text-[24px]">
                {isRtl ? 'arrow_forward' : 'arrow_back'}
              </span>
            </button>
          ) : null}

          <div
            onClick={() => onSelectTab('tasks')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1W6HSrBVEGa8ZEAKVRdXnhIfbhUsLFU3isqT1IMk6ZUiWbiUCXo0QeiP8Mr9ftY5q6-jc0J-rmbQjXY6XLDFgaY-Lmtr-ZxrRIs3SNys1Ca8K77ytmSnIMzQBpcnNT4zScYjlRZhNp7GnqNau4igKg71E_nB8T8vrIvsG0WR0Wh7bA62BxYuCZbDGBo17HMbemj5y-g9sDQ_BNtHSBSAhIq-HS_gzDdGLqgGXBdVh0DIsKR4vgZpKjLLuy0"
              alt="TaskFlow Logo"
              className="h-8 w-auto object-contain drop-shadow-[0_0_8px_rgba(99,102,241,0.3)] group-hover:scale-105 transition-transform"
            />

            {!isSubScreen && (
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">
                    TaskFlow
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[9px] font-semibold leading-tight">
                    EN · NL · AR
                  </span>
                </div>
                <h1 className="text-base font-bold text-slate-900 dark:text-white truncate leading-tight md:hidden">
                  {title}
                </h1>
              </div>
            )}
          </div>
        </div>

        {/* Center Slot: Desktop Navigation Tabs (visible on md: screens and above) */}
        {!isSubScreen && (
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/80 p-1.5 rounded-2xl border border-slate-200/60 dark:border-white/[0.06]">
            <button
              onClick={() => onSelectTab('tasks')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentTab === 'tasks'
                  ? 'bg-white dark:bg-[#111319] text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>{t.tasks}</span>
            </button>

            <button
              onClick={() => onSelectTab('notes-and-links')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentTab === 'notes-and-links'
                  ? 'bg-white dark:bg-[#111319] text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">bookmarks</span>
              <span>{t.notesAndLinks}</span>
            </button>

            <button
              onClick={() => onSelectTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentTab === 'settings'
                  ? 'bg-white dark:bg-[#111319] text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>{t.settings}</span>
            </button>
          </nav>
        )}

        {/* Right Slot: Actions, Onboarding Guide, Search & Profile */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Desktop Quick Capture Button */}
          <button
            onClick={onOpenQuickCapture}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>{t.newTask}</span>
          </button>

          {/* Onboarding Tour / Guide Button */}
          <button
            onClick={onOpenOnboarding}
            title="App Tour & Tutorial"
            aria-label="App Tour & Tutorial"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200/60 dark:hover:bg-white/10 text-xs font-semibold transition-all"
          >
            <span className="material-symbols-outlined text-[20px] text-indigo-600 dark:text-indigo-400 material-symbols-fill">
              help
            </span>
            <span className="hidden lg:inline">Tour</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            aria-label="Search Workspace"
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={onOpenProfile}
            aria-label="User Profile"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full relative p-0.5 overflow-hidden ring-2 ring-indigo-500/30 hover:ring-indigo-500 transition-all active:scale-95 shrink-0"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover rounded-full"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
