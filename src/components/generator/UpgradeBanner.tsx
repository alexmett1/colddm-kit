import Link from "next/link";

export default function UpgradeBanner() {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-accent/30 bg-accent/5 p-10 text-center">
      <div className="mb-4 flex justify-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-2xl text-accent">
          &#9889;
        </span>
      </div>
      <h2 className="text-2xl font-bold tracking-tight">
        Upgrade to <span className="text-accent">Pro</span> to generate messages
      </h2>
      <p className="mt-2 text-foreground/50">
        Get unlimited personalized openers, follow-ups, and objection replies for $12/mo.
      </p>
      <Link
        href="/pricing"
        className="mt-6 inline-block rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
      >
        View Pricing
      </Link>
    </div>
  );
}
