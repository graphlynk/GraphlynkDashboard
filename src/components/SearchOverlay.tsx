import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, TrendingUp, Clock, Sparkles, ArrowRight } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'google' | 'profiles' | 'help'>('profiles');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const recentSearches = [
    { query: 'knowledge graph optimization', type: 'keyword', time: '2h ago' },
    { query: 'schema markup best practices', type: 'help', time: '5h ago' },
    { query: 'competitor analysis', type: 'google', time: '1d ago' },
  ];

  const trendingTopics = [
    { title: 'Entity SEO', trend: '+24%', icon: TrendingUp },
    { title: 'LLM Optimization', trend: '+18%', icon: Sparkles },
    { title: 'Core Web Vitals', trend: '+12%', icon: Clock },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Smart Mirror Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.4, type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl z-50 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mirror Surface Container */}
            <div className="mirror-surface rounded-3xl p-[2px] shimmer">
              <div className="glass-card dark:glass-card rounded-3xl overflow-hidden depth-shadow-lg">
                
                {/* Search Header */}
                <div className="p-8 pb-6 border-b border-white/10 dark:border-white/5">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0b3d84] to-[#6EE7F5] rounded-2xl flex items-center justify-center glow-primary">
                      <Search className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search anything in GraphLynk..."
                        autoFocus
                        className="w-full bg-transparent text-2xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none"
                      />
                    </div>
                    <button
                      onClick={onClose}
                      className="w-10 h-10 bg-white/5 dark:bg-white/10 hover:bg-white/10 dark:hover:bg-white/20 rounded-xl transition-all duration-300 flex items-center justify-center group"
                    >
                      <X className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                    </button>
                  </div>

                  {/* Search Mode Tabs */}
                  <div className="flex gap-3">
                    {[
                      { id: 'google', label: 'Google Search', gradient: 'from-blue-500 to-purple-500' },
                      { id: 'profiles', label: 'Profiles & Data', gradient: 'from-[#0b3d84] to-cyan-500' },
                      { id: 'help', label: 'Help & Docs', gradient: 'from-emerald-500 to-teal-500' },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setSearchMode(mode.id as typeof searchMode)}
                        className={`px-6 py-2.5 rounded-xl transition-all duration-300 ${
                          searchMode === mode.id
                            ? `bg-gradient-to-r ${mode.gradient} text-white shadow-lg glow-primary`
                            : 'bg-white/5 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-white/10 dark:hover:bg-white/10'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Content */}
                <div className="p-8 max-h-96 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Recent Searches */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-[#0b3d84]" />
                        <h3 className="text-sm text-gray-700 dark:text-gray-300">Recent Searches</h3>
                      </div>
                      <div className="space-y-2">
                        {recentSearches.map((item, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="w-full flex items-center justify-between p-4 bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 rounded-xl transition-all duration-300 group"
                          >
                            <div className="flex-1 text-left">
                              <p className="text-sm text-gray-900 dark:text-white">{item.query}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                {item.type} · {item.time}
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-600 group-hover:text-[#0b3d84] group-hover:translate-x-1 transition-all" />
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Trending Topics */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-4 h-4 text-[#6EE7F5]" />
                        <h3 className="text-sm text-gray-700 dark:text-gray-300">Trending Now</h3>
                      </div>
                      <div className="space-y-2">
                        {trendingTopics.map((topic, index) => {
                          const Icon = topic.icon;
                          return (
                            <motion.button
                              key={index}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-[#0b3d84]/10 to-transparent hover:from-[#0b3d84]/20 rounded-xl transition-all duration-300 group border border-transparent hover:border-[#0b3d84]/30"
                            >
                              <div className="w-10 h-10 bg-gradient-to-br from-[#0b3d84] to-[#6EE7F5] rounded-lg flex items-center justify-center">
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 text-left">
                                <p className="text-sm text-gray-900 dark:text-white">{topic.title}</p>
                                <p className="text-xs text-emerald-500 mt-1">
                                  {topic.trend} this week
                                </p>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Quick Tip */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl"
                  >
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-purple-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <span className="text-purple-400">Pro Tip:</span> Use keyboard shortcuts: 
                          <kbd className="ml-2 px-2 py-1 bg-white/20 dark:bg-white/10 rounded text-xs">⌘K</kbd> to search, 
                          <kbd className="ml-2 px-2 py-1 bg-white/20 dark:bg-white/10 rounded text-xs">ESC</kbd> to close
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
