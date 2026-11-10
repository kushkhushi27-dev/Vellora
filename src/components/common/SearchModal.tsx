import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Users, Compass, Shield, ArrowRight, Loader2, Calendar } from 'lucide-react';
import { mockCommunities, mockClubs, mockFriends } from '../../data/mockData';
import { searchOpenLibrary } from '../../services/openLibraryService';
import { useLibrary } from '../../context/LibraryContext';
import { Book } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All' | 'Books' | 'Communities' | 'Clubs' | 'Readers'>('All');
  const [liveBooks, setLiveBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();
  const { registerBooks, books: initialBooks } = useLibrary();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keyboard shortcut listener: Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced real-time search hitting Open Library Search API
  useEffect(() => {
    if (!query.trim()) {
      setLiveBooks([]);
      setIsLoading(false);
      setHasSearched(false);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    setIsLoading(true);
    setHasSearched(true);

    debounceRef.current = setTimeout(async () => {
      try {
        const results = await searchOpenLibrary({
          query: query.trim(),
          limit: 12,
        });
        setLiveBooks(results.books);
        registerBooks(results.books);
      } catch (err) {
        console.warn('[SearchModal] Live search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 350);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  if (!isOpen) return null;

  // Filter local communities, clubs, and readers
  const filteredCommunities = mockCommunities.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.tagline.toLowerCase().includes(query.toLowerCase())
  );

  const filteredClubs = mockClubs.filter(
    (cl) =>
      cl.name.toLowerCase().includes(query.toLowerCase()) ||
      cl.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredUsers = mockFriends.filter(
    (u) =>
      u.displayName.toLowerCase().includes(query.toLowerCase()) ||
      u.username.toLowerCase().includes(query.toLowerCase())
  );

  // Display either live search results or foundation books when query is empty
  const displayBooks = query.trim() ? liveBooks : initialBooks.slice(0, 5);

  const handleBookClick = (book: Book) => {
    navigate(`/book/${book.id}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 select-none">
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog: Liquid Glass Container with Specular Top Highlight */}
      <div className="relative w-full max-w-2xl rounded-[26px] bg-gradient-to-b from-[#181D2A]/95 to-[#10141E]/95 backdrop-blur-2xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1px_1.5px_rgba(255,255,255,0.22)] overflow-hidden z-10 flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Search Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/[0.02]">
          <Search className="w-5 h-5 text-amber-300 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search real books, authors, ISBNs, reading clubs..."
            className="flex-1 bg-transparent text-gray-100 placeholder-gray-400 text-sm focus:outline-none"
          />
          {isLoading && (
            <Loader2 className="w-4 h-4 text-amber-300 animate-spin shrink-0" />
          )}
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-mono text-gray-300 border border-white/10 shadow-sm">
            ESC
          </kbd>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-black/30 border-b border-white/5 overflow-x-auto text-xs">
          {(['All', 'Books', 'Communities', 'Clubs', 'Readers'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-full transition-all whitespace-nowrap text-xs ${
                category === cat
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-[#090C10] font-semibold shadow-[0_2px_10px_rgba(224,168,46,0.4)]'
                  : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results Area */}
        <div className="max-h-[460px] overflow-y-auto p-4 space-y-4">
          {/* Books Section */}
          {(category === 'All' || category === 'Books') && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-2 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                  {query.trim() ? `Open Library Real Books (${displayBooks.length})` : 'Popular Archive Titles'}
                </span>
                {query.trim() && (
                  <span className="text-[10px] font-mono text-gray-500">Live API</span>
                )}
              </div>

              {isLoading && displayBooks.length === 0 ? (
                <div className="space-y-2 p-2">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] animate-pulse">
                      <div className="w-10 h-14 bg-white/10 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-white/15 rounded w-3/4" />
                        <div className="h-2.5 bg-white/10 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1.5">
                  {displayBooks.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => handleBookClick(book)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] hover:border-amber-400/30 border border-transparent transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={book.coverUrl}
                          alt={book.title}
                          className="w-10 h-14 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform shrink-0 bg-black/40"
                          loading="lazy"
                          onError={(e) => {
                            // Fallback on broken external images
                            (e.currentTarget as HTMLImageElement).src = book.coverUrl;
                          }}
                        />
                        <div className="min-w-0">
                          <h4 className="text-sm font-medium text-gray-200 group-hover:text-vellora-ice transition-colors truncate">
                            {book.title}
                          </h4>
                          <p className="text-xs text-gray-400 truncate">
                            {book.author}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
                            {book.publishedYear > 0 && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-2.5 h-2.5" /> {book.publishedYear}
                              </span>
                            )}
                            {book.genres && book.genres.length > 0 && (
                              <span>• {book.genres[0]}</span>
                            )}
                            {book.id.startsWith('OL') && (
                              <span className="font-mono text-amber-300/80">OL ID: {book.id}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 group-hover:text-vellora-ice transition-opacity shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Communities Section */}
          {(category === 'All' || category === 'Communities') && filteredCommunities.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-2 mb-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-purple-300" /> Communities ({filteredCommunities.length})
              </div>
              <div className="space-y-1.5">
                {filteredCommunities.map((comm) => (
                  <div
                    key={comm.id}
                    onClick={() => {
                      navigate(`/communities/${comm.id}`);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl p-2 rounded-lg bg-white/5">{comm.icon}</span>
                      <div>
                        <h4 className="text-sm font-medium text-gray-200 group-hover:text-purple-300 transition-colors">
                          {comm.name}
                        </h4>
                        <p className="text-xs text-gray-400">{comm.tagline}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">{comm.memberCount} members</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clubs Section */}
          {(category === 'All' || category === 'Clubs') && filteredClubs.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-2 mb-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" /> Reading Clubs ({filteredClubs.length})
              </div>
              <div className="space-y-1.5">
                {filteredClubs.map((club) => (
                  <div
                    key={club.id}
                    onClick={() => {
                      navigate(`/clubs/${club.id}`);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] cursor-pointer group"
                  >
                    <div>
                      <h4 className="text-sm font-medium text-gray-200 group-hover:text-emerald-300 transition-colors">
                        {club.name}
                      </h4>
                      <p className="text-xs text-gray-400">Target: {club.targetCompletionDate}</p>
                    </div>
                    <span className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                      Active: {club.activeBook.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Readers Section */}
          {(category === 'All' || category === 'Readers') && filteredUsers.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-2 mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-400" /> Readers ({filteredUsers.length})
              </div>
              <div className="space-y-1.5">
                {filteredUsers.map((u) => (
                  <div
                    key={u.id}
                    onClick={() => {
                      navigate(`/profile/${u.username}`);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={u.avatar} alt={u.displayName} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-200 group-hover:text-blue-400 transition-colors">
                          {u.displayName}
                        </h4>
                        <p className="text-xs text-gray-400">@{u.username}</p>
                      </div>
                    </div>
                    {u.currentBook && (
                      <span className="text-[11px] text-gray-400 truncate max-w-[180px]">
                        Reading: {u.currentBook}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasSearched &&
            !isLoading &&
            displayBooks.length === 0 &&
            filteredCommunities.length === 0 &&
            filteredClubs.length === 0 &&
            filteredUsers.length === 0 && (
              <div className="py-12 text-center text-gray-500">
                <p>No Open Library records found for "{query}".</p>
                <p className="text-xs text-gray-600 mt-1">
                  Try searching by full title, author name, or ISBN (e.g., 9780441172719).
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
