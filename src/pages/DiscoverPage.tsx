import React, { useState, useEffect } from 'react';
import { Link, useOutletContext, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Play,
  BookOpen,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Flame,
  Star,
  Check,
  MoreHorizontal,
  Loader2,
  Search,
} from 'lucide-react';
import { mockBooks, mockFriends } from '../data/mockData';
import { useLibrary } from '../context/LibraryContext';
import { Book } from '../types';
import { searchOpenLibrary, getBooksByGenre, getTrendingBooks } from '../services/openLibraryService';

export const DiscoverPage: React.FC = () => {
  const { activeFilter } = useOutletContext<{ activeFilter: string }>() || { activeFilter: 'All' };
  const { library, updateShelfStatus, registerBooks } = useLibrary();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const urlQuery = searchParams.get('q') || '';

  // Search Results state for URL queries
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [searchTotal, setSearchTotal] = useState(0);
  const [searchPage, setSearchPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  // Real "You Might Like" books from Open Library
  const [discoveryBooks, setDiscoveryBooks] = useState<Book[]>(() => mockBooks.slice(0, 8));
  const [isLoadingDiscovery, setIsLoadingDiscovery] = useState(false);

  // Hero carousel index
  const [heroIndex, setHeroIndex] = useState(0);

  const heroBooks: Book[] = [
    mockBooks.find((b) => b.id === 'figma_tes') || mockBooks[5],
    mockBooks.find((b) => b.id === 'name_of_the_wind') || mockBooks[0],
    mockBooks.find((b) => b.id === 'dune') || mockBooks[6],
    mockBooks.find((b) => b.id === 'shadow_wind') || mockBooks[7],
  ];

  const currentHero = heroBooks[heroIndex];

  // Handle URL Query
  useEffect(() => {
    if (!urlQuery.trim()) {
      setSearchResults([]);
      setSearchTotal(0);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    searchOpenLibrary({
      query: urlQuery.trim(),
      page: 1,
      limit: 12,
    })
      .then((res) => {
        setSearchResults(res.books);
        setSearchTotal(res.total);
        setSearchPage(1);
        registerBooks(res.books);
      })
      .catch((err) => {
        console.warn('URL Search failed:', err);
      })
      .finally(() => {
        setIsSearching(false);
      });
  }, [urlQuery]);

  // Handle Category Filter changes
  useEffect(() => {
    if (urlQuery.trim()) return;

    if (activeFilter === 'Web Novels' || activeFilter === 'Light Novels' || activeFilter === 'Fanfiction') {
      // Use local specialized catalog
      setDiscoveryBooks(mockBooks.filter((b) => b.format === activeFilter));
      return;
    }

    setIsLoadingDiscovery(true);
    const subjectQuery = activeFilter === 'Non-Fiction' ? 'Non-Fiction' : 'Fantasy';

    getBooksByGenre(subjectQuery, 8)
      .then((books) => {
        if (books.length > 0) {
          setDiscoveryBooks(books);
          registerBooks(books);
        }
      })
      .catch((err) => {
        console.warn('Failed to fetch discovery books:', err);
      })
      .finally(() => {
        setIsLoadingDiscovery(false);
      });
  }, [activeFilter, urlQuery]);

  const handleLoadMoreSearch = async () => {
    if (isSearching) return;
    const nextPage = searchPage + 1;
    setIsSearching(true);

    try {
      const res = await searchOpenLibrary({
        query: urlQuery.trim(),
        page: nextPage,
        limit: 12,
      });
      setSearchResults((prev) => [...prev, ...res.books]);
      setSearchPage(nextPage);
      registerBooks(res.books);
    } catch (err) {
      console.warn('Failed to load more search results:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const nextHero = () => {
    setHeroIndex((prev) => (prev + 1) % heroBooks.length);
  };

  const prevHero = () => {
    setHeroIndex((prev) => (prev - 1 + heroBooks.length) % heroBooks.length);
  };

  return (
    <div className="p-5 md:p-8 space-y-8 max-w-[1440px] mx-auto select-none">
      {/* Search Header Banner if URL query is present */}
      {urlQuery && (
        <section className="liquid-glass-card p-6 rounded-[24px] space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-playfair text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-amber-300" />
              <span>Search results for "{urlQuery}"</span>
            </h2>
            <Link to="/discover" className="text-xs text-amber-300 hover:underline">
              Clear Search
            </Link>
          </div>
          <p className="text-xs text-gray-300">
            {isSearching ? 'Querying Open Library real bibliographic databases...' : `Found ${searchTotal.toLocaleString()} real catalog entries.`}
          </p>

          {/* Search Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {searchResults.map((book) => (
              <div
                key={book.id}
                onClick={() => navigate(`/book/${book.id}`)}
                className="liquid-glass-card rounded-[22px] overflow-hidden group cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-black/40">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = book.coverUrl;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-transparent to-black/30" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white font-medium border border-white/15">
                    {book.genres[0] || 'Literature'}
                  </div>
                </div>

                <div className="p-4 pt-2 flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-sm text-white group-hover:text-vellora-ice transition-colors truncate">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-400 truncate mt-0.5">
                      {book.author}
                    </p>
                    {book.publishedYear > 0 && (
                      <span className="text-[11px] text-gray-400 font-mono">
                        Published {book.publishedYear}
                      </span>
                    )}
                  </div>
                  <div className="reference-card-play shrink-0">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-black" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {searchTotal > searchResults.length && (
            <div className="pt-6 text-center">
              <button
                onClick={handleLoadMoreSearch}
                disabled={isSearching}
                className="liquid-btn-primary px-8 py-3 text-xs"
              >
                {isSearching ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Loading more books...
                  </span>
                ) : (
                  'Load More Results'
                )}
              </button>
            </div>
          )}
        </section>
      )}

      {/* Upper 2-Column Section replicating Reference Image & Spec 3 */}
      {!urlQuery && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Floating Rail Panels */}
          <div className="lg:col-span-4 space-y-6">
            {/* Top Panel: New Content */}
            <div className="liquid-glass-panel p-5 space-y-4 rounded-[26px]">
              <div className="flex items-center justify-between">
                <span className="font-heading font-semibold text-sm text-white">
                  New Literature
                </span>
                <span className="text-[11px] text-gray-400 font-medium cursor-pointer hover:text-white transition-colors">
                  Sort by Today
                </span>
              </div>

              <div className="space-y-3">
                {mockBooks.slice(0, 2).map((book) => (
                  <div
                    key={book.id}
                    onClick={() => navigate(`/book/${book.id}`)}
                    className="group relative rounded-2xl overflow-hidden bg-black/40 border border-white/[0.08] hover:border-vellora-ice/40 transition-all cursor-pointer shadow-md"
                  >
                    {/* Landscape Image with Play Overlay Button */}
                    <div className="relative h-28 w-full overflow-hidden">
                      <img
                        src={book.backdropUrl || book.coverUrl}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                      {/* Circular Action Play Button Overlay */}
                      <div className="absolute bottom-2.5 right-2.5 reference-card-play">
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-black" />
                      </div>

                      <div className="absolute top-2 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white font-medium border border-white/10">
                        {book.genres[0]}
                      </div>
                    </div>

                    <div className="p-3">
                      <h4 className="text-xs font-semibold text-white group-hover:text-vellora-ice transition-colors truncate">
                        {book.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 truncate mt-0.5">
                        {book.author} • ★ {book.communityRating}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Panel: Continue Progress */}
            <div className="liquid-glass-panel p-5 space-y-4 rounded-[26px]">
              <div className="flex items-center justify-between">
                <span className="font-heading font-semibold text-sm text-white">
                  Continue Progress
                </span>
                <Link to="/library" className="text-[11px] text-gray-400 hover:text-white transition-colors">
                  See all
                </Link>
              </div>

              <div className="space-y-3">
                {[
                  { title: 'Frankenstein', progress: 50, author: 'Mary Shelley', id: 'frankenstein', cover: mockBooks[5].coverUrl },
                  { title: 'The Picture of Dorian Gray', progress: 28, author: 'Oscar Wilde', id: 'dorian_gray', cover: mockBooks[6].coverUrl },
                  { title: 'Figma-tes: Celestial Gates', progress: 12, author: 'Aria Thorne', id: 'figma_tes', cover: mockBooks[7].coverUrl },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.08] hover:border-white/[0.18] transition-all shadow-sm"
                  >
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium text-white truncate">{item.title}</h4>
                      <p className="text-[11px] text-gray-400 truncate mt-0.5">{item.author}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-gray-300 font-mono">
                          {item.progress}%
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/read/${item.id}`}
                      className="reference-card-play shrink-0"
                      title="Read"
                    >
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-black" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Cinematic Hero Banner with Liquid Glass Buttons */}
          <div className="lg:col-span-8">
            <div className="relative rounded-[28px] overflow-hidden min-h-[460px] flex flex-col justify-end p-8 md:p-12 border border-white/[0.12] shadow-[0_22px_60px_rgba(0,0,0,0.6)] group">
              {/* Background Cover Artwork */}
              <img
                src={currentHero.backdropUrl || currentHero.coverUrl}
                alt={currentHero.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Bottom-to-Top Scrim Gradient with Ambient Tint */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(10,12,16,0.96) 0%, rgba(10,12,16,0.45) 55%, transparent 100%)',
                }}
              />

              {/* Top-Left Translucent Floating Tag Pill */}
              <div className="absolute top-8 left-8 flex items-center gap-2 z-20">
                <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-xl text-amber-200 text-xs font-semibold flex items-center gap-1.5 border border-amber-400/30 shadow-md">
                  <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" /> Trending Literature
                </span>
                {currentHero.genres.slice(0, 2).map((g) => (
                  <span
                    key={g}
                    className="px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-xl text-gray-200 text-xs border border-white/10"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Bottom-Right Circular Carousel Arrows */}
              <div className="absolute bottom-8 right-8 flex items-center gap-2.5 z-20">
                <button
                  onClick={prevHero}
                  className="reference-circle-btn"
                  title="Previous Spotlight"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextHero}
                  className="reference-circle-btn"
                  title="Next Spotlight"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Hero Information & Action Controls */}
              <div className="relative z-10 max-w-2xl space-y-4">
                <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                  {currentHero.title}
                </h1>

                <p className="text-xs sm:text-sm text-gray-300 line-clamp-3 leading-relaxed">
                  {currentHero.description}
                </p>

                {/* Action Buttons: Liquid Primary Gold, Liquid Secondary Glass, Bookmark Circle */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  {currentHero.isLegalFreeReader ? (
                    <Link
                      to={`/read/${currentHero.id}`}
                      className="liquid-btn-primary h-11 px-6 text-xs"
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" /> Start Reading
                    </Link>
                  ) : (
                    <Link
                      to={`/book/${currentHero.id}`}
                      className="liquid-btn-primary h-11 px-6 text-xs"
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" /> Start Reading
                    </Link>
                  )}

                  <Link
                    to={`/book/${currentHero.id}`}
                    className="liquid-btn-secondary h-11 px-6 text-xs"
                  >
                    <BookOpen className="w-4 h-4" /> Guidebook
                  </Link>

                  <button
                    onClick={() => updateShelfStatus(currentHero.id, 'Plan to Read')}
                    className="reference-circle-btn"
                    title="Bookmark"
                  >
                    {library[currentHero.id] ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid Content Cards ("You Might Like") with Real Open Library Integration */}
      {!urlQuery && (
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <h2 className="font-heading font-semibold text-lg text-white">
                You Might Like ({activeFilter})
              </h2>
            </div>
            {isLoadingDiscovery && (
              <span className="text-xs text-amber-300 flex items-center gap-1.5 font-mono">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Open Library Syncing
              </span>
            )}
          </div>

          {/* 4-Column Horizontal Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {discoveryBooks.slice(0, 8).map((book) => (
              <div
                key={book.id}
                onClick={() => navigate(`/book/${book.id}`)}
                className="liquid-glass-card rounded-[22px] overflow-hidden group cursor-pointer flex flex-col justify-between"
              >
                {/* Top Aspect Artwork with Floating Badges */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-black/40">
                  <img
                    src={book.backdropUrl || book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = book.coverUrl;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-transparent to-black/30" />

                  {/* Floating Tag Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white font-medium border border-white/15">
                    {book.genres[0] || 'Literature'}
                  </div>

                  {/* Three-Dot Action Trigger Circle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateShelfStatus(book.id, 'Plan to Read');
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    title="Options"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Lower Content Overlay with Play Button */}
                <div className="p-4 pt-2 flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-sm text-white group-hover:text-vellora-ice transition-colors truncate">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-400 truncate mt-0.5">
                      {book.author}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-[11px] text-yellow-400 font-semibold">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{book.communityRating > 0 ? book.communityRating.toFixed(1) : 'Catalog'}</span>
                    </div>
                  </div>

                  {/* Bottom-right circular play/view action button */}
                  <div className="reference-card-play shrink-0">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-black" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Friends Are Reading Section */}
      {!urlQuery && (
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-heading font-semibold text-lg text-white">
              Friends are Reading
            </h2>
            <span className="text-xs text-gray-400">Based on your circle's activity</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockFriends.slice(0, 4).map((f) => (
              <div
                key={f.id}
                className="liquid-glass-card p-4 flex items-center gap-3.5 hover:border-white/25 transition-all rounded-[22px]"
              >
                <img
                  src={f.avatar}
                  alt={f.displayName}
                  className="w-11 h-11 rounded-full object-cover border border-white/20 shadow-md"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-white group-hover:text-vellora-ice transition-colors truncate">
                    {f.displayName}
                  </h4>
                  <p className="text-[11px] text-gray-400 truncate mt-0.5">
                    Reading: <span className="text-gray-200 font-medium">{f.currentBook}</span>
                  </p>
                  {f.progressPercent && (
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="flex-1 h-1 rounded-full bg-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full"
                          style={{ width: `${f.progressPercent}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-white font-mono">
                        {f.progressPercent}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
