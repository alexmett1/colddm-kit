import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

function getPeriodEnd(subscription: Stripe.Subscription): Date | null {
  const item = subscription.items?.data?.[0];
  if (item?.current_period_end) {
    return new Date(item.current_period_end * 1000);
  }
  return null;
}

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const clerkUserId = session.metadata?.clerkUserId;

    if (clerkUserId && session.subscription) {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
      );
      const periodEnd = getPeriodEnd(subscription);

      await prisma.userEntitlement.upsert({
        where: { clerkUserId },
        create: {
          clerkUserId,
          isPro: true,
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: subscription.id,
          stripeStatus: subscription.status,
          currentPeriodEnd: periodEnd,
        },
        update: {
          isPro: true,
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: subscription.id,
          stripeStatus: subscription.status,
          currentPeriodEnd: periodEnd,
        },
      });
    }
  }

  if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const clerkUserId = subscription.metadata?.clerkUserId;

    if (clerkUserId) {
      const isActive = ["active", "trialing"].includes(subscription.status);
      const periodEnd = getPeriodEnd(subscription);

      await prisma.userEntitlement.upsert({
        where: { clerkUserId },
        create: {
          clerkUserId,
          isPro: isActive,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripeStatus: subscription.status,
          currentPeriodEnd: periodEnd,
        },
        update: {
          isPro: isActive,
          stripeStatus: subscription.status,
          currentPeriodEnd: periodEnd,
        },
      });
    }
  }

  return NextResponse.json({ received: true });
}
