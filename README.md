# St. John the Beloved Class — Web App

A Progressive Web App (PWA) for the **St. John the Beloved Sunday School Class**, built with vanilla HTML/CSS/JS and Firebase (Firestore + Hosting). Includes a **Student App** and a **Teacher Admin Panel**.

---

## 🌐 Live URLs

| Page | URL |
|---|---|
| **Student App** | https://st-john-the-beloved.web.app |
| **Admin Panel** | https://st-john-the-beloved.web.app/admin |
| **GitHub Repo** | https://github.com/kiro-elkess/St-John-The-Beloved |

---

## 🏗️ Project Structure

```
james-main/
├── index.html              ← Student app (PWA)
├── james-admin.html        ← Teacher admin panel
├── firebase-config.js      ← Shared Firebase config (sets window.FIREBASE_CONFIG)
├── firebase-messaging-sw.js← FCM push notification service worker
├── sw.js                   ← PWA cache service worker
├── manifest.json           ← PWA install manifest
├── firebase.json           ← Firebase Hosting config
├── vercel.json             ← Vercel config (optional)
├── package.json
├── deploy.bat              ← One-click deploy to Firebase Hosting
├── push-github.bat         ← One-click push to GitHub
└── images/
    ├── logo.png            ← St. John the Beloved Class circular logo
    ├── badge_seer.svg      ← John the Seer badge (150 Jokens)
    ├── badge_apostle.svg   ← John the Apostle badge (200 Jokens)
    ├── badge_evangelist.svg← John the Evangelist badge (400 Jokens)
    └── badge_beloved.svg   ← John the Beloved badge (550 Jokens)
```

---

## ✨ Features

### Student App (`index.html`)
- **Login** — Student types their Student ID (e.g. `adam-ragy`) to enter. If not in Firestore yet, the account is auto-created from the roster.
- **Leaderboard** — All 33 students ranked by **lifetime accumulated Jokens** (the `earned` field). Shows badge icons, not the exact accumulated number.
- **Badge Shop** — 4 progressive St. John badges students can purchase:
  | Badge | Arabic | Cost |
  |---|---|---|
  | John the Seer | يوحنا الرائي | 150 Jokens |
  | John the Apostle | يوحنا الرسولي | 200 Jokens |
  | John the Evangelist | يوحنا الانجيلي | 400 Jokens |
  | John the Beloved | يوحنا الحبيب | 550 Jokens |
  - Buying a badge **resets the wallet** to 0 (the spendable `coins` field).
  - Lifetime `earned` is **never reset** — used for leaderboard ordering.
- **Progress Bar** — Shows progress toward the next badge.
- **Spirituals Tracker** — Students log daily Morning Prayer, Night Prayer, Bible Reading, and Fasting (Wednesday & Friday only).
- **Psalm Submission** — Students submit memorized psalms for teacher approval (+10 Jokens).
- **Arena** — Joken milestone tiers with animated cards.
- **Events** — Class announcements, upcoming events, and RSVP voting (birthdays of other students are kept private).
- **Challenges** — Quiz-based mini-games for extra Jokens.
- **Gift Shop** — Redeem Jokens for real gifts *(Currently disabled — code preserved for future re-enabling)*.
- **Score History** — Full log of every Joken transaction (reason, amount, timestamp).
- **PWA / Install** — Installable on Android & iOS home screen.
- **Prayer Alerts & Reminders** — In-app notification bell icon (🔔) in the header with an unread badge and popup window for prayer reminders (Morning Prayer, Night Prayer, and teacher broadcasts) + Web Push Notifications.

