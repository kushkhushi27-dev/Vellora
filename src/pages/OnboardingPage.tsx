import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  BookOpen,
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
  Shield,
  Layers,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const { user, updateUser, completeOnboarding } = useAuth();
  const navigate = useNavigate();

  // Step 1: Reading Formats (Section 10.4)
  const formats = [
    'E-Books',
    'Web Novels',
    'Light Novels',
    'Academic Literature',
    'Non-Fiction',
    'Fanfiction',
  ];
  const [selectedFormats, setSelectedFormats] = useState<string[]>(['E-Books', 'Web Novels']);

  // Step 2: Genre & Trope Matrix (Section 10.4)
  const tropes = [
    { title: 'High Fantasy', mood: 'Intricate magical worldbuilding & epic scopes', icon: '🏰' },
    { title: 'Morally Grey Protagonists', mood: 'Unforgiving dilemmas & complex ethics', icon: '♟️' },
    { title: 'Cyberpunk & Speculative', mood: 'Dystopian technology & neon transhumanism', icon: '🚀' },
    { title: 'Cozy Mystery', mood: 'Tea, eccentric sleuths, & rain-soaked villages', icon: '☕' },
    { title: 'Enemies-to-Lovers', mood: 'Razor wit, tension, & reluctant alliances', icon: '⚔️' },
    { title: 'Gothic Horror & Melancholia', mood: 'Ancient cloisters, decay, & secrets', icon: '🕯️' },
  ];
  const [selectedTropes, setSelectedTropes] = useState<string[]>([
    'High Fantasy',
    'Gothic Horror & Melancholia',
  ]);

  // Step 3: Initial Profile Setup
  const [displayName, setDisplayName] = useState(user?.displayName || 'Amy Winnar');
  const [bio, setBio] = useState(user?.bio || 'Voracious reader of gothic fantasy and philosophical epics.');

  const toggleFormat = (fmt: string) => {
    if (selectedFormats.includes(fmt)) {
      setSelectedFormats(selectedFormats.filter((f) => f !== fmt));
    } else {
      setSelectedFormats([...selectedFormats, fmt]);
    }
  };

  const toggleTrope = (title: string) => {
    if (selectedTropes.includes(title)) {
      setSelectedTropes(selectedTropes.filter((t) => t !== title));
    } else {
      setSelectedTropes([...selectedTropes, title]);
    }
  };

  const handleFinish = () => {
    updateUser({ displayName, bio });
    completeOnboarding();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#07090B] text-gray-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-vellora-gold/15 via-purple-950/15 to-transparent blur-[160px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-[#141822]/90 backdrop-blur-2xl border border-white/10 p-8 shadow-2xl space-y-6">
        {/* Header with Progress Indicator (Section 10.4) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="font-semibold text-vellora-gold">
              Step {step} of 3: {step === 1 ? 'Reading Formats' : step === 2 ? 'Genres & Tropes' : 'Reader Profile'}
            </span>
            <span className="font-mono">{Math.round((step / 3) * 100)}%</span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-vellora-gold rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Reading Formats */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-playfair text-2xl font-bold text-gray-100">
                What formats do you read?
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Select all mediums that populate your literary habits:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {formats.map((fmt) => {
                const isSelected = selectedFormats.includes(fmt);
                return (
                  <button
                    key={fmt}
                    onClick={() => toggleFormat(fmt)}
                    className={`p-4 rounded-2xl border text-xs font-semibold text-center transition-all flex flex-col items-center justify-center gap-2 ${
                      isSelected
                        ? 'border-vellora-gold bg-vellora-gold/15 text-vellora-gold shadow-md'
                        : 'border-white/10 bg-black/30 text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{fmt}</span>
                    {isSelected && <Check className="w-4 h-4 text-vellora-gold" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Genre & Trope Matrix */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-playfair text-2xl font-bold text-gray-100">
                Choose your favorite genres & tropes
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Muse uses this matrix to seed your personal recommendations:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-1">
              {tropes.map((trope) => {
                const isSelected = selectedTropes.includes(trope.title);
                return (
                  <div
                    key={trope.title}
                    onClick={() => toggleTrope(trope.title)}
                    className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'border-vellora-gold bg-vellora-gold/15 text-white'
                        : 'border-white/10 bg-black/30 text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="text-2xl p-1 rounded bg-black/40">{trope.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-100">{trope.title}</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">{trope.mood}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Initial Profile Setup */}
        {step === 3 && (
          <div className="space-y-5 text-xs">
            <div>
              <h2 className="font-playfair text-2xl font-bold text-gray-100">
                Personalize your Reader Identity
              </h2>
              <p className="text-gray-400 mt-1">
                Your name, bio, and privacy defaults across Vellora:
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-1 font-medium">Reader Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2 text-gray-100 focus:outline-none focus:border-vellora-gold"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-medium">Reader Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-gray-100 focus:outline-none focus:border-vellora-gold"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5 space-y-1">
                <span className="font-semibold text-vellora-gold flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> Vellora Privacy Guarantee
                </span>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Your private notes and individual reading sessions are always isolated and strictly confidential.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep((prev) => (prev - 1) as any)}
              className="px-4 py-2 rounded-full border border-white/15 text-xs text-gray-300 hover:text-white flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          ) : (
            <Link
              to="/dashboard"
              className="text-xs text-gray-500 hover:text-gray-300"
            >
              Skip setup
            </Link>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((prev) => (prev + 1) as any)}
              className="vellora-button-primary text-xs py-2 px-5"
            >
              Next Step <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="vellora-button-primary text-xs py-2 px-6 shadow-xl"
            >
              Complete & Enter Sanctuary <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

