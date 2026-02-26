
"use client"

import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Trophy, RefreshCw, ChevronLeft, Target, Award, 
  CheckCircle2, XCircle, Info, Keyboard, ArrowRight, 
  AlertCircle, LayoutGrid, BookOpen, Clock, 
  MessageSquare, Hash, PenTool, Layers
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

// POOLING DATA FROM REPOSITORIES
// (Normally these would be in a shared lib, defining here for clinical isolation)

type Question = {
  id: string
  section: string
  text: string
  options: string[]
  correct: number
  explanation: string
  passage?: string // For RC
  passageTitle?: string
  parts?: string[] // For Rearrangement
}

// 1. POOLING LOGIC (Simulating a large DB)
const POOL_RC = [
  {
    title: "The Silent Pioneers",
    content: "The arctic tundra is often perceived as a desolate wasteland, but it is actually a complex ecosystem teeming with life adapted to extreme conditions. Lichens, for instance, are symbiotic organisms composed of fungi and algae that can survive temperatures as low as -60 degrees Celsius. They play a crucial role in soil formation by slowly breaking down rock surfaces through chemical weathering. This process, which takes centuries, creates the foundation for other plant life. Furthermore, lichens serve as a vital food source for caribou during the harsh winter months. As climate change accelerates, the delicate balance of the tundra is being threatened. Thawing permafrost releases methane, a potent greenhouse gas, while rising temperatures allow invasive species to migrate northward, outcompeting native flora.",
    questions: [
      { id: "rc1-1", text: "What is the primary role of lichens in the tundra ecosystem according to the passage?", options: ["Providing shelter for caribou", "Breaking down rock surfaces", "Releasing methane into the atmosphere", "Protecting invasive species"], correct: 1, explanation: "The text states lichens 'play a crucial role in soil formation by slowly breaking down rock surfaces'." },
      { id: "rc1-2", text: "Choose the antonym of the word 'desolate' as used in the passage:", options: ["Barren", "Populated", "Isolated", "Gloomy"], correct: 1, explanation: "'Desolate' means empty/abandoned; 'Populated' is its opposite." },
      { id: "rc1-3", text: "What is the result of thawing permafrost?", options: ["Formation of new soil", "Release of methane", "Decrease in temperatures", "Increased lichen growth"], correct: 1, explanation: "The passage says 'Thawing permafrost releases methane'." },
      { id: "rc1-4", text: "Identify the figure of speech in 'The arctic tundra is... a desolate wasteland'.", options: ["Simile", "Metaphor", "Personification", "Hyperbole"], correct: 1, explanation: "Direct comparison without using 'like' or 'as'." }
    ]
  }
]

// To reach 50, we will define a diverse mock set. 
// In a real app, these would be imported from the JSON/Lib files.
const GENERATE_MOCK_EXAM = (): Question[] => {
  const qSet: Question[] = []

  // Add 12 RC (3 passages x 4 Qs)
  // For brevity, we'll repeat logic/passages but with unique IDs
  for(let i=0; i<3; i++) {
    const p = PO_PASSAGES[i] || PO_PASSAGES[0]
    p.questions.forEach(q => {
      qSet.push({
        ...q,
        id: `rc-${i}-${q.id}`,
        section: "Reading Comprehension",
        passage: p.content,
        passageTitle: p.title
      })
    })
  }

  // Add 10 Synonyms/Antonyms
  for(let i=0; i<10; i++) {
    qSet.push({
      id: `vocab-${i}`,
      section: "Lexical Intelligence",
      text: `Choose the synonym/antonym for: ${VOCAB_DATA[i].word}`,
      options: [VOCAB_DATA[i].syn, VOCAB_DATA[i].ant, "Irrelevant", "Casual"],
      correct: 0,
      explanation: VOCAB_DATA[i].explanation
    })
  }

  // Add 10 Match/Idioms
  for(let i=0; i<10; i++) {
    qSet.push({
      id: `match-${i}`,
      section: "Match Proficiency",
      text: `What is the meaning of the idiom: "${IDIOMS_DATA[i].text}"`,
      options: [IDIOMS_DATA[i].meaning, "To be fast", "To be lucky", "To be sad"],
      correct: 0,
      explanation: IDIOMS_DATA[i].explanation
    })
  }

  // Add 10 Fillers
  for(let i=0; i<10; i++) {
    qSet.push({
      id: `filler-${i}`,
      section: "Syntactic Precision",
      text: FILLERS_DATA[i].text,
      options: FILLERS_DATA[i].options,
      correct: FILLERS_DATA[i].correct,
      explanation: FILLERS_DATA[i].explanation
    })
  }

  // Add 8 Rearrangement
  for(let i=0; i<8; i++) {
    qSet.push({
      id: `rearrange-${i}`,
      section: "Sequential Logic",
      text: "Rearrange the segments to form a meaningful sentence.",
      parts: REARRANGE_DATA[i].parts,
      options: REARRANGE_DATA[i].options,
      correct: REARRANGE_DATA[i].correct,
      explanation: REARRANGE_DATA[i].explanation
    })
  }

  return qSet
}

