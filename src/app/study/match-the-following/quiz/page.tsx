
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, RefreshCw, ChevronLeft, Target, MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const MATCH_QUIZ_DATA = [
  { id: 1, q: "Meaning of the idiom 'Turn a blind eye':", options: ["To look carefully", "To deliberately ignore something wrong", "To be physically impaired", "To close one eye while aiming"], correct: 1 },
  { id: 2, q: "Correct meaning of 'A stitch in time saves nine':", options: ["Sewing quickly is better", "Nine stitches are better than one", "Dealing with a small problem early prevents it growing", "Time spent sewing is valuable"], correct: 2 },
  { id: 3, q: "Meaning of 'At the eleventh hour':", options: ["Important time", "At the last moment", "Without saving", "Day before yesterday"], correct: 1 },
  { id: 4, q: "Figure of speech in 'Time is a thief':", options: ["Simile", "Metaphor", "Personification", "Hyperbole"], correct: 1 },
  { id: 5, q: "Example of an Oxymoron:", options: ["Time is money", "Life is a journey", "Deafening silence", "Fast as the wind"], correct: 2 },
  { id: 6, q: "Meaning of 'Small talk':", options: ["Gossip", "Brief discussion", "Polite conversation about unimportant things", "Talk of children"], correct: 2 },
  { id: 7, q: "Meaning of 'Bite the bullet':", options: ["Eat something dangerous", "Endure a painful situation with courage", "Speak aggressively", "Refuse a risk"], correct: 1 },
  { id: 8, q: "Figure of speech in 'The pen is mightier than the sword':", options: ["Onomatopoeia", "Pun", "Irony", "Metaphor"], correct: 3 }
]

export default function MatchQuizPage() {
  const { toast } = useToast()
  const [questions, setQuestions] = useState(MATCH_QUIZ_DATA)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    setQuestions([...MATCH_QUIZ_DATA].sort(() => Math.random() - 0.5))
  }, [])

  const handleAnswer = (val: string) => {
    setAnswers({ ...answers, [questions[currentStep].id]: parseInt(val) })
  }

  const nextQuestion = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsFinished(true)
      toast({ title: "Matching Set Complete!", description: "Check your +5/-1 accuracy." })
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
            <MessageCircle className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline mb-2">Matching Quiz Results</CardTitle>
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
            <div className="text-sm opacity-70">Total Score</div>
            <div className="text-4xl font-bold">{total} / {questions.length * 5}</div>
          </div>
          <div className="flex flex-col gap-3">
            <Button size="lg" className="rounded-xl h-12 font-bold" onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4 mr-2" /> Retake randomized quiz
            </Button>
            <Button variant="outline" size="lg" className="rounded-xl h-12" asChild>
              <Link href="/study/match-the-following">Back to Material</Link>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const q = questions[currentStep]

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-headline font-bold uppercase tracking-tight text-primary">Matching Practice</h1>
            <p className="text-muted-foreground font-mono text-sm">Question {currentStep + 1} of {questions.length}</p>
          </div>
          <Badge variant="outline" className="h-8 px-4 rounded-full border-primary/20 text-primary">Subject Code 101</Badge>
        </div>

        <Progress value={(currentStep / questions.length) * 100} className="mb-12 h-2" />

        <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-white">
          <CardHeader className="bg-primary/5 pb-8 pt-10">
            <CardTitle className="text-2xl text-center leading-relaxed">{q.q}</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <RadioGroup onValueChange={handleAnswer} value={answers[q.id]?.toString()} className="grid gap-4">
              {q.options.map((opt, i) => (
                <div key={i} className={`flex items-center space-x-3 border p-5 rounded-2xl transition-all cursor-pointer hover:bg-primary/5 ${answers[q.id] === i ? 'border-primary bg-primary/10 shadow-sm' : 'border-border'}`}>
                  <RadioGroupItem value={i.toString()} id={`q-${q.id}-opt-${i}`} />
                  <Label htmlFor={`q-${q.id}-opt-${i}`} className="flex-1 cursor-pointer text-lg font-medium">{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center mt-8">
          <Button variant="ghost" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}>
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          <Button size="lg" className="px-10 h-12 rounded-xl font-bold" onClick={nextQuestion} disabled={answers[q.id] === undefined}>
            {currentStep === questions.length - 1 ? "Finish Set" : "Next Question"} <Target className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  )
}
