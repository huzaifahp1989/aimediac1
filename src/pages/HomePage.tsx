import { Layout } from '../components/layout/Layout'
import { HeroSection } from '../components/features/HeroSection'
import { QuickActions } from '../components/features/QuickActions'
import { NewsTicker } from '../components/features/NewsTicker'
import { LatestContent } from '../components/features/LatestContent'
import { PointsLeaderboard } from '../components/features/PointsLeaderboard'
import { PrayerTimesWidget } from '../components/features/PrayerTimesWidget'

export function HomePage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <HeroSection />
        
        {/* News Ticker */}
        <NewsTicker />
        
        {/* Quick Actions */}
        <QuickActions />
        
        {/* Main Content Grid */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Latest Content */}
            <div className="lg:col-span-2">
              <LatestContent />
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <PrayerTimesWidget />
              <PointsLeaderboard />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}