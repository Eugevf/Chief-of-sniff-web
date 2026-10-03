-- Waitlist table for the web-only Supabase project.
-- Run once in the Supabase dashboard (SQL Editor) of THIS project — the one
-- whose URL matches VITE_SUPABASE_URL. The site inserts rows with the anon
-- key; RLS below makes that key insert-only (it can never read or change
-- rows, nor touch other tables).

CREATE TABLE "waitlist_entries" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'es',
    "privacy_accepted_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "waitlist_entries_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "waitlist_entries_email_key" ON "waitlist_entries"("email");

ALTER TABLE "waitlist_entries" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "waitlist_entries_insert_public" ON "waitlist_entries"
    FOR INSERT TO PUBLIC WITH CHECK (true);

REVOKE ALL ON "waitlist_entries" FROM anon;
GRANT INSERT ON "waitlist_entries" TO anon;
REVOKE ALL ON "waitlist_entries" FROM authenticated;
