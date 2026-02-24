# Web Programming Portfolio

A full-stack personal portfolio application with a Netflix-inspired UI, interactive sections, and a guestbook API backed by Supabase.

This repository contains:
- `frontend/`: React + Vite + Tailwind-based portfolio UI
- `backend/`: NestJS API for guestbook messages (plus a lightweight Express entrypoint)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [API](#api)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Available Scripts](#available-scripts)
- [Deployment Notes](#deployment-notes)
- [Troubleshooting](#troubleshooting)

---

## Overview

This project is a portfolio website focused on:
- A cinematic landing experience with animated loader and hero section
- Showcasing projects, programming skills, gallery, and hobbies
- A contact page with social links
- A guestbook where visitors can post and read reviews

The frontend consumes a guestbook API at:

`https://webprog-portfolio.onrender.com/api/guestbook`

You can point this to your own local or deployed backend by changing `API_URL` in `frontend/src/App.jsx`.

---

## Tech Stack

### Frontend
- React 19
- Vite 7
- Tailwind CSS 4

### Backend
- NestJS 11
- Supabase JavaScript client
- Render

### Tooling
- `concurrently` for running frontend + backend scripts from root

---

## Project Structure

```text
webprog-portfolio/
├─ frontend/                 # React portfolio app
│  ├─ src/
│  │  ├─ App.jsx             # Main UI, sections, guestbook integration
│  │  ├─ NetflixLoader.jsx   # Intro loader animation
│  │  ├─ LetterGlitch.jsx    # Hero background effect
│  │  ├─ ScrollStack.jsx     # Contact cards interaction
│  │  └─ ...
│  └─ public/images/         # Portfolio images
├─ backend/                  # API server
│  ├─ src/
│  │  ├─ main.ts             # Nest bootstrap + CORS
│  │  └─ guestbook/          # Guestbook module/controller/service
│  ├─ index.js               # Simple Express server entrypoint
│  └─ .env                   # Local secrets (not committed)
└─ package.json              # Root script orchestration
```

---

## Features

- **Netflix-style loader** with animated progress and timed transitions
- **Hero actions**:
	- `Contact Me` switches to a dedicated contact page
	- `More Info` smoothly scrolls to About section
- **Skill rows with actions**:
	- Programming row uses `Learn` button that opens W3Schools in a new tab
	- Gallery/Hobbies rows provide media preview via modal
- **Featured projects** with project detail modal and outbound links
- **Guestbook**:
	- Read messages from API
	- Submit new review with loading state and toast notifications

---

## API

Base route:

`/api/guestbook`

### `GET /api/guestbook`
Returns guestbook entries ordered by latest first.

### `POST /api/guestbook`
Creates a new entry.

Request body:

```json
{
	"name": "Visitor Name",
	"message": "Great portfolio!"
}
```

Expected Supabase table (`guestbook`) fields:
- `id` (primary key)
- `name` (text)
- `message` (text)
- `created_at` (timestamp, default now)

---

## Prerequisites

- Node.js 18+ (Node.js 20+ recommended)
- npm 9+
- A Supabase project (for backend guestbook persistence)

---

## Installation

Install dependencies at each project level:

```bash
# root
npm install

# frontend
cd frontend
npm install

# backend
cd ../backend
npm install
```

---

## Environment Variables

Create `backend/.env`:

```env
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_KEY=YOUR_SUPABASE_SERVICE_ROLE_OR_ANON_KEY
```

The backend reads these variables through `ConfigModule` and initializes Supabase in `GuestbookService`.

---

## Running the Project

### Option A: Run both from root (current default)

```bash
npm run dev
```

This runs:
- `frontend`: `vite`
- `backend`: `nodemon index.js`

> Note: `backend/index.js` is a minimal Express server (`GET /`). If you need full Nest guestbook endpoints locally, use Option B.

### Option B: Run frontend + Nest backend separately (recommended for guestbook API development)

Terminal 1:
```bash
cd frontend
npm run dev
```

Terminal 2:
```bash
cd backend
npm run start:dev
```

Frontend default local URL: `http://localhost:5173`  
Backend default URL: `http://localhost:3000`

If using local backend API, update `API_URL` in `frontend/src/App.jsx` to:

`http://localhost:3000/api/guestbook`

---

## Available Scripts

### Root
- `npm run dev` — Runs frontend and backend scripts concurrently

### Frontend (`frontend/package.json`)
- `npm run dev` — Start Vite dev server
- `npm run build` — Production build
- `npm run preview` — Preview built app
- `npm run lint` — Lint frontend code

### Backend (`backend/package.json`)
- `npm run dev` — Run `index.js` with nodemon
- `npm run start:dev` — Run Nest in watch mode
- `npm run build` — Build Nest app
- `npm run start:prod` — Run compiled Nest app
- `npm run lint` — Lint backend code
- `npm run test` / `test:e2e` / `test:cov` — Backend test suite

---

## Deployment Notes

- Frontend and backend can be deployed independently.
- The frontend currently points to a deployed API:
	`https://webprog-portfolio.onrender.com/api/guestbook`
- For production, keep API URL configurable (e.g., via environment-based frontend config).
- Ensure backend CORS policy matches the deployed frontend origin in production.

---

## Troubleshooting

### Guestbook not loading/submitting
- Confirm backend is reachable at configured `API_URL`
- Check `SUPABASE_URL` and `SUPABASE_KEY` in `backend/.env`
- Verify Supabase `guestbook` table exists with expected columns

### CORS issues
- Update backend CORS origin settings in `backend/src/main.ts`

### Empty reviews on UI
- Open browser dev tools and inspect network response for `GET /api/guestbook`
- Check backend logs for Supabase query errors

---

Built for WEBPROG finals with a focus on modern UI, interaction design, and full-stack integration.