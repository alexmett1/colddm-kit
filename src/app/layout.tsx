import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ColdDM Kit",
  description: "Generate personalized cold outreach messages that actually get replies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <nav className="border-b border-border">
            <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
              <Link href="/" className="text-xl font-bold tracking-tight">
                ColdDM <span className="text-accent">Kit</span>
              </Link>
              <div className="flex items-center gap-5 text-sm font-medium">
                <Link href="/generator" className="hover:text-accent transition-colors">
                  Generator
                </Link>
                <Link href="/history" className="hover:text-accent transition-colors">
                  History
                </Link>
                <Link href="/pricing" className="hover:text-accent transition-colors">
                  Pricing
                </Link>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="rounded-full border border-border px-4 py-1.5 transition-colors hover:border-accent hover:text-accent">
                      Sign in
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <Link
                    href="/pricing"
                    className="rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-accent-dark"
                  >
                    Upgrade
                  </Link>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
