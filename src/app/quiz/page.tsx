
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, RefreshCw, ChevronLeft, Target, Award, CheckCircle2, XCircle, Info, Keyboard, ArrowRight, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

type Question = {
  id: number
  text: string
  options: string[]
  correct: number | number[] // Support multiple correct answers
  difficulty: 'Easy' | 'Medium' | 'Hard'
  section: string
  explanation: string
}

const ENGLISH_CODE_101_SET: Question[] = [
  {
    id: 1,
    section: "Reading Comprehension",
    difficulty: "Medium",
    text: "According to the passage on 'Flow', what state is described as athletes being 'in the zone'?",
    options: ["Boredom", "Anxiety", "Flow", "Immersion"],
    correct: 2,
    explanation: "The passage explicitly defines 'Flow' as the state of complete immersion, which athletes colloquially refer to as being 'in the zone'."
  },
  {
    id: 2,
    section: "Synonyms",
    difficulty: "Hard",
    text: "Choose the synonym for 'MUNIFICENT':",
    options: ["Stingy", "Bountiful", "Fragile", "Wisely"],
    correct: 1,
    explanation: "'Munificent' refers to great generosity. 'Bountiful' is its direct synonym. 'Stingy' is an antonym."
  },
  {
    id: 3,
    section: "Antonyms",
    difficulty: "Medium",
    text: "Choose the antonym for 'LOQUACIOUS':",
    options: ["Talkative", "Verbose", "Garrulous", "Reticent"],
    correct: 3,
    explanation: "'Loquacious' means talkative. 'Reticent' means reserved or inclined to be silent, making it the correct antonym."
  },
  {
    id: 4,
    section: "Grammar",
    difficulty: "Hard",
    text: "By the time the ambulance arrived, the patient ______ unconscious for twenty minutes.",
    options: ["was", "has been", "had been", "is"],
    correct: 2,
    explanation: "When two actions happen in the past, the one that occurred first uses 'Past Perfect' (had + V3)."
  },
  {
    id: 5,
    section: "Conjunctions",
    difficulty: "Medium",
    text: "______ being a handicapped person, he is very co-operative.",
    options: ["Because", "Despite", "Although", "Basically"],
    correct: 1,
    explanation: "'Despite' is followed by a noun/gerund to show contrast. 'Although' would require a full clause (subject + verb)."
  },
  {
    id: 6,
    section: "Idioms",
    difficulty: "Easy",
    text: "Meaning of 'At the eleventh hour':",
    options: ["Important time", "At the last moment", "Exactly at 11:00", "Too early"],
    correct: 1,
    explanation: "This idiom refers to doing something at the very last possible moment before it is too late."
  },
  {
    id: 7,
    section: "Figures of Speech",
    difficulty: "Medium",
    text: "'Time is a thief' is an example of:",
    options: ["Simile", "Metaphor", "Personification", "Hyperbole"],
    correct: [1, 2], // Metaphor and Personification are both valid
    explanation: "'Time is a thief' is primarily a Metaphor (direct comparison) but also utilizes Personification by attributing the human action of 'stealing' to Time."
  },
  {
    id: 8,
    section: "Rearrangement",
    difficulty: "Hard",
    text: "Rearrange the segments: A: were arrested / B: four criminals / C: in Varanasi",
    options: ["B-A-C", "C-A-B", "A-B-C", "C-B-A"],
    correct: 0,
    explanation: "The logical sequence is Subject (four criminals) -> Verb (were arrested) -> Location (in Varanasi)."
  },
  {
    id: 9,
    section: "Vocabulary",
    difficulty: "Medium",
    text: "Synonym of 'EPHEMERAL':",
    options: ["Permanent", "Transient", "Eternal", "Enduring"],
    correct: 1,
    explanation: "'Ephemeral' means lasting for a very short time. 'Transient' is the closest synonym."
  },
  {
    id: 10,
    section: "Homonyms",
    difficulty: "Hard",
    text: "The head of a school is the ______:",
    options: ["Principle", "Principal", "Prince", "Precis"],
    correct: 1,
    explanation: "'Principal' refers to the head of a school or a main amount. 'Principle' refers to a fundamental rule or belief."
  }
]

