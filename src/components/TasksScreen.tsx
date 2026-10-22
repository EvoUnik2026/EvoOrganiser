import React, { useState } from 'react';
import { Task, Language } from '../types';
import { TRANSLATIONS } from '../localization/translations';

interface TasksScreenProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onSelectTask: (task: Task) => void;
  onOpenQuickCapture: () => void;
  onOpenArabicLab?: () => void;
  language: Language;
  onCycleLanguage: () => void;
  showToast: (msg: string) => void;
}

export const TasksScreen: React.FC<TasksScreenProps> = ({
  tasks,
  onToggleTask,
  onSelectTask,
  onOpenQuickCapture,
  onOpenArabicLab,
  language,
  onCycleLanguage,
  showToast,
}) => {
  const t = TRANSLATIONS[language];
  const [activeFilter, setActiveFilter] = useState<'today' | 'upcoming' | 'all' | 'completed'>('today');
  const [showTip, setShowTip] = useState(true);

  // Dynamic calculations
  const todayTasks = tasks.filter((task) => task.dueDateCategory === 'today');
  const upcomingTasks = tasks.filter((task) => task.dueDateCategory === 'upcoming');
  const completedTasks = tasks.filter((task) => task.completed);
  const remainingToday = todayTasks.filter((t) => !t.completed).length;

  // Filtered list
  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === 'today') return task.dueDateCategory === 'today';
    if (activeFilter === 'upcoming') return task.dueDateCategory === 'upcoming';
    if (activeFilter === 'completed') return task.completed;
    return true; // 'all'
  });

  // Momentum calculation
  const totalPriorities = 4;
  const completedPriorities = tasks.filter((t) => t.completed).length;
  const momentumPercent = Math.min(100, Math.round((completedPriorities / totalPriorities) * 100));
  const radius = 26;
  const circumference = 2 * Math.PI * radius; // ~163.36
  const strokeDashoffset = circumference - (momentumPercent / 100) * circumference;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Column (lg:col-span-7 xl:col-span-8) */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
          {/* Today's Focus Header */}
          <section className="pt-1 pb-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold tracking-wider uppercase">
                  {t.todaysFocus}
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-0.5">
                  {t.thursdayOct24}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {t.tasksRemainingToday.replace('{count}', remainingToday.toString())}
                  </p>
                </div>
              </div>

              <button
                onClick={onCycleLanguage}
                title="Switch Language (EN / NL / AR)"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-200/70 dark:bg-slate-800/80 border border-slate-300/50 dark:border-white/[0.08] text-slate-700 dark:text-slate-200 shadow-sm hover:scale-105 active:scale-95 transition-all shrink-0"
              >
                <span className="material-symbols-outlined text-[16px] text-indigo-600 dark:text-indigo-400">
                  translate
                </span>
                <span className="text-xs font-semibold tracking-tight">
                  {language === 'en'
                    ? 'EN · NL · العربية'
                    : language === 'nl'
                    ? 'NL · EN · العربية'
                    : 'العربية · EN · NL'}
                </span>
              </button>
            </div>
          </section>

          {/* On Mobile/Tablet: Daily Momentum Card shows here */}
          <section className="block lg:hidden">
            <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#111319] p-4.5 shadow-[0_2px_12px_rgba(15,23,42,0.06)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] border border-slate-200/80 dark:border-white/[0.08]">
              <div className="flex items-center justify-between">
                <div className="flex flex-col pr-3 flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-indigo-600 dark:text-indigo-400 material-symbols-fill">
                      verified
                    </span>
                    <span className="text-xs font-semibold text-slate-900 dark:text-white tracking-tight">
                      {t.dailyMomentum}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {t.prioritiesCleared
                      .replace('{completed}', completedPriorities.toString())
                      .replace('{total}', totalPriorities.toString())}
                  </p>
                  <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-semibold">
                      {t.streakDays.replace('{days}', '4')}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-white/[0.06] px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                      {t.aheadBy}
                    </span>
                  </div>
                </div>

                <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                  <svg
                    className="w-16 h-16 transform -rotate-90 drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]"
                    viewBox="0 0 64 64"
                  >
                    <circle
                      className="text-slate-100 dark:text-slate-800"
                      cx="32"
                      cy="32"
                      fill="none"
                      r={radius}
                      stroke="currentColor"
                      strokeWidth="5"
                    />
                    <circle
                      className="text-indigo-600 dark:text-indigo-400 transition-all duration-700 ease-out"
                      cx="32"
                      cy="32"
                      fill="none"
                      r={radius}
                      stroke="currentColor"
                      strokeWidth="5.5"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-base font-bold text-slate-900 dark:text-white leading-none">
                      {momentumPercent}
                      <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">%</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
                <span className="flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[14px] text-indigo-600 dark:text-indigo-400 material-symbols-fill">
                    bolt
                  </span>
                  {t.targetMomentum}
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                  {t.prioritiesLeft.replace('{count}', Math.max(0, totalPriorities - completedPriorities).toString())}
                </span>
              </div>
            </div>
          </section>

          {/* Segmented Filter Tabs */}
          <section className="w-full">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <button
                onClick={() => setActiveFilter('today')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-all ${
                  activeFilter === 'today'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-200/70 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                <span>{t.todayTab}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                    activeFilter === 'today'
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-300/60 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {todayTasks.length}
                </span>
              </button>

              <button
                onClick={() => setActiveFilter('upcoming')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-all ${
                  activeFilter === 'upcoming'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-200/70 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                <span>{t.upcomingTab}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                    activeFilter === 'upcoming'
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-300/60 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {upcomingTasks.length}
                </span>
              </button>

              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-all ${
                  activeFilter === 'all'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-200/70 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                <span>{t.allTasksTab}</span>
              </button>

              <button
                onClick={() => setActiveFilter('completed')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-all ${
                  activeFilter === 'completed'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-200/70 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                <span>{t.completedTab}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                    activeFilter === 'completed'
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-300/60 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {completedTasks.length}
                </span>
              </button>
            </div>
          </section>

          {/* Task Cards List */}
          <section className="flex flex-col gap-3">
            {filteredTasks.length === 0 ? (
              <div className="py-16 text-center text-slate-400 bg-white/50 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-200 dark:border-white/10">
                <span className="material-symbols-outlined text-[40px] mb-2 opacity-50">task</span>
                <p className="text-sm font-medium">No tasks found in this view</p>
              </div>
            ) : (
              filteredTasks.map((task) => {
                const completedSubtasksCount = task.subtasks.filter((s) => s.completed).length;

                return (
                  <div
                    key={task.id}
                    className="group relative bg-white dark:bg-[#111319] rounded-2xl p-4 sm:p-5 shadow-[0_2px_8px_rgba(15,23,42,0.04)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.35)] border border-slate-200/80 dark:border-white/[0.08] hover:border-indigo-400/50 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-3.5">
                      {/* Circular Checkbox */}
                      <button
                        onClick={() => {
                          onToggleTask(task.id);
                          showToast(task.completed ? 'Task reopened' : 'Task completed! Keep up the momentum ✨');
                        }}
                        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                        className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all active:scale-90 ${
                          task.completed
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border-transparent'
                            : 'bg-slate-100 dark:bg-slate-800 text-transparent hover:text-slate-400 border border-slate-300 dark:border-white/20'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[15px] font-bold">check</span>
                      </button>

                      {/* Task Content */}
                      <div className="flex-1 min-w-0">
                        {/* Header Badges */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {task.priority === 'high' && (
                            <span className="px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-[11px] font-semibold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                              {t.highPriority}
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-medium border border-slate-200/50 dark:border-white/[0.06]">
                            {task.category}
                          </span>
                          {task.subtasks.length > 0 && (
                            <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-[11px] font-semibold flex items-center gap-1 border border-indigo-200 dark:border-indigo-500/25">
                              <span className="material-symbols-outlined text-[13px]">checklist</span>
                              {completedSubtasksCount}/{task.subtasks.length} subtasks done
                            </span>
                          )}
                          <span className="text-slate-400 dark:text-slate-500 text-[11px] flex items-center gap-0.5 ml-auto font-medium">
                            {task.time ? (
                              <>
                                <span className="material-symbols-outlined text-[14px]">schedule</span>
                                {task.time}
                              </>
                            ) : (
                              task.dueDateText || 'Tomorrow'
                            )}
                          </span>
                        </div>

                        {/* Task Title (Clickable) */}
                        <button
                          onClick={() => onSelectTask(task)}
                          className="text-left w-full mt-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors focus:outline-none"
                        >
                          <h3
                            className={`text-base font-semibold leading-snug ${
                              task.completed
                                ? 'line-through text-slate-400 dark:text-slate-500'
                                : 'text-slate-900 dark:text-white'
                            }`}
                          >
                            {task.title}
                          </h3>
                        </button>

                        {/* Interactive Badges */}
                        <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                          {task.notes && (
                            <button
                              onClick={() => onSelectTask(task)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/25 text-purple-700 dark:text-purple-300 text-[11px] font-medium hover:scale-105 transition-transform"
                            >
                              <span className="material-symbols-outlined text-[14px]">edit_note</span>
                              <span>Note (2 drafts)</span>
                            </button>
                          )}

                          {task.attachedLinks.length > 0 && (
                            <button
                              onClick={() => onSelectTask(task)}
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-500/25 text-sky-700 dark:text-sky-300 text-[11px] font-medium hover:scale-105 transition-transform"
                            >
                              <span className="material-symbols-outlined text-[14px]">link</span>
                              <span>
                                {task.attachedLinks.map((l) => l.domain.split('/')[0]).join(', ')}
                              </span>
                            </button>
                          )}

                          {task.dirAttr && (
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-mono border border-slate-200/60 dark:border-white/[0.08]">
                              {task.dirAttr}
                            </span>
                          )}

                          {task.isRtl && onOpenArabicLab && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenArabicLab();
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[11px] font-bold shadow-xs hover:bg-indigo-700 transition-colors"
                            >
                              <span className="material-symbols-outlined text-[13px]">science</span>
                              <span>RTL Typography Lab</span>
                            </button>
                          )}

                          {task.locales && task.locales.length > 0 && (
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-medium border border-slate-200/60 dark:border-white/[0.08]">
                              {task.locales.join(' • ')}
                            </div>
                          )}
                        </div>

                        {/* Inline Discussion Snippet */}
                        {task.discussSnippet && (
                          <div className="mt-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/50 dark:border-white/[0.06] flex items-start gap-2">
                            <span className="material-symbols-outlined text-[16px] text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
                              forum
                            </span>
                            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1">
                              {task.discussSnippet}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </section>

          {/* On Mobile: Daily Tip */}
          {showTip && (
            <div className="block lg:hidden mt-2">
              <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-500/20 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                    <span className="material-symbols-outlined text-[20px] material-symbols-fill">
                      auto_awesome
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-white">
                      {t.dailyTipTitle}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{t.dailyTipDesc}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowTip(false)}
                  aria-label="Dismiss tip"
                  className="w-8 h-8 rounded-full bg-white/80 dark:bg-slate-800 border border-slate-200/80 dark:border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors shrink-0 ml-2"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Sidebar (lg:col-span-5 xl:col-span-4): Sticky desktop widgets */}
        <aside className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-4 sticky top-24">
          {/* Daily Momentum Desktop Card */}
          <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#111319] p-5 shadow-sm border border-slate-200/80 dark:border-white/[0.08]">
            <div className="flex items-center justify-between">
              <div className="flex flex-col pr-3 flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[20px] text-indigo-600 dark:text-indigo-400 material-symbols-fill">
                    verified
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                    {t.dailyMomentum}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {t.prioritiesCleared
                    .replace('{completed}', completedPriorities.toString())
                    .replace('{total}', totalPriorities.toString())}
                </p>
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-semibold">
                    {t.streakDays.replace('{days}', '4')}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-white/[0.06] px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                    {t.aheadBy}
                  </span>
                </div>
              </div>

              {/* Progress Ring */}
              <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                <svg
                  className="w-20 h-20 transform -rotate-90 drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]"
                  viewBox="0 0 64 64"
                >
                  <circle
                    className="text-slate-100 dark:text-slate-800"
                    cx="32"
                    cy="32"
                    fill="none"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="5"
                  />
                  <circle
                    className="text-indigo-600 dark:text-indigo-400 transition-all duration-700 ease-out"
                    cx="32"
                    cy="32"
                    fill="none"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="5.5"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-slate-900 dark:text-white leading-none">
                    {momentumPercent}
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">%</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
              <span className="flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[15px] text-indigo-600 dark:text-indigo-400 material-symbols-fill">
                  bolt
                </span>
                {t.targetMomentum}
              </span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                {t.prioritiesLeft.replace('{count}', Math.max(0, totalPriorities - completedPriorities).toString())}
              </span>
            </div>
          </div>

          {/* Daily Mindful Tip Desktop Widget */}
          {showTip && (
            <div className="p-5 rounded-3xl bg-indigo-50/80 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-500/20 flex flex-col gap-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                    <span className="material-symbols-outlined text-[18px] material-symbols-fill">
                      auto_awesome
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {t.dailyTipTitle}
                  </h4>
                </div>
                <button
                  onClick={() => setShowTip(false)}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.dailyTipDesc}
              </p>
            </div>
          )}

          {/* Desktop Quick Capture Launch Widget with hotlinked visual */}
          <div className="rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#111319] shadow-sm flex flex-col">
            <div className="relative h-28 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv16_jcgWkXXNa7OpfllAgzUG5uQRaKdyhRCc_9BHTIQ3ZgIBLRDDwTDP9EIfoxDErBGfB0NVc-FaSaBrau7KsJrrrJgrFXPopBCDRw85C27iSsbv4JeLDdTq432YJNjFzZkxAERzcK9n4WOehe7cvTtu8VmajT1DgQMKyGmABFX8XXxf9j-8Ud25TkUtgY4_mLpFv0EP-fVThLkt0S8a6yB3reBj0ih0dxBKouH2-cimQc4Doz6mtA"
                alt="Figma mobile UI canvas"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-3">
                <span className="text-xs font-bold text-white">Sprint 14: Localization &amp; Docs</span>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-2.5">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Instant task capturing with Apple HIG link previews, audio notes, and multi-locale tagging.
              </p>
              <button
                onClick={onOpenQuickCapture}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Launch Quick Capture</span>
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Floating Action Button (Mobile only) */}
      <div className="sm:hidden fixed bottom-20 z-30 right-4 pointer-events-none">
        <button
          onClick={onOpenQuickCapture}
          className="pointer-events-auto h-12 px-5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/40 border border-white/20 flex items-center gap-2 active:scale-95 transition-all text-sm font-semibold tracking-wide"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          <span>{t.newTask}</span>
        </button>
      </div>
    </div>
  );
};
