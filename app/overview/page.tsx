"use client"

import { MainNav } from "@/components/main-nav"
import { Button, buttonVariants } from "@/components/ui/button"
import { baseNavConfig } from "@/config/base-nav"
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"

export const metadata = {
    title: "Overview",
}

export default function OverviewPage() {
    const { isLoaded, isSignedIn, user } = useUser();

    // In case the user signs out while on the page.
    var authMsg = "";
    if (!isLoaded || !isSignedIn) {
        authMsg = "You need to log in to see something here"
    } else {
        authMsg = `Hello, ${user.firstName} welcome to Muscle Monitor.`;
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
                            {/* <SignInButton mode='modal'>
                                <button className='rounded border border-gray-400 px-3 py-0.5'>
                                    Sign in
                                </button>
                            </SignInButton> */}
                            <Link href="/sign-in" className={buttonVariants({ variant: "secondary", size: "sm" })}>Sign in</Link>
                        </SignedOut>
                    </nav>
                </div>
            </header>
            <Button>Overview</Button>
            <section>
                {authMsg}
            </section>
        </div>
    )
}