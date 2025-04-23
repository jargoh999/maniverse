"use client"

import { motion } from "framer-motion"
import { FeatureCard } from "@/components/general-card"
import type { NailShape } from "@/lib/types"

interface NailShapeSelectorProps {
  selectedShape: NailShape | null
  onSelectShape: (shape: NailShape) => void
}

const nailShapes: NailShape[] = [
  { id: "image", name: "Almond", icon: "🔖" },
  { id: "mmm", name: "Stiletto", icon: "📌" },
  { id: "p", name: "Square", icon: "🔲" },
  { id: "sjpeg", name: "Oval", icon: "⭕" },
  { id: "w", name: "Coffin", icon: "⚰️" },
  { id: "round", name: "Round", icon: "🔴" },
]

export default function NailShapeSelector({ selectedShape, onSelectShape }: NailShapeSelectorProps) {
  return (
    <div className="py-4">
      <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">Choose Your Nail Shape</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {nailShapes.map((shape) => (
          <motion.div
            key={shape.id}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            className="transition-all duration-300"
          >
            <FeatureCard
              title={shape.name}
              description={`Elegant ${shape.name.toLowerCase()} style`}
              imageSrc={`/assets/${shape.id}.jpeg`}
              backgroundColor={selectedShape?.id === shape.id ? "#FFF0F5" : "#FAF0E6"}
              buttonText="Select"
              onClick={() => onSelectShape(shape)}
              className={`
                cursor-pointer 
                rounded-2xl 
                transition-all 
                duration-300 
                ease-in-out
                ${selectedShape?.id === shape.id
                  ? "ring-4 ring-pink-400 shadow-xl"
                  : "hover:ring-2 hover:ring-pink-200"}
              `}
            />
          </motion.div>
        ))}
      </div>

      {selectedShape && (
        <div className="mt-6 text-center">
          <p className="text-sky-700">
            You selected: <span className="font-semibold">{selectedShape.name}</span>
          </p>
        </div>
      )}
    </div>
  )
}
