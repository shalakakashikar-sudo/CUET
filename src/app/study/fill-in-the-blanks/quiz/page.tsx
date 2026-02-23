
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, RefreshCw, ChevronLeft, Target, PenTool, CheckCircle2, XCircle, Info, Keyboard, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Question = {
  id: number
  q: string
  options: string[]
  correct: number | number[]
  explanation: string
}

const FILLERS_QUIZ_DATA: Question[] = [
  { 
    id: 1, 
    q: "By the time the ambulance arrived, the patient ______ unconscious for twenty minutes.", 
    options: ["was", "has been", "had been", "is"], 
    correct: 2,
    explanation: "Two actions happened in the past. The first action (being unconscious) must be in Past Perfect ('had been')."
  },
  { 
    id: 2, 
    q: "______ the heavy criticism, the director chose to screen the film internationally.", 
    options: ["Because of", "Despite", "Although", "Since"], 
    correct: 1,
    explanation: "'Despite' is used before a noun/phrase to show contrast. 'Although' requires a full clause."
  },
  { 
    id: 3, 
    q: "The scientist spoke ______ to the reporters, ensuring her research was clearly understood.", 
    options: ["carelessly", "hastily", "abruptly", "lucidly"], 
    correct: 3,
    explanation: "'Lucidly' means clearly and easily understood, which matches the context of 'ensuring research was clearly understood'."
  },
  { 
    id: 4, 
    q: "No sooner did the bell ring ______ the actor started singing.", 
    options: ["when", "after", "than", "before"], 
    correct: 2,
    explanation: "'No sooner' is always paired with 'than' in standard comparative structures of sequence."
  },
  { 
    id: 5, 
    q: "______ being a handicapped person, he is very co-operative and self-reliant.", 
    options: ["Because", "Despite", "Although", "Basically"], 
    correct: 1,
    explanation: "'Despite' is used to show contrast when followed by a gerund ('being')."
  },
  { 
    id: 6, 
    q: "If I ______ you, I would apologise immediately.", 
    options: ["am", "was", "were", "will be"], 
    correct: 2,
    explanation: "In hypothetical/imaginary conditions (Second Conditional), 'were' is used for all subjects."
  },
  { 
    id: 7, 
    q: "She has not visited her native village ______ she moved to the city.", 
    options: ["when", "after", "since", "before"], 
    correct: 2,
    explanation: "'Since' is used to indicate a point in time starting from the past action (moving to the city)."
  },
  { 
    id: 8, 
    q: "Both the brothers are equally handsome but the elder ______ the two is more intelligent.", 
    options: ["among", "than", "of", "in"], 
    correct: 2,
    explanation: "When comparing exactly two people or things, we use 'of the two'."
  }
]

export default function FillersQuizPage() {
  const { toast } = useToast()
  const quizRef = useRef<HTMLDivElement>(null)
  const questionCardRef = useRef<HTMLDivElement>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    setQuestions([...FILLERS_QUIZ_DATA].sort(() => Math.random() - 0.5))
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
      toast({ title: "Grammar Set Complete!", description: "Check your +5/-1 accuracy." })
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
    setAnswers({ ...answers, [qId]: val })
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
              <PenTool className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline mb-2 font-bold">Grammar Quiz Results</CardTitle>
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
            <div className="p-6 bg-foreground text-background rounded-[1.5rem] mb-8">
              <div className="text-sm opacity-70">Section Score</div>
              <div className="text-4xl font-bold">{total} / {questions.length * 5}</div>
            </div>
            <div className="flex flex-col gap-3">
              <Button size="lg" className="rounded-xl h-12 font-bold shadow-md" onClick={() => window.location.reload()}>
                <RefreshCw className="w-4 h-4 mr-2" /> Retake randomized quiz
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl h-12 font-bold" asChild>
                <Link href="/study/fill-in-the-blanks">Back to Material</Link>
              </Button>
            </div>
          </Card>

          <section className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 px-2">
              <Info className="w-5 h-5 text-primary" />
              Detailed Item Analysis
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
                        <span><strong className="text-foreground">Your Choice:</strong> {q.options[userAns]}</span>
                      </div>
                      {!isCorrect && (
                        <div className="p-3 rounded-lg bg-green-100/30 border border-green-200">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>
                            <strong className="text-foreground">{Array.isArray(q.correct) ? "Valid Choices: " : "Correct Choice: "}</strong>
                            {Array.isArray(q.correct)
                              ? q.correct.map(i => q.options[i]).join(" OR ")
                              : q.options[q.correct as number]
                            }
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground pt-2 border-t">
                      <strong className="text-foreground">Clinical Logic:</strong> {q.explanation}
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

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="flex items-center justify-between mb-8" ref={quizRef}>
          <div>
            <h1 className="text-2xl font-headline font-bold uppercase tracking-tight text-primary">Grammar Practice</h1>
            <p className="text-muted-foreground font-mono text-sm font-bold">Question {currentStep + 1} of {questions.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full text-[10px] font-bold text-muted-foreground">
              <Keyboard className="w-3 h-3" />
              PRESS ENTER
            </div>
            <Badge variant="outline" className="h-8 px-4 rounded-full border-primary/20 text-primary font-bold">Code 101</Badge>
          </div>
        </div>

        <Progress value={(currentStep / questions.length) * 100} className="mb-12 h-2" />

        <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-white" ref={questionCardRef}>
          <CardHeader className="bg-primary/5 pb-8 pt-10">
            <CardTitle className="text-2xl text-center leading-relaxed font-bold">{q.q}</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <RadioGroup onValueChange={(val) => handleAnswer(parseInt(val))} value={answers[q.id]?.toString()} className="grid gap-3">
              {q.options.map((opt, i) => {
                const isSelected = answers[q.id] === i
                return (
                  <div 
                    key={i} 
                    onClick={() => handleAnswer(i)}
                    className={cn(
                      "flex items-center space-x-3 border p-5 rounded-2xl transition-all cursor-pointer group",
                      isSelected 
                        ? "border-primary bg-primary/10 ring-1 ring-primary/20 shadow-md" 
                        : "border-border hover:bg-primary/5 hover:border-primary/20"
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
                  </div>
                )
              })}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center mt-8">
          <Button variant="ghost" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="rounded-xl font-bold">
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          <Button size="lg" className="px-10 h-12 rounded-xl font-bold shadow-lg group" onClick={nextQuestion} disabled={answers[q.id] === undefined}>
            {currentStep === questions.length - 1 ? "Finish Set" : "Next Question"} <Target className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </main>
    </div>
  )
}
