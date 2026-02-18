import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isPro } from "@/lib/entitlements";
import { generateMock } from "@/lib/generateMock";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userIsPro = await isPro(userId);
    if (!userIsPro) {
      return NextResponse.json(
        { error: "Pro subscription required", upgrade: "/pricing" },
        { status: 402 },
      );
    }

    const body = await request.json();
    const { prospectInfo, offer, tone, platform } = body;

    if (!prospectInfo || !offer) {
      return NextResponse.json(
        { error: "prospectInfo and offer are required" },
        { status: 400 },
      );
    }

    // Simulate network delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Swap this function call with a real AI API call later
    const result = generateMock({ prospectInfo, offer, tone, platform });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate messages" },
      { status: 500 },
    );
  }
}
