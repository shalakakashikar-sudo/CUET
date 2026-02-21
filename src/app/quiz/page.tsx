
"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, AlertCircle, ArrowRight, RefreshCw, ChevronLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Question = {
  id: number
  text: string
  options: string[]
  correct: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  section: string
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    section: "English",
    difficulty: "Easy",
    text: "Choose the synonym for 'Eloquent'.",
    options: ["Fluent", "Silent", "Confused", "Rude"],
    correct: 0
  },
  {
    id: 2,
    section: "English",
    difficulty: "Medium",
    text: "Pick the correct idiom for: 'To fail miserably'.",
    options: ["Hit the sack", "Go down in flames", "Piece of cake", "Break a leg"],
    correct: 1
  },
  {
    id: 3,
    section: "Logic",
    difficulty: "Easy",
    text: "If 1=3, 2=5, 3=7, then 4=?",
    options: ["8", "9", "10", "11"],
    correct: 1
  },
  {
    id: 4,
    section: "Logic",
    difficulty: "Hard",
    text: "Identify the missing number in the sequence: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    correct: 1
  },
  {
    id: 5,
    section: "GK",
    difficulty: "Medium",
    text: "Who is the Chairman of the Rajya Sabha in India?",
    options: ["The President", "The Prime Minister", "The Vice President", "The Speaker"],
    correct: 2
  }
]

export default function QuizPage() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)
  const [difficultyLevel, setDifficultyLevel] = useState<'Easy' | 'Medium' | 'Hard'>('Medium')

  // Simple "Adaptive" logic:
  // If user gets Medium right, try Hard. If wrong, try Easy.
  const handleAnswer = (val: string) => {
    setAnswers({ ...answers, [QUIZ_QUESTIONS[currentStep].id]: parseInt(val) })
  }

  const nextQuestion = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      // Adaptive difficulty shift simulation
      const currentQ = QUIZ_QUESTIONS[currentStep]
      const isCorrect = answers[currentQ.id] === currentQ.correct
      
      if (isCorrect && difficultyLevel === 'Easy') setDifficultyLevel('Medium')
      if (isCorrect && difficultyLevel === 'Medium') setDifficultyLevel('Hard')
      if (!isCorrect && difficultyLevel === 'Hard') setDifficultyLevel('Medium')
      if (!isCorrect && difficultyLevel === 'Medium') setDifficultyLevel('Easy')

      setCurrentStep(currentStep + 1)
    } else {
      setIsFinished(true)
      toast({ title: "Quiz Completed!", description: "Check your performance summary below." })
    }
  }

  const resetQuiz = () => {
    setCurrentStep(0)
    setAnswers({})
    setIsFinished(false)
    setDifficultyLevel('Medium')
  }

  const calculateScore = () => {
    let correct = 0
    QUIZ_QUESTIONS.forEach(q => {
      if (answers[q.id] === q.correct) correct++
    })
    return correct
  }

  if (isFinished) {
    const score = calculateScore()
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-12 flex items-center justify-center">
          <Card className="w-full max-w-lg text-center p-8 border-none shadow-xl animate-fade-in-up">
            <div className="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-headline mb-2">Great Effort!</CardTitle>
            <CardDescription className="text-lg mb-8">You scored {score} out of {QUIZ_QUESTIONS.length}</CardDescription>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                <span className="font-medium">Accuracy</span>
                <span className="text-primary-foreground font-bold">{(score/QUIZ_QUESTIONS.length * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                <span className="font-medium">Difficulty Level Handled</span>
                <Badge>{difficultyLevel}</Badge>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button size="lg" className="w-full" onClick={resetQuiz}>
                <RefreshCw className="w-4 h-4 mr-2" /> Try Another Set
              </Button>
              <Button variant="outline" size="lg" className="w-full" asChild>
                <a href="/">Back to Dashboard</a>
              </Button>
            </div>
          </Card>
        </main>
      </div>
    )
  }

  const question = QUIZ_QUESTIONS[currentStep]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-headline font-bold">Adaptive Practice</h1>
            <p className="text-muted-foreground">Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Difficulty</span>
            <Badge variant={difficultyLevel === 'Hard' ? 'destructive' : difficultyLevel === 'Medium' ? 'default' : 'secondary'}>
              {difficultyLevel}
            </Badge>
          </div>
        </div>

        <Progress value={((currentStep) / QUIZ_QUESTIONS.length) * 100} className="mb-12 h-2" />

        <Card className="border-border/50 shadow-sm mb-8 animate-fade-in-up">
          <CardHeader>
            <div className="flex items-center gap-2 text-sm text-secondary-foreground mb-4 font-semibold">
              <span className="bg-secondary/30 px-2 py-0.5 rounded uppercase tracking-tighter text-[10px]">{question.section}</span>
            </div>
            <CardTitle className="text-xl leading-relaxed">{question.text}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup onValueChange={handleAnswer} value={answers[question.id]?.toString()} className="grid gap-4 mt-4">
              {question.options.map((opt, i) => (
                <div key={i} className={`flex items-center space-x-3 border p-4 rounded-xl transition-all cursor-pointer hover:bg-primary/5 ${answers[question.id] === i ? 'border-primary bg-primary/10 shadow-sm' : 'border-border'}`}>
                  <RadioGroupItem value={i.toString()} id={`q-${question.id}-opt-${i}`} className="text-primary-foreground" />
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
          <Button size="lg" onClick={nextQuestion} disabled={answers[question.id] === undefined}>
            {currentStep === QUIZ_QUESTIONS.length - 1 ? "Finish Quiz" : "Next Question"} <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-secondary/10 border border-secondary/20 flex gap-4">
          <AlertCircle className="w-6 h-6 text-secondary-foreground shrink-0" />
          <p className="text-sm text-secondary-foreground">
            <strong>Adaptive Engine Active:</strong> Since you answered the previous question correctly, we've adjusted the difficulty. Keep it up!
          </p>
        </div>
      </main>
    </div>
  )
}
