import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Home,
  Compass,
  BookOpen,
  Sparkles,
  Users,
  MessageSquare,
  Shield,
  Settings,
  Plus,
  Lock,
  Layers,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSocial } from '../../context/SocialContext';
import { useLibrary } from '../../context/LibraryContext';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const { friends } = useSocial();
  const { books } = useLibrary();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', to: '/dashboard', icon: Home },
    { label: 'Discover', to: '/discover', icon: Compass },
    { label: 'Library', to: '/library', icon: BookOpen },
    { label: 'Muse AI', to: '/muse', icon: Sparkles, badge: 'AI', isMuse: true },
    { label: 'Feed', to: '/feed', icon: Layers },
    { label: 'Messages', to: '/messages', icon: MessageSquare },
    { label: 'Communities', to: '/communities', icon: Users },
    { label: 'Reading Clubs', to: '/clubs', icon: Shield },
    { label: 'Admin', to: '/admin', icon: Lock },
  ];

  return (
    <aside className="w-[245px] shrink-0 hidden md:flex flex-col h-full bg-[#131722]/65 backdrop-blur-[28px] border-r border-white/[0.08] py-6 px-3.5 select-none overflow-y-auto">
      {/* User Profile Header Chip */}
      <Link
        to={user ? `/profile/${user.username}` : '/login'}
        className="flex items-center gap-3 p-2.5 rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent hover:from-white/[0.12] hover:to-white/[0.04] transition-all group mb-5 border border-white/[0.07] hover:border-white/[0.18] shadow-[0_4px_16px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.12)]"
      >
        <img
          src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
          alt={user?.displayName || 'User'}
          className="w-10 h-10 rounded-full object-cover border border-white/25 shadow-md group-hover:scale-105 transition-transform"
        />
        <div className="flex flex-col min-w-0">
          <span className="font-heading font-semibold text-sm text-white group-hover:text-white transition-colors truncate">
            {user?.displayName || 'Amy Winnar'}
          </span>
          <span className="text-[11px] text-gray-400">@{user?.username || 'amywinnar'}</span>
        </div>
      </Link>

      {/* Main Navigation Links */}
      <nav className="space-y-1.5 mb-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group relative flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-b from-white to-gray-200 text-[#0A0D12] shadow-[0_6px_20px_rgba(255,255,255,0.25),inset_0_1px_1.5px_rgba(255,255,255,0.95)]'
                    : 'text-gray-300 hover:text-white hover:bg-gradient-to-b hover:from-white/[0.10] hover:to-white/[0.03] hover:border hover:border-white/[0.12] hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-2.5 relative z-10">
                    <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                      item.isMuse && !isActive ? 'text-yellow-300' : ''
                    }`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full relative z-10 transition-colors ${
                      isActive
                        ? 'bg-black/15 text-[#0A0D12]'
                        : 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {/* Subtle hover specular sheen */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Books Section */}
      <div className="mb-6 pt-4 border-t border-white/[0.08]">
        <div className="flex items-center justify-between px-2 mb-2.5">
          <span className="text-xs font-semibold text-gray-400">Books</span>
          <button
            onClick={() => navigate('/library')}
            className="w-5 h-5 rounded-full bg-white/[0.08] hover:bg-white/[0.18] text-gray-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
            title="Add book"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-1">
          {books.slice(0, 5).map((book) => (
            <Link
              key={book.id}
              to={`/book/${book.id}`}
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-white/[0.08] hover:border hover:border-white/[0.08] transition-all group"
            >
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-5 h-7 rounded object-cover shrink-0 shadow-md group-hover:scale-105 transition-transform"
              />
              <span className="text-xs text-gray-300 group-hover:text-white transition-colors truncate">
                {book.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Friends Section */}
      <div className="mb-4 pt-4 border-t border-white/[0.08] flex-1 min-h-0">
        <div className="flex items-center justify-between px-2 mb-2.5">
          <span className="text-xs font-semibold text-gray-400">Friends</span>
          <button
            onClick={() => navigate('/messages')}
            className="w-5 h-5 rounded-full bg-white/[0.08] hover:bg-white/[0.18] text-gray-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
            title="Find friends"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-1">
          {friends.map((friend) => (
            <Link
              key={friend.id}
              to={`/profile/${friend.username}`}
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-white/[0.08] hover:border hover:border-white/[0.08] transition-all group"
            >
              <div className="relative shrink-0">
                <img
                  src={friend.avatar}
                  alt={friend.displayName}
                  className="w-6 h-6 rounded-full object-cover border border-white/20 group-hover:border-white/50 transition-colors"
                />
                {friend.online && (
                  <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-1 ring-[#0D0F14]" />
                )}
              </div>
              <span className="text-xs text-gray-300 group-hover:text-white transition-colors truncate">
                {friend.displayName}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Settings Footer */}
      <div className="pt-4 border-t border-white/[0.08]">
        <Link
          to="/settings"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/[0.08] transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
};
