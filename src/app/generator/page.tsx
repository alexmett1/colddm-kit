import { auth } from "@clerk/nextjs/server";
import { isPro } from "@/lib/entitlements";
import GeneratorClient from "@/components/generator/GeneratorClient";
import UpgradeBanner from "@/components/generator/UpgradeBanner";

export default async function GeneratorPage() {
  const { userId } = await auth();

  let userIsPro = false;
  try {
    userIsPro = userId ? await isPro(userId) : false;
  } catch (err) {
    console.error("Failed to check entitlement:", err);
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">
        Message <span className="text-accent">Generator</span>
      </h1>

      {userIsPro ? <GeneratorClient /> : <UpgradeBanner />}
    </main>
  );
}
