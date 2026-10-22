import React, { useState } from 'react';
import { Task, LibraryItem, Language } from '../types';
import { TRANSLATIONS } from '../localization/translations';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  items: LibraryItem[];
  onSelectTask: (task: Task) => void;
  language: Language;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  tasks,
  items,
  onSelectTask,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchingTasks = q
    ? tasks.filter(
        (tk) =>
          tk.title.toLowerCase().includes(q) ||
          tk.category.toLowerCase().includes(q) ||
          (tk.notes && tk.notes.toLowerCase().includes(q))
      )
    : [];

  const matchingItems = q
    ? items.filter(
        (it) =>
          it.title.toLowerCase().includes(q) ||
          (it.content && it.content.toLowerCase().includes(q)) ||
          it.tags.some((tg) => tg.toLowerCase().includes(q))
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm flex flex-col justify-start p-4 pt-12 animate-in fade-in duration-150">
      <div className="w-full max-w-xl mx-auto bg-white dark:bg-[#111319] rounded-2xl shadow-2xl border border-slate-200/80 dark:border-white/[0.08] overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-slate-200/70 dark:border-white/[0.06] flex items-center gap-3">
          <span className="material-symbols-outlined text-[22px] text-indigo-600 dark:text-indigo-400">
            search
          </span>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchWorkspacePlaceholder}
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
          >
            Esc
          </button>
        </div>

        {/* Results Area */}
        <div className="p-3 overflow-y-auto no-scrollbar flex flex-col gap-3">
          {!q && (
            <div className="py-8 text-center text-slate-400 text-xs">
              Type keywords to search tasks, documents, tags, or links.
            </div>
          )}

          {q && matchingTasks.length === 0 && matchingItems.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-xs">
              No matching results found for &quot;{query}&quot;.
            </div>
          )}

          {matchingTasks.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-2">
                Tasks ({matchingTasks.length})
              </p>
              <div className="space-y-1.5">
                {matchingTasks.map((tk) => (
                  <button
                    key={tk.id}
                    onClick={() => {
                      onSelectTask(tk);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-[18px] text-indigo-600 dark:text-indigo-400">
                        {tk.completed ? 'task_alt' : 'check_circle'}
                      </span>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {tk.title}
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">
                      {tk.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchingItems.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-2">
                Notes &amp; Links ({matchingItems.length})
              </p>
              <div className="space-y-1.5">
                {matchingItems.map((it) => (
                  <div
                    key={it.id}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-start justify-between gap-2 border border-slate-200/50 dark:border-white/[0.04]"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-sky-500">
                          {it.type === 'link' ? 'link' : 'description'}
                        </span>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                          {it.title}
                        </h4>
                      </div>
                      {it.content && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {it.content}
                        </p>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {it.tags[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
