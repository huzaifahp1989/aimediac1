## 1. Architecture Design

```mermaid
graph TD
    A[User Browser] --> B[React Frontend Application]
    B --> C[Supabase Client SDK]
    C --> D[Supabase Authentication]
    C --> E[Supabase Database]
    C --> F[Supabase Storage]
    
    B --> G[Service Worker]
    G --> H[Cache API]
    
    B --> I[External APIs]
    I --> J[Quran API]
    I --> K[Hadith API]
    I --> L[Podcast RSS Feeds]
    
    subgraph "Frontend Layer"
        B
        G
        H
    end
    
    subgraph "Backend Services (Supabase)"
        D
        E
        F
    end
    
    subgraph "External Services"
        I
        J
        K
        L
    end
```

## 2. Technology Description

**Frontend Stack:**
- React 18.2.0 with TypeScript 5.0
- Tailwind CSS 3.3 for styling
- Vite 4.4 for build tooling
- React Router 6.14 for navigation
- React Query 4.32 for state management
- Zustand 4.4 for global state
- Framer Motion 10.16 for animations
- React Hook Form 7.45 for forms
- React Player 2.12 for media playback

**Backend Services:**
- Supabase (PostgreSQL 15, Authentication, Storage, Real-time)
- No custom backend server required

**Development Tools:**
- ESLint 8.45 for code linting
- Prettier 3.0 for code formatting
- Husky 8.0 for git hooks
- Jest 29.6 for testing
- React Testing Library 13.4 for component testing

## 3. Route Definitions

| Route | Purpose | Authentication Required |
|-------|---------|------------------------|
| / | Homepage with featured content and navigation | No |
| /quran | Quran reader with translations and audio | No |
| /quran/[surah] | Specific Surah reading interface | No |
| /quran/bookmarks | User's bookmarked verses | Yes |
| /hadith | Hadith collections and search | No |
| /hadith/[collection] | Specific Hadith collection | No |
| /hadith/search | Advanced Hadith search | No |
| /kids | Kids zone with games and stories | No |
| /kids/games | Interactive Islamic games | No |
| /kids/stories | Animated Islamic stories | No |
| /articles | Islamic articles and blog posts | No |
| /articles/[category] | Articles by category | No |
| /articles/[slug] | Individual article page | No |
| /podcasts | Islamic podcasts and audio content | No |
| /podcasts/[series] | Podcast series page | No |
| /radio | Live Islamic radio streams | No |
| /competitions | Islamic knowledge competitions | Yes |
| /competitions/[id] | Specific competition page | Yes |
| /leaderboard | Global and friend leaderboards | Yes |
| /profile | User profile and settings | Yes |
| /dashboard | User dashboard with statistics | Yes |
| /parent-dashboard | Parent control panel | Yes (Parent role) |
| /auth/login | User login page | No |
| /auth/register | User registration page | No |
| /auth/forgot-password | Password recovery | No |
| /settings | User preferences and settings | Yes |

## 4. API Definitions

### 4.1 Authentication APIs (Supabase)

**User Registration**
```typescript
POST /auth/v1/signup

Request Body:
{
  email: string;
  password: string;
  data: {
    full_name: string;
    date_of_birth?: string;
    country?: string;
    preferred_language?: string;
    madhab?: string;
  }
}

Response:
{
  user: User;
  session: Session;
}
```

**User Login**
```typescript
POST /auth/v1/token

Request Body:
{
  email: string;
  password: string;
}

Response:
{
  user: User;
  session: Session;
  access_token: string;
  refresh_token: string;
}
```

### 4.2 Content APIs

**Quran Content**
```typescript
GET /api/quran/surahs
Response: Surah[]

GET /api/quran/surah/[number]
Response: {
  surah: Surah;
  verses: Verse[];
  translations: Translation[];
}

GET /api/quran/search
Query Params: q=string&language=string&limit=number
Response: SearchResult[]
```

