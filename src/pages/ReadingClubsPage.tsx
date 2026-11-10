import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Shield,
  Calendar,
  Users,
  CheckCircle,
  Vote,
  Send,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { useSocial } from '../context/SocialContext';
import { useAuth } from '../context/AuthContext';

export const ReadingClubsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { clubs, voteClubPoll } = useSocial();
  const { user } = useAuth();

  const selectedClub = id
    ? clubs.find((c) => c.id === id) || clubs[0]
    : clubs[0];

  const [messageInput, setMessageInput] = useState('');
  const [localMessages, setLocalMessages] = useState<
    { id: string; userName: string; userAvatar: string; message: string; timestamp: string }[]
  >(selectedClub.discussionMessages);

  const handleSendDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    const newMsg = {
      id: `m_${Date.now()}`,
      userName: user?.displayName || 'Amy Winnar',
      userAvatar: user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      message: messageInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setLocalMessages([...localMessages, newMsg]);
    setMessageInput('');
  };

  return (
    <div className="p-5 md:p-8 space-y-8 max-w-[1300px] mx-auto select-none">
      {/* Page Header */}
      <div>
        <h1 className="font-playfair text-3xl font-bold text-white flex items-center gap-3">
          <Shield className="w-7 h-7 text-emerald-400" />
          <span>Reading Circles & Clubs</span>
        </h1>
        <p className="text-xs text-gray-300 mt-1">
          Shared reading pace focused on target book completion dates and synchronized literary dialogues.
        </p>
      </div>

      {/* Main Club Container: Book-Level Execution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Active Book Selection & Target Timeline */}
        <div className="lg:col-span-5 space-y-6">
          <div className="liquid-glass-panel p-6 shadow-2xl space-y-5 rounded-[26px]">
            <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-400/25 shadow-sm">
              Active Book Selection
            </span>

            {/* Book Display */}
            <div className="flex gap-4 items-center">
              <img
                src={selectedClub.activeBook.coverUrl}
                alt={selectedClub.activeBook.title}
                className="w-24 aspect-[2/3] object-cover rounded-2xl shadow-lg border border-white/15"
              />
              <div className="space-y-1">
                <h3 className="font-heading font-semibold text-base text-white leading-snug">
                  {selectedClub.activeBook.title}
                </h3>
                <p className="text-xs text-gray-400">{selectedClub.activeBook.author}</p>
                <div className="pt-2">
                  <Link
                    to={selectedClub.activeBook.isLegalFreeReader ? `/read/${selectedClub.activeBook.id}` : `/book/${selectedClub.activeBook.id}`}
                    className="liquid-btn-primary text-xs py-2 px-4 inline-flex"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Read with Circle
                  </Link>
                </div>
              </div>
            </div>

            {/* Target Completion Dates */}
            <div className="pt-4 border-t border-white/[0.08] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-300" /> Cycle Started:
                </span>
                <span className="font-mono text-gray-200">{selectedClub.startDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Target Completion:
                </span>
                <span className="font-mono text-emerald-300 font-semibold">
                  {selectedClub.targetCompletionDate}
                </span>
              </div>
            </div>

            {/* Participating Readers Roster */}
            <div className="pt-4 border-t border-white/[0.08] space-y-2">
              <span className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-300" /> Member Roster ({selectedClub.members.length})
              </span>
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {selectedClub.members.map((m) => (
                  <img
                    key={m.id}
                    src={m.avatar}
                    alt={m.name}
                    className="w-9 h-9 rounded-full object-cover border border-white/20 hover:border-amber-300 transition-colors shadow-sm"
                    title={m.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Club Poll: Next Month's Book Selection */}
          <div className="liquid-glass-panel p-6 shadow-xl space-y-4 rounded-[26px]">
            <div className="flex items-center gap-2 text-amber-300">
              <Vote className="w-4 h-4" />
              <h3 className="font-heading font-semibold text-sm text-white">
                Poll: Next Month's Book Choice
              </h3>
            </div>
            <p className="text-xs text-gray-300">
              Cast your ballot for our upcoming literary journey:
            </p>

            <div className="space-y-2 text-xs">
              {selectedClub.nextBookPoll.options.map((opt) => {
                const isSelected = selectedClub.nextBookPoll.userVoted === opt.bookTitle;
                return (
                  <button
                    key={opt.bookTitle}
                    onClick={() => voteClubPoll(selectedClub.id, opt.bookTitle)}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-amber-400 bg-amber-500/15 text-white font-semibold shadow-[0_0_15px_rgba(224,168,46,0.25)]'
                        : 'border-white/10 bg-black/30 text-gray-300 hover:bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <span>{opt.bookTitle}</span>
                    <span className="text-[11px] font-mono opacity-80">
                      {opt.votes} votes
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Discussion Feed */}
        <div className="lg:col-span-7 space-y-4">
          <div className="liquid-glass-panel p-6 rounded-[26px] shadow-2xl flex flex-col h-[650px] justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <h3 className="font-heading font-semibold text-sm text-white">
                  Discussion Stream: {selectedClub.name}
                </h3>
                <span className="text-xs text-gray-400 font-mono">
                  {localMessages.length} contributions
                </span>
              </div>

              {/* Message Items */}
              <div className="space-y-4 overflow-y-auto max-h-[480px] pt-4 pr-1">
                {localMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3 text-xs">
                    <img
                      src={msg.userAvatar}
                      alt={msg.userName}
                      className="w-8 h-8 rounded-full object-cover border border-white/20 shrink-0 shadow-sm"
                    />
                    <div className="flex-1 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.08] p-3 shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-white">{msg.userName}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{msg.timestamp}</span>
                      </div>
                      <p className="text-gray-200 leading-relaxed font-sans">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendDiscussion} className="flex items-center gap-2 pt-4 border-t border-white/[0.08]">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Share thoughts with circle members..."
                className="flex-1 bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.14] border border-white/[0.12] focus:border-vellora-ice/60 rounded-full px-5 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none transition-all shadow-inner"
              />
              <button type="submit" className="liquid-btn-primary px-4 py-2.5 text-xs">
                <Send className="w-4 h-4 text-black" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
