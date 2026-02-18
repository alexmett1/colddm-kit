"use client";

import { motion } from "framer-motion";
import type { MessageType } from "@/lib/storage";
import MessageCard from "./MessageCard";

interface Props {
  title: string;
  messages: string[];
  type: MessageType;
}

export default function MessageSection({ title, messages, type }: Props) {
  if (messages.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-3"
    >
      <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/50">
        {title}
      </h3>
      {messages.map((msg, i) => (
        <MessageCard key={i} text={msg} type={type} index={i} />
      ))}
    </motion.section>
  );
}