**Hadith Content**
```typescript
GET /api/hadith/collections
Response: Collection[]

GET /api/hadith/collection/[id]/hadiths
Query Params: page=number&limit=number
Response: {
  hadiths: Hadith[];
  total: number;
  page: number;
}

GET /api/hadith/search
Query Params: q=string&collection=string&grade=string
Response: HadithSearchResult[]
```

### 4.3 User Progress APIs

**Reading Progress**
```typescript
POST /api/progress/reading
Request Body: {
  surah_number: number;
  verse_number: number;
  completion_percentage: number;
  time_spent: number;
}

GET /api/progress/reading/stats
Response: {
  total_read: number;
  streak_days: number;
  last_read: string;
  completion_rate: number;
}
```

**Quiz Results**
```typescript
POST /api/progress/quiz
Request Body: {
  quiz_id: string;
  score: number;
  total_questions: number;
  category: string;
  time_taken: number;
}

GET /api/progress/quiz/history
Response: QuizResult[]
```

### 4.4 Points System APIs

**Points Management**
```typescript
POST /api/points/earn
Request Body: {
  action: string;
  points: number;
  metadata?: object;
}

GET /api/points/balance
Response: {
  total_points: number;
  lifetime_points: number;
  rank: number;
  next_milestone: number;
}

GET /api/leaderboard
Query Params: type=global|friends&period=daily|weekly|monthly
Response: LeaderboardEntry[]
```

## 5. Database Schema Design

### 5.1 User Management Tables

```mermaid
erDiagram
    USERS ||--o{ USER_PROFILES : has
    USERS ||--o{ USER_PREFERENCES : has
    USERS ||--o{ USER_SESSIONS : has
    USERS ||--o{ USER_POINTS : earns
    USERS ||--o{ CHILD_ACCOUNTS : manages

    USERS {
        uuid id PK
        string email UK
        string encrypted_password
        boolean email_verified
        string role
        timestamp created_at
        timestamp updated_at
        timestamp last_login
    }

    USER_PROFILES {
        uuid id PK
        uuid user_id FK
        string full_name
        string avatar_url
        date date_of_birth
        string country
        string preferred_language
        string madhab
        string gender
        boolean is_parent
    }

    USER_PREFERENCES {
        uuid id PK
        uuid user_id FK
        jsonb quran_settings
        jsonb audio_preferences
        jsonb notification_settings
        jsonb privacy_settings
        string theme
    }

    USER_POINTS {
        uuid id PK
        uuid user_id FK
        integer total_points
        integer lifetime_points
        integer current_rank
        integer streak_days
        timestamp last_activity
    }

    CHILD_ACCOUNTS {
        uuid id PK
        uuid parent_id FK
        uuid child_id FK
        string relationship
        timestamp created_at
        boolean is_active
    }
```

### 5.2 Content Management Tables

```mermaid
erDiagram
    QURAN_SURAHS ||--o{ QURAN_VERSES : contains
    QURAN_VERSES ||--o{ QURAN_TRANSLATIONS : has
    QURAN_VERSES ||--o{ QURAN_TAFSIRS : has
    HADITH_COLLECTIONS ||--o{ HADITH_BOOKS : contains
    HADITH_BOOKS ||--o{ HADITH_NARRATIONS : contains

    QURAN_SURAHS {
        integer number PK
        string name_arabic
        string name_english
        string revelation_place
        integer verse_count
        integer revelation_order
    }

    QURAN_VERSES {
        uuid id PK
        integer surah_number FK
        integer verse_number
        string text_arabic
        string text_simple
        integer page_number
        integer juz_number
        integer hizb_number
    }

    QURAN_TRANSLATIONS {
        uuid id PK
        uuid verse_id FK
        string language_code
        string translator_name
        string translation_text
        boolean is_primary
    }

    QURAN_TAFSIRS {
        uuid id PK
        uuid verse_id FK
        string scholar_name
        string tafsir_text
        string language_code
        timestamp created_at
    }

    HADITH_COLLECTIONS {
        uuid id PK
        string name
        string author
        string description
        integer total_hadith
        string language
    }

    HADITH_NARRATIONS {
        uuid id PK
        uuid collection_id FK
        string hadith_number
        string text_arabic
        string text_translation
        string narrator_chain
        string authenticity_grade
        jsonb metadata
    }
```

