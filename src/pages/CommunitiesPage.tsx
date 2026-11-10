import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Users,
  Compass,
  Hash,
  Volume2,
  Crown,
  Check,
  Plus,
  ArrowRight,
  Send,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { useSocial } from '../context/SocialContext';
import { useAuth } from '../context/AuthContext';

export const CommunitiesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { communities, joinCommunity, leaveCommunity } = useSocial();
  const { user } = useAuth();

  const selectedCommunity = id
    ? communities.find((c) => c.id === id) || communities[0]
    : communities[0];

  const [activeChannel, setActiveChannel] = useState(
    selectedCommunity.channels[0] || 'general-lore'
  );
  const [channelChatInput, setChannelChatInput] = useState('');
  const [channelMessages, setChannelMessages] = useState<{
    [channel: string]: { user: string; text: string; time: string }[];
  }>({
    'general-lore': [
      { user: 'Charlotte Parker', text: 'Has anyone mapped out the chronology of the first age?', time: '2:14 PM' },
      { user: 'Amy Winnar', text: 'I have the annotated companion by the fireplace!', time: '2:16 PM' },
    ],
  });

  const handleSendChannelMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!channelChatInput.trim()) return;
    setChannelMessages((prev) => ({
      ...prev,
      [activeChannel]: [
        ...(prev[activeChannel] || []),
        {
          user: user?.displayName || 'Amy Winnar',
          text: channelChatInput.trim(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    }));
    setChannelChatInput('');
  };

  return (
    <div className="h-full flex flex-col md:flex-row overflow-hidden bg-transparent select-none">
      {/* Communities Directory / Channels Navigation */}
      <div className="w-full md:w-80 shrink-0 border-b md:border-b-0 md:border-r border-white/[0.08] bg-[#131722]/65 backdrop-blur-[28px] p-5 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-semibold text-base text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-300" />
              <span>Literary Guilds</span>
            </h2>
          </div>

          {/* Communities List */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2">
              All Communities
            </span>
            {communities.map((comm) => {
              const isActive = comm.id === selectedCommunity.id;
              return (
                <Link
                  key={comm.id}
                  to={`/communities/${comm.id}`}
                  className={`flex items-center justify-between p-2.5 rounded-2xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-b from-white to-gray-200 text-[#090C10] font-semibold shadow-[0_6px_20px_rgba(255,255,255,0.25),inset_0_1px_1.5px_rgba(255,255,255,0.95)]'
                      : 'hover:bg-white/[0.08] text-gray-300 hover:text-white border border-transparent hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl p-1.5 rounded-xl bg-black/30 backdrop-blur-md">
                      {comm.icon}
                    </span>
                    <div>
                      <h4 className="text-xs truncate max-w-[140px]">{comm.name}</h4>
                      <p className={`text-[10px] ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                        {comm.memberCount} readers
                      </p>
                    </div>
                  </div>

                  {/* Strict 2 Roles Badge (Section 20.2) */}
                  {comm.userRole && (
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-black/15 text-[#090C10]'
                          : comm.userRole === 'Owner'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-white/10 text-gray-300'
                      }`}
                    >
                      {comm.userRole}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Channels inside Selected Community */}
          <div className="pt-3 border-t border-white/[0.08] space-y-1">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2">
              Channels ({selectedCommunity.name})
            </span>
            {selectedCommunity.channels.map((chan) => {
              const isActive = activeChannel === chan;
              return (
                <button
                  key={chan}
                  onClick={() => setActiveChannel(chan)}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs transition-all text-left ${
                    isActive
                      ? 'bg-white/15 text-amber-200 font-semibold border border-amber-300/30'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  <Hash className="w-3.5 h-3.5 text-gray-400" />
                  <span>{chan}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Community Role Architecture Note (Section 20.2) */}
        <div className="mt-4 pt-3 border-t border-white/[0.08] text-[10px] text-gray-500">
          Vellora Two-Tier Community Protocol: Owner & Member.
        </div>
      </div>

      {/* Main Community Workspace */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-transparent">
        {/* Banner & Header */}
        <div className="relative h-48 overflow-hidden shrink-0 border-b border-white/[0.08]">
          <img
            src={selectedCommunity.banner}
            alt={selectedCommunity.name}
            className="w-full h-full object-cover filter blur-sm opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D13] via-[#0A0D13]/60 to-transparent" />

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-3 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-xl shadow-lg">
                {selectedCommunity.icon}
              </span>
              <div>
                <h1 className="font-playfair text-2xl font-bold text-white">
                  {selectedCommunity.name}
                </h1>
                <p className="text-xs text-gray-300">{selectedCommunity.tagline}</p>
              </div>
            </div>

            {/* Join / Leave Trigger */}
            <div>
              {selectedCommunity.userRole ? (
                <button
                  onClick={() => leaveCommunity(selectedCommunity.id)}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-red-500/20 text-gray-200 hover:text-red-300 border border-white/15 text-xs transition-colors backdrop-blur-md"
                >
                  {selectedCommunity.userRole === 'Owner' ? 'Owner Settings' : 'Leave Guild'}
                </button>
              ) : (
                <button
                  onClick={() => joinCommunity(selectedCommunity.id)}
                  className="liquid-btn-primary text-xs py-2 px-5"
                >
                  <Plus className="w-3.5 h-3.5" /> Join Guild
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Channel Stream */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          {/* Active Channel Header */}
          <div className="h-10 px-6 border-b border-white/[0.08] flex items-center justify-between text-xs text-gray-400 bg-black/25 backdrop-blur-md">
            <div className="flex items-center gap-1.5 text-white font-medium">
              <Hash className="w-3.5 h-3.5 text-amber-300" />
              <span>{activeChannel}</span>
            </div>
            <span>{selectedCommunity.memberCount} members</span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Announcement Board if any */}
            {selectedCommunity.announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-400/30 text-xs space-y-1 backdrop-blur-xl shadow-md"
              >
                <div className="flex items-center justify-between font-semibold text-amber-200">
                  <span className="flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-amber-300" /> Guild Announcement: {ann.title}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">{ann.date}</span>
                </div>
                <p className="text-gray-200 leading-relaxed">{ann.content}</p>
              </div>
            ))}

            {/* Channel Chat Messages */}
            {(channelMessages[activeChannel] || []).map((m, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400/30 to-purple-500/30 border border-white/20 flex items-center justify-center font-bold text-amber-300 shrink-0 shadow-sm">
                  {m.user.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{m.user}</span>
                    <span className="text-[10px] text-gray-400 font-mono">{m.time}</span>
                  </div>
                  <p className="text-gray-200 mt-0.5 leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-white/[0.08] bg-[#131722]/70 backdrop-blur-xl">
            <form onSubmit={handleSendChannelMessage} className="flex items-center gap-2 max-w-4xl mx-auto">
              <input
                type="text"
                value={channelChatInput}
                onChange={(e) => setChannelChatInput(e.target.value)}
                placeholder={`Message #${activeChannel}...`}
                className="flex-1 bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.14] border border-white/[0.12] focus:border-vellora-ice/60 rounded-full px-5 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none transition-all shadow-inner"
              />
              <button
                type="submit"
                className="liquid-btn-primary px-4 py-2.5 text-xs"
              >
                <Send className="w-4 h-4 text-black" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
