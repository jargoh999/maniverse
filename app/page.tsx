"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import NailShapeSelector from "@/components/nail-shape-selector"
import ColorPalette from "@/components/color-palette"
import NailPreview from "@/components/nail-preview"
import SummaryView from "@/components/summary-view"
import type { NailShape, NailColor } from "@/lib/types"

export default function Home() {
  const [selectedShape, setSelectedShape] = useState<NailShape | null>(null)
  const [selectedColor, setSelectedColor] = useState<NailColor | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("shapes")

  // Load saved selections from localStorage on initial render
  useEffect(() => {
    const savedShape = localStorage.getItem("selectedShape")
    const savedColor = localStorage.getItem("selectedColor")

    if (savedShape) {
      setSelectedShape(JSON.parse(savedShape))
    }

    if (savedColor) {
      setSelectedColor(JSON.parse(savedColor))
    }
  }, [])

  // Save selections to localStorage when they change
  useEffect(() => {
    if (selectedShape) {
      localStorage.setItem("selectedShape", JSON.stringify(selectedShape))
    }

    if (selectedColor) {
      localStorage.setItem("selectedColor", JSON.stringify(selectedColor))
    }
  }, [selectedShape, selectedColor])

  const handleShapeSelect = (shape: NailShape) => {
    setIsLoading(true)
    setSelectedShape(shape)

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      setActiveTab("colors")
    }, 800)
  }

  const handleColorSelect = (color: NailColor) => {
    setIsLoading(true)
    setSelectedColor(color)

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      setActiveTab("preview")
    }, 800)
  }

  const handleReset = () => {
    setSelectedShape(null)
    setSelectedColor(null)
    setActiveTab("shapes")
  }

  return (
    <main className="min-h-screen bg-[#a3cef1]">
      <header className="container mx-auto p-4 flex justify-between items-center border-b-1 border-black ">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-rose-500 to-pink-600 tracking-wider drop-shadow-[0_2px_2px_rgba(190,100,150,0.3)]">Maniverse</h1>
        <div className="relative w-fit">
          <button
            onClick={handleReset}
            className="w-fit py-3 px-4 text-white font-semibold rounded-full bg-[#5A9BC7] hover:bg-[#4A8BB7] transition-colors border-2 border-black relative z-10"
          >
            Start Over
          </button>
          {/* Shadow effect - exact match to the image */}
          <div className="absolute -bottom-2 left-0 right-0 h-[calc(80%-1px)] bg-black rounded-full z-0"></div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-rose-500 to-pink-600 mb-4">Nail Your Style</h2>
            <p className="text-xl text-gray-600 font-light tracking-wide">Transform your nails into a masterpiece with just a few taps!</p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-transparent gap-4 p-2">
              <TabsTrigger
                value="shapes"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-rose-500 data-[state=active]:text-white 
                  bg-white/50 hover:bg-white/70 
                  text-gray-800 
                  py-3 px-4 
                  rounded-full 
                  font-semibold 
                  transition-all 
                  duration-300 
                  border border-gray-200 
                  hover:shadow-md 
                  data-[state=active]:border-transparent"
              >
                Nail Shapes
              </TabsTrigger>
              <TabsTrigger
                value="colors"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-rose-500 data-[state=active]:text-white 
                  bg-white/50 hover:bg-white/70 
                  text-gray-800 
                  py-3 px-4 
                  rounded-full 
                  font-semibold 
                  transition-all 
                  duration-300 
                  border border-gray-200 
                  hover:shadow-md 
                  data-[state=active]:border-transparent"
              >
                Color Palette
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-rose-500 data-[state=active]:text-white 
                  bg-white/50 hover:bg-white/70 
                  text-gray-800 
                  py-3 px-4 
                  rounded-full 
                  font-semibold 
                  transition-all 
                  duration-300 
                  border border-gray-200 
                  hover:shadow-md 
                  data-[state=active]:border-transparent"
              >
                Your Design
              </TabsTrigger>
            </TabsList>

            <Card className="border-pink-200 shadow-lg">
              <CardContent className="p-6 bg-gradient-to-br from-white via-pink-50 to-white">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-center items-center py-20"
                    >
                      <Loader2 className="h-12 w-12 text-pink-500 animate-spin" />
                    </motion.div>
                  ) : (
                    <>
                      <TabsContent value="shapes" className="mt-0">
                        <NailShapeSelector selectedShape={selectedShape} onSelectShape={handleShapeSelect} />
                      </TabsContent>

                      <TabsContent value="colors" className="mt-0">
                        <ColorPalette selectedColor={selectedColor} onSelectColor={handleColorSelect} />
                      </TabsContent>

                      <TabsContent value="preview" className="mt-0">
                        {selectedShape && selectedColor ? (
                          <NailPreview shape={selectedShape} color={selectedColor} />
                        ) : (
                          <div className="text-center py-10">
                            <p className="text-gray-500">Please select a nail shape and color first.</p>
                            <Button onClick={() => setActiveTab("shapes")} className="mt-4 bg-sky-500 hover:bg-sky-600">
                              Start Designing
                            </Button>
                          </div>
                        )}
                      </TabsContent>
                    </>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </Tabs>

          {selectedShape && selectedColor && activeTab === "preview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8"
            >
              <SummaryView shape={selectedShape} color={selectedColor} />
              <div className="flex justify-center mt-6">
                <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  Save My Design
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  )
}
