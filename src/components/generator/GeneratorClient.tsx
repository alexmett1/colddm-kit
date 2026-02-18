"use client";

import { useState } from "react";
import GeneratorForm from "@/components/generator/GeneratorForm";
import MessageSection from "@/components/generator/MessageSection";

interface Results {
  openers: string[];
  followUps: string[];
  objections: string[];
}

export default function GeneratorClient() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate(data: {
    prospectInfo: string;
    offer: string;
    tone: string;
    platform: string;
  }) {
    setLoading(true);
    setResults(null);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.status === 402) {
        setError("Pro subscription required. Please upgrade to generate messages.");
        return;
      }

      const json = await res.json();
      setResults(json);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[380px_1fr]">
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm h-fit">
        <GeneratorForm onGenerate={handleGenerate} loading={loading} />
      </div>

      <div className="space-y-8">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {results && !loading && (
          <>
            <MessageSection title="Openers" messages={results.openers} type="opener" />
            <MessageSection title="Follow-ups" messages={results.followUps} type="followUp" />
            <MessageSection title="Objection Replies" messages={results.objections} type="objection" />
          </>
        )}

        {!results && !loading && !error && (
          <div className="flex items-center justify-center py-20 text-foreground/30">
            <p>Fill out the form and hit Generate to see your messages here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
