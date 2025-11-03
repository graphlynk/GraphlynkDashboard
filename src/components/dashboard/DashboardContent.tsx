import { Tier } from '../../App';
import { KPIStrip } from './KPIStrip';
import { ThisWeekPanel } from './ThisWeekPanel';
import { AlertsPanel } from './AlertsPanel';
import { QuickActions } from './QuickActions';
import { TrendingPanel } from './TrendingPanel';
import { SuggestedTopics } from '../blog/SuggestedTopics';

interface DashboardContentProps {
  tier: Tier;
}

export function DashboardContent({ tier }: DashboardContentProps) {
  return (
    <div className="p-10 space-y-8">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 dark:text-white mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-[#98A2B3] font-normal">YOUR SEO & VISIBILITY OVERVIEW</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse glow-accent"></div>
          Live Data
        </div>
      </div>

      {/* KPI Strip */}
      <KPIStrip tier={tier} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* This Week */}
        <div className="lg:col-span-2">
          <ThisWeekPanel tier={tier} />
        </div>

        {/* Quick Actions */}
        <div>
          <QuickActions tier={tier} />
        </div>
      </div>

      {/* Alerts & Trending */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AlertsPanel tier={tier} />
        <TrendingPanel tier={tier} />
      </div>

      {/* Suggested Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Placeholder for future content */}
        </div>
        <div>
          <SuggestedTopics tier={tier} />
        </div>
      </div>
    </div>
  );
}
