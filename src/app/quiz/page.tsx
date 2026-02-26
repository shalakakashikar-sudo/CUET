
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
  MessageSquare, Hash, PenTool, Layers, Compass
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

// CBT SIMULATION DATA POOLING
type Question = {
  id: string
  section: string
  text: string
  options: string[]
  correct: number
  explanation: string
  passage?: string
  passageTitle?: string
  parts?: string[]
}

// 1. COMPREHENSIVE DATA REPOSITORIES
const PASSAGES = [
  {
    title: "The Stoic Mindset",
    content: "Stoicism, an ancient Greek school of philosophy, teaches the development of self-control and fortitude as a means of overcoming destructive emotions. It suggests that while we cannot control external events, we have complete control over our internal responses. By aligning our will with the natural order of the universe, we can attain tranquility. The Stoic does not seek to eliminate emotion but rather to refine it, transforming reactive passions into reasoned judgments. This clinical approach to life allows for a resilience that is unshakable even in the face of immense adversity.",
    questions: [
      { id: "rc1-1", text: "What is the core teaching of Stoicism according to the text?", options: ["Control over external events", "Self-control and fortitude", "Elimination of all emotions", "Ignoring the natural order"], correct: 1, explanation: "The text highlights self-control and fortitude as core means to overcome destructive emotions." },
      { id: "rc1-2", text: "What can a Stoic control?", options: ["External events", "Internal responses", "The natural order", "Universal destiny"], correct: 1, explanation: "The passage states we have 'complete control over our internal responses'." },
      { id: "rc1-3", text: "The goal of a Stoic is to:", options: ["Destroy all passion", "Attain tranquility", "Escape adversity", "Master others"], correct: 1, explanation: "Attaining tranquility is mentioned as the result of aligning with the natural order." },
      { id: "rc1-4", text: "Choose the synonym for 'fortitude':", options: ["Weakness", "Courage", "Haste", "Fear"], correct: 1, explanation: "'Fortitude' implies mental and emotional strength/courage." }
    ]
  },
  {
    title: "Micro-Ecosystems",
    content: "Urban rooftop gardens are transforming grey concrete jungles into vibrant micro-ecosystems. These green spaces do more than just provide aesthetic value; they actively mitigate the urban heat island effect by absorbing solar radiation. Furthermore, they support biodiversity by providing habitats for pollinators like bees and butterflies, which are often displaced by urban development. Rainwater harvesting systems integrated into these gardens reduce runoff, preventing the overwhelming of city drainage during heavy storms. As cities continue to expand, these elevated habitats represent a crucial intersection of architecture and environmental stewardship.",
    questions: [
      { id: "rc2-1", text: "How do rooftop gardens affect solar radiation?", options: ["They reflect it", "They absorb it", "They increase it", "They ignore it"], correct: 1, explanation: "Text: 'mitigate the urban heat island effect by absorbing solar radiation'." },
      { id: "rc2-2", text: "Which group benefits from the biodiversity of these gardens?", options: ["Large mammals", "Pollinators like bees", "Deep-sea fish", "Migratory birds only"], correct: 1, explanation: "The text mentions habitats for pollinators like bees and butterflies." },
      { id: "rc2-3", text: "What is one benefit of the harvesting systems mentioned?", options: ["Increased runoff", "Reduced runoff", "Cloud seeding", "Soil erosion"], correct: 1, explanation: "Systems 'reduce runoff, preventing the overwhelming of city drainage'." },
      { id: "rc2-4", text: "Identify the figure of speech in 'grey concrete jungles'.", options: ["Simile", "Metaphor", "Oxymoron", "Onomatopoeia"], correct: 1, explanation: "It's a metaphor comparing the city to a jungle." }
    ]
  },
  {
    title: "Dr. Moo and the Cosmic Continuum",
    content: "In the sprawling expanse of the cosmos, there existed a peculiar dimension known as The Milky Way, a realm where time flowed not in a straight line, but in loops of past, present, and future. Guarding this timeline was an unlikely hero: Dr. Moo, a time-travelling cow with a penchant for flawless English grammar. While other celestial beings concerned themselves with black holes, Dr. Moo focused on fixing temporal paradoxes caused by misplaced modifiers and incorrect verb forms. One epoch, a rogue comet threatened to scramble the timeline, merging the past continuous with the future perfect. she galloped through the cosmic dust, actively rewriting the stars. By ensuring the subject-verb agreement of the universe was perfectly aligned, she saved the continuum from collapsing into a chaotic jumble of dangling participles.",
    questions: [
      { id: "rc3-1", text: "Based on the passage, what is Dr. Moo’s primary mission?", options: ["To study black holes", "To guard the timeline by fixing grammatical paradoxes", "To rewrite celestial maps", "To teach time-travel"], correct: 1, explanation: "Dr. Moo focused on fixing temporal paradoxes caused by misplaced modifiers and incorrect verb forms." },
      { id: "rc3-2", text: "Choose the correct meaning of 'penchant' as used in the passage:", options: ["Strong dislike", "Deep understanding", "Strong or habitual liking", "Magical ability"], correct: 2, explanation: "'Penchant' refers to a habitual liking or inclination." },
      { id: "rc3-3", text: "Identify the Figure of Speech used in 'legend-dairy':", options: ["Pun", "Simile", "Oxymoron", "Personification"], correct: 0, explanation: "It uses a play on words 'legendary' and 'dairy'." },
      { id: "rc3-4", text: "What saved the continuum from collapsing?", options: ["Punctuation", "Subject-verb agreement", "Quantum mechanics", "The Milky Way"], correct: 1, explanation: "The text says subject-verb agreement perfectly aligned saved the continuum." }
    ]
  }
]

