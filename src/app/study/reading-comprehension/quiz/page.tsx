"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, RefreshCw, ChevronLeft, Target, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const RC_QUIZ_DATA = [
  {
    id: 1,
    passage: "The concept of 'flow', introduced by psychologist Mihaly Csikszentmihalyi, refers to a state of complete immersion and energised focus in an activity. Athletes call it being 'in the zone'. Flow experiences are most likely when there is a balance between the challenge of the task and the skill of the person attempting it. If the task is too easy, boredom sets in. If it is too difficult, anxiety takes over.",
    question: "According to the passage, what is the central idea?",
    options: [
      "Flow is a state achievable only by professional athletes and musicians.",
      "External rewards are the main motivation behind engaging in challenging activities.",
      "Flow is a state of deep engagement that produces the most satisfying experiences in life.",
      "Boredom and anxiety are the primary psychological problems faced by professionals."
    ],
    correct: 2
  },
  {
    id: 2,
    passage: "Flow is not passive -- it requires active engagement. It is the opposite of relaxing on a sofa or watching television. Flow can be achieved in a wide variety of activities: sports, art, coding, surgery, or even cooking.",
    question: "What must be true for flow to occur, according to the passage?",
    options: [
      "The activity must be passive and relaxing.",
      "The person must be an expert in the activity.",
      "The challenge of the task and the skill of the person must be roughly balanced.",
      "The activity must provide external rewards."
    ],
    correct: 2
  },
  {
    id: 3,
    passage: "Long before the invention of the printing press, books were painstakingly copied by hand -- a process so time-consuming that a single book could take months or even years to produce. Known as manuscripts, these were primarily made in monasteries by monks who devoted their lives to the preservation of knowledge.",
    question: "What made manuscripts more than just texts, according to the passage?",
    options: [
      "They were written in Latin.",
      "They were decorated with illustrations and gold leaf.",
      "They were produced in monasteries.",
      "They were copied by monks who had taken vows of silence."
    ],
    correct: 1
  },
  {
    id: 4,
    passage: "Gutenberg introduced the movable-type printing press in the 1440s. Books became affordable and accessible. Ideas spread rapidly across Europe, and some historians argue the printing press was one of the key catalysts for the Renaissance and Scientific Revolution.",
    question: "In the passage about the printing press, the word 'redundant' most closely means:",
    options: [
      "Highly skilled and specialised",
      "No longer needed or useful",
      "Extremely rare and precious",
      "Busy and overworked"
    ],
    correct: 1
  }
]

export default function RCQuizPage() {
  const { toast } = useToast()
  const [questions, setQuestions] = useState(RC_QUIZ_DATA)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    setQuestions([...RC_QUIZ_DATA].sort(() => Math.random() - 0.5))
  }, [])

  // Scroll to top when question changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep, isFinished])

  const handleAnswer = (val: string) => {
    setAnswers({ ...answers, [questions[currentStep].id]: parseInt(val) })
  }

  const nextQuestion = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsFinished(true)
      toast({ title: "RC Set Complete!", description: "Check your +5/-1 accuracy." })
    }
  }

  const calculateScore = () => {
    let correct = 0
    let wrong = 0
    questions.forEach(q => {
      const ans = answers[q.id]
      if (ans === q.correct) correct++
      else wrong++
    })
    return { correct, wrong, total: correct * 5 - wrong * 1 }
  }

  if (isFinished) {
    const { correct, wrong, total } = calculateScore()
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-lg text-center p-8 border-none shadow-2xl rounded-[2rem]">
          <div className="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline mb-2">RC Excellence Score</CardTitle>
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
            <div className="text-sm opacity-70">Total Section Marks</div>
            <div className="text-4xl font-bold">{total} / {questions.length * 5}</div>
          </div>
          <div className="flex flex-col gap-3">
            <Button size="lg" className="rounded-xl h-12 font-bold" onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4 mr-2" /> Retake randomized quiz
            </Button>
            <Button variant="outline" size="lg" className="rounded-xl h-12" asChild>
              <Link href="/study/reading-comprehension">Back to Material</Link>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const q = questions[currentStep]

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-headline font-bold uppercase tracking-tight text-primary">RC Practice</h1>
            <p className="text-muted-foreground font-mono text-sm">Passage {currentStep + 1} of {questions.length}</p>
          </div>
          <Badge variant="outline" className="h-8 px-4 rounded-full border-primary/20 text-primary">Subject Code 101</Badge>
        </div>

        <Progress value={(currentStep / questions.length) * 100} className="mb-12 h-2" />

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Card className="border-none shadow-sm bg-white/70 backdrop-blur-sm p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4 text-primary font-bold text-sm">
              <BookOpen className="w-4 h-4" /> PASSAGE EXCERPT
            </div>
            <p className="text-foreground leading-relaxed italic">{q.passage}</p>
          </Card>

          <div className="space-y-6">
            <Card className="border-none shadow-xl rounded-2xl">
              <CardHeader>
                <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Question {currentStep + 1}</div>
                <CardTitle className="text-lg leading-snug">{q.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup onValueChange={handleAnswer} value={answers[q.id]?.toString()} className="grid gap-3">
                  {q.options.map((opt, i) => (
                    <div key={i} className={`flex items-center space-x-3 border p-4 rounded-xl transition-all cursor-pointer hover:bg-primary/5 ${answers[q.id] === i ? 'border-primary bg-primary/10' : 'border-border'}`}>
                      <RadioGroupItem value={i.toString()} id={`q-${q.id}-opt-${i}`} />
                      <Label htmlFor={`q-${q.id}-opt-${i}`} className="flex-1 cursor-pointer text-sm font-medium">{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center">
              <Button variant="ghost" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              <Button size="lg" className="px-10 h-12 rounded-xl font-bold" onClick={nextQuestion} disabled={answers[q.id] === undefined}>
                {currentStep === questions.length - 1 ? "Finish Set" : "Next Passage"} <Target className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}