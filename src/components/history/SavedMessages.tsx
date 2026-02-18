"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { storage, type SavedMessage, type MessageType } from "@/lib/storage";

const TYPE_LABELS: Record<MessageType, string> = {
  opener: "Openers",
  followUp: "Follow-ups",
  objection: "Objection Replies",
};

const TYPE_ORDER: MessageType[] = ["opener", "followUp", "objection"];

export default function SavedMessages() {
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  useEffect(() => {
    setMessages(storage.getAll());
  }, []);

  function handleDelete(id: string) {
    storage.remove(id);
    setMessages(storage.getAll());
  }

  function handleClearAll() {
    storage.clearAll();
    setMessages([]);
  }

  const grouped = TYPE_ORDER.map((type) => ({
    type,
    label: TYPE_LABELS[type],
    items: messages.filter((m) => m.type === type),
  })).filter((g) => g.items.length > 0);

  if (messages.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-foreground/40 text-lg">No saved messages yet.</p>
        <p className="text-foreground/30 mt-1 text-sm">
          Generate messages and hit Save to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/50">
          {messages.length} saved message{messages.length !== 1 ? "s" : ""}
        </p>
        <button
          onClick={handleClearAll}
          className="rounded-full border border-red-200 px-4 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
        >
          Clear All
        </button>
      </div>

      {grouped.map((group) => (
        <section key={group.type} className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/50">
            {group.label}
          </h3>
          <AnimatePresence>
            {group.items.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="rounded-2xl border border-border bg-white p-5 shadow-sm"
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-foreground/30">
                    {new Date(msg.savedAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="rounded-full px-3 py-1 text-xs font-medium text-red-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      ))}
    </div>
  );
}