const VOCAB_POOL = [
  { word: "EPHEMERAL", syn: "Transient", ant: "Permanent", exp: "Ephemeral means short-lived." },
  { word: "LOQUACIOUS", syn: "Talkative", ant: "Taciturn", exp: "Loquacious means very talkative." },
  { word: "PRUDENT", syn: "Wise", ant: "Reckless", exp: "Prudent means acting with care." },
  { word: "CANDID", syn: "Frank", ant: "Deceptive", exp: "Candid means straightforward." },
  { word: "UBIQUITOUS", syn: "Omnipresent", ant: "Rare", exp: "Ubiquitous means present everywhere." },
  { word: "ZEALOUS", syn: "Passionate", ant: "Apathetic", exp: "Zealous means showing great energy." },
  { word: "AMELIORATE", syn: "Improve", ant: "Worsen", exp: "Ameliorate means to make something better." },
  { word: "ANTIPATHY", syn: "Aversion", ant: "Affinity", exp: "Antipathy is a deep dislike." },
  { word: "AUDACIOUS", syn: "Daring", ant: "Timid", exp: "Audacious means taking bold risks." },
  { word: "FASTIDIOUS", syn: "Meticulous", ant: "Sloppy", exp: "Fastidious means attentive to detail." },
  { word: "ABERRATION", syn: "Deviation", ant: "Normality", exp: "Departure from what is normal." },
  { word: "ADROIT", syn: "Skillful", ant: "Clumsy", exp: "Clever or skillful." },
  { word: "BLITHE", syn: "Cheerful", ant: "Melancholy", exp: "Casual and cheerful indifference." },
  { word: "CALLOUS", syn: "Insensitive", ant: "Compassionate", exp: "Insensitive and cruel disregard." },
  { word: "DEARTH", syn: "Scarcity", ant: "Abundance", exp: "A lack of something." },
  { word: "ERUDITE", syn: "Scholarly", ant: "Ignorant", exp: "Having great knowledge." },
  { word: "GREGARIOUS", syn: "Sociable", ant: "Reclusive", exp: "Fond of company." },
  { word: "IMPECCABLE", syn: "Faultless", ant: "Flawed", exp: "In accordance with highest standards." },
  { word: "LACONIC", syn: "Brief", ant: "Verbose", exp: "Using very few words." },
  { word: "METICULOUS", syn: "Careful", ant: "Sloppy", exp: "Showing great attention to detail." }
]

