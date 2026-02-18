import { prisma } from "./prisma";

export async function getEntitlement(clerkUserId: string) {
  return prisma.userEntitlement.findUnique({
    where: { clerkUserId },
  });
}

export async function isPro(clerkUserId: string): Promise<boolean> {
  const ent = await getEntitlement(clerkUserId);
  if (!ent || !ent.isPro) return false;
  if (ent.currentPeriodEnd && ent.currentPeriodEnd < new Date()) return false;
  return true;
}
