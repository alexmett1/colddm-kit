"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FormData {
  prospectInfo: string;
  offer: string;
  tone: string;
  platform: string;
}

interface Props {
  onGenerate: (data: FormData) => void;
  loading: boolean;
}

const TONES = ["Friendly", "Casual", "Direct", "Professional"];
const PLATFORMS = ["LinkedIn DM", "Cold Email", "Instagram DM"];

export default function GeneratorForm({ onGenerate, loading }: Props) {
  const [form, setForm] = useState<FormData>({
    prospectInfo: "",
    offer: "",
    tone: "Friendly",
    platform: "LinkedIn DM",
  });

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.prospectInfo.trim() || !form.offer.trim()) return;
    onGenerate(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium">Prospect Info</label>
        <textarea
          value={form.prospectInfo}
          onChange={(e) => update("prospectInfo", e.target.value)}
          placeholder="Paste their LinkedIn bio, website blurb, or notes about the prospect…"
          rows={4}
          className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm placeholder:text-foreground/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">What I&apos;m Selling</label>
        <textarea
          value={form.offer}
          onChange={(e) => update("offer", e.target.value)}
          placeholder="Describe your offer, product, or service…"
          rows={3}
          className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm placeholder:text-foreground/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Tone</label>
          <select
            value={form.tone}
            onChange={(e) => update("tone", e.target.value)}
            className="w-full appearance-none rounded-full border border-border bg-muted px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          >
            {TONES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Platform</label>
          <select
            value={form.platform}
            onChange={(e) => update("platform", e.target.value)}
            className="w-full appearance-none rounded-full border border-border bg-muted px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          >
            {PLATFORMS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={loading || !form.prospectInfo.trim() || !form.offer.trim()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-50"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Generating…
          </span>
        ) : (
          "Generate Messages"
        )}
      </motion.button>
    </form>
  );
}
