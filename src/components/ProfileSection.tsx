import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Link, Globe, MapPin, Calendar } from 'lucide-react';

export function ProfileSection() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Create and customize your SEO-optimized link-in-bio page</p>
        </div>
        <Button>
          <Link className="w-4 h-4 mr-2" />
          View Public Profile
        </Button>
      </div>

      {/* Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal information and bio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center shrink-0">
                <span className="text-3xl text-white">DG</span>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">Display Name</label>
                  <input 
                    type="text" 
                    defaultValue="Demo Graph Authority"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">Bio</label>
                  <textarea 
                    rows={4}
                    defaultValue="SEO Expert & Digital Marketing Specialist. Helping businesses grow their online presence through strategic content and authority building."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Website</label>
                <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <input 
                    type="text" 
                    defaultValue="graphauthority.com"
                    className="flex-1 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Location</label>
                <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <input 
                    type="text" 
                    defaultValue="San Francisco, CA"
                    className="flex-1 outline-none"
                  />
                </div>
              </div>
            </div>

            <Button className="w-full md:w-auto">Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile Stats</CardTitle>
            <CardDescription>Your profile performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Profile Completion</span>
                <span className="text-sm text-gray-900">85%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-gradient-to-r from-indigo-500 to-purple-600"></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Total Views</span>
                <span className="text-gray-900">2,847</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Link Clicks</span>
                <span className="text-gray-900">1,456</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Engagement Rate</span>
                <span className="text-gray-900">51.2%</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Joined November 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Links Section */}
      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
          <CardDescription>Add your social media profiles and important links</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Twitter/X', 'LinkedIn', 'GitHub', 'YouTube'].map((platform) => (
              <div key={platform}>
                <label className="text-sm text-gray-700 mb-2 block">{platform}</label>
                <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg">
                  <Link className="w-4 h-4 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder={`Your ${platform} URL`}
                    className="flex-1 outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
