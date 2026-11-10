import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('amy.winnar@vellora.io');
  const [password, setPassword] = useState('vellora2026');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setEmailError('Please provide a valid reader address');
      return;
    }
    setEmailError('');
    login(email);
    if (isRegister) {
      navigate('/onboarding');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#07090B] text-gray-100 flex flex-col md:flex-row">
      {/* Left Column: Ambient Full-Bleed Literary Artwork (Section 10.2) */}
      <div className="hidden md:flex flex-1 relative overflow-hidden bg-[#0D0F14] p-12 flex-col justify-between">
        <img
          src="https://images.unsplash.com/photo-1507842229451-79b1be886a20?auto=format&fit=crop&w=1200&q=80"
          alt="Atmospheric Sanctuary"
          className="absolute inset-0 w-full h-full object-cover filter brightness-50 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />

        {/* Brand Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-vellora-gold text-[#0A0C0E] flex items-center justify-center font-bold shadow-xl">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-playfair text-xl font-bold tracking-widest text-white">
              VELLORA
            </h2>
            <p className="text-[11px] text-gray-300">
              Every story has a place in your heart
            </p>
          </div>
        </div>

        {/* Literary Quote Card */}
        <div className="relative z-10 max-w-lg p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 space-y-2">
          <p className="font-playfair italic text-lg text-gray-200">
            "A reader lives a thousand lives before he dies. The man who never reads lives only one."
          </p>
          <span className="block text-xs text-vellora-gold font-semibold uppercase tracking-wider">
            — George R.R. Martin
          </span>
        </div>
      </div>

      {/* Right Column: Centered Dark Glass Auth Panel (max-width: 440px) */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
        <div className="w-full max-w-[440px] rounded-3xl bg-[#141822]/90 backdrop-blur-2xl border border-white/10 p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <h1 className="font-playfair text-2xl md:text-3xl font-bold text-gray-100">
              {isRegister ? 'Begin Your Journey' : 'Welcome to the Sanctuary'}
            </h1>
            <p className="text-xs text-gray-400">
              {isRegister
                ? 'Join an atmospheric digital haven for impassioned readers.'
                : 'Access your reading headquarters, shelves, and Muse companion.'}
            </p>
          </div>

          {/* Tab Selector: Login vs Register */}
          <div className="flex p-1 rounded-full bg-black/40 border border-white/10 text-xs font-heading">
            <button
              onClick={() => setIsRegister(false)}
              className={`flex-1 py-2 rounded-full font-semibold transition-all ${
                !isRegister
                  ? 'bg-vellora-gold text-[#0A0C0E] shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsRegister(true)}
              className={`flex-1 py-2 rounded-full font-semibold transition-all ${
                isRegister
                  ? 'bg-vellora-gold text-[#0A0C0E] shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {/* Google OAuth Button */}
          <button
            onClick={() => {
              login();
              navigate('/dashboard');
            }}
            className="w-full flex items-center justify-center gap-3 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-gray-200 font-medium transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center gap-3 text-[10px] text-gray-500 uppercase tracking-widest">
            <div className="flex-1 h-px bg-white/10" />
            <span>or email address</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-400 mb-1 font-medium">Reader Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="reader@vellora.io"
                  className="w-full bg-black/40 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-vellora-gold"
                />
              </div>
              {emailError && (
                <span className="text-[11px] text-red-400 mt-1 block">
                  {emailError}
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-gray-400 font-medium">Password</label>
                {!isRegister && (
                  <Link
                    to="/forgot-password"
                    className="text-[11px] text-vellora-gold hover:underline"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 rounded-xl pl-9 pr-9 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-vellora-gold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-white absolute right-3 top-2.5"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full vellora-button-primary text-xs py-3 justify-center shadow-lg"
            >
              {isRegister ? 'Proceed to Reader Preferences' : 'Enter Vellora'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Bypass */}
          <div className="text-center pt-2">
            <Link
              to="/dashboard"
              className="text-[11px] text-gray-500 hover:text-vellora-gold transition-colors underline"
            >
              Continue as Amy Winnar (Demo Session)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

