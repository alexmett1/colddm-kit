import Link from "next/link";

export default function BillingSuccessPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-65px)] max-w-lg flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
        <span className="text-3xl text-accent">&#10003;</span>
      </div>
      <h1 className="text-3xl font-bold tracking-tight">
        You&apos;re <span className="text-accent">Pro</span> now!
      </h1>
      <p className="mt-3 text-foreground/50">
        Your subscription is active. Start generating personalized outreach messages.
      </p>
      <Link
        href="/generator"
        className="mt-8 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
      >
        Go to Generator
      </Link>
    </main>
  );
}