### Admin Panel (`james-admin.html`)
- **Jokens Tab** — Apply Joken rules (preset or custom) to one or many students at once; scan QR cards to award points.
- **Students Tab** — View all 33 students; click any to edit wallet, lifetime score, badges, birthday; view score history; download QR card; reset wallet; delete.
- **Roster Sync Button** — One-click `🔄 Sync 33 Students Roster` populates all 33 students in Firestore without overwriting existing scores.
- **Attendance Tab** — Mark weekly Friday attendance across 4 activities (Liturgy, Sunday School, 3asheya, Bible Study); export to Excel.
- **Spirituals Tab** — Read-only view of each student's daily spiritual practice per month; day-by-day breakdown.
- **Psalms Tab** — Approve or reject student psalm requests (auto-awards +10 Jokens on approval).
- **Eftkad Tab** — Track home visit rounds (up to 5 per student) with teacher notes; export to Excel.
- **Events Tab** — Publish class announcements; track RSVP votes.
- **Alerts / Notifications Tab** — Send push reminders:
  - 🌅 Morning Prayer broadcast
  - 🌙 Night Prayer broadcast
  - 🎂 Today's Birthday alerts (auto-detects from roster)
  - 🚀 Custom message broadcast
- **Challenges Tab** — Create quiz challenges (multiple choice) for students to complete.
- **Gift Shop Tab** — Add/remove/restock gifts with photo, emoji, Joken cost, and quantity.

---

## 👥 Official Student Roster (33 Students)

| Student ID | Name | Birthday |
|---|---|---|
| `adam-ragy` | Adam Ragy | 14/05/2015 |
| `armia-bishoy` | Armia Bishoy | 12/10/2014 |
| `patrick-hany` | Patrick Hany | 11/11/2014 |
| `benuel-mina` | Benuel Mina | 27/10/2014 |
| `georgino-ehab` | Georgino Ehab | 18/07/2014 |
| `jonathan-romany` | Jonathan Romany | 06/10/2015 |
| `jonathan-kirollos` | Jonathan Kirollos | 03/02/2015 |
| `jonathan-walid` | Jonathan Walid | 14/05/2014 |
| `daniel-mina` | Daniel Mina | 22/12/2014 |
| `david-mina` | David Mina | 14/06/2014 |
| `ramy-bassem` | Ramy Bassem | 20/10/2014 |
| `randy-amir` | Randy Amir | 18/05/2015 |
| `steven-sherif` | Steven Sherif | 05/05/2015 |
| `karas-sameh` | Karas Sameh | 17/02/2014 |
| `karim-hany` | Karim Hany | 28/06/2015 |
| `kirollos-wael` | Kirollos Wael | 30/08/2014 |
| `matthew-sherif` | Matthew Sherif | 09/08/2014 |
| `matthew-eid` | Matthew Eid | 15/03/2012 |
| `martin-michael` | Martin Michael | 19/12/2015 |
| `mark-ramy` | Mark Ramy | 08/12/2014 |
| `mark-awad` | Mark Awad | 10/06/2014 |
| `mina-beshara` | Mina Beshara | 24/02/2024 |
| `john-samer` | John Samer | 10/11/2015 |
| `mina-yasser` | Mina Yasser | 14/12/2014 |
| `john-sherif` | John Sherif | 09/11/2015 |
| `sebastian-pola` | Sebastian Pola | — |
| `patrick-raymon` | Patrick Raymon | 22/08/2015 |
| `david-aziz` | David Aziz | 20/05/2015 |
| `andrew-elia` | Andrew Elia | 11/03/2013 |
| `philopater-michel` | Philopater Michel | 31/12/2014 |
| `david-sherif` | David Sherif | — |
| `adham-karim` | Adham Karim | 10/12/2015 |
| `mina-youssef` | Mina Youssef | — |

---

## 🔥 Firebase Setup

### Project
- **Project ID:** `st-john-the-beloved`
- **Hosting:** Firebase Hosting (Spark / free plan)
- **Database:** Firestore (`james/app/` as root document)

### Firestore Collections (under `james/app/`)

