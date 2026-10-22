import React, { useState } from 'react';
import { UserProfile, AppSettings, Language, AppTheme, CalendarFormat } from '../types';
import { TRANSLATIONS } from '../localization/translations';

interface SettingsScreenProps {
  user: UserProfile;
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onUpdateUser: (newUser: UserProfile) => void;
  onOpenOnboarding: () => void;
  onOpenArabicLab: () => void;
  showToast: (msg: string) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  user,
  settings,
  onUpdateSettings,
  onUpdateUser,
  onOpenOnboarding,
  onOpenArabicLab,
  showToast,
}) => {
  const t = TRANSLATIONS[settings.language];
  const [isSyncing, setIsSyncing] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState<{ title: string; content: string } | null>(
    null
  );

  const handleSelectLanguage = (lang: Language) => {
    onUpdateSettings({ ...settings, language: lang });
    showToast(
      lang === 'ar'
        ? 'تم تفعيل اللغة العربية وتخطيط RTL'
        : lang === 'nl'
        ? 'Nederlands geactiveerd'
        : 'English activated'
    );
  };

  const handleToggleAutoRtl = () => {
    const nextVal = !settings.autoRtl;
    onUpdateSettings({ ...settings, autoRtl: nextVal });
    showToast(nextVal ? 'Automatic RTL enabled' : 'Automatic RTL disabled');
  };

  const handleSelectTheme = (theme: AppTheme) => {
    onUpdateSettings({ ...settings, theme });
    showToast(`Theme switched to ${theme}`);
  };

  const handleCalendarFormat = (fmt: CalendarFormat) => {
    onUpdateSettings({ ...settings, calendarFormat: fmt });
  };

  const handleSyncNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onUpdateUser({ ...user, lastSynced: 'Just now' });
      showToast('Cloud database synchronized successfully ✨');
    }, 1200);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-3">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (lg:col-span-6): Profile & Language/Localization */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          {/* Profile Card */}
          <section>
            <div className="bg-white dark:bg-[#111319] rounded-3xl p-5 shadow-sm flex items-center justify-between border border-slate-200/80 dark:border-white/[0.08]">
              <div className="flex items-center gap-4 min-w-0">
                <div className="relative shrink-0">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover shadow-sm ring-2 ring-indigo-500/20"
                  />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center text-white text-[12px] shadow-xs">
                    <span className="material-symbols-outlined text-[13px] material-symbols-fill">
                      verified
                    </span>
                  </span>
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                      {user.name}
                    </h2>
                    <span className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold shadow-xs">
                      PRO
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                    <span className="text-[11px] font-medium text-sky-600 dark:text-sky-400">
                      {t.cloudSyncActive}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  const newName = window.prompt('Update Profile Name:', user.name);
                  if (newName && newName.trim()) {
                    onUpdateUser({ ...user, name: newName.trim() });
                    showToast('Profile updated');
                  }
                }}
                aria-label="Edit Profile"
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
              </button>
            </div>
          </section>

          {/* Language & Localization Section */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-[20px]">
                  translate
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {t.languageAndLocalization}
                </h3>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Taal · اللغة
              </span>
            </div>

            {/* Language Cards */}
            <div className="space-y-2.5">
              {/* English */}
              <div
                onClick={() => handleSelectLanguage('en')}
                className={`rounded-2xl p-4 shadow-sm transition-all cursor-pointer relative border ${
                  settings.language === 'en'
                    ? 'bg-indigo-50/60 dark:bg-indigo-950/30 border-indigo-500/50 dark:border-indigo-500/40'
                    : 'bg-white dark:bg-[#111319] border-slate-200/80 dark:border-white/[0.08] hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-xl">
                      🇬🇧
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {t.englishTitle}
                        </span>
                        {settings.language === 'en' && (
                          <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold px-1.5 py-0.2 rounded">
                            {t.activeBadge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {t.englishDesc}
                      </p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-white/[0.06]">
                          LTR Layout
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-white/[0.06]">
                          Gregorian
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      settings.language === 'en'
                        ? 'bg-indigo-600 text-white scale-105'
                        : 'bg-slate-100 dark:bg-slate-800 text-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                  </div>
                </div>
              </div>

              {/* Dutch */}
              <div
                onClick={() => handleSelectLanguage('nl')}
                className={`rounded-2xl p-4 shadow-sm transition-all cursor-pointer relative border ${
                  settings.language === 'nl'
                    ? 'bg-indigo-50/60 dark:bg-indigo-950/30 border-indigo-500/50 dark:border-indigo-500/40'
                    : 'bg-white dark:bg-[#111319] border-slate-200/80 dark:border-white/[0.08] hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-xl">
                      🇳🇱
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {t.dutchTitle}
                        </span>
                        {settings.language === 'nl' && (
                          <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold px-1.5 py-0.2 rounded">
                            {t.activeBadge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {t.dutchDesc}
                      </p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-white/[0.06]">
                          LTR Layout
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-white/[0.06]">
                          Euroformaat (DD/MM)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      settings.language === 'nl'
                        ? 'bg-indigo-600 text-white scale-105'
                        : 'bg-slate-100 dark:bg-slate-800 text-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                  </div>
                </div>
              </div>

              {/* Arabic */}
              <div
                onClick={() => handleSelectLanguage('ar')}
                className={`rounded-2xl p-4 shadow-sm transition-all cursor-pointer relative border ${
                  settings.language === 'ar'
                    ? 'bg-indigo-50/60 dark:bg-indigo-950/30 border-indigo-500/50 dark:border-indigo-500/40'
                    : 'bg-white dark:bg-[#111319] border-slate-200/80 dark:border-white/[0.08] hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-xl">
                      🇸🇦
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {t.arabicTitle}
                        </span>
                        {settings.language === 'ar' && (
                          <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold px-1.5 py-0.2 rounded">
                            {t.activeBadge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {t.arabicDesc}
                      </p>
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                          تخطيط RTL التلقائي
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-white/[0.06]">
                          التقويم الهجري والميلادي
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenArabicLab();
                          }}
                          className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors flex items-center gap-1 shadow-xs"
                        >
                          <span className="material-symbols-outlined text-[13px]">science</span>
                          <span>مختبر الخط العربي (RTL Lab)</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      settings.language === 'ar'
                        ? 'bg-indigo-600 text-white scale-105'
                        : 'bg-slate-100 dark:bg-slate-800 text-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RTL and Calendar format card */}
            <div className="bg-white dark:bg-[#111319] rounded-3xl p-5 shadow-sm space-y-4 border border-slate-200/80 dark:border-white/[0.08]">
              {/* Auto RTL Toggle */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400">
                    <span className="material-symbols-outlined text-[22px]">swap_horiz</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {t.automaticRtlLayout}
                      </span>
                      <span className="text-xs text-slate-400">(تبديل تلقائي)</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t.automaticRtlDesc}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleToggleAutoRtl}
                  role="switch"
                  aria-checked={settings.autoRtl}
                  className={`w-12 h-7 rounded-full relative transition-colors shrink-0 ${
                    settings.autoRtl ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all shadow-sm ${
                      settings.autoRtl ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              <div className="h-[1px] bg-slate-100 dark:bg-white/[0.06]"></div>

              {/* Calendar format */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400">
                    <span className="material-symbols-outlined text-[22px]">calendar_month</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {t.dateAndCalendar}
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t.dateAndCalendarDesc}
                    </p>
                  </div>
                </div>

                <select
                  value={settings.calendarFormat}
                  onChange={(e) => handleCalendarFormat(e.target.value as CalendarFormat)}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none border border-slate-200/80 dark:border-white/[0.08]"
                >
                  <option value="gregorian">Gregorian (Standard)</option>
                  <option value="dual">Dual (Gregorian + هجري)</option>
                  <option value="hijri">Hijri Primary (تقويم أم القرى)</option>
                </select>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (lg:col-span-6): General Preferences & Help/Guide */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          {/* General Preferences */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-1">
              <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-[20px]">
                tune
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {t.generalPreferences}
              </h3>
            </div>

            <div className="bg-white dark:bg-[#111319] rounded-3xl shadow-sm divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-white/[0.08] overflow-hidden">
              {/* App Theme */}
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <span className="material-symbols-outlined text-[18px]">palette</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {t.appTheme}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">{t.appearance}</span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  <button
                    onClick={() => handleSelectTheme('system')}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                      settings.theme === 'system'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">smartphone</span>
                    <span>{t.system}</span>
                  </button>

                  <button
                    onClick={() => handleSelectTheme('light')}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                      settings.theme === 'light'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">light_mode</span>
                    <span>{t.light}</span>
                  </button>

                  <button
                    onClick={() => handleSelectTheme('dark')}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                      settings.theme === 'dark'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">dark_mode</span>
                    <span>{t.dark}</span>
                  </button>
                </div>
              </div>

              {/* Notifications */}
              <div className="p-5 flex items-center justify-between gap-3">
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                    <span className="material-symbols-outlined text-[18px]">
                      notifications_active
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {t.notificationsTitle}
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.notificationsDesc}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const next = !settings.notifications;
                    onUpdateSettings({ ...settings, notifications: next });
                    showToast(next ? 'Notifications enabled' : 'Notifications muted');
                  }}
                  role="switch"
                  aria-checked={settings.notifications}
                  className={`w-12 h-7 rounded-full relative transition-colors shrink-0 ${
                    settings.notifications ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all shadow-sm ${
                      settings.notifications ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              {/* Link Preview Scraping */}
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                      <span className="material-symbols-outlined text-[18px]">link</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {t.linkScrapingTitle}
                      </span>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t.linkScrapingDesc}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const next = !settings.linkScraping;
                      onUpdateSettings({ ...settings, linkScraping: next });
                    }}
                    role="switch"
                    aria-checked={settings.linkScraping}
                    className={`w-12 h-7 rounded-full relative transition-colors shrink-0 ${
                      settings.linkScraping ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all shadow-sm ${
                        settings.linkScraping ? 'right-1' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="ml-10 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60 rounded-xl p-3 border border-slate-200/50 dark:border-white/[0.04]">
                  <span className="text-xs text-slate-600 dark:text-slate-300">
                    {t.openInAppBrowser}
                  </span>
                  <button
                    onClick={() => {
                      onUpdateSettings({
                        ...settings,
                        openInAppBrowser: !settings.openInAppBrowser,
                      });
                    }}
                    role="switch"
                    aria-checked={settings.openInAppBrowser}
                    className={`w-10 h-6 rounded-full relative transition-colors shrink-0 ${
                      settings.openInAppBrowser ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all shadow-xs ${
                        settings.openInAppBrowser ? 'right-0.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Cloud Sync */}
              <div className="p-5 flex items-center justify-between gap-3">
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-sky-500/15 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                    <span className="material-symbols-outlined text-[18px]">cloud_sync</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {t.cloudSyncTitle}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t.cloudSyncDesc.replace('{time}', user.lastSynced)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleSyncNow}
                  disabled={isSyncing}
                  className="px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-all shrink-0 active:scale-95 flex items-center gap-1.5"
                >
                  {isSyncing ? (
                    <>
                      <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                      <span>Syncing...</span>
                    </>
                  ) : (
                    <span>{t.syncNow}</span>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Launch Onboarding Tour Card */}
          <div className="bg-indigo-50/70 dark:bg-indigo-950/30 rounded-3xl p-5 border border-indigo-200/80 dark:border-indigo-500/30 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/30">
                <span className="material-symbols-outlined text-[20px] material-symbols-fill">
                  auto_awesome
                </span>
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Welcome &amp; Tutorial Tour
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Revisit the 3-step feature guide and typography demo.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenOnboarding}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs active:scale-95 transition-all shrink-0"
            >
              Start Tour
            </button>
          </div>

          {/* App Version Info Footer */}
          <section>
            <div className="bg-slate-100 dark:bg-slate-900/60 rounded-3xl p-5 flex flex-col items-center text-center gap-2 border border-slate-200/80 dark:border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-[20px]">
                  devices
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  TaskFlow v2.4 (Build 412)
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t.versionEngine}</p>

              <div className="flex items-center gap-2 mt-1 flex-wrap justify-center">
                <button
                  onClick={() =>
                    setInfoModalContent({
                      title: t.termsOfService,
                      content:
                        'TaskFlow Terms of Service: Your data remains private and securely synchronized across your devices. No third-party ad tracking or analytics selling.',
                    })
                  }
                  className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-xs hover:text-indigo-600 transition-colors"
                >
                  {t.termsOfService}
                </button>
                <button
                  onClick={() =>
                    setInfoModalContent({
                      title: t.privacyPolicy,
                      content:
                        'Privacy Policy: Fully compliant with EU GDPR and Saudi PDPL regulations. All biometric voice captures are processed on-device.',
                    })
                  }
                  className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-xs hover:text-indigo-600 transition-colors"
                >
                  {t.privacyPolicy}
                </button>
                <button
                  onClick={() =>
                    setInfoModalContent({
                      title: t.whatsNew,
                      content:
                        'What\'s New in v2.4 (Build 412):\n- Responsive desktop & tablet master layout with fluid grids\n- User onboarding flow with welcome screen & interactive 3-step tutorial\n- Unified multi-language engine supporting English, Nederlands, and Arabic RTL\n- Instant Quick Capture bottom sheet with auto-scraped HIG link cards\n- Subtasks progress tracking with live momentum calculation\n- Dark theme optical contrast enhancements',
                    })
                  }
                  className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-xs hover:text-indigo-600 transition-colors"
                >
                  {t.whatsNew}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Info Modal */}
      {infoModalContent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111319] rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-white/10 animate-in fade-in duration-200">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              {infoModalContent.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {infoModalContent.content}
            </p>
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setInfoModalContent(null)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
