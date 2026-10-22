import React, { useState } from 'react';
import { Task, Language } from '../types';
import { TRANSLATIONS } from '../localization/translations';

interface TaskDetailScreenProps {
  task: Task;
  onBack: () => void;
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onDuplicateTask: (task: Task) => void;
  language: Language;
  showToast: (msg: string) => void;
}

export const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({
  task,
  onBack,
  onUpdateTask,
  onDeleteTask,
  onDuplicateTask,
  language,
  showToast,
}) => {
  const t = TRANSLATIONS[language];
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editedNotes, setEditedNotes] = useState(task.notes || '');

  const [isAddingLink, setIsAddingLink] = useState(false);
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkTitle, setNewLinkTitle] = useState('');

  // Subtask progress
  const completedSubtasks = task.subtasks.filter((s) => s.completed).length;
  const totalSubtasks = task.subtasks.length;
  const progressPercent = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  const toggleStatus = () => {
    const updated = { ...task, completed: !task.completed };
    onUpdateTask(updated);
    showToast(updated.completed ? 'Task completed! ✨' : 'Task reopened');
  };

  const toggleSubtask = (subId: string) => {
    const updatedSubtasks = task.subtasks.map((s) =>
      s.id === subId ? { ...s, completed: !s.completed } : s
    );
    onUpdateTask({ ...task, subtasks: updatedSubtasks });
  };

  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) return;
    const newSub = {
      id: `sub-${Date.now()}`,
      title: newSubtaskTitle.trim(),
      completed: false,
    };
    onUpdateTask({ ...task, subtasks: [...task.subtasks, newSub] });
    setNewSubtaskTitle('');
    setIsAddingSubtask(false);
    showToast('Subtask added');
  };

  const handleSaveNotes = () => {
    onUpdateTask({ ...task, notes: editedNotes });
    setIsEditingNotes(false);
    showToast('Notes saved');
  };

  const handleAddLink = () => {
    if (!newLinkUrl.trim()) return;
    let domain = 'web.link';
    try {
      const u = new URL(newLinkUrl.startsWith('http') ? newLinkUrl : `https://${newLinkUrl}`);
      domain = u.hostname;
    } catch {
      domain = newLinkUrl;
    }

    const newLink = {
      id: `link-${Date.now()}`,
      title: newLinkTitle.trim() || domain,
      url: newLinkUrl.startsWith('http') ? newLinkUrl : `https://${newLinkUrl}`,
      domain,
      description: 'Attached reference link',
      type: 'doc' as const,
    };

    onUpdateTask({ ...task, attachedLinks: [...task.attachedLinks, newLink] });
    setNewLinkUrl('');
    setNewLinkTitle('');
    setIsAddingLink(false);
    showToast('Link attached');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-2">
      {/* Top action bar: back, complete, duplicate */}
      <div className="pt-2 pb-3 flex items-center justify-between gap-3 border-b border-slate-200/60 dark:border-white/[0.06] mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors py-1.5 px-2 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back_ios</span>
          <span>{t.backToTasks}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleStatus}
            className={`px-4 py-2 rounded-full text-xs font-semibold shadow-sm active:scale-95 transition-all flex items-center gap-1.5 ${
              task.completed
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                : 'bg-indigo-600 text-white shadow-indigo-600/30'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {task.completed ? 'task_alt' : 'check_circle'}
            </span>
            <span>{task.completed ? t.completed : t.markComplete}</span>
          </button>

          <button
            onClick={() => {
              onDuplicateTask(task);
              showToast('Task cloned successfully');
            }}
            title={t.duplicateTask}
            aria-label={t.duplicateTask}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">content_copy</span>
          </button>
        </div>
      </div>

      {/* Responsive Grid Layout: Left Column (7 cols) / Right Column (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Hero Title & Subtasks Checklist */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Hero Task Title Card */}
          <div className="bg-white dark:bg-[#111319] p-5 sm:p-6 rounded-3xl shadow-sm border border-slate-200/80 dark:border-white/[0.08]">
            <div className="flex items-start gap-3.5">
              <button
                onClick={toggleStatus}
                aria-label="Toggle completed"
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 active:scale-90 transition-all ${
                  task.completed
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-transparent hover:text-slate-400 border border-slate-300 dark:border-white/20'
                }`}
              >
                <span className="material-symbols-outlined text-[18px] font-bold">check</span>
              </button>

              <div className="flex-1 min-w-0">
                <h2
                  className={`text-xl sm:text-2xl font-bold leading-snug transition-all ${
                    task.completed
                      ? 'line-through text-slate-400 dark:text-slate-500'
                      : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {task.title}
                </h2>
              </div>
            </div>

            {/* Priority & Metadata Badges */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {task.priority === 'high' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                  <span>{t.highPriority}</span>
                </div>
              )}

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium border border-slate-200/50 dark:border-white/[0.06]">
                <span className="material-symbols-outlined text-[14px]">notifications_active</span>
                <span>{task.dueDateText || 'Today at 2:00 PM'}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 text-xs font-medium border border-sky-200 dark:border-sky-500/25">
                <span className="material-symbols-outlined text-[14px]">tag</span>
                <span>{task.category || 'Marketing & Localization'}</span>
              </div>
            </div>
          </div>

          {/* Subtasks Section */}
          <div className="bg-white dark:bg-[#111319] p-5 sm:p-6 rounded-3xl shadow-sm border border-slate-200/80 dark:border-white/[0.08]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-indigo-600 dark:text-indigo-400 material-symbols-fill">
                  checklist
                </span>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {t.subtasks}
                </span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {completedSubtasks} of {totalSubtasks}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-indigo-600 dark:bg-indigo-400 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Subtask Items */}
            <div className="flex flex-col gap-2">
              {task.subtasks.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
                >
                  <button
                    onClick={() => toggleSubtask(sub.id)}
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      sub.completed
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-200 dark:bg-slate-800 text-transparent hover:text-slate-400'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                  </button>
                  <span
                    className={`text-sm min-w-0 flex-1 leading-snug ${
                      sub.completed
                        ? 'line-through text-slate-400 dark:text-slate-500'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {sub.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Inline Add Subtask Form */}
            {isAddingSubtask ? (
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-2xl border border-slate-200/60 dark:border-white/[0.08]">
                  <input
                    autoFocus
                    className="bg-transparent px-2.5 py-1 flex-1 text-xs text-slate-900 dark:text-white outline-none"
                    placeholder={t.writeSubtask}
                    type="text"
                    value={newSubtaskTitle}
                    onChange={(e) => setNewSubtaskTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSubtask()}
                  />
                  <button
                    onClick={handleAddSubtask}
                    className="px-3.5 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    {t.add}
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingSubtask(false);
                      setNewSubtaskTitle('');
                    }}
                    className="px-2.5 py-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-white text-xs font-medium"
                  >
                    {t.cancel}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAddingSubtask(true)}
                className="mt-3 flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold text-xs px-3 py-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>{t.addSubtask}</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Rich-Text Notes, Attached Links, Actions */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Rich-Text Notes Section */}
          <div className="bg-white dark:bg-[#111319] p-5 sm:p-6 rounded-3xl shadow-sm border border-slate-200/80 dark:border-white/[0.08]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-amber-600 dark:text-amber-400 material-symbols-fill">
                  notes
                </span>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {t.richTextNotes}
                </span>
              </div>
              <button
                onClick={() => setIsEditingNotes(!isEditingNotes)}
                aria-label="Format options"
                className="text-slate-500 hover:text-slate-800 dark:hover:text-white p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isEditingNotes ? 'check' : 'edit_note'}
                </span>
              </button>
            </div>

            {isEditingNotes ? (
              <div className="flex flex-col gap-2">
                <textarea
                  rows={5}
                  value={editedNotes}
                  onChange={(e) => setEditedNotes(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsEditingNotes(false)}
                    className="px-3.5 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900"
                  >
                    {t.cancel}
                  </button>
                  <button
                    onClick={handleSaveNotes}
                    className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700"
                  >
                    {t.save}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200/60 dark:border-white/[0.06] flex flex-col gap-2.5">
                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  Make sure formal{' '}
                  <span className="px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold text-xs">
                    &quot;u&quot;
                  </span>{' '}
                  vs informal{' '}
                  <span className="px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold text-xs">
                    &quot;je&quot;
                  </span>{' '}
                  is consistent across all mobile notifications.
                </p>
                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  {task.notes?.replace(
                    'Make sure formal "u" vs informal "je" is consistent across all mobile notifications.\n',
                    ''
                  ) ||
                    'Dutch users prefer direct and concise action verbs. Attached reference doc below.'}
                </p>
                <div className="mt-1 pt-2 border-t border-slate-200/40 dark:border-white/[0.04] flex items-center gap-1.5 text-slate-400 text-xs">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  <span>{t.lastEdited}</span>
                </div>
              </div>
            )}
          </div>

          {/* Attached Links Section */}
          <div className="bg-white dark:bg-[#111319] p-5 sm:p-6 rounded-3xl shadow-sm border border-slate-200/80 dark:border-white/[0.08]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-sky-600 dark:text-sky-400 material-symbols-fill">
                  bookmark_added
                </span>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {t.attachedLinks}
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {task.attachedLinks.length} Bookmarks
              </span>
            </div>

            {/* Links Cards */}
            <div className="flex flex-col gap-3">
              {task.attachedLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200/60 dark:border-white/[0.06] group"
                >
                  {link.image ? (
                    <div className="w-18 h-18 rounded-xl overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-800">
                      <img
                        src={link.image}
                        alt={link.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="w-18 h-18 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400">
                      <span className="material-symbols-outlined text-[26px]">link</span>
                    </div>
                  )}

                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex items-center gap-1 text-slate-400 text-xs">
                        <span className="material-symbols-outlined text-[13px]">
                          {link.type === 'figma' ? 'dashboard' : 'description'}
                        </span>
                        <span className="truncate">{link.domain}</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mt-0.5">
                        {link.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {link.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-xs font-semibold pt-1">
                      <span>{link.type === 'figma' ? 'View artboards' : 'Open document'}</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Add Link Form */}
            {isAddingLink ? (
              <div className="mt-3.5 flex flex-col gap-2.5 bg-slate-50 dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <input
                  autoFocus
                  className="bg-white dark:bg-slate-800 px-3.5 py-2 rounded-xl text-xs text-slate-900 dark:text-white outline-none border border-slate-200 dark:border-slate-700"
                  placeholder={t.pasteUrl}
                  type="url"
                  value={newLinkUrl}
                  onChange={(e) => setNewLinkUrl(e.target.value)}
                />
                <input
                  className="bg-white dark:bg-slate-800 px-3.5 py-2 rounded-xl text-xs text-slate-900 dark:text-white outline-none border border-slate-200 dark:border-slate-700"
                  placeholder={t.customTitle}
                  type="text"
                  value={newLinkTitle}
                  onChange={(e) => setNewLinkTitle(e.target.value)}
                />
                <div className="flex justify-end gap-2 mt-1">
                  <button
                    onClick={() => {
                      setIsAddingLink(false);
                      setNewLinkUrl('');
                      setNewLinkTitle('');
                    }}
                    className="px-3.5 py-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white font-medium"
                  >
                    {t.cancel}
                  </button>
                  <button
                    onClick={handleAddLink}
                    className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700"
                  >
                    {t.attach}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAddingLink(true)}
                className="mt-3.5 w-full py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">add_link</span>
                <span>{t.attachWebLink}</span>
              </button>
            )}
          </div>

          {/* Action Footer: Duplicate & Delete */}
          <div className="flex items-center justify-between p-2">
            <button
              onClick={() => {
                onDuplicateTask(task);
                showToast('Task cloned successfully to today\'s workspace.');
              }}
              className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">content_copy</span>
              <span>{t.duplicateTask}</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this task?')) {
                  onDeleteTask(task.id);
                }
              }}
              className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 hover:text-rose-700 text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
              <span>{t.deleteTask}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
