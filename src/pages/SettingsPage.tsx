import React, { useState } from 'react';
import {
  Settings,
  User,
  Shield,
  Sparkles,
  Bell,
  Lock,
  Check,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMuse } from '../context/MuseContext';

export const SettingsPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { permissions, updatePermissions } = useMuse();

  const [activeTab, setActiveTab] = useState<'profile' | 'privacy' | 'muse' | 'notifications'>('profile');
  const [displayName, setDisplayName] = useState(user?.displayName || 'Amy Winnar');
  const [bio, setBio] = useState(user?.bio || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Granular Privacy Controls (Section 26.1 & 17.2)
  const [readingActivityPrivacy, setReadingActivityPrivacy] = useState<'Public' | 'Friends Only' | 'Private'>('Public');
  const [shelvesPrivacy, setShelvesPrivacy] = useState<'Public' | 'Friends Only' | 'Private'>('Public');
  const [reviewsPrivacy, setReviewsPrivacy] = useState<'Public' | 'Friends Only' | 'Private'>('Public');
  const [statsPrivacy, setStatsPrivacy] = useState<'Public' | 'Friends Only' | 'Private'>('Public');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      displayName,
      bio,
      privacy: {
        readingActivity: readingActivityPrivacy,
        libraryShelves: shelvesPrivacy,
        reviewsAndRatings: reviewsPrivacy,
        statsAndStreaks: statsPrivacy,
      },
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="p-5 md:p-8 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-playfair text-3xl font-bold text-gray-100 flex items-center gap-3">
          <Settings className="w-7 h-7 text-vellora-gold" /> Settings & Sanctuary Privacy
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Customize your reader profile, manage granular privacy boundaries, and configure Muse AI permissions.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 gap-6 text-xs font-heading font-semibold">
        {[
          { id: 'profile', label: 'Profile & Visuals', icon: User },
          { id: 'privacy', label: 'Privacy Boundaries', icon: Shield },
          { id: 'muse', label: 'Muse AI Permissions', icon: Sparkles },
          { id: 'notifications', label: 'Notifications', icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 pb-3 transition-colors relative ${
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

      {/* Tab 1: Profile & Visuals */}
      {activeTab === 'profile' && (
        <form
          onSubmit={handleSaveProfile}
          className="rounded-3xl bg-[#141822]/85 backdrop-blur-2xl border border-white/10 p-6 space-y-5 shadow-xl text-xs"
        >
          <div className="flex items-center gap-4">
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover border-2 border-vellora-gold"
            />
            <div>
              <h4 className="font-semibold text-gray-100 text-sm">{displayName}</h4>
              <p className="text-gray-400 font-mono">@{user?.username || 'amywinnar'}</p>
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-1 font-medium">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-gray-100 focus:outline-none focus:border-vellora-gold"
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

          <div className="flex items-center justify-between pt-2">
            {savedSuccess && (
              <span className="text-vellora-emerald flex items-center gap-1">
                <Check className="w-4 h-4" /> Preferences safely recorded
              </span>
            )}
            <button
              type="submit"
              className="vellora-button-primary text-xs py-2 px-5 ml-auto"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Granular Privacy Boundaries (Section 26.1 & 17.2) */}
      {activeTab === 'privacy' && (
        <div className="rounded-3xl bg-[#141822]/85 backdrop-blur-2xl border border-white/10 p-6 space-y-6 shadow-xl text-xs">
          <div>
            <h3 className="font-heading font-semibold text-sm text-gray-100">
              Granular Visibility Settings
            </h3>
            <p className="text-gray-400 mt-0.5">
              Control what friends, public readers, and the community can view on your profile.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/30 border border-white/5">
              <div>
                <h4 className="font-medium text-gray-200">Reading Activity Visibility</h4>
                <p className="text-gray-500 text-[11px]">Recent books opened, status updates</p>
              </div>
              <select
                value={readingActivityPrivacy}
                onChange={(e) => setReadingActivityPrivacy(e.target.value as any)}
                className="bg-black/50 border border-white/15 rounded-xl px-3 py-1.5 text-vellora-gold focus:outline-none"
              >
                <option value="Public">Public</option>
                <option value="Friends Only">Friends Only</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/30 border border-white/5">
              <div>
                <h4 className="font-medium text-gray-200">Library Shelves Visibility</h4>
                <p className="text-gray-500 text-[11px]">Currently reading, completed, custom lists</p>
              </div>
              <select
                value={shelvesPrivacy}
                onChange={(e) => setShelvesPrivacy(e.target.value as any)}
                className="bg-black/50 border border-white/15 rounded-xl px-3 py-1.5 text-vellora-gold focus:outline-none"
              >
                <option value="Public">Public</option>
                <option value="Friends Only">Friends Only</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/30 border border-white/5">
              <div>
                <h4 className="font-medium text-gray-200">Reviews & Ratings Visibility</h4>
                <p className="text-gray-500 text-[11px]">Written thoughts and numerical ratings</p>
              </div>
              <select
                value={reviewsPrivacy}
                onChange={(e) => setReviewsPrivacy(e.target.value as any)}
                className="bg-black/50 border border-white/15 rounded-xl px-3 py-1.5 text-vellora-gold focus:outline-none"
              >
                <option value="Public">Public</option>
                <option value="Friends Only">Friends Only</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/30 border border-white/5">
              <div>
                <h4 className="font-medium text-gray-200">Stats & Streaks Visibility</h4>
                <p className="text-gray-500 text-[11px]">Total pages read, consecutive day streaks</p>
              </div>
              <select
                value={statsPrivacy}
                onChange={(e) => setStatsPrivacy(e.target.value as any)}
                className="bg-black/50 border border-white/15 rounded-xl px-3 py-1.5 text-vellora-gold focus:outline-none"
              >
                <option value="Public">Public</option>
                <option value="Friends Only">Friends Only</option>
                <option value="Private">Private</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Muse AI Permissions (Section 16.3 & 26.1) */}
      {activeTab === 'muse' && (
        <div className="rounded-3xl bg-[#141822]/85 backdrop-blur-2xl border border-white/10 p-6 space-y-6 shadow-xl text-xs">
          <div>
            <h3 className="font-heading font-semibold text-sm text-gray-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-vellora-gold" /> Muse AI Data Permissions
            </h3>
            <p className="text-gray-400 mt-0.5">
              Vellora guarantees strict isolation: Muse cannot access personal reading data without explicit permission toggles.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-black/30 border border-white/5">
              <div>
                <h4 className="font-medium text-gray-200">Allow Library Access</h4>
                <p className="text-gray-500 text-[11px]">Enables tailored recommendations based on saved titles</p>
              </div>
              <button
                onClick={() =>
                  updatePermissions({
                    allowLibraryAccess: !permissions.allowLibraryAccess,
                  })
                }
                className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                  permissions.allowLibraryAccess ? 'bg-vellora-emerald' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    permissions.allowLibraryAccess ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-black/30 border border-white/5">
              <div>
                <h4 className="font-medium text-gray-200">Allow Rating History Access</h4>
                <p className="text-gray-500 text-[11px]">Enables deep analysis of your preferred tropes and scores</p>
              </div>
              <button
                onClick={() =>
                  updatePermissions({
                    allowRatingHistoryAccess: !permissions.allowRatingHistoryAccess,
                  })
                }
                className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                  permissions.allowRatingHistoryAccess ? 'bg-vellora-emerald' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    permissions.allowRatingHistoryAccess ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-black/30 border border-white/5">
              <div>
                <h4 className="font-medium text-gray-200">Allow Private Notes Access</h4>
                <p className="text-gray-500 text-[11px]">Permits Muse to cross-examine private marginalia</p>
              </div>
              <button
                onClick={() =>
                  updatePermissions({
                    allowPrivateNotesAccess: !permissions.allowPrivateNotesAccess,
                  })
                }
                className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                  permissions.allowPrivateNotesAccess ? 'bg-vellora-emerald' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    permissions.allowPrivateNotesAccess ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Notifications */}
      {activeTab === 'notifications' && (
        <div className="rounded-3xl bg-[#141822]/85 backdrop-blur-2xl border border-white/10 p-6 space-y-4 shadow-xl text-xs">
          <h3 className="font-heading font-semibold text-sm text-gray-100">
            Notification Preferences
          </h3>
          <p className="text-gray-400">
            Anti-Spam protocol: Automatic friend-completion alerts are excluded by design to prevent feed noise.
          </p>

          <div className="space-y-3 pt-2">
            {[
              { title: 'Direct Messages & Mentions', active: true },
              { title: 'Reading Club Announcements', active: true },
              { title: 'Community Channel Alerts', active: false },
              { title: 'Review Replies & Upvotes', active: true },
            ].map((pref, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-black/30 border border-white/5"
              >
                <span className="text-gray-200 font-medium">{pref.title}</span>
                <span className="text-vellora-emerald font-semibold">Enabled</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