export default function QuizPage() {
  const { toast } = useToast()
  const quizRef = useRef<HTMLDivElement>(null)
  const questionCardRef = useRef<HTMLDivElement>(null)
  const feedbackRef = useRef<HTMLDivElement>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    const shuffledQuestions = [...ENGLISH_CODE_101_SET].map(q => {
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
      toast({ title: "Evaluation Complete!", description: "Check your performance for Subject Code 101." })
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
    if (answers[questions[currentStep].id] !== undefined) return
    setAnswers({ ...answers, [questions[currentStep].id]: val })
    
    // Auto-scroll to feedback
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
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="text-center p-10 border-none shadow-2xl rounded-[3rem] animate-fade-in-up bg-white">
            <div className="bg-primary/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
              <Award className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-4xl font-headline mb-2 font-bold">Elite Performance</CardTitle>
            <CardDescription className="text-lg mb-10 font-medium">Subject Code 101 Official Marking Applied</CardDescription>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-5 bg-green-50 rounded-2xl border border-green-100 text-center shadow-sm">
                <div className="text-xs font-bold text-green-700 uppercase mb-1">Correct (+5)</div>
                <div className="text-3xl font-bold text-green-700">+{correct * 5}</div>
              </div>
              <div className="p-5 bg-red-50 rounded-2xl border border-red-100 text-center shadow-sm">
                <div className="text-xs font-bold text-red-700 uppercase mb-1">Errors (-1)</div>
                <div className="text-3xl font-bold text-red-700">-{wrong}</div>
              </div>
            </div>

            <div className="flex justify-between items-center p-8 bg-foreground text-background rounded-[2rem] shadow-xl mb-10">
              <div className="flex flex-col text-left">
                <span className="text-base opacity-70 font-bold">Net Marks</span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Scaled to 50 questions</span>
              </div>
              <span className="text-5xl font-bold">{total} <span className="text-xl opacity-40">/ 250</span></span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1 h-14 text-xl font-bold rounded-2xl shadow-lg" onClick={() => window.location.reload()}>
                <RefreshCw className="w-5 h-5 mr-3" /> Re-attempt
              </Button>
              <Button variant="outline" size="lg" className="flex-1 h-14 text-lg font-bold rounded-2xl" asChild>
                <Link href="/">Dashboard</Link>
              </Button>
            </div>
          </Card>

          <section className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold flex items-center gap-2 px-4">
              <Info className="w-6 h-6 text-primary" />
              Detailed Item Analysis
            </h2>
            <div className="space-y-4">
              {questions.map((q, idx) => {
                const userAns = answers[q.id]
                const isCorrect = isAnswerCorrect(userAns, q.correct)
                return (
                  <Card key={idx} className="border-none shadow-md overflow-hidden rounded-[2rem]">
                    <div className={cn("px-8 py-4 flex items-center justify-between", isCorrect ? "bg-green-50" : "bg-red-50")}>
                      <Badge variant={isCorrect ? "default" : "destructive"} className="rounded-full px-4 font-bold">
                        {isCorrect ? "CORRECT (+5)" : "ERROR (-1)"}
                      </Badge>
                      <span className="text-xs font-bold uppercase tracking-widest opacity-40">{q.section}</span>
                    </div>
                    <CardContent className="p-8 space-y-4">
                      <p className="text-lg font-bold leading-relaxed">{q.text}</p>
                      <div className="grid gap-2">
                        <div className={cn("p-4 rounded-xl flex items-center gap-3 border", isCorrect ? "bg-green-100/30 border-green-200" : "bg-red-100/30 border-red-200")}>
                          {isCorrect ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                          <div className="text-sm">
                            <span className="font-bold">Your Selection: </span>
                            {userAns !== undefined ? q.options[userAns] : "Not Attempted"}
                          </div>
                        </div>
                        {!isCorrect && (
                          <div className="p-4 rounded-xl flex items-center gap-3 border bg-green-100/30 border-green-200">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <div className="text-sm">
                              <span className="font-bold">{Array.isArray(q.correct) ? "Valid Interpretations: " : "Correct Option: "}</span>
                              {Array.isArray(q.correct) 
                                ? q.correct.map(idx => q.options[idx]).join(" OR ")
                                : q.options[q.correct as number]
                              }
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="pt-4 border-t border-dashed">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          <strong className="text-foreground">Clinical Strategy: </strong>
                          {q.explanation}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    )
  }

  if (questions.length === 0) return null

  const question = questions[currentStep]
  const userAnswer = answers[question.id]
  const isCorrect = userAnswer !== undefined && isAnswerCorrect(userAnswer, question.correct)

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="flex items-center justify-between mb-8" ref={quizRef}>
          <div>
            <h1 className="text-2xl font-headline font-bold uppercase tracking-tight text-primary">Examination Protocol</h1>
            <p className="text-muted-foreground font-mono text-sm font-bold">Item {currentStep + 1} / {questions.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full text-[10px] font-bold text-muted-foreground">
              <Keyboard className="w-3 h-3" />
              PRESS ENTER
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-bold">Code 101</Badge>
            <Badge variant={question.difficulty === 'Hard' ? 'destructive' : 'default'} className="font-bold">
              {question.difficulty}
            </Badge>
          </div>
        </div>

        <Progress value={((currentStep) / questions.length) * 100} className="mb-12 h-2" />

        <Card className="border-none shadow-xl mb-8 animate-fade-in-up rounded-[2.5rem] bg-white overflow-hidden" ref={questionCardRef}>
          <CardHeader className="bg-primary/5 pb-8 pt-10">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{question.section}</span>
            </div>
            <CardTitle className="text-2xl leading-relaxed font-bold text-foreground">{question.text}</CardTitle>
          </CardHeader>
          <CardContent className="p-10 pt-6">
            <RadioGroup 
              onValueChange={(val) => handleAnswer(parseInt(val))} 
              value={userAnswer?.toString()} 
              disabled={userAnswer !== undefined}
              className="grid gap-3"
            >
              {question.options.map((opt, i) => {
                const isSelected = userAnswer === i
                const isCorrectOption = isAnswerCorrect(i, question.correct)
                
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
                    <RadioGroupItem value={i.toString()} id={`q-${question.id}-opt-${i}`} className="pointer-events-none" />
                    <Label 
                      htmlFor={`q-${question.id}-opt-${i}`} 
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
                  <div className={cn("p-6 rounded-2xl mb-6", isCorrect ? "bg-green-50 border border-green-100" : "bg-red-50 border border-red-100")}>
                    <div className="flex items-center gap-3 mb-3">
                      {isCorrect ? <CheckCircle2 className="w-6 h-6 text-green-600" /> : <XCircle className="w-6 h-6 text-red-600" />}
                      <span className={cn("text-xl font-bold", isCorrect ? "text-green-700" : "text-red-700")}>
                        {isCorrect ? "Perfect Scoop!" : "Brain Freeze!"}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Clinical Strategy:</strong> {question.explanation}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="font-bold text-muted-foreground hover:text-primary rounded-xl">
            <ChevronLeft className="w-5 h-5 mr-1" /> Previous
          </Button>
          <Button size="lg" className="px-12 h-14 text-lg font-bold rounded-2xl shadow-xl group" onClick={nextQuestion} disabled={userAnswer === undefined}>
            {currentStep === questions.length - 1 ? "Finish Examination" : "Next Question"} <ArrowRight className="w-5 h-5 ml-3 group-hover:scale-110 transition-transform" />
          </Button>
        </div>

        <div className="mt-12 p-8 rounded-3xl bg-secondary/10 border border-secondary/20 flex gap-5 shadow-sm bg-white">
          <AlertCircle className="w-8 h-8 text-secondary-foreground shrink-0" />
          <div className="text-sm text-secondary-foreground font-bold">
            <strong className="block mb-1">Subject Code 101 Protocol:</strong>
            All 50 questions are compulsory. Every correct answer contributes +5 to your 250 goal. Mistakes incur a -1 penalty. Practise precision.
          </div>
        </div>
      </main>
    </div>
  )
}
