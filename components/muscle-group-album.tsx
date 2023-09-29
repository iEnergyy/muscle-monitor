import Image from "next/image"
import { cn } from "@/lib/utils"
import { MuscleGroup } from "./data/musclegroup"
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu"

interface MuscleGroupAlbumProps extends React.HTMLAttributes<HTMLDivElement> {
    muscleGroup: MuscleGroup
    aspectRatio?: "portrait" | "square"
    width?: number
    height?: number
}

export function MuscleGroupAlbum({
    muscleGroup,
    aspectRatio = "portrait",
    width,
    height,
    className,
    ...props
}: MuscleGroupAlbumProps) {
    return (
        <div className={cn("space-y-3", className)} {...props}>
            <ContextMenu>
                <ContextMenuTrigger>
                    <div className="overflow-hidden rounded-md">
                        <Image
                            src={muscleGroup.imageUrl}
                            alt={muscleGroup.description}
                            width={width}
                            height={height}
                            className={cn(
                                "h-auto w-auto object-cover transition-all hover:scale-105",
                                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                            )} />
                    </div>
                </ContextMenuTrigger>

            </ContextMenu>
            <div className="space-y-1 text-sm">
                <h3 className="font-medium leading-none">{muscleGroup.name}</h3>
            </div>
        </div>
    )
}