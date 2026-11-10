import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LibraryProvider } from './context/LibraryContext';
import { MuseProvider } from './context/MuseContext';
import { SocialProvider } from './context/SocialContext';

import { AppShell } from './components/layout/AppShell';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { BookDetailPage } from './pages/BookDetailPage';
import { WebReaderPage } from './pages/WebReaderPage';
import { MusePage } from './pages/MusePage';
import { LibraryPage } from './pages/LibraryPage';
import { ProfilePage } from './pages/ProfilePage';
import { SocialFeedPage } from './pages/SocialFeedPage';
import { MessagesPage } from './pages/MessagesPage';
import { CommunitiesPage } from './pages/CommunitiesPage';
import { ReadingClubsPage } from './pages/ReadingClubsPage';
import { BookDiscussionPage } from './pages/BookDiscussionPage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminPage } from './pages/AdminPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LibraryProvider>
          <MuseProvider>
            <SocialProvider>
              <Routes>
                {/* Public & Onboarding Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/onboarding" element={<OnboardingPage />} />

                {/* Standalone Distraction-Free Web Reader */}
                <Route path="/read/:bookId" element={<WebReaderPage />} />

                {/* Core Authenticated App Frame */}
                <Route element={<AppShell />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/discover" element={<DiscoverPage />} />
                  <Route path="/book/:id" element={<BookDetailPage />} />
                  <Route path="/book/:id/discussion" element={<BookDiscussionPage />} />
                  <Route path="/muse" element={<MusePage />} />
                  <Route path="/library" element={<LibraryPage />} />
                  <Route path="/profile/:username" element={<ProfilePage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/feed" element={<SocialFeedPage />} />
                  <Route path="/messages" element={<MessagesPage />} />
                  <Route path="/messages/:threadId" element={<MessagesPage />} />
                  <Route path="/communities" element={<CommunitiesPage />} />
                  <Route path="/communities/:id" element={<CommunitiesPage />} />
                  <Route path="/clubs" element={<ReadingClubsPage />} />
                  <Route path="/clubs/:id" element={<ReadingClubsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </SocialProvider>
          </MuseProvider>
        </LibraryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

