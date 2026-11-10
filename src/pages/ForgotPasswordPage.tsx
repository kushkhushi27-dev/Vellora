import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Mail, ArrowRight, ArrowLeft, CheckCircle, KeyRound } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRequestLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid reader address');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-[#07090B] text-gray-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/3 w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-vellora-gold/15 via-purple-950/15 to-transparent blur-[160px]" />
      </div>

      <div className="relative z-10 w-full max-w-[440px] rounded-3xl bg-[#141822]/90 backdrop-blur-2xl border border-white/10 p-8 shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-vellora-gold text-[#0A0C0E] flex items-center justify-center font-bold shadow-md">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="font-playfair text-lg font-bold tracking-wider text-white">
            VELLORA
          </span>
        </div>

        {/* Step Progress Indicator (Section 10.3) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium">
            <span>
              {step === 1 ? '1. Request Link' : step === 2 ? '2. Check Email' : '3. Set New Password'}
            </span>
            <span className="font-mono">{step} of 3</span>
          </div>
          <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-vellora-gold rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Request Link */}
        {step === 1 && (
          <form onSubmit={handleRequestLink} className="space-y-4 text-xs">
            <div className="text-center space-y-1">
              <h2 className="font-playfair text-2xl font-bold text-gray-100">
                Recover Access
              </h2>
              <p className="text-gray-400">
                Enter your reader email to receive a secure recovery code.
              </p>
            </div>

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
              {error && <span className="text-[11px] text-red-400 mt-1 block">{error}</span>}
            </div>

            <button
              type="submit"
              className="w-full vellora-button-primary text-xs py-2.5 justify-center"
            >
              Send Recovery Code <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* Step 2: Check Email & Enter New Password */}
        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4 text-xs">
            <div className="text-center space-y-1">
              <h2 className="font-playfair text-2xl font-bold text-gray-100">
                Set New Key
              </h2>
              <p className="text-gray-400">
                Recovery token verified for <strong className="text-white">{email}</strong>.
              </p>
            </div>

            <div>
              <label className="block text-gray-400 mb-1 font-medium">New Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters..."
                  className="w-full bg-black/40 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-vellora-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-1 font-medium">Confirm New Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password..."
                  className="w-full bg-black/40 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-vellora-gold"
                />
              </div>
              {error && <span className="text-[11px] text-red-400 mt-1 block">{error}</span>}
            </div>

            <button
              type="submit"
              className="w-full vellora-button-primary text-xs py-2.5 justify-center"
            >
              Update Password <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* Step 3: Success Confirmation */}
        {step === 3 && (
          <div className="text-center space-y-4 py-3">
            <div className="w-12 h-12 rounded-full bg-vellora-emerald/20 text-vellora-emerald flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-playfair text-2xl font-bold text-gray-100">
                Password Restored
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Your credentials have been securely updated.
              </p>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="vellora-button-primary text-xs py-2 px-6"
            >
              Return to Sign In
            </button>
          </div>
        )}

        {/* Back Link */}
        <div className="text-center pt-2 border-t border-white/5">
          <Link
            to="/login"
            className="text-xs text-gray-400 hover:text-white inline-flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

