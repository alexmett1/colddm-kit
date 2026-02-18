import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-65px)] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent">
        Cold outreach, without the cringe
      </span>
      <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
        Write DMs that<br />
        actually get <span className="text-accent">replies</span>
      </h1>
      <p className="mt-5 max-w-lg text-lg text-foreground/50">
        Paste a prospect&apos;s info, describe your offer, and get personalized openers,
        follow-ups, and objection replies in seconds.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/generator"
          className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          Start Generating
        </Link>
        <Link
          href="/history"
          className="rounded-full border border-border px-8 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
        >
          View Saved
        </Link>
      </div>
    </main>
  );
}
