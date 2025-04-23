"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { NailShape, NailColor } from "@/lib/types"

interface NailPreviewProps {
  shape: NailShape
  color: NailColor
}

export default function NailPreview({ shape, color }: NailPreviewProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simulate loading the preview
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="py-8">
      <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">Your Nail Design</h3>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md"
        >
          <div className="aspect-square relative">
            <HandWithNailsSVG shape={shape} color={color} />
          </div>
        </motion.div>

        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xs">
          <h4 className="text-xl font-semibold mb-4 text-gray-800">Design Details</h4>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Shape</p>
              <p className="font-medium flex items-center">
                <span className="mr-2">{shape.icon}</span> {shape.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Color</p>
              <div className="flex items-center">
                <div
                  className="w-6 h-6 rounded-full mr-2"
                  style={{
                    backgroundColor: color.hex,
                    backgroundImage:
                      color.type === "glitter"
                        ? "linear-gradient(135deg, rgba(255,255,255,0.4) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.4) 75%, transparent 75%, transparent)"
                        : color.type === "pearl"
                          ? "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 100%)"
                          : "none",
                    backgroundSize: color.type === "glitter" ? "5px 5px" : "100% 100%",
                  }}
                />
                <p className="font-medium">{color.name}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Finish</p>
              <p className="font-medium capitalize">{color.type}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HandWithNailsSVG({ shape, color }: { shape: NailShape; color: NailColor }) {
  // Get the appropriate nail path based on the selected shape
  const getNailPath = (shapeId: string) => {
    switch (shapeId) {
      case "almond":
        return "M0,20 C0,5 10,0 20,0 C30,0 40,5 40,20 L40,60 L0,60 Z"
      case "stiletto":
        return "M0,20 L20,0 L40,20 L40,60 L0,60 Z"
      case "square":
        return "M0,0 L40,0 L40,60 L0,60 Z"
      case "oval":
        return "M0,10 C0,0 10,0 20,0 C30,0 40,0 40,10 L40,60 L0,60 Z"
      case "coffin":
        return "M0,0 L40,0 L35,20 L5,20 L0,0 Z M0,20 L5,20 L5,60 L0,60 Z M35,20 L40,20 L40,60 L35,60 Z M5,60 L35,60 L35,20 L5,20 Z"
      case "round":
        return "M0,10 C0,0 10,0 20,0 C30,0 40,0 40,10 L40,60 L0,60 Z"
      default:
        return "M0,10 C0,0 10,0 20,0 C30,0 40,0 40,10 L40,60 L0,60 Z"
    }
  }

  // Create a pattern for glitter or pearl finishes
  const getPatternId = () => {
    if (color.type === "glitter") return "glitterPattern"
    if (color.type === "pearl") return "pearlPattern"
    return ""
  }

  // Get nail fill style based on color type
  const getNailFill = () => {
    if (color.type === "glitter" || color.type === "pearl") {
      return `url(#${getPatternId()})`
    }
    return color.hex
  }

  return (
    <svg viewBox="0 0 500 500" className="w-full h-full">
      <defs>
        {/* Glitter pattern */}
        <pattern id="glitterPattern" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
          <rect width="10" height="10" fill={color.hex} />
          <circle cx="5" cy="5" r="1" fill="white" opacity="0.5" />
          <circle cx="0" cy="0" r="1" fill="white" opacity="0.5" />
          <circle cx="10" cy="10" r="1" fill="white" opacity="0.5" />
        </pattern>

        {/* Pearl pattern */}
        <linearGradient id="pearlPattern" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.8" />
          <stop offset="50%" stopColor={color.hex} stopOpacity="0.9" />
          <stop offset="100%" stopColor="white" stopOpacity="0.6" />
        </linearGradient>

        {/* Shadow effect */}
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#00000033" />
        </filter>
      </defs>

      {/* Hand SVG */}
      <g transform="translate(100, 50)">
        {/* Palm */}
        <path
          d="M150,400 C100,380 80,300 80,250 C80,200 100,150 150,100 C200,50 250,50 300,100 C350,150 350,200 300,250 C250,300 200,380 150,400 Z"
          fill="#FFDFC4"
          stroke="#E8C4A2"
          strokeWidth="2"
        />

        {/* Thumb */}
        <path
          d="M80,250 C60,230 50,200 60,170 C70,140 90,120 110,130 C130,140 140,170 130,200 C120,230 100,240 80,250 Z"
          fill="#FFDFC4"
          stroke="#E8C4A2"
          strokeWidth="2"
        />

        {/* Fingers with nails */}
        {[
          { x: 150, y: 100, rotation: -10, scale: 0.9, finger: 1 }, // Index finger
          { x: 190, y: 80, rotation: -5, scale: 1, finger: 2 }, // Middle finger
          { x: 230, y: 85, rotation: 0, scale: 0.95, finger: 3 }, // Ring finger
          { x: 270, y: 100, rotation: 5, scale: 0.8, finger: 4 }, // Pinky
        ].map((pos, index) => (
          <g key={index} transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.rotation}) scale(${pos.scale})`}>
            {/* Finger */}
            <path
              d="M0,0 C10,-10 30,-10 40,0 C50,20 50,80 40,100 C30,110 10,110 0,100 C-10,80 -10,20 0,0 Z"
              fill="#FFDFC4"
              stroke="#E8C4A2"
              strokeWidth="2"
            />

            {/* Nail */}
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              transform="translate(0, -5) scale(0.5)"
            >
              <path
                d={getNailPath(shape.id)}
                fill={getNailFill()}
                stroke="#00000033"
                strokeWidth="1"
                filter="url(#shadow)"
              />

              {/* Nail shine effect */}
              <path d="M10,10 C15,5 25,5 30,10 L25,15 C20,10 15,10 10,15 Z" fill="white" opacity="0.3" />
            </motion.g>
          </g>
        ))}
      </g>
    </svg>
  )
}
