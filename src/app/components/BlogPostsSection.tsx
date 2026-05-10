import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { BookOpen, Plus, Calendar, Eye, TrendingUp } from 'lucide-react';

export function BlogPostsSection() {
  const posts = [
    { 
      title: 'SEO Best Practices for 2025', 
      status: 'Published', 
      date: 'Oct 28, 2024', 
      views: '1,234',
      engagement: '8.5%'
    },
    { 
      title: '10 Tips for Better Keyword Research', 
      status: 'Published', 
      date: 'Oct 25, 2024', 
      views: '892',
      engagement: '6.2%'
    },
    { 
      title: 'Building Authority with Content', 
      status: 'Draft', 
      date: 'Oct 30, 2024', 
      views: '-',
      engagement: '-'
    },
    { 
      title: 'Link Building Strategies That Work', 
      status: 'Published', 
      date: 'Oct 20, 2024', 
      views: '2,156',
      engagement: '12.3%'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Blog Posts</h1>
          <p className="text-gray-600">Publish SEO-friendly blog posts with newsletters</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-sm text-gray-600">Total Posts</span>
            </div>
            <p className="text-3xl text-gray-900 mb-1">34</p>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              3 this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-600">Total Views</span>
            </div>
            <p className="text-3xl text-gray-900 mb-1">45.2K</p>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +18.5% this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">Avg. Engagement</span>
            </div>
            <p className="text-3xl text-gray-900 mb-1">9.2%</p>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +2.3% this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>Manage and track your blog content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/50 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{post.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      {post.views !== '-' && (
                        <>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {post.views} views
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            {post.engagement} engagement
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    post.status === 'Published' 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-yellow-50 text-yellow-700'
                  }`}>
                    {post.status}
                  </span>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SEO Tips */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Writing Tips</CardTitle>
          <CardDescription>Improve your blog post rankings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-gray-900 mb-2">Keyword Optimization</h3>
              <p className="text-sm text-gray-600">Include target keywords naturally in your title, headings, and first 100 words</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="text-gray-900 mb-2">Internal Linking</h3>
              <p className="text-sm text-gray-600">Link to 2-3 relevant posts to improve site structure and keep readers engaged</p>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg">
              <h3 className="text-gray-900 mb-2">Meta Description</h3>
              <p className="text-sm text-gray-600">Write compelling 150-160 character descriptions to improve click-through rates</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
