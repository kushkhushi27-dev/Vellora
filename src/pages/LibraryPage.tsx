import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  LayoutGrid,
  Table as TableIcon,
  Plus,
  Star,
  Bookmark,
  Calendar,
  FileText,
  ChevronRight,
} from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { BookCard } from '../components/common/BookCard';
import { StarRating } from '../components/common/StarRating';
import { ShelfStatus } from '../types';

export const LibraryPage: React.FC = () => {
  const {
    library,
    books,
    customLists,
    createCustomList,
    updateShelfStatus,
    updateRating,
  } = useLibrary();

  const [activeShelf, setActiveShelf] = useState<ShelfStatus | 'All' | string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [newListInput, setNewListInput] = useState('');
  const [showNewListModal, setShowNewListModal] = useState(false);

  const shelves: ShelfStatus[] = [
    'Currently Reading',
    'Completed',
    'Plan to Read',
    'On Hold',
    'Dropped',
  ];

  const filteredBooksWithStatus = Object.entries(library)
    .map(([bookId, item]) => {
      const book = books.find((b) => b.id === bookId);
      return { item, book };
    })
    .filter(({ item, book }) => {
      if (!book) return false;
      if (activeShelf === 'All') return true;
      if (shelves.includes(activeShelf as ShelfStatus)) {
        return item.status === activeShelf;
      }
      return item.customLists.includes(activeShelf);
    });

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (newListInput.trim()) {
      createCustomList(newListInput.trim());
      setActiveShelf(newListInput.trim());
      setNewListInput('');
      setShowNewListModal(false);
    }
  };

  return (
    <div className="p-5 md:p-8 space-y-6 max-w-[1440px] mx-auto select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-white">
            My Reading Sanctuary
          </h1>
          <p className="text-xs text-gray-300 mt-1">
            Personal bookshelf, multi-format reading archives, and private marginalia.
          </p>
        </div>

        {/* View Switcher & New List Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNewListModal(true)}
            className="liquid-btn-secondary text-xs h-10 px-4"
          >
            <Plus className="w-3.5 h-3.5" /> Create Custom Shelf
          </button>

          <div className="flex items-center bg-black/40 border border-white/[0.12] rounded-full p-1 backdrop-blur-xl shadow-inner">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-full transition-all ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-b from-white to-gray-200 text-[#090C10] shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-full transition-all ${
                viewMode === 'table'
                  ? 'bg-gradient-to-b from-white to-gray-200 text-[#090C10] shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Dense Data Table"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Primary Status Shelves & Custom Shelves Navigation Dock */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/[0.08] text-xs">
        <button
          onClick={() => setActiveShelf('All')}
          className={`px-4 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${
            activeShelf === 'All'
              ? 'bg-gradient-to-b from-white to-gray-200 text-[#090C10] shadow-[0_4px_16px_rgba(255,255,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.95)]'
              : 'bg-white/[0.08] hover:bg-white/[0.14] text-gray-300 hover:text-white border border-white/[0.08]'
          }`}
        >
          All Titles ({Object.keys(library).length})
        </button>

        {shelves.map((status) => {
          const count = Object.values(library).filter((i) => i.status === status).length;
          const isActive = activeShelf === status;
          return (
            <button
              key={status}
              onClick={() => setActiveShelf(status)}
              className={`px-4 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-b from-white to-gray-200 text-[#090C10] shadow-[0_4px_16px_rgba(255,255,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.95)]'
                  : 'bg-white/[0.08] hover:bg-white/[0.14] text-gray-300 hover:text-white border border-white/[0.08]'
              }`}
            >
              {status} ({count})
            </button>
          );
        })}

        {/* Custom Lists Separator */}
        <div className="h-4 w-px bg-white/20 shrink-0 mx-1" />

        {customLists.map((listName) => {
          const count = Object.values(library).filter((i) =>
            i.customLists.includes(listName)
          ).length;
          const isActive = activeShelf === listName;
          return (
            <button
              key={listName}
              onClick={() => setActiveShelf(listName)}
              className={`px-4 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-b from-white to-gray-200 text-[#090C10] shadow-[0_4px_16px_rgba(255,255,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.95)]'
                  : 'bg-white/[0.06] text-purple-200 border border-purple-300/20 hover:bg-white/[0.12]'
              }`}
            >
              ★ {listName} ({count})
            </button>
          );
        })}
      </div>

      {/* Main Shelves View: Grid vs Table */}
      {filteredBooksWithStatus.length === 0 ? (
        <div className="py-20 text-center reference-glass-card p-8">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="font-heading font-semibold text-lg text-white">
            This shelf is currently empty.
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Discover new literary works or add classics from our discovery catalog.
          </p>
          <Link to="/discover" className="reference-pill-active text-xs mt-4 inline-flex">
            Explore Discover
          </Link>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 pt-2">
          {filteredBooksWithStatus.map(({ book }) => (
            <div key={book!.id} className="flex justify-center">
              <BookCard book={book!} size="md" />
            </div>
          ))}
        </div>
      ) : (
        /* Dense Data Table */
        <div className="reference-glass-card overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-black/30 text-gray-300 font-heading">
                  <th className="p-4 font-semibold">Title & Author</th>
                  <th className="p-4 font-semibold">Format</th>
                  <th className="p-4 font-semibold">Shelf Status</th>
                  <th className="p-4 font-semibold">Your Rating</th>
                  <th className="p-4 font-semibold">Dates</th>
                  <th className="p-4 font-semibold">Notes</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filteredBooksWithStatus.map(({ item, book }) => (
                  <tr
                    key={book!.id}
                    className="hover:bg-white/[0.05] transition-colors group"
                  >
                    {/* Title & Author */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={book!.coverUrl}
                          alt={book!.title}
                          className="w-8 h-12 rounded object-cover shadow"
                        />
                        <div>
                          <Link
                            to={`/book/${book!.id}`}
                            className="font-semibold text-white hover:underline block text-sm"
                          >
                            {book!.title}
                          </Link>
                          <span className="text-gray-400 text-xs">{book!.author}</span>
                        </div>
                      </div>
                    </td>

                    {/* Format */}
                    <td className="p-4 text-gray-300 font-mono text-[11px]">
                      {book!.format}
                    </td>

                    {/* Shelf Status */}
                    <td className="p-4">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          updateShelfStatus(book!.id, e.target.value as ShelfStatus)
                        }
                        className="bg-black/50 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                      >
                        {shelves.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Rating */}
                    <td className="p-4">
                      <StarRating
                        rating={item.userRating || 0}
                        readOnly={false}
                        onChange={(r) => updateRating(book!.id, r)}
                        size="sm"
                      />
                    </td>

                    {/* Dates */}
                    <td className="p-4 text-gray-300 font-mono text-[11px]">
                      {item.startDate && <div>Started: {item.startDate}</div>}
                      {item.finishDate && <div>Finished: {item.finishDate}</div>}
                      {!item.startDate && !item.finishDate && <span>—</span>}
                    </td>

                    {/* Private Notes */}
                    <td className="p-4 text-gray-300 max-w-[200px] truncate">
                      {item.privateNotes ? (
                        <span className="italic">"{item.privateNotes}"</span>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      {book!.isLegalFreeReader ? (
                        <Link
                          to={`/read/${book!.id}`}
                          className="reference-pill-active text-[11px] py-1 px-3.5 inline-flex"
                        >
                          Read Now
                        </Link>
                      ) : (
                        <Link
                          to={`/book/${book!.id}`}
                          className="text-xs text-gray-300 hover:text-white inline-flex items-center gap-1"
                        >
                          View <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Custom Shelf Modal */}
      {showNewListModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setShowNewListModal(false)}
          />
          <div className="relative w-full max-w-sm rounded-3xl reference-glass-card p-6 shadow-2xl z-10 space-y-4">
            <h3 className="font-heading font-semibold text-base text-white">
              Create Custom Shelf / List
            </h3>
            <p className="text-xs text-gray-300">
              Group books into thematic collections (e.g. "Favorites of 2026", "Cozy Weekend Reads").
            </p>

            <form onSubmit={handleCreateList} className="space-y-4">
              <input
                type="text"
                autoFocus
                value={newListInput}
                onChange={(e) => setNewListInput(e.target.value)}
                placeholder="e.g. Rainy Day Melancholia"
                className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
              />

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewListModal(false)}
                  className="px-4 py-2 rounded-full text-xs text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button type="submit" className="liquid-btn-primary text-xs py-2 px-5">
                  Create Shelf
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
