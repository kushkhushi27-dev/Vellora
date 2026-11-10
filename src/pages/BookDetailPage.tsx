import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  BookOpen,
  Bookmark,
  Share2,
  MessageSquare,
  FileEdit,
  ExternalLink,
  Plus,
  Check,
  Calendar,
  Layers,
  ChevronDown,
  Sparkles,
  Loader2,
  Globe,
} from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { useSocial } from '../context/SocialContext';
import { useAuth } from '../context/AuthContext';
import { StarRating } from '../components/common/StarRating';
import { SpoilerShield } from '../components/common/SpoilerShield';
import { ShelfStatus, Book } from '../types';

export const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getBookById, fetchBookDetails, library, updateShelfStatus, updateRating, updatePrivateNotes } = useLibrary();
  const { submitMetadataCorrection } = useSocial();
  const { user } = useAuth();

  const [book, setBook] = useState<Book | null>(() => getBookById(id || 'hp7') || null);
  const [isLoading, setIsLoading] = useState(!book);

  useEffect(() => {
    const targetId = id || 'hp7';
    const local = getBookById(targetId);
    if (local && local.description && local.editions && local.editions.length > 0) {
      setBook(local);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetchBookDetails(targetId)
      .then((res) => {
        setBook(res);
      })
      .catch((err) => {
        console.warn('Failed to load book from Open Library:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const libraryItem = book ? library[book.id] : undefined;

  const [activeTab, setActiveTab] = useState<'synopsis' | 'editions' | 'reviews' | 'notes'>('synopsis');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editField, setEditField] = useState<'title' | 'author' | 'synopsis' | 'cover'>('synopsis');
  const [proposedValue, setProposedValue] = useState('');
  const [editSubmitted, setEditSubmitted] = useState(false);

  // Review form
  const [newRating, setNewRating] = useState<number>(8.5);
  const [reviewText, setReviewText] = useState('');
  const [containsSpoilers, setContainsSpoilers] = useState(false);
  const [submittedReviews, setSubmittedReviews] = useState<any[]>([]);

  // Private note editing
  const [notesText, setNotesText] = useState(libraryItem?.privateNotes || '');

  const handleRatingChange = (rating: number) => {
    if (!book) return;
    updateRating(book.id, rating);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    const newRev = {
      id: `rev_${Date.now()}`,
      userName: user?.displayName || 'Amy Winnar',
      userAvatar: user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: newRating,
      content: reviewText,
      containsSpoilers,
      helpfulCount: 0,
      createdAt: 'Just now',
    };
    setSubmittedReviews([newRev, ...submittedReviews]);
    setReviewText('');
    setContainsSpoilers(false);
  };

  const handleMetadataSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!book || !proposedValue.trim()) return;
    submitMetadataCorrection(
      book.id,
      book.title,
      editField,
      editField === 'synopsis' ? book.description : book.title,
      proposedValue
    );
    setEditSubmitted(true);
    setTimeout(() => {
      setShowEditModal(false);
      setEditSubmitted(false);
      setProposedValue('');
    }, 1500);
  };

  const statuses: ShelfStatus[] = [
    'Currently Reading',
    'Completed',
    'Plan to Read',
    'On Hold',
    'Dropped',
  ];

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-12 space-y-4">
        <Loader2 className="w-8 h-8 text-amber-300 animate-spin" />
        <p className="text-sm text-gray-300 font-heading">
          Retrieving bibliographic record from Open Library...
        </p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="p-12 text-center text-gray-400 space-y-3">
        <h2 className="text-xl font-heading text-white">Book record not found.</h2>
        <p className="text-xs text-gray-400 max-w-md mx-auto">
          The requested identifier could not be retrieved from Open Library or local records.
        </p>
        <Link to="/discover" className="liquid-btn-primary text-xs px-6 py-2.5 inline-flex mt-2">
          Return to Discovery
        </Link>
      </div>
    );
  }

  // Base community rating or Vellora honest label
  const hasVelloraRating = book.communityRating > 0 && book.ratingCount > 0;
  const isOpenLibraryBook = book.id.startsWith('OL');

  return (
    <div className="min-h-full pb-12 select-none">
      {/* Top Banner with Dynamic Blur Palette derived from Cover */}
      <div className="relative w-full h-80 overflow-hidden">
        <img
          src={book.backdropUrl || book.coverUrl}
          alt={book.title}
          className="w-full h-full object-cover filter blur-3xl opacity-35 scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#090C12]/80 to-[#0A0D14]" />
      </div>

      {/* Main Book Entity Header */}
      <div className="max-w-[1240px] mx-auto px-6 -mt-52 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Cover Art (2:3 Aspect ratio) with Liquid Glass Rim */}
          <div className="w-52 md:w-64 aspect-[2/3] shrink-0 rounded-[26px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/20 relative group bg-black/40">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = book.coverUrl;
              }}
            />
            {book.isLegalFreeReader && (
              <div className="absolute top-3 right-3 bg-gradient-to-r from-emerald-500/40 to-teal-500/30 backdrop-blur-xl text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg border border-emerald-400/30">
                Vellora Web Reader
              </div>
            )}
            {isOpenLibraryBook && (
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-amber-200 px-2.5 py-0.5 rounded-full text-[10px] font-mono border border-amber-300/30">
                OL: {book.id}
              </div>
            )}
          </div>

          {/* Core Metadata */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-xl text-xs font-semibold text-gray-200 border border-white/15 shadow-sm">
                {book.format}
              </span>
              <span className="text-xs text-gray-500">•</span>
              {book.publishedYear > 0 && (
                <>
                  <span className="text-xs text-gray-300 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" /> First Published {book.publishedYear}
                  </span>
                  <span className="text-xs text-gray-500">•</span>
                </>
              )}
              {book.editions && book.editions.length > 0 && (
                <span className="text-xs text-gray-300">{book.editions.length} Editions Consolidated</span>
              )}
            </div>

            <h1 className="font-playfair text-3xl md:text-5xl font-bold text-white leading-tight">
              {book.title}
            </h1>

            <p className="text-lg text-gray-300 font-medium">
              By <span className="text-white font-semibold">{book.author}</span>
            </p>

            {/* Community Rating (1-10 with 0.5 steps) - Honest representation */}
            <div className="flex items-center gap-4 py-2 border-y border-white/[0.08]">
              {hasVelloraRating ? (
                <>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-bold font-heading text-white">
                      {book.communityRating.toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-400">/ 10</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    ({book.ratingCount.toLocaleString()} Vellora community reviews)
                  </span>
                </>
              ) : (
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Star className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-300 font-medium">Unrated in Vellora database</span>
                  <span>•</span>
                  <span className="text-amber-300">Be the first to rate this work</span>
                </div>
              )}
            </div>

            {/* User Interaction Controls: Liquid Glass Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Shelf Dropdown */}
              <div className="relative group/shelf">
                <button className="liquid-btn-primary text-xs h-11 px-6">
                  <Bookmark className="w-4 h-4" />
                  <span>{libraryItem ? libraryItem.status : 'Add to Shelf'}</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-1" />
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-2xl bg-gradient-to-b from-[#181D28]/95 to-[#10141D]/95 backdrop-blur-2xl border border-white/15 p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] hidden group-hover/shelf:block z-30">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => updateShelfStatus(book.id, status)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl text-gray-200 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <span>{status}</span>
                      {libraryItem?.status === status && (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Legal Web Reader CTA or External Record */}
              {book.isLegalFreeReader ? (
                <Link
                  to={`/read/${book.id}`}
                  className="liquid-btn-secondary text-xs h-11 px-5"
                >
                  <BookOpen className="w-4 h-4" /> Open Legal Web Reader
                </Link>
              ) : isOpenLibraryBook ? (
                <a
                  href={`https://openlibrary.org/works/${book.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-btn-secondary text-xs h-11 px-5"
                >
                  <Globe className="w-4 h-4 text-amber-300" /> Open Library Record ↗
                </a>
              ) : book.buyLink ? (
                <a
                  href={book.buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-btn-secondary text-xs h-11 px-5"
                >
                  <ExternalLink className="w-4 h-4" /> Publisher External
                </a>
              ) : null}

              {/* Discussion Room CTA */}
              <Link
                to={`/book/${book.id}/discussion`}
                className="liquid-btn-secondary text-xs h-11 px-5"
              >
                <MessageSquare className="w-4 h-4" /> Discussion Room
              </Link>

              {/* Catalog Suggestion Trigger */}
              <button
                onClick={() => setShowEditModal(true)}
                className="reference-circle-btn"
                title="Suggest metadata edit or report issue"
              >
                <FileEdit className="w-4 h-4" />
              </button>
            </div>

            {/* User Personal Rating on 10-point scale */}
            <div className="pt-3 flex items-center gap-3">
              <span className="text-xs text-gray-400">Your Rating:</span>
              <StarRating
                rating={libraryItem?.userRating || 0}
                readOnly={false}
                onChange={handleRatingChange}
                size="md"
              />
            </div>
          </div>
        </div>

        {/* Content Navigation Tabs: Frosted Glass Capsule */}
        <div className="mt-12 flex border-b border-white/[0.08] gap-8 text-sm font-heading">
          {[
            { id: 'synopsis', label: 'Synopsis & Subjects' },
            { id: 'editions', label: `Editions & Translations (${book.editions?.length || 0})` },
            { id: 'reviews', label: 'Community Reviews & Ratings' },
            { id: 'notes', label: 'Private Notes' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 font-semibold transition-all relative ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-300 via-white to-purple-300 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
              )}
            </button>
          ))}
        </div>

        {/* Tab 1: Synopsis & Subjects */}
        {activeTab === 'synopsis' && (
          <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <h3 className="font-heading text-lg font-semibold text-white">
                Synopsis
              </h3>
              <p className="text-gray-200 leading-relaxed font-sans text-base whitespace-pre-line">
                {book.description}
              </p>
            </div>

            <div className="space-y-6">
              {/* Subjects / Genres from Open Library */}
              <div className="liquid-glass-card p-5 rounded-[22px]">
                <h4 className="font-heading text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Subjects & Themes
                </h4>
                <div className="flex flex-wrap gap-2">
                  {book.genres.map((g) => (
                    <span
                      key={g}
                      className="px-3 py-1 rounded-full bg-white/10 text-white border border-white/15 text-xs font-medium shadow-sm"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bibliographic Provenance */}
              <div className="liquid-glass-card p-5 rounded-[22px] space-y-2 text-xs text-gray-400">
                <h4 className="font-heading text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Catalog Source
                </h4>
                <p>
                  Bibliographic entity consolidated under <strong className="text-white">{book.id}</strong>.
                </p>
                {isOpenLibraryBook && (
                  <p className="text-[11px] text-amber-300/80">
                    Sourced live via Open Library official REST APIs.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Editions & Translations */}
        {activeTab === 'editions' && (
          <div className="py-8 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-300">
                All physical formats, digital releases, and translations consolidated under this canonical work record.
              </p>
              <button
                onClick={() => setShowEditModal(true)}
                className="text-xs text-white hover:text-vellora-ice flex items-center gap-1 font-semibold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Suggest Missing Edition
              </button>
            </div>

            {book.editions && book.editions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {book.editions.map((ed) => (
                  <div
                    key={ed.id}
                    className="p-5 liquid-glass-card space-y-2 rounded-[22px]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-semibold text-sm text-white">
                        {ed.format}
                      </span>
                      {ed.year > 0 && (
                        <span className="text-xs text-gray-300 font-mono">{ed.year}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-300">Language: {ed.language}</p>
                    {ed.publisher && (
                      <p className="text-xs text-gray-400">Publisher: {ed.publisher}</p>
                    )}
                    {ed.isbn && (
                      <p className="text-[11px] text-gray-500 font-mono">ISBN: {ed.isbn}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center liquid-glass-panel rounded-2xl text-xs text-gray-400">
                Single canonical edition registered for this work.
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Community Reviews & Ratings */}
        {activeTab === 'reviews' && (
          <div className="py-8 space-y-8">
            {/* Submit Review Card */}
            <form
              onSubmit={handleReviewSubmit}
              className="liquid-glass-card p-6 space-y-4 shadow-xl rounded-[24px]"
            >
              <h3 className="font-heading text-base font-semibold text-white">
                Write a Review & Rating
              </h3>
              <p className="text-xs text-gray-300">
                Share your reading reflection on Vellora's 10-point scale.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <span className="text-xs font-medium text-gray-300">Rating:</span>
                <StarRating
                  rating={newRating}
                  readOnly={false}
                  onChange={setNewRating}
                  size="md"
                />
              </div>

              <textarea
                rows={3}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your thoughts on themes, prose, pacing..."
                className="w-full bg-black/40 border border-white/12 rounded-2xl p-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-vellora-ice/60 shadow-inner"
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={containsSpoilers}
                    onChange={(e) => setContainsSpoilers(e.target.checked)}
                    className="rounded border-white/20 bg-black/50 text-white focus:ring-white"
                  />
                  <span>Contains plot spoilers (will be shielded)</span>
                </label>

                <button type="submit" className="liquid-btn-primary text-xs">
                  Publish Review
                </button>
              </div>
            </form>

            {/* Reviews List */}
            <div className="space-y-4">
              {submittedReviews.length === 0 && !hasVelloraRating ? (
                <div className="p-8 text-center liquid-glass-panel rounded-2xl space-y-2">
                  <p className="text-sm text-gray-300">No community reviews on Vellora for this work yet.</p>
                  <p className="text-xs text-gray-500">
                    Be the first reader to publish a review above!
                  </p>
                </div>
              ) : (
                [...submittedReviews, ...(hasVelloraRating ? [
                  {
                    id: 'rev_static_1',
                    userName: 'Brittany Sullivan',
                    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
                    rating: 9.5,
                    content: 'An extraordinary payoff of narrative structure. The depth and craftsmanship of this work reverberate long after the final page.',
                    containsSpoilers: false,
                    helpfulCount: 42,
                    createdAt: '2 days ago',
                  }
                ] : [])].map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 liquid-glass-card space-y-3 rounded-[22px]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.userAvatar}
                          alt={rev.userName}
                          className="w-8 h-8 rounded-full object-cover border border-white/20 shadow-sm"
                        />
                        <div>
                          <h4 className="text-xs font-semibold text-white">
                            {rev.userName}
                          </h4>
                          <span className="text-[10px] text-gray-400">{rev.createdAt}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-yellow-300 border border-white/15 text-xs font-bold font-heading shadow-sm">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{rev.rating.toFixed(1)}/10</span>
                      </div>
                    </div>

                    {rev.containsSpoilers ? (
                      <SpoilerShield label="Review contains plot spoilers">
                        <p>{rev.content}</p>
                      </SpoilerShield>
                    ) : (
                      <p className="text-sm text-gray-200 leading-relaxed font-sans">
                        {rev.content}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Private Notes */}
        {activeTab === 'notes' && (
          <div className="py-8 max-w-2xl space-y-4">
            <h3 className="font-heading text-base font-semibold text-white">
              Private Personal Notes
            </h3>
            <p className="text-xs text-gray-400">
              Private marginalia is never visible to friends, communities, or public feeds.
            </p>

            <textarea
              rows={6}
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="Record your personal theories, page references, or reflections..."
              className="w-full bg-black/40 border border-white/12 rounded-2xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-vellora-ice/60 shadow-inner"
            />

            <button
              onClick={() => updatePrivateNotes(book.id, notesText)}
              className="liquid-btn-primary text-xs"
            >
              Save Private Notes
            </button>
          </div>
        )}
      </div>

      {/* Catalog Metadata Correction Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setShowEditModal(false)}
          />
          <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-[#181D28] to-[#10141D] border border-white/15 p-6 shadow-2xl z-10 space-y-4">
            <h3 className="font-heading font-semibold text-lg text-white">
              Suggest Catalog Correction
            </h3>
            <p className="text-xs text-gray-400">
              Edits are routed to the administrative moderation portal for approval.
            </p>

            {editSubmitted ? (
              <div className="py-6 text-center text-emerald-400 font-semibold text-sm">
                ✓ Suggestion queued for admin review. Thank you!
              </div>
            ) : (
              <form onSubmit={handleMetadataSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1 font-medium">
                    Field to correct
                  </label>
                  <select
                    value={editField}
                    onChange={(e) => setEditField(e.target.value as any)}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-gray-200"
                  >
                    <option value="synopsis">Synopsis / Description</option>
                    <option value="title">Book Title</option>
                    <option value="author">Author Name</option>
                    <option value="cover">Cover Image URL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1 font-medium">
                    Proposed New Value
                  </label>
                  <textarea
                    rows={4}
                    value={proposedValue}
                    onChange={(e) => setProposedValue(e.target.value)}
                    placeholder="Enter updated canonical metadata..."
                    className="w-full bg-black/50 border border-white/15 rounded-xl p-3 text-xs text-gray-200 focus:outline-none focus:border-vellora-ice"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 rounded-full text-xs text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="liquid-btn-primary text-xs">
                    Submit for Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
