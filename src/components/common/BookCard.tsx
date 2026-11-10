import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Bookmark, BookOpen, Check, Play } from 'lucide-react';
import { Book, ShelfStatus } from '../../types';
import { useLibrary } from '../../context/LibraryContext';

interface BookCardProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg';
  showShelfDropdown?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  size = 'md',
  showShelfDropdown = true,
}) => {
  const { library, updateShelfStatus } = useLibrary();
  const libraryItem = library[book.id];
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const statuses: ShelfStatus[] = [
    'Currently Reading',
    'Completed',
    'Plan to Read',
    'On Hold',
    'Dropped',
  ];

  const sizeClasses = {
    sm: 'w-[140px]',
    md: 'w-[185px]',
    lg: 'w-[230px]',
  };

  return (
    <div className={`group relative flex flex-col ${sizeClasses[size]} shrink-0 transition-all duration-300`}>
      {/* 2:3 Aspect Ratio Book Cover Container with Liquid Glass Frame */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[22px] bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-2xl border border-white/[0.10] group-hover:border-vellora-ice/40 shadow-[0_14px_36px_-6px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.18)] group-hover:shadow-[0_20px_50px_-8px_rgba(0,0,0,0.65),0_0_20px_rgba(147,197,253,0.15),inset_0_1px_2px_rgba(255,255,255,0.3)] transition-all duration-300">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Ambient Editorial Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B10]/95 via-transparent to-black/25 opacity-75 group-hover:opacity-45 transition-opacity duration-300" />

        {/* Rating Badge: Frosted Glass Pill with Specular Highlight */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-xl px-2.5 py-0.5 border border-white/15 text-[11px] font-semibold text-yellow-300 shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)]">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span>{book.communityRating.toFixed(1)}</span>
        </div>

        {/* Legal Free Web Reader Badge */}
        {book.isLegalFreeReader && (
          <div className="absolute top-2.5 right-2.5 rounded-full bg-gradient-to-r from-emerald-500/30 to-teal-500/20 backdrop-blur-xl px-2 py-0.5 border border-emerald-400/30 text-[10px] font-medium text-emerald-200 flex items-center gap-1 shadow-sm">
            <BookOpen className="w-2.5 h-2.5" /> Read
          </div>
        )}

        {/* Current Shelf Status Pill if in user library */}
        {libraryItem && (
          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between rounded-xl bg-black/80 backdrop-blur-xl px-2.5 py-1 border border-white/15 text-[10px] shadow-md">
            <span className="text-white font-medium truncate">
              {libraryItem.status}
            </span>
            {book.isLegalFreeReader && libraryItem.progressPercent !== undefined && (
              <span className="text-gray-300 font-mono text-[9px]">
                {libraryItem.progressPercent}%
              </span>
            )}
          </div>
        )}

        {/* Hover Quick Actions: Floating Liquid Buttons */}
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2.5">
          {book.isLegalFreeReader ? (
            <Link
              to={`/read/${book.id}`}
              className="reference-card-play"
              title="Read Now"
            >
              <Play className="w-4 h-4 fill-current ml-0.5 text-black" />
            </Link>
          ) : (
            <Link
              to={`/book/${book.id}`}
              className="reference-card-play"
              title="View Book"
            >
              <BookOpen className="w-4 h-4 text-black" />
            </Link>
          )}

          {showShelfDropdown && (
            <div className="relative">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMenuOpen(!menuOpen);
                }}
                className="w-9 h-9 rounded-full bg-gradient-to-b from-white/20 to-white/5 hover:from-white/30 hover:to-white/10 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center transition-all shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:scale-105"
                title="Add to Shelf"
              >
                <Bookmark className="w-4 h-4" />
              </button>

              {menuOpen && (
                <div
                  className="absolute bottom-11 left-1/2 -translate-x-1/2 w-44 rounded-2xl bg-gradient-to-b from-[#181D28]/95 to-[#10141D]/95 backdrop-blur-2xl border border-white/15 py-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-3 py-1 text-[10px] uppercase tracking-wider font-semibold text-gray-400 border-b border-white/10">
                    Shelf Selection
                  </div>
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        updateShelfStatus(book.id, status);
                        setMenuOpen(false);
                      }}
                      className="w-full px-3 py-1.5 text-left text-xs text-gray-200 hover:text-white hover:bg-white/10 flex items-center justify-between transition-colors"
                    >
                      <span>{status}</span>
                      {libraryItem?.status === status && (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Book Metadata Below Card */}
      <div className="mt-2.5 px-0.5 space-y-0.5">
        <Link
          to={`/book/${book.id}`}
          className="block font-heading font-semibold text-xs text-white hover:text-vellora-ice transition-colors truncate"
          title={book.title}
        >
          {book.title}
        </Link>
        <p className="text-[11px] text-gray-400 truncate">{book.author}</p>
        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 pt-0.5">
          <span className="truncate">{book.genres[0]}</span>
          {book.format && (
            <>
              <span>•</span>
              <span className="truncate">{book.format}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
