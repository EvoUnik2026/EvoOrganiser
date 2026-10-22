import React, { useState } from 'react';
import { Language } from '../types';

interface ArabicTypographyLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSetArabicFont?: (font: 'noto' | 'cairo' | 'ibm') => void;
  currentFont?: 'noto' | 'cairo' | 'ibm';
  showToast: (msg: string) => void;
}

export const ArabicTypographyLabModal: React.FC<ArabicTypographyLabModalProps> = ({
  isOpen,
  onClose,
  onSetArabicFont,
  currentFont = 'noto',
  showToast,
}) => {
  const [selectedFont, setSelectedFont] = useState<'noto' | 'cairo' | 'ibm'>(currentFont);
  const [numeralMode, setNumeralMode] = useState<'western' | 'eastern'>('western');
  const [tashkeelLevel, setTashkeelLevel] = useState<'full' | 'simple' | 'none'>('full');
  const [customText, setCustomText] = useState('التَّوَازُنُ الطِّبَاعِيُّ لِلْوَاجِهَاتِ ثُنَائِيَّةِ الِاتِّجَاهِ');
  const [activeTab, setActiveTab] = useState<'specimen' | 'bidi' | 'mirroring' | 'sandbox'>('specimen');

  if (!isOpen) return null;

  const fontClasses: Record<'noto' | 'cairo' | 'ibm', string> = {
    noto: 'font-noto-arabic',
    cairo: 'font-cairo',
    ibm: 'font-ibm-plex',
  };

  const fontClass = fontClasses[selectedFont];

  const handleApplyFont = (f: 'noto' | 'cairo' | 'ibm') => {
    setSelectedFont(f);
    if (onSetArabicFont) onSetArabicFont(f);
    showToast(`Applied ${f === 'noto' ? 'Noto Sans Arabic' : f === 'cairo' ? 'Cairo' : 'IBM Plex Sans Arabic'} across app`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 dark:bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto no-scrollbar animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-white dark:bg-[#111319] rounded-3xl shadow-2xl border border-slate-200/90 dark:border-white/[0.1] overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">translate</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Arabic RTL Typography &amp; BiDi Lab
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">
                  Spec Suite
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Calibrated optical scaling, ligature balancing, and bidirectional mirroring
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Font Selector Bar */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-white/[0.06] flex items-center justify-between gap-3 flex-wrap">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Active Arabic Typeface:
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleApplyFont('noto')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedFont === 'noto'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-[#111319] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
              }`}
            >
              Noto Sans Arabic (Neutral)
            </button>

            <button
              onClick={() => handleApplyFont('cairo')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedFont === 'cairo'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-[#111319] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
              }`}
            >
              Cairo (Modern Kufic)
            </button>

            <button
              onClick={() => handleApplyFont('ibm')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedFont === 'ibm'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-[#111319] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
              }`}
            >
              IBM Plex Sans Arabic (Technical)
            </button>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="px-6 pt-3 flex items-center gap-2 border-b border-slate-100 dark:border-white/[0.06] overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('specimen')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'specimen'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">font_download</span>
            <span>Type Hierarchy</span>
          </button>

          <button
            onClick={() => setActiveTab('bidi')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'bidi'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">sync_alt</span>
            <span>BiDi &amp; Numerals</span>
          </button>

          <button
            onClick={() => setActiveTab('mirroring')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'mirroring'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">flip</span>
            <span>Logical Mirroring</span>
          </button>

          <button
            onClick={() => setActiveTab('sandbox')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'sandbox'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">edit_square</span>
            <span>Live Sandbox</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto no-scrollbar flex-1 space-y-6">
          {/* TAB 1: TYPE SPECIMEN */}
          {activeTab === 'specimen' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Hotlinked Reference Banner */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.08] relative h-36 bg-slate-100 dark:bg-slate-800">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxDdUXgIYN4PvT48LKCKvpfku5vMRdYL4fF1eFfWi9CkjZwi86j1DRg2c2HnJC7U2p01tG1xPMvgx-ggQM_Pdz7W2vivq17XrkQpkB2auPFYK7v8lZnxXYV9nYBzV0Qr5eb3aoQ_yy6mRz0b3Yj9xdy5ZBl9NpWX1Le5mvmAqbEudE8JVXUpEnLSaEhwl7dZsEHQkctOk4GhsKfVwHZWtBpqhPFj0CO6J-uxoiAnSMVSmA2JI3-_PNwg"
                  alt="Arabic calligraphy specimen"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                  <div className="flex items-center justify-between w-full text-white text-xs">
                    <span className="font-bold">Al-Dirasa Arabic Typography Principles</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                      +20% Line-Height Baseline
                    </span>
                  </div>
                </div>
              </div>

              {/* Type Hierarchy Specimens in Selected Font */}
              <div dir="rtl" className={`space-y-4 ${fontClass}`}>
                {/* Display */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-white/[0.06]">
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider block mb-1">
                    Display 28px / SemiBold
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-relaxed">
                    إِتْقَانُ التَّصْمِيمِ وَالتَّرْكِيزِ فِي بِيئَةِ عَمَلٍ وَاحِدَةٍ
                  </h1>
                </div>

                {/* Headline */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-white/[0.06]">
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider block mb-1">
                    Headline 20px / Medium
                  </span>
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white leading-relaxed">
                    مُرَاجَعَةُ حُرُوفِ النَّسْخِ وَالْكُوفِيِّ عَلَى شَاشَاتِ الْهَوَاتِفِ الذَّكِيَّةِ
                  </h2>
                </div>

                {/* Body Text with Diacritics */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-white/[0.06]">
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider block mb-1">
                    Body Prose 14px / Regular (With Full Tashkeel)
                  </span>
                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-loose">
                    تَتَمَيَّزُ الْأَبْجَدِيَّةُ الْعَرَبِيَّةُ بِطَبِيعَتِهَا الْمُتَّصِلَةِ وَتَنَاسُقِ خُطُوطِ الْأَسَاسِ، مِمَّا يَتَطَلَّبُ زِيَادَةَ ارْتِفَاعِ السَّطْرِ بِنِسْبَةِ ١٥٪ إِلَى ٢٠٪ لِمَنْعِ تَدَاخُلِ حَرَكَاتِ التَّشْكِيلِ مَعَ الْحُرُوفِ الصَّاعِدَةِ وَالْهَابِطَةِ.
                  </p>
                </div>

                {/* Micro Label */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-white/[0.06]">
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider block mb-1">
                    Micro Labels 11px (+1px Optical Compensation)
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                      أَوْلَوِيَّةٌ قُصْوَى
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                      تَخْطِيطٌ ثُنَائِيُّ الِاتِّجَاهِ
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-semibold">
                      تَوْثِيقٌ مُعْتَمَدٌ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BIDI & NUMERALS */}
          {activeTab === 'bidi' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Numeral System Toggle */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-white/[0.06]">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Numeral Representation
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Switch between Western Arabic (1, 2, 3) and Eastern Arabic (١، ٢، ٣) numerals
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setNumeralMode('western')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      numeralMode === 'western'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white dark:bg-[#111319] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                    }`}
                  >
                    1, 2, 3 (Western)
                  </button>
                  <button
                    onClick={() => setNumeralMode('eastern')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      numeralMode === 'eastern'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white dark:bg-[#111319] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                    }`}
                  >
                    ١، ٢، ٣ (Eastern)
                  </button>
                </div>
              </div>

              {/* Mixed BiDi String Stress Test */}
              <div dir="rtl" className={`p-5 rounded-2xl bg-white dark:bg-[#111319] border border-slate-200/80 dark:border-white/[0.08] shadow-sm space-y-3 ${fontClass}`}>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Bidirectional Sentence Isolation Test (Mixing Arabic + Latin Brands + Tech Specs)
                </span>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/[0.04] text-base leading-relaxed text-slate-900 dark:text-white">
                  تم إطلاق تحديث تطبيق <span className="font-bold text-indigo-600 dark:text-indigo-400 font-sans" dir="ltr">TaskFlow v2.4</span> على نظامي <span className="font-sans" dir="ltr">iOS</span> و <span className="font-sans" dir="ltr">Android</span> بحلول الساعة {numeralMode === 'eastern' ? '٠٢:٠٠ م' : '2:00 PM'} بموجب معايير <span className="font-sans" dir="ltr">Apple HIG</span>.
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                  <p>✔ Latin brands maintain correct LTR left-to-right reading order inside RTL flow.</p>
                  <p>✔ Version numbers (<code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">v2.4</code>) do not swap punctuation positions.</p>
                  <p>✔ Closing parentheses align naturally on the correct side.</p>
                </div>
              </div>

              {/* LTR Exceptions Box (Scrub bars & Timecodes) */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-white/[0.06] space-y-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-indigo-600 dark:text-indigo-400">
                    linear_scale
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    LTR Invariant Exception (Audio Scrubber &amp; Timecodes)
                  </h4>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Per technical spec: Audio scrub bars, progress timelines, and timecodes remain strictly LTR even in complete Arabic RTL contexts to match physical playback acoustics.
                </p>

                {/* Simulated Audio Scrub Bar (Forced LTR) */}
                <div className="force-ltr bg-white dark:bg-[#111319] p-4 rounded-xl border border-slate-200 dark:border-white/10 flex items-center gap-3">
                  <button className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  </button>
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-300">01:42</span>
                  <div className="flex-1 bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full w-[45%] rounded-full"></div>
                  </div>
                  <span className="text-xs font-mono text-slate-400">03:45</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LOGICAL MIRRORING */}
          {activeTab === 'mirroring' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-500/30 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                <strong>Material 3 &amp; HIG Mirroring Standard:</strong> When switched to RTL, navigational hierarchies reverse. The Back button points to the right (<span className="material-symbols-outlined text-[14px] inline-block align-middle">arrow_forward</span>), selection checkboxes anchor to the leading edge (right), and logical paddings (<code className="font-mono bg-white dark:bg-slate-800 px-1 py-0.5 rounded">ps-</code> / <code className="font-mono bg-white dark:bg-slate-800 px-1 py-0.5 rounded">pe-</code>) replace physical bindings.
              </div>

              {/* Side by Side LTR vs RTL Card Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* LTR Card */}
                <div dir="ltr" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/[0.08] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      English / LTR Layout
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-slate-400">
                      arrow_forward_ios
                    </span>
                  </div>

                  <div className="flex items-start gap-3 bg-white dark:bg-[#111319] p-3 rounded-xl border border-slate-200/60 dark:border-white/[0.04]">
                    <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        Translate privacy policy
                      </p>
                      <span className="text-[10px] text-slate-400">2:00 PM • #Product</span>
                    </div>
                  </div>
                </div>

                {/* RTL Card */}
                <div dir="rtl" className={`p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/[0.08] space-y-3 ${fontClass}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      العربية / تخطيط RTL المتطابق
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-slate-400 transform rotate-180">
                      arrow_forward_ios
                    </span>
                  </div>

                  <div className="flex items-start gap-3 bg-white dark:bg-[#111319] p-3 rounded-xl border border-slate-200/60 dark:border-white/[0.04]">
                    <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        ترجمة سياسة الخصوصية
                      </p>
                      <span className="text-[10px] text-slate-400">٢:٠٠ م • #المنتج</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LIVE SANDBOX */}
          {activeTab === 'sandbox' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Type or Paste Arabic Phrase (Stress Test Ligatures &amp; Diacritics)
                </label>
                <textarea
                  dir="rtl"
                  rows={3}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className={`w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 text-base text-slate-900 dark:text-white outline-none border border-slate-200 dark:border-slate-800 focus:border-indigo-500 transition-colors leading-loose ${fontClass}`}
                />
              </div>

              {/* Sample Ligature Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-slate-400">Quick Samples:</span>
                {[
                  'لَا إِلٰهَ إِلَّا اللّٰه',
                  'تَطْبِيقَاتُ الْجَوَّالِ ثُنَائِيَّةِ الِاتِّجَاهِ (BiDi)',
                  'مِيرَاثُ الْخَطِّ الْعَرَبِيِّ الْأَصِيلِ',
                  'TaskFlow: دِقَّةٌ فِي التَّصْمِيمِ وَسُرْعَةٌ فِي الْإِنْجَازِ',
                ].map((sample) => (
                  <button
                    key={sample}
                    onClick={() => setCustomText(sample)}
                    dir="rtl"
                    className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors"
                  >
                    {sample}
                  </button>
                ))}
              </div>

              {/* Live Render Canvas */}
              <div
                dir="rtl"
                className={`p-6 rounded-2xl bg-white dark:bg-[#111319] border border-slate-200/80 dark:border-white/[0.08] shadow-sm ${fontClass}`}
              >
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-2 font-sans" dir="ltr">
                  Live Render Output in {selectedFont === 'noto' ? 'Noto Sans Arabic' : selectedFont === 'cairo' ? 'Cairo' : 'IBM Plex Sans Arabic'}:
                </span>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-loose break-words">
                  {customText || 'اكتب نصاً عربياً للمعاينة...'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Current typeface: <strong>{selectedFont === 'noto' ? 'Noto Sans Arabic' : selectedFont === 'cairo' ? 'Cairo' : 'IBM Plex Sans Arabic'}</strong>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                handleApplyFont(selectedFont);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/30 transition-all active:scale-95"
            >
              Apply &amp; Close Lab
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
