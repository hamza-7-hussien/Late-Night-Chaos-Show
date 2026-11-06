# 🎙️ Late Night Chaos Show (استوديو النشرة الكوميدية)

A modern, hilarious real-time multiplayer party web game built for groups of friends. Ready for Vercel deployment and PWA installable on mobile devices.

---

## 🎮 Game Modes

### 1. 🎙️ Caught Anchor (المذيع المتورط)
- One player acts as the serious TV news anchor reading breaking news off the live teleprompter.
- The audience spectators write and throw unexpected, embarrassing, or absurd sabotage words into the teleprompter blanks in real time.
- The anchor must maintain a straight face while reading the ridiculous news without laughing.
- Spectators vote on improvisation quality and trigger the Laugh Meter!

### 2. 🤫 Comedy Secret (السر الكوميدي)
- An awkward, relatable comedic prompt is revealed to everyone.
- All players secretly write their funniest response before the countdown expires.
- Responses are revealed anonymously for a blind audience vote.
- Top punchlines earn points and players compete for the Studio Champion trophy!

---

## 🚀 Key Features

- **Clean & Minimal UX**: Focused, distraction-free television studio aesthetic.
- **PWA (Progressive Web App)**: Installable directly on Android & iOS mobile devices with offline caching.
- **Bilingual (i18n)**: Instant one-click toggle between Arabic (RTL) and English (LTR).
- **Guest & Google Auth**: Quick guest nickname/avatar selector + Google Sign-In support.
- **Vercel Serverless Ready**: Designed for Supabase Realtime (Presence & Broadcast) to avoid traditional WebSocket server dropouts on serverless hosts.
- **Web Audio Sound Effects**: Television broadcast intro sting, sabotage drops, laughter chimes, and podium fanfare built with Web Audio API.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion, Canvas Confetti
- **Audio**: Web Audio API
- **PWA**: Web App Manifest, Service Worker
- **Deployment**: Vercel Ready

---

## 📦 Getting Started

```bash
# Clone the repository
git clone https://github.com/hamza-7-hussien/Late-Night-Chaos-Show.git
cd Late-Night-Chaos-Show

# Install dependencies
npm install

# Run local development server
npm run dev
```

---

## 📜 License
Apache-2.0
