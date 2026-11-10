import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  BookOpen,
  Smile,
  CheckCheck,
  Search,
} from 'lucide-react';
import { useSocial } from '../context/SocialContext';
import { useAuth } from '../context/AuthContext';
import { mockFriends } from '../data/mockData';

export const MessagesPage: React.FC = () => {
  const { threads, activeThreadId, setActiveThreadId, sendDirectMessage } = useSocial();
  const { user } = useAuth();
  const [inputText, setInputText] = useState('');
  const [searchFriend, setSearchFriend] = useState('');

  const activeThread =
    threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendDirectMessage(inputText);
    setInputText('');
  };

  return (
    <div className="h-full flex flex-col md:flex-row overflow-hidden bg-transparent">
      {/* Left Pane: Conversations & Friends (Section 19.2) */}
      <div className="w-full md:w-80 shrink-0 border-b md:border-b-0 md:border-r border-white/5 bg-[#0C0F15]/80 backdrop-blur-xl p-4 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-semibold text-base text-gray-100 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-vellora-gold" /> Friends & Messages
            </h2>
          </div>

          {/* Search Contacts */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchFriend}
              onChange={(e) => setSearchFriend(e.target.value)}
              placeholder="Search friends..."
              className="w-full bg-black/40 border border-white/10 rounded-full pl-8 pr-3 py-1.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-vellora-gold"
            />
          </div>

          {/* Threads List */}
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-2">
              Direct Messages
            </span>
            {threads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              const lastMsg = thread.messages[thread.messages.length - 1];
              return (
                <button
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left ${
                    isActive
                      ? 'bg-vellora-gold/15 border border-vellora-gold/30 text-white'
                      : 'hover:bg-white/5 text-gray-300'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={thread.participantAvatar}
                      alt={thread.participantName}
                      className="w-10 h-10 rounded-full object-cover border border-white/10"
                    />
                    {thread.isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-vellora-emerald ring-2 ring-[#0C0F15]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold truncate">
                        {thread.participantName}
                      </h4>
                      <span className="text-[10px] text-gray-500">
                        {lastMsg ? lastMsg.timestamp : ''}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">
                      {lastMsg ? lastMsg.text : 'No messages yet'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Friends Online Quick List */}
          <div className="pt-2 border-t border-white/5 space-y-1">
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-2">
              Online Friends
            </span>
            <div className="flex gap-2 overflow-x-auto py-1 px-1">
              {mockFriends.map((f) => (
                <div
                  key={f.id}
                  className="relative shrink-0 cursor-pointer group"
                  title={f.displayName}
                >
                  <img
                    src={f.avatar}
                    alt={f.displayName}
                    className="w-9 h-9 rounded-full object-cover border border-white/10 group-hover:border-vellora-gold transition-colors"
                  />
                  {f.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-vellora-emerald ring-2 ring-[#0C0F15]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane: Active Thread Chat */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-transparent">
        {/* Header */}
        <div className="h-16 px-6 border-b border-white/5 bg-[#0C0F15]/50 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={activeThread?.participantAvatar}
                alt={activeThread?.participantName}
                className="w-9 h-9 rounded-full object-cover"
              />
              {activeThread?.isOnline && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-vellora-emerald ring-2 ring-[#0C0F15]" />
              )}
            </div>
            <div>
              <h3 className="font-heading font-semibold text-sm text-gray-100">
                {activeThread?.participantName}
              </h3>
              <span className="text-[10px] text-vellora-emerald">
                {activeThread?.isOnline ? 'Online now' : 'Away'}
              </span>
            </div>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeThread?.messages.map((msg) => {
            const isMe = msg.senderId === user?.id;
            return (
              <div
                key={msg.id}
                className={`flex flex-col max-w-md ${
                  isMe ? 'ml-auto items-end' : 'items-start'
                }`}
              >
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-vellora-gold text-[#0A0C0E] font-medium rounded-tr-none shadow-md'
                      : 'bg-[#141822]/90 text-gray-200 border border-white/10 rounded-tl-none shadow-md'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1 px-1">
                  <span>{msg.timestamp}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-vellora-gold" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-white/5 bg-[#0C0F15]/90 backdrop-blur-xl">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${activeThread?.participantName}...`}
              className="flex-1 bg-black/50 border border-white/10 rounded-full px-5 py-2.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-vellora-gold"
            />
            <button
              type="submit"
              className="vellora-button-primary px-4 py-2.5 text-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

