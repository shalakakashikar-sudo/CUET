"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, AlertCircle, ArrowRight, RefreshCw, ChevronLeft, Target } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

type Question = {
  id: number
  text: string
  options: string[]
  correct: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  section: string
}

const ENGLISH_QUIZ: Question[] = [
  {
    id: 1,
    section: "Synonyms",
    difficulty: "Medium",
    text: "Which of the following is a synonym for 'EPHEMERAL'?",
    options: ["Permanent", "Transient", "Eternal", "Enduring"],
    correct: 1
  },
  {
    id: 2,
    section: "RC Tone",
    difficulty: "Easy",
    text: "If a passage uses words like 'whispered', 'shimmered', and 'echoed', what is its likely type?",
    options: ["Factual", "Discursive", "Narrative/Literary", "Statistical"],
    correct: 2
  },
  {
    id: 3,
    section: "Grammar",
    difficulty: "Hard",
    text: "No sooner did the bell ring ______ the actor started singing.",
    options: ["when", "after", "than", "before"],
    correct: 2
  },
  {
    id: 4,
    section: "Idioms",
    difficulty: "Medium",
    text: "What does the idiom 'At the eleventh hour' mean?",
    options: ["At noon", "At the very last moment", "Exactly at 11:00", "Too early"],
    correct: 1
  },
  {
    id: 5,
    section: "Grammar",
    difficulty: "Hard",
    text: "______ being a handicapped person, he is very co-operative.",
    options: ["Because", "Despite", "Although", "Basically"],
    correct: 1
  }
]

export default function QuizPage() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)

  const handleAnswer = (val: string) => {
    setAnswers({ ...answers, [ENGLISH_QUIZ[currentStep].id]: parseInt(val) })
  }

  const nextQuestion = () => {
    if (currentStep < ENGLISH_QUIZ.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsFinished(true)
      toast({ title: "Session Complete!", description: "View your score based on Code 101 rules." })
    }
  }

  const resetQuiz = () => {
    setCurrentStep(0)
    setAnswers({})
    setIsFinished(false)
  }

  const calculateScore = () => {
    let correct = 0
    let wrong = 0
    ENGLISH_QUIZ.forEach(q => {
      if (answers[q.id] === undefined) return
      if (answers[q.id] === q.correct) correct++
      else wrong++
    })
    return { correct, wrong, total: correct * 5 - wrong * 1 }
  }

  if (isFinished) {
    const { correct, wrong, total } = calculateScore()
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-12 flex items-center justify-center">
          <Card className="w-full max-w-lg text-center p-8 border-none shadow-xl animate-fade-in-up">
            <div className="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-headline mb-2">Results Summary</CardTitle>
            <CardDescription className="text-lg mb-8">Subject Code 101 Scoring Rule Applied</CardDescription>
            
            <div className="space-y-4 mb-8 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center">
                  <div className="text-xs font-bold text-green-700 uppercase">Correct</div>
                  <div className="text-2xl font-bold text-green-700">+{correct * 5}</div>
                </div>
                <div className="p-4 bg-red-50 rounded-xl border border-red-100 text-center">
                  <div className="text-xs font-bold text-red-700 uppercase">Wrong</div>
                  <div className="text-2xl font-bold text-red-700">-{wrong}</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-6 bg-foreground text-background rounded-2xl">
                <div className="flex flex-col">
                  <span className="text-sm opacity-70">Final Score</span>
                  <span className="text-xs">(on 25 Marks scale)</span>
                </div>
                <span className="text-4xl font-bold">{total}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button size="lg" className="w-full h-12 text-lg font-bold" onClick={resetQuiz}>
                <RefreshCw className="w-4 h-4 mr-2" /> Retake Practice
              </Button>
              <Button variant="outline" size="lg" className="w-full h-12" asChild>
                <Link href="/">Back to Dashboard</Link>
              </Button>
            </div>
          </Card>
        </main>
      </div>
    )
  }

  const question = ENGLISH_QUIZ[currentStep]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-headline font-bold uppercase tracking-tight">Adaptive Set</h1>
            <p className="text-muted-foreground font-mono text-sm">Q{currentStep + 1} / {ENGLISH_QUIZ.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Code 101</Badge>
            <Badge variant={question.difficulty === 'Hard' ? 'destructive' : 'default'}>
              {question.difficulty}
            </Badge>
          </div>
        </div>

        <Progress value={((currentStep) / ENGLISH_QUIZ.length) * 100} className="mb-12 h-2" />

        <Card className="border-border/50 shadow-sm mb-8 animate-fade-in-up">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-muted-foreground uppercase">{question.section}</span>
            </div>
            <CardTitle className="text-xl leading-relaxed">{question.text}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup onValueChange={handleAnswer} value={answers[question.id]?.toString()} className="grid gap-4 mt-4">
              {question.options.map((opt, i) => (
                <div key={i} className={`flex items-center space-x-3 border p-4 rounded-xl transition-all cursor-pointer hover:bg-primary/5 ${answers[question.id] === i ? 'border-primary bg-primary/10 shadow-sm' : 'border-border'}`}>
                  <RadioGroupItem value={i.toString()} id={`q-${question.id}-opt-${i}`} />
                  <Label htmlFor={`q-${question.id}-opt-${i}`} className="flex-1 cursor-pointer text-base font-medium">{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}>
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          <Button size="lg" className="px-10 h-12 font-bold" onClick={nextQuestion} disabled={answers[question.id] === undefined}>
            {currentStep === ENGLISH_QUIZ.length - 1 ? "Finish Set" : "Next Question"} <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-secondary/10 border border-secondary/20 flex gap-4">
          <AlertCircle className="w-6 h-6 text-secondary-foreground shrink-0" />
          <div className="text-sm text-secondary-foreground">
            <strong>Marking Reminder:</strong> A correct answer gives <strong>+5</strong>. An incorrect answer deducts <strong>-1</strong>. If you are 100% unsure, consider the impact on your final 250/250 goal.
          </div>
        </div>
      </main>
    </div>
  )
}