const PO_PASSAGES = [
  {
    title: "The Stoic Mindset",
    content: "Stoicism, an ancient Greek school of philosophy, teaches the development of self-control and fortitude as a means of overcoming destructive emotions. It suggests that while we cannot control external events, we have complete control over our internal responses. By aligning our will with the natural order of the universe, we can attain tranquility. The Stoic does not seek to eliminate emotion but rather to refine it, transforming reactive passions into reasoned judgments. This clinical approach to life allows for a resilience that is unshakable even in the face of immense adversity.",
    questions: [
      { id: "1", text: "What is the core teaching of Stoicism according to the text?", options: ["Control over external events", "Self-control and fortitude", "Elimination of all emotions", "Ignoring the natural order"], correct: 1, explanation: "The text highlights self-control and fortitude as core means to overcome destructive emotions." },
      { id: "2", text: "What can a Stoic control?", options: ["External events", "Internal responses", "The natural order", "Universal destiny"], correct: 1, explanation: "The passage states we have 'complete control over our internal responses'." },
      { id: "3", text: "The goal of a Stoic is to:", options: ["Destroy all passion", "Attain tranquility", "Escape adversity", "Master others"], correct: 1, explanation: "Attaining tranquility is mentioned as the result of aligning with the natural order." },
      { id: "4", text: "Choose the synonym for 'fortitude':", options: ["Weakness", "Courage", "Haste", "Fear"], correct: 1, explanation: "'Fortitude' implies mental and emotional strength/courage." }
    ]
  },
  {
    title: "Micro-Ecosystems",
    content: "Urban rooftop gardens are transforming grey concrete jungles into vibrant micro-ecosystems. These green spaces do more than just provide aesthetic value; they actively mitigate the urban heat island effect by absorbing solar radiation. Furthermore, they support biodiversity by providing habitats for pollinators like bees and butterflies, which are often displaced by urban development. Rainwater harvesting systems integrated into these gardens reduce runoff, preventing the overwhelming of city drainage during heavy storms. As cities continue to expand, these elevated habitats represent a crucial intersection of architecture and environmental stewardship.",
    questions: [
      { id: "5", text: "How do rooftop gardens affect solar radiation?", options: ["They reflect it", "They absorb it", "They increase it", "They ignore it"], correct: 1, explanation: "Text: 'mitigate the urban heat island effect by absorbing solar radiation'." },
      { id: "6", text: "Which group benefits from the biodiversity of these gardens?", options: ["Large mammals", "Pollinators like bees", "Deep-sea fish", "Migratory birds only"], correct: 1, explanation: "The text mentions habitats for pollinators like bees and butterflies." },
      { id: "7", text: "What is one benefit of the harvesting systems mentioned?", options: ["Increased runoff", "Reduced runoff", "Cloud seeding", "Soil erosion"], correct: 1, explanation: "Systems 'reduce runoff, preventing the overwhelming of city drainage'." },
      { id: "8", text: "Identify the figure of speech in 'grey concrete jungles'.", options: ["Simile", "Metaphor", "Oxymoron", "Onomatopoeia"], correct: 1, explanation: "It's a metaphor comparing the city to a jungle." }
    ]
  }
]

