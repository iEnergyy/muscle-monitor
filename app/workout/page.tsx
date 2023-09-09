import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { baseNavConfig } from "@/config/base-nav"

export const metadata = {
    title: "Workout",
}

export default function WorkoutPage() {
    return (
        <div>
            <MainNav items={baseNavConfig.mainNav} />
            <Button>Workout</Button>
        </div>
    )
}