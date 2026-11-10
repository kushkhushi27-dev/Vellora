import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Sparkles,
  Compass,
  Users,
  Shield,
  ArrowRight,
  Star,
  CheckCircle,
  Play,
} from 'lucide-react';
import { mockBooks } from '../data/mockData';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'discover' | 'muse' | 'library' | 'social'>('discover');

  return (
    <div className="min-h-screen bg-[#07090B] text-gray-100 flex flex-col relative overflow-x-hidden">
      {/* Background Cinematic Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-amber-950/20 via-purple-950/15 to-transparent blur-[160px]" />
        <div className="absolute bottom-0 right-10 w-[60vw] h-[60vw] rounded-full bg-gradient-to-tl from-indigo-950/25 via-emerald-950/15 to-transparent blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:24px_24px] opacity-35" />
      </div>

      {/* Top Navigation */}
      <header className="relative z-20 h-20 px-6 md:px-12 flex items-center justify-between border-b border-white/5 bg-[#0A0C0E]/60 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-vellora-gold to-amber-600 flex items-center justify-center text-[#0A0C0E] font-bold shadow-lg shadow-vellora-gold/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="font-playfair font-bold text-xl tracking-wider text-white">
              VELLORA
            </span>
            <span className="hidden sm:inline-block ml-3 text-[11px] text-gray-400 font-sans tracking-wide">
              Every story has a place in your heart
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-xs text-gray-300 hover:text-white px-4 py-2 rounded-full transition-colors font-medium"
          >
            Sign In
          </Link>
          <Link
            to="/dashboard"
            className="vellora-button-primary text-xs shadow-lg"
          >
            Enter Sanctuary <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-16 pb-20 max-w-5xl mx-auto space-y-8">
        {/* Subtle illuminated marginalia badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-vellora-gold/10 border border-vellora-gold/25 text-xs text-vellora-gold font-medium backdrop-blur-md shadow-[0_0_20px_rgba(224,168,46,0.15)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Next Generation Social Reading Ecosystem</span>
        </div>

        {/* Cinematic Serif Heading */}
        <h1 className="font-playfair text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-100 max-w-4xl leading-[1.15]">
          A Digital Sanctuary for <br />
          <span className="bg-gradient-to-r from-vellora-gold via-amber-200 to-vellora-gold bg-clip-text text-transparent italic font-normal">
            Impassioned Readers.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-2xl font-sans leading-relaxed">
          Unifying rich catalog discovery, deep reading metrics, book-level discussion rooms,
          collaborative reading circles, and <strong>Muse</strong>—an intelligent literary companion.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/dashboard"
            className="vellora-button-primary text-sm px-8 py-3.5 shadow-2xl"
          >
            <BookOpen className="w-4 h-4" /> Open Reader Dashboard
          </Link>
          <Link
            to="/discover"
            className="vellora-button-secondary text-sm px-7 py-3.5"
          >
            <Compass className="w-4 h-4" /> Explore Discovery
          </Link>
        </div>

        {/* Feature Interactive Tabs Preview (Section 10.1) */}
        <div className="w-full pt-16 space-y-6">
          <div className="flex justify-center border-b border-white/10 gap-3 sm:gap-8 text-xs sm:text-sm font-heading">
            {[
              { id: 'discover', label: '1. Cinematic Discovery', icon: Compass },
              { id: 'muse', label: '2. Muse AI Companion', icon: Sparkles },
              { id: 'library', label: '3. Personal Tracking', icon: BookOpen },
              { id: 'social', label: '4. Circles & Guilds', icon: Users },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 pb-3 font-semibold transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-vellora-gold'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-vellora-gold rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Interactive Feature Card Preview */}
          <div className="rounded-3xl bg-[#141822]/90 backdrop-blur-2xl border border-white/10 p-6 md:p-10 shadow-2xl text-left grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {activeTab === 'discover' && (
              <>
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-wider text-vellora-gold font-bold">
                    Discovery Reimagined
                  </span>
                  <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gray-100">
                    Cinematic full-bleed art & curated collections.
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Browse multi-format literature with high-contrast editorial hierarchy. From serialized web novels to ancient public domain masterpieces readable instantly in our legal reader.
                  </p>
                  <div className="pt-2 flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5 text-vellora-emerald font-semibold">
                      <CheckCircle className="w-4 h-4" /> 10-Point Rating System
                    </span>
                    <span className="flex items-center gap-1.5 text-vellora-gold font-semibold">
                      <CheckCircle className="w-4 h-4" /> 0.5 Increment Precision
                    </span>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden border border-white/15 aspect-[16/10] shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
                    alt="Discovery"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                    <p className="text-xs text-white font-medium">
                      Featured: Figma-tes: Cross the Celestial Gates
                    </p>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'muse' && (
              <>
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-wider text-vellora-gold font-bold">
                    Intelligent Guidance
                  </span>
                  <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gray-100">
                    Meet Muse: Your Literary Companion.
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Deep contextual exploration of themes, character motivations, and obscure tropes without rigid tag constraints. With mandatory spoiler shields guarding every revelation.
                  </p>
                  <div className="pt-2 flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5 text-vellora-gold font-semibold">
                      <CheckCircle className="w-4 h-4" /> Explicit Permission Scopes
                    </span>
                    <span className="flex items-center gap-1.5 text-vellora-emerald font-semibold">
                      <CheckCircle className="w-4 h-4" /> Automated Spoiler Shields
                    </span>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-3 font-mono text-xs">
                  <div className="text-vellora-gold font-semibold">Muse AI Preview:</div>
                  <div className="text-gray-300 leading-relaxed">
                    "Victor Frankenstein's true horror was not the biological animation of matter, but his sudden realization that he could not father what he had manufactured..."
                  </div>
                  <div className="p-2.5 rounded-lg border border-dashed border-vellora-gold/40 text-vellora-gold text-center text-[11px]">
                    [ ⚠️ SPOILER CONTENT — Guarded by Vellora Protocol ]
                  </div>
                </div>
              </>
            )}

            {activeTab === 'library' && (
              <>
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-wider text-vellora-gold font-bold">
                    Reading Headquarters
                  </span>
                  <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gray-100">
                    5-Status tracking, streaks & private notes.
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Manage your library across Currently Reading, Completed, Plan to Read, On Hold, and Dropped shelves. Toggle between high-impact 2:3 cover grids and dense data tables.
                  </p>
                  <div className="pt-2 flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5 text-vellora-emerald font-semibold">
                      <CheckCircle className="w-4 h-4" /> Real-time Progress (Legal Reader)
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {mockBooks.slice(0, 2).map((b) => (
                    <div
                      key={b.id}
                      className="p-3 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-3"
                    >
                      <img src={b.coverUrl} alt={b.title} className="w-12 h-16 rounded object-cover" />
                      <div>
                        <div className="text-xs font-semibold text-gray-200 truncate">{b.title}</div>
                        <div className="text-[10px] text-vellora-gold mt-1">★ {b.communityRating}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'social' && (
              <>
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-wider text-vellora-gold font-bold">
                    Community & Guilds
                  </span>
                  <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gray-100">
                    Book-level discussion rooms & reading circles.
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Join monthly reading circles with target completion dates, vote in monthly book polls, and discuss lore without clutter or spam.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-2">
                  <span className="text-xs text-vellora-emerald font-semibold">The Midnight Reading Circle</span>
                  <p className="text-xs text-gray-300">Active Book: Frankenstein: The Modern Prometheus</p>
                  <div className="text-[11px] text-gray-500 font-mono">Target: November 28, 2026</div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 md:px-12 border-t border-white/5 bg-[#0A0C0E]/80 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          © 2026 VELLORA. Every story has a place in your heart.
        </div>
        <div className="flex items-center gap-6">
          <Link to="/discover" className="hover:text-vellora-gold transition-colors">
            Discover
          </Link>
          <Link to="/muse" className="hover:text-vellora-gold transition-colors">
            Muse AI
          </Link>
          <Link to="/dashboard" className="hover:text-vellora-gold transition-colors">
            Dashboard
          </Link>
          <Link to="/admin" className="hover:text-vellora-gold transition-colors">
            Catalog Admin
          </Link>
        </div>
      </footer>
    </div>
  );
};

