import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Search, TrendingUp, TrendingDown, Plus } from 'lucide-react';

export function SearchTrackingSection() {
  const keywords = [
    { keyword: 'SEO optimization', rank: 3, change: 2, trend: 'up', volume: '12.5K', difficulty: 'Medium' },
    { keyword: 'digital marketing tips', rank: 7, change: -1, trend: 'down', volume: '8.2K', difficulty: 'High' },
    { keyword: 'content strategy', rank: 5, change: 3, trend: 'up', volume: '15.8K', difficulty: 'Low' },
    { keyword: 'link building', rank: 12, change: 0, trend: 'neutral', volume: '6.4K', difficulty: 'High' },
    { keyword: 'keyword research', rank: 4, change: 1, trend: 'up', volume: '9.7K', difficulty: 'Medium' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Search Tracking</h1>
          <p className="text-gray-600">Monitor Google rankings and analyze search performance</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Keyword
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">Improved</span>
            </div>
            <p className="text-3xl text-gray-900">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-sm text-gray-600">Declined</span>
            </div>
            <p className="text-3xl text-gray-900">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-sm text-gray-600">Avg. Position</span>
            </div>
            <p className="text-3xl text-gray-900">6.2</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-600">Total Keywords</span>
            </div>
            <p className="text-3xl text-gray-900">28</p>
          </CardContent>
        </Card>
      </div>

      {/* Keywords Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tracked Keywords</CardTitle>
          <CardDescription>Monitor your keyword rankings and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Keyword</th>
                  <th className="text-center py-3 px-4 text-sm text-gray-600">Current Rank</th>
                  <th className="text-center py-3 px-4 text-sm text-gray-600">Change</th>
                  <th className="text-center py-3 px-4 text-sm text-gray-600">Search Volume</th>
                  <th className="text-center py-3 px-4 text-sm text-gray-600">Difficulty</th>
                  <th className="text-center py-3 px-4 text-sm text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {keywords.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{item.keyword}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg">
                        {item.rank}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {item.trend === 'up' && (
                          <>
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-600">+{item.change}</span>
                          </>
                        )}
                        {item.trend === 'down' && (
                          <>
                            <TrendingDown className="w-4 h-4 text-red-600" />
                            <span className="text-sm text-red-600">{item.change}</span>
                          </>
                        )}
                        {item.trend === 'neutral' && (
                          <span className="text-sm text-gray-500">-</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-900">{item.volume}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                        item.difficulty === 'Low' ? 'bg-green-50 text-green-700' :
                        item.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-red-50 text-red-700'
                      }`}>
                        {item.difficulty}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Button variant="ghost" size="sm">View Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
