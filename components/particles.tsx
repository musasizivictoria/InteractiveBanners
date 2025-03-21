"use client"

import { useEffect, useState } from "react"

interface ParticlesProps {
  count: number
  colors: string[]
  enabled: boolean
  speed?: number
  size?: number
}

export default function Particles({ count, colors, enabled, speed = 1, size = 3 }: ParticlesProps) {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      color: string
      speed: number
      rotation: number
      rotationSpeed: number
    }>
  >([])

  useEffect(() => {
    if (!enabled) {
      setParticles([])
      return
    }

    // Create initial particles
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage across screen
      y: -10 - Math.random() * 10, // start above the viewport
      size: size * (1 + Math.random()),
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: speed * (0.5 + Math.random()),
      rotation: Math.random() * 360,
      rotationSpeed: -1 + Math.random() * 2,
    }))

    setParticles(newParticles)

    // Animation loop
    const interval = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          // Move particle down
          const y = particle.y + particle.speed
          const rotation = (particle.rotation + particle.rotationSpeed) % 360

          // Reset particle if it's gone off screen
          if (y > 110) {
            return {
              ...particle,
              y: -10 - Math.random() * 10,
              x: Math.random() * 100,
              color: colors[Math.floor(Math.random() * colors.length)],
            }
          }

          return { ...particle, y, rotation }
        }),
      )
    }, Math.max(16, 50 / speed))

    return () => clearInterval(interval)
  }, [count, colors, enabled])

  if (!enabled || particles.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
            transform: `rotate(${particle.rotation}deg)`,
            opacity: 0.7 + Math.random() * 0.3,
            transition: "transform 0.5s linear",
          }}
        />
      ))}
    </div>
  )
}

