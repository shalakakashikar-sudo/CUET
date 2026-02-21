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
  melting: [
    "I'm melting! Study faster or I'll be a puddle!",
    "Quick! Finish this module before I lose my shape!",
    "The heat is on! Let's pick up the pace!",
    "I'm dripping away! Don't leave me hanging, study up!",
  ]
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

  const getRandomComment = useCallback((type?: 'melting') => {
    const context = type || getPageContext()
    const list = COMMENTS[context as keyof typeof COMMENTS] || COMMENTS.default
    const randomIndex = Math.floor(Math.random() * list.length)
    return list[randomIndex]
  }, [getPageContext])

  const handleClick = () => {
    if (isBitten) return

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
      
      // Trigger melting comment
      setMessage(getRandomComment('melting'))
      setIsVisible(true)
      setIsDripping(true)
      
      // Look towards the drip side (left)
      setEyeOffset({ x: -6, y: 8 })
      
      await dripControls.start({
        y: 120,
        opacity: [0, 1, 1, 0],
        scale: [0.6, 1.1, 1.3, 0.7],
        transition: { duration: 2.5, ease: "easeIn" }
      })
      
      setEyeOffset({ x: 0, y: 0 })
      setIsDripping(false)
      dripControls.set({ y: 0, opacity: 0 })
      
      // Hide message shortly after drip ends
      setTimeout(() => setIsVisible(false), 1000)
    }

    const interval = setInterval(dripRoutine, 15000)
    return () => clearInterval(interval)
  }, [dripControls, isBitten, getRandomComment])

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
          y: isBitten ? [0, 15, 0] : [0, -10, 0],
          rotate: isBitten ? [0, -5, 5, 0] : 0
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
            <clipPath id="biteClip">
              {isBitten ? (
                // Subtract a bite from the top right corner
                <path d="M0 0 H75 C70 5 65 15 70 25 C75 35 85 30 90 35 C95 40 100 45 100 45 V140 H0 V0Z" />
              ) : (
                <rect width="100" height="140" />
              )}
            </clipPath>
          </defs>

          {/* Wooden Stick */}
          <g>
            <rect x="42" y="102" width="16" height="32" rx="8" fill="#E6BA95" stroke="#1A1A1A" strokeWidth="3" />
            <path d="M42 110C42 110 45 106 50 106C55 106 58 110 58 110" stroke="#1A1A1A" strokeWidth="2" opacity="0.3" />
          </g>

          <g clipPath="url(#biteClip)">
            {/* White Body Base */}
            <path
              d="M15 40C15 20 30 10 50 10C70 10 85 20 85 40V95C85 103 78 110 70 110H30C22 110 15 103 15 95V40Z"
              fill="white"
              stroke="#1A1A1A"
              strokeWidth="4"
            />

            {/* Pink Melting Layer */}
            <path
              d="M15 40C15 20 30 10 50 10C70 10 85 20 85 40V70C85 70 78 78 70 72C62 66 55 85 45 74C35 63 25 80 15 68V40Z"
              fill="#FF85C0"
              stroke="#1A1A1A"
              strokeWidth="4"
            />

            {/* Face Group */}
            <motion.g animate={{ x: eyeOffset.x, y: eyeOffset.y - (isBitten ? 2 : 0) }}>
              {/* Blushing Cheeks */}
              <circle cx="30" cy="52" r="6" fill="#FF85C0" fillOpacity="0.5" />
              <circle cx="70" cy="52" r="6" fill="#FF85C0" fillOpacity="0.5" />

              {/* Eyes */}
              <g>
                {isBlinking ? (
                  <>
                    <path d="M25 45Q32.5 40 40 45" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" fill="none" />
                    <path d="M60 45Q67.5 40 75 45" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" fill="none" />
                  </>
                ) : (
                  <>
                    {/* Left Eye */}
                    <g transform="translate(32, 45)">
                      <circle r="9" fill="#1A1A1A" />
                      <circle cx="-3" cy="-4" r="3.5" fill="white" />
                      <circle cx="4" cy="4" r="1.5" fill="white" />
                      <path d="M-11 -4L-8 -1" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M-12 2L-9 2" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
                    </g>

                    {/* Right Eye */}
                    <g transform="translate(68, 45)">
                      <circle r="9" fill="#1A1A1A" />
                      <circle cx="-3" cy="-4" r="3.5" fill="white" />
                      <circle cx="4" cy="4" r="1.5" fill="white" />
                      <path d="M11 -4L8 -1" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M12 2L9 2" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
                    </g>
                  </>
                )}
              </g>

              {/* Mouth */}
              <motion.path
                animate={{
                  d: isBitten 
                    ? "M44 60Q50 72 56 60" 
                    : "M47 58Q50 62 53 58"
                }}
                stroke="#1A1A1A"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </motion.g>

            {/* Side Drip Animation */}
            <motion.path
              animate={dripControls}
              initial={{ opacity: 0 }}
              d="M18 78C18 88 23 93 28 93C33 93 38 88 38 78C38 68 18 68 18 78Z"
              fill="#FF85C0"
              stroke="#1A1A1A"
              strokeWidth="2"
            />
          </g>

          {/* Highlights */}
          <rect x="22" y="18" width="12" height="5" rx="3" fill="white" fillOpacity="0.4" />
          <circle cx="75" cy="22" r="3" fill="white" fillOpacity="0.3" />
        </svg>

        {/* Heart Effect */}
        <AnimatePresence>
          {!isBitten && !isDripping && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: -50 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
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
