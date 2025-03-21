"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text3D, Center } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Laptop, Code, Palette, Sparkles } from "lucide-react"
import Particles from "@/components/particles"

interface Banner3DProps {
  text: string;
  color: string;
}

const Banner3D = ({ text, color }: Banner3DProps) => {
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={1}
          height={0.2}
          curveSegments={12}
        >
          {text}
          <meshStandardMaterial color={color} />
        </Text3D>
      </Center>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
    </Canvas>
  )
}

export default function Home() {
  const [bannerBg, setBannerBg] = useState("#0f172a")
  const [bannerText, setBannerText] = useState("Web Development is Amazing!")
  const [textColor, setTextColor] = useState("#ffffff")
  const [iconType, setIconType] = useState("laptop")
  const [iconSize, setIconSize] = useState(64)
  const [is3D, setIs3D] = useState(false)
  const [textAnimation, setTextAnimation] = useState("fade")

  // Particles state
  const [particlesEnabled, setParticlesEnabled] = useState(true)
  const [particleCount, setParticleCount] = useState(50)
  const [particleColors, setParticleColors] = useState(["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"])
  const [customColor, setCustomColor] = useState("#ff9900")
  const [particleSpeed, setParticleSpeed] = useState(1)
  const [particleSize, setParticleSize] = useState(3)

  const getIcon = () => {
    switch (iconType) {
      case "laptop":
        return <Laptop size={iconSize} color={textColor} />
      case "code":
        return <Code size={iconSize} color={textColor} />
      case "palette":
        return <Palette size={iconSize} color={textColor} />
      default:
        return <Laptop size={iconSize} color={textColor} />
    }
  }

  const addParticleColor = () => {
    if (customColor && !particleColors.includes(customColor)) {
      setParticleColors([...particleColors, customColor])
    }
  }

  const removeParticleColor = (colorToRemove: string) => {
    if (particleColors.length > 1) {
      setParticleColors(particleColors.filter((color) => color !== colorToRemove))
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Banner */}
      <div
        className="w-full py-16 px-4 flex flex-col items-center justify-center gap-6 transition-all duration-300 relative overflow-hidden"
        style={{ backgroundColor: bannerBg }}
      >
        <Particles 
          count={particleCount} 
          colors={particleColors} 
          enabled={particlesEnabled} 
          speed={particleSpeed}
          size={particleSize}
        />

        <motion.div 
          className="z-10"
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          {iconType === 'laptop' ? (
            <Laptop size={iconSize} color={textColor} />
          ) : iconType === 'code' ? (
            <Code size={iconSize} color={textColor} />
          ) : iconType === 'palette' ? (
            <Palette size={iconSize} color={textColor} />
          ) : (
            <Laptop size={iconSize} color={textColor} />
          )}
        </motion.div>

        {is3D ? (
          <div className="h-[200px] w-full z-10">
            <Banner3D text={bannerText} color={textColor} />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.h1
              key={bannerText}
              className="text-4xl md:text-5xl font-bold text-center z-10"
              style={{ color: textColor }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {bannerText}
            </motion.h1>
          </AnimatePresence>
        )}
      </div>

      {/* Controls */}
      <div className="container mx-auto p-6 max-w-5xl">
        <div className="bg-card border rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Customize the Banner</h2>

          <div className="space-y-6">
            {/* Banner Text */}
            <div className="space-y-2">
              <Label htmlFor="banner-text">Banner Text</Label>
              <Input
                id="banner-text"
                value={bannerText}
                onChange={(e) => setBannerText(e.target.value)}
                placeholder="Enter banner text"
              />
            </div>

            {/* Background Color */}
            <div className="space-y-2">
              <Label htmlFor="bg-color">Background Color</Label>
              <div className="flex gap-3">
                <Input
                  id="bg-color"
                  type="color"
                  value={bannerBg}
                  onChange={(e) => setBannerBg(e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input value={bannerBg} onChange={(e) => setBannerBg(e.target.value)} className="flex-1" />
              </div>
            </div>

            {/* Text Color */}
            <div className="space-y-2">
              <Label htmlFor="text-color">Text Color</Label>
              <div className="flex gap-3">
                <Input
                  id="text-color"
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input value={textColor} onChange={(e) => setTextColor(e.target.value)} className="flex-1" />
              </div>
            </div>

            {/* Icon Type */}
            <div className="space-y-2">
              <Label>Icon Type</Label>
              <RadioGroup value={iconType} onValueChange={setIconType} className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="laptop" id="laptop" />
                  <Label htmlFor="laptop" className="flex items-center gap-1">
                    <Laptop size={16} /> Laptop
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="code" id="code" />
                  <Label htmlFor="code" className="flex items-center gap-1">
                    <Code size={16} /> Code
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="palette" id="palette" />
                  <Label htmlFor="palette" className="flex items-center gap-1">
                    <Palette size={16} /> Palette
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Icon Size */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="icon-size">Icon Size: {iconSize}px</Label>
              </div>
              <Slider
                id="icon-size"
                min={24}
                max={128}
                step={4}
                value={[iconSize]}
                onValueChange={(value) => setIconSize(value[0])}
              />
            </div>

            {/* Display Mode */}
            <div className="space-y-2">
              <Label>Display Mode</Label>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch checked={is3D} onCheckedChange={setIs3D} />
                  <Label>3D Mode</Label>
                </div>
              </div>
            </div>

            {/* Particles Section */}
            <div className="border-t pt-4 mt-6">
              <h3 className="text-xl font-semibold mb-4">Enhanced Particles</h3>

              {/* Enable/Disable Particles */}
              <div className="flex items-center justify-between mb-4">
                <Label htmlFor="particles-toggle">Enable Particles</Label>
                <Switch id="particles-toggle" checked={particlesEnabled} onCheckedChange={setParticlesEnabled} />
              </div>

              {/* Particle Settings */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="particle-count">Particle Count: {particleCount}</Label>
                  <Slider
                    id="particle-count"
                    min={10}
                    max={200}
                    step={5}
                    value={[particleCount]}
                    onValueChange={(value) => setParticleCount(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="particle-speed">Particle Speed: {particleSpeed}x</Label>
                  <Slider
                    id="particle-speed"
                    min={0.1}
                    max={3}
                    step={0.1}
                    value={[particleSpeed]}
                    onValueChange={(value) => setParticleSpeed(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="particle-size">Particle Size: {particleSize}px</Label>
                  <Slider
                    id="particle-size"
                    min={1}
                    max={10}
                    step={0.5}
                    value={[particleSize]}
                    onValueChange={(value) => setParticleSize(value[0])}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="particle-count">Particle Count: {particleCount}</Label>
                  <Slider
                    id="particle-count"
                    min={10}
                    max={200}
                    step={5}
                    value={[particleCount]}
                    onValueChange={(value) => setParticleCount(value[0])}
                    disabled={!particlesEnabled}
                  />
                </div>
              </div>

              {/* Particle Colors */}
              <div className="space-y-2">
                <Label>Particle Colors</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {particleColors.map((color, index) => (
                    <div key={index} className="flex items-center rounded-full overflow-hidden border">
                      <div className="w-6 h-6" style={{ backgroundColor: color }} />
                      <button
                        onClick={() => removeParticleColor(color)}
                        className="px-2 py-1 text-xs hover:bg-muted"
                        disabled={particleColors.length <= 1}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add new color */}
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="w-16 h-10 p-1"
                    disabled={!particlesEnabled}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addParticleColor}
                    disabled={!particlesEnabled}
                    className="flex-1"
                  >
                    Add Color
                  </Button>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <Button
              variant="outline"
              onClick={() => {
                setBannerBg("#0f172a")
                setBannerText("Web Development is Amazing!")
                setTextColor("#ffffff")
                setIconType("laptop")
                setIconSize(64)
                setParticlesEnabled(true)
                setParticleCount(50)
                setParticleColors(["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"])
              }}
              className="w-full mt-2"
            >
              Reset to Default
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
