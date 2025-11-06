import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardContent } from './components/dashboard/DashboardContent';
import { SearchContent } from './components/search/SearchContent';
import { KeywordsContent } from './components/keywords/KeywordsContent';
import { IndexationContent } from './components/indexation/IndexationContent';
import { SchemaContent } from './components/schema/SchemaContent';
import { LLMContent } from './components/llm/LLMContent';
import { ProfileContent } from './components/profile/ProfileContent';
import { BlogContent } from './components/blog/BlogContent';
import { ProductsContent } from './components/products/ProductsContent';
import { PricingContent } from './components/pricing/PricingContent';
import { MessagesContent } from './components/messages/MessagesContent';
import { HelpContent } from './components/help/HelpContent';
import { SettingsContent } from './components/settings/SettingsContent';

export type TabId = 
  | 'dashboard' 
  | 'search' 
  | 'keywords' 
  | 'indexation' 
  | 'schema' 
  | 'llm' 
  | 'profile'
  | 'blog' 
  | 'products' 
  | 'pricing' 
  | 'messages' 
  | 'help'
  | 'settings';

export type Tier = 'free' | 'premium' | 'platinum';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [tier, setTier] = useState<Tier>('free'); // Can be changed via pricing page

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent tier={tier} />;
      case 'search':
        return <SearchContent tier={tier} />;
      case 'keywords':
        return <KeywordsContent tier={tier} />;
      case 'indexation':
        return <IndexationContent tier={tier} />;
      case 'schema':
        return <SchemaContent tier={tier} />;
      case 'llm':
        return <LLMContent tier={tier} />;
      case 'profile':
        return <ProfileContent tier={tier} />;
      case 'blog':
        return <BlogContent tier={tier} />;
      case 'products':
        return <ProductsContent tier={tier} />;
      case 'pricing':
        return <PricingContent tier={tier} onTierChange={setTier} />;
      case 'messages':
        return <MessagesContent tier={tier} />;
      case 'help':
        return <HelpContent tier={tier} />;
      case 'settings':
        return <SettingsContent tier={tier} />;
      default:
        return <DashboardContent tier={tier} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-[#0B0D10] overflow-hidden relative">
        {/* Subtle Ambient Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0b3d84]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#6EE7F5]/20 rounded-full blur-3xl"></div>
        </div>

        {/* Sidebar */}
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} tier={tier} />
        
        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden relative z-10">
          {/* Header with search */}
          <Header tier={tier} />
          
          {/* Tab content */}
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#0B0D10]">
            {renderContent()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