const VOCAB_DATA = [
  { word: "ERUDITE", syn: "Learned", ant: "Ignorant", explanation: "Erudite means having great knowledge." },
  { word: "EPHEMERAL", syn: "Transient", ant: "Permanent", explanation: "Ephemeral means short-lived." },
  { word: "LACONIC", syn: "Concise", ant: "Verbose", explanation: "Laconic means using very few words." },
  { word: "AUDACIOUS", syn: "Bold", ant: "Timid", explanation: "Audacious implies willingness to take risks." },
  { word: "BANAL", syn: "Trite", ant: "Original", explanation: "Banal means lacking in originality." },
  { word: "CANDID", syn: "Frank", ant: "Deceptive", explanation: "Candid means straightforward." },
  { word: "DELETERIOUS", syn: "Harmful", ant: "Beneficial", explanation: "Deleterious means causing harm." },
  { word: "EBULLIENT", syn: "Exuberant", ant: "Depressed", explanation: "Ebullient means cheerful." },
  { word: "FASTIDIOUS", syn: "Meticulous", ant: "Careless", explanation: "Fastidious means attentive to detail." },
  { word: "GREGARIOUS", syn: "Sociable", ant: "Reclusive", explanation: "Gregarious means fond of company." }
]

const IDIOMS_DATA = [
  { text: "At the eleventh hour", meaning: "At the last moment", explanation: "Refers to doing something just before it's too late." },
  { text: "Bolt from the blue", meaning: "A total surprise", explanation: "Something unexpected." },
  { text: "Bite the bullet", meaning: "Accept something unpleasant bravely", explanation: "Facing a difficult situation with courage." },
  { text: "Piece of cake", meaning: "Something very easy", explanation: "Extremely simple task." },
  { text: "Under the weather", meaning: "Feeling slightly ill", explanation: "Not feeling well." },
  { text: "Spill the beans", meaning: "Reveal a secret", explanation: "Accidentally or intentionally sharing hidden info." },
  { text: "Break the ice", meaning: "Start a conversation", explanation: "Relieving tension in a social setting." },
  { text: "Last straw", meaning: "Final problem in a series", explanation: "The absolute limit of one's patience." },
  { text: "In a nutshell", meaning: "Briefly", explanation: "Summarising quickly." },
  { text: "See eye to eye", meaning: "Agree completely", explanation: "Having the same opinion." }
]

const FILLERS_DATA = [
  { text: "He is senior ______ me by five years.", options: ["than", "to", "from", "with"], correct: 1, explanation: "Senior/Junior take 'to'." },
  { text: "You must abstain ______ smoking.", options: ["from", "to", "for", "by"], correct: 0, explanation: "Abstain always takes 'from'." },
  { text: "If I ______ you, I would go.", options: ["am", "was", "were", "be"], correct: 2, explanation: "Subjunctive 'were' for hypotheticals." },
  { text: "Each of the boys ______ present.", options: ["was", "were", "been", "are"], correct: 0, explanation: "Each is singular." },
  { text: "No sooner had he left ______ it rained.", options: ["when", "then", "than", "after"], correct: 2, explanation: "No sooner...than." },
  { text: "She is fond ______ reading.", options: ["at", "of", "about", "for"], correct: 1, explanation: "Fond of." },
  { text: "He was blind ______ one eye.", options: ["to", "in", "with", "of"], correct: 1, explanation: "Blind in (physical)." },
  { text: "Neither he nor I ______ responsible.", options: ["am", "is", "are", "were"], correct: 0, explanation: "Verb agrees with closest subject (I)." },
  { text: "The train ______ before we arrived.", options: ["left", "had left", "has left", "leaves"], correct: 1, explanation: "Past perfect for earlier action." },
  { text: "He is ______ honest man.", options: ["a", "an", "the", "no article"], correct: 1, explanation: "An (silent h)." }
]

