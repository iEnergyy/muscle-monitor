import { getMuscleGroups } from "@/components/data/musclegroup";
import { MainNav } from "@/components/main-nav";
import { MuscleGroupAlbum } from "@/components/muscle-group-album";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { baseNavConfig } from "@/config/base-nav";
import { muscleGroup } from "@/db/schema";
import { SignedIn, UserButton, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export const metadata = {
  title: "Workout",
};

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
      <div className="container z-40 bg-background py-6 lg:py-10">
        <SignedIn>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Muscle groups
              </h2>
              <p className="text-sm text-muted-foreground">
                Showing existing muscle groups. Add if needed.
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="relative">
            <ScrollArea>
              <div className="grid grid-flow-col grid-rows-2 gap-4">
                {getMuscleGroups.map((muscleGroup) => (
                  <MuscleGroupAlbum
                    key={muscleGroup.name}
                    muscleGroup={muscleGroup}
                    className="w-[200px] rounded border-2 p-4 max-sm:w-[120px]"
                    aspectRatio="portrait"
                    width={250}
                    height={330}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </SignedIn>
        <SignedOut>
          <section>You need to log in to see something</section>
        </SignedOut>
      </div>
    </div>
  );
}
