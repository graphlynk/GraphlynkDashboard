import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Mail, Plus, TrendingUp, Users, Send } from 'lucide-react';

export function MailingListSection() {
  const campaigns = [
    { name: 'November Newsletter', sent: '1,249', opened: '687', clicked: '234', date: 'Nov 1, 2024' },
    { name: 'SEO Tips Weekly', sent: '1,249', opened: '592', clicked: '189', date: 'Oct 28, 2024' },
    { name: 'Product Update', sent: '1,249', opened: '812', clicked: '356', date: 'Oct 24, 2024' },
  ];

  const recentSubscribers = [
    { email: 'john.doe@example.com', date: '2 hours ago', source: 'Blog Post' },
    { email: 'jane.smith@example.com', date: '5 hours ago', source: 'Landing Page' },
    { email: 'mike.wilson@example.com', date: '1 day ago', source: 'Social Media' },
    { email: 'sarah.jones@example.com', date: '1 day ago', source: 'Blog Post' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Mailing List</h1>
          <p className="text-gray-600">Build and engage your email subscriber base</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-sm text-gray-600">Total Subscribers</span>
            </div>
            <p className="text-3xl text-gray-900 mb-1">1,249</p>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +18.2% this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Send className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-600">Campaigns Sent</span>
            </div>
            <p className="text-3xl text-gray-900 mb-1">23</p>
            <p className="text-sm text-gray-600">3 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">Open Rate</span>
            </div>
            <p className="text-3xl text-gray-900 mb-1">55.2%</p>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +3.4% vs last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-pink-600" />
              </div>
              <span className="text-sm text-gray-600">Click Rate</span>
            </div>
            <p className="text-3xl text-gray-900 mb-1">18.7%</p>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +1.2% vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Campaigns & Subscribers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Campaigns</CardTitle>
            <CardDescription>Your latest email campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
                  <h3 className="text-gray-900 mb-3">{campaign.name}</h3>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">Sent</p>
                      <p className="text-gray-900">{campaign.sent}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Opened</p>
                      <p className="text-gray-900">{campaign.opened}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Clicked</p>
                      <p className="text-gray-900">{campaign.clicked}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">{campaign.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Subscribers</CardTitle>
            <CardDescription>New people joining your list</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSubscribers.map((subscriber, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{subscriber.email}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                      <span>{subscriber.date}</span>
                      <span>•</span>
                      <span>{subscriber.source}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle>Email Best Practices</CardTitle>
          <CardDescription>Tips to improve your email campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-gray-900 mb-2">Subject Lines</h3>
              <p className="text-sm text-gray-600">Keep subject lines under 50 characters and personalize when possible</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="text-gray-900 mb-2">Send Time</h3>
              <p className="text-sm text-gray-600">Best open rates typically occur Tuesday-Thursday, 10am-11am</p>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg">
              <h3 className="text-gray-900 mb-2">Call to Action</h3>
              <p className="text-sm text-gray-600">Include one clear CTA per email to improve click-through rates</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
