import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowUp, ArrowDown, TrendingUp, Eye, FileText, Users, Target } from 'lucide-react';

export function DashboardHome() {
  const stats = [
    { label: 'Profile Views', value: '2,847', change: '+12.5%', trend: 'up', icon: Eye },
    { label: 'Blog Posts', value: '34', change: '+3', trend: 'up', icon: FileText },
    { label: 'Subscribers', value: '1,249', change: '+18.2%', trend: 'up', icon: Users },
    { label: 'Avg. Rank', value: '4.2', change: '-0.8', trend: 'down', icon: Target },
  ];

  const recentActivity = [
    { action: 'New blog post published', title: 'SEO Best Practices 2025', time: '2 hours ago' },
    { action: 'Rank improved', title: 'Keyword: "digital marketing"', time: '5 hours ago' },
    { action: 'New subscriber', title: 'john@example.com joined', time: '1 day ago' },
    { action: 'Profile updated', title: 'Bio and links modified', time: '2 days ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">Welcome back!</h1>
        <p className="text-gray-600">Manage your SEO presence and grow your online authority</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {stat.change}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl text-gray-900">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Intelligence Center */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <CardTitle>AI Intelligence Center</CardTitle>
            </div>
            <CardDescription>Supercharge your SEO with AI-powered insights and assistance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
                <h3 className="text-gray-900 mb-2">AI Assistant</h3>
                <p className="text-sm text-gray-600 mb-4">Your intelligent SEO & Knowledge Graph companion</p>
                <div className="p-3 bg-white rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700">Hi! I'm your AI SEO assistant. I can help you optimize your content, improve rankings, and build your knowledge graph. How can I help you today?</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-gray-900 mb-2">AI Insights</h3>
                <p className="text-sm text-gray-600 mb-4">Intelligent recommendations to boost your SEO</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-1.5"></div>
                    <p className="text-sm text-gray-700">Optimize 3 blog posts for better keyword density</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-1.5"></div>
                    <p className="text-sm text-gray-700">Add schema markup to your profile page</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-1.5"></div>
                    <p className="text-sm text-gray-700">Create backlinks from 5 authority sites</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
