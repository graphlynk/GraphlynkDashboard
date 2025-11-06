import { useState, useEffect } from 'react';
import { Search, Bell, Moon, Sun, Sparkles, HelpCircle, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Tier } from '../App';
import { SearchOverlay } from './search/SearchOverlay';

interface HeaderProps {
  tier: Tier;
}

export function Header({ tier }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  
  // Keyboard shortcut for search (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearchOverlay(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <SearchOverlay isOpen={showSearchOverlay} onClose={() => setShowSearchOverlay(false)} />
      
      <header className="bg-white dark:bg-[#12161A] border-b border-gray-200 dark:border-white/10 px-8 py-4 shadow-sm">
      <div className="flex items-center gap-6">
        {/* Search Trigger */}
        <div className="flex-1 max-w-2xl">
          <button
            onClick={() => setShowSearchOverlay(true)}
            className="w-full group relative"
          >
            <div className="flex items-center gap-4 px-6 py-4 glass-card-light dark:glass-card rounded-2xl hover:shadow-lg transition-all duration-200 border border-transparent hover:border-[#0b3d84]/30">
              <Search className="w-5 h-5 text-gray-400 dark:text-[#98A2B3] group-hover:text-[#0b3d84] transition-colors" />
              <span className="flex-1 text-left text-[rgb(0,0,0)] dark:text-[#98A2B3] group-hover:text-gray-700 dark:group-hover:text-white transition-colors">
                Search GraphLynk...
              </span>

            </div>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="relative p-3 glass-card-light dark:glass-card rounded-xl hover:shadow-md transition-all duration-200 group"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-gray-700 dark:text-[#E6E9EE] group-hover:text-[#0b3d84] dark:group-hover:text-[#6EE7F5] transition-colors" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700 dark:text-[#E6E9EE] group-hover:text-[#0b3d84] dark:group-hover:text-[#6EE7F5] transition-colors" />
            )}
          </button>

          {/* Help */}
          <button className="relative p-3 glass-card-light dark:glass-card rounded-xl hover:shadow-md transition-all duration-200 group">
            <HelpCircle className="w-5 h-5 text-gray-700 dark:text-[#E6E9EE] group-hover:text-[#0b3d84] dark:group-hover:text-[#6EE7F5] transition-colors" />
          </button>

          {/* Notifications */}
          <button className="relative p-3 glass-card-light dark:glass-card rounded-xl hover:shadow-md transition-all duration-200 group text-[rgb(0,0,0)]">
            <Bell className="w-5 h-5 text-gray-700 dark:text-[#E6E9EE] group-hover:text-[#0b3d84] dark:group-hover:text-[#6EE7F5] transition-colors" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>

          {/* User Profile */}
          <button className="relative p-3 glass-card-light dark:glass-card rounded-xl hover:shadow-md transition-all duration-200 group text-[rgb(0,0,0)]">
            <User className="w-5 h-5 text-gray-700 dark:text-[#E6E9EE] group-hover:text-[#0b3d84] dark:group-hover:text-[#6EE7F5] transition-colors" />
          </button>
        </div>
      </div>
    </header>
    </>
  );
}
