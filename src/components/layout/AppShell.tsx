import React, { useState } from 'react';
import { Outlet, useLocation, NavLink } from 'react-router-dom';
import { Home, Compass, BookOpen, Sparkles, Users, Layers, MessageSquare, Shield, Settings, Lock } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ActivitySidebar } from './ActivitySidebar';
import { SearchModal } from '../common/SearchModal';
import { NotificationDrawer } from '../common/NotificationDrawer';

export const AppShell: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const location = useLocation();

  const isReaderView = location.pathname.startsWith('/read/');

  const mobileNavItems = [
    { label: 'Home', to: '/dashboard', icon: Home },
    { label: 'Discover', to: '/discover', icon: Compass },
    { label: 'Library', to: '/library', icon: BookOpen },
    { label: 'Muse', to: '/muse', icon: Sparkles },
    { label: 'Feed', to: '/feed', icon: Layers },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#0A0D12] text-[#F3F4F6] overflow-x-hidden flex items-center justify-center p-0 md:p-3 lg:p-5">
      {/* Cinematic Ambient Canvas Atmosphere */}
      <div className="vellora-canvas-bg" />
      <div className="vellora-canvas-art" />
      <div className="vellora-canvas-scrim" />

      {/* Floating Translucent Liquid Glass Master Window with Specular Rim */}
      <div className="relative z-10 w-full max-w-[1640px] h-screen md:h-[94vh] rounded-none md:rounded-[30px] overflow-hidden bg-gradient-to-b from-[#161B26]/75 to-[#0F131C]/80 backdrop-blur-[32px] border border-white/[0.12] shadow-[0_25px_70px_rgba(0,0,0,0.7),inset_0_1px_1.5px_rgba(255,255,255,0.22),0_0_30px_rgba(196,181,253,0.06)] flex flex-col">
        <div className="flex-1 flex overflow-hidden">
          {/* Left Navigation Dock */}
          {!isReaderView && <Sidebar />}

          {/* Central Workspace */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-transparent">
            {!isReaderView && (
              <Header
                onOpenSearch={() => setSearchOpen(true)}
                onOpenNotifications={() => setNotificationsOpen(true)}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
            )}

            <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
              <Outlet context={{ activeFilter }} />
            </main>
          </div>

          {/* Right Activity Stream Dock */}
          {!isReaderView && location.pathname === '/dashboard' && (
            <ActivitySidebar />
          )}
        </div>

        {/* Mobile Floating Bottom Navigation Dock with Liquid Glass Finish */}
        {!isReaderView && (
          <nav className="md:hidden fixed bottom-3 left-4 right-4 z-40 h-14 rounded-full bg-gradient-to-b from-[#181D28]/95 to-[#10141D]/95 backdrop-blur-2xl border border-white/20 px-4 flex items-center justify-around shadow-[0_16px_40px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.25)]">
            {mobileNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center p-1.5 rounded-full transition-all duration-200 ${
                      isActive
                        ? 'text-white font-bold scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                        : 'text-gray-400 hover:text-gray-200'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[9px] mt-0.5">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        )}
      </div>

      {/* Global Modals */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </div>
  );
};
