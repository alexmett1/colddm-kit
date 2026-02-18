"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "Browse landing page",
      "Sign in & explore UI",
      "No message generation",
    ],
    cta: "Current Plan",
    disabled: true,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/mo",
    features: [
      "Unlimited message generation",
      "5 personalized openers",
      "3 follow-ups & 3 objection replies",
      "Save & manage history",
      "All platforms supported",
    ],
    cta: "Upgrade to Pro",
    disabled: false,
    highlight: true,
  },
];

export default function PricingPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Simple <span className="text-accent">pricing</span>
        </h1>
        <p className="mt-3 text-foreground/50">
          Start free. Upgrade when you&apos;re ready to send messages that land.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`rounded-2xl border p-8 ${
              plan.highlight
                ? "border-accent shadow-lg shadow-accent/10"
                : "border-border"
            }`}
          >
            {plan.highlight && (
              <span className="mb-4 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                Recommended
              </span>
            )}
            <h2 className="text-2xl font-bold">{plan.name}</h2>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-foreground/40">{plan.period}</span>
            </div>
            <ul className="mt-6 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 text-accent">&#10003;</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={plan.highlight ? handleUpgrade : undefined}
              disabled={plan.disabled || loading}
              className={`mt-8 w-full rounded-full py-3 text-sm font-semibold transition-colors ${
                plan.highlight
                  ? "bg-accent text-white hover:bg-accent-dark disabled:opacity-60"
                  : "border border-border text-foreground/40"
              }`}
            >
              {loading && plan.highlight ? "Redirecting…" : plan.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
