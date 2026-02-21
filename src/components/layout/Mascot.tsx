"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { usePathname } from "next/navigation"
import { Heart } from "lucide-react"

type Expression = "happy" | "wink" | "cool" | "surprised" | "determined" | "bitten"

const COMMENTS = {
  default: [
    "Stay frosty! You're doing great!",
    "Percentile 100 is just a few study sessions away!",
    "Ready to freeze the competition?",
    "Your brain is getting sharper! I can feel it!",
  ],
  strategy: [
    "Precision is my middle name. Well, it's actually Strawberry.",
    "Order of Operations is basically a recipe for success!",
    "Accuracy > Speed. Don't rush, or you'll get a brain freeze!",
  ],
  study: [
    "Vocabulary is the spice of life. And I'm the dessert!",
    "Synonyms are just friends who look different!",
    "Master the patterns, master the world.",
  ],
  quiz: [
    "Focus mode: ACTIVATED. Let's get that 250!",
    "One question at a time! Keep your cool.",
    "Mistakes are just flavor text. Keep going!",
  ],
}

export function Mascot() {
  const pathname = usePathname()
  const [message, setMessage] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [expression, setExpression] = useState<Expression>("happy")
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })
  const [isBlinking, setIsBlinking] = useState(false)
  const [isDripping, setIsDripping] = useState(false)
  const [isBitten, setIsBitten] = useState(false)

  const dripControls = useAnimation()

  const getPageContext = useCallback(() => {
    if (pathname.includes("/quiz")) return "quiz"
    if (pathname.includes("/study")) return "study"
    if (pathname.includes("/strategy")) return "strategy"
    return "default"
  }, [pathname])

  const getRandomComment = useCallback(() => {
    const context = getPageContext()
    const list = COMMENTS[context as keyof typeof COMMENTS] || COMMENTS.default
    const randomIndex = Math.floor(Math.random() * list.length)
    return list[randomIndex]
  }, [getPageContext])

  const handleClick = () => {
    if (isBitten) return // Prevent multiple bites at once

    setMessage(getRandomComment())
    setIsVisible(true)
    setIsBitten(true)
    setExpression("surprised")

    // Recover from bite after 2 seconds
    setTimeout(() => {
      setIsBitten(false)
      setExpression("happy")
    }, 2000)

    // Hide message after 4 seconds
    setTimeout(() => {
      setIsVisible(false)
    }, 4000)
  }

  // Blinking loop
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }, 4000 + Math.random() * 3000)
    return () => clearInterval(blinkInterval)
  }, [])

  // Look around loop
  useEffect(() => {
    const lookInterval = setInterval(() => {
      if (!isDripping && !isBitten) {
        const x = (Math.random() - 0.5) * 8
        const y = (Math.random() - 0.5) * 6
        setEyeOffset({ x, y })
        setTimeout(() => setEyeOffset({ x: 0, y: 0 }), 1200)
      }
    }, 5000)
    return () => clearInterval(lookInterval)
  }, [isDripping, isBitten])

  // Drip loop
  useEffect(() => {
    const dripRoutine = async () => {
      if (isBitten) return
      setIsDripping(true)
      // Look down at drip
      setEyeOffset({ x: 0, y: 10 })
      
      await dripControls.start({
        y: 140,
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1.2, 1.4, 0.8],
        transition: { duration: 2.5, ease: "easeIn" }
      })
      
      // Reset
      setEyeOffset({ x: 0, y: 0 })
      setIsDripping(false)
      dripControls.set({ y: 0, opacity: 0 })
    }

    const interval = setInterval(dripRoutine, 12000)
    return () => clearInterval(interval)
  }, [dripControls, isBitten])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("Hi! I'm Pops. Ready for 250/250?")
      setIsVisible(true)
      setTimeout(() => setIsVisible(false), 5000)
    }, 2000)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div className="fixed bottom-24 right-8 z-[60] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 bg-white p-4 rounded-[2.5rem] shadow-2xl border-4 border-pink-200 max-w-[220px] text-sm font-black text-pink-600 relative pointer-events-auto text-center"
          >
            {message}
            <div className="absolute -bottom-2 right-10 w-4 h-4 bg-white border-r-4 border-b-4 border-pink-200 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="cursor-pointer pointer-events-auto relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: isBitten ? [0, 10, 0] : [0, -10, 0],
          rotate: isBitten ? [0, -5, 0] : 0
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        onClick={handleClick}
      >
        <svg
          width="140"
          height="180"
          viewBox="0 0 100 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          <defs>
            <clipPath id="popsicleClip">
              <path d="M15 40C15 20 30 10 50 10C70 10 85 20 85 40V95C85 103 78 110 70 110H30C22 110 15 103 15 95V40Z" />
            </clipPath>
          </defs>

          {/* Wooden Stick (Inserted look) */}
          <g>
            <rect x="42" y="100" width="16" height="35" rx="8" fill="#E6BA95" stroke="#1A1A1A" strokeWidth="3" />
            <path d="M42 110C42 110 45 105 50 105C55 105 58 110 58 110" stroke="#1A1A1A" strokeWidth="2" opacity="0.3" />
          </g>

          {/* Main Body Group with Bite Clip */}
          <g>
            {/* Base Body (Vanilla) */}
            <path
              d="M15 40C15 20 30 10 50 10C70 10 85 20 85 40V95C85 103 78 110 70 110H30C22 110 15 103 15 95V40Z"
              fill="white"
              stroke="#1A1A1A"
              strokeWidth="4"
            />

            {/* Pink Melting Top (Enhanced Graphics) */}
            <path
              d="M15 40C15 20 30 10 50 10C70 10 85 20 85 40V75C85 75 78 85 70 78C62 71 55 92 45 80C35 68 25 88 15 75V40Z"
              fill="#FF85C0"
              stroke="#1A1A1A"
              strokeWidth="4"
            />

            {/* Bite Mark - Only visible when isBitten is true */}
            <AnimatePresence>
              {isBitten && (
                <motion.path
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  d="M85 30C78 30 75 35 75 40C75 45 78 50 85 50C85 50 80 55 80 60C80 65 85 70 85 70V30Z"
                  fill="hsl(var(--background))"
                  stroke="#1A1A1A"
                  strokeWidth="3"
                />
              )}
            </AnimatePresence>

            {/* Face Group (Shifted higher) */}
            <motion.g animate={{ x: eyeOffset.x, y: eyeOffset.y - (isBitten ? 2 : 0) }}>
              {/* Blushing Cheeks */}
              <circle cx="28" cy="65" r="6" fill="#FF85C0" fillOpacity="0.5" />
              <circle cx="72" cy="65" r="6" fill="#FF85C0" fillOpacity="0.5" />

              {/* Eyes (Sparkling & Kawaii) */}
              <g>
                {isBlinking ? (
                  <>
                    <path d="M25 55Q32.5 50 40 55" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" fill="none" />
                    <path d="M60 55Q67.5 50 75 55" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" fill="none" />
                  </>
                ) : (
                  <>
                    {/* Left Eye */}
                    <g transform="translate(32, 55)">
                      <circle r="10" fill="#1A1A1A" />
                      <circle cx="-3" cy="-4" r="4" fill="white" />
                      <circle cx="4" cy="4" r="2" fill="white" />
                      {/* Eyelashes */}
                      <path d="M-12 -5L-8 -2" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M-13 2L-9 2" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
                    </g>

                    {/* Right Eye */}
                    <g transform="translate(68, 55)">
                      <circle r="10" fill="#1A1A1A" />
                      <circle cx="-3" cy="-4" r="4" fill="white" />
                      <circle cx="4" cy="4" r="2" fill="white" />
                      {/* Eyelashes */}
                      <path d="M12 -5L8 -2" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M13 2L9 2" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
                    </g>
                  </>
                )}
              </g>

              {/* Mouth (Shifted higher) */}
              <motion.path
                animate={{
                  d: isBitten 
                    ? "M44 72Q50 82 56 72" // Surprised/Ouch mouth
                    : "M46 68Q50 72 54 68"  // Cute smile
                }}
                stroke="#1A1A1A"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </motion.g>

            {/* Drip Animation (More Obvious) */}
            <motion.path
              animate={dripControls}
              initial={{ opacity: 0 }}
              d="M35 85C35 95 40 100 45 100C50 100 55 95 55 85C55 75 35 75 35 85Z"
              fill="#FF85C0"
              stroke="#1A1A1A"
              strokeWidth="2"
            />
          </g>

          {/* Body Highlights */}
          <rect x="22" y="18" width="12" height="5" rx="3" fill="white" fillOpacity="0.4" />
          <circle cx="75" cy="25" r="3" fill="white" fillOpacity="0.3" />
        </svg>

        {/* Floating Heart Effect */}
        <AnimatePresence>
          {!isBitten && expression === "happy" && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -40 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-10 left-1/2 -translate-x-1/2"
            >
              <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
