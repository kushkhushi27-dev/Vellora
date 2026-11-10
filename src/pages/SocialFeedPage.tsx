import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  MessageCircle,
  Share2,
  Image as ImageIcon,
  BookOpen,
  Send,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { useSocial } from '../context/SocialContext';
import { useAuth } from '../context/AuthContext';
import { SpoilerShield } from '../components/common/SpoilerShield';

export const SocialFeedPage: React.FC = () => {
  const { posts, createPost, toggleLikePost, addPostComment } = useSocial();
  const { user } = useAuth();

  const [postText, setPostText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [containsSpoilers, setContainsSpoilers] = useState(false);
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;
    createPost(postText, imageUrl.trim() || undefined, undefined, containsSpoilers);
    setPostText('');
    setImageUrl('');
    setContainsSpoilers(false);
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;
    addPostComment(postId, text.trim());
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="p-5 md:p-8 space-y-6 max-w-3xl mx-auto select-none">
      {/* Header */}
      <div>
        <h1 className="font-playfair text-3xl font-bold text-white">
          Literary Commons
        </h1>
        <p className="text-xs text-gray-300 mt-1">
          Organic reader updates, physical bookshelf aesthetics, written reviews, and thoughtful discussions.
        </p>
      </div>

      {/* Post Creator Box: Liquid Glass Container */}
      <form
        onSubmit={handleCreatePost}
        className="liquid-glass-panel p-5 shadow-2xl space-y-4 rounded-[26px]"
      >
        <div className="flex items-start gap-3">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover shrink-0 border border-white/20 shadow-md"
          />
          <textarea
            rows={3}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Share your thoughts on recent readings, quotes, or bookshelf arrangements..."
            className="flex-1 bg-black/40 border border-white/12 rounded-2xl p-3 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:border-vellora-ice/60 shadow-inner"
          />
        </div>

        {/* Optional Image URL Input */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/[0.08] text-xs">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Add image URL (e.g. bookshelf photo)..."
              className="bg-black/30 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-gray-300 placeholder-gray-500 w-60 focus:outline-none focus:border-white/30"
            />
            <label className="flex items-center gap-1.5 cursor-pointer text-gray-300">
              <input
                type="checkbox"
                checked={containsSpoilers}
                onChange={(e) => setContainsSpoilers(e.target.checked)}
                className="rounded border-white/20 bg-black text-amber-400 focus:ring-amber-400"
              />
              <span className="text-[11px]">Spoilers</span>
            </label>
          </div>

          <button type="submit" className="liquid-btn-primary text-xs py-2 px-5">
            Publish Post
          </button>
        </div>
      </form>

      {/* Stream of Organic Social Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="liquid-glass-card p-6 shadow-xl space-y-4 rounded-[26px]"
          >
            {/* Author Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.userAvatar}
                  alt={post.userName}
                  className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-sm"
                />
                <div>
                  <h3 className="font-heading font-semibold text-sm text-white">
                    {post.userName}
                  </h3>
                  <span className="text-[11px] text-gray-400 font-mono">{post.timestamp}</span>
                </div>
              </div>
            </div>

            {/* Post Content with Spoiler Guard */}
            {post.containsSpoilers ? (
              <SpoilerShield label="Post contains major plot disclosures">
                <p className="text-sm text-gray-200 leading-relaxed font-sans">
                  {post.text}
                </p>
              </SpoilerShield>
            ) : (
              <p className="text-sm text-gray-200 leading-relaxed font-sans">
                {post.text}
              </p>
            )}

            {/* Attached Book Preview if any */}
            {post.bookAttached && (
              <Link
                to={`/book/${post.bookAttached.id}`}
                className="flex items-center gap-3 p-3 rounded-2xl bg-black/40 border border-white/10 hover:border-amber-400/30 transition-all group shadow-sm"
              >
                <img
                  src={post.bookAttached.cover}
                  alt={post.bookAttached.title}
                  className="w-10 h-14 rounded-lg object-cover shadow group-hover:scale-105 transition-transform"
                />
                <div>
                  <h4 className="text-xs font-semibold text-white group-hover:text-vellora-ice transition-colors">
                    {post.bookAttached.title}
                  </h4>
                  <p className="text-[11px] text-gray-400">{post.bookAttached.author}</p>
                </div>
              </Link>
            )}

            {/* Attached Image if any */}
            {post.imageUrl && (
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <img
                  src={post.imageUrl}
                  alt="Attached upload"
                  className="w-full h-72 object-cover"
                  loading="lazy"
                />
              </div>
            )}

            {/* Post Action Metrics (Likes, Comments, Share) */}
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.08] text-xs text-gray-400">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleLikePost(post.id)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    post.hasLiked ? 'text-rose-400' : 'hover:text-white'
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${post.hasLiked ? 'fill-current' : ''}`}
                  />
                  <span>{post.likes}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments.length}</span>
                </div>
              </div>

              <button className="hover:text-white transition-colors" title="Share link">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Comments List */}
            {post.comments.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-white/[0.05]">
                {post.comments.map((c) => (
                  <div key={c.id} className="flex items-start gap-2.5 text-xs">
                    <img
                      src={c.userAvatar}
                      alt={c.userName}
                      className="w-6 h-6 rounded-full object-cover border border-white/15"
                    />
                    <div className="flex-1 bg-white/[0.04] p-2.5 rounded-xl border border-white/[0.06]">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{c.userName}</span>
                        <span className="text-[10px] text-gray-400">{c.timestamp}</span>
                      </div>
                      <p className="text-gray-200 mt-0.5">{c.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add Comment Input */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={commentInputs[post.id] || ''}
                onChange={(e) =>
                  setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                }
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                placeholder="Write a comment..."
                className="flex-1 bg-black/40 border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-vellora-ice/60 shadow-inner"
              />
              <button
                onClick={() => handleAddComment(post.id)}
                className="liquid-btn-primary px-3.5 py-2 text-xs"
              >
                <Send className="w-3.5 h-3.5 text-black" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
