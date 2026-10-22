import React, { useState, useEffect } from 'react';
import {
  Task,
  LibraryItem,
  UserProfile,
  AppSettings,
  Language,
} from './types';
import {
  INITIAL_TASKS,
  INITIAL_LIBRARY_ITEMS,
  INITIAL_USER,
  INITIAL_SETTINGS,
} from './data/initialData';
import { TRANSLATIONS } from './localization/translations';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { TasksScreen } from './components/TasksScreen';
import { TaskDetailScreen } from './components/TaskDetailScreen';
import { NotesAndLinksScreen } from './components/NotesAndLinksScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { QuickCaptureModal } from './components/QuickCaptureModal';
import { SearchModal } from './components/SearchModal';
import { ProfileModal } from './components/ProfileModal';
import { OnboardingModal } from './components/OnboardingModal';
import { ArabicTypographyLabModal } from './components/ArabicTypographyLabModal';
import { Toast } from './components/Toast';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>(INITIAL_LIBRARY_ITEMS);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [settings, setSettings] = useState<AppSettings>(INITIAL_SETTINGS);

  const [currentTab, setCurrentTab] = useState<TabType>('tasks');
  const [activeDetailTask, setActiveDetailTask] = useState<Task | null>(null);

  const [isQuickCaptureOpen, setIsQuickCaptureOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isArabicLabOpen, setIsArabicLabOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem('taskflow_onboarded') !== 'true';
    } catch {
      return true;
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastActionText, setToastActionText] = useState<string | undefined>(undefined);
  const [toastAction, setToastAction] = useState<(() => void) | undefined>(undefined);

  // Sync theme, RTL attribute, and Arabic font with document
  useEffect(() => {
    const isRtl = settings.language === 'ar' && settings.autoRtl;
    if (isRtl) {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }

    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (settings.theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [settings.language, settings.autoRtl, settings.theme]);

  const showToast = (msg: string, actionTxt?: string, onAct?: () => void) => {
    setToastMessage(msg);
    setToastActionText(actionTxt);
    setToastAction(() => onAct);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Task actions
  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
    if (activeDetailTask && activeDetailTask.id === taskId) {
      setActiveDetailTask((prev) => (prev ? { ...prev, completed: !prev.completed } : null));
    }
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    setActiveDetailTask(updatedTask);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    setActiveDetailTask(null);
    showToast('Task deleted');
  };

  const handleDuplicateTask = (taskToDup: Task) => {
    const cloned: Task = {
      ...taskToDup,
      id: `task-${Date.now()}`,
      title: `${taskToDup.title} (Copy)`,
      completed: false,
    };
    setTasks((prev) => [cloned, ...prev]);
    showToast('Task cloned successfully to today\'s workspace.');
  };

  const handleSaveQuickCaptureTask = (newTask: Task) => {
    setTasks((prev) => [newTask, ...prev]);
    showToast(
      `Task captured to ${newTask.category}!`,
      'View',
      () => {
        setActiveDetailTask(newTask);
      }
    );
  };

  // Library actions
  const handleToggleStar = (itemId: string) => {
    setLibraryItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, starred: !i.starred } : i))
    );
  };

  const handleAddLibraryItem = (newItem: LibraryItem) => {
    setLibraryItems((prev) => [newItem, ...prev]);
  };

  // Cycle language quick toggle
  const cycleLanguage = () => {
    const langs: Language[] = ['en', 'nl', 'ar'];
    const nextIdx = (langs.indexOf(settings.language) + 1) % langs.length;
    const nextLang = langs[nextIdx];
    setSettings((prev) => ({ ...prev, language: nextLang }));
    showToast(
      nextLang === 'ar'
        ? 'تم تفعيل اللغة العربية'
        : nextLang === 'nl'
        ? 'Nederlands geactiveerd'
        : 'English activated'
    );
  };

  const handleCloseOnboarding = () => {
    setIsOnboardingOpen(false);
    try {
      localStorage.setItem('taskflow_onboarded', 'true');
    } catch {
      // Ignore
    }
  };

  const handleSetArabicFont = (font: 'noto' | 'cairo' | 'ibm') => {
    setSettings((prev) => ({ ...prev, arabicFont: font }));
  };

  // Determine active arabic font class
  const activeArabicFontClass =
    settings.arabicFont === 'cairo'
      ? 'font-cairo'
      : settings.arabicFont === 'ibm'
      ? 'font-ibm-plex'
      : 'font-noto-arabic';

  // Screen header title
  const t = TRANSLATIONS[settings.language];
  let pageTitle = t.tasks;
  if (activeDetailTask) {
    pageTitle = 'Task Detail';
  } else if (currentTab === 'notes-and-links') {
    pageTitle = t.notesAndLinks;
  } else if (currentTab === 'settings') {
    pageTitle = t.settings;
  }

  return (
    <div
      className={`min-h-screen bg-[#faf8ff] dark:bg-[#0c0e14] text-slate-900 dark:text-slate-100 transition-colors flex flex-col font-sans ${
        settings.language === 'ar' ? activeArabicFontClass : ''
      }`}
    >
      {/* Top Header */}
      <Header
        title={pageTitle}
        isSubScreen={!!activeDetailTask}
        onBack={() => setActiveDetailTask(null)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenQuickCapture={() => setIsQuickCaptureOpen(true)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setActiveDetailTask(null);
        }}
        user={user}
        language={settings.language}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-16">
        {activeDetailTask ? (
          <TaskDetailScreen
            task={activeDetailTask}
            onBack={() => setActiveDetailTask(null)}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onDuplicateTask={handleDuplicateTask}
            language={settings.language}
            showToast={showToast}
          />
        ) : (
          <>
            {currentTab === 'tasks' && (
              <TasksScreen
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onSelectTask={(task) => {
                  if (task.id === 'task-2') {
                    // Also give option to inspect lab
                    setActiveDetailTask(task);
                  } else {
                    setActiveDetailTask(task);
                  }
                }}
                onOpenQuickCapture={() => setIsQuickCaptureOpen(true)}
                onOpenArabicLab={() => setIsArabicLabOpen(true)}
                language={settings.language}
                onCycleLanguage={cycleLanguage}
                showToast={showToast}
              />
            )}

            {currentTab === 'notes-and-links' && (
              <NotesAndLinksScreen
                items={libraryItems}
                onToggleStar={handleToggleStar}
                onAddItem={handleAddLibraryItem}
                language={settings.language}
                showToast={showToast}
              />
            )}

            {currentTab === 'settings' && (
              <SettingsScreen
                user={user}
                settings={settings}
                onUpdateSettings={(newS) => setSettings(newS)}
                onUpdateUser={(newU) => setUser(newU)}
                onOpenOnboarding={() => setIsOnboardingOpen(true)}
                onOpenArabicLab={() => setIsArabicLabOpen(true)}
                showToast={showToast}
              />
            )}
          </>
        )}
      </main>

      {/* Bottom Tab Bar (shown only on mobile viewports) */}
      {!activeDetailTask && (
        <BottomNav
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            setActiveDetailTask(null);
          }}
          onOpenQuickCapture={() => setIsQuickCaptureOpen(true)}
          language={settings.language}
        />
      )}

      {/* User Onboarding Flow Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={handleCloseOnboarding}
        language={settings.language}
        onSelectLanguage={(lang) => {
          setSettings((prev) => ({ ...prev, language: lang }));
        }}
        showToast={showToast}
      />

      {/* Arabic RTL Typography & BiDi Lab Modal */}
      <ArabicTypographyLabModal
        isOpen={isArabicLabOpen}
        onClose={() => setIsArabicLabOpen(false)}
        language={settings.language}
        currentFont={settings.arabicFont || 'noto'}
        onSetArabicFont={handleSetArabicFont}
        showToast={showToast}
      />

      {/* Quick Capture Bottom Sheet Modal */}
      <QuickCaptureModal
        isOpen={isQuickCaptureOpen}
        onClose={() => setIsQuickCaptureOpen(false)}
        onSaveTask={handleSaveQuickCaptureTask}
        language={settings.language}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tasks={tasks}
        items={libraryItems}
        onSelectTask={(task) => setActiveDetailTask(task)}
        language={settings.language}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onUpdateUser={(updated) => setUser(updated)}
        language={settings.language}
        showToast={showToast}
      />

      {/* Floating Tactical Toast */}
      <Toast
        message={toastMessage}
        actionText={toastActionText}
        onAction={toastAction}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
