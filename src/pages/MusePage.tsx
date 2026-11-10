import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  Shield,
  ShieldCheck,
  Send,
  Lock,
  BookOpen,
  Eye,
  Info,
  Flame,
  Compass,
} from 'lucide-react';
import { useMuse } from '../context/MuseContext';
import { SpoilerShield } from '../components/common/SpoilerShield';
import { BookCard } from '../components/common/BookCard';

export const MusePage: React.FC = () => {
  const {
    conversations,
    activeConversationId,
    permissions,
    updatePermissions,
    sendMessage,
    startNewThread,
    selectConversation,
  } = useMuse();

  const [inputPrompt, setInputPrompt] = useState('');

  const activeConv =
    conversations.find((c) => c.id === activeConversationId) || conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;
    sendMessage(inputPrompt);
    setInputPrompt('');
  };

  return (
    <div className="h-full flex flex-col md:flex-row overflow-hidden bg-transparent">
      {/* Left Sidebar: Threads List & Permission Scope Dock */}
      <div className="w-full md:w-80 shrink-0 border-b md:border-b-0 md:border-r border-white/[0.08] bg-[#131722]/65 backdrop-blur-[28px] p-5 flex flex-col justify-between">
        <div className="space-y-5">
          {/* New Thread Button: Champagne Gold Liquid Glass */}
          <button
            onClick={startNewThread}
            className="w-full liquid-btn-primary text-xs py-3 justify-center shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>New Prompt Thread</span>
          </button>

          {/* Conversations List */}
          <div className="space-y-1.5 max-h-[300px] md:max-h-[380px] overflow-y-auto pr-1">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2">
              Recent Consultations
            </span>
            {conversations.map((conv) => {
              const isActive = conv.id === activeConversationId;
              return (
                <button
                  key={conv.id}
                  onClick={() => selectConversation(conv.id)}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-b from-white to-gray-200 text-[#090C10] font-semibold shadow-[0_6px_20px_rgba(255,255,255,0.25),inset_0_1px_1.5px_rgba(255,255,255,0.95)]'
                      : 'text-gray-300 hover:bg-white/[0.08] hover:text-white border border-transparent hover:border-white/10'
                  }`}
                >
                  <p className="text-xs truncate">{conv.title}</p>
                  <span className={`text-[10px] ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                    {conv.createdAt}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mandatory Permission Scope Dock (Section 16.3) with Liquid Glass Sheen */}
        <div className="mt-4 pt-4 border-t border-white/[0.08] rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/[0.08] p-4 space-y-3 shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.12)]">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Muse Privacy & Scopes</span>
          </div>
          <p className="text-[11px] text-gray-300 leading-tight">
            Per Vellora protocol, Muse cannot inspect personal records without explicit permission toggles.
          </p>

          <div className="space-y-2.5 text-xs">
            {/* Scope 1: Library Access */}
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-[11px]">Library Shelves</span>
              <button
                onClick={() =>
                  updatePermissions({
                    allowLibraryAccess: !permissions.allowLibraryAccess,
                  })
                }
                className={`w-9 h-5 rounded-full p-0.5 transition-colors shadow-inner ${
                  permissions.allowLibraryAccess ? 'bg-emerald-400 shadow-[0_0_10px_#4ADE80]' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform shadow-md ${
                    permissions.allowLibraryAccess ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Scope 2: Rating History */}
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-[11px]">Rating History</span>
              <button
                onClick={() =>
                  updatePermissions({
                    allowRatingHistoryAccess: !permissions.allowRatingHistoryAccess,
                  })
                }
                className={`w-9 h-5 rounded-full p-0.5 transition-colors shadow-inner ${
                  permissions.allowRatingHistoryAccess ? 'bg-emerald-400 shadow-[0_0_10px_#4ADE80]' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform shadow-md ${
                    permissions.allowRatingHistoryAccess ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Scope 3: Private Notes */}
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-[11px]">Private Notes</span>
              <button
                onClick={() =>
                  updatePermissions({
                    allowPrivateNotesAccess: !permissions.allowPrivateNotesAccess,
                  })
                }
                className={`w-9 h-5 rounded-full p-0.5 transition-colors shadow-inner ${
                  permissions.allowPrivateNotesAccess ? 'bg-emerald-400 shadow-[0_0_10px_#4ADE80]' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform shadow-md ${
                    permissions.allowPrivateNotesAccess ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Area: Interactive Chat Session */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-transparent">
        {/* Chat Header with Pulsing Muse Orb */}
        <div className="h-16 px-6 border-b border-white/[0.08] bg-transparent backdrop-blur-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Animated Pulsing Muse Orb with Ice-Blue / Lavender Aura */}
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 via-purple-400 to-cyan-300 p-0.5 muse-pulse-ring flex items-center justify-center shadow-lg">
              <div className="w-full h-full rounded-full bg-[#10141D] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
              </div>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-sm text-white flex items-center gap-2">
                <span>{activeConv ? activeConv.title : 'Literary Dialogue'}</span>
              </h3>
              <p className="text-[10px] text-gray-400">Contextual Reading Oracle & Literary Advisor</p>
            </div>
          </div>
          <span className="text-[11px] text-gray-300 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] border border-white/10 shadow-sm">
            <Lock className="w-3 h-3 text-emerald-400" /> Automatic Spoiler Shield Active
          </span>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeConv?.messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${
                  isUser ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-bold text-xs shadow-md ${
                    isUser
                      ? 'bg-gradient-to-b from-white to-gray-200 text-[#090C10] shadow-[0_4px_12px_rgba(255,255,255,0.3)]'
                      : 'bg-gradient-to-tr from-amber-400/20 via-purple-500/20 to-cyan-400/20 text-white border border-white/20'
                  }`}
                >
                  {isUser ? 'U' : <Sparkles className="w-4 h-4 text-yellow-300" />}
                </div>

                {/* Bubble Container: Liquid Glass Refraction */}
                <div className="space-y-3 flex-1 min-w-0">
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed backdrop-blur-2xl ${
                      isUser
                        ? 'bg-gradient-to-b from-white to-gray-200 text-[#090C10] font-medium shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_1.5px_rgba(255,255,255,0.95)] rounded-tr-none'
                        : 'bg-gradient-to-b from-white/[0.09] to-white/[0.02] text-gray-100 border border-white/[0.12] rounded-tl-none shadow-[0_12px_36px_-6px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.18)]'
                    }`}
                  >
                    {/* Mandatory Spoiler Shield Check for Muse output */}
                    {msg.containsSpoilers ? (
                      <SpoilerShield label="Plot Twist or Climax Protected">
                        <p>{msg.content}</p>
                      </SpoilerShield>
                    ) : (
                      <p className="leading-relaxed">{msg.content}</p>
                    )}
                    <span className={`block text-[10px] mt-2 text-right ${isUser ? 'text-gray-600' : 'text-gray-400'}`}>
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Recommendation Cards if attached by Muse */}
                  {msg.bookRecommendations && msg.bookRecommendations.length > 0 && (
                    <div className="pt-2">
                      <p className="text-xs font-semibold text-white mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-yellow-300" /> Curated Literary Matches:
                      </p>
                      <div className="flex gap-4 overflow-x-auto pb-2">
                        {msg.bookRecommendations.map((b) => (
                          <BookCard key={b.id} book={b} size="sm" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Prompt Input Form: Liquid Glass Input Capsule */}
        <div className="p-4 border-t border-white/[0.08] bg-[#131722]/70 backdrop-blur-xl">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto flex items-center gap-3">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask Muse for literary recommendations, theme comparisons, or pacing insights..."
              className="flex-1 bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.14] border border-white/[0.12] focus:border-vellora-ice/60 rounded-full px-5 py-3 text-sm text-white placeholder-gray-400 focus:outline-none transition-all shadow-[0_4px_16px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.14)] focus:shadow-[0_0_18px_rgba(147,197,253,0.18)]"
            />
            <button
              type="submit"
              className="liquid-btn-primary px-6 py-3 text-xs"
            >
              <Send className="w-4 h-4 text-black" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
