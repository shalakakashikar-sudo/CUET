
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, AlertCircle, ArrowRight, RefreshCw, ChevronLeft, Target, Award } from "lucide-react"
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

const ENGLISH_CODE_101_SET: Question[] = [
  {
    id: 1,
    section: "Reading Comprehension",
    difficulty: "Medium",
    text: "According to the passage on 'Flow', what state is described as athletes being 'in the zone'?",
    options: ["Boredom", "Anxiety", "Flow", "Immersion"],
    correct: 2
  },
  {
    id: 2,
    section: "Synonyms",
    difficulty: "Hard",
    text: "Choose the synonym for 'MUNIFICENT':",
    options: ["Stingy", "Bountiful", "Fragile", "Wisely"],
    correct: 1
  },
  {
    id: 3,
    section: "Antonyms",
    difficulty: "Medium",
    text: "Choose the antonym for 'LOQUACIOUS':",
    options: ["Talkative", "Verbose", "Garrulous", "Reticent"],
    correct: 3
  },
  {
    id: 4,
    section: "Grammar",
    difficulty: "Hard",
    text: "By the time the ambulance arrived, the patient ______ unconscious for twenty minutes.",
    options: ["was", "has been", "had been", "is"],
    correct: 2
  },
  {
    id: 5,
    section: "Conjunctions",
    difficulty: "Medium",
    text: "______ being a handicapped person, he is very co-operative.",
    options: ["Because", "Despite", "Although", "Basically"],
    correct: 1
  },
  {
    id: 6,
    section: "Idioms",
    difficulty: "Easy",
    text: "Meaning of 'At the eleventh hour':",
    options: ["Important time", "At the last moment", "Exactly at 11:00", "Too early"],
    correct: 1
  },
  {
    id: 7,
    section: "Figures of Speech",
    difficulty: "Medium",
    text: "'Time is a thief' is an example of:",
    options: ["Simile", "Metaphor", "Personification", "Hyperbole"],
    correct: 1
  },
  {
    id: 8,
    section: "Rearrangement",
    difficulty: "Hard",
    text: "Rearrange: A: were arrested / B: four criminals / C: in Varanasi",
    options: ["B-A-C", "C-A-B", "A-B-C", "C-B-A"],
    correct: 0
  },
  {
    id: 9,
    section: "Vocabulary",
    difficulty: "Medium",
    text: "Synonym of 'EPHEMERAL':",
    options: ["Permanent", "Transient", "Eternal", "Enduring"],
    correct: 1
  },
  {
    id: 10,
    section: "Homonyms",
    difficulty: "Hard",
    text: "The head of a school is the ______:",
    options: ["Principle", "Principal", "Prince", "Precis"],
    correct: 1
  }
]

export default function QuizPage() {
  const { toast } = useToast()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    setQuestions([...ENGLISH_CODE_101_SET].sort(() => Math.random() - 0.5))
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
      toast({ title: "Evaluation Complete!", description: "Check your performance for Subject Code 101." })
    }
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

  if (isFinished) {
    const { correct, wrong, total } = calculateScore()
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-xl text-center p-10 border-none shadow-2xl rounded-[3rem] animate-fade-in-up bg-white">
          <div className="bg-primary/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <Award className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-4xl font-headline mb-2 font-bold">Elite Performance</CardTitle>
          <CardDescription className="text-lg mb-10 font-medium">Subject Code 101 Official Marking Applied</CardDescription>
          
          <div className="space-y-6 mb-10 text-left">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-green-50 rounded-2xl border border-green-100 text-center shadow-sm">
                <div className="text-xs font-bold text-green-700 uppercase mb-1">Correct (+5)</div>
                <div className="text-3xl font-bold text-green-700">+{correct * 5}</div>
              </div>
              <div className="p-5 bg-red-50 rounded-2xl border border-red-100 text-center shadow-sm">
                <div className="text-xs font-bold text-red-700 uppercase mb-1">Errors (-1)</div>
                <div className="text-3xl font-bold text-red-700">-{wrong}</div>
              </div>
            </div>
            <div className="flex justify-between items-center p-8 bg-foreground text-background rounded-[2rem] shadow-xl">
              <div className="flex flex-col">
                <span className="text-base opacity-70 font-bold">Net Marks</span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Scaled to 50 questions</span>
              </div>
              <span className="text-5xl font-bold">{total} <span className="text-xl opacity-40">/ 250</span></span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button size="lg" className="w-full h-14 text-xl font-bold rounded-2xl" onClick={() => window.location.reload()}>
              <RefreshCw className="w-5 h-5 mr-3" /> Re-attempt randomized set
            </Button>
            <Button variant="outline" size="lg" className="w-full h-14 text-lg font-bold rounded-2xl" asChild>
              <Link href="/">Return to Dashboard</Link>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  if (questions.length === 0) return null

  const question = questions[currentStep]

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-headline font-bold uppercase tracking-tight text-primary">Examination Protocol</h1>
            <p className="text-muted-foreground font-mono text-sm font-bold">Item {currentStep + 1} / {questions.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-bold">Code 101</Badge>
            <Badge variant={question.difficulty === 'Hard' ? 'destructive' : 'default'} className="font-bold">
              {question.difficulty}
            </Badge>
          </div>
        </div>

        <Progress value={((currentStep) / questions.length) * 100} className="mb-12 h-2" />

        <Card className="border-none shadow-xl mb-8 animate-fade-in-up rounded-[2.5rem] bg-white overflow-hidden">
          <CardHeader className="bg-primary/5 pb-8 pt-10">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{question.section}</span>
            </div>
            <CardTitle className="text-2xl leading-relaxed font-medium text-foreground">{question.text}</CardTitle>
          </CardHeader>
          <CardContent className="p-10">
            <RadioGroup onValueChange={handleAnswer} value={answers[question.id]?.toString()} className="grid gap-4 mt-4">
              {question.options.map((opt, i) => (
                <div key={i} className={`flex items-center space-x-3 border p-5 rounded-2xl transition-all cursor-pointer hover:bg-primary/5 ${answers[question.id] === i ? 'border-primary bg-primary/10 shadow-md ring-1 ring-primary/20' : 'border-border'}`}>
                  <RadioGroupItem value={i.toString()} id={`q-${question.id}-opt-${i}`} />
                  <Label htmlFor={`q-${question.id}-opt-${i}`} className="flex-1 cursor-pointer text-lg font-bold text-foreground">{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="font-bold text-muted-foreground hover:text-primary">
            <ChevronLeft className="w-5 h-5 mr-1" /> Previous
          </Button>
          <Button size="lg" className="px-12 h-14 text-lg font-bold rounded-2xl shadow-xl" onClick={nextQuestion} disabled={answers[question.id] === undefined}>
            {currentStep === questions.length - 1 ? "Finish Examination" : "Next Question"} <ArrowRight className="w-5 h-5 ml-3" />
          </Button>
        </div>

        <div className="mt-12 p-8 rounded-3xl bg-secondary/10 border border-secondary/20 flex gap-5 shadow-sm bg-white">
          <AlertCircle className="w-8 h-8 text-secondary-foreground shrink-0" />
          <div className="text-sm text-secondary-foreground font-bold">
            <strong className="block mb-1">Subject Code 101 Protocol:</strong>
            All 50 questions are compulsory. Every correct answer contributes +5 to your 250 goal. Mistakes incur a -1 penalty.
          </div>
        </div>
      </main>
    </div>
  )
}
