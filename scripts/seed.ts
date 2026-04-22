/**
 * Seed script: inserts the built-in LinguaPrep mock tests into the
 * Supabase `tests` table. Safe to run multiple times (upserts by slug).
 *
 *   npm run seed
 */
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { TEST_CATALOG } from "../lib/test-data";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

async function main() {
  console.log(`Seeding ${TEST_CATALOG.length} tests...`);

  for (const t of TEST_CATALOG) {
    const { error } = await supabase
      .from("tests")
      .upsert(
        {
          slug: t.slug,
          test_type: t.testType,
          section: t.section,
          title: t.title,
          duration_minutes: t.durationMinutes,
          content: t.content,
        },
        { onConflict: "slug" }
      );
    if (error) {
      console.error(`  ✗ ${t.slug}`, error.message);
    } else {
      console.log(`  ✓ ${t.slug}`);
    }
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