### 5.3 Progress Tracking Tables

```mermaid
erDiagram
    USERS ||--o{ READING_PROGRESS : tracks
    USERS ||--o{ QUIZ_RESULTS : has
    USERS ||--o{ BOOKMARKS : creates
    USERS ||--o{ LEARNING_STREAKS : maintains
    CHILD_ACCOUNTS ||--o{ CHILD_ACTIVITIES : generates

    READING_PROGRESS {
        uuid id PK
        uuid user_id FK
        integer surah_number
        integer verse_start
        integer verse_end
        integer completion_percentage
        integer time_spent_seconds
        timestamp read_at
    }

    QUIZ_RESULTS {
        uuid id PK
        uuid user_id FK
        string quiz_id
        integer score
        integer total_questions
        string category
        integer time_taken_seconds
        jsonb answers
        timestamp completed_at
    }

    BOOKMARKS {
        uuid id PK
        uuid user_id FK
        string content_type
        string content_id
        string note
        boolean is_public
        timestamp created_at
    }

    LEARNING_STREAKS {
        uuid id PK
        uuid user_id FK
        date streak_date
        boolean is_maintained
        integer current_streak
        integer longest_streak
    }

    CHILD_ACTIVITIES {
        uuid id PK
        uuid child_id FK
        string activity_type
        string content_id
        jsonb activity_data
        timestamp created_at
        uuid parent_id FK
    }
```

### 5.4 Competition and Leaderboard Tables

```mermaid
erDiagram
    COMPETITIONS ||--o{ COMPETITION_PARTICIPANTS : has
    COMPETITIONS ||--o{ COMPETITION_QUESTIONS : contains
    COMPETITION_PARTICIPANTS ||--o{ PARTICIPANT_ANSWERS : submits
    USERS ||--o{ COMPETITION_PARTICIPANTS : joins
    USERS ||--o{ ACHIEVEMENTS : earns

    COMPETITIONS {
        uuid id PK
        string title
        string description
        string type
        timestamp start_time
        timestamp end_time
        integer max_participants
        jsonb prizes
        string status
        jsonb rules
    }

    COMPETITION_PARTICIPANTS {
        uuid id PK
        uuid competition_id FK
        uuid user_id FK
        integer score
        integer rank
        timestamp joined_at
        timestamp last_activity
        boolean is_winner
    }

    COMPETITION_QUESTIONS {
        uuid id PK
        uuid competition_id FK
        string question_text
        jsonb options
        string correct_answer
        integer points
        string category
        integer order_index
    }

    PARTICIPANT_ANSWERS {
        uuid id PK
        uuid participant_id FK
        uuid question_id FK
        string answer
        boolean is_correct
        integer time_taken
        timestamp answered_at
    }

    ACHIEVEMENTS {
        uuid id PK
        uuid user_id FK
        string achievement_type
        string title
        string description
        string badge_url
        integer points_awarded
        timestamp earned_at
        jsonb metadata
    }
```

## 6. Data Definition Language (DDL)

### 6.1 Core User Tables

```sql
-- Users table (managed by Supabase Auth)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT auth.uid(),
    email TEXT UNIQUE NOT NULL,
    encrypted_password TEXT NOT NULL,
    email_verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'parent', 'premium', 'admin'))
);

-- User profiles table
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    date_of_birth DATE,
    country TEXT,
    preferred_language TEXT DEFAULT 'en',
    madhab TEXT CHECK (madhab IN ('hanafi', 'maliki', 'shafii', 'hanbali')),
    gender TEXT CHECK (gender IN ('male', 'female')),
    is_parent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User preferences table
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    quran_settings JSONB DEFAULT '{"font_size": "medium", "reciter": "mishary", "translation": "sahih_international"}',
   