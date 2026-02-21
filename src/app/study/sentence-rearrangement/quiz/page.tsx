
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, RefreshCw, ChevronLeft, Target, Layers, Info, CheckCircle2, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { cn } from "@/lib/utils"

const REARRANGE_QUIZ_DATA = [
  {
    id: 1,
    parts: ["the fragrance of jasmine drifted", "as the evening breeze passed through", "the open windows of the old house", "filling the room with a gentle sweetness"],
    q: "Rearrange the parts labelled A, B, C, D to form a meaningful sentence.",
    options: ["B-C-A-D", "A-B-C-D", "D-A-C-B", "C-A-D-B"],
    correct: 0,
    explanation: "The sentence starts with the setting ('As the evening breeze...'), followed by the location ('passed through the open windows...'), then the primary action ('fragrance drifted'), and ends with the result ('filling the room...')."
  },
  {
    id: 2,
    parts: ["the committee decided to postpone", "the annual function", "due to the heavy rain forecast", "for the entire region"],
    q: "Choose the correct sequence:",
    options: ["B-A-D-C", "A-B-C-D", "C-D-A-B", "D-B-C-A"],
    correct: 1,
    explanation: "This follows a simple Subject-Verb-Object pattern: The committee (S) decided to postpone (V) the annual function (O), followed by the reason (due to...)."
  },
  {
    id: 3,
    parts: ["arrested", "criminals", "were", "in Varanasi", "four"],
    q: "Rearrange the words to form a meaningful sentence:",
    options: [
      "Four criminals were arrested in Varanasi",
      "In Varanasi four criminals were arrested",
      "Criminals arrested in Varanasi were four",
      "None of the above"
    ],
    correct: 0,
    explanation: "Standard English sentence structure is Subject (Four criminals) + Verb (were arrested) + Place (in Varanasi)."
  },
  {
    id: 4,
    parts: ["steal", "tried to", "they", "from", "museum", "a Buddha", "statue", "the"],
    q: "Choose the correct sentence:",
    options: [
      "They tried to steal from the museum a Buddha statue",
      "A Buddha statue from the museum they tried to steal",
      "They tried to steal a Buddha statue from the museum",
      "None of the above"
    ],
    correct: 2,
    explanation: "The direct object (a Buddha statue) should follow the verb (tried to steal) before the prepositional phrase (from the museum)."
  },
  {
    id: 5,
    parts: ["in place", "famous", "the", "is back", "statue"],
    q: "Rearrange the words:",
    options: [
      "The famous place is back in statue",
      "The back statue is in famous place",
      "The famous statue is back in place",
      "No correction required"
    ],
    correct: 2,
    explanation: "Adjectives (famous) must precede the noun (statue). 'Is back in place' is the standard idiomatic expression for returning."
  }
]

export default function RearrangeQuizPage() {
  const { toast } = useToast()
  const [questions, setQuestions] = useState(REARRANGE_QUIZ_DATA)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    setQuestions([...REARRANGE_QUIZ_DATA].sort(() => Math.random() - 0.5))
  }, [])

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
      toast({ title: "Logic Set Complete!", description: "Check your +5/-1 accuracy." })
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
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          <Card className="text-center p-8 border-none shadow-2xl rounded-[2rem] bg-white">
            <div className="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Layers className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline mb-2">Rearrange Score</CardTitle>
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
              <div className="text-sm opacity-70">Section Total</div>
              <div className="text-4xl font-bold">{total} / {questions.length * 5}</div>
            </div>
            <div className="flex flex-col gap-3">
              <Button size="lg" className="rounded-xl h-12 font-bold" onClick={() => window.location.reload()}>
                <RefreshCw className="w-4 h-4 mr-2" /> Retake randomized quiz
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl h-12" asChild>
                <Link href="/study/sentence-rearrangement">Back to Material</Link>
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
              const isCorrect = userAns === q.correct
              return (
                <Card key={idx} className="border-none shadow-md overflow-hidden rounded-[1.5rem] bg-white">
                  <div className={cn("px-6 py-3 flex items-center justify-between", isCorrect ? "bg-green-50" : "bg-red-50")}>
                    <Badge variant={isCorrect ? "default" : "destructive"}>
                      {isCorrect ? "Correct" : "Error"}
                    </Badge>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {q.parts.map((p, i) => (
                        <Badge key={i} variant="outline" className="text-[10px] font-mono">
                          {String.fromCharCode(65+i)}: {p}
                        </Badge>
                      ))}
                    </div>
                    <p className="font-bold">{q.q}</p>
                    <div className="grid gap-2 text-sm">
                      <div className={cn("p-3 rounded-lg flex items-center gap-2", isCorrect ? "bg-green-50" : "bg-red-50")}>
                        {isCorrect ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
                        <span><strong className="text-foreground">Your answer:</strong> {q.options[userAns]}</span>
                      </div>
                      {!isCorrect && (
                        <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                          <span className="font-bold">Correct answer:</span> {q.options[q.correct]}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground pt-4 border-t border-dashed">
                      <strong className="text-foreground">Rule of 101:</strong> {q.explanation}
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

  const q = questions[currentStep]

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-headline font-bold uppercase tracking-tight text-primary">Sentence Logic</h1>
            <p className="text-muted-foreground font-mono text-sm">Question {currentStep + 1} of {questions.length}</p>
          </div>
          <Badge variant="outline" className="h-8 px-4 rounded-full border-primary/20 text-primary">Subject Code 101</Badge>
        </div>

        <Progress value={(currentStep / questions.length) * 100} className="mb-12 h-2" />

        <Card className="border-none shadow-xl rounded-[2rem] bg-white mb-8">
          <CardHeader className="bg-primary/5 pb-8 pt-10">
            <CardTitle className="text-xl text-center leading-relaxed mb-6">{q.q}</CardTitle>
            <div className="flex flex-wrap gap-2 justify-center">
              {q.parts.map((p, i) => (
                <div key={i} className="px-4 py-2 bg-white border border-primary/20 rounded-xl text-sm font-bold text-primary shadow-sm">
                  {String.fromCharCode(65 + i)}: {p}
                </div>
              ))}
            </div>
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

        <div className="flex justify-between items-center">
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
