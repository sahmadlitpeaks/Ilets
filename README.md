# LinguaPrep

Production-ready English proficiency test prep platform: mock tests for IELTS,
TOEFL, PTE, and the Duolingo English Test (DET), plus skill drills and
AI-powered writing & speaking feedback.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**,
**Supabase** (auth / DB / storage), and the **Anthropic Claude API** (server
side only).

## Features

- Full test-player engine with timer, navigator, flagging, 10-second localStorage autosave, and auto-submit on timeout
- Section-accurate flows for IELTS, TOEFL, PTE, and DET
- Question types: single/multi MCQ, fill-blank, true/false/not-given, matching, sentence ordering, highlight summary, essay, and speaking with MediaRecorder + Web Speech API
- AI feedback on writing & speaking via Claude, graded against each exam's native rubric
- Skill drills (grammar, vocabulary, reading, listening) with immediate feedback and session tracking
- Dashboard with score-over-time line chart, skill heatmap, streak counter, and recent attempts
- Original practice content only — no copyrighted exam material
- Light + dark mode, editorial design (Fraunces display + Inter body), mobile first

## Tech

| Area | Choice |
| --- | --- |
| Framework | Next.js 14 App Router + TypeScript |
| Styling | Tailwind CSS + shadcn/ui primitives + Framer Motion |
| Auth + DB | Supabase (Postgres + RLS) |
| Storage | Supabase Storage (`speaking-audio` bucket) |
| AI | Anthropic Claude (`claude-sonnet-4-6`) |
| Speech-to-text | Web Speech API in-browser; Deepgram SDK included for server STT |
| Charts | Recharts |
| Deploy | Vercel |

## Project layout

```
app/
  (marketing)/            Landing page
  (app)/                  Authenticated layout
    dashboard/
    tests/
      ielts|toefl|pte|det/
      [type]/take/[slug]/ Test player route
    drills/{grammar,vocabulary,reading,listening}/
    results/[id]/         Attempt results + AI feedback
  api/
    feedback/writing/     POST essay → Claude → scored JSON
    feedback/speaking/    POST transcript → Claude → scored JSON
    tests/submit/         POST attempt → Supabase
    drills/submit/        POST drill session → Supabase
  auth/{callback,signout}/
  login/, signup/
components/
  ui/                     shadcn/ui primitives
  question-types/         One component per question type
  test-player/            Timer, navigator, player shell
  dashboard/              Charts, heatmap, recent list
  drills/                 Drill runner
  results/                Feedback panel
lib/
  supabase/               client / server / middleware helpers
  anthropic.ts            Server-only Claude wrapper
  feedback-prompts.ts     Exam-specific rubric prompts
  scoring/                Band-score converters per exam
  test-data/              Original question bank (JSON/TS)
  auto-score.ts           MCQ / fill-blank / TFNG scoring
supabase/
  migrations/0001_initial.sql
scripts/
  seed.ts
types/
  index.ts
```

## Getting started

### 1. Clone & install

```bash
git clone <repo-url>
cd ilets
npm install
```

### 2. Create a Supabase project

Create a project at [supabase.com](https://supabase.com). In the SQL editor,
run the migration:

```sql
-- paste contents of supabase/migrations/0001_initial.sql
```

That creates `profiles`, `tests`, `attempts`, and `drill_sessions` tables, a
signup trigger that auto-creates a profile row, RLS policies restricting each
user to their own rows, and a `speaking-audio` storage bucket.

### 3. Environment variables

Copy the example and fill in:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=            # from Supabase project settings
NEXT_PUBLIC_SUPABASE_ANON_KEY=       # from Supabase project settings
SUPABASE_SERVICE_ROLE_KEY=           # server-only; used only by seed + API routes
ANTHROPIC_API_KEY=                   # server-only
DEEPGRAM_API_KEY=                    # optional; server-side STT fallback
```

### 4. Seed the test catalogue (optional)

```bash
npm run seed
```

Inserts all eight built-in mocks (IELTS x3, TOEFL x2, PTE x2, DET x1). The app
will still run without this — pages fall back to the bundled TypeScript
catalogue — but seeding lets you edit questions from the Supabase UI.

### 5. Run

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Add the five environment variables above in **Project Settings → Environment Variables**.
4. Deploy.

Supabase auth redirects need the production URL — add
`https://<your-vercel-domain>/auth/callback` under **Supabase → Authentication →
URL configuration**.

## End-to-end flow (proof of concept)

1. **Sign up** at `/signup`, pick *IELTS* as target.
2. Go to `/tests/ielts` and start **IELTS Academic Writing — Full Test**.
3. Type a Task 1 or Task 2 essay and hit **Submit test**.
4. The player POSTs to `/api/tests/submit` (saves attempt), then
   `/api/feedback/writing` (Claude grades the essay against the IELTS band
   descriptors, returns JSON).
5. You land on `/results/:id` with the band score, per-criterion feedback,
   improvements, and sentence-level notes.
6. The **dashboard** updates: the new band shows in the progress chart, the
   attempt appears under *Recent*, and your streak counter increments.

## Security notes

- `ANTHROPIC_API_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are **never** imported in
  client components. All AI calls go through server API routes, which verify
  the Supabase session before calling Claude.
- Every table has Row Level Security on: users can only read and write their
  own `profiles`, `attempts`, and `drill_sessions` rows.
- Speaking audio is stored in a private Supabase bucket. The schema includes a
  commented-out `pg_cron` job to purge files older than 30 days — enable it in
  the Supabase dashboard once you turn on the pg_cron extension.
- All practice questions in `lib/test-data/` are original compositions written
  for this project. No official IELTS / TOEFL / PTE / DET content is included.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server on :3000 |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript type check |
| `npm run seed` | Upsert the bundled test catalogue into Supabase |

## License

Original practice content © LinguaPrep. IELTS, TOEFL, PTE, and the Duolingo
English Test are trademarks of their respective owners; this project is not
affiliated with or endorsed by any of them.
