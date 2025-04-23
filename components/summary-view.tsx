"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { NailShape, NailColor } from "@/lib/types"

interface SummaryViewProps {
  shape: NailShape
  color: NailColor
}

export default function SummaryView({ shape, color }: SummaryViewProps) {
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

  // Get nail fill style based on color type
  const getNailFill = () => {
    if (color.type === "glitter") return `url(#glitterPattern)`
    if (color.type === "pearl") return `url(#pearlPattern)`
    return color.hex
  }

  return (
    <Card className="border-sky-200 shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-sky-100 to-pink-100 pb-2">
        <CardTitle className="text-xl text-center text-gray-800">Your Design Summary</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Selected Options</h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Nail Shape</p>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{shape.icon}</span>
                  <span className="font-medium">{shape.name}</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Nail Color</p>
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
                  <span className="font-medium">{color.name}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Finish Type</p>
              <p className="font-medium capitalize">{color.type}</p>
              <p className="text-sm text-gray-500 mt-2">
                {color.type === "glitter"
                  ? "Sparkly finish with reflective particles"
                  : color.type === "pearl"
                    ? "Iridescent finish with a subtle shimmer"
                    : color.type === "matte"
                      ? "Non-reflective finish with a velvety appearance"
                      : "Classic glossy finish"}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-gray-500 mb-4">Your beautiful design</p>
              <div className="inline-block p-4 bg-gray-50 rounded-lg">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <defs>
                    {/* Glitter pattern */}
                    <pattern
                      id="glitterPattern"
                      patternUnits="userSpaceOnUse"
                      width="10"
                      height="10"
                      patternTransform="rotate(45)"
                    >
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
                      <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#00000033" />
                    </filter>
                  </defs>

                  {/* Single nail for summary */}
                  <g transform="translate(40, 30)">
                    <path
                      d={getNailPath(shape.id)}
                      fill={getNailFill()}
                      stroke="#00000033"
                      strokeWidth="1"
                      filter="url(#shadow)"
                    />

                    {/* Nail shine effect */}
                    <path d="M10,10 C15,5 25,5 30,10 L25,15 C20,10 15,10 10,15 Z" fill="white" opacity="0.3" />
                  </g>
                </svg>
              </div>
            </motion.div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">Share your design</p>
              <div className="flex justify-center space-x-4 mt-2">
                <button className="text-2xl">📱</button>
                <button className="text-2xl">📧</button>
                <button className="text-2xl">📸</button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
