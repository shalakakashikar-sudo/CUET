"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { usePathname } from "next/navigation"
import { Heart, Award, Sparkles as SparklesIcon, Star } from "lucide-react"

type Expression = 
  | "happy" 
  | "wink" 
  | "surprised" 
  | "excited" 
  | "loving"

const COMMENTS = {
  default: [
    "Stay frosty! You're doing great!",
    "Percentile 100 is just a few scoops away!",
    "Ready to freeze the competition?",
    "The Verbal Vantage: Where logic meets lexicon!",
    "I'm rooting for you (and I'm a Neapolitan swirl, so that's rare)!",
    "Vocabulary Tip: 'Munificent' means very generous. Like me with these tips!",
    "Did you know? 'Ephemeral' means short-lived. Like a melting popsicle!",
    "Idiom Alert: 'Break the ice' means to start a conversation. I'm literally ice!",
  ],
  strategy: [
    "Precision is my middle name. Well, it's actually Strawberry-Vanilla-Mint.",
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
    "Mistakes are just flavour text. Keep going!",
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
  ]
}

const STRAWBERRY = "#FFB7C5"
const VANILLA = "#F3E5AB"
const MINT = "#93C572"
const BLUEBERRY = "#B7C9FF"
const PALETTE = [STRAWBERRY, VANILLA, MINT, BLUEBERRY]

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
  const [heartColour, setHeartColour] = useState(STRAWBERRY)

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

    setMessage(getRandomComment())
    setIsVisible(true)
    setIsBitten(true)
    setExpression("surprised")
    setShowHands(true)
    setHeartColour(PALETTE[Math.floor(Math.random() * PALETTE.length)])

    setTimeout(() => {
      setIsBitten(false)
      setShowHands(false)
      setExpression("loving")
      setTimeout(() => {
        setExpression("happy")
      }, 2000)
    }, 2000)

    setTimeout(() => {
      setIsVisible(false)
    }, 10000)
  }

  // Always keep the mascot happy/positive as requested
  useEffect(() => {
    if (!mounted) return
    if (pathname === "/") {
      setExpression("excited")
    } else {
      setExpression("happy")
    }
  }, [pathname, mounted])

  // Look around idle behaviour
  useEffect(() => {
    if (!mounted) return
    const lookInterval = setInterval(() => {
      if (!isBitten && !isDripping && expression !== "surprised") {
        const directions = [
          { x: 4, y: 0 },   // right
          { x: -4, y: 0 },  // left
          { x: 0, y: -3 },  // up
          { x: 0, y: 3 },   // down
          { x: 3, y: 2 },   // diagonal
          { x: -3, y: -2 }, // diagonal
          { x: 0, y: 0 }    // centre
        ]
        const randomDir = directions[Math.floor(Math.random() * directions.length)]
        setEyeOffset(randomDir)
        
        setTimeout(() => {
          setEyeOffset({ x: 0, y: 0 })
        }, 1500)
      }
    }, 6000)
    return () => clearInterval(lookInterval)
  }, [mounted, isBitten, isDripping, expression])

  // Blinking
  useEffect(() => {
    if (!mounted) return
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }, 4000)
    return () => clearInterval(blinkInterval)
  }, [mounted])

  // Melting Routine
  useEffect(() => {
    if (!mounted) return
    const dripRoutine = async () => {
      if (isBitten) return
      
      setMessage(getRandomComment('melting'))
      setIsVisible(true)
      setIsDripping(true)
      setExpression("surprised")
      setEyeOffset({ x: -2, y: 2 })
      
      await dripControls.start({
        y: 110,
        opacity: [0, 1],
        transition: { duration: 3, ease: "easeIn" }
      })
      
      setEyeOffset({ x: 0, y: 0 })
      setIsDripping(false)
      dripControls.set({ y: 0, opacity: 0 })
      
      setTimeout(() => {
        setExpression("happy")
        setIsVisible(false)
      }, 10000)
    }

    const interval = setInterval(() => {
      if (Math.random() > 0.85) dripRoutine()
    }, 50000)
    
    return () => clearInterval(interval)
  }, [dripControls, isBitten, getRandomComment, mounted])

  useEffect(() => {
    if (!mounted) return
    const introTimer = setTimeout(() => {
      const intro = pathname === "/" 
        ? "Hi! I'm Pops. Ready for some sweet scores?" 
        : `Let's master ${pathname.split('/').pop()?.replace(/-/g, ' ')}!`
      setMessage(intro)
      setIsVisible(true)
      setTimeout(() => setIsVisible(false), 10000)
    }, 2000)
    return () => clearTimeout(introTimer)
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
            className="mb-4 bg-white p-5 rounded-[2.5rem] shadow-2xl border-4 border-primary/20 max-w-[240px] text-sm font-black text-primary relative pointer-events-auto text-center parlour-stripes"
          >
            {message}
            <div className="absolute -bottom-2 right-10 w-4 h-4 bg-white border-r-4 border-b-4 border-primary/20 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="cursor-pointer pointer-events-auto relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: isBitten ? [0, 15] : [0, -8],
        }}
        transition={{
          y: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
        }}
        onClick={handleClick}
      >
        <svg
          width="160"
          height="200"
          viewBox="-10 0 120 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          <defs>
            <clipPath id="biteClip">
              {isBitten ? (
                <path d="M0 0 H55 C60 5 50 15 60 25 C70 35 60 45 75 50 C90 55 85 65 85 75 V140 H0 V0Z" />
              ) : (
                <rect width="100" height="140" />
              )}
            </clipPath>
            <linearGradient id="stickGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D2A679" />
              <stop offset="50%" stopColor="#E6BA95" />
              <stop offset="100%" stopColor="#C49669" />
            </linearGradient>
          </defs>

          {/* Stick */}
          <rect x="42" y="102" width="16" height="30" rx="8" fill="url(#stickGrad)" stroke="#1A1A1A" strokeWidth="3" />

          {/* Layered Body */}
          <g clipPath="url(#biteClip)">
            {/* Scooped Flavour Layers */}
            <path d="M15 40C15 20 30 10 50 10C70 10 85 20 85 40V45C85 45 75 50 65 45C55 40 45 50 35 45C25 40 15 45 15 45V40Z" fill={STRAWBERRY} />
            <path d="M15 45C15 45 25 40 35 45C45 50 55 40 65 45C75 50 85 45 85 45V70C85 70 75 75 65 70C55 65 45 75 35 70C25 65 15 70 15 70V45Z" fill={VANILLA} />
            <path d="M15 70C15 70 25 65 35 70C45 75 55 65 65 70C75 75 85 70 85 70V95C85 95 75 100 65 95C55 90 45 100 35 95C25 90 15 95 15 95V70Z" fill={MINT} />
            <path d="M15 95C15 95 25 90 35 95C45 100 55 90 65 95C75 100 85 95 85 95V100C85 108 78 115 70 115H30C22 115 15 108 15 100V95Z" fill={BLUEBERRY} />

            {/* Shading & Gloss */}
            <path d="M85 40C85 20 75 10 65 10V115C78 115 85 108 85 100V40Z" fill="black" fillOpacity="0.05" />
            <path d="M20 40C20 25 28 15 40 15V110C25 110 20 105 20 100V40Z" fill="white" fillOpacity="0.2" />

            {/* Frost Sparkles */}
            <circle cx="25" cy="25" r="2" fill="white" fillOpacity="0.4" />
            <circle cx="75" cy="105" r="3" fill="white" fillOpacity="0.3" />
            <circle cx="35" cy="100" r="1.5" fill="white" fillOpacity="0.4" />

            {/* Outline */}
            <path
              d="M15 40C15 20 30 10 50 10C70 10 85 20 85 40V100C85 108 78 115 70 115H30C22 115 15 108 15 100V40Z"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="4"
            />

            {/* Facial Expressions - The Kawaii Engine */}
            <motion.g animate={{ x: eyeOffset.x, y: eyeOffset.y - 12 }}>
              {/* Pulsing Blushing Cheeks */}
              <motion.circle 
                cx="24" cy="78" r="6" 
                fill="#FF99AA" 
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: 0.4
                }} 
                transition={{ duration: 2, repeat: Infinity }} 
              />
              <motion.circle 
                cx="76" cy="78" r="6" 
                fill="#FF99AA" 
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: 0.4
                }} 
                transition={{ duration: 2, repeat: Infinity }} 
              />

              {/* Eyes System */}
              <g>
                {/* Kawaii Eyelashes - Shortened and curved UPWARDS */}
                <g>
                  {/* Left Eye Eyelashes - Subtle flicks attached to corners */}
                  <path d="M25 68 Q 22 68 20 62" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M27 65 Q 24 65 23 60" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  {/* Right Eye Eyelashes - Subtle flicks attached to corners */}
                  <path d="M75 68 Q 78 68 80 62" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M73 65 Q 76 65 77 60" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </g>

                {isBlinking ? (
                  <>
                    <path d="M25 68Q32.5 72 40 68" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" fill="none" />
                    <path d="M60 68Q67.5 72 75 68" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" fill="none" />
                  </>
                ) : (
                  <>
                    {/* Left Eye Logic */}
                    {expression === "wink" || expression === "happy" ? (
                      <path d="M25 68Q32.5 60 40 68" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" fill="none" />
                    ) : (
                      <g>
                        <circle cx="32" cy="68" r="8" fill="#1A1A1A" />
                        {expression === "loving" ? (
                          <path d="M32 72L29 68C27 65 30 63 32 66C34 63 37 65 35 68L32 72Z" fill="white" />
                        ) : (
                          <>
                            <circle cx="30" cy="65" r="3" fill="white" />
                            <circle cx="34" cy="71" r="1.5" fill="white" fillOpacity="0.8" />
                          </>
                        )}
                      </g>
                    )}

                    {/* Right Eye Logic */}
                    {expression === "happy" ? (
                      <path d="M60 68Q67.5 60 75 68" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" fill="none" />
                    ) : (
                      <g>
                        <circle cx="68" cy="68" r="8" fill="#1A1A1A" />
                        {expression === "loving" ? (
                          <path d="M68 72L65 68C63 65 66 63 68 66C70 63 73 65 71 68L68 72Z" fill="white" />
                        ) : (
                          <>
                            <circle cx="66" cy="65" r="3" fill="white" />
                            <circle cx="70" cy="71" r="1.5" fill="white" fillOpacity="0.8" />
                          </>
                        )}
                      </g>
                    )}
                  </>
                )}
              </g>

              {/* Mouth System - Always cheerful */}
              <g>
                {(expression === "happy") && (
                  <path d="M42 82Q50 90 58 82" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
                )}
                {expression === "excited" && (
                  <path d="M40 82Q50 95 60 82H40Z" fill="#1A1A1A" />
                )}
                {expression === "surprised" && (
                  <circle cx="50" cy="85" r="5" stroke="#1A1A1A" strokeWidth="3" fill="none" />
                )}
                {expression === "wink" && (
                  <path d="M44 82Q50 88 56 82" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
                )}
                {expression === "loving" && (
                  <path d="M44 84Q50 92 56 84" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
                )}
              </g>
            </motion.g>

            {/* Drip Animation */}
            <motion.path
              animate={dripControls}
              initial={{ opacity: 0 }}
              d="M18 78C18 88 23 93 28 93C33 93 38 88 38 78C38 68 18 68 18 78Z"
              fill={VANILLA}
              stroke="#1A1A1A"
              strokeWidth="2"
            />
          </g>

          {/* Hands */}
          <motion.g
            animate={{
              x: showHands ? [-12, -15] : [0, 0],
              opacity: showHands ? 1 : 0
            }}
            transition={{ duration: 0.5, repeat: showHands ? Infinity : 0, repeatType: "reverse" }}
          >
            <circle cx="12" cy="85" r="5" fill={MINT} stroke="#1A1A1A" strokeWidth="3" />
          </motion.g>
          <motion.g
            animate={{
              x: showHands ? [12, 15] : [0, 0],
              opacity: showHands ? 1 : 0
            }}
            transition={{ duration: 0.5, repeat: showHands ? Infinity : 0, repeatType: "reverse" }}
          >
            <circle cx="88" cy="85" r="5" fill={MINT} stroke="#1A1A1A" strokeWidth="3" />
          </motion.g>
        </svg>

        <AnimatePresence>
          {!isBitten && !isDripping && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1], y: -50 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
              className="absolute -top-10 left-1/2 -translate-x-1/2"
            >
              {expression === "excited" ? (
                <SparklesIcon className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ) : (
                <Heart 
                  className="w-6 h-6 transition-colors duration-500" 
                  style={{ color: heartColour, fill: heartColour }} 
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
