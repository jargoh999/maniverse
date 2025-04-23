"use client"

import ImageCard from "@/components/color-pallete-card"
import { motion } from "framer-motion"
import type { NailColor } from "@/lib/types"

interface ColorPaletteProps {
  selectedColor: NailColor | null
  onSelectColor: (color: NailColor) => void
}

const colorOptions: NailColor[] = [
  { id: "pastel-pink", name: "Pastel Pink", hex: "#FFD1DC", type: "solid" },
  { id: "lavender", name: "Lavender", hex: "#E6E6FA", type: "solid" },
  { id: "mint", name: "Mint", hex: "#98FB98", type: "solid" },
  { id: "sky-blue", name: "Sky Blue", hex: "#87CEEB", type: "solid" },
  { id: "peach", name: "Peach", hex: "#FFDAB9", type: "solid" },
  { id: "lilac", name: "Lilac", hex: "#C8A2C8", type: "solid" },
  { id: "coral", name: "Coral", hex: "#FF7F50", type: "solid" },
  { id: "turquoise", name: "Turquoise", hex: "#40E0D0", type: "solid" },
  { id: "glitter-gold", name: "Glitter Gold", hex: "#FFD700", type: "glitter" },
  { id: "glitter-silver", name: "Glitter Silver", hex: "#C0C0C0", type: "glitter" },
  { id: "pearl-white", name: "Pearl White", hex: "#FFFFFF", type: "pearl" },
  { id: "matte-black", name: "Matte Black", hex: "#000000", type: "matte" },
]

export default function ColorPalette({ selectedColor, onSelectColor }: ColorPaletteProps) {
  // Function to generate a data URL for the color swatch
  const generateColorSwatch = (color: NailColor) => {
    const canvas = document.createElement('canvas')
    canvas.width = 400
    canvas.height = 300
    const ctx = canvas.getContext('2d')!

    // Base color fill
    ctx.fillStyle = color.hex
    ctx.fillRect(0, 0, 400, 300)

    // Add texture for special types
    if (color.type === "glitter") {
      ctx.fillStyle = 'rgba(255,255,255,0.3)'
      for (let x = 0; x < 400; x += 20) {
        for (let y = 0; y < 300; y += 20) {
          ctx.fillRect(x, y, 10, 10)
        }
      }
    } else if (color.type === "pearl") {
      const gradient = ctx.createLinearGradient(0, 0, 400, 300)
      gradient.addColorStop(0, 'rgba(255,255,255,0.8)')
      gradient.addColorStop(1, 'rgba(255,255,255,0.2)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 400, 300)
    }

    return canvas.toDataURL()
  }

  return (
    <div className="py-4">
      <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">Select Your Color</h3>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {colorOptions.map((color) => (
          <div
            key={color.id}
            className="cursor-pointer"
          >
            <ImageCard
              imageUrl={generateColorSwatch(color)}
              imageName={color.name}
              isSelected={selectedColor?.id === color.id}
              onSelect={() => onSelectColor(color)}
            />
          </div>
        ))}
      </div>

      {selectedColor && (
        <div className="mt-6 text-center">
          <p className="text-sky-700">
            You selected: <span className="font-semibold">{selectedColor.name}</span>
          </p>
        </div>
      )}
    </div>
  )
}
