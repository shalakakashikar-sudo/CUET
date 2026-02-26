
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, RefreshCw, ChevronLeft, Target, Layers, Info, CheckCircle2, XCircle, Keyboard, ArrowRight, AlertCircle, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

type Question = {
  id: number
  parts: string[]
  q: string
  options: string[]
  correct: number
  explanation: string
}

const REARRANGE_QUIZ_DATA: Question[] = [
  // Set 1: Mixed Themes
  {
    id: 1,
    parts: ["the fragrance of jasmine drifted", "as the evening breeze passed through", "the open windows of the old house", "filling the room with a gentle sweetness"],
    q: "Rearrange the parts labelled A, B, C, D to form a meaningful sentence.",
    options: ["B-C-A-D", "A-B-C-D", "D-A-C-B", "C-A-D-B"],
    correct: 0,
    explanation: "The sentence starts with the setting (B), followed by the location (C), the primary action (A), and ends with the result (D)."
  },
  {
    id: 2,
    parts: ["due to the heavy rain forecast", "the annual function", "the committee decided to postpone", "for the entire region"],
    q: "Choose the correct sequence:",
    options: ["C-B-A-D", "A-B-C-D", "B-A-D-C", "D-B-C-A"],
    correct: 0,
    explanation: "Subject (Committee - C) + Verb (Postpone - B) + Object (Function) + Reason (Rain - A) + Scope (Region - D)."
  },
  {
    id: 3,
    parts: ["remains the cornerstone of human progress", "the ability to adapt and learn", "in an era of rapid technological change", "despite the risks of automation"],
    q: "Rearrange to form a coherent statement:",
    options: ["C-B-A-D", "A-C-B-D", "D-A-C-B", "B-A-C-D"],
    correct: 0,
    explanation: "Begins with context (C), introduces subject (B), state (A), and ends with contrast (D)."
  },
  {
    id: 4,
    parts: ["when the explorers set out", "over the horizon", "scarcely had the sun risen", "on their perilous journey"],
    q: "Identify the correct sequence:",
    options: ["C-B-A-D", "B-A-C-D", "A-B-C-D", "D-C-B-A"],
    correct: 0,
    explanation: "Uses 'Scarcely had (C) ... when (A)' structure. Logical flow: Sunrise (C-B) leading to the start of the journey (A-D)."
  },
  {
    id: 5,
    parts: ["the jury found it difficult", "to reach a unanimous verdict", "due to conflicting testimonies", "although the evidence was clear"],
    q: "Rearrange the segments:",
    options: ["D-A-B-C", "A-B-C-D", "C-D-A-B", "B-C-D-A"],
    correct: 0,
    explanation: "Starts with the contrast (D), followed by the main difficulty (A), the specific goal (B), and the reason (C)."
  },
  {
    id: 6,
    parts: ["into the realm of quantum theory", "the observable phenomena", "physicists must look beyond", "to understand the complexities of the universe"],
    q: "Choose the logical order:",
    options: ["D-C-B-A", "A-B-C-D", "C-A-B-D", "B-D-C-A"],
    correct: 0,
    explanation: "Starts with the purpose (D), followed by the subject-requirement (C), the object (B), and the destination (A)."
  },
  {
    id: 7,
    parts: ["to isolate it from radioactive waste", "with minimal environmental impact", "not only did the scientist discover a new element", "but she also developed a method"],
    q: "Rearrange correctly:",
    options: ["C-D-A-B", "A-B-C-D", "B-A-C-D", "D-C-B-A"],
    correct: 0,
    explanation: "Correlative structure: Not only (C) ... but also (D) + purpose (A) + manner (B)."
  },
  {
    id: 8,
    parts: ["had already been relocated", "most of the survivors", "by the time the rescue team arrived", "to a safer facility"],
    q: "Choose the correct sequence:",
    options: ["C-B-A-D", "A-B-C-D", "D-A-C-B", "B-C-A-D"],
    correct: 0,
    explanation: "Time clause (C) followed by the subject (B) and the complete verb phrase (A-D)."
  },
  {
    id: 9,
    parts: ["at the international symposium", "having completed her research", "to a round of applause", "she presented her findings"],
    q: "Identify the coherent flow:",
    options: ["B-D-A-C", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Participle phrase (B) leads to the main action (D) + location (A) + result (C)."
  },
  {
    id: 10,
    parts: ["the use of natural light", "the architect designed the building", "while minimizing energy consumption", "so that it would maximise"],
    q: "Rearrange the segments:",
    options: ["B-D-A-C", "A-B-C-D", "C-A-B-D", "D-B-C-A"],
    correct: 0,
    explanation: "Subject core (B) + purpose clause (D) + object (A) + contrast (C)."
  },
  // Set 2: Novelty & Adventure
  {
    id: 11,
    parts: ["of the industrial revolution", "written in the late 19th century", "through the eyes of a child", "the novel, explores the social injustices"],
    q: "Choose the correct order:",
    options: ["D-B-A-C", "A-B-C-D", "B-D-A-C", "C-A-B-D"],
    correct: 2,
    explanation: "Identifying the modified subject (B-D) followed by its focus (A) and perspective (C)."
  },
  {
    id: 12,
    parts: ["the hiker decided to proceed", "without any professional equipment", "despite being warned of the danger", "up the steep mountain slope"],
    q: "Rearrange logically:",
    options: ["C-A-D-B", "A-B-C-D", "D-C-B-A", "B-A-C-D"],
    correct: 0,
    explanation: "Contrast (C) + Decision (A) + Direction (D) + Limitation (B)."
  },
  {
    id: 13,
    parts: ["as Leonardo da Vinci did", "possess such a wide range", "rarely does a single individual", "of intellectual and creative talents"],
    q: "Identify the correct sequence:",
    options: ["C-B-D-A", "A-B-C-D", "B-A-C-D", "D-C-B-A"],
    correct: 0,
    explanation: "Inversion 'Rarely does' (C) + Verb (B) + Object (D) + Comparison (A)."
  },
  {
    id: 14,
    parts: ["than a technical glitch", "and restart the entire scene", "no sooner had the play begun", "forced the actors to stop"],
    q: "Rearrange the segments:",
    options: ["C-A-D-B", "A-B-C-D", "D-C-B-A", "B-A-C-D"],
    correct: 0,
    explanation: "Correlative structure: No sooner had (C) ... than (A) + resulting actions (D-B)."
  },
  {
    id: 15,
    parts: ["that interest rates will fall", "it is highly unlikely", "in the near future", "given the current economic climate"],
    q: "Choose the correct flow:",
    options: ["D-B-A-C", "A-B-C-D", "B-A-C-D", "C-D-A-B"],
    correct: 0,
    explanation: "Context (D) + Dummy subject (B) + Content (A) + Time (C)."
  },
  {
    id: 16,
    parts: ["to ensure the safety of the passengers", "to the nearest available airport", "the airline pilot decided", "to divert the plane"],
    q: "Rearrange correctly:",
    options: ["A-C-D-B", "B-A-C-D", "C-D-A-B", "D-B-C-A"],
    correct: 0,
    explanation: "Purpose (A) + Subject (C) + Action (D) + Destination (B)."
  },
  {
    id: 17,
    parts: ["traditional newspapers have had", "to stay relevant in the 21st century", "with the rise of digital media", "to adapt their business models"],
    q: "Identify the logical order:",
    options: ["C-A-D-B", "A-B-C-D", "D-C-B-A", "B-A-C-D"],
    correct: 0,
    explanation: "Cause (C) + Subject (A) + Immediate requirement (D) + Long-term goal (B)."
  },
  {
    id: 18,
    parts: ["the satellite will be launched", "from the space centre in Florida", "provided that the weather stays clear", "early tomorrow morning"],
    q: "Rearrange the segments:",
    options: ["C-A-D-B", "A-B-C-D", "D-C-B-A", "B-A-C-D"],
    correct: 0,
    explanation: "Condition (C) + Main event (A) + Time (D) + Source (B)."
  },
  {
    id: 19,
    parts: ["leave your luggage unattended", "under no circumstances should you", "while waiting in the departures lounge", "at the airport"],
    q: "Choose the correct sequence:",
    options: ["B-A-C-D", "A-B-C-D", "C-D-A-B", "D-B-C-A"],
    correct: 0,
    explanation: "Negative auxiliary inversion (B) + Verb phrase (A) + Temporal context (C) + Specific location (D)."
  },
  {
    id: 20,
    parts: ["a fascinating glimpse", "the ancient ruins provide", "into a long-lost civilisation", "having been discovered by chance"],
    q: "Rearrange to form a sentence:",
    options: ["D-B-A-C", "A-B-C-D", "B-A-C-D", "C-D-A-B"],
    correct: 0,
    explanation: "Participle modifier (D) describing the ruins (B), leading to the outcome (A-C)."
  }
]

export default function RearrangeQuizPage() {
  const { toast } = useToast()
  const quizRef = useRef<HTMLDivElement>(null)
  const questionCardRef = useRef<HTMLDivElement>(null)
  const feedbackRef = useRef<HTMLDivElement>(null)
  const [selectedSetIndex, setSelectedSetIndex] = useState<number | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)

  const quizSets = [
    { name: "Practice Set 1", range: [0, 10] },
    { name: "Practice Set 2", range: [10, 20] },
    // Simplified for logic testing...
  ]

  useEffect(() => {
    if (selectedSetIndex !== null) {
      const { range } = quizSets[selectedSetIndex]
      const selectedQuestions = REARRANGE_QUIZ_DATA.slice(range[0], range[1]).map(q => {
        const cloned = { ...q, options: [...q.options] }
        const initialCorrectOpt = cloned.options[cloned.correct]
        const shuffled = [...cloned.options].sort(() => Math.random() - 0.5)
        cloned.options = shuffled
        cloned.correct = shuffled.indexOf(initialCorrectOpt)
        return cloned
      })
      
      setQuestions([...selectedQuestions].sort(() => Math.random() - 0.5))
      setCurrentStep(0)
      setAnswers({})
      setIsFinished(false)
    }
  }, [selectedSetIndex])

  const scrollToTarget = useCallback(() => {
    const target = (currentStep > 0 && questionCardRef.current) ? questionCardRef.current : quizRef.current
    if (target) {
      const offset = 100
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = target.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
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
      toast({ title: "Logic Set Complete!", description: "Check your +5/-1 accuracy." })
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

  const calculateScore = () => {
    let correct = 0
    let wrong = 0
    questions.forEach(q => {
      const ans = answers[q.id]
      if (ans === undefined) return
      if (ans === q.correct) correct++
      else wrong++
    })
    return { correct, wrong, total: correct * 5 - wrong * 1 }
  }

  if (selectedSetIndex === null) {
    return (
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 text-center animate-fade-in-up">
            <Badge variant="outline" className="mb-4 py-1 px-4 border-primary/40 text-primary font-bold uppercase tracking-widest">
              Section 6: Logic Selection
            </Badge>
            <h1 className="text-4xl font-headline font-bold mb-4">Sequential Logic Practice</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select a clinical practice set to begin. Each set follows official CUET Subject Code 101 marking protocols.
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {quizSets.map((set, idx) => (
              <Card 
                key={idx} 
                className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2rem] bg-white/70 backdrop-blur-sm cursor-pointer overflow-hidden flex flex-col"
                onClick={() => setSelectedSetIndex(idx)}
              >
                <CardHeader className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                      <Layers className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="rounded-full font-bold">10 Items</Badge>
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{set.name}</CardTitle>
                  <CardDescription className="mt-2">High-tier sentence rearrangement items for targeted practice.</CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8 pt-0 mt-auto">
                  <Button variant="outline" className="w-full rounded-xl border-primary/20 hover:bg-primary hover:text-white font-bold group">
                    Begin Set <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isFinished) {
    const { correct, wrong, total } = calculateScore()
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="text-center p-8 border-none shadow-2xl rounded-[2rem] bg-white">
            <div className="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Layers className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline mb-2 font-bold">{quizSets[selectedSetIndex].name} Results</CardTitle>
            <div className="grid grid-cols-2 gap-4 my-8">
              <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                <div className="text-xs font-bold text-green-700 uppercase">Correct (+5)</div>
                <div className="text-2xl font-bold text-green-700">+{correct * 5}</div>
              </div>
              <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                <div className="text-xs font-bold text-red-700 uppercase">Errors (-1)</div>
                <div className="text-2xl font-bold text-red-700">-{wrong}</div>
              </div>
            </div>
            <div className="p-6 bg-foreground text-background rounded-[1.5rem] mb-8 shadow-xl">
              <div className="text-sm opacity-70 font-bold">Protocol Score</div>
              <div className="text-4xl font-bold">{total} / {questions.length * 5}</div>
            </div>
            <div className="flex flex-col gap-3">
              <Button size="lg" className="rounded-xl h-12 font-bold shadow-md" onClick={() => {
                setIsFinished(false)
                setCurrentStep(0)
                setAnswers({})
              }}>
                <RefreshCw className="w-4 h-4 mr-2" /> Retake this Set
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl h-12 font-bold" onClick={() => setSelectedSetIndex(null)}>
                Pick Another Set
              </Button>
            </div>
          </Card>

          <section className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 px-2">
              <Info className="w-5 h-5 text-primary" />
              Strategic Item Analysis
            </h3>
            {questions.map((q, idx) => {
              const userAns = answers[q.id]
              const isCorrect = userAns === q.correct
              return (
                <Card key={idx} className="border-none shadow-md overflow-hidden rounded-[1.5rem] bg-white">
                  <div className={cn("px-6 py-3 flex items-center justify-between", isCorrect ? "bg-green-50" : "bg-red-50")}>
                    <Badge variant={isCorrect ? "default" : "destructive"} className="rounded-full font-bold">
                      {isCorrect ? "CORRECT (+5)" : "ERROR (-1)"}
                    </Badge>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex flex-col gap-2">
                      {q.parts.map((p, i) => (
                        <div key={i} className="text-xs font-mono font-bold text-muted-foreground flex items-start gap-2">
                          <span className="text-primary">{String.fromCharCode(65+i)}:</span> {p}
                        </div>
                      ))}
                    </div>
                    <p className="font-bold text-lg">{q.q}</p>
                    <div className="grid gap-2 text-sm">
                      <div className={cn("p-3 rounded-lg flex items-center gap-2", isCorrect ? "bg-green-50" : "bg-red-50")}>
                        {isCorrect ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
                        <span><strong className="text-foreground">Your Selection:</strong> {userAns !== undefined ? q.options[userAns] : "Skipped"}</span>
                      </div>
                      {!isCorrect && (
                        <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>
                            <strong className="text-foreground">Correct Sequence:</strong> {q.options[q.correct]}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground pt-4 border-t border-dashed">
                      <strong className="text-foreground">Clinical Strategy:</strong> {q.explanation}
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
  const isCorrect = userAnswer !== undefined && userAnswer === q.correct

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="flex items-center justify-between mb-8" ref={quizRef}>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setSelectedSetIndex(null)} className="rounded-full">
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <div>
              <h1 className="text-xl font-headline font-bold uppercase tracking-tight text-primary">Sequential Logic</h1>
              <p className="text-muted-foreground font-mono text-xs font-bold">Item {currentStep + 1} / {questions.length}</p>
            </div>
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

        <Card className="border-none shadow-xl rounded-[2rem] bg-white mb-8 overflow-hidden" ref={questionCardRef}>
          <CardHeader className="bg-primary/5 pb-8 pt-10">
            <CardTitle className="text-xl text-center leading-relaxed mb-6 font-bold">{q.q}</CardTitle>
            <div className="flex flex-col gap-2">
              {q.parts.map((p, i) => (
                <div key={i} className="px-4 py-3 bg-white border border-primary/10 rounded-xl text-sm font-medium text-foreground shadow-sm flex items-start gap-3 group hover:border-primary/30 transition-colors">
                  <span className="font-mono font-bold text-primary bg-primary/5 w-6 h-6 flex items-center justify-center rounded-lg shrink-0">{String.fromCharCode(65 + i)}</span>
                  {p}
                </div>
              ))}
            </div>
          </CardHeader>
          <CardContent className="p-10 pt-6">
            <RadioGroup 
              onValueChange={(val) => handleAnswer(parseInt(val))} 
              value={userAnswer?.toString()} 
              disabled={userAnswer !== undefined}
              className="grid gap-3"
            >
              {q.options.map((opt, i) => {
                const isSelected = userAnswer === i
                const isCorrectOption = i === q.correct
                
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
                      <span className="inline-block w-12 text-primary font-mono">{i + 1}.</span>
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

        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="rounded-xl font-bold">
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          <Button size="lg" className="px-10 h-12 rounded-xl font-bold shadow-lg group" onClick={nextQuestion} disabled={userAnswer === undefined}>
            {currentStep === questions.length - 1 ? "Finish Set" : "Next Question"} <Target className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
          </Button>
        </div>

        <div className="mt-12 p-8 rounded-3xl bg-secondary/10 border border-secondary/20 flex gap-5 shadow-sm bg-white">
          <AlertCircle className="w-8 h-8 text-secondary-foreground shrink-0" />
          <div className="text-sm text-secondary-foreground font-bold">
            <strong className="block mb-1">Elite Protocol:</strong>
            Sequential items are high-yield but time-intensive. Use the "Opening Hook" strategy to save 30s per question. Every +5 counts towards your 250 goal.
          </div>
        </div>
      </main>
    </div>
  )
}
