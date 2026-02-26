
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, RefreshCw, ChevronLeft, Target, MessageCircle, Info, Keyboard, ArrowRight, CheckCircle2, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

type Question = {
  id: number
  q: string
  options: string[]
  correct: number | number[]
  explanation: string
}

const MATCH_QUIZ_DATA: Question[] = [
  { 
    id: 1, 
    q: "Meaning of the idiom 'Turn a blind eye':", 
    options: ["To look carefully", "To deliberately ignore something wrong", "To be physically impaired", "To close one eye while aiming"], 
    correct: 1,
    explanation: "This idiom originates from Admiral Nelson who supposedly put his telescope to his blind eye to avoid seeing a signal to withdraw from battle. It means to intentionally ignore something."
  },
  { 
    id: 2, 
    q: "Correct meaning of 'A stitch in time saves nine':", 
    options: ["Sewing quickly is better", "Nine stitches are better than one", "Dealing with a small problem early prevents it growing", "Time spent sewing is valuable"], 
    correct: 2,
    explanation: "This proverb suggests that fixing a small issue now prevents it from becoming a much larger, harder-to-fix problem later."
  },
  { 
    id: 3, 
    q: "Meaning of 'At the eleventh hour':", 
    options: ["Important time", "At the last moment", "Without saving", "Day before yesterday"], 
    correct: 1,
    explanation: "In the biblical parable, laborers were hired at the 'eleventh hour' of a twelve-hour workday. It means the very last possible moment."
  },
  { 
    id: 4, 
    q: "Figure of speech in 'Time is a thief':", 
    options: ["Simile", "Metaphor", "Personification", "Hyperbole"], 
    correct: [1, 2], // Metaphor and Personification
    explanation: "This is primarily a Metaphor (direct comparison without using like/as) but also Personification, as Time is given the human characteristic of being a thief."
  },
  { 
    id: 5, 
    q: "Example of an Oxymoron:", 
    options: ["Time is money", "Life is a journey", "Deafening silence", "Fast as the wind"], 
    correct: 2,
    explanation: "An oxymoron combines two contradictory terms. 'Deafening' (loud) and 'silence' (quiet) are opposites used together."
  },
  { 
    id: 6, 
    q: "Meaning of 'Small talk':", 
    options: ["Gossip", "Brief discussion", "Polite conversation about unimportant things", "Talk of children"], 
    correct: 2,
    explanation: "'Small talk' refers to social conversation about minor topics like the weather, intended to build rapport."
  },
  { 
    id: 7, 
    q: "Meaning of 'Bite the bullet':", 
    options: ["Eat something dangerous", "Endure a painful situation with courage", "Speak aggressively", "Refuse a risk"], 
    correct: 1,
    explanation: "Before anesthesia, soldiers were given bullets to bite on during surgery to endure the pain. It means to accept something unpleasant bravely."
  },
  { 
    id: 8, 
    q: "Figure of speech in 'The pen is mightier than the sword':", 
    options: ["Onomatopoeia", "Pun", "Irony", "Metaphor"], 
    correct: 3,
    explanation: "While 'Metonymy' is the specific type here, in the context of general categories, it serves as a powerful Metaphor for the influence of communication over force."
  }
]

