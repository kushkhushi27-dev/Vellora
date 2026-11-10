import React, { useState } from 'react';
import { MessageSquare, Send, X, Sparkles } from 'lucide-react';
import { useSocial } from '../../context/SocialContext';
import { useAuth } from '../../context/AuthContext';

export const ActivitySidebar: React.FC = () => {
  const { activities } = useSocial();
  const { user } = useAuth();
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [localComments, setLocalComments] = useState<{ [activityId: string]: string[] }>({});

  const handleSendReply = (activityId: string) => {
    if (!replyText.trim()) return;
    setLocalComments((prev) => ({
      ...prev,
      [activityId]: [...(prev[activityId] || []), replyText.trim()],
    }));
    setReplyText('');
    setReplyingTo(null);
  };

  return (
    <aside className="w-[305px] shrink-0 hidden xl:flex flex-col h-full bg-[#131722]/65 backdrop-blur-[28px] border-l border-white/[0.08] py-6 px-4 overflow-y-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-1 mb-5">
        <h3 className="font-heading font-semibold text-sm text-white flex items-center gap-2">
          <span>Activity</span>
        </h3>
        <span className="text-[10px] text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-mono font-semibold flex items-center gap-1 shadow-[0_0_10px_rgba(78,159,112,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Stream
        </span>
      </div>

      {/* Stream of Liquid Glass Activity Cards */}
      <div className="space-y-3.5">
        {activities.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] hover:from-white/[0.12] hover:to-white/[0.04] backdrop-blur-xl border border-white/[0.09] hover:border-white/[0.18] p-4 transition-all duration-300 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.14)] hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.45),0_0_16px_rgba(196,181,253,0.08),inset_0_1px_1.5px_rgba(255,255,255,0.24)]"
          >
            {/* User row */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <img
                  src={item.userAvatar}
                  alt={item.userName}
                  className="w-7 h-7 rounded-full object-cover border border-white/20 shadow-sm group-hover:scale-105 transition-transform"
                />
                <span className="text-xs font-semibold text-white hover:text-vellora-ice transition-colors cursor-pointer">
                  {item.userName}
                </span>
              </div>
              <span className="text-[10px] text-gray-400 font-mono">
                {item.timestamp}
              </span>
            </div>

            {/* Content text */}
            <p className="text-xs text-gray-200 leading-relaxed mb-2.5 font-sans">
              {item.content}
            </p>

            {/* Replies if any */}
            {localComments[item.id] && localComments[item.id].length > 0 && (
              <div className="pl-3 py-1 space-y-1.5 border-l-2 border-vellora-ice/40 my-2">
                {localComments[item.id].map((c, i) => (
                  <div key={i} className="text-[11px] text-gray-200">
                    <span className="text-white font-semibold">
                      {user?.displayName || 'You'}:
                    </span>{' '}
                    {c}
                  </div>
                ))}
              </div>
            )}

            {/* Reply toggle */}
            {replyingTo === item.id ? (
              <div className="mt-2 pt-2 border-t border-white/[0.08] flex flex-col gap-2">
                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <span>Replying to {item.userName}</span>
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendReply(item.id)}
                    placeholder="Write a reply..."
                    className="flex-1 bg-black/40 border border-white/12 rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-vellora-ice/50 shadow-inner"
                  />
                  <button
                    onClick={() => handleSendReply(item.id)}
                    className="liquid-btn-primary px-3 py-1.5 text-[11px] rounded-xl"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between pt-1 border-t border-white/[0.05]">
                <button
                  onClick={() => setReplyingTo(item.id)}
                  className="text-[11px] text-gray-400 hover:text-white flex items-center gap-1 transition-colors group/btn"
                >
                  <MessageSquare className="w-3 h-3 group-hover/btn:text-vellora-ice" />
                  <span>Reply</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};
