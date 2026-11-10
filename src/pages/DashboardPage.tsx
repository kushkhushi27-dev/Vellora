import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  Zap,
  Star,
  Target,
  Sparkles,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Search,
  Compass,
  Bookmark,
  Users,
  Award,
  Flame,
  MessageSquare,
  Layers,
  Heart,
  Play,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLibrary } from '../context/LibraryContext';
import { useMuse } from '../context/MuseContext';
import { useSocial } from '../context/SocialContext';
import { mockBooks } from '../data/mockData';
import { BookCard } from '../components/common/BookCard';
import { Book } from '../types';
import { getBooksByGenre, getTrendingBooks } from '../services/openLibraryService';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { library, registerBooks } = useLibrary();
  const { sendMessage } = useMuse();
  const { friends } = useSocial();
  const navigate = useNavigate();

  // Time-of-day greeting (Section 1)
  const [greeting, setGreeting] = useState('Welcome');
  const [quickSearch, setQuickSearch] = useState('');
  const [selectedGenreFilter, setSelectedGenreFilter] = useState<string | null>(null);

  // Real Open Library Books by Genre
  const [fantasyBooks, setFantasyBooks] = useState<Book[]>(() =>
    mockBooks.filter((b) => b.genres.some((g) => g.toLowerCase().includes('fantasy')))
  );
  const [romanceBooks, setRomanceBooks] = useState<Book[]>(() =>
    mockBooks.filter((b) => b.genres.some((g) => g.toLowerCase().includes('romance')))
  );
  const [mysteryBooks, setMysteryBooks] = useState<Book[]>(() =>
    mockBooks.filter((b) => b.genres.some((g) => g.toLowerCase().includes('mystery') || g.toLowerCase().includes('thriller')))
  );
  const [scifiBooks, setScifiBooks] = useState<Book[]>(() =>
    mockBooks.filter((b) => b.genres.some((g) => g.toLowerCase().includes('sci-fi') || g.toLowerCase().includes('science fiction')))
  );
  const [trendingList, setTrendingList] = useState<Book[]>(() => [
    { ...mockBooks[0] },
    { ...mockBooks[9] },
    { ...mockBooks[11] },
    { ...mockBooks[6] },
    { ...mockBooks[5] },
  ]);

  useEffect(() => {
    // Load real genre books from Open Library
    let isMounted = true;

    Promise.all([
      getBooksByGenre('Fantasy', 8),
      getBooksByGenre('Romance', 8),
      getBooksByGenre('Mystery', 8),
      getBooksByGenre('Science Fiction', 8),
      getTrendingBooks(5),
    ]).then(([fantasy, romance, mystery, scifi, trending]) => {
      if (!isMounted) return;
      if (fantasy.length > 0) {
        setFantasyBooks(fantasy);
        registerBooks(fantasy);
      }
      if (romance.length > 0) {
        setRomanceBooks(romance);
        registerBooks(romance);
      }
      if (mystery.length > 0) {
        setMysteryBooks(mystery);
        registerBooks(mystery);
      }
      if (scifi.length > 0) {
        setScifiBooks(scifi);
        registerBooks(scifi);
      }
      if (trending.length > 0) {
        setTrendingList(trending);
        registerBooks(trending);
      }
    }).catch((err) => {
      console.warn('[DashboardPage] Open Library background sync note:', err);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/discover?q=${encodeURIComponent(quickSearch.trim())}`);
    }
  };

  // Section 2: Personal Reading Stats
  const booksCompleted = Object.values(library).filter((i) => i.status === 'Completed').length || 34;
  const currentlyReadingCount = Object.values(library).filter((i) => i.status === 'Currently Reading').length || 2;
  const activeReadingBooks = Object.entries(library)
    .filter(([_, i]) => i.status === 'Currently Reading')
    .map(([id]) => mockBooks.find((b) => b.id === id))
    .filter(Boolean) as Book[];

  const annualGoal = user?.annualGoal || 50;
  const goalProgressPercent = Math.min(100, Math.round((booksCompleted / annualGoal) * 100));

  // Section 3: Personalized Recommendations ("Picked for your taste")
  const pickedForYou: { book: Book; reason: string }[] = [
    {
      book: mockBooks.find((b) => b.id === 'shadow_wind') || mockBooks[7],
      reason: 'Because you loved Frankenstein & gothic lore',
    },
    {
      book: mockBooks.find((b) => b.id === 'name_of_the_wind') || mockBooks[9],
      reason: 'Matched to your High Fantasy preference',
    },
    {
      book: mockBooks.find((b) => b.id === 'wuthering_heights') || mockBooks[8],
      reason: 'Atmospheric romance with morally grey anti-heroes',
    },
    {
      book: mockBooks.find((b) => b.id === 'silent_patient') || mockBooks[7],
      reason: 'Top psychological mystery among your literary peers',
    },
    {
      book: mockBooks.find((b) => b.id === 'dune') || mockBooks[6],
      reason: 'Philosophical epic matching your reading depth',
    },
  ];

  // Section 4: Genre Tiles
  const genresList = [
    { name: 'Fantasy', icon: '🏰', count: '14,200+ titles', gradient: 'from-amber-500/20 via-purple-600/15 to-transparent', border: 'hover:border-amber-400/40' },
    { name: 'Romance', icon: '🥀', count: '18,400+ titles', gradient: 'from-rose-500/20 via-pink-600/15 to-transparent', border: 'hover:border-rose-400/40' },
    { name: 'Dark Romance', icon: '🖤', count: '6,100+ titles', gradient: 'from-zinc-500/20 via-red-900/15 to-transparent', border: 'hover:border-zinc-400/40' },
    { name: 'Mystery', icon: '🗝️', count: '9,800+ titles', gradient: 'from-indigo-500/20 via-slate-600/15 to-transparent', border: 'hover:border-indigo-400/40' },
    { name: 'Thriller', icon: '⚡', count: '8,200+ titles', gradient: 'from-orange-500/20 via-amber-600/15 to-transparent', border: 'hover:border-orange-400/40' },
    { name: 'Horror', icon: '🕯️', count: '5,400+ titles', gradient: 'from-neutral-500/20 via-emerald-900/15 to-transparent', border: 'hover:border-emerald-400/40' },
    { name: 'Science Fiction', icon: '🚀', count: '11,300+ titles', gradient: 'from-cyan-500/20 via-blue-600/15 to-transparent', border: 'hover:border-cyan-400/40' },
    { name: 'Historical Fiction', icon: '📜', count: '7,900+ titles', gradient: 'from-yellow-500/20 via-amber-700/15 to-transparent', border: 'hover:border-yellow-400/40' },
    { name: 'Contemporary Fiction', icon: '☕', count: '12,100+ titles', gradient: 'from-teal-500/20 via-slate-700/15 to-transparent', border: 'hover:border-teal-400/40' },
    { name: 'Adventure', icon: '🧭', count: '9,100+ titles', gradient: 'from-emerald-500/20 via-lime-600/15 to-transparent', border: 'hover:border-emerald-400/40' },
    { name: 'Psychological Fiction', icon: '♟️', count: '6,700+ titles', gradient: 'from-purple-500/20 via-violet-600/15 to-transparent', border: 'hover:border-purple-400/40' },
    { name: 'Literary Fiction', icon: '🖋️', count: '10,500+ titles', gradient: 'from-stone-500/20 via-slate-800/15 to-transparent', border: 'hover:border-stone-400/40' },
  ];

  // Section 5: Categorized Books by Genre (Web Novels separate per prompt instructions)
  const webNovels = mockBooks.filter((b) => b.format === 'Web Novel' || b.genres.some((g) => g.toLowerCase().includes('web novel')));

  return (
    <div className="p-5 md:p-8 space-y-10 max-w-[1440px] mx-auto select-none">
      {/* =========================================================================
          SECTION 1: PERSONALIZED WELCOME (Liquid Glass Floating Panel with Specular Sheen)
          ========================================================================= */}
      <section className="relative liquid-glass-card p-6 md:p-8 overflow-hidden rounded-[26px]">
        {/* Soft atmospheric gradient scrim with subtle ambient color bloom */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/[0.06] via-transparent to-purple-500/[0.06] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-yellow-400/10 to-purple-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-200 font-heading flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/15 to-purple-500/15 backdrop-blur-xl border border-amber-300/25 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" /> Reading Headquarters
              </span>
            </div>
            <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
              {greeting}, <span className="font-normal italic font-serif text-gray-200">{user?.displayName || 'Amy'}</span>.
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 font-sans max-w-xl">
              Your next favourite story is waiting to be discovered across curated literary archives.
            </p>
          </div>

          {/* Quick Search & Muse Shortcut */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <form onSubmit={handleSearchSubmit} className="relative min-w-[260px] sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder="Search catalog, authors, tropes..."
                className="w-full h-11 bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.14] border border-white/[0.12] focus:border-vellora-ice/60 rounded-full pl-11 pr-4 text-xs text-white placeholder-gray-400 focus:outline-none transition-all shadow-[0_4px_16px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.14)] focus:shadow-[0_0_18px_rgba(147,197,253,0.18)]"
              />
            </form>

            <Link
              to="/muse"
              className="liquid-btn-primary h-11 px-6 text-xs whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-yellow-950 fill-yellow-950" />
              <span>Ask Muse</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: PERSONAL READING OVERVIEW (Liquid Glass Stats Cards with Color Refractions)
          ========================================================================= */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-heading font-semibold text-sm text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-300" />
            <span>Personal Reading Overview</span>
          </h2>
          <Link to="/library" className="text-xs text-gray-400 hover:text-white transition-colors font-medium">
            Manage Shelf →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {/* 1. Books Completed (Champagne Gold Refraction) */}
          <div className="group relative rounded-2xl p-4 flex flex-col justify-between bg-gradient-to-b from-amber-500/[0.08] to-transparent bg-[#151924]/70 backdrop-blur-2xl border border-white/[0.09] hover:border-amber-400/35 transition-all duration-300 shadow-[0_12px_32px_-6px_rgba(0,0,0,0.45),inset_0_1px_1.5px_rgba(255,255,255,0.18)] hover:shadow-[0_16px_40px_-6px_rgba(0,0,0,0.6),0_0_18px_rgba(224,168,46,0.15)]">
            <div className="flex items-center justify-between text-gray-300">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-200">Completed</span>
              <BookOpen className="w-4 h-4 text-yellow-300" />
            </div>
            <div className="my-2.5">
              <span className="text-2xl font-bold font-heading text-white">
                {booksCompleted}
              </span>
              <span className="text-xs text-gray-300 ml-1.5 font-medium">books</span>
            </div>
            <div className="text-[10px] text-gray-400">
              Goal: {booksCompleted} / {annualGoal}
            </div>
          </div>

          {/* 2. Currently Reading (Emerald Green Refraction) */}
          <div className="group relative rounded-2xl p-4 flex flex-col justify-between bg-gradient-to-b from-emerald-500/[0.08] to-transparent bg-[#151924]/70 backdrop-blur-2xl border border-white/[0.09] hover:border-emerald-400/35 transition-all duration-300 shadow-[0_12px_32px_-6px_rgba(0,0,0,0.45),inset_0_1px_1.5px_rgba(255,255,255,0.18)] hover:shadow-[0_16px_40px_-6px_rgba(0,0,0,0.6),0_0_18px_rgba(78,159,112,0.15)]">
            <div className="flex items-center justify-between text-gray-300">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-200">Active Reads</span>
              <Layers className="w-4 h-4 text-emerald-300" />
            </div>
            <div className="my-2.5 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-heading text-white">
                {currentlyReadingCount}
              </span>
              <span className="text-xs text-gray-300 font-medium">in progress</span>
            </div>
            {activeReadingBooks.length > 0 ? (
              <div className="flex items-center gap-1.5 truncate text-[10px] text-emerald-300 font-medium">
                <span className="truncate">{activeReadingBooks[0].title}</span>
              </div>
            ) : (
              <span className="text-[10px] text-gray-400">No active books</span>
            )}
          </div>

          {/* 3. Total Reading Time (Amber / Orange Refraction) */}
          <div className="group relative rounded-2xl p-4 flex flex-col justify-between bg-gradient-to-b from-orange-500/[0.08] to-transparent bg-[#151924]/70 backdrop-blur-2xl border border-white/[0.09] hover:border-orange-400/35 transition-all duration-300 shadow-[0_12px_32px_-6px_rgba(0,0,0,0.45),inset_0_1px_1.5px_rgba(255,255,255,0.18)] hover:shadow-[0_16px_40px_-6px_rgba(0,0,0,0.6),0_0_18px_rgba(251,146,60,0.15)]">
            <div className="flex items-center justify-between text-gray-300">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-orange-200">Reading Time</span>
              <Clock className="w-4 h-4 text-orange-300" />
            </div>
            <div className="my-2.5">
              <span className="text-2xl font-bold font-heading text-white">
                48.5
              </span>
              <span className="text-xs text-gray-300 ml-1.5 font-medium">hrs</span>
            </div>
            <div className="text-[10px] text-gray-400">
              6:24 hrs this week
            </div>
          </div>

          {/* 4. Reading Streak (Ice Blue / Cyan Refraction) */}
          <div className="group relative rounded-2xl p-4 flex flex-col justify-between bg-gradient-to-b from-cyan-500/[0.08] to-transparent bg-[#151924]/70 backdrop-blur-2xl border border-white/[0.09] hover:border-cyan-400/35 transition-all duration-300 shadow-[0_12px_32px_-6px_rgba(0,0,0,0.45),inset_0_1px_1.5px_rgba(255,255,255,0.18)] hover:shadow-[0_16px_40px_-6px_rgba(0,0,0,0.6),0_0_18px_rgba(56,189,248,0.15)]">
            <div className="flex items-center justify-between text-gray-300">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-200">Streak</span>
              <Zap className="w-4 h-4 text-cyan-300 fill-cyan-300/30" />
            </div>
            <div className="my-2.5">
              <span className="text-2xl font-bold font-heading text-white">
                {user?.streakDays || 7}
              </span>
              <span className="text-xs text-gray-300 ml-1.5 font-medium">days</span>
            </div>
            <div className="text-[10px] text-cyan-300 font-medium">
              19% more consistent
            </div>
          </div>

          {/* 5. Average Rating Given (Lavender / Violet Refraction) */}
          <div className="group relative rounded-2xl p-4 flex flex-col justify-between bg-gradient-to-b from-purple-500/[0.08] to-transparent bg-[#151924]/70 backdrop-blur-2xl border border-white/[0.09] hover:border-purple-400/35 transition-all duration-300 shadow-[0_12px_32px_-6px_rgba(0,0,0,0.45),inset_0_1px_1.5px_rgba(255,255,255,0.18)] hover:shadow-[0_16px_40px_-6px_rgba(0,0,0,0.6),0_0_18px_rgba(196,181,253,0.15)]">
            <div className="flex items-center justify-between text-gray-300">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-200">Avg Rating</span>
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300/30" />
            </div>
            <div className="my-2.5">
              <span className="text-2xl font-bold font-heading text-white">
                9.1
              </span>
              <span className="text-xs text-gray-300 ml-1.5 font-medium">/ 10</span>
            </div>
            <div className="text-[10px] text-gray-400">
              Across 18 reviews
            </div>
          </div>

          {/* 6. Reading Goal Progress (Amethyst Refraction with Gloss Bar) */}
          <div className="group relative rounded-2xl p-4 flex flex-col justify-between bg-gradient-to-b from-fuchsia-500/[0.08] to-transparent bg-[#151924]/70 backdrop-blur-2xl border border-white/[0.09] hover:border-fuchsia-400/35 transition-all duration-300 shadow-[0_12px_32px_-6px_rgba(0,0,0,0.45),inset_0_1px_1.5px_rgba(255,255,255,0.18)] hover:shadow-[0_16px_40px_-6px_rgba(0,0,0,0.6),0_0_18px_rgba(217,70,239,0.15)]">
            <div className="flex items-center justify-between text-gray-300">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-fuchsia-200">Annual Goal</span>
              <Award className="w-4 h-4 text-fuchsia-300" />
            </div>
            <div className="my-2.5 flex items-baseline gap-1">
              <span className="text-2xl font-bold font-heading text-white">
                {goalProgressPercent}%
              </span>
            </div>
            <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="bg-gradient-to-r from-yellow-300 via-amber-400 to-fuchsia-400 h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(224,168,46,0.5)]"
                style={{ width: `${goalProgressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: PICKED FOR YOUR TASTE (Liquid Glass Cards with Iridescent Hover Edges)
          ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="font-heading font-semibold text-lg text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Picked For Your Taste</span>
            </h2>
            <p className="text-xs text-gray-300 mt-0.5">
              Personalized selections matched to your gothic, high fantasy & philosophical reading history.
            </p>
          </div>
          <Link to="/discover" className="text-xs text-gray-300 hover:text-white font-medium transition-colors">
            View All →
          </Link>
        </div>

        {/* Horizontal Book Recommendation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {pickedForYou.map(({ book, reason }) => (
            <div
              key={book.id}
              onClick={() => navigate(`/book/${book.id}`)}
              className="group relative rounded-[22px] p-3.5 flex flex-col justify-between bg-gradient-to-b from-white/[0.08] to-white/[0.02] hover:from-white/[0.12] hover:to-white/[0.04] backdrop-blur-2xl border border-white/[0.10] hover:border-vellora-ice/40 cursor-pointer shadow-[0_14px_36px_-6px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.18)] hover:shadow-[0_20px_50px_-8px_rgba(0,0,0,0.65),0_0_20px_rgba(147,197,253,0.14),inset_0_1px_2px_rgba(255,255,255,0.28)] transition-all duration-300"
            >
              {/* Recommendation Reason Pill */}
              <div className="mb-2.5">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-gradient-to-r from-white/10 to-white/5 border border-white/15 text-[10px] font-medium text-gray-200 truncate max-w-full shadow-sm">
                  {reason}
                </span>
              </div>

              {/* Cover & Info */}
              <div className="space-y-3">
                <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden shadow-lg bg-black/40 border border-white/[0.08]">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 rounded-full bg-black/70 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-yellow-300 flex items-center gap-1 border border-white/15 shadow-sm">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{book.communityRating.toFixed(1)}</span>
                  </div>
                  {book.isLegalFreeReader && (
                    <div className="absolute top-2 right-2 rounded-full bg-emerald-500/30 backdrop-blur-md px-2 py-0.5 text-[9px] font-medium text-emerald-200 border border-emerald-400/30">
                      Free Reader
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-heading font-semibold text-xs text-white group-hover:text-vellora-ice transition-colors truncate">
                    {book.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 truncate mt-0.5">{book.author}</p>
                  <div className="mt-1 flex items-center gap-1.5 text-[10px] text-gray-400">
                    <span className="text-gray-300">{book.genres[0]}</span>
                    <span>•</span>
                    <span>{book.publishedYear}</span>
                  </div>
                </div>
              </div>

              {/* View CTA */}
              <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-gray-300 group-hover:text-white transition-colors">
                <span>View Details</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: EXPLORE BY GENRE (Illuminated Liquid Glass Cards with Ambient Backlight)
          ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="font-heading font-semibold text-lg text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-300" />
              <span>Explore By Genre</span>
            </h2>
            <p className="text-xs text-gray-300 mt-0.5">
              Traverse specialized literary archives across classical and modern disciplines.
            </p>
          </div>
          <Link to="/discover" className="text-xs text-gray-300 hover:text-white font-medium transition-colors">
            Explore All Catalogues →
          </Link>
        </div>

        {/* Scrollable / Horizontally Arranged Visual Genre Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {genresList.map((genre) => {
            const isSelected = selectedGenreFilter === genre.name;
            return (
              <button
                key={genre.name}
                onClick={() =>
                  setSelectedGenreFilter(isSelected ? null : genre.name)
                }
                className={`group relative p-4 rounded-2xl border text-left transition-all duration-300 overflow-hidden shadow-[0_10px_28px_-6px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.12)] ${
                  isSelected
                    ? 'border-white/60 bg-gradient-to-b from-white/20 to-white/5 ring-1 ring-white/40 shadow-[0_0_24px_rgba(255,255,255,0.15)]'
                    : `bg-[#141822]/70 hover:bg-[#1A202D]/80 border-white/[0.09] ${genre.border} hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.6),0_0_18px_rgba(196,181,253,0.12)]`
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${genre.gradient} opacity-40 group-hover:opacity-80 transition-opacity`} />
                <div className="relative z-10 space-y-1">
                  <span className="text-2xl p-1.5 rounded-xl bg-black/40 backdrop-blur-md inline-block border border-white/10 group-hover:scale-110 transition-transform">
                    {genre.icon}
                  </span>
                  <h3 className="font-heading font-semibold text-xs text-white group-hover:text-vellora-ice transition-colors mt-2">
                    {genre.name}
                  </h3>
                  <p className="text-[10px] text-gray-400">{genre.count}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: TOP BOOKS BY GENRE (Separate Curated Horizontal Carousels)
          ========================================================================= */}
      <div className="space-y-8">
        {/* Genre Row A: Top Fantasy & Sagas */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏰</span>
              <h3 className="font-heading font-semibold text-base text-white">
                Top Fantasy & Epic Sagas
              </h3>
            </div>
            <Link to="/discover" className="text-xs text-gray-400 hover:text-white transition-colors">
              View All
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-3 pt-1">
            {fantasyBooks.map((book) => (
              <BookCard key={book.id} book={book} size="md" />
            ))}
          </div>
        </section>

        {/* Genre Row B: Top Romance & Dark Romance */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">🥀</span>
              <h3 className="font-heading font-semibold text-base text-white">
                Top Romance & Dark Romance
              </h3>
            </div>
            <Link to="/discover" className="text-xs text-gray-400 hover:text-white transition-colors">
              View All
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-3 pt-1">
            {romanceBooks.map((book) => (
              <BookCard key={book.id} book={book} size="md" />
            ))}
          </div>
        </section>

        {/* Genre Row C: Top Mystery, Thriller & Psychological Fiction */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">🗝️</span>
              <h3 className="font-heading font-semibold text-base text-white">
                Top Mystery, Thriller & Psychological Fiction
              </h3>
            </div>
            <Link to="/discover" className="text-xs text-gray-400 hover:text-white transition-colors">
              View All
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-3 pt-1">
            {mysteryBooks.map((book) => (
              <BookCard key={book.id} book={book} size="md" />
            ))}
          </div>
        </section>

        {/* Genre Row D: Top Science Fiction & Speculative */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">🚀</span>
              <h3 className="font-heading font-semibold text-base text-white">
                Top Science Fiction & Speculative
              </h3>
            </div>
            <Link to="/discover" className="text-xs text-gray-400 hover:text-white transition-colors">
              View All
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-3 pt-1">
            {scifiBooks.map((book) => (
              <BookCard key={book.id} book={book} size="md" />
            ))}
          </div>
        </section>

        {/* Genre Row E: Popular Web Novels & Serializations */}
        {webNovels.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <h3 className="font-heading font-semibold text-base text-white">
                  Popular Web Novels & Serializations
                </h3>
              </div>
              <Link to="/discover" className="text-xs text-gray-400 hover:text-white transition-colors">
                View All
              </Link>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-3 pt-1">
              {webNovels.map((book) => (
                <BookCard key={book.id} book={book} size="md" />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* =========================================================================
          SECTION 6: TRENDING ON VELLORA (Liquid Glass Cards with Amber Aura)
          ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="font-heading font-semibold text-lg text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-400 fill-orange-400" />
              <span>Trending on Vellora</span>
            </h2>
            <p className="text-xs text-gray-300 mt-0.5">
              High-engagement titles across active reading circles and community reviews.
            </p>
          </div>
          <Link to="/discover" className="text-xs text-gray-300 hover:text-white font-medium transition-colors">
            Explore Trending →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {trendingList.map((book, idx) => (
            <div
              key={book.id}
              onClick={() => navigate(`/book/${book.id}`)}
              className="group relative rounded-[22px] p-4 flex flex-col justify-between bg-gradient-to-b from-white/[0.08] to-white/[0.02] hover:from-white/[0.12] hover:to-white/[0.04] backdrop-blur-2xl border border-white/[0.10] hover:border-orange-400/35 cursor-pointer shadow-[0_14px_36px_-6px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.18)] hover:shadow-[0_20px_50px_-8px_rgba(0,0,0,0.65),0_0_20px_rgba(251,146,60,0.15)] transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden shadow-lg border border-white/[0.08] bg-black/40">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = book.coverUrl;
                    }}
                  />
                  {/* Trending Rank Pill */}
                  <div className="absolute top-2 left-2 rounded-full bg-black/80 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-orange-300 flex items-center gap-1 border border-orange-500/35 shadow-sm">
                    <Flame className="w-3 h-3 fill-orange-400" /> #{idx + 1} Spotlight
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-semibold text-xs text-white group-hover:text-vellora-ice transition-colors truncate">
                    {book.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 truncate mt-0.5">{book.author}</p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1 text-yellow-300 font-semibold">
                  <Star className="w-3 h-3 fill-yellow-400" />
                  <span>{book.communityRating > 0 ? book.communityRating.toFixed(1) : 'Catalog'}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <BookOpen className="w-3 h-3" />
                  <span>{book.publishedYear > 0 ? book.publishedYear : 'Classic'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: ACTIVE READERS & LITERARY CIRCLES (Liquid Glass Container)
          ========================================================================= */}
      <section className="liquid-glass-panel p-6 rounded-[26px] shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-white" />
            <h3 className="font-heading font-semibold text-sm text-white">
              Active Readers in Your Orbit
            </h3>
          </div>
          <Link to="/messages" className="text-xs text-gray-400 hover:text-white transition-colors">
            View All Friends ({friends.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {friends.slice(0, 4).map((f) => (
            <Link
              key={f.id}
              to={`/profile/${f.username}`}
              className="p-3.5 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] hover:from-white/[0.12] hover:to-white/[0.04] border border-white/[0.08] hover:border-white/[0.20] transition-all flex items-center gap-3 group shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.12)]"
            >
              <div className="relative shrink-0">
                <img
                  src={f.avatar}
                  alt={f.displayName}
                  className="w-10 h-10 rounded-full object-cover border border-white/20 group-hover:border-white/50 transition-colors shadow-md"
                />
                {f.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0C0F15] shadow-[0_0_8px_#4ADE80]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold text-white group-hover:text-vellora-ice transition-colors truncate">
                  {f.displayName}
                </h4>
                <p className="text-[10px] text-gray-400 truncate mt-0.5">
                  Reading: {f.currentBook || 'Looking for next read'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
