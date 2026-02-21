"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { usePathname } from "next/navigation"
import { Heart, Stars, Zap, BookOpen, Lightbulb } from "lucide-react"

type Expression = "happy" | "wink" | "cool" | "surprised" | "determined" | "thinking"

const COMMENTS = {
  default: [
    "Stay frosty! You're doing great!",
    "Percentile 100 is just a few study sessions away!",
    "Ready to freeze the competition?",
    "Your brain is getting sharper! I can feel it!",
    "Don't brain freeze! Take it one word at a time.",
    "The Verbal Vantage: Where logic meets lexicon!",
    "I'm rooting for you (and I'm a popsicle, so that's rare)!",
    "Vocabulary Tip: 'Munificent' means very generous. Like me with these tips!",
    "Did you know? 'Ephemeral' means short-lived. Like a melting popsicle!",
    "Idiom Alert: 'Break the ice' means to start a conversation. I'm literally ice!",
  ],
  strategy: [
    "Precision is my middle name. Well, it's actually Sky.",
    "Order of Operations is basically a recipe for success!",
    "Accuracy > Speed. Don't rush, or you'll get a brain freeze!",
    "Remember: In Code 101, every -1 counts. Stay sharp!",
    "Zero Guesswork Strategy: Because 'maybe' doesn't get 250.",
    "Clinical deduction is the ultimate superpower.",
    "Elimination Tip: Cross out the 'distractor' options first!",
  ],
  study: [
    "Vocabulary is the spice of life. And I'm the dessert!",
    "Synonyms are just friends who look different!",
    "Master the patterns, master the world.",
    "Antonyms: The polar opposites, just like me and a heater!",
    "Homonyms Trap: 'Principal' is your pal, 'Principle' is a rule!",
    "Grammar Tip: 'Despite' needs a noun, 'Although' needs a clause!",
    "Suffixes are like tails; they tell you where the word is going.",
    "Word of the Day: 'Sagacious' means wise. Be sagacious, study hard!",
  ],
  quiz: [
    "Focus mode: ACTIVATED. Let's get that 250!",
    "One question at a time! Keep your cool.",
    "Mistakes are just flavor text. Keep going!",
    "50 questions, 60 minutes. That's one minute per miracle!",
    "Scan, deduce, confirm. The elite cycle!",
    "You're in the zone! Is it chilly in here or is it just you?",
    "Idiom Alert: 'Hit the nail on the head' means to be exactly right. Do that!",
  ],
  melting: [
    "I'm melting! Study faster or I'll be a puddle!",
    "Quick! Finish this module before I lose my shape!",
    "The heat is on! Let's pick up the pace!",
    "I'm dripping away! Don't leave me hanging, study up!",
    "Time is ticking and I'm trickling! Move it!",
    "Accuracy maintains your cool. Speed stops the melt!",
  ]
}

const SKY_BLUE = "#70D6FF"

