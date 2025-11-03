import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { BarChart3, TrendingUp, Users, MousePointer } from 'lucide-react';

export function AnalyticsSection() {
  const trafficSources = [
    { source: 'Organic Search', visitors: '12,458', percentage: 45, color: 'bg-indigo-500' },
    { source: 'Direct', visitors: '6,234', percentage: 23, color: 'bg-purple-500' },
    { source: 'Social Media', visitors: '4,892', percentage: 18, color: 'bg-pink-500' },
    { source: 'Referral', visitors: '3,876', percentage: 14, color: 'bg-blue-500' },
  ];

  const topPages = [
    { page: '/blog/seo-best-practices', views: 3245, bounce: '32%' },
    { page: '/profile', views: 2891, bounce: '28%' },
    { page: '/blog/keyword-research', views: 2456, bounce: '35%' },
    { page: '/blog/link-building', views: 1987, bounce: '41%' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-600">Track your website performance and visitor insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-sm text-gray-600">Total Visitors</span>
            </div>
            <p className="text-3xl text-gray-900 mb-1">27,460</p>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12.5% vs last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <MousePointer className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-600">Page Views</span>
            </div>
            <p className="text-3xl text-gray-900 mb-1">45,823</p>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +8.3% vs last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">Avg. Session</span>
            </div>
            <p className="text-3xl text-gray-900 mb-1">3m 42s</p>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +15.2% vs last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-pink-600" />
              </div>
              <span className="text-sm text-gray-600">Bounce Rate</span>
            </div>
            <p className="text-3xl text-gray-900 mb-1">34.2%</p>
            <p className="text-sm text-red-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +2.1% vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Sources & Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {trafficSources.map((source, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700">{source.source}</span>
                    <span className="text-sm text-gray-900">{source.visitors}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${source.color}`}
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{source.percentage}% of total</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most visited pages this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 mb-1">{page.page}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>{page.views.toLocaleString()} views</span>
                      <span>{page.bounce} bounce rate</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visitor Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Visitor Trends</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-2">
            {[...Array(30)].map((_, i) => {
              const height = Math.random() * 100;
              return (
                <div key={i} className="flex-1 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${height}%` }}></div>
              );
            })}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500">
            <span>30 days ago</span>
            <span>Today</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
