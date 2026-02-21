"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { Heart } from "lucide-react"

const COMMENTS = {
  default: [
    "Stay frosty! You're doing great!",
    "Percentile 100 is just a few study sessions away!",
    "Is it hot in here, or is it just your burning passion for English?",
    "Don't let the exam give you a meltdown!",
    "You're lookin' sharp! Sharper than my wooden stick.",
  ],
  strategy: [
    "A clinical approach? I'm just here for the sprinkles.",
    "Accuracy > Speed. Slow and steady wins the... popsicle stick?",
    "Planning is 90% of the battle. The other 10% is not melting.",
    "Remember: 50/50 is the goal. No pressure, cool cat!",
  ],
  study: [
    "Reading between the lines? I just read the toppings.",
    "Vocabulary is the spice of life. And I'm the dessert!",
    "Grammar is just a puzzle. I'm a tasty puzzle.",
    "Don't let the synonyms trip you up. They're just friends!",
  ],
  quiz: [
    "Think like a genius, act like a popsicle.",
    "One question at a time! Keep your cool.",
    "Mistakes are just flavor text. Keep going!",
    "50 questions? Easy! I believe in you!",
  ],
}

export function Mascot() {
  const pathname = usePathname()
  const [message, setMessage] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [clickCount, setClickCount] = useState(0)

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
    
    // Hide message after 4 seconds
    setTimeout(() => setIsVisible(false), 4000)
  }

  // Initial greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("Hi! I'm Pops. Let's crush this CUET!")
      setIsVisible(true)
      setTimeout(() => setIsVisible(false), 5000)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed bottom-20 right-8 z-[60] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 bg-white p-4 rounded-3xl shadow-xl border-2 border-primary/20 max-w-[200px] text-sm font-bold text-primary relative pointer-events-auto"
          >
            {message}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r-2 border-b-2 border-primary/20 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="cursor-pointer pointer-events-auto relative"
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        onClick={handleClick}
      >
        {/* Floating Hearts */}
        <AnimatePresence>
          {clickCount > 0 && (
            <motion.div
              key={clickCount}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -50 }}
              exit={{ opacity: 0 }}
              className="absolute -top-4 -left-4"
            >
              <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
            </motion.div>
          )}
        </AnimatePresence>

        <svg
          width="100"
          height="140"
          viewBox="0 0 100 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Main Body - Pink Layer */}
          <path
            d="M10 30C10 13.4315 23.4315 0 40 0H60C76.5685 0 90 13.4315 90 30V80C90 80 90 95 70 95C50 95 50 85 50 85C50 85 50 95 30 95C10 95 10 80 10 80V30Z"
            fill="#FF85C0"
          />
          {/* White Bottom Part */}
          <path
            d="M10 80C10 80 10 95 30 95C50 95 50 85 50 85C50 85 50 95 70 95C90 95 90 80 90 80V85C90 90.5228 85.5228 95 80 95H20C14.4772 95 10 90.5228 10 85V80Z"
            fill="white"
          />
          {/* Wooden Stick */}
          <rect x="42" y="95" width="16" height="35" rx="8" fill="#F3D5B5" />
          <path
            d="M46 115C46 112.791 47.7909 111 50 111C52.2091 111 54 112.791 54 115C54 117.209 52.2091 119 50 119C47.7909 119 46 117.209 46 115Z"
            fill="#FF4D4F"
          />
          {/* Eyes */}
          <circle cx="35" cy="45" r="6" fill="#1A1A1A" />
          <circle cx="37" cy="42" r="2" fill="white" />
          <circle cx="65" cy="45" r="6" fill="#1A1A1A" />
          <circle cx="67" cy="42" r="2" fill="white" />
          {/* Mouth */}
          <path
            d="M45 55C45 55 50 60 55 55"
            stroke="#1A1A1A"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Blushing Cheeks */}
          <circle cx="22" cy="55" r="5" fill="#FFB1D9" />
          <circle cx="78" cy="55" r="5" fill="#FFB1D9" />
          {/* Highlights */}
          <rect x="18" y="10" width="10" height="20" rx="5" fill="white" fillOpacity="0.3" />
        </svg>
      </motion.div>
    </div>
  )
}
