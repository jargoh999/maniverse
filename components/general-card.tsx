 "use client"


import Image from "next/image"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
    title: string
    description: string
    imageSrc: string
    backgroundColor: string
    buttonText: string
    onClick?: () => void
    className?: string
}

// export function FeatureCard({
//     title,
//     description,
//     imageSrc,
//     backgroundColor,
//     buttonText,
//     onClick,
//     className,
// }: FeatureCardProps) {
//     return (
//         <div className={cn("flex flex-col overflow-hidden border border-gray-200", className)}>
//             {/* Top colored section with image */}
//             <div className="p-8 flex  border-1 border-black border-b-0 items-center justify-center rounded-t-2xl" style={{ backgroundColor }}>
//                 <div className="w-full max-w-[300px] aspect-square rounded-full overflow-hidden relative">
//                     <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />
//                 </div>
//             </div>

//             {/* Bottom white section with text and button */}
//             <div className="bg-white p-6 flex flex-col items-center border-1 border-black rounded-b-2xl">
//                 <h2 className="text-3xl font-bold text-center mb-2">{title}</h2>
//                 <p className="text-center mb-6">{description}</p>

//                 {/* Button with shadow effect */}
//                 <div className="relative w-full ">
//                     <button
//                         onClick={onClick}
//                         className="w-full py-3 px-4 text-white font-semibold rounded-full bg-[#5A9BC7] hover:bg-[#4A8BB7] transition-colors border-2 border-black relative z-10"
//                     >
//                         {buttonText}
//                     </button>
//                     {/* Shadow effect - exact match to the image */}
//                     <div className="absolute -bottom-2 left-0 right-0 h-[calc(80%-1px)] bg-black rounded-full z-0"></div>
//                 </div>
//             </div>
//         </div>
//     )
// }
export function FeatureCard({
    title,
    description,
    imageSrc,
    backgroundColor,
    buttonText,
    onClick,
    className,
}: FeatureCardProps) {
    return (
        <div className={cn("flex flex-col overflow-hidden border border-gray-200 group", className)}>
            {/* Top colored section with image */}
            <div
                className="p-8 flex border-1 border-black border-b-0 items-center justify-center rounded-t-2xl"
                style={{ backgroundColor }}
            >
                <div
                    className="
                        w-full max-w-full aspect-square
                        rounded-full
                        overflow-hidden
                        relative
                        transition-all duration-40
                        group-hover:rounded-2xl
                    "
                >
                    <Image
                        src={imageSrc || "/placeholder.svg"}
                        alt={title}
                        fill
                        className="object-cover transition-all duration-400"
                    />
                </div>
            </div>

            {/* Bottom white section with text and button */}
            <div className="bg-white p-6 flex flex-col items-center border-1 border-black rounded-b-2xl">
                <h2 className="text-3xl font-bold text-center mb-2">{title}</h2>
                <p className="text-center mb-6">{description}</p>
                {/* Button with shadow effect */}
                <div className="relative w-full ">
                    <button
                        onClick={onClick}
                        className="w-full py-3 px-4 text-white font-semibold rounded-full bg-[#5A9BC7] hover:bg-[#4A8BB7] transition-colors border-2 border-black relative z-10"
                    >
                        {buttonText}
                    </button>
                    {/* Shadow effect - exact match to the image */}
                    <div className="absolute -bottom-2 left-0 right-0 h-[calc(80%-1px)] bg-black rounded-full z-0"></div>
                </div>
            </div>
        </div>
    )
}
