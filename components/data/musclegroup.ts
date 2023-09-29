export interface MuscleGroup {
    id: number
    name: string
    description: string
    imageUrl: string //Update
}

export const getMuscleGroups: MuscleGroup[] = [
    {
        id: 1,
        name: "Chest",
        description: "Chest muscle",
        imageUrl: 'https://i.ibb.co/ncr2ZtR/chest-img.png'
    },
    {
        id: 2,
        name: "Back",
        description: "Back muscle",
        imageUrl: "https://i.ibb.co/tQwF19F/back-img.png"
    },
    {
        id: 3,
        name: "Lower Back",
        description: "Lower Back muscle",
        imageUrl: "https://i.ibb.co/WnTNVMb/lower-back-img.png"
    },
    {
        id: 4,
        name: "Shoulders",
        description: "Shoulders muscle",
        imageUrl: "https://i.ibb.co/kKBJXJ9/shoulders-img.png"
    },
    {
        id: 5,
        name: "Triceps",
        description: "Triceps muscle",
        imageUrl: "https://i.ibb.co/nRxmPBG/triceps-img.png"
    },
    {
        id: 6,
        name: "Biceps",
        description: "Biceps muscle",
        imageUrl: "https://i.ibb.co/9N0sVD1/biceps-img.png"
    },
    {
        id: 7,
        name: "Abs",
        description: "Abs muscle",
        imageUrl: "https://i.ibb.co/g3XWh6q/abs-img.png"
    },
    {
        id: 8,
        name: "Glute",
        description: "Glute muscle",
        imageUrl: 'https://i.ibb.co/C0cX2JP/glutes-img.png'
    },
    {
        id: 9,
        name: "Calves",
        description: "Calves muscle",
        imageUrl: 'https://i.ibb.co/xLyDB3n/calves-img.png'
    },
    {
        id: 10,
        name: "Hamstrings",
        description: "Hamstrings muscle",
        imageUrl: "https://i.ibb.co/K50N9VD/harmstrings-img.png"
    },
    {
        id: 11,
        name: "Quadriceps",
        description: "Quadriceps muscle",
        imageUrl: 'https://i.ibb.co/GsGJJgT/quadriceps-img.png'
    },
]