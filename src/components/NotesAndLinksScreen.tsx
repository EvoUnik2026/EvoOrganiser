import React, { useState } from 'react';
import { LibraryItem, Language } from '../types';
import { TRANSLATIONS } from '../localization/translations';

interface NotesAndLinksScreenProps {
  items: LibraryItem[];
  onToggleStar: (itemId: string) => void;
  onAddItem: (item: LibraryItem) => void;
  language: Language;
  showToast: (msg: string) => void;
}

export const NotesAndLinksScreen: React.FC<NotesAndLinksScreenProps> = ({
  items,
  onToggleStar,
  onAddItem,
  language,
  showToast,
}) => {
  const t = TRANSLATIONS[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'link' | 'note' | 'favorite'>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isCompact, setIsCompact] = useState(false);

  // Modal creation state
  const [modalMode, setModalMode] = useState<'link' | 'note' | null>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalUrl, setModalUrl] = useState('');
  const [modalNotes, setModalNotes] = useState('');
  const [modalTags, setModalTags] = useState<string[]>(['#Design']);

  const allTags = ['#Localization', '#Design', '#Tech Specs', '#Reference', '#Arabic', '#Dutch'];

  // Counts
  const linkCount = items.filter((i) => i.type === 'link').length;
  const noteCount = items.filter((i) => i.type === 'note').length;

  // Filtered items
  const filteredItems = items.filter((item) => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchContent = item.content?.toLowerCase().includes(q) || false;
      const matchDomain = item.domain?.toLowerCase().includes(q) || false;
      const matchTags = item.tags.some((tg) => tg.toLowerCase().includes(q));
      if (!matchTitle && !matchContent && !matchDomain && !matchTags) return false;
    }

    // Type filter
    if (filterType === 'link' && item.type !== 'link') return false;
    if (filterType === 'note' && item.type !== 'note') return false;
    if (filterType === 'favorite' && !item.starred) return false;

    // Tag filter
    if (selectedTag && !item.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())) {
      return false;
    }

    return true;
  });

  const handleSaveModal = () => {
    if (!modalTitle.trim()) return;

    let domain = '';
    if (modalMode === 'link' && modalUrl.trim()) {
      try {
        const u = new URL(modalUrl.startsWith('http') ? modalUrl : `https://${modalUrl}`);
        domain = u.hostname;
      } catch {
        domain = modalUrl;
      }
    }

    const newItem: LibraryItem = {
      id: `lib-${Date.now()}`,
      type: modalMode === 'link' ? 'link' : 'note',
      title: modalTitle.trim(),
      tags: modalTags.length > 0 ? modalTags : ['#Reference'],
      starred: false,
      domain: domain || undefined,
      url: modalUrl.trim() || undefined,
      content: modalNotes.trim() || undefined,
      memoCategory: modalMode === 'note' ? 'Sticky Memo' : undefined,
      footerInfo: 'Just now',
    };

    onAddItem(newItem);
    setModalMode(null);
    setModalTitle('');
    setModalUrl('');
    setModalNotes('');
    showToast(modalMode === 'link' ? 'Link saved to library' : 'Note created');
  };

  const toggleModalTag = (tg: string) => {
    setModalTags((prev) =>
      prev.includes(tg) ? prev.filter((t) => t !== tg) : [...prev, tg]
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-3">
      {/* Top Filter & Search Section */}
      <div className="flex flex-col gap-3">
        {/* Search Bar + Desktop New Item CTAs */}
        <div className="flex items-center gap-3 w-full">
          <div className="relative flex-1 flex items-center">
            <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full h-11 pl-11 pr-10 rounded-full bg-slate-100 dark:bg-slate-900/80 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:bg-white dark:focus:bg-[#111319] focus:shadow-md transition-all outline-none border border-slate-200/60 dark:border-white/[0.06]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">cancel</span>
              </button>
            )}
          </div>

          {/* Desktop quick action buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setModalMode('link')}
              className="flex items-center gap-1.5 px-3.5 h-11 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-semibold active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-[18px]">
                add_link
              </span>
              <span>{t.newLink}</span>
            </button>

            <button
              onClick={() => setModalMode('note')}
              className="flex items-center gap-1.5 px-4 h-11 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">edit_note</span>
              <span>{t.newNote}</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setFilterType('all')}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filterType === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-200/70 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <span>{t.allFilter}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                filterType === 'all'
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {items.length}
            </span>
          </button>

          <button
            onClick={() => setFilterType('link')}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filterType === 'link'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-200/70 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">link</span>
            <span>{t.webLinksFilter}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                filterType === 'link'
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {linkCount}
            </span>
          </button>

          <button
            onClick={() => setFilterType('note')}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filterType === 'note'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-200/70 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">edit_note</span>
            <span>{t.notesFilter}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                filterType === 'note'
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {noteCount}
            </span>
          </button>

          <button
            onClick={() => setFilterType('favorite')}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filterType === 'favorite'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-200/70 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">star</span>
            <span>{t.bookmarkedFilter}</span>
          </button>
        </div>

        {/* Tags Carousel */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider shrink-0 pr-1">
            {t.tagsLabel}
          </span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedTag === tag
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Active Repository status & Density Toggle */}
        <div className="flex items-center justify-between pt-1 pb-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {t.activeRepository}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
            <span className="text-[11px] text-slate-400">{t.sortedByRecent}</span>
          </div>

          <button
            onClick={() => setIsCompact(!isCompact)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle Compact Density"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isCompact ? 'view_agenda' : 'dashboard_customize'}
            </span>
          </button>
        </div>
      </div>

      {/* Responsive Library Grid: 1 col on mobile, 2 on tablet, 3 on desktop! */}
      <div
        className={`mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start ${
          isCompact ? 'gap-3' : 'gap-5'
        }`}
      >
        {filteredItems.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center bg-white/50 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-200 dark:border-white/10">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
              <span className="material-symbols-outlined text-[32px]">folder_off</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {t.noMatchingReferences}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[260px] mt-1">
              {t.noMatchingDesc}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterType('all');
                setSelectedTag(null);
              }}
              className="mt-4 px-4 py-2 rounded-full bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-all shadow-sm"
            >
              {t.resetFilters}
            </button>
          </div>
        ) : (
          filteredItems.map((item) => {
            // Render Link Card
            if (item.type === 'link') {
              return (
                <article
                  key={item.id}
                  className="group bg-white dark:bg-[#111319] rounded-3xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col border border-slate-200/80 dark:border-white/[0.08]"
                >
                  {/* Top Image Banner if present */}
                  {item.image && !isCompact && (
                    <div className="relative w-full h-44 overflow-hidden bg-slate-200 dark:bg-slate-800">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent"></div>

                      {/* Domain badge */}
                      {item.domain && (
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xs">
                          <span className="material-symbols-outlined text-[13px] text-sky-600 dark:text-sky-400">
                            public
                          </span>
                          <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                            {item.domain}
                          </span>
                        </div>
                      )}

                      {/* Star Button */}
                      <button
                        onClick={() => {
                          onToggleStar(item.id);
                          showToast(item.starred ? 'Removed from bookmarks' : 'Bookmarked reference');
                        }}
                        aria-label="Bookmark link"
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-center shadow-xs transition-all active:scale-90 ${
                          item.starred ? 'text-amber-500' : 'text-slate-400 hover:text-amber-500'
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-[18px] ${
                            item.starred ? 'material-symbols-fill' : ''
                          }`}
                        >
                          star
                        </span>
                      </button>

                      {/* Bottom Image Overlay text */}
                      {item.readTime && (
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                          <span className="text-[11px] font-medium opacity-90">{item.readTime}</span>
                          <span className="material-symbols-outlined text-[15px] opacity-80">
                            arrow_outward
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="p-4 flex flex-col gap-2.5 flex-1 justify-between">
                    <div>
                      {/* Compact header when no image */}
                      {(!item.image || isCompact) && (
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined text-[20px]">
                                developer_mode_tv
                              </span>
                            </div>
                            <div className="min-w-0">
                              {item.domain && (
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold truncate">
                                    {item.domain}
                                  </span>
                                  {item.specBadge && (
                                    <>
                                      <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                      <span className="text-[10px] text-slate-400 font-medium">
                                        {item.specBadge}
                                      </span>
                                    </>
                                  )}
                                </div>
                              )}
                              <h2 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                {item.title}
                              </h2>
                            </div>
                          </div>

                          <button
                            onClick={() => onToggleStar(item.id)}
                            aria-label="Bookmark link"
                            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                              item.starred ? 'text-amber-500' : 'text-slate-400 hover:text-amber-500'
                            }`}
                          >
                            <span
                              className={`material-symbols-outlined text-[18px] ${
                                item.starred ? 'material-symbols-fill' : ''
                              }`}
                            >
                              star
                            </span>
                          </button>
                        </div>
                      )}

                      {item.image && !isCompact && (
                        <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                          {item.title}
                        </h2>
                      )}

                      {item.content && (
                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mt-1">
                          {item.content}
                        </p>
                      )}

                      {/* Spec or interactive test suite banner if applicable */}
                      {item.taskBadge && item.taskBadge.includes('interactive') && (
                        <div className="mt-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between border border-slate-200/50 dark:border-white/[0.06]">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-[16px] shrink-0">
                              verified
                            </span>
                            <span className="text-[11px] font-medium text-slate-800 dark:text-slate-200 truncate">
                              {item.taskBadge}
                            </span>
                          </div>
                          <a
                            href={item.url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 text-indigo-600 dark:text-indigo-400 text-[11px] font-bold hover:underline shrink-0"
                          >
                            <span>Read</span>
                            <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Footer Tags & Task Link */}
                    <div className="pt-2 flex flex-wrap items-center gap-1.5 border-t border-slate-100 dark:border-white/[0.04]">
                      {item.tags.map((tg) => (
                        <span
                          key={tg}
                          className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-medium border border-slate-200/50 dark:border-white/[0.06]"
                        >
                          {tg}
                        </span>
                      ))}

                      {item.taskBadge && !item.taskBadge.includes('interactive') && (
                        <div className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[10px] font-semibold">
                          <span className="material-symbols-outlined text-[13px]">task_alt</span>
                          <span className="truncate max-w-[120px]">{item.taskBadge}</span>
                        </div>
                      )}

                      {item.footerInfo && !item.taskBadge && (
                        <span className="ml-auto text-[10px] text-slate-400 font-medium">
                          {item.footerInfo}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            }

            // Render Note / Sticky Memo Card
            return (
              <article
                key={item.id}
                className="bg-white dark:bg-[#111319] rounded-3xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col gap-3 border border-slate-200/80 dark:border-white/[0.08]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">
                        {item.memoCategory === 'Technical Memo' ? 'code_blocks' : 'sticky_note_2'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-amber-700 dark:text-amber-400 font-bold uppercase tracking-wider">
                        {item.memoCategory || 'Sticky Memo'}
                      </span>
                      <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                        {item.title}
                      </h2>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onToggleStar(item.id);
                      showToast(item.starred ? 'Removed from bookmarks' : 'Bookmarked note');
                    }}
                    aria-label="Bookmark note"
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      item.starred ? 'text-amber-500' : 'text-slate-400 hover:text-amber-500'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] ${
                        item.starred ? 'material-symbols-fill' : ''
                      }`}
                    >
                      star
                    </span>
                  </button>
                </div>

                {/* Translation Pairs List if present */}
                {item.translationPairs && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 text-xs space-y-1.5 border border-slate-200/50 dark:border-white/[0.06]">
                    <div className="font-mono text-[11px] leading-relaxed space-y-1">
                      {item.translationPairs.map((pair, idx) => (
                        <p key={idx}>
                          <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                            {pair.from}
                          </span>{' '}
                          → {pair.to}
                        </p>
                      ))}
                    </div>
                    {item.content && (
                      <p className="text-slate-400 text-[10px] pt-1.5 border-t border-slate-200/40 dark:border-white/[0.04]">
                        {item.content}
                      </p>
                    )}
                  </div>
                )}

                {/* Bullet points if present (Technical memo) */}
                {item.noteBulletPoints && (
                  <ul className="space-y-2 pl-0.5 text-xs text-slate-600 dark:text-slate-300">
                    {item.noteBulletPoints.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-[15px] mt-0.5 shrink-0">
                          check_small
                        </span>
                        <span className="leading-snug">{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Plain content */}
                {!item.translationPairs && !item.noteBulletPoints && item.content && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.content}
                  </p>
                )}

                {/* Tags and footer info */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-white/[0.04] mt-auto">
                  {item.tags.map((tg) => (
                    <span
                      key={tg}
                      className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-medium border border-slate-200/50 dark:border-white/[0.06]"
                    >
                      {tg}
                    </span>
                  ))}
                  {item.footerInfo && (
                    <span className="ml-auto text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">schedule</span>
                      <span>{item.footerInfo}</span>
                    </span>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Floating Action Buttons for Mobile */}
      <div className="sm:hidden fixed bottom-20 z-30 left-0 right-0 flex items-center justify-center gap-2 pointer-events-none">
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/95 dark:bg-[#111319]/95 backdrop-blur-md shadow-xl border border-slate-200/80 dark:border-white/[0.08] pointer-events-auto">
          <button
            onClick={() => setModalMode('link')}
            className="flex items-center gap-1.5 px-4 h-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-semibold active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-[18px]">
              add_link
            </span>
            <span>{t.newLink}</span>
          </button>

          <button
            onClick={() => setModalMode('note')}
            className="flex items-center gap-1.5 px-4 h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">edit_note</span>
            <span>{t.newNote}</span>
          </button>
        </div>
      </div>

      {/* Quick Create Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all">
          <div className="w-full max-w-lg bg-white dark:bg-[#111319] rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 flex flex-col gap-4 border border-slate-200/80 dark:border-white/[0.08] animate-in slide-in-from-bottom duration-200">
            <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-700 self-center sm:hidden"></div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-[24px]">
                  {modalMode === 'link' ? 'add_link' : 'edit_note'}
                </span>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  {modalMode === 'link' ? t.captureWebRef : t.composeNewNote}
                </h2>
              </div>
              <button
                onClick={() => setModalMode(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white bg-slate-100 dark:bg-slate-800"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                  {t.titleOrName}
                </label>
                <input
                  autoFocus
                  type="text"
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                  placeholder={
                    modalMode === 'link'
                      ? 'e.g. Flutter RTL Localization Guide'
                      : 'e.g. Arabic & Dutch Key Terms'
                  }
                  className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs outline-none border border-slate-200/80 dark:border-white/[0.08] focus:border-indigo-500 transition-colors"
                />
              </div>

              {modalMode === 'link' && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                    {t.targetWebUrl}
                  </label>
                  <input
                    type="url"
                    value={modalUrl}
                    onChange={(e) => setModalUrl(e.target.value)}
                    placeholder="https://developer.apple.com/..."
                    className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs outline-none border border-slate-200/80 dark:border-white/[0.08] focus:border-indigo-500 transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                  {t.notesAndMarkdown}
                </label>
                <textarea
                  rows={3}
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  placeholder="Add context, key bullet points, or translation notes..."
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs outline-none border border-slate-200/80 dark:border-white/[0.08] focus:border-indigo-500 resize-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                  {t.assignTags}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {allTags.map((tg) => (
                    <button
                      key={tg}
                      type="button"
                      onClick={() => toggleModalTag(tg)}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                        modalTags.includes(tg)
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {tg}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalMode(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                {t.cancel}
              </button>
              <button
                type="button"
                onClick={handleSaveModal}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm active:scale-95 transition-all"
              >
                {t.saveItem}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