const REARRANGE_DATA = [
  { parts: ["the evening breeze", "as the sun set", "passed through", "the open gate"], options: ["B-A-C-D", "A-B-C-D", "D-C-B-A", "C-A-D-B"], correct: 0, explanation: "Setting (B) + Subject (A) + Verb (C) + Object (D)." },
  { parts: ["the committee", "due to the storm", "cancelled the game", "at the last minute"], options: ["A-C-D-B", "B-A-C-D", "C-D-A-B", "D-B-C-A"], correct: 0, explanation: "Subject + Verb + Object + Time + Reason." },
  { parts: ["to survive the winter", "the birds migrated", "to warmer regions", "in large flocks"], options: ["B-C-D-A", "A-B-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Action + Destination + Manner + Purpose." },
  { parts: ["of the ancient ruins", "the archeologists", "provided a detailed map", "using LIDAR"], options: ["B-C-A-D", "A-B-C-D", "D-C-B-A", "C-A-D-B"], correct: 0, explanation: "Subject + Verb + Object + Method." },
  { parts: ["the cognitive theory", "human memory", "suggests that", "is associative"], options: ["A-C-B-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Subject + Linker + Sub-subject + State." },
  { parts: ["to the new laws", "despite the protest", "the citizens", "had to comply"], options: ["B-C-D-A", "A-B-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Constraint + Subject + Action + Target." },
  { parts: ["the space shuttle", "launched successfully", "into orbit", "at dawn"], options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Subject + Action + Destination + Time." },
  { parts: ["the young pianist", "received a standing ovation", "after the performance", "at the Royal Hall"], options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Subject + Verb + Time + Location." }
]

export default function AdaptiveQuizPage() {
  const { toast } = useToast()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)

  // Initialization: Shuffling and Anti-Guessing
  useEffect(() => {
    const rawSet = GENERATE_MOCK_EXAM()
    const randomizedSet = rawSet.map(q => {
      const cloned = { ...q, options: [...q.options] }
      const correctOpt = cloned.options[cloned.correct]
      const shuffled = [...cloned.options].sort(() => Math.random() - 0.5)
      cloned.options = shuffled
      cloned.correct = shuffled.indexOf(correctOpt)
      return cloned
    })
    setQuestions(randomizedSet)
    setStartTime(Date.now())
  }, [])

  const handleAnswer = (val: number) => {
    setAnswers(prev => ({ ...prev, [currentStep]: val }))
  }

  const calculateScore = () => {
    let correct = 0
    let wrong = 0
    let unattempted = 0
    questions.forEach((q, idx) => {
      const ans = answers[idx]
      if (ans === undefined) unattempted++
      else if (ans === q.correct) correct++
      else wrong++
    })
    return { correct, wrong, unattempted, total: Math.max(0, correct * 5 - wrong * 1) }
  }

  const navigate = (idx: number) => {
    if (idx >= 0 && idx < questions.length) {
      setCurrentStep(idx)
    }
  }

  const submitExam = () => {
    setIsFinished(true)
    toast({ title: "Submission Received", description: "Examination Protocol complete." })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isFinished) {
    const { correct, wrong, unattempted, total } = calculateScore()
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Result Card */}
          <Card className="text-center p-12 border-none shadow-2xl rounded-[3rem] bg-white animate-fade-in-up">
            <div className="bg-primary/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
              <Award className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-5xl font-headline font-bold mb-4">Elite Score Report</CardTitle>
            <CardDescription className="text-xl mb-12">Subject Code 101: Official Evaluation Summary</CardDescription>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-8 bg-green-50 rounded-3xl border border-green-100 shadow-sm">
                <div className="text-sm font-bold text-green-700 uppercase mb-2">Accuracy (+5)</div>
                <div className="text-4xl font-bold text-green-700">{correct} Correct</div>
              </div>
              <div className="p-8 bg-red-50 rounded-3xl border border-red-100 shadow-sm">
                <div className="text-sm font-bold text-red-700 uppercase mb-2">Errors (-1)</div>
                <div className="text-4xl font-bold text-red-700">{wrong} Mistakes</div>
              </div>
              <div className="p-8 bg-muted rounded-3xl border border-border shadow-sm">
                <div className="text-sm font-bold text-muted-foreground uppercase mb-2">Skipped</div>
                <div className="text-4xl font-bold text-muted-foreground">{unattempted} Items</div>
              </div>
            </div>

            <div className="bg-foreground text-background p-10 rounded-[2.5rem] shadow-2xl flex justify-between items-center mb-12">
              <div className="text-left">
                <span className="text-lg opacity-60 font-bold uppercase tracking-widest">Final Weighted Marks</span>
                <p className="text-sm opacity-40">Clinical Standard Applied</p>
              </div>
              <div className="text-6xl font-bold">{total} <span className="text-2xl opacity-30">/ 250</span></div>
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="flex-1 h-16 rounded-2xl text-xl font-bold shadow-lg" onClick={() => window.location.reload()}>
                <RefreshCw className="mr-3" /> Re-attempt Paper
              </Button>
              <Button variant="outline" size="lg" className="flex-1 h-16 rounded-2xl text-xl font-bold" asChild>
                <Link href="/">Return to Dashboard</Link>
              </Button>
            </div>
          </Card>

          {/* Item Analysis */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold px-4 flex items-center gap-3">
              <Info className="w-8 h-8 text-primary" /> Item-by-Item Strategy Analysis
            </h2>
            <div className="space-y-6">
              {questions.map((q, idx) => {
                const userAns = answers[idx]
                const isCorrect = userAns === q.correct
                return (
                  <Card key={idx} className="border-none shadow-md overflow-hidden rounded-[2.5rem]">
                    <div className={cn("px-8 py-4 flex justify-between items-center", userAns === undefined ? "bg-muted" : isCorrect ? "bg-green-50" : "bg-red-50")}>
                      <Badge variant={userAns === undefined ? "secondary" : isCorrect ? "default" : "destructive"} className="px-4 py-1 rounded-full font-bold">
                        {userAns === undefined ? "SKIPPED (0)" : isCorrect ? "CORRECT (+5)" : "ERROR (-1)"}
                      </Badge>
                      <span className="text-xs font-black uppercase tracking-widest opacity-40">{q.section}</span>
                    </div>
                    <CardContent className="p-10 space-y-6">
                      <p className="text-xl font-bold leading-relaxed">{q.text}</p>
                      {q.parts && (
                        <div className="flex flex-col gap-2 mb-4">
                          {q.parts.map((p, i) => (
                            <div key={i} className="text-sm font-mono text-muted-foreground"><span className="text-primary font-bold">{String.fromCharCode(65+i)}:</span> {p}</div>
                          ))}
                        </div>
                      )}
                      <div className="grid gap-3">
                        <div className={cn("p-5 rounded-2xl flex items-center gap-4 border", userAns === undefined ? "bg-muted/30 border-muted" : isCorrect ? "bg-green-100/30 border-green-200" : "bg-red-100/30 border-red-200")}>
                          {userAns === undefined ? <AlertCircle className="w-6 h-6 text-muted-foreground" /> : isCorrect ? <CheckCircle2 className="w-6 h-6 text-green-600" /> : <XCircle className="w-6 h-6 text-red-600" />}
                          <div className="text-lg">
                            <span className="font-bold">Your Attempt: </span>
                            {userAns !== undefined ? q.options[userAns] : "No Answer Selected"}
                          </div>
                        </div>
                        {!isCorrect && (
                          <div className="p-5 rounded-2xl flex items-center gap-4 border bg-green-100/30 border-green-200">
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                            <div className="text-lg">
                              <span className="font-bold">Clinical Target: </span>
                              {q.options[q.correct]}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="pt-6 border-t border-dashed">
                        <p className="text-muted-foreground italic leading-relaxed">
                          <strong className="text-foreground not-italic">Clinical Strategy: </strong> {q.explanation}
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

  if (questions.length === 0) return (
    <div className="h-screen flex items-center justify-center font-headline font-bold text-primary animate-pulse">
      Initialising Examination Protocol...
    </div>
  )

  const question = questions[currentStep]
  const isRC = !!question.passage

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header Stats */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-primary/5">
          <div>
            <h1 className="text-3xl font-headline font-bold text-primary">Subject Code 101 Protocol</h1>
            <p className="text-muted-foreground font-mono font-bold uppercase tracking-tight">Active Session | Item {currentStep + 1} / 50</p>
          </div>
          
          <div className="flex gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-muted-foreground uppercase mb-1">Time Elapsed</span>
              <div className="bg-primary/10 text-primary px-6 py-2 rounded-2xl border border-primary/20 font-mono font-bold text-xl">
                {startTime ? Math.floor((Date.now() - startTime) / 60000) : 0}m
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-muted-foreground uppercase mb-1">Items Attempted</span>
              <div className="bg-secondary/20 text-secondary-foreground px-6 py-2 rounded-2xl border border-secondary/20 font-bold text-xl">
                {Object.keys(answers).length} / 50
              </div>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Non-Linear Navigation Grid */}
          <aside className="lg:order-last space-y-6">
            <Card className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden">
              <CardHeader className="bg-muted/30 pb-4">
                <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4" /> Navigator
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => navigate(i)}
                      className={cn(
                        "h-10 rounded-xl font-bold text-xs transition-all",
                        currentStep === i ? "ring-2 ring-primary ring-offset-2 scale-110 shadow-md" : "",
                        answers[i] !== undefined ? "bg-green-500 text-white" : "bg-red-500/10 text-red-600 border border-red-200"
                      )}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <Button 
                  className="w-full mt-8 h-14 rounded-2xl font-bold text-lg shadow-xl" 
                  variant="default"
                  onClick={submitExam}
                >
                  Submit Final Set
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-secondary/10 border-none rounded-[2rem] p-6 shadow-sm">
              <div className="flex gap-3 text-secondary-foreground font-bold text-xs italic leading-relaxed">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>Non-linear mode active. You may jump between sections and change your locked answers until the final submission.</span>
              </div>
            </Card>
          </aside>

          {/* Question Area */}
          <div className="lg:col-span-3 space-y-8">
            <div className={cn("grid gap-8 items-start", isRC ? "md:grid-cols-2" : "grid-cols-1")}>
              {isRC && (
                <Card className="border-none shadow-sm bg-white/70 backdrop-blur-sm p-8 rounded-[2.5rem] sticky top-24">
                  <div className="flex items-center gap-2 mb-6 text-primary font-bold text-xs tracking-widest uppercase border-b pb-4">
                    <BookOpen className="w-4 h-4" /> {question.passageTitle}
                  </div>
                  <ScrollArea className="h-[400px] md:h-[500px] pr-4">
                    <div className="text-foreground leading-relaxed italic text-lg space-y-4">
                      {question.passage?.split('\n').map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
              )}

              <div className="space-y-6">
                <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden animate-fade-in-up">
                  <CardHeader className="bg-primary/5 p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        {question.section === "Reading Comprehension" && <MessageSquare className="w-5 h-5 text-primary" />}
                        {question.section === "Lexical Intelligence" && <Hash className="w-5 h-5 text-primary" />}
                        {question.section === "Match Proficiency" && <PenTool className="w-5 h-5 text-primary" />}
                        {question.section === "Syntactic Precision" && <BookOpen className="w-5 h-5 text-primary" />}
                        {question.section === "Sequential Logic" && <Layers className="w-5 h-5 text-primary" />}
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{question.section}</span>
                      </div>
                      <Badge variant="outline" className="rounded-full border-primary/20 text-primary font-black">ITEM {currentStep+1}</Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold leading-snug">{question.text}</CardTitle>
                    {question.parts && (
                      <div className="flex flex-col gap-2 mt-6">
                        {question.parts.map((p, i) => (
                          <div key={i} className="px-4 py-3 bg-white border border-primary/10 rounded-xl text-sm font-medium shadow-sm flex items-start gap-3">
                            <span className="font-mono font-bold text-primary bg-primary/5 w-6 h-6 flex items-center justify-center rounded-lg">{String.fromCharCode(65 + i)}</span>
                            {p}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-8">
                    <RadioGroup 
                      onValueChange={(val) => handleAnswer(parseInt(val))} 
                      value={answers[currentStep]?.toString()} 
                      className="grid gap-3"
                    >
                      {question.options.map((opt, i) => (
                        <div 
                          key={i} 
                          onClick={() => handleAnswer(i)}
                          className={cn(
                            "flex items-center space-x-3 border p-5 rounded-2xl transition-all cursor-pointer group",
                            answers[currentStep] === i ? "border-primary bg-primary/5 ring-1 ring-primary/20 shadow-md" : "hover:bg-muted/50 border-border"
                          )}
                        >
                          <RadioGroupItem value={i.toString()} id={`q-${currentStep}-opt-${i}`} className="pointer-events-none" />
                          <Label 
                            htmlFor={`q-${currentStep}-opt-${i}`} 
                            className="flex-1 cursor-pointer text-lg font-bold text-foreground leading-tight"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="inline-block w-8 text-primary font-mono">{String.fromCharCode(65 + i)}.</span>
                            {opt}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                <div className="flex justify-between items-center pt-4">
                  <Button variant="ghost" onClick={() => navigate(currentStep - 1)} disabled={currentStep === 0} className="h-14 px-8 rounded-2xl font-bold">
                    <ChevronLeft className="mr-2" /> Previous Item
                  </Button>
                  <Button size="lg" className="h-14 px-12 rounded-2xl font-bold shadow-xl" onClick={() => navigate(currentStep + 1)} disabled={currentStep === 49}>
                    Next Item <ChevronLeft className="ml-2 rotate-180" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
