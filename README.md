# Iron Log

A personal workout tracking app built for a 13-week periodized strength program. This is a single-user app I built for myself to log my training and track progress over time.

## What It Does

- **4-day training split** with exercises based on [Tanner Shuck's top 25 exercises for natural lifters](https://www.youtube.com/@TannerTrains-h1s)
- **13-week periodized program** cycling through Hypertrophy → Strength Building → Strength Peak → Deload
- **Log weight and reps** for each set, with a live **estimated 1RM** calculation (Epley formula)
- **Previous session data** shown per exercise so I know what to beat
- **Rest timer** that auto-starts after logging a set
- **Swap or delete exercises** on any given day if I want to change things up

## Google Sheets as a Database

Instead of using a traditional database, all workout data is saved directly to a **Google Sheet** via a Google Apps Script web app. Each set gets its own row with columns for Date, Week, Day, Phase, Exercise, Set #, Weight, Reps, and Estimated 1RM.

This lets me:
- Build my own charts and graphs in Google Sheets
- Track trends over time with pivot tables
- Own my data in a format I can actually use

The app syncs from the sheet on page load so previous session data is always up to date.

## Tech Stack

- **Astro** — static site framework
- **Vanilla JS** — all client-side, no frameworks
- **Google Sheets + Apps Script** — data storage and API
- **Vercel** — hosting

## Running Locally

```bash
npm install
npm run dev
```

## Program Structure

| Day | Exercises |
|-----|-----------|
| Day 1 | Cleans, Back Squats |
| Day 2 | Bench Press, Overhead Press, Weighted Strict Pull-Ups, Bent Over Barbell Row, Dips |
| Day 3 | Conventional Deadlifts, Bulgarian Split Squats |
| Day 4 | Incline Bench Press, Rows (T-Bar or Seal Row), Weighted Strict Pull-Ups, Dips |
