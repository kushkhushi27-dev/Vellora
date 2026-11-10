import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  UserCheck,
  UserPlus,
  Shield,
  BookOpen,
  Award,
  Zap,
  Globe,
  Lock,
  Star,
  Settings,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLibrary } from '../context/LibraryContext';
import { mockFriends, mockBooks } from '../data/mockData';
import { BookCard } from '../components/common/BookCard';

export const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuth();
  const { books } = useLibrary();

  const isCurrentUser = !username || username === user?.username;
  const friendProfile = mockFriends.find((f) => f.username === username);

  const [isFollowing, setIsFollowing] = useState(false);

  const displayName = isCurrentUser
    ? user?.displayName || 'Amy Winnar'
    : friendProfile?.displayName || username;
  const avatarUrl = isCurrentUser
    ? user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'
    : friendProfile?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80';
  const bio = isCurrentUser
    ? user?.bio || 'Voracious reader of gothic fantasy and philosophical epics. Always annotated.'
    : 'Literary wanderer, lover of classic tragedies and web novels.';

  // 4 Favorite Books Showcase (Section 17.3)
  const favoriteBooks = isCurrentUser
    ? (user?.favoriteBookIds || ['hp7', 'frankenstein', 'dorian_gray', 'dune'])
        .map((id) => books.find((b) => b.id === id))
        .filter(Boolean)
    : mockBooks.slice(0, 4);

  return (
    <div className="min-h-full pb-12 select-none">
      {/* Dynamic Ambient Blur Banner */}
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={user?.bannerUrl || 'https://images.unsplash.com/photo-1507842229451-79b1be886a20?auto=format&fit=crop&w=1200&q=80'}
          alt="Banner"
          className="w-full h-full object-cover filter blur-md opacity-35 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#090C12]/75 to-[#0A0D14]" />
      </div>

      <div className="max-w-[1240px] mx-auto px-6 -mt-28 relative z-10 space-y-8">
        {/* Profile Card Header: Liquid Glass Container with Specular Highlight */}
        <div className="liquid-glass-card p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 shadow-2xl rounded-[28px]">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-28 h-28 rounded-full object-cover border-4 border-white/20 shadow-2xl"
            />
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h1 className="font-playfair text-2xl md:text-3xl font-bold text-white">
                  {displayName}
                </h1>
                <span className="text-xs text-amber-200 bg-amber-500/15 px-3 py-1 rounded-full font-semibold border border-amber-400/25 shadow-sm">
                  Level {user?.level || 2} Reader
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono">@{username || 'amywinnar'}</p>
              <p className="text-sm text-gray-200 max-w-xl leading-relaxed pt-1">
                {bio}
              </p>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="flex items-center gap-3">
            {isCurrentUser ? (
              <Link to="/settings" className="liquid-btn-secondary text-xs h-11 px-5">
                <Settings className="w-4 h-4" /> Edit Profile & Privacy
              </Link>
            ) : (
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`liquid-btn-primary text-xs h-11 px-6 ${
                  isFollowing ? 'bg-white/20 text-white' : ''
                }`}
              >
                {isFollowing ? (
                  <>
                    <UserCheck className="w-4 h-4" /> Friends
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" /> Add Friend
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Reading Metrics & Stats Matrix: 4 Liquid Glass Cards with Refraction */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 liquid-glass-card space-y-1 text-center rounded-[22px]">
            <span className="text-xs text-gray-400 font-medium">Books Completed</span>
            <div className="text-2xl font-bold font-heading text-white">
              {user?.booksReadTotal || 34}
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold">
              Goal: {user?.annualGoal || 50} books
            </span>
          </div>

          <div className="p-5 liquid-glass-card space-y-1 text-center rounded-[22px]">
            <span className="text-xs text-gray-400 font-medium">Current Streak</span>
            <div className="text-2xl font-bold font-heading text-yellow-300 flex items-center justify-center gap-1">
              <Zap className="w-5 h-5 fill-current" />
              <span>{user?.streakDays || 7} Days</span>
            </div>
            <span className="text-[10px] text-gray-400">Consistent Reader</span>
          </div>

          <div className="p-5 liquid-glass-card space-y-1 text-center rounded-[22px]">
            <span className="text-xs text-gray-400 font-medium">Global Ranking</span>
            <div className="text-2xl font-bold font-heading text-white">
              #{user?.rank?.toLocaleString() || '2,339'}
            </div>
            <span className="text-[10px] text-amber-300 font-semibold">
              {user?.rankPercentile || 'Top 1%'} percentile
            </span>
          </div>

          <div className="p-5 liquid-glass-card space-y-1 text-center rounded-[22px]">
            <span className="text-xs text-gray-400 font-medium">Reader Points</span>
            <div className="text-2xl font-bold font-heading text-white">
              {user?.points?.toLocaleString() || '88,242'}
            </div>
            <span className="text-[10px] text-purple-300">145 to Level 3</span>
          </div>
        </div>

        {/* Shelf Highlight Showcase */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-semibold text-lg text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-300" />
              <span>Featured Showcase (Top 4)</span>
            </h2>
            <Link to="/library" className="text-xs text-amber-300 hover:underline">
              View Complete Shelf →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {favoriteBooks.map((b) => (
              <div key={b!.id} className="flex justify-center">
                <BookCard book={b!} size="md" />
              </div>
            ))}
          </div>
        </div>

        {/* Granular Privacy Indicators (Section 17.2) */}
        <div className="p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs backdrop-blur-md">
          <div className="flex items-center gap-2 text-gray-300">
            <Shield className="w-4 h-4 text-amber-300" />
            <span>Profile Privacy Baseline:</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
              Activity: <strong className="text-white">Public</strong>
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
              Shelves: <strong className="text-white">Public</strong>
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
              Reviews: <strong className="text-white">Public</strong>
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              Private Notes: <strong className="text-emerald-300">Strictly Guarded</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
