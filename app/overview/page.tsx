import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { baseNavConfig } from "@/config/base-nav"

export const metadata = {
    title: "Overview",
}

export default function OverviewPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="container z-40 bg-background">
                <div className="flex h-20 items-center justify-between py-6">
                    <MainNav items={baseNavConfig.mainNav} />
                </div>
            </header>
            <Button>Overview</Button>
        </div>
    )
}