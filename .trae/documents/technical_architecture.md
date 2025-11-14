# Islam Media Central - Technical Architecture Document

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom Islamic theme
- **State Management**: Zustand for global state
- **Routing**: React Router v6
- **PWA**: Vite PWA plugin for offline functionality

### Backend Architecture
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with email, Google, Apple providers
- **File Storage**: Supabase Storage for user uploads
- **Real-time**: Supabase Realtime for live updates
- **API Layer**: Custom Express.js API for complex operations

### Component Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Card, etc.)
│   ├── layout/         # Layout components (Header, Footer, Navigation)
│   └── features/       # Feature-specific components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── stores/             # Zustand stores
├── utils/              # Utility functions
├── services/           # API services
├── types/              # TypeScript type definitions
└── assets/             # Static assets
```

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Quran Progress Table
```sql
CREATE TABLE quran_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  surah_number INTEGER NOT NULL,
  ayah_number INTEGER NOT NULL,
  bookmarked BOOLEAN DEFAULT FALSE,
  last_read TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Quiz Results Table
```sql
CREATE TABLE quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  quiz_type TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  completed_at TIMESTAMP DEFAULT NOW()
);
```

#### Child Progress Table
```sql
CREATE TABLE child_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES users(id) ON DELETE CASCADE,
  child_name TEXT NOT NULL,
  salah_tracker JSONB DEFAULT '{}',
  surah_yaseen_progress INTEGER DEFAULT 0,
  quran_memorization JSONB DEFAULT '{}',
  behavior_points INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

#### Quran
- `GET /api/quran/surahs` - Get all surahs
- `GET /api/quran/surah/:number` - Get specific surah
- `GET /api/quran/search` - Search Quran
- `POST /api/quran/bookmark` - Add bookmark

#### Points & Leaderboard
- `GET /api/points/leaderboard` - Get leaderboard
- `POST /api/points/earn` - Earn points
- `GET /api/points/history` - Points history

### Security Considerations
- All API endpoints protected with JWT authentication
- Rate limiting on public endpoints
- Input validation and sanitization
- CORS configuration for cross-origin requests
- Secure file upload handling

### Performance Optimizations
- Lazy loading for heavy components
- Image optimization and WebP format
- Service worker for offline functionality
- CDN for static assets
- Database indexing for fast queries

### SEO Implementation
- Server-side rendering for key pages
- Meta tags optimization
- Structured data markup
- Sitemap generation
- Open Graph tags for social sharing

### Monitoring & Analytics
- Error tracking with Sentry
- Performance monitoring
- User analytics (privacy-compliant)
- Uptime monitoring

### Deployment Strategy
- GitHub Actions for CI/CD
- Automated testing pipeline
- Staging environment
- Blue-green deployment
- Database migrations automation