import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Settings2,
  Maximize2,
  Minimize2,
  Bookmark,
  Clock,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Highlighter,
  Check,
  Sparkles,
} from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

export const WebReaderPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { getBookById, updateProgress } = useLibrary();
  const book = getBookById(bookId || 'frankenstein');

  // Reader Customization State (Section 15.2)
  const [fontFamily, setFontFamily] = useState<'Merriweather' | 'Literata' | 'Inter' | 'sans-serif'>('Merriweather');
  const [fontSize, setFontSize] = useState<number>(18); // 14 to 26px
  const [lineHeight, setLineHeight] = useState<number>(1.8); // 1.4, 1.6, 1.8, 2.0
  const [columnWidth, setColumnWidth] = useState<'60ch' | '70ch' | '80ch' | '100%'>('70ch');
  const [themeMode, setThemeMode] = useState<'obsidian' | 'sepia' | 'slate'>('obsidian');

  const [distractionFree, setDistractionFree] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [readingSeconds, setReadingSeconds] = useState(140);
  const [savedBookmarks, setSavedBookmarks] = useState<string[]>([]);

  const chapters = book?.chapters || [
    {
      id: 'c1',
      title: 'Chapter I: The Journey Begins',
      paragraphs: [
        'The journey of exploration begins not with steps across terrain, but with the opening of an unread folio. In the quiet solitude of the chamber, the candlelight cast dancing silhouettes across aged parchment.',
        'Knowledge once inscribed does not perish with the ink; it reawakens within every curious reader who dares to cross its guarded marginalia.',
      ],
    },
  ];

  const currentChapter = chapters[activeChapterIndex] || chapters[0];

  // Reading Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setReadingSeconds((prev) => {
        const next = prev + 1;
        // update progress % based on chapter index
        if (book?.isLegalFreeReader) {
          const pct = Math.round(((activeChapterIndex + 1) / chapters.length) * 100);
          updateProgress(book.id, Math.round((pct / 100) * book.totalPages), pct);
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [book, activeChapterIndex, chapters.length, updateProgress]);

  if (!book) {
    return (
      <div className="p-12 text-center text-gray-400">
        <p>Book not available for online reading.</p>
        <Link to="/discover" className="text-amber-300 underline mt-2 inline-block">
          Return to Discover
        </Link>
      </div>
    );
  }

  // Theme palettes from design.md
  const themeStyles = {
    obsidian: {
      bg: 'bg-[#080B10]',
      text: 'text-[#E5E7EB]',
      headerBg: 'bg-[#10141E]/80 backdrop-blur-2xl border-white/[0.08]',
      border: 'border-white/[0.08]',
    },
    sepia: {
      bg: 'bg-[#161310]',
      text: 'text-[#D1C7BD]',
      headerBg: 'bg-[#1C1814]/80 backdrop-blur-2xl border-[#3D352E]',
      border: 'border-[#3D352E]',
    },
    slate: {
      bg: 'bg-[#0B1120]',
      text: 'text-[#94A3B8]',
      headerBg: 'bg-[#131D31]/80 backdrop-blur-2xl border-slate-700/50',
      border: 'border-slate-700/50',
    },
  };

  const currentTheme = themeStyles[themeMode];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = Math.round(((activeChapterIndex + 1) / chapters.length) * 100);

  const toggleBookmark = () => {
    const mark = `${currentChapter.title} - ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    if (savedBookmarks.includes(mark)) {
      setSavedBookmarks(savedBookmarks.filter((b) => b !== mark));
    } else {
      setSavedBookmarks([...savedBookmarks, mark]);
    }
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} transition-colors duration-300 flex flex-col relative select-none`}>
      {/* Top Header Chrome: Liquid Glass Bar */}
      {!distractionFree && (
        <header
          className={`h-16 px-6 flex items-center justify-between border-b ${currentTheme.headerBg} shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.14)] sticky top-0 z-30`}
        >
          <div className="flex items-center gap-4">
            <Link
              to={`/book/${book.id}`}
              className="flex items-center gap-2 text-xs text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Exit Reader</span>
            </Link>
            <div className="h-4 w-px bg-white/10" />
            <div>
              <h2 className="text-sm font-semibold truncate max-w-[220px] sm:max-w-md font-heading text-white">
                {book.title}
              </h2>
              <p className="text-[11px] text-gray-400 truncate">{book.author}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Reading Timer */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-amber-200 font-mono bg-white/[0.06] border border-white/10 px-3 py-1 rounded-full shadow-sm">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>{formatTime(readingSeconds)}</span>
            </div>

            {/* Bookmark button */}
            <button
              onClick={toggleBookmark}
              className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-amber-300 transition-colors"
              title="Bookmark current position"
            >
              <Bookmark className="w-4 h-4" />
            </button>

            {/* Settings trigger */}
            <button
              onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
              className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              title="Typography & Appearance"
            >
              <Settings2 className="w-4 h-4" />
            </button>

            {/* Distraction free toggle */}
            <button
              onClick={() => setDistractionFree(true)}
              className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              title="Distraction-Free Mode"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </header>
      )}

      {/* Floating Exit Button when in Distraction-Free Mode */}
      {distractionFree && (
        <button
          onClick={() => setDistractionFree(false)}
          className="fixed top-4 right-4 z-40 p-2.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-xl text-gray-300 hover:text-white border border-white/20 transition-all shadow-2xl"
          title="Exit Distraction-Free"
        >
          <Minimize2 className="w-4 h-4" />
        </button>
      )}

      {/* Typography & Controls Floating Drawer with Liquid Glass Styling */}
      {showSettingsDrawer && !distractionFree && (
        <div className="fixed top-20 right-6 z-40 w-80 rounded-[24px] bg-gradient-to-b from-[#181D2A]/95 to-[#10141E]/95 backdrop-blur-2xl border border-white/15 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_1.5px_rgba(255,255,255,0.20)] space-y-5 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h4 className="font-heading font-semibold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Reader Typography
            </h4>
            <button
              onClick={() => setShowSettingsDrawer(false)}
              className="text-gray-400 hover:text-white text-xs"
            >
              ✕
            </button>
          </div>

          {/* Theme Selector */}
          <div>
            <label className="block text-[11px] text-gray-400 mb-2 font-medium">
              Theme Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'obsidian', label: 'Obsidian', bg: 'bg-[#0A0C0E]', border: 'border-gray-700' },
                { id: 'sepia', label: 'Dark Sepia', bg: 'bg-[#181512]', border: 'border-[#3D352E]' },
                { id: 'slate', label: 'Slate', bg: 'bg-[#0F172A]', border: 'border-slate-700' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setThemeMode(t.id as any)}
                  className={`p-2 rounded-xl text-xs flex flex-col items-center gap-1 border transition-all ${
                    themeMode === t.id
                      ? 'border-amber-400 text-amber-200 ring-1 ring-amber-400/50 shadow-sm'
                      : 'border-white/10 text-gray-400 hover:text-white'
                  } ${t.bg}`}
                >
                  <span className="text-[10px] font-medium">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Font Family Selection */}
          <div>
            <label className="block text-[11px] text-gray-400 mb-2 font-medium">
              Typeface
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'Merriweather', label: 'Merriweather Serif' },
                { id: 'Literata', label: 'Literata Classic' },
                { id: 'Inter', label: 'Inter Sans' },
                { id: 'sans-serif', label: 'Accessible' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFontFamily(f.id as any)}
                  className={`p-2 rounded-xl border text-left transition-all ${
                    fontFamily === f.id
                      ? 'border-amber-400 text-amber-200 bg-amber-500/15 font-semibold'
                      : 'border-white/10 text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size Adjuster (14px - 26px) */}
          <div>
            <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
              <span>Font Scale</span>
              <span className="font-mono text-amber-300">{fontSize}px</span>
            </div>
            <input
              type="range"
              min={14}
              max={26}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          {/* Column Width (60ch, 70ch, 80ch, 100%) */}
          <div>
            <label className="block text-[11px] text-gray-400 mb-1 font-medium">
              Column Width Constraint
            </label>
            <div className="grid grid-cols-4 gap-1 text-[11px]">
              {(['60ch', '70ch', '80ch', '100%'] as const).map((w) => (
                <button
                  key={w}
                  onClick={() => setColumnWidth(w)}
                  className={`p-1.5 rounded-lg border text-center transition-all ${
                    columnWidth === w
                      ? 'border-amber-400 text-amber-200 bg-amber-500/15 font-bold shadow-sm'
                      : 'border-white/10 text-gray-400'
                  }`}
                >
                  {w === '100%' ? 'Full' : w}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Reading Canvas */}
      <main className="flex-1 flex flex-col items-center justify-start p-6 md:p-14 overflow-y-auto">
        <div
          style={{
            maxWidth: columnWidth,
            fontFamily:
              fontFamily === 'Merriweather'
                ? 'Merriweather, serif'
                : fontFamily === 'Literata'
                ? 'Literata, serif'
                : 'Inter, sans-serif',
            fontSize: `${fontSize}px`,
            lineHeight: lineHeight,
          }}
          className="w-full space-y-8 select-text transition-all"
        >
          {/* Chapter Header */}
          <div className="pb-6 border-b border-white/10 text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-sans font-semibold">
              Legal Edition • Chapter {activeChapterIndex + 1} of {chapters.length}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold font-playfair tracking-tight text-white">
              {currentChapter.title}
            </h1>
          </div>

          {/* Chapter Paragraphs */}
          <div className="space-y-6 text-justify">
            {currentChapter.paragraphs.map((para, idx) => (
              <p key={idx} className="indent-6">
                {para}
              </p>
            ))}
          </div>

          {/* Chapter Navigation Controls */}
          <div className="pt-12 pb-6 border-t border-white/10 flex items-center justify-between font-sans text-xs">
            <button
              disabled={activeChapterIndex === 0}
              onClick={() => {
                setActiveChapterIndex((prev) => Math.max(0, prev - 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 disabled:opacity-30 hover:border-amber-400 text-gray-300 hover:text-white transition-all shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Chapter
            </button>

            <span className="text-gray-400 font-mono">
              {activeChapterIndex + 1} / {chapters.length}
            </span>

            <button
              disabled={activeChapterIndex === chapters.length - 1}
              onClick={() => {
                setActiveChapterIndex((prev) => Math.min(chapters.length - 1, prev + 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 disabled:opacity-30 hover:border-amber-400 text-gray-300 hover:text-white transition-all shadow-sm"
            >
              Next Chapter <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Sticky Progress Dock with Liquid Glass Glow */}
      {!distractionFree && (
        <footer
          className={`h-12 px-6 flex items-center justify-between border-t ${currentTheme.headerBg} text-xs font-sans shadow-[0_-4px_20px_rgba(0,0,0,0.4)]`}
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span className="text-gray-400">Overall Completion:</span>
            <span className="font-bold text-amber-300 font-mono">
              {progressPercent}%
            </span>
          </div>

          <div className="w-48 hidden sm:block h-1.5 rounded-full bg-black/40 overflow-hidden p-0.5 border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(224,168,46,0.6)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="text-gray-400">
            {savedBookmarks.length > 0 && (
              <span>Bookmarks saved: {savedBookmarks.length}</span>
            )}
          </div>
        </footer>
      )}
    </div>
  );
};