export function Mascot() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [message, setMessage] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [expression, setExpression] = useState<Expression>("happy")
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })
  const [isBlinking, setIsBlinking] = useState(false)
  const [isDripping, setIsDripping] = useState(false)
  const [isBitten, setIsBitten] = useState(false)
  const [showHands, setShowHands] = useState(false)

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

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClick = () => {
    if (isBitten || !mounted) return

    const expressions: Expression[] = ["wink", "cool", "surprised", "happy"]
    const randomExpr = expressions[Math.floor(Math.random() * expressions.length)]
    
    setMessage(getRandomComment())
    setIsVisible(true)
    setIsBitten(true)
    setExpression(randomExpr)
    setShowHands(true)

    setTimeout(() => {
      setIsBitten(false)
      setShowHands(false)
      setExpression(getPageContext() === "quiz" ? "determined" : "happy")
    }, 2000)

    setTimeout(() => {
      setIsVisible(false)
    }, 8000)
  }

  // Handle random hand gestures (hugs/joy)
  useEffect(() => {
    if (!mounted) return
    const gestureInterval = setInterval(() => {
      if (!isBitten && !isDripping) {
        setShowHands(true)
        setTimeout(() => setShowHands(false), 3000)
      }
    }, 15000 + Math.random() * 10000)
    return () => clearInterval(gestureInterval)
  }, [isBitten, isDripping, mounted])

  useEffect(() => {
    if (!mounted) return
    if (!isBitten && !isDripping) {
      const context = getPageContext()
      if (context === "quiz") setExpression("determined")
      else if (context === "strategy") setExpression("cool")
      else setExpression("happy")
    }
  }, [pathname, isBitten, isDripping, getPageContext, mounted])

  useEffect(() => {
    if (!mounted) return
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }, 4000 + Math.random() * 3000)
    return () => clearInterval(blinkInterval)
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    const lookInterval = setInterval(() => {
      if (!isDripping && !isBitten) {
        const x = (Math.random() - 0.5) * 10
        const y = (Math.random() - 0.5) * 8
        setEyeOffset({ x, y })
        setTimeout(() => setEyeOffset({ x: 0, y: 0 }), 1500)
      }
    }, 6000)
    return () => clearInterval(lookInterval)
  }, [isDripping, isBitten, mounted])

  useEffect(() => {
    if (!mounted) return
    const dripRoutine = async () => {
      if (isBitten) return
      
      setMessage(getRandomComment('melting'))
      setIsVisible(true)
      setIsDripping(true)
      setExpression("surprised")
      
      setEyeOffset({ x: -6, y: 4 })
      
      await dripControls.start({
        y: 130,
        opacity: [0, 1, 1, 0],
        scale: [0.7, 1.2, 1.4, 0.8],
        transition: { duration: 3, ease: "easeIn" }
      })
      
      setEyeOffset({ x: 0, y: 0 })
      setIsDripping(false)
      setExpression(getPageContext() === "quiz" ? "determined" : "happy")
      dripControls.set({ y: 0, opacity: 0 })
      
      setTimeout(() => setIsVisible(false), 6000)
    }

    const interval = setInterval(dripRoutine, 22000)
    return () => clearInterval(interval)
  }, [dripControls, isBitten, getRandomComment, getPageContext, mounted])

  useEffect(() => {
    if (!mounted) return
    const timer = setTimeout(() => {
      const intro = pathname === "/" 
        ? "Hi! I'm Pops. Ready for 250/250?" 
        : `Let's master ${pathname.split('/').pop()?.replace(/-/g, ' ')}!`
      setMessage(intro)
      setIsVisible(true)
      setTimeout(() => setIsVisible(false), 10000)
    }, 2000)
    return () => clearTimeout(timer)
  }, [pathname, mounted])

  if (!mounted) return null

  return (
    <div className="fixed bottom-24 right-8 z-[60] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 bg-white p-4 rounded-[2.5rem] shadow-2xl border-4 border-blue-200 max-w-[220px] text-sm font-black text-blue-600 relative pointer-events-auto text-center"
          >
            {message}
            <div className="absolute -bottom-2 right-10 w-4 h-4 bg-white border-r-4 border-b-4 border-blue-200 rotate-45" />
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
          width="180"
          height="220"
          viewBox="-20 0 140 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          <defs>
            <clipPath id="biteClip">
              {isBitten ? (
                <path d="M0 0 H75 C70 5 65 15 70 25 C75 35 85 32 90 35 C95 38 100 45 100 45 V140 H0 V0Z" />
              ) : (
                <rect width="100" height="140" />
              )}
            </clipPath>
          </defs>

          {/* Stick */}
          <g>
            <rect x="42" y="102" width="16" height="32" rx="8" fill="#E6BA95" stroke="#1A1A1A" strokeWidth="3" />
            <path d="M42 110C42 110 45 106 50 106C55 106 58 110 58 110" stroke="#1A1A1A" strokeWidth="2" opacity="0.3" />
            <rect x="44" y="100" width="12" height="6" fill="#1A1A1A" opacity="0.1" />
          </g>

          {/* Hands */}
          <motion.g
            animate={{
              x: showHands ? -15 : 0,
              opacity: showHands ? 1 : 0,
              rotate: showHands ? [0, -10, 0] : 0
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <circle cx="15" cy="75" r="6" fill={SKY_BLUE} stroke="#1A1A1A" strokeWidth="3" />
          </motion.g>
          <motion.g
            animate={{
              x: showHands ? 15 : 0,
              opacity: showHands ? 1 : 0,
              rotate: showHands ? [0, 10, 0] : 0
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <circle cx="85" cy="75" r="6" fill={SKY_BLUE} stroke="#1A1A1A" strokeWidth="3" />
          </motion.g>

          {/* Body */}
          <g clipPath="url(#biteClip)">
            <path
              d="M15 40C15 20 30 10 50 10C70 10 85 20 85 40V95C85 103 78 110 70 110H30C22 110 15 103 15 95V40Z"
              fill="white"
              stroke="#1A1A1A"
              strokeWidth="4"
            />

            <path
              d="M15 40C15 20 30 10 50 10C70 10 85 20 85 40V72C85 72 78 80 70 74C62 68 55 88 45 76C35 64 25 82 15 70V40Z"
              fill={SKY_BLUE}
              stroke="#1A1A1A"
              strokeWidth="4"
            />

            <motion.g animate={{ x: eyeOffset.x, y: eyeOffset.y - 12 }}>
              {/* Eye Blushes */}
              <circle cx="30" cy="55" r="7" fill={SKY_BLUE} fillOpacity="0.4" />
              <circle cx="70" cy="55" r="7" fill={SKY_BLUE} fillOpacity="0.4" />

              <g>
                {isBlinking ? (
                  <>
                    <path d="M25 48Q32.5 43 40 48" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" fill="none" />
                    <path d="M60 48Q67.5 43 75 48" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" fill="none" />
                  </>
                ) : expression === "wink" ? (
                  <>
                    <circle cx="32" cy="48" r="9" fill="#1A1A1A" />
                    <circle cx="29" cy="44" r="3.5" fill="white" />
                    <path d="M60 48Q67.5 43 75 48" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" fill="none" />
                  </>
                ) : expression === "determined" ? (
                  <g>
                    <path d="M22 42L40 48" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
                    <path d="M78 42L60 48" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="32" cy="52" r="7" fill="#1A1A1A" />
                    <circle cx="68" cy="52" r="7" fill="#1A1A1A" />
                  </g>
                ) : (
                  <>
                    <g transform="translate(32, 48)">
                      <circle r="9" fill="#1A1A1A" />
                      <circle cx="-3" cy="-4" r="3.5" fill="white" />
                      <circle cx="4" cy="4" r="1.5" fill="white" />
                    </g>
                    <g transform="translate(68, 48)">
                      <circle r="9" fill="#1A1A1A" />
                      <circle cx="-3" cy="-4" r="3.5" fill="white" />
                      <circle cx="4" cy="4" r="1.5" fill="white" />
                    </g>
                  </>
                )}
              </g>

              <motion.path
                animate={{
                  d: isBitten || expression === "surprised" 
                    ? "M42 65Q50 78 58 65" 
                    : expression === "thinking"
                    ? "M45 65H55"
                    : "M46 62Q50 68 54 62"
                }}
                stroke="#1A1A1A"
                strokeWidth="3"
                strokeLinecap="round"
                fill={expression === "surprised" ? "#FFB7C5" : "none"}
              />
            </motion.g>

            {/* Side Drip */}
            <motion.path
              animate={dripControls}
              initial={{ opacity: 0 }}
              d="M18 82C18 92 23 97 28 97C33 97 38 92 38 82C38 72 18 72 18 82Z"
              fill={SKY_BLUE}
              stroke="#1A1A1A"
              strokeWidth="2"
            />
          </g>

          {(expression === "determined" || expression === "cool") && !isBitten && (
            <motion.g
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <path d="M85 15L88 22L95 25L88 28L85 35L82 28L75 25L82 22Z" fill={SKY_BLUE} />
              <path d="M15 15L18 22L25 25L18 28L15 35L12 28L5 25L12 22Z" fill={SKY_BLUE} />
            </motion.g>
          )}

          <rect x="22" y="18" width="12" height="5" rx="3" fill="white" fillOpacity="0.4" />
          <circle cx="75" cy="22" r="3" fill="white" fillOpacity="0.3" />
        </svg>

        <AnimatePresence>
          {!isBitten && !isDripping && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: -60 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-2"
            >
              {expression === "determined" ? (
                <Zap className="w-6 h-6 text-blue-400 fill-blue-400" />
              ) : (
                <Heart className="w-6 h-6 text-blue-400 fill-blue-400" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}