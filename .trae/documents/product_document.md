# Islam Media Central - Product Requirements Document

## Project Overview
A comprehensive Islamic media website combining Quran, Hadith, Kids Activities, Radio, Podcasts, Articles, Competitions, User Accounts, Points System, Leaderboard, and Child Progress Tracker.

## Core Features

### 1. Branding & Style
- Islamic blue/white/gold theme
- Clean, modern UI with rounded cards
- World-map wave design in header
- Islam Media Central logo
- Mobile-first responsive design
- Push notifications support

### 2. Main Sections (Menu)
- **Home Page**: Hero banner, Quran image, Mosque silhouette, navigation buttons
- **Quran Section**: 13-line Arabic text, translations, tafsir, search, bookmarks
- **Hadith Section**: Complete Hadith library with search functionality
- **Articles/Blog**: Islamic articles with categories, SEO optimized
- **Islamic Radio**: Live stream integration
- **Kids Zone**: Games, quizzes, activities, voice recorder
- **Podcast Page**: YouTube/RSS integration
- **Competitions**: Gaza fundraising, upload proof, challenges
- **Donate Page**: External charity links
- **Q&A Section**: User questions and admin replies
- **Prayer Times**: Auto-detect location, accurate times
- **Event Updates**: Community announcements, online classes

### 3. Points & Rewards System
- Users earn points for various activities
- Live leaderboard (daily, weekly, monthly)
- User profiles with badges and rankings
- Real-time point updates

### 4. Child Progress Tracker
- Salah tracker
- Surah Yaseen tracker
- Quran memorization progress
- Daily behavior rewards
- Parent dashboard

### 5. User Account System
- Registration and login (email, Google, Apple)
- Profile management
- Bookmark saving
- Quiz results tracking

### 6. Technical Requirements
- Fast backend with secure database
- SEO-friendly clean code
- PWA enabled for mobile
- Offline caching for Quran text
- Works with GitHub Pages/Netlify/Cloudflare/Render

## Technology Stack
- Frontend: React + TypeScript + Vite + Tailwind CSS
- State Management: Zustand
- Database: Supabase (PostgreSQL)
- Authentication: Supabase Auth
- PWA: Vite PWA plugin
- Audio: HTML5 Audio API
- Push Notifications: Web Push API

## Database Schema
- Users (profiles, authentication)
- Quran bookmarks and progress
- Hadith favorites
- Article interactions
- Quiz results and scores
- Points and achievements
- Child progress tracking
- Competition entries
- User-generated content

## External Integrations
- Islamic Radio: https://icecast.maxxwave.co.uk/radioseerah
- Prayer Times API
- YouTube API for podcasts
- Social sharing APIs

## Deployment
- GitHub Pages compatible
- Netlify/Cloudflare/Render ready
- Auto-update on GitHub push
- CDN for static assets