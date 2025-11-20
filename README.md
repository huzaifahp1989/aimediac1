# Islam Media Central

A comprehensive Islamic media website combining Quran, Hadith, Kids Activities, Radio, Podcasts, Articles, Competitions, User Accounts, Points System, Leaderboard, and Child Progress Tracker.

## 🌟 Features

### Core Features
- **📖 Quran Section**: 13-line Arabic text with English & Urdu translations, Tafsir, search, and bookmarks
- **📚 Hadith Library**: Complete Hadith collections with search functionality
- **🎙️ Islamic Radio**: 24/7 live streaming with prayer times and Islamic content
- **👶 Kids Zone**: Safe, educational games, stories, quizzes, and activities
- **📰 Articles**: Islamic articles with categories and SEO optimization
- **🎧 Podcasts**: YouTube/RSS integration for Islamic content
- **🏆 Competitions**: Gaza fundraising, challenges, and monthly prizes
- **💝 Donation**: External charity partner integration
- **❓ Q&A Section**: User questions and admin responses
- **🕐 Prayer Times**: Auto-detect location with accurate prayer times
- **📅 Events**: Community announcements and online classes

### Advanced Features
- **📊 Points & Rewards System**: Earn points for activities, live leaderboards
- **👨‍👩‍👧 Child Progress Tracker**: Salah tracker, Surah memorization, behavior rewards
- **👤 User Accounts**: Registration, login, profiles, bookmarks, quiz results
- **📱 PWA Support**: Installable on Android & iPhone with offline functionality
- **🔔 Push Notifications**: Real-time updates and reminders
- **🌍 Multi-language**: Arabic, English, and Urdu support

## 🚀 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling with custom Islamic theme
- **Zustand** for state management
- **React Router** for navigation
- **Lucide React** for icons

### Backend & Database
- **Supabase** (PostgreSQL) for database and authentication
- **Supabase Auth** for user management (email, Google, Apple)
- **Supabase Storage** for file uploads
- **Supabase Realtime** for live updates

### PWA & Offline Support
- **Vite PWA Plugin** for Progressive Web App functionality
- **Workbox** for service worker and caching
- Offline support for Quran text and prayer times

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/islam-media-central.git
cd islam-media-central
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Add your Supabase credentials to `.env`:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Start the development server:
```bash
pnpm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Islamic Design Principles

### Color Scheme
- **Islamic Blue**: `#0284c7` - Primary color representing trust and spirituality
- **Islamic Gold**: `#f59e0b` - Secondary color for highlights and accents
- **Islamic Green**: `#16a34a` - Tertiary color representing growth and prosperity

### Typography
- **Inter**: Modern sans-serif for English content
- **Noto Naskh Arabic**: Traditional Arabic script for Quranic text

### Visual Elements
- Mosque silhouettes and Islamic patterns
- World map wave design in headers
- Rounded cards and modern UI components
- Mobile-first responsive design

## 📱 PWA Installation

The website can be installed as a Progressive Web App on mobile devices:

1. **Android**: Open in Chrome → Menu → "Add to Home Screen"
2. **iPhone**: Open in Safari → Share → "Add to Home Screen"
3. **Desktop**: Look for install prompt in supported browsers

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Set up authentication providers (Email, Google, Apple)
3. Create database tables based on the schema in technical documentation
4. Configure Row Level Security (RLS) policies
5. Set up storage buckets for file uploads

### Salah Timetable & Masjid Finder (Firebase)
The salah timetable experience is powered by Firebase Firestore and Storage. Configure it with the following structure:

**Firestore collections**
```
cities (collection)
  [cityId] (document)
    name: string
    region: string
    country: string

    masjids (subcollection)
      [masjidId] (document)
        name: string
        address: string
        website: string
        fajr: string
        zuhr: string
        asr: string
        maghrib: string
        isha: string
        jummah_1: string
        jummah_2: string
        timetable_pdf_url: string
```

**Firebase Storage path**
```
/timetables/{city}/{masjid}.pdf
```

**Environment variables**

Copy `.env.example` to `.env` and fill in your Firebase project keys:
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

With the env keys set, the app will:
- List cities (sorted) on `/prayer-times`
- List masjids with search, favourites, directions, and pull-to-refresh on `/prayer-times/:cityId`
- Show salah times and timetable PDF/image on `/prayer-times/:cityId/:masjidId`
- Allow admin uploads on the hidden `/admin/timetables` route (uploads timetable PDFs/images to the Storage path above and stores the URL in Firestore).

### Prayer Times
The app uses fallback prayer times for London, UK to ensure reliable functionality without external API dependencies.

### Islamic Radio Stream
Live radio streaming from:
```
https://a4.asurahosting.com:7820/radio.mp3
```

## 🗄️ Database Schema

### Users Table
- User profiles and authentication
- Points and achievements tracking
- Social login integration

### Quran Progress
- Bookmarked verses
- Reading history
- Memorization tracking

### Quiz Results
- User quiz scores
- Progress tracking
- Leaderboard data

### Child Progress
- Salah tracking
- Surah memorization
- Behavior rewards
- Parent dashboard data

## 🔒 Security Features

- JWT authentication with Supabase
- Row Level Security (RLS) policies
- Input validation and sanitization
- Rate limiting on public endpoints
- Secure file upload handling
- CORS configuration

## 📊 Performance Optimizations

- Lazy loading for heavy components
- Image optimization and WebP format
- Service worker for offline functionality
- CDN for static assets
- Database indexing for fast queries
- Code splitting with React.lazy

## 🧪 Testing

Run the test suite:
```bash
# Type checking
pnpm run check

# Linting
pnpm run lint

# Build test
pnpm run build
```

## 🚀 Deployment

### GitHub Pages (Recommended)
1. Build the project: `pnpm run build`
2. Deploy the `dist` folder to GitHub Pages
3. Configure base path in `vite.config.ts` if needed

### Netlify
1. Connect to your Git repository
2. Set build command: `pnpm run build`
3. Set publish directory: `dist`
4. Configure environment variables

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Quran text and translations from [Tanzil.net](https://tanzil.net)
- Hadith collections from [Sunnah.com](https://sunnah.com)
- Prayer times from [AlAdhan API](https://aladhan.com/prayer-times-api)
- Islamic radio stream from [MaxxWave](https://maxxwave.co.uk)

## 📞 Support

For support and questions:
- Email: info@imediac.com
- Website: [www.imediac.com](https://www.imediac.com)
- Kids Platform: [www.imediackids.com](https://www.imediackids.com)

---

**May Allah accept this effort and make it beneficial for the Muslim Ummah.**

اللهم تقبل منا إنك أنت السميع العليم
