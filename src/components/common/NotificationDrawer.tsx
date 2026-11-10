import React, { useState } from 'react';
import { Bell, MessageSquare, UserPlus, Award, BookOpen, X, Check } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Mentions' | 'Clubs'>('All');

  if (!isOpen) return null;

  const notifications = [
    {
      id: 'n1',
      type: 'message',
      title: 'Tonya Gray messaged you',
      desc: '"Are you joining the Frankenstein reading circle tonight?"',
      time: '15m ago',
      unread: true,
      category: 'Mentions',
      icon: MessageSquare,
      color: 'text-amber-300',
    },
    {
      id: 'n2',
      type: 'club',
      title: 'The Midnight Reading Circle',
      desc: 'Target date update: 14 days remaining for Frankenstein: The Modern Prometheus.',
      time: '2h ago',
      unread: true,
      category: 'Clubs',
      icon: BookOpen,
      color: 'text-emerald-300',
    },
    {
      id: 'n3',
      type: 'friend',
      title: 'Jordan Haze started following your shelf',
      desc: 'Added 4 books from your "All-Time Epics" list.',
      time: '1d ago',
      unread: false,
      category: 'All',
      icon: UserPlus,
      color: 'text-purple-300',
    },
    {
      id: 'n4',
      type: 'award',
      title: '7-Day Reading Streak Achieved!',
      desc: 'You unlocked the "Flame of Alexandria" reader badge.',
      time: '1d ago',
      unread: false,
      category: 'All',
      icon: Award,
      color: 'text-yellow-300',
    },
  ];

  const filtered = notifications.filter(
    (n) => activeTab === 'All' || n.category === activeTab
  );

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-gradient-to-b from-[#181D2A]/95 to-[#10141E]/95 backdrop-blur-2xl border-l border-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.18)] flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-amber-300" />
          <h3 className="font-heading font-semibold text-base text-white">
            Notifications Center
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1 rounded-xl hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/8 bg-black/25 text-xs">
        {(['All', 'Mentions', 'Clubs'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-center transition-all border-b-2 ${
              activeTab === tab
                ? 'border-amber-400 text-amber-200 font-semibold shadow-[0_1px_8px_rgba(224,168,46,0.3)]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notification List: Liquid Glass Items */}
      <div className="flex-1 overflow-y-auto divide-y divide-white/5 p-2 space-y-1">
        {filtered.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl transition-all ${
                item.unread
                  ? 'bg-gradient-to-r from-amber-500/[0.08] to-purple-500/[0.05] border border-amber-400/20 shadow-sm'
                  : 'hover:bg-white/[0.05] border border-transparent'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 p-2 rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/10 ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-white truncate">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                {item.unread && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#FCD34D] shrink-0 mt-2" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-3.5 border-t border-white/10 bg-black/30 text-center">
        <button
          onClick={onClose}
          className="text-xs text-gray-300 hover:text-white flex items-center justify-center gap-1.5 w-full py-1.5 rounded-xl hover:bg-white/5 transition-colors font-medium"
        >
          <Check className="w-3.5 h-3.5 text-emerald-400" /> Mark all as read
        </button>
      </div>
    </div>
  );
};
