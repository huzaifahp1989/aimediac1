import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Trophy, TrendingUp, User } from 'lucide-react'
import { usePointsStore } from '../../stores/pointsStore'

export function PointsLeaderboard() {
  const { totalPoints, leaderboard } = usePointsStore()
  
  // Mock leaderboard data
  const mockLeaderboard = [
    { id: '1', username: 'Ahmad_Muslim', points: 2450, rank: 1 },
    { id: '2', username: 'Fatima_123', points: 2380, rank: 2 },
    { id: '3', username: 'Omar_AlFarooq', points: 2150, rank: 3 },
    { id: '4', username: 'Aisha_Siddiqa', points: 1980, rank: 4 },
    { id: '5', username: 'Ali_Murtaza', points: 1850, rank: 5 },
  ]

  return (
    <Card className="border-islamic-gold-200 bg-gradient-to-br from-islamic-gold-50 to-white">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-islamic-blue-900">
          <Trophy className="w-5 h-5 mr-2 text-islamic-gold-500" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Your Points */}
        <div className="bg-gradient-to-r from-islamic-gold-100 to-islamic-gold-50 rounded-lg p-4 border border-islamic-gold-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-islamic-blue-700">Your Points</p>
              <p className="text-2xl font-bold text-islamic-blue-900">{totalPoints}</p>
            </div>
            <TrendingUp className="w-6 h-6 text-islamic-gold-500" />
          </div>
        </div>
        
        {/* Top Users */}
        <div className="space-y-2">
          <h4 className="font-semibold text-islamic-blue-900 text-sm">Top Contributors</h4>
          {mockLeaderboard.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-islamic-blue-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  user.rank === 1 ? 'bg-islamic-gold-500 text-white' :
                  user.rank === 2 ? 'bg-gray-400 text-white' :
                  user.rank === 3 ? 'bg-amber-600 text-white' :
                  'bg-islamic-blue-100 text-islamic-blue-700'
                }`}>
                  {user.rank}
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-islamic-blue-500" />
                  <span className="text-sm font-medium text-islamic-blue-900">{user.username}</span>
                </div>
              </div>
              <span className="text-sm font-semibold text-islamic-blue-700">{user.points}</span>
            </div>
          ))}
        </div>
        
        {/* View Full Leaderboard */}
        <button className="w-full bg-islamic-blue-600 hover:bg-islamic-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
          View Full Leaderboard
        </button>
      </CardContent>
    </Card>
  )
}