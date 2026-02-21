"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { Heart, Sparkles } from "lucide-react"

type Expression = "happy" | "wink" | "cool" | "determined" | "surprised"

const COMMENTS = {
  default: [
    "Stay frosty! You're doing great!",
    "Percentile 100 is just a few study sessions away!",
    "I'm not melting, I'm just vibrating with excitement!",
    "You're lookin' sharp! Sharper than my wooden stick.",
    "Ready to freeze the competition?",
  ],
  strategy: [
    "Precision is my middle name. Actually it's Blue, but you get it.",
    "50/50 logic is cooler than liquid nitrogen!",
    "The 'Order of Operations' is basically a recipe for success.",
    "Accuracy > Speed. Don't rush, or you'll get a brain freeze!",
  ],
  study: [
    "Vocabulary is the spice of life. And I'm the dessert!",
    "Grammar is just a puzzle. I'm a tasty, sky-blue puzzle.",
    "Synonyms are just friends who look different!",
    "Master the patterns, master the world.",
  ],
  quiz: [
    "Focus mode: ACTIVATED. Let's get that 250!",
    "One question at a time! Keep your cool.",
    "Mistakes are just flavor text. Keep going!",
    "Subject Code 101? More like Subject Code: WIN!",
  ],
}

export function Mascot() {
  const pathname = usePathname()
  const [message, setMessage] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [expression, setExpression] = useState<Expression>("happy")

  const getPageContext = () => {
    if (pathname.includes("/quiz")) return "quiz"
    if (pathname.includes("/study")) return "study"
    if (pathname.includes("/strategy")) return "strategy"
    return "default"
  }

  const getRandomComment = () => {
    const context = getPageContext()
    const list = COMMENTS[context as keyof typeof COMMENTS] || COMMENTS.default
    const randomIndex = Math.floor(Math.random() * list.length)
    return list[randomIndex]
  }

  const handleClick = () => {
    setMessage(getRandomComment())
    setIsVisible(true)
    setClickCount((prev) => prev + 1)
    
    // Cycle expressions
    const expressions: Expression[] = ["wink", "cool", "surprised", "happy"]
    setExpression(expressions[clickCount % expressions.length])
    
    // Reset to happy/determined after a delay
    setTimeout(() => {
      setIsVisible(false)
      setExpression(getPageContext() === "quiz" ? "determined" : "happy")
    }, 4000)
  }

  // Initial greeting and context-based expression
  useEffect(() => {
    const context = getPageContext()
    setExpression(context === "quiz" ? "determined" : "happy")

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
            className="mb-4 bg-white p-4 rounded-[2rem] shadow-2xl border-2 border-primary/20 max-w-[220px] text-sm font-bold text-primary relative pointer-events-auto"
          >
            {message}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r-2 border-b-2 border-primary/20 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="cursor-pointer pointer-events-auto relative group"
        whileHover={{ scale: 1.15, rotate: [0, -3, 3, 0] }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        onClick={handleClick}
      >
        {/* Floating FX */}
        <AnimatePresence>
          {clickCount > 0 && (
            <motion.div
              key={`heart-${clickCount}`}
              initial={{ opacity: 0, y: 0, x: 0 }}
              animate={{ opacity: 1, y: -80, x: -20 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 right-0"
            >
              <Heart className="w-6 h-6 text-accent fill-accent" />
            </motion.div>
          )}
          {expression === "determined" && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-4 -left-4"
            >
              <Sparkles className="w-8 h-8 text-amber-400 fill-amber-200 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>

        <svg
          width="110"
          height="150"
          viewBox="0 0 100 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xl"
        >
          {/* Main Body - Sky Blue Gradient */}
          <defs>
            <linearGradient id="popGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
              <feOffset dx="1" dy="1" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Popsicle Body */}
          <path
            d="M10 35C10 15.67 25.67 0 45 0H55C74.33 0 90 15.67 90 35V85C90 93.28 83.28 100 75 100H25C16.72 100 10 93.28 10 85V35Z"
            fill="url(#popGrad)"
          />
          
          {/* Accent Stripe (Teal) */}
          <path
            d="M10 65H90V85C90 93.28 83.28 100 75 100H25C16.72 100 10 93.28 10 85V65Z"
            fill="#14B8A6"
            fillOpacity="0.3"
          />

          {/* Highlights */}
          <rect x="18" y="12" width="8" height="25" rx="4" fill="white" fillOpacity="0.25" />
          <circle cx="22" cy="45" r="3" fill="white" fillOpacity="0.2" />

          {/* Wooden Stick */}
          <rect x="42" y="100" width="16" height="35" rx="8" fill="#E7C6A0" />
          <rect x="42" y="100" width="16" height="8" fill="#D4A373" fillOpacity="0.4" />

          {/* Facial Expressions Group */}
          <g filter="url(#shadow)">
            {/* Blushing Cheeks */}
            <circle cx="22" cy="65" r="6" fill="#0EA5E9" fillOpacity="0.4" />
            <circle cx="78" cy="65" r="6" fill="#0EA5E9" fillOpacity="0.4" />

            {/* Eyes */}
            {expression === "happy" && (
              <>
                <circle cx="35" cy="55" r="6" fill="#0F172A" />
                <circle cx="37" cy="52" r="2" fill="white" />
                <circle cx="65" cy="55" r="6" fill="#0F172A" />
                <circle cx="67" cy="52" r="2" fill="white" />
              </>
            )}
            {expression === "wink" && (
              <>
                <path d="M28 55C28 55 35 60 42 55" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                <circle cx="65" cy="55" r="6" fill="#0F172A" />
                <circle cx="67" cy="52" r="2" fill="white" />
              </>
            )}
            {expression === "cool" && (
              <>
                <rect x="25" y="50" width="20" height="8" rx="2" fill="#0F172A" />
                <rect x="55" y="50" width="20" height="8" rx="2" fill="#0F172A" />
                <path d="M45 54H55" stroke="#0F172A" strokeWidth="2" />
              </>
            )}
            {expression === "determined" && (
              <>
                <path d="M28 48L42 52" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                <path d="M72 48L58 52" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                <circle cx="35" cy="58" r="6" fill="#0F172A" />
                <circle cx="65" cy="58" r="6" fill="#0F172A" />
              </>
            )}
            {expression === "surprised" && (
              <>
                <circle cx="35" cy="55" r="7" fill="#0F172A" />
                <circle cx="65" cy="55" r="7" fill="#0F172A" />
              </>
            )}

            {/* Mouth */}
            {expression === "surprised" ? (
              <circle cx="50" cy="75" r="5" fill="#0F172A" />
            ) : expression === "cool" ? (
              <path d="M45 75H55" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
            ) : (
              <path
                d="M42 75C42 75 50 82 58 75"
                stroke="#0F172A"
                strokeWidth="3"
                strokeLinecap="round"
              />
            )}
          </g>
        </svg>
      </motion.div>
    </div>
  )
}
