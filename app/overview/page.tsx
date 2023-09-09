import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { baseNavConfig } from "@/config/base-nav"

export const metadata = {
    title: "Overview",
}

export default function OverviewPage() {
    return (
        <div>
            <MainNav items={baseNavConfig.mainNav} />
            <Button>Overview</Button>
        </div>
    )
}