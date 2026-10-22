import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../localization/translations';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  showToast: (msg: string) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  language,
  onSelectLanguage,
  showToast,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 = Welcome, 1 = Step 1, 2 = Step 2, 3 = Step 3
  const [interactiveChecked, setInteractiveChecked] = useState(false);
  const [interactiveTag, setInteractiveTag] = useState('#Localization');

  if (!isOpen) return null;

  const t = TRANSLATIONS[language];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onClose();
      showToast('Welcome to TaskFlow! Your workspace is ready.');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 dark:bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto no-scrollbar animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-[#111319] rounded-3xl shadow-2xl border border-slate-200/90 dark:border-white/[0.1] overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Top Progress & Controls */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1W6HSrBVEGa8ZEAKVRdXnhIfbhUsLFU3isqT1IMk6ZUiWbiUCXo0QeiP8Mr9ftY5q6-jc0J-rmbQjXY6XLDFgaY-Lmtr-ZxrRIs3SNys1Ca8K77ytmSnIMzQBpcnNT4zScYjlRZhNp7GnqNau4igKg71E_nB8T8vrIvsG0WR0Wh7bA62BxYuCZbDGBo17HMbemj5y-g9sDQ_BNtHSBSAhIq-HS_gzDdGLqgGXBdVh0DIsKR4vgZpKjLLuy0"
              alt="TaskFlow Logo"
              className="h-6 w-auto object-contain"
            />
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              TaskFlow Guide
            </span>
          </div>

          {currentStep > 0 && (
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentStep === step
                      ? 'w-6 bg-indigo-600 dark:bg-indigo-400'
                      : currentStep > step
                      ? 'w-2 bg-indigo-300 dark:bg-indigo-700'
                      : 'w-2 bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>
          )}

          <button
            onClick={() => {
              onClose();
              showToast('Tour skipped');
            }}
            className="text-xs font-semibold text-slate-400 hover:text-slate-700 dark:hover:text-white px-2 py-1 rounded-lg transition-colors"
          >
            {currentStep === 0 ? 'Skip' : 'Close'}
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto no-scrollbar flex-1">
          {/* STEP 0: WELCOME SCREEN */}
          {currentStep === 0 && (
            <div className="flex flex-col items-center text-center gap-6 animate-in fade-in duration-300">
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-xl shadow-indigo-600/10">
                  <img
                    src="https://lh3.googleusercontent.com/aida/AEtjO1W6HSrBVEGa8ZEAKVRdXnhIfbhUsLFU3isqT1IMk6ZUiWbiUCXo0QeiP8Mr9ftY5q6-jc0J-rmbQjXY6XLDFgaY-Lmtr-ZxrRIs3SNys1Ca8K77ytmSnIMzQBpcnNT4zScYjlRZhNp7GnqNau4igKg71E_nB8T8vrIvsG0WR0Wh7bA62BxYuCZbDGBo17HMbemj5y-g9sDQ_BNtHSBSAhIq-HS_gzDdGLqgGXBdVh0DIsKR4vgZpKjLLuy0"
                    alt="TaskFlow Logo"
                    className="h-12 w-auto object-contain drop-shadow"
                  />
                </div>
                <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-sm">
                  v2.4
                </span>
              </div>

              <div className="max-w-md space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Welcome to TaskFlow
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  A calm, tactile productivity workspace designed for multilingual teams and deep work. Organize tasks, rich notes, and web references seamlessly in English, Dutch, and Arabic.
                </p>
              </div>

              {/* Hotlinked Preview Banner */}
              <div className="w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.08] relative group shadow-sm bg-slate-100 dark:bg-slate-800">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS8nHCSZuz5mHIWrGS1ICiB7v_jdpHNjf9r8dk3MRmYGC0zbd76lL8TSvZP_UUWmYPpK6PklBa8uj6hldD_oGafZ_TezG9zOuZT9AJDXQTRGhvG7wHetcAWjFDJtkVyA9ErUnvjePwbHWMNT4OW6GOFS27FBEMuKrkmJury4ywGmeMrzLI8kswq9HnO9VpoExX7EZK4l3DyA7V4NayzNs7CPkLZMnLtl2oP8Abk7V2p3eWYAWRG48Hmw"
                  alt="Minimalist stationery flatlay"
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-4">
                  <div className="flex items-center justify-between w-full text-white text-xs">
                    <span className="font-semibold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-sky-400">
                        verified
                      </span>
                      Built with Scandinavian &amp; Arabic typography balance
                    </span>
                    <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium">
                      3 Interactive Steps
                    </span>
                  </div>
                </div>
              </div>

              {/* Language Selection Chips on Welcome */}
              <div className="flex flex-col items-center gap-2 w-full pt-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Preferred Workspace Language
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onSelectLanguage('en')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      language === 'en'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10'
                    }`}
                  >
                    🇬🇧 English
                  </button>
                  <button
                    onClick={() => onSelectLanguage('nl')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      language === 'nl'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10'
                    }`}
                  >
                    🇳🇱 Nederlands
                  </button>
                  <button
                    onClick={() => onSelectLanguage('ar')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      language === 'ar'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10'
                    }`}
                  >
                    🇸🇦 العربية (RTL)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: DAILY MOMENTUM & PRIORITIES */}
          {currentStep === 1 && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/2 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.08] shadow-sm relative group bg-slate-100 dark:bg-slate-800">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxDdUXgIYN4PvT48LKCKvpfku5vMRdYL4fF1eFfWi9CkjZwi86j1DRg2c2HnJC7U2p01tG1xPMvgx-ggQM_Pdz7W2vivq17XrkQpkB2auPFYK7v8lZnxXYV9nYBzV0Qr5eb3aoQ_yy6mRz0b3Yj9xdy5ZBl9NpWX1Le5mvmAqbEudE8JVXUpEnLSaEhwl7dZsEHQkctOk4GhsKfVwHZWtBpqhPFj0CO6J-uxoiAnSMVSmA2JI3-_PNwg"
                    alt="Arabic script & typography specimen"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-indigo-600 dark:text-indigo-400 shadow-xs">
                    Step 1 of 3
                  </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col gap-2.5 text-left">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[16px] material-symbols-fill">
                      verified
                    </span>
                    Focus &amp; Momentum
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                    Stay in Flow with Daily Momentum
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Clear morning priorities with a dynamic circular momentum ring, streak counters, and granular subtask checklists. Every check provides tactile physical satisfaction.
                  </p>
                </div>
              </div>

              {/* Interactive Preview Widget */}
              <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] flex flex-col gap-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Interactive Practice: Try checking a task
                </span>
                <div className="bg-white dark:bg-[#111319] p-3 rounded-xl border border-slate-200/70 dark:border-white/[0.06] flex items-center gap-3">
                  <button
                    onClick={() => setInteractiveChecked(!interactiveChecked)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      interactiveChecked
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-transparent hover:text-slate-400 border border-slate-300 dark:border-white/20'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px] font-bold">check</span>
                  </button>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-semibold leading-tight transition-all ${
                        interactiveChecked
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      Review Dutch translation copy for marketing website
                    </p>
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                      {interactiveChecked ? '🎉 Momentum boosted to 100%!' : 'Tap the circle to mark complete'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: QUICK CAPTURE & AUTO-FETCHED URLS */}
          {currentStep === 2 && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/2 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.08] shadow-sm relative group bg-slate-100 dark:bg-slate-800">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv16_jcgWkXXNa7OpfllAgzUG5uQRaKdyhRCc_9BHTIQ3ZgIBLRDDwTDP9EIfoxDErBGfB0NVc-FaSaBrau7KsJrrrJgrFXPopBCDRw85C27iSsbv4JeLDdTq432YJNjFzZkxAERzcK9n4WOehe7cvTtu8VmajT1DgQMKyGmABFX8XXxf9j-8Ud25TkUtgY4_mLpFv0EP-fVThLkt0S8a6yB3reBj0ih0dxBKouH2-cimQc4Doz6mtA"
                    alt="Figma mobile UI canvas"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-indigo-600 dark:text-indigo-400 shadow-xs">
                    Step 2 of 3
                  </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col gap-2.5 text-left">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[16px] text-amber-500 material-symbols-fill">
                      bolt
                    </span>
                    Speed &amp; Context
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                    Quick Capture with Smart Links
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Hit the floating <span className="font-bold text-indigo-600">+</span> anytime to launch the bottom sheet. Paste documentation URLs to auto-extract titles and metadata with one tap.
                  </p>
                </div>
              </div>

              {/* Interactive Practice: Tag selection */}
              <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] flex flex-col gap-2.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Interactive Practice: Pick a project tag
                </span>
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {['#Localization', '#Design', '#Legal', '#Engineering'].map((tg) => (
                    <button
                      key={tg}
                      onClick={() => setInteractiveTag(tg)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        interactiveTag === tg
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white dark:bg-[#111319] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/[0.08]'
                      }`}
                    >
                      {tg}
                    </button>
                  ))}
                </div>
                <div className="bg-white dark:bg-[#111319] p-2.5 rounded-xl border border-slate-200/70 dark:border-white/[0.06] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-amber-500 text-[16px] material-symbols-fill">
                      auto_awesome
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                      Auto-fetched: Apple HIG Right-to-Left Layouts
                    </span>
                  </div>
                  <span className="text-[10px] font-bold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 px-2 py-0.5 rounded-full">
                    Doc Link
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: NATIVE MULTI-LANGUAGE & ARABIC RTL */}
          {currentStep === 3 && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/2 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.08] shadow-sm relative group bg-slate-100 dark:bg-slate-800">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfz9MCasd-77OwFFkGb30rbr3okWtB_o1IQKYkSK6neVKvOKk5O2Xisqv3sgK0NWk3KNrMkOQU1nXCCGTxuEF_zdyj0fc6YmQvSjcKq-fIwKGzc8dEymzTTO7ZwZhB3-bnqBIeWVojJ1K8JW4ouJoKfFmg3Akc24rm5RSUHqRZfuHW9NoSjdDeYtWoR3bVRylCq9YXk7ALvreLfKC31sm1QZ_wXdOWuz2GumbSKdJ9ZYMmhk9KZwvYSg"
                    alt="Cairo and Arabic font pairings specimen"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-indigo-600 dark:text-indigo-400 shadow-xs">
                    Step 3 of 3
                  </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col gap-2.5 text-left">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[16px]">translate</span>
                    Bi-Directional Engine
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                    English, Nederlands, and Arabic RTL
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Designed from the ground up for bidirectional UI mirroring. Switching to Arabic systematically flips navigation, touch targets, and typography without breaking alignment.
                  </p>
                </div>
              </div>

              {/* Interactive Locale Switch Preview */}
              <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] flex flex-col gap-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Experience Live Layout Mirroring
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      onSelectLanguage('en');
                      showToast('Switched to English (LTR)');
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border transition-all ${
                      language === 'en'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white dark:bg-[#111319] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10'
                    }`}
                  >
                    <span>🇬🇧 English</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectLanguage('nl');
                      showToast('Overgeschakeld naar het Nederlands');
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border transition-all ${
                      language === 'nl'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white dark:bg-[#111319] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10'
                    }`}
                  >
                    <span>🇳🇱 Nederlands</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectLanguage('ar');
                      showToast('تم التبديل للغة العربية (RTL)');
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border transition-all ${
                      language === 'ar'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white dark:bg-[#111319] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10'
                    }`}
                  >
                    <span>🇸🇦 العربية (RTL)</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
          {currentStep > 0 ? (
            <button
              onClick={handleBack}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/30 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span>{currentStep === 0 ? 'Start Interactive Tour' : currentStep === 3 ? 'Open Workspace' : 'Continue'}</span>
              <span className="material-symbols-outlined text-[16px]">
                {currentStep === 3 ? 'rocket_launch' : 'arrow_forward'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
