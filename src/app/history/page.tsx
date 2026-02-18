import SavedMessages from "@/components/history/SavedMessages";

export default function HistoryPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">
        Saved <span className="text-accent">Messages</span>
      </h1>
      <SavedMessages />
    </main>
  );
}
