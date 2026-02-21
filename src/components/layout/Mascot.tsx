"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { usePathname } from "next/navigation"
import { Heart } from "lucide-react"

type Expression = "happy" | "wink" | "cool" | "surprised" | "determined"

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
    setMessage(getRandomComment())
    setIsVisible(true)
    setExpression("cool")
    setTimeout(() => {
      setIsVisible(false)
      setExpression(getPageContext() === "quiz" ? "determined" : "happy")
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
      if (!isDripping) {
        const x = (Math.random() - 0.5) * 6
        const y = (Math.random() - 0.5) * 4
        setEyeOffset({ x, y })
        setTimeout(() => setEyeOffset({ x: 0, y: 0 }), 1000)
      }
    }, 5000)
    return () => clearInterval(lookInterval)
  }, [isDripping])

  // Drip loop
  useEffect(() => {
    const dripRoutine = async () => {
      setIsDripping(true)
      // Look down at drip
      setEyeOffset({ x: 0, y: 8 })
      
      await dripControls.start({
        y: 120,
        opacity: [1, 1, 0],
        scale: [1, 1.2, 0.8],
        transition: { duration: 2, ease: "easeIn" }
      })
      
      // Reset
      setEyeOffset({ x: 0, y: 0 })
      setIsDripping(false)
      dripControls.set({ y: 0, opacity: 0 })
    }

    const interval = setInterval(() => {
      dripRoutine()
    }, 15000)
    
    return () => clearInterval(interval)
  }, [dripControls])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("Hi! I'm Pops. Let's crush this CUET!")
      setIsVisible(true)
      setTimeout(() => setIsVisible(false), 5000)
    }, 2000)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div className="fixed bottom-20 right-8 z-[60] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 bg-white p-4 rounded-[2rem] shadow-2xl border-4 border-pink-200 max-w-[220px] text-sm font-black text-pink-600 relative pointer-events-auto"
          >
            {message}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r-4 border-b-4 border-pink-200 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="cursor-pointer pointer-events-auto relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -8, 0],
          rotate: isDripping ? [0, 5, 0] : 0
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        onClick={handleClick}
      >
        {/* Floating FX - Hearts */}
        <AnimatePresence>
          {expression === "happy" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -top-10 -right-4"
            >
              <Heart className="w-6 h-6 text-pink-400 fill-pink-400 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>

        <svg
          width="120"
          height="160"
          viewBox="0 0 100 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          {/* Main Body Base (Vanilla) */}
          <path
            d="M15 40C15 20 30 10 50 10C70 10 85 20 85 40V95C85 103 78 110 70 110H30C22 110 15 103 15 95V40Z"
            fill="white"
            stroke="#1A1A1A"
            strokeWidth="4"
          />

          {/* Pink Melting Top */}
          <path
            d="M15 40C15 20 30 10 50 10C70 10 85 20 85 40V70C85 70 75 85 65 75C55 65 45 90 35 75C25 60 15 75 15 70V40Z"
            fill="#FF85C0"
            stroke="#1A1A1A"
            strokeWidth="4"
          />

          {/* Drip Animation */}
          <motion.path
            animate={dripControls}
            initial={{ opacity: 0 }}
            d="M35 85C35 90 38 95 42 95C46 95 49 90 49 85C49 80 35 80 35 85Z"
            fill="#FF85C0"
            stroke="#1A1A1A"
            strokeWidth="2"
          />

          {/* Wooden Stick */}
          <g>
            <rect x="42" y="110" width="16" height="30" rx="8" fill="#F3D5B5" stroke="#1A1A1A" strokeWidth="4" />
            {/* Heart on stick */}
            <path
              d="M50 130C50 130 46 126 46 124C46 122 48 122 50 124C52 122 54 122 54 124C54 126 50 130 50 130Z"
              fill="#FF4D8D"
            />
          </g>

          {/* Face Group */}
          <motion.g animate={{ x: eyeOffset.x, y: eyeOffset.y }}>
            {/* Blushing Cheeks */}
            <circle cx="28" cy="85" r="5" fill="#FF85C0" fillOpacity="0.6" />
            <circle cx="72" cy="85" r="5" fill="#FF85C0" fillOpacity="0.6" />

            {/* Eyes */}
            <g>
              {isBlinking ? (
                <>
                  <line x1="25" y1="70" x2="40" y2="70" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
                  <line x1="60" y1="70" x2="75" y2="70" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
                </>
              ) : (
                <>
                  {/* Left Eye */}
                  <circle cx="32" cy="70" r="9" fill="#1A1A1A" />
                  <circle cx="29" cy="66" r="3.5" fill="white" />
                  <circle cx="36" cy="73" r="1.5" fill="white" />
                  {/* Eyelashes */}
                  <path d="M22 65L25 67" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                  <path d="M21 70L24 70" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />

                  {/* Right Eye */}
                  <circle cx="68" cy="70" r="9" fill="#1A1A1A" />
                  <circle cx="65" cy="66" r="3.5" fill="white" />
                  <circle cx="72" cy="73" r="1.5" fill="white" />
                  {/* Eyelashes */}
                  <path d="M78 65L75 67" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                  <path d="M79 70L76 70" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
            </g>

            {/* Mouth */}
            <path
              d="M46 82C46 82 50 86 54 82"
              stroke="#1A1A1A"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.g>

          {/* Highlights */}
          <rect x="25" y="20" width="10" height="4" rx="2" fill="white" fillOpacity="0.4" />
        </svg>
      </motion.div>
    </div>
  )
}