const IDIOMS_POOL = [
  { text: "At the eleventh hour", meaning: "At the last possible moment", exp: "Refers to doing something just before it's too late." },
  { text: "Bite the bullet", meaning: "Accept something unpleasant bravely", exp: "Facing a difficult situation with courage." },
  { text: "Piece of cake", meaning: "Something very easy", exp: "Extremely simple task." },
  { text: "Under the weather", meaning: "Feeling slightly ill", exp: "Not feeling well." },
  { text: "Once in a blue moon", meaning: "Very rarely", exp: "Something that happens infrequently." },
  { text: "Spill the beans", meaning: "Reveal a secret", exp: "Sharing confidential info." },
  { text: "Break the ice", meaning: "Start a conversation", exp: "Relieving tension in a social setting." },
  { text: "Last straw", meaning: "Final problem in a series", exp: "The absolute limit of patience." },
  { text: "In a nutshell", meaning: "Briefly", exp: "Summarising quickly." },
  { text: "See eye to eye", meaning: "Agree completely", exp: "Having the same opinion." },
  { text: "Bolt from the blue", meaning: "A total surprise", exp: "Sudden and unexpected." },
  { text: "Cold feet", meaning: "Become nervous about a plan", exp: "Hesitation before an event." },
  { text: "A dime a dozen", meaning: "Something very common", exp: "Easily found everywhere." },
  { text: "Elephant in the room", meaning: "Major problem ignored", exp: "Obvious issue avoided." },
  { text: "Face the music", meaning: "Accept consequences", exp: "Taking responsibility." },
  { text: "Get out of hand", meaning: "Become difficult to control", exp: "Losing control." },
  { text: "Keep at arm's length", meaning: "Avoid intimacy", exp: "Maintaining distance." },
  { text: "Make ends meet", meaning: "Earn enough to live", exp: "Survival on budget." },
  { text: "Miss the boat", meaning: "Too late for chance", exp: "Lost opportunity." },
  { text: "No pain, no gain", meaning: "Effort for success", exp: "Hard work required." }
]

const FILLERS_POOL = [
  { text: "He is senior ______ me by five years.", options: ["than", "to", "from", "with"], correct: 1, exp: "Adjectives ending in -ior take 'to'." },
  { text: "You must abstain ______ smoking.", options: ["from", "to", "for", "by"], correct: 0, exp: "Abstain always takes 'from'." },
  { text: "If I ______ you, I would go.", options: ["am", "was", "were", "be"], correct: 2, exp: "Subjunctive 'were' for hypotheticals." },
  { text: "Each of the boys ______ present.", options: ["was", "were", "been", "are"], correct: 0, exp: "Each is singular." },
  { text: "No sooner had he left ______ it rained.", options: ["when", "then", "than", "after"], correct: 2, exp: "No sooner...than." },
  { text: "She is fond ______ reading.", options: ["at", "of", "about", "for"], correct: 1, exp: "Fond of." },
  { text: "Neither he nor I ______ responsible.", options: ["am", "is", "are", "were"], correct: 0, exp: "Verb agrees with closest subject (I)." },
  { text: "The train ______ before we arrived.", options: ["left", "had left", "has left", "leaves"], correct: 1, exp: "Past perfect for earlier action." },
  { text: "He is ______ honest man.", options: ["a", "an", "the", "no article"], correct: 1, exp: "An (silent h)." },
  { text: "They ______ since morning.", options: ["play", "are playing", "have been playing", "played"], correct: 2, exp: "Present perfect continuous for ongoing duration." },
  { text: "The quality of these mangoes ______ not good.", options: ["is", "are", "were", "have been"], correct: 0, exp: "Subject is 'Quality' (singular)." },
  { text: "Politics ______ a dirty game.", options: ["is", "are", "were", "have been"], correct: 0, exp: "'Politics' is treated as singular." },
  { text: "Ten miles ______ a long distance.", options: ["is", "are", "were", "have been"], correct: 0, exp: "Distances take singular verbs." },
  { text: "Neither of the two candidates ______ suitable.", options: ["is", "are", "were", "have been"], correct: 0, exp: "'Neither' takes a singular verb." },
  { text: "Slow and steady ______ the race.", options: ["win", "wins", "is winning", "has won"], correct: 1, exp: "Compound subject expressing one idea." }
]