| Collection | Description |
|---|---|
| `students` | One doc per student — `coins`, `earned`, `badges`, `birthday`, `purchases`, `eftkad`, `done` |
| `history` | Joken transaction log — `sid`, `amt`, `reason`, `at` |
| `attendance` | Keyed by `YYYY-MM-DD` Friday — `{odas, madares, asheya, dars}: {studentId: true/false}` |
| `spirituals` | Keyed by student ID — daily spiritual ticks `days.YYYY-MM-DD.{mp,np,bible,som}` |
| `rules` | Custom Joken rules — `label`, `amt` |
| `psalms` | Psalm requests — `sid`, `text`, `status`, `at`, `decidedAt` |
| `events` | Class announcements — `title`, `text`, `votes` |
| `challenges` | Quiz challenges — `title`, `desc`, `questions[]` |
| `shop` | Gift shop items — `name`, `emoji`, `cost`, `qty`, `photo` |
| `notifications` | Sent push reminders log — `title`, `body`, `type`, `createdAt` |

### `firebase-config.js`
Sets `window.FIREBASE_CONFIG` (not `const`) to avoid redeclaration conflicts when both `firebase-config.js` and the page's inline script run in the same scope.

---

## 🚀 Deploying

### To Firebase Hosting
```
deploy.bat
```
Or manually:
```
npx firebase-tools deploy --only hosting
```
> ⚠️ The Firebase Spark (free) plan rejects `.bat`, `.exe`, `.cmd` files. These are excluded in `firebase.json`'s `ignore` array.

### To GitHub
```
push-github.bat
```
Or manually:
```
git push -u origin main
```

---

## ⚙️ firebase.json (key settings)

```json
{
  "hosting": {
    "public": ".",
    "cleanUrls": true,
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**",
                "functions/**", "james-main/**",
                "deploy.bat", "**/*.bat", "**/*.cmd", "**/*.ps1", "**/*.sh", "**/*.exe",
                "package.json", "package-lock.json"],
    "rewrites": [
      { "source": "/admin", "destination": "/james-admin.html" }
    ]
  }
}
```

---

## 🐛 Known Issues & Fixes Applied

### `const` Redeclaration Crash (All Buttons Dead)
**Problem:** `firebase-config.js` declared `const firebaseConfig`, and both `index.html` and `james-admin.html` also declared `const firebaseConfig` → browser threw **"Cannot redeclare block-scoped variable"** → entire JS crashed → all buttons stopped working.

**Fix:** `firebase-config.js` now sets `window.FIREBASE_CONFIG` instead. Both HTML files read `window.FIREBASE_CONFIG` with a safe inline fallback.

### Firebase Hosting 400 Error (Executable Files)
**Problem:** Firebase Spark plan rejects `.bat`, `.cmd`, `.exe` files.

**Fix:** Added all executable extensions to the `ignore` array in `firebase.json`.

### Login Dropdown Removed
The student login no longer shows a dropdown list of all 33 students. Students simply type their **Student ID** (e.g. `adam-ragy`) or full name and press **ENTER**. The roster is matched server-side — if the student doesn't exist in Firestore yet, their record is auto-created from the built-in roster data.

---

## 📱 PWA / Install

The app is installable on Android and iOS:
- **Android:** Chrome shows an "Install" banner automatically, or use the browser menu → "Add to Home Screen"
- **iOS Safari:** Share button → "Add to Home Screen"

A `manifest.json` and `sw.js` service worker handle offline caching and the install prompt.

---

## 🔔 Push Notifications

Handled via Firebase Cloud Messaging (FCM):
- `firebase-messaging-sw.js` — service worker that receives and displays push messages
- Notifications stored in Firestore `notifications` collection
- Admin can send: Morning Prayer, Night Prayer, Birthday alerts, or custom broadcasts
- Students enable notifications from the Leaderboard page banner

---

## 🎨 Design

- **Fonts:** Lilita One (headings) + Nunito (body)
- **Color palette:** Navy/royal blue (`#0f1e4a`, `#1b3a8f`, `#2a5bd7`) with gold accents (`#ffcc33`, `#ff9a1f`)
- **Logo:** Circular emblem — Jesus and St. John the Beloved with class children, labeled "St. John the Beloved CLASS"
- **Badges:** Custom SVG icons for each of the 4 St. John titles
