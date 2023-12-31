import { MainNav } from "@/components/main-nav";
import { Button, buttonVariants } from "@/components/ui/button";
import { baseNavConfig } from "@/config/base-nav";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import Link from "next/link";

export const metadata = {
  title: "Overview",
};

export default async function OverviewPage() {
  const user: User | null = await currentUser();

  // In case the user signs out while on the page.
  let authMsg = "";
  if (!user) {
    authMsg = "You need to log in to see something here";
  } else {
    authMsg = `Hello, ${user?.firstName} welcome to Muscle Monitor.`;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={baseNavConfig.mainNav} />
          <nav>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link
                href="/sign-in"
                className={buttonVariants({ variant: "secondary", size: "sm" })}
              >
                Sign in
              </Link>
            </SignedOut>
          </nav>
        </div>
      </header>
      <Button>Overview</Button>
      <section>{authMsg}</section>
    </div>
  );
}