const REARRANGE_POOL = [
  { parts: ["the evening breeze", "as the sun set", "passed through", "the open gate"], options: ["B-A-C-D", "A-B-C-D", "D-C-B-A", "C-A-D-B"], correct: 0, exp: "Setting + Subject + Verb + Object." },
  { parts: ["the committee", "due to the storm", "cancelled the game", "at the last minute"], options: ["A-C-D-B", "B-A-C-D", "C-D-A-B", "D-B-C-A"], correct: 0, exp: "Subject + Verb + Object + Time + Reason." },
  { parts: ["to survive the winter", "the birds migrated", "to warmer regions", "in large flocks"], options: ["B-C-D-A", "A-B-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, exp: "Action + Destination + Manner + Purpose." },
  { parts: ["the particle began", "to oscillate rapidly", "upon being subjected", "to the magnetic field"], options: ["C-A-B-D", "A-B-C-D", "D-C-B-A", "B-A-D-C"], correct: 0, exp: "Condition leads to action + manner + target." },
  { parts: ["the cognitive theory", "human memory", "suggests that", "is associative"], options: ["A-C-B-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, exp: "Subject + Linker + Sub-subject + State." },
  { parts: ["to the new laws", "despite the protest", "the citizens", "had to comply"], options: ["B-C-D-A", "A-B-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, exp: "Constraint + Subject + Action + Target." },
  { parts: ["the space shuttle", "launched successfully", "into orbit", "at dawn"], options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, exp: "Subject + Action + Destination + Time." },
  { parts: ["the young pianist", "received a standing ovation", "after the performance", "at the Royal Hall"], options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, exp: "Subject + Verb + Time + Location." },
  { parts: ["the archeologist uncovered", "during the excavation", "which provided accounts", "of ancient scribes"], options: ["B-A-C-D", "A-B-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, exp: "Setting + Action + Relative Clause." },
  { parts: ["the renaissance period", "towards humanism", "marked a shift", "breaking away from dogma"], options: ["A-C-B-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, exp: "Subject + Verb + Direction + Detail." }
]

const SHUFFLE = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

const GENERATE_EXAM = (): Question[] => {
  const qSet: Question[] = []

  // 1. DYNAMIC RC POOLING (Pick 3 random passages)
  const selectedPassages = SHUFFLE(PASSAGES).slice(0, 3);
  selectedPassages.forEach((p) => {
    p.questions.forEach(q => {
      qSet.push({
        ...q,
        section: "Reading Comprehension",
        passage: p.content,
        passageTitle: p.title
      })
    })
  });

  // 2. DYNAMIC LEXICAL POOLING (Pick 10 random)
  const selectedVocab = SHUFFLE(VOCAB_POOL).slice(0, 10);
  selectedVocab.forEach((v, i) => {
    const isSyn = Math.random() > 0.5;
    qSet.push({
      id: `vocab-${i}`,
      section: "Lexical Intelligence",
      text: `Choose the ${isSyn ? 'synonym' : 'antonym'} for the word: ${v.word}`,
      options: [isSyn ? v.syn : v.ant, isSyn ? v.ant : v.syn, "Irrelevant", "Ambiguous"],
      correct: 0,
      explanation: v.exp
    })
  });

  // 3. DYNAMIC MATCH POOLING (Pick 10 random)
  const selectedIdioms = SHUFFLE(IDIOMS_POOL).slice(0, 10);
  selectedIdioms.forEach((idiom, i) => {
    qSet.push({
      id: `match-${i}`,
      section: "Match Proficiency",
      text: `What is the correct meaning of the idiom: "${idiom.text}"?`,
      options: [idiom.meaning, "To be very fast", "To be lucky", "To be confused"],
      correct: 0,
      explanation: idiom.exp
    })
  });

  // 4. DYNAMIC SYNTACTIC POOLING (Pick 10 random)
  const selectedFillers = SHUFFLE(FILLERS_POOL).slice(0, 10);
  selectedFillers.forEach((f, i) => {
    qSet.push({
      id: `filler-${i}`,
      section: "Syntactic Precision",
      text: f.text,
      options: f.options,
      correct: f.correct,
      explanation: f.exp
    })
  });

  // 5. DYNAMIC SEQUENTIAL POOLING (Pick 8 random)
  const selectedRearrange = SHUFFLE(REARRANGE_POOL).slice(0, 8);
  selectedRearrange.forEach((r, i) => {
    qSet.push({
      id: `rearrange-${i}`,
      section: "Sequential Logic",
      text: "Rearrange the segments to form a meaningful sentence.",
      parts: r.parts,
      options: r.options,
      correct: r.correct,
      explanation: r.exp
    })
  });

  return qSet;
}

export default function CBTExamPage() {
  const { toast } = useToast()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes
  const [isExamStarted, setIsExamStarted] = useState(false)

  // Initialization with Anti-Guessing option shuffling
  const startExam = () => {
    const rawSet = GENERATE_EXAM()
    const randomizedSet = rawSet.map(q => {
      const cloned = { ...q, options: [...q.options] }
      const correctOpt = cloned.options[cloned.correct]
      const shuffled = [...cloned.options].sort(() => Math.random() - 0.5)
      cloned.options = shuffled
      cloned.correct = shuffled.indexOf(correctOpt)
      return cloned
    })
    setQuestions(randomizedSet)
    setIsExamStarted(true)
  }

  // Timer logic
  useEffect(() => {
    if (!isExamStarted || isFinished || timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          submitExam()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [isExamStarted, isFinished, timeLeft])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const handleAnswer = (val: number) => {
    setAnswers(prev => ({ ...prev, [currentStep]: val }))
  }

  const navigate = (idx: number) => {
    if (idx >= 0 && idx < questions.length) {
      setCurrentStep(idx)
    }
  }

  const submitExam = () => {
    if (isFinished) return
    setIsFinished(true)
    toast({ title: "Examination Submitted", description: "Your protocol response has been successfully logged." })
    window.scrollTo({ top: 0, behavior: 'smooth' })
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

  if (!isExamStarted) {
    return (
      <div className="min-h-screen parlour-stripes flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full border-none shadow-2xl rounded-[3rem] p-12 text-center bg-white/90 backdrop-blur-md">
          <div className="bg-primary/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <Clock className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-4xl font-headline font-bold mb-4">Official CBT Protocol</CardTitle>
          <CardDescription className="text-lg mb-8">Subject Code 101: CUET English Examination Simulation</CardDescription>
          <div className="space-y-4 text-left mb-12 bg-muted/30 p-8 rounded-3xl border border-primary/10">
            <div className="flex items-center gap-3 font-bold text-foreground">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Total Questions: 50 Compulsory Items</span>
            </div>
            <div className="flex items-center gap-3 font-bold text-foreground">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Duration: 60 Minutes (3,600 Seconds)</span>
            </div>
            <div className="flex items-center gap-3 font-bold text-foreground">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Scoring: +5 for Accuracy | -1 for Errors</span>
            </div>
            <div className="flex items-center gap-3 font-bold text-foreground">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Pooling: Dynamic repository sampling active.</span>
            </div>
          </div>
          <Button size="lg" className="w-full h-16 rounded-2xl text-xl font-bold shadow-xl" onClick={startExam}>
            Initialise CBT Session
          </Button>
        </Card>
      </div>
    )
  }

  if (isFinished) {
    const { correct, wrong, unattempted, total } = calculateScore()
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Elite Report Card */}
          <Card className="text-center p-12 border-none shadow-2xl rounded-[3rem] bg-white animate-fade-in-up">
            <div className="bg-primary/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
              <Award className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-5xl font-headline font-bold mb-4">Official Performance Report</CardTitle>
            <CardDescription className="text-xl mb-12">Subject Code 101: Clinical Analysis Summary</CardDescription>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-8 bg-green-50 rounded-3xl border border-green-100 shadow-sm">
                <div className="text-sm font-bold text-green-700 uppercase mb-2">Accuracy (+5)</div>
                <div className="text-4xl font-bold text-green-700">{correct} Items</div>
              </div>
              <div className="p-8 bg-red-50 rounded-3xl border border-red-100 shadow-sm">
                <div className="text-sm font-bold text-red-700 uppercase mb-2">Mistakes (-1)</div>
                <div className="text-4xl font-bold text-red-700">{wrong} Errors</div>
              </div>
              <div className="p-8 bg-muted rounded-3xl border border-border shadow-sm">
                <div className="text-sm font-bold text-muted-foreground uppercase mb-2">Skipped (0)</div>
                <div className="text-4xl font-bold text-muted-foreground">{unattempted} Items</div>
              </div>
            </div>

            <div className="bg-foreground text-background p-10 rounded-[2.5rem] shadow-2xl flex justify-between items-center mb-12">
              <div className="text-left">
                <span className="text-lg opacity-60 font-bold uppercase tracking-widest">Final Weighted Score</span>
                <p className="text-sm opacity-40">Elite 100th Percentile Calculation Applied</p>
              </div>
              <div className="text-6xl font-bold">{total} <span className="text-2xl opacity-30">/ 250</span></div>
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="flex-1 h-16 rounded-2xl text-xl font-bold shadow-lg" onClick={() => window.location.reload()}>
                <RefreshCw className="mr-3" /> Start New Session
              </Button>
              <Button variant="outline" size="lg" className="flex-1 h-16 rounded-2xl text-xl font-bold" asChild>
                <Link href="/">Return to Academy</Link>
              </Button>
            </div>
          </Card>

          {/* Item-by-Item Review */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold px-4 flex items-center gap-3">
              <Info className="w-8 h-8 text-primary" /> Comprehensive Strategic Review
            </h2>
            <div className="space-y-6">
              {questions.map((q, idx) => {
                const userAns = answers[idx]
                const isCorrect = userAns === q.correct
                return (
                  <Card key={idx} className="border-none shadow-md overflow-hidden rounded-[2.5rem]">
                    <div className={cn("px-8 py-4 flex justify-between items-center", userAns === undefined ? "bg-muted" : isCorrect ? "bg-green-50" : "bg-red-50")}>
                      <Badge variant={userAns === undefined ? "secondary" : isCorrect ? "default" : "destructive"} className="px-4 py-1 rounded-full font-bold">
                        {userAns === undefined ? "SKIPPED (0)" : isCorrect ? "CORRECT (+5)" : "MISTAKE (-1)"}
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
                            <span className="font-bold">Your Response: </span>
                            {userAns !== undefined ? q.options[userAns] : "No Response Provided"}
                          </div>
                        </div>
                        {!isCorrect && (
                          <div className="p-5 rounded-2xl flex items-center gap-4 border bg-green-100/30 border-green-200">
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                            <div className="text-lg">
                              <span className="font-bold">Clinical Correctness: </span>
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

  const question = questions[currentStep]
  const isRC = !!question.passage

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* CBT Top Bar */}
      <header className="bg-white border-b sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-primary text-white p-2 rounded-xl">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-primary">CBT EXAMINATION SYSTEM</h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Subject Code: 101 | English Proficiency</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className={cn(
            "flex items-center gap-3 px-6 py-2 rounded-2xl border transition-colors",
            timeLeft < 300 ? "bg-red-50 border-red-200 text-red-600 animate-pulse" : "bg-primary/5 border-primary/20 text-primary"
          )}>
            <Clock className="w-5 h-5" />
            <span className="text-2xl font-mono font-black">{formatTime(timeLeft)}</span>
          </div>
          
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-black uppercase text-muted-foreground">Candidate ID</span>
            <span className="font-bold">CUET-2026-EXAM</span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className={cn("grid gap-8 items-start", isRC ? "lg:grid-cols-2" : "grid-cols-1")}>
              {isRC && (
                <Card className="border-none shadow-xl bg-white/80 p-8 rounded-[2.5rem] lg:sticky lg:top-0 h-fit">
                  <div className="flex items-center gap-2 mb-6 text-primary font-bold text-xs tracking-widest uppercase border-b pb-4">
                    <BookOpen className="w-4 h-4" /> {question.passageTitle}
                  </div>
                  <ScrollArea className="h-[400px] lg:h-[500px] pr-4">
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
                      <Badge variant="outline" className="rounded-full border-primary/20 text-primary font-black">ITEM {currentStep + 1} / 50</Badge>
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
                      {question.options.map((opt, i) => {
                        const isSelected = answers[currentStep] === i
                        return (
                          <div 
                            key={i} 
                            onClick={() => handleAnswer(i)}
                            className={cn(
                              "flex items-center space-x-3 border p-5 rounded-2xl transition-all cursor-pointer group",
                              isSelected ? "border-primary bg-primary/5 ring-1 ring-primary/20 shadow-md" : "hover:bg-muted/50 border-border"
                            )}
                          >
                            <RadioGroupItem value={i.toString()} id={`q-opt-${i}`} className="pointer-events-none" />
                            <Label 
                              htmlFor={`q-opt-${i}`} 
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

                <div className="flex justify-between items-center pt-4">
                  <Button variant="ghost" onClick={() => navigate(currentStep - 1)} disabled={currentStep === 0} className="h-14 px-8 rounded-2xl font-bold">
                    <ChevronLeft className="mr-2" /> Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-14 px-8 rounded-2xl font-bold border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => {
                      const newAns = { ...answers }
                      delete newAns[currentStep]
                      setAnswers(newAns)
                    }}
                  >
                    Clear Response
                  </Button>
                  <Button size="lg" className="h-14 px-12 rounded-2xl font-bold shadow-xl" onClick={() => navigate(currentStep + 1)} disabled={currentStep === 49}>
                    Next <ArrowRight className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CBT Navigation Panel */}
        <aside className="w-full md:w-80 bg-white border-l p-6 flex flex-col shadow-2xl">
          <div className="mb-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
              <LayoutGrid className="w-4 h-4" /> Navigator Grid
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 50 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => navigate(i)}
                  className={cn(
                    "h-10 rounded-xl font-bold text-xs transition-all flex items-center justify-center border",
                    currentStep === i ? "ring-2 ring-primary ring-offset-2 scale-110 shadow-lg z-10" : "",
                    answers[i] !== undefined 
                      ? "bg-green-500 text-white border-green-600" 
                      : "bg-red-50 text-red-600 border-red-200"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 mt-auto">
            <div className="p-4 bg-muted/30 rounded-2xl border border-dashed border-muted-foreground/20 text-[10px] font-bold">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Attempted:</span>
                <span className="text-green-600">{Object.keys(answers).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Remaining:</span>
                <span className="text-red-600">{50 - Object.keys(answers).length}</span>
              </div>
            </div>
            <Button 
              className="w-full h-16 rounded-2xl font-bold text-lg shadow-xl" 
              onClick={submitExam}
            >
              Submit Examination
            </Button>
          </div>
        </aside>
      </main>
    </div>
  )
}
