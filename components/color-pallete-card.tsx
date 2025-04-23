import Image from "next/image"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface ImageCardProps {
    imageUrl: string
    imageName: string
    className?: string
    isSelected?: boolean
    onSelect?: () => void
}

export default function ImageCard({
    imageUrl,
    imageName,
    className,
    isSelected = false,
    onSelect
}: ImageCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className={cn(
                "relative max-w-md mx-auto group cursor-pointer",
                className,
                isSelected && "scale-105 transition-transform duration-300"
            )}
            onClick={onSelect}
        >
            <div
                className={cn(
                    "absolute inset-0 rounded-3xl bg-[#a3cef1] translate-x-2 translate-y-1",
                    isSelected && "scale-105 rotate-3 transition-transform duration-300"
                )}
                aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-3xl bg-white">
                <div
                    className="aspect-[4/3] w-full relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={imageName}
                        fill
                        className={cn(
                            "object-cover transition-all duration-300",
                            isHovered && "scale-110",
                            isSelected && "scale-125 rotate-6"
                        )}
                        priority
                    />
                </div>
                <div
                    className={cn(
                        "p-4 bg-white transition-all duration-300",
                        isHovered && "opacity-0 h-0 p-0"
                    )}
                >
                    <h3 className="text-lg font-medium">{imageName}</h3>
                </div>
            </div>
        </div>
    )
}