export default function MatchQuizPage() {
  const { toast } = useToast()
  const quizRef = useRef<HTMLDivElement>(null)
  const questionCardRef = useRef<HTMLDivElement>(null)
  const feedbackRef = useRef<HTMLDivElement>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    const shuffledQuestions = [...MATCH_QUIZ_DATA].map(q => {
      const cloned = { ...q, options: [...q.options] }
      
      const oldCorrectIndices = Array.isArray(q.correct) ? q.correct : [q.correct];
      const correctOptions = oldCorrectIndices.map(idx => q.options[idx]);
      
      const shuffled = [...cloned.options].sort(() => Math.random() - 0.5)
      cloned.options = shuffled
      
      const newCorrectIndices = correctOptions.map(opt => shuffled.indexOf(opt));
      cloned.correct = Array.isArray(q.correct) ? newCorrectIndices : newCorrectIndices[0];
      
      return cloned
    }).sort(() => Math.random() - 0.5)
    
    setQuestions(shuffledQuestions)
  }, [])

  const scrollToTarget = useCallback(() => {
    const target = (currentStep > 0 && questionCardRef.current) ? questionCardRef.current : quizRef.current
    if (target) {
      const offset = 100
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = target.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }, [currentStep])

  useEffect(() => {
    if (!isFinished && questions.length > 0) {
      const timer = setTimeout(scrollToTarget, 100)
      return () => clearTimeout(timer)
    }
  }, [currentStep, isFinished, questions.length, scrollToTarget])

  const nextQuestion = useCallback(() => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsFinished(true)
      toast({ title: "Matching Set Complete!", description: "Check your +5/-1 accuracy." })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep, questions.length, toast])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isFinished && questions.length > 0) {
        const q = questions[currentStep]
        if (answers[q.id] !== undefined) {
          nextQuestion()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [answers, currentStep, questions, isFinished, nextQuestion])

  const handleAnswer = (val: number) => {
    const qId = questions[currentStep].id
    if (answers[qId] !== undefined) return
    setAnswers({ ...answers, [qId]: val })
    
    setTimeout(() => {
      feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  const isAnswerCorrect = (userAns: number, correctAns: number | number[]) => {
    if (Array.isArray(correctAns)) {
      return correctAns.includes(userAns)
    }
    return userAns === correctAns
  }

  const calculateScore = () => {
    let correct = 0
    let wrong = 0
    questions.forEach(q => {
      const ans = answers[q.id]
      if (ans === undefined) return
      if (isAnswerCorrect(ans, q.correct)) correct++
      else wrong++
    })
    return { correct, wrong, total: correct * 5 - wrong * 1 }
  }

  if (isFinished) {
    const { correct, wrong, total } = calculateScore()
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          <Card className="text-center p-8 border-none shadow-2xl rounded-[2rem] bg-white">
            <div className="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline mb-2 font-bold">Matching Quiz Results</CardTitle>
            <div className="grid grid-cols-2 gap-4 my-8">
              <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                <div className="text-xs font-bold text-green-700 uppercase">Correct</div>
                <div className="text-2xl font-bold text-green-700">+{correct * 5}</div>
              </div>
              <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                <div className="text-xs font-bold text-red-700 uppercase">Wrong</div>
                <div className="text-2xl font-bold text-red-700">-{wrong}</div>
              </div>
            </div>
            <div className="p-6 bg-foreground text-background rounded-[1.5rem] mb-8 shadow-xl">
              <div className="text-sm opacity-70 font-bold">Total Score</div>
              <div className="text-4xl font-bold">{total} / {questions.length * 5}</div>
            </div>
            <div className="flex flex-col gap-3">
              <Button size="lg" className="rounded-xl h-12 font-bold shadow-md" onClick={() => window.location.reload()}>
                <RefreshCw className="w-4 h-4 mr-2" /> Retake randomized quiz
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl h-12 font-bold" asChild>
                <Link href="/study/match-the-following">Back to Material</Link>
              </Button>
            </div>
          </Card>

          <section className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 px-2">
              <Info className="w-5 h-5 text-primary" />
              Strategic Review
            </h3>
            {questions.map((q, idx) => {
              const userAns = answers[q.id]
              const isCorrect = isAnswerCorrect(userAns, q.correct)
              return (
                <Card key={idx} className="border-none shadow-md overflow-hidden rounded-[1.5rem] bg-white">
                  <div className={cn("px-6 py-3 flex items-center justify-between", isCorrect ? "bg-green-50" : "bg-red-50")}>
                    <Badge variant={isCorrect ? "default" : "destructive"} className="rounded-full font-bold">
                      {isCorrect ? "Correct (+5)" : "Error (-1)"}
                    </Badge>
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <p className="font-bold text-lg">{q.q}</p>
                    <div className="grid gap-2 text-sm">
                      <div className={cn("p-3 rounded-lg flex items-center gap-2", isCorrect ? "bg-green-100/30" : "bg-red-100/30")}>
                        {isCorrect ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
                        <span><strong className="text-foreground">Your Selection:</strong> {userAns !== undefined ? q.options[userAns] : "Skipped"}</span>
                      </div>
                      {!isCorrect && (
                        <div className="p-3 rounded-lg bg-green-100/30 border border-green-200">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>
                            <strong className="text-foreground">{Array.isArray(q.correct) ? "Valid Options: " : "Correct Option: "}</strong>
                            {Array.isArray(q.correct)
                              ? q.correct.map(i => q.options[i]).join(" OR ")
                              : q.options[q.correct as number]
                            }
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground pt-2 border-t">
                      <strong className="text-foreground">Clinical Insight:</strong> {q.explanation}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </section>
        </div>
      </div>
    )
  }

  if (questions.length === 0) return null

  const q = questions[currentStep]
  const userAnswer = answers[q.id]
  const isCorrect = userAnswer !== undefined && isAnswerCorrect(userAnswer, q.correct)

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="flex items-center justify-between mb-8" ref={quizRef}>
          <div>
            <h1 className="text-2xl font-headline font-bold uppercase tracking-tight text-primary">Matching Practice</h1>
            <p className="text-muted-foreground font-mono text-sm font-bold">Question {currentStep + 1} of {questions.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full text-[10px] font-bold text-muted-foreground">
              <Keyboard className="w-3 h-3" />
              PRESS ENTER
            </div>
            <Badge variant="outline" className="h-8 px-4 rounded-full border-primary/20 text-primary font-bold">Subject Code 101</Badge>
          </div>
        </div>

        <Progress value={(currentStep / questions.length) * 100} className="mb-12 h-2" />

        <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-white" ref={questionCardRef}>
          <CardHeader className="bg-primary/5 pb-8 pt-10">
            <CardTitle className="text-2xl text-center leading-relaxed font-bold">{q.q}</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <RadioGroup 
              onValueChange={(val) => handleAnswer(parseInt(val))} 
              value={userAnswer?.toString()} 
              disabled={userAnswer !== undefined}
              className="grid gap-3"
            >
              {q.options.map((opt, i) => {
                const isSelected = userAnswer === i
                const isCorrectOption = isAnswerCorrect(i, q.correct)
                
                return (
                  <div 
                    key={i} 
                    onClick={() => handleAnswer(i)}
                    className={cn(
                      "flex items-center space-x-3 border p-5 rounded-2xl transition-all cursor-pointer group",
                      userAnswer === undefined && "hover:bg-primary/5 hover:border-primary/20",
                      isSelected && !isCorrect && "border-destructive bg-destructive/5 ring-1 ring-destructive/20 shadow-md",
                      isSelected && isCorrect && "border-green-500 bg-green-50 ring-1 ring-green-200 shadow-md",
                      userAnswer !== undefined && isCorrectOption && !isSelected && "border-green-500/50 bg-green-50/30"
                    )}
                  >
                    <RadioGroupItem value={i.toString()} id={`q-${q.id}-opt-${i}`} className="pointer-events-none" />
                    <Label 
                      htmlFor={`q-${q.id}-opt-${i}`} 
                      className="flex-1 cursor-pointer text-lg font-bold text-foreground leading-tight"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="inline-block w-8 text-primary font-mono">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </Label>
                    {userAnswer !== undefined && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                    {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive" />}
                  </div>
                )
              })}
            </RadioGroup>

            <AnimatePresence>
              {userAnswer !== undefined && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="mt-8 pt-8 border-t border-dashed"
                  ref={feedbackRef}
                >
                  <div className={cn("p-6 rounded-2xl", isCorrect ? "bg-green-50 border border-green-100" : "bg-red-50 border border-red-100")}>
                    <div className="flex items-center gap-3 mb-3">
                      {isCorrect ? <CheckCircle2 className="w-6 h-6 text-green-600" /> : <XCircle className="w-6 h-6 text-red-600" />}
                      <span className={cn("text-xl font-bold", isCorrect ? "text-green-700" : "text-red-700")}>
                        {isCorrect ? "Perfect Scoop!" : "Brain Freeze!"}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      <strong className="text-foreground">Clinical Strategy:</strong> {q.explanation}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center mt-8">
          <Button variant="ghost" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="rounded-xl font-bold">
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          <Button size="lg" className="px-10 h-12 rounded-xl font-bold shadow-lg group" onClick={nextQuestion} disabled={userAnswer === undefined}>
            {currentStep === questions.length - 1 ? "Finish Set" : "Next Question"} <Target className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </main>
    </div>
  )
}
