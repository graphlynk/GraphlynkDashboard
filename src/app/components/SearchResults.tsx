import { User, ExternalLink, Loader2 } from 'lucide-react';

interface SearchResultsProps {
  mode: 'profiles' | 'web';
  query: string;
  isLoading: boolean;
  onClose: () => void;
}

// Mock data for demonstration
const mockProfiles = [
  {
    id: 1,
    name: 'John Smith',
    handle: '@johnsmith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    meta: 'Software Engineer • San Francisco',
    verified: true,
  },
  {
    id: 2,
    name: 'Jane Doe',
    handle: '@janedoe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    meta: 'Product Designer • New York',
    verified: false,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    handle: '@mikej',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    meta: 'Marketing Director • London',
    verified: true,
  },
];

const mockWebResults = [
  {
    id: 1,
    title: 'GraphLynk - Knowledge Graph Platform',
    url: 'https://graphlynk.com',
    snippet: 'Build and manage your knowledge graph with GraphLynk. Connect data, discover insights, and share knowledge seamlessly.',
    favicon: '🌐',
  },
  {
    id: 2,
    title: 'Getting Started with Knowledge Graphs',
    url: 'https://example.com/guide',
    snippet: 'A comprehensive guide to understanding and implementing knowledge graphs in your organization.',
    favicon: '📚',
  },
  {
    id: 3,
    title: 'Wikidata - The Free Knowledge Base',
    url: 'https://wikidata.org',
    snippet: 'Wikidata is a free and open knowledge base that can be read and edited by both humans and machines.',
    favicon: '📊',
  },
];

export function SearchResults({ mode, query, isLoading, onClose }: SearchResultsProps) {
  const highlightMatch = (text: string, searchQuery: string) => {
    if (!searchQuery) return <>{text}</>;
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === searchQuery.toLowerCase() ? (
            <mark key={i} className="bg-yellow-400/30 text-white">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-xl shadow-2xl max-h-96 overflow-y-auto">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 text-white/60 animate-spin" />
          <span className="ml-3 text-white">Searching...</span>
        </div>
      </div>
    );
  }

  if (mode === 'profiles') {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-xl shadow-2xl max-h-96 overflow-y-auto">
        <div className="p-2">
          <div className="px-3 py-2 text-xs text-white/60 border-b border-white/10">
            Found {mockProfiles.length} profiles
          </div>
          {mockProfiles.map((profile) => (
            <button
              key={profile.id}
              className="w-full flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl transition-colors text-left focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-10 h-10 rounded-full bg-white/10"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-white">
                    {highlightMatch(profile.name, query)}
                  </p>
                  {profile.verified && (
                    <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  )}
                </div>
                <p className="text-sm text-white/70">
                  {highlightMatch(profile.handle, query)}
                </p>
                <p className="text-xs text-white/50 truncate">{profile.meta}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Web results (Wikidata-style)
  return (
    <div className="absolute top-full left-0 right-0 mt-2 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-xl shadow-2xl max-h-96 overflow-y-auto">
      <div className="p-2">
        <div className="px-3 py-2 text-xs text-white/60 border-b border-white/10">
          About {mockWebResults.length} results
        </div>
        {mockWebResults.map((result) => (
          <a
            key={result.id}
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 hover:bg-white/10 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">{result.favicon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-blue-300 hover:underline">
                    {highlightMatch(result.title, query)}
                  </h3>
                  <ExternalLink className="w-3 h-3 text-white/40" />
                </div>
                <p className="text-xs text-green-300 truncate mt-0.5">{result.url}</p>
                <p className="text-sm text-white/70 mt-1 line-clamp-2">
                  {highlightMatch(result.snippet, query)}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
