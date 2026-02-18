"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { MessageType } from "@/lib/storage";
import { storage } from "@/lib/storage";

interface Props {
  text: string;
  type: MessageType;
  index: number;
}

export default function MessageCard({ text, type, index }: Props) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleSave() {
    storage.save(type, text);
    setSaved(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.07 }}
      className="rounded-2xl border border-border bg-white p-5 shadow-sm"
    >
      <p className="text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleCopy}
          className="rounded-full border border-border px-4 py-1.5 text-xs font-medium transition-colors hover:border-accent hover:text-accent"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <button
          onClick={handleSave}
          disabled={saved}
          className="rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
        >
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </motion.div>
  );
}
