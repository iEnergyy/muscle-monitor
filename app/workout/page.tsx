import { MainNav } from "@/components/main-nav"
import { Button, buttonVariants } from "@/components/ui/button"
import { baseNavConfig } from "@/config/base-nav"
import { SignedIn, UserButton, SignedOut } from "@clerk/nextjs"
import { Link } from "lucide-react"

export const metadata = {
    title: "Workout",
}

export default function WorkoutPage() {
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
                            <Link href="/sign-in" className={buttonVariants({ variant: "secondary", size: "sm" })}>Sign in</Link>
                        </SignedOut>
                    </nav>
                </div>
            </header>
            <Button>Workout</Button>
        </div>
    )
}