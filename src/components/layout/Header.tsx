import React from 'react';
import { Search, Bell, ChevronDown, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenNotifications,
  activeFilter = 'All',
  onFilterChange,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const filterPills = [
    'All',
    'E-Books',
    'Web Novels',
    'Light Novels',
    'Fanfiction',
    'Non-Fiction',
  ];

  return (
    <header className="h-20 px-6 md:px-8 flex items-center justify-between gap-4 border-b border-white/[0.08] bg-transparent backdrop-blur-xl z-20">
      {/* Search Pill: 44px height liquid glass pill with specular sheen & keyboard badge */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSearch}
          className="group relative h-11 w-56 sm:w-64 md:w-72 rounded-full bg-gradient-to-b from-white/[0.10] to-white/[0.04] hover:from-white/[0.16] hover:to-white/[0.08] backdrop-blur-2xl border border-white/[0.12] hover:border-vellora-ice/40 px-4 flex items-center gap-2.5 text-xs text-gray-300 hover:text-white transition-all shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.18)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.4),0_0_18px_rgba(147,197,253,0.12)]"
        >
          <Search className="w-4 h-4 text-gray-400 group-hover:text-vellora-ice transition-colors shrink-0" />
          <span className="truncate">Search books, authors, tropes...</span>
          <kbd className="ml-auto text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-gray-300 font-mono border border-white/10">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Floating Category Pill Bar: Liquid glass capsule dock */}
      <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-black/35 backdrop-blur-2xl border border-white/[0.10] shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.10)]">
        {filterPills.map((pill) => {
          const isActive = activeFilter === pill;
          return (
            <button
              key={pill}
              onClick={() => onFilterChange && onFilterChange(pill)}
              className={`h-9 px-4 rounded-full text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-b from-white to-gray-200 text-[#090C10] shadow-[0_4px_16px_rgba(255,255,255,0.3),inset_0_1px_1px_rgba(255,255,255,0.9)]'
                  : 'text-gray-300 hover:text-white hover:bg-white/[0.10] hover:border hover:border-white/10'
              }`}
            >
              {pill}
            </button>
          );
        })}
      </div>

      {/* Right Controls: Ask Muse with liquid glow, Circular Notification with ambient ring, Profile Chip */}
      <div className="flex items-center gap-3">
        {/* Ask Muse Shortcut */}
        <button
          onClick={() => navigate('/muse')}
          className="hidden sm:flex items-center gap-2 h-11 px-4 rounded-full bg-gradient-to-b from-white/[0.12] to-white/[0.04] hover:from-white/[0.18] hover:to-white/[0.08] backdrop-blur-2xl border border-white/[0.15] hover:border-purple-300/40 text-xs font-semibold text-white transition-all shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.22)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.4),0_0_18px_rgba(196,181,253,0.18)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300/30 animate-pulse" />
          <span>Ask Muse</span>
        </button>

        {/* Circular Notification Button (44px x 44px) */}
        <button
          onClick={onOpenNotifications}
          className="relative reference-circle-btn shrink-0"
          title="Notifications"
        >
          <Bell className="w-4 h-4 text-gray-200" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#4ADE80] ring-2 ring-[#12151D] shadow-[0_0_8px_#4ADE80]" />
        </button>

        {/* Profile Chip: Liquid glass asymmetric pill with specular rim */}
        <button
          onClick={() => navigate(user ? `/profile/${user.username}` : '/login')}
          className="h-11 pl-2 pr-3.5 rounded-full bg-gradient-to-b from-white/[0.10] to-white/[0.03] hover:from-white/[0.16] hover:to-white/[0.06] backdrop-blur-2xl border border-white/[0.12] hover:border-white/[0.22] flex items-center gap-2.5 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.18)] shrink-0"
        >
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
            alt="Avatar"
            className="w-7 h-7 rounded-full object-cover border border-white/30 shadow-sm"
          />
          <div className="flex flex-col text-left hidden sm:flex">
            <span className="text-xs font-semibold text-white leading-tight">
              {user?.displayName || 'Amy Winnar'}
            </span>
            <span className="text-[10px] text-gray-400 leading-tight">
              voracious reader
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-0.5" />
        </button>
      </div>
    </header>
  );
};
