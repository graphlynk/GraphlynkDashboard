import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Settings, Bell, Lock, CreditCard, Globe } from 'lucide-react';

export function SettingsSection() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Update your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Email Address</label>
              <input 
                type="email" 
                defaultValue="demo@graphauthority.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Username</label>
              <input 
                type="text" 
                defaultValue="demograph"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-gray-600" />
            <CardTitle>Security</CardTitle>
          </div>
          <CardDescription>Manage your password and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-gray-700 mb-2 block">Current Password</label>
            <input 
              type="password" 
              placeholder="Enter current password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">New Password</label>
              <input 
                type="password" 
                placeholder="Enter new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Confirm Password</label>
              <input 
                type="password" 
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <Button>Update Password</Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-600" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>Choose what notifications you receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-gray-900 mb-1">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive updates via email</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 rounded" />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-gray-900 mb-1">Ranking Alerts</p>
              <p className="text-sm text-gray-600">Get notified when your rankings change</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 rounded" />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-gray-900 mb-1">Weekly Reports</p>
              <p className="text-sm text-gray-600">Receive weekly performance summaries</p>
            </div>
            <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
          </div>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-gray-600" />
            <CardTitle>Subscription</CardTitle>
          </div>
          <CardDescription>Manage your billing and plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-100 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-gray-900 mb-1">AUTHORITY Plan</h3>
                <p className="text-sm text-gray-600">$49/month • Renews on Dec 1, 2024</p>
              </div>
              <span className="px-3 py-1 bg-indigo-600 text-white rounded-full text-sm">Active</span>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                <span>Unlimited profile views</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                <span>Advanced analytics</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                <span>AI-powered insights</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">Change Plan</Button>
              <Button variant="ghost" className="flex-1">Cancel Subscription</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-600" />
            <CardTitle>Preferences</CardTitle>
          </div>
          <CardDescription>Customize your experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-gray-700 mb-2 block">Language</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-700 mb-2 block">Timezone</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <option>Pacific Time (PT)</option>
              <option>Eastern Time (ET)</option>
              <option>Central Time (CT)</option>
              <option>Mountain Time (MT)</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
