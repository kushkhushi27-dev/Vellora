import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MessageSquare,
  ThumbsUp,
  Plus,
  ArrowLeft,
  Send,
  AlertTriangle,
} from 'lucide-react';
import { useSocial } from '../context/SocialContext';
import { useLibrary } from '../context/LibraryContext';
import { SpoilerShield } from '../components/common/SpoilerShield';
import { BookDiscussion } from '../types';

export const BookDiscussionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { discussions, addDiscussionPost, addDiscussionComment } = useSocial();
  const { getBookById } = useLibrary();

  const bookId = id || 'hp7';
  const book = getBookById(bookId);

  const categories: BookDiscussion['category'][] = [
    'General Discussion',
    'Theories & Predictions',
    'Character Analysis',
    'Fan Discussions & Art',
    'Polls',
  ];

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<BookDiscussion['category']>('Theories & Predictions');
  const [isSpoiler, setIsSpoiler] = useState(false);

  const [replyInput, setReplyInput] = useState<{ [discId: string]: string }>({});

  const bookDiscussions = discussions.filter((d) => d.bookId === bookId);
  const filtered = bookDiscussions.filter(
    (d) => activeCategory === 'All' || d.category === activeCategory
  );

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    addDiscussionPost(bookId, newCategory, newTitle.trim(), newContent.trim(), isSpoiler);
    setNewTitle('');
    setNewContent('');
    setIsSpoiler(false);
    setShowCreateModal(false);
  };

  const handleAddComment = (discId: string) => {
    const text = replyInput[discId];
    if (!text || !text.trim()) return;
    addDiscussionComment(discId, text.trim(), false);
    setReplyInput((prev) => ({ ...prev, [discId]: '' }));
  };

  return (
    <div className="p-5 md:p-8 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            to={`/book/${bookId}`}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to {book?.title || 'Book Details'}
          </Link>
          <h1 className="font-playfair text-3xl font-bold text-gray-100 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-vellora-gold" />
            Book Discussion Sanctuary
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Book-level analysis, fan predictions, character trajectories, and guarded lore.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="vellora-button-primary text-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Start Discussion Thread
        </button>
      </div>

      {/* Category Pills Filter (Section 21.2) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/5 text-xs">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-3 py-1.5 rounded-full font-medium transition-all ${
            activeCategory === 'All'
              ? 'bg-vellora-gold text-[#0A0C0E] font-semibold'
              : 'bg-white/5 text-gray-400 hover:text-white'
          }`}
        >
          All Topics ({bookDiscussions.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full font-medium transition-all whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-vellora-gold text-[#0A0C0E] font-semibold'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Threads Stream */}
      <div className="space-y-6">
        {filtered.map((thread) => (
          <div
            key={thread.id}
            className="rounded-3xl bg-[#141822]/85 backdrop-blur-2xl border border-white/10 p-6 shadow-xl space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={thread.authorAvatar}
                  alt={thread.authorName}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-semibold text-gray-200">
                    {thread.authorName}
                  </h4>
                  <span className="text-[10px] text-gray-500 font-mono">
                    {thread.timestamp}
                  </span>
                </div>
              </div>

              <span className="text-xs px-2.5 py-0.5 rounded-full bg-vellora-gold/15 text-vellora-gold border border-vellora-gold/30">
                {thread.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-heading font-semibold text-base text-gray-100">
              {thread.title}
            </h3>

            {/* Content with Spoiler Shield (Section 21.2) */}
            {thread.containsSpoilers ? (
              <SpoilerShield label="Discussion thread contains plot spoilers">
                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  {thread.content}
                </p>
              </SpoilerShield>
            ) : (
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                {thread.content}
              </p>
            )}

            {/* Interaction Row */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-gray-400">
              <button className="flex items-center gap-1.5 hover:text-vellora-gold transition-colors">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Upvote ({thread.upvotes})</span>
              </button>
              <span>{thread.comments.length} replies</span>
            </div>

            {/* Nested Comments */}
            {thread.comments.length > 0 && (
              <div className="pt-2 space-y-2 border-t border-white/5">
                {thread.comments.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-vellora-gold">
                        {c.authorName}
                      </span>
                      <span className="text-[10px] text-gray-500">{c.timestamp}</span>
                    </div>
                    {c.containsSpoilers ? (
                      <SpoilerShield label="Reply spoiler">
                        <p>{c.content}</p>
                      </SpoilerShield>
                    ) : (
                      <p className="text-gray-300">{c.content}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Quick Reply Form */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={replyInput[thread.id] || ''}
                onChange={(e) =>
                  setReplyInput({ ...replyInput, [thread.id]: e.target.value })
                }
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment(thread.id)}
                placeholder="Add to the discussion..."
                className="flex-1 bg-black/50 border border-white/10 rounded-full px-4 py-2 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-vellora-gold"
              />
              <button
                onClick={() => handleAddComment(thread.id)}
                className="p-2 rounded-full bg-vellora-gold text-[#0A0C0E] hover:opacity-90 transition-opacity"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Start Discussion Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setShowCreateModal(false)}
          />
          <div className="relative w-full max-w-lg rounded-2xl bg-[#141822] border border-white/15 p-6 shadow-2xl z-10 space-y-4">
            <h3 className="font-heading font-semibold text-lg text-gray-100">
              Start Book Discussion Thread
            </h3>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-400 mb-1 font-medium">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-gray-200"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-medium">Thread Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. The symbolism of the resurrection stone"
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-gray-200 focus:outline-none focus:border-vellora-gold"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-medium">Discussion Content</label>
                <textarea
                  rows={5}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Detail your thoughts, references, or queries..."
                  className="w-full bg-black/50 border border-white/15 rounded-xl p-3 text-gray-200 focus:outline-none focus:border-vellora-gold"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                <input
                  type="checkbox"
                  checked={isSpoiler}
                  onChange={(e) => setIsSpoiler(e.target.checked)}
                  className="rounded border-white/20 bg-black text-vellora-gold focus:ring-vellora-gold"
                />
                <span>Flag thread as containing major spoilers</span>
              </label>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-full text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button type="submit" className="vellora-button-primary text-xs">
                  Create Thread
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

