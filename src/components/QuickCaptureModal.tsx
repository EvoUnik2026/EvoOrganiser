import React, { useState } from 'react';
import { Task, Language } from '../types';
import { TRANSLATIONS } from '../localization/translations';

interface QuickCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTask: (task: Task) => void;
  language: Language;
}

export const QuickCaptureModal: React.FC<QuickCaptureModalProps> = ({
  isOpen,
  onClose,
  onSaveTask,
  language,
}) => {
  const t = TRANSLATIONS[language];

  const [title, setTitle] = useState('Translate privacy policy into Arabic (العربية)');
  const [notes, setNotes] = useState(
    'Align legal definitions with Saudi PDPL guidelines. Cross-check term glossary with localization leads.'
  );
  const [urlPreviewVisible, setUrlPreviewVisible] = useState(true);
  const [selectedSchedule, setSelectedSchedule] = useState<'today' | 'tomorrow' | 'weekend' | 'pick'>('today');
  const [selectedPriority, setSelectedPriority] = useState<'high' | 'medium' | 'low'>('high');
  const [selectedTags, setSelectedTags] = useState<string[]>(['#Localization']);
  const [selectedLocales, setSelectedLocales] = useState<string[]>(['🇸🇦 AR']);
  const [isRecording, setIsRecording] = useState(false);
  const [activeToolbarTip, setActiveToolbarTip] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      completed: false,
      priority: selectedPriority,
      category: selectedTags[0] || '#General',
      dueDateCategory: selectedSchedule === 'today' ? 'today' : 'upcoming',
      dueDateText:
        selectedSchedule === 'today'
          ? 'Today'
          : selectedSchedule === 'tomorrow'
          ? 'Tomorrow'
          : 'This Weekend',
      subtasks: [
        {
          id: `sub-${Date.now()}-1`,
          title: 'Review legal terminology glossary',
          completed: false,
        },
        {
          id: `sub-${Date.now()}-2`,
          title: 'Perform RTL bidirectional flow check',
          completed: false,
        },
      ],
      notes: notes.trim(),
      attachedLinks: urlPreviewVisible
        ? [
            {
              id: `link-${Date.now()}`,
              title: 'Apple HIG Right-to-Left Layouts',
              url: 'https://developer.apple.com/design/human-interface-guidelines',
              domain: 'developer.apple.com',
              description: 'Auto-fetched: Apple HIG Right-to-Left Layouts',
              type: 'doc',
            },
          ]
        : [],
      locales: selectedLocales,
      isRtl: selectedLocales.includes('🇸🇦 AR'),
      dirAttr: selectedLocales.includes('🇸🇦 AR') ? 'dir="rtl"' : undefined,
    };

    onSaveTask(newTask);
    onClose();
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleLocale = (loc: string) => {
    setSelectedLocales((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Main Container */}
      <div className="w-full max-w-xl mx-auto px-4 pb-6 flex flex-col gap-3">
        {/* Ambient Context Behind Card (Tactile Peek) */}
        <div className="bg-slate-100 dark:bg-slate-900/80 rounded-2xl p-3.5 shadow-sm flex items-center justify-between border border-slate-200/60 dark:border-white/[0.06]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-sky-500/15 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            </div>
            <div className="truncate">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {t.inbox}
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                Sprint 14: Localization &amp; Docs
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
            4 Active
          </span>
        </div>

        {/* Bottom Sheet Card */}
        <div className="bg-white dark:bg-[#111319] rounded-3xl shadow-2xl p-4 flex flex-col gap-3.5 border border-slate-200/80 dark:border-white/[0.08] max-h-[85vh] overflow-y-auto no-scrollbar">
          {/* Drag Bar Handle */}
          <div className="w-full flex justify-center py-1">
            <div className="w-10 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
          </div>

          {/* Sheet Header Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="h-10 px-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-sm font-medium"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
              <span>{t.cancel}</span>
            </button>

            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[20px] text-indigo-600 dark:text-indigo-400 material-symbols-fill">
                bolt
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {t.quickCapture}
              </span>
            </div>

            <button
              onClick={handleSave}
              className="h-10 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-indigo-600/30 active:scale-95 transition-all flex items-center gap-1.5"
              type="button"
            >
              <span>{t.saveTask}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
            </button>
          </div>

          {/* Main Input Card */}
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-3.5 flex flex-col gap-2.5 border border-slate-200/50 dark:border-white/[0.06]">
            {/* Title Input */}
            <input
              autoFocus
              className="w-full bg-transparent border-0 text-lg font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
              placeholder={t.taskTitlePlaceholder}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Notes Textarea */}
            <textarea
              className="w-full bg-transparent border-0 text-sm text-slate-600 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none resize-none leading-relaxed"
              placeholder={t.notesPlaceholder}
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            {/* Instant Extracted URL Preview Card */}
            {urlPreviewVisible && (
              <div className="bg-slate-200/70 dark:bg-slate-800/80 rounded-xl p-2.5 flex flex-col gap-2 shadow-sm border border-slate-300/40 dark:border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-md bg-white dark:bg-slate-900 flex items-center justify-center shrink-0 shadow-xs text-indigo-600 dark:text-indigo-400">
                      <span className="material-symbols-outlined text-[15px]">file_download</span>
                    </div>
                    <span className="text-xs text-sky-600 dark:text-sky-400 font-medium truncate">
                      https://developer.apple.com/design/human-interface-guidelines
                    </span>
                  </div>
                  <button
                    onClick={() => setUrlPreviewVisible(false)}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </div>

                {/* Auto-fetched preview pill */}
                <div className="bg-white dark:bg-slate-900 rounded-lg p-2 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-[16px] text-amber-500 material-symbols-fill">
                      auto_awesome
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {t.autoFetchedPreview}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 px-2 py-0.5 rounded-full shrink-0">
                    {t.docLink}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Schedule & Context Pills */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
              {t.scheduleAndContext}
            </span>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              <button
                type="button"
                onClick={() => setSelectedSchedule('today')}
                className={`shrink-0 h-8 px-3 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                  selectedSchedule === 'today'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                <span>{t.today}</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedSchedule('tomorrow')}
                className={`shrink-0 h-8 px-3 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                  selectedSchedule === 'tomorrow'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>{t.tomorrow}</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedSchedule('weekend')}
                className={`shrink-0 h-8 px-3 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                  selectedSchedule === 'weekend'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>{t.thisWeekend}</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedSchedule('pick')}
                className={`shrink-0 h-8 px-3 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                  selectedSchedule === 'pick'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">date_range</span>
                <span>{t.pickDate}</span>
              </button>
            </div>
          </div>

          {/* Attributes & Locale */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
              {t.attributesAndLocale}
            </span>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {/* Priority */}
              <button
                type="button"
                onClick={() =>
                  setSelectedPriority(selectedPriority === 'high' ? 'medium' : 'high')
                }
                className={`shrink-0 h-8 px-3 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                  selectedPriority === 'high'
                    ? 'bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-300 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                <span>{t.highPriority}</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPriority('medium')}
                className={`shrink-0 h-8 px-3 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                  selectedPriority === 'medium'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>{t.medium}</span>
              </button>

              {/* Tags */}
              <button
                type="button"
                onClick={() => toggleTag('#Localization')}
                className={`shrink-0 h-8 px-3 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                  selectedTags.includes('#Localization')
                    ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-600'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>#Localization</span>
              </button>

              <button
                type="button"
                onClick={() => toggleTag('#Legal')}
                className={`shrink-0 h-8 px-3 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                  selectedTags.includes('#Legal')
                    ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-600'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>#Legal</span>
              </button>

              {/* Locale Badges */}
              <button
                type="button"
                onClick={() => toggleLocale('🇸🇦 AR')}
                className={`shrink-0 h-8 px-3 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                  selectedLocales.includes('🇸🇦 AR')
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-600'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>🇸🇦 AR</span>
              </button>

              <button
                type="button"
                onClick={() => toggleLocale('🇬🇧 EN')}
                className={`shrink-0 h-8 px-3 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                  selectedLocales.includes('🇬🇧 EN')
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-600'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>🇬🇧 EN</span>
              </button>

              <button
                type="button"
                onClick={() => toggleLocale('🇳🇱 NL')}
                className={`shrink-0 h-8 px-3 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                  selectedLocales.includes('🇳🇱 NL')
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-600'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>🇳🇱 NL</span>
              </button>
            </div>
          </div>

          {/* Quick Capture Inspiration Card */}
          <div className="bg-slate-100 dark:bg-slate-800/80 rounded-2xl p-3 flex items-center gap-3 border border-slate-200/50 dark:border-white/[0.06]">
            <div className="w-11 h-11 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400 shadow-sm">
              <span className="material-symbols-outlined text-[24px]">translate</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {t.arabicRtlSupport}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                {t.arabicRtlSupportDesc}
              </span>
            </div>
          </div>

          {/* Toolbar with Attachments and Voice Input */}
          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/60 rounded-2xl px-2 py-1.5 border border-slate-200/50 dark:border-white/[0.06]">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setUrlPreviewVisible(!urlPreviewVisible)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                title="Attach Link"
              >
                <span className="material-symbols-outlined text-[20px]">link</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setNotes((n) => n + '\n- Added review checkpoint');
                  setActiveToolbarTip('Appended note line');
                  setTimeout(() => setActiveToolbarTip(null), 1500);
                }}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                title="Add Detailed Note"
              >
                <span className="material-symbols-outlined text-[20px]">note_alt</span>
              </button>

              <button
                type="button"
                onClick={() => toggleTag('#Legal')}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                title="Add Tag"
              >
                <span className="material-symbols-outlined text-[20px]">label</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedSchedule('pick')}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                title="Set Reminder"
              >
                <span className="material-symbols-outlined text-[20px]">alarm</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setNotes((n) => n + '\n[ ] Checklist item 1');
                  setActiveToolbarTip('Added checklist');
                  setTimeout(() => setActiveToolbarTip(null), 1500);
                }}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                title="Checklist"
              >
                <span className="material-symbols-outlined text-[20px]">checklist</span>
              </button>

              {activeToolbarTip && (
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium px-2 animate-fade-in">
                  {activeToolbarTip}
                </span>
              )}
            </div>

            {/* Voice Input Mic Pill */}
            <button
              type="button"
              onClick={() => {
                setIsRecording(!isRecording);
                if (!isRecording) {
                  setTitle((t) => t + ' - Audio reviewed');
                }
              }}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
                  : 'bg-slate-200 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 hover:bg-slate-300'
              }`}
              title={isRecording ? 'Listening...' : 'Voice Dictate'}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isRecording ? 'graphic_eq' : 'mic'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
