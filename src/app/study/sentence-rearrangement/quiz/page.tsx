"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, RefreshCw, ChevronLeft, Target, Layers, Info, CheckCircle2, XCircle, Keyboard, ArrowRight, AlertCircle, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Question = {
  id: number
  parts: string[]
  q: string
  options: string[]
  correct: number
  explanation: string
}

const REARRANGE_QUIZ_DATA: Question[] = [
  // Set 1 Items
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
    parts: ["in an era of rapid technological change", "remains the cornerstone of human progress", "the ability to adapt and learn", "despite the risks of automation"],
    q: "Rearrange to form a coherent statement:",
    options: ["C-B-A-D", "A-C-B-D", "D-A-C-B", "A-D-C-B"],
    correct: 1,
    explanation: "Begins with the era context (A), introduces the subject (C), the verb/state (B), and ends with the contrast (D)."
  },
  {
    id: 4,
    parts: ["scarcely had the sun risen", "over the horizon", "when the explorers set out", "on their perilous journey"],
    q: "Identify the correct sequence:",
    options: ["C-D-A-B", "B-A-C-D", "A-B-C-D", "A-C-B-D"],
    correct: 2,
    explanation: "Uses the 'Scarcely...when' correlative structure. Scarcely (A) + prepositional phrase (B) + when clause (C) + remaining info (D)."
  },
  {
    id: 5,
    parts: ["although the evidence was clear", "the jury found it difficult", "to reach a unanimous verdict", "due to conflicting testimonies"],
    q: "Rearrange the segments:",
    options: ["B-C-A-D", "D-A-B-C", "A-D-B-C", "A-B-C-D"],
    correct: 3,
    explanation: "Starts with the contrastive 'although' clause (A), followed by the main subject-verb (B), the infinitive phrase (C), and the reason (D)."
  },
  {
    id: 6,
    parts: ["to understand the complexities of the universe", "physicists must look beyond", "the observable phenomena", "into the realm of quantum theory"],
    q: "Choose the logical order:",
    options: ["A-B-C-D", "B-C-D-A", "C-A-B-D", "D-B-C-A"],
    correct: 0,
    explanation: "The purpose ('to understand...') initiates the sentence, followed by the subject-verb core and the directional phrases."
  },
  {
    id: 7,
    parts: ["not only did the scientist discover a new element", "but she also developed a method", "to isolate it from radioactive waste", "with minimal environmental impact"],
    q: "Rearrange correctly:",
    options: ["B-A-C-D", "C-D-A-B", "A-B-C-D", "A-C-B-D"],
    correct: 2,
    explanation: "Uses 'Not only...but also' inversion. Inverted auxiliary 'did' (A) + correlative 'but also' (B) + infinitive purpose (C) + adverbial phrase (D)."
  },
  {
    id: 8,
    parts: ["by the time the rescue team arrived", "most of the survivors", "had already been relocated", "to a safer facility"],
    q: "Choose the correct sequence:",
    options: ["B-C-A-D", "C-D-A-B", "A-C-B-D", "A-B-C-D"],
    correct: 3,
    explanation: "Temporal clause (A) followed by the subject (B) and the past perfect passive verb phrase (C-D)."
  },
  {
    id: 9,
    parts: ["having completed her research", "she presented her findings", "at the international symposium", "to a round of applause"],
    q: "Identify the coherent flow:",
    options: ["B-A-C-D", "A-B-C-D", "C-D-A-B", "A-C-B-D"],
    correct: 1,
    explanation: "Participle phrase (having completed...) establishes the prior action, leading to the main action and setting."
  },
  {
    id: 10,
    parts: ["the architect designed the building", "so that it would maximise", "the use of natural light", "while minimizing energy consumption"],
    q: "Rearrange the segments:",
    options: ["B-C-A-D", "D-A-B-C", "A-C-B-D", "A-B-C-D"],
    correct: 3,
    explanation: "SVO core (A) + purpose clause (B-C) + contrastive while-clause (D)."
  },
  // Set 2 Items
  {
    id: 11,
    parts: ["the novel, written in the late 19th century", "explores the social injustices", "of the industrial revolution", "through the eyes of a child"],
    q: "Choose the correct order:",
    options: ["A-B-C-D", "B-C-A-D", "C-D-A-B", "A-C-B-D"],
    correct: 0,
    explanation: "The subject with its appositive phrase (A) leads to the verb (B) and its objects/modifiers (C-D)."
  },
  {
    id: 12,
    parts: ["despite being warned of the danger", "the hiker decided to proceed", "up the steep mountain slope", "without any professional equipment"],
    q: "Rearrange logically:",
    options: ["B-A-C-D", "C-D-A-B", "A-B-C-D", "A-C-B-D"],
    correct: 2,
    explanation: "Prepositional contrast phrase (A) leads to the main SVO action (B-C) and final modifier (D)."
  },
  {
    id: 13,
    parts: ["rarely does a single individual", "possess such a wide range", "of intellectual and creative talents", "as Leonardo da Vinci did"],
    q: "Identify the correct sequence:",
    options: ["B-A-C-D", "A-B-C-D", "C-D-A-B", "A-C-B-D"],
    correct: 1,
    explanation: "Adverbial inversion 'Rarely does' (A) + verb (B) + object (C) + comparison (D)."
  },
  {
    id: 14,
    parts: ["no sooner had the play begun", "than a technical glitch", "forced the actors to stop", "and restart the entire scene"],
    q: "Rearrange the segments:",
    options: ["B-A-C-D", "C-D-A-B", "A-B-C-D", "A-C-B-D"],
    correct: 2,
    explanation: "Correlative inversion 'No sooner had...than' structure (A-B) + resulting action (C-D)."
  },
  {
    id: 15,
    parts: ["given the current economic climate", "it is highly unlikely", "that interest rates will fall", "in the near future"],
    q: "Choose the correct flow:",
    options: ["B-C-A-D", "C-D-A-B", "A-B-C-D", "A-C-B-D"],
    correct: 2,
    explanation: "Contextual phrase (A) leads to the dummy subject construction (B) and the that-clause (C-D)."
  },
  {
    id: 16,
    parts: ["to ensure the safety of the passengers", "the airline pilot decided", "to divert the plane", "to the nearest available airport"],
    q: "Rearrange correctly:",
    options: ["B-A-C-D", "C-D-A-B", "A-B-C-D", "A-C-B-D"],
    correct: 2,
    explanation: "Infinitive purpose phrase (A) + subject-verb core (B) + object/direction (C-D)."
  },
  {
    id: 17,
    parts: ["with the rise of digital media", "traditional newspapers have had", "to adapt their business models", "to stay relevant in the 21st century"],
    q: "Identify the logical order:",
    options: ["B-C-A-D", "C-D-A-B", "A-B-C-D", "A-C-B-D"],
    correct: 2,
    explanation: "Cause/Context (A) + SVO core (B-C) + purpose (D)."
  },
  {
    id: 18,
    parts: ["provided that the weather stays clear", "the satellite will be launched", "early tomorrow morning", "from the space centre in Florida"],
    q: "Rearrange the segments:",
    options: ["B-A-C-D", "C-D-A-B", "A-B-C-D", "A-C-B-D"],
    correct: 2,
    explanation: "Conditional phrase (A) + main passive verb action (B) + time (C) + location (D)."
  },
  {
    id: 19,
    parts: ["under no circumstances should you", "leave your luggage unattended", "while waiting in the departures lounge", "at the airport"],
    q: "Choose the correct sequence:",
    options: ["B-A-C-D", "C-D-A-B", "A-B-C-D", "A-C-B-D"],
    correct: 2,
    explanation: "Inverted negative adverbial 'Under no circumstances' (A) + modal verb construction (B) + temporal clause (C) + location (D)."
  },
  {
    id: 20,
    parts: ["having been discovered by chance", "the ancient ruins provide", "a fascinating glimpse", "into a long-lost civilisation"],
    q: "Rearrange to form a sentence:",
    options: ["B-A-C-D", "C-D-A-B", "A-B-C-D", "A-C-B-D"],
    correct: 2,
    explanation: "Passive participle phrase (A) describes the subject 'the ancient ruins' (B), leading to the object (C-D)."
  },
  // Set 3 Items
  {
    id: 21,
    parts: ["the impact of climate change", "is becoming increasingly evident", "through the melting of polar ice caps", "and rising sea levels globally"],
    q: "Identify the correct order:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Direct S-V-O-M structure: Impact (S) is becoming (V) evident (O) through... (M)."
  },
  {
    id: 22,
    parts: ["in contrast to his predecessor", "the new CEO emphasized", "transparency and collaboration", "across all levels of the company"],
    q: "Rearrange the segments:",
    options: ["B-C-A-D", "C-D-A-B", "A-B-C-D", "A-C-B-D"],
    correct: 2,
    explanation: "Comparison phrase (A) leads to the subject (B), object (C), and final modifier (D)."
  },
  {
    id: 23,
    parts: ["with a view to improving efficiency", "the company decided to implement", "a new software system", "within its logistics department"],
    q: "Choose the correct flow:",
    options: ["B-A-C-D", "C-D-A-B", "A-B-C-D", "A-C-B-D"],
    correct: 2,
    explanation: "Prepositional purpose phrase 'with a view to' (A) leads to the SVO core (B-C) and location (D)."
  },
  {
    id: 24,
    parts: ["despite the significant progress made", "much remains to be done", "before we can achieve", "true social and economic equality"],
    q: "Rearrange correctly:",
    options: ["B-A-C-D", "C-D-A-B", "A-B-C-D", "A-C-B-D"],
    correct: 2,
    explanation: "Contrastive phrase (A) + main verb phrase (B) + temporal purpose clause (C-D)."
  },
  {
    id: 25,
    parts: ["whether we like it or not", "globalization is a reality", "that will continue to shape", "the future of our society"],
    q: "Identify the logical order:",
    options: ["B-C-A-D", "C-D-A-B", "A-B-C-D", "A-C-B-D"],
    correct: 2,
    explanation: "Disjunctive phrase (A) leads to the main statement (B) and the defining relative clause (C-D)."
  },
  {
    id: 26,
    parts: ["the sudden surge in inflation", "has forced many households", "to reconsider their spending habits", "and cut back on non-essential items"],
    q: "Rearrange to form a coherent sentence:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (A) + present perfect verb (B) + infinitive purpose (C) + addition (D)."
  },
  {
    id: 27,
    parts: ["only by embracing sustainable practices", "can we hope to preserve", "the delicate balance of our ecosystem", "for future generations"],
    q: "Choose the correct order:",
    options: ["B-C-D-A", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 1,
    explanation: "Negative/restrictive adverbial 'only by' (A) triggers subject-auxiliary inversion 'can we' (B), followed by object (C) and modifier (D)."
  },
  {
    id: 28,
    parts: ["the witness's account of the event", "which was captured on CCTV", "contradicted the statements made", "by the suspect during interrogation"],
    q: "Identify the logical sequence:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (A) + non-defining relative clause (B) + main verb (C) + agent phrase (D)."
  },
  {
    id: 29,
    parts: ["to be successful in the competitive market", "entrepreneurs must focus", "on innovation and customer satisfaction", "above all else"],
    q: "Rearrange correctly:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Purpose (A) + subject-modal (B) + prepositional focus (C) + emphasis (D)."
  },
  {
    id: 30,
    parts: ["the findings of the study", "suggest that a balanced diet", "combined with regular exercise", "can significantly improve mental health"],
    q: "Choose the coherent flow:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (A) + report verb (B) + complex that-clause (C-D)."
  },
  // Set 4 Items (Scientific and Administrative)
  {
    id: 31,
    parts: ["the rapid melting of glaciers", "has profound implications", "for global sea levels", "and coastal biodiversity"],
    q: "Rearrange to form a logical sentence:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Simple Subject-Verb-Prepositional structure."
  },
  {
    id: 32,
    parts: ["although the experiment failed", "to produce the expected results", "it provided valuable data", "for future research directions"],
    q: "Choose the correct sequence:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Contrastive clause followed by main clause."
  },
  {
    id: 33,
    parts: ["under the new regulations", "all applicants must submit", "their supporting documents", "within thirty working days"],
    q: "Rearrange correctly:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Contextual prepositional phrase followed by subject-verb core."
  },
  {
    id: 34,
    parts: ["the discovery of penicillin", "by Alexander Fleming in 1928", "revolutionised the treatment", "of infectious bacterial diseases"],
    q: "Identify the logical order:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Subject with modifier, followed by verb and object."
  },
  {
    id: 35,
    parts: ["in order to achieve sustainability", "industries must adopt", "more efficient production methods", "and reduce their carbon footprint"],
    q: "Rearrange to form a sentence:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Purpose phrase followed by subject-verb-object structure."
  },
  {
    id: 36,
    parts: ["the proliferation of smartphones", "has changed the way", "people consume information", "and interact with one another"],
    q: "Choose the coherent flow:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "SVO core followed by coordinate clauses."
  },
  {
    id: 37,
    parts: ["despite the technological advancements", "the digital divide continues", "to widen in developing nations", "due to lack of infrastructure"],
    q: "Rearrange correctly:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Contrast followed by main statement and cause."
  },
  {
    id: 38,
    parts: ["the implementation of the project", "was delayed for several months", "owing to unforeseen circumstances", "beyond the control of the team"],
    q: "Identify the logical sequence:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Passive subject-verb followed by reason and modifier."
  },
  {
    id: 39,
    parts: ["only when the sun went down", "did the temperature begin", "to drop significantly", "in the arid desert region"],
    q: "Choose the correct sequence:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Negative/Restrictive inversion structure."
  },
  {
    id: 40,
    parts: ["the success of the mission", "depended entirely on", "the seamless coordination", "between the ground and space teams"],
    q: "Rearrange to form a sentence:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Direct S-V-O structure."
  },
  // Set 5 Items (Philosophy and Logic)
  {
    id: 41,
    parts: ["the pursuit of happiness", "is often complicated by", "the pressures of modern life", "and societal expectations"],
    q: "Identify the correct order:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Passive S-V-O structure."
  },
  {
    id: 42,
    parts: ["knowledge, once acquired,", "must be applied diligently", "to solve real-world problems", "for the benefit of humanity"],
    q: "Rearrange correctly:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Subject with appositive followed by modal verb and purpose."
  },
  {
    id: 43,
    parts: ["without a clear vision", "it is easy to get lost", "in the trivial details", "of daily administrative tasks"],
    q: "Choose the logical order:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Prepositional lack phrase followed by dummy subject structure."
  },
  {
    id: 44,
    parts: ["the teacher encouraged students", " to think critically about", "the information they receive", "from social media platforms"],
    q: "Rearrange to form a coherent statement:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "S-V-O-M structure."
  },
  {
    id: 45,
    parts: ["by examining the historical records", "historians can gain insights", "into the social structures", "of ancient civilisations"],
    q: "Identify the coherent flow:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Instrumental phrase followed by S-V-O."
  },
  {
    id: 46,
    parts: ["the artist used light and shadow", "to create a sense of depth", "in her latest masterpiece", "exhibited at the national gallery"],
    q: "Rearrange correctly:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "S-V-O core followed by purpose and location."
  },
  {
    id: 47,
    parts: ["despite the loud noise", "the baby continued to sleep", "soundly in the cradle", "unaware of the surrounding chaos"],
    q: "Choose the correct sequence:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Contrastive phrase followed by main action and state modifier."
  },
  {
    id: 48,
    parts: ["the company values innovation", "and encourages its employees", "to suggest new ideas", "for improving the existing products"],
    q: "Identify the logical sequence:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Compound S-V-O structure."
  },
  {
    id: 49,
    parts: ["reading books regularly", "not only expands vocabulary", "but also broadens perspective", "on diverse global cultures"],
    q: "Rearrange to form a logical sentence:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Subject-Gerund followed by correlative conjunctions."
  },
  {
    id: 50,
    parts: ["integrity and transparency", "are the pillars upon which", "the foundation of trust", "is built in any relationship"],
    q: "Choose the coherent flow:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Subject-Verb-Complement structure with relative clause."
  }
]

export default function RearrangeQuizPage() {
  const { toast } = useToast()
  const quizRef = useRef<HTMLDivElement>(null)
  const questionCardRef = useRef<HTMLDivElement>(null)
  const [selectedSetIndex, setSelectedSetIndex] = useState<number | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)

  const quizSets = [
    { name: "Practice Set 1", range: [0, 10] },
    { name: "Practice Set 2", range: [10, 20] },
    { name: "Practice Set 3", range: [20, 30] },
    { name: "Practice Set 4", range: [30, 40] },
    { name: "Practice Set 5", range: [40, 50] },
  ]

  useEffect(() => {
    if (selectedSetIndex !== null) {
      const { range } = quizSets[selectedSetIndex]
      const selectedQuestions = REARRANGE_QUIZ_DATA.slice(range[0], range[1])
      // Randomise order within the set but keep question internal options stable for selection logic
      selectedQuestions.forEach(q => {
        // Ensure options are randomised from their initial state once
        const initialCorrectOpt = q.options[q.correct]
        const shuffled = [...q.options].sort(() => Math.random() - 0.5)
        q.options = shuffled
        q.correct = shuffled.indexOf(initialCorrectOpt)
      })
      selectedQuestions.sort(() => Math.random() - 0.5)
      setQuestions(selectedQuestions)
      setCurrentStep(0)
      setAnswers({})
      setIsFinished(false)
    }
  }, [selectedSetIndex])

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
      toast({ title: "Logic Set Complete!", description: "Check your +5/-1 accuracy." })
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

  if (selectedSetIndex === null) {
    return (
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 text-center animate-fade-in-up">
            <Badge variant="outline" className="mb-4 py-1 px-4 border-primary/40 text-primary font-bold uppercase tracking-widest">
              Section 6: Logic Selection
            </Badge>
            <h1 className="text-4xl font-headline font-bold mb-4">Sequential Logic Practice</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select a clinical practice set to begin. Each set follows official CUET Subject Code 101 marking protocols.
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {quizSets.map((set, idx) => (
              <Card 
                key={idx} 
                className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2rem] bg-white/70 backdrop-blur-sm cursor-pointer overflow-hidden flex flex-col"
                onClick={() => setSelectedSetIndex(idx)}
              >
                <CardHeader className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                      <Layers className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="rounded-full font-bold">10 Items</Badge>
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{set.name}</CardTitle>
                  <CardDescription className="mt-2">High-tier sentence rearrangement items for targeted practice.</CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8 pt-0 mt-auto">
                  <Button variant="outline" className="w-full rounded-xl border-primary/20 hover:bg-primary hover:text-white font-bold group">
                    Begin Set <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
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
            <CardTitle className="text-3xl font-headline mb-2 font-bold">{quizSets[selectedSetIndex].name} Results</CardTitle>
            <div className="grid grid-cols-2 gap-4 my-8">
              <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                <div className="text-xs font-bold text-green-700 uppercase">Correct (+5)</div>
                <div className="text-2xl font-bold text-green-700">+{correct * 5}</div>
              </div>
              <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                <div className="text-xs font-bold text-red-700 uppercase">Errors (-1)</div>
                <div className="text-2xl font-bold text-red-700">-{wrong}</div>
              </div>
            </div>
            <div className="p-6 bg-foreground text-background rounded-[1.5rem] mb-8 shadow-xl">
              <div className="text-sm opacity-70 font-bold">Protocol Score</div>
              <div className="text-4xl font-bold">{total} / {questions.length * 5}</div>
            </div>
            <div className="flex flex-col gap-3">
              <Button size="lg" className="rounded-xl h-12 font-bold shadow-md" onClick={() => {
                setIsFinished(false)
                setCurrentStep(0)
                setAnswers({})
              }}>
                <RefreshCw className="w-4 h-4 mr-2" /> Retake this Set
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl h-12 font-bold" onClick={() => setSelectedSetIndex(null)}>
                Pick Another Set
              </Button>
            </div>
          </Card>

          <section className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 px-2">
              <Info className="w-5 h-5 text-primary" />
              Strategic Item Analysis
            </h3>
            {questions.map((q, idx) => {
              const userAns = answers[q.id]
              const isCorrect = userAns === q.correct
              return (
                <Card key={idx} className="border-none shadow-md overflow-hidden rounded-[1.5rem] bg-white">
                  <div className={cn("px-6 py-3 flex items-center justify-between", isCorrect ? "bg-green-50" : "bg-red-50")}>
                    <Badge variant={isCorrect ? "default" : "destructive"} className="rounded-full font-bold">
                      {isCorrect ? "CORRECT (+5)" : "ERROR (-1)"}
                    </Badge>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex flex-col gap-2">
                      {q.parts.map((p, i) => (
                        <div key={i} className="text-xs font-mono font-bold text-muted-foreground flex items-start gap-2">
                          <span className="text-primary">{String.fromCharCode(65+i)}:</span> {p}
                        </div>
                      ))}
                    </div>
                    <p className="font-bold text-lg">{q.q}</p>
                    <div className="grid gap-2 text-sm">
                      <div className={cn("p-3 rounded-lg flex items-center gap-2", isCorrect ? "bg-green-50" : "bg-red-50")}>
                        {isCorrect ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
                        <span><strong className="text-foreground">Your Selection:</strong> {userAns !== undefined ? q.options[userAns] : "Skipped"}</span>
                      </div>
                      {!isCorrect && (
                        <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>
                            <strong className="text-foreground">Correct Sequence:</strong> {q.options[q.correct]}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground pt-4 border-t border-dashed">
                      <strong className="text-foreground">Clinical Strategy:</strong> {q.explanation}
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
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="flex items-center justify-between mb-8" ref={quizRef}>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setSelectedSetIndex(null)} className="rounded-full">
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <div>
              <h1 className="text-xl font-headline font-bold uppercase tracking-tight text-primary">Sequential Logic</h1>
              <p className="text-muted-foreground font-mono text-xs font-bold">Item {currentStep + 1} / {questions.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full text-[10px] font-bold text-muted-foreground">
              <Keyboard className="w-3 h-3" />
              PRESS ENTER
            </div>
            <Badge variant="outline" className="h-8 px-4 rounded-full border-primary/20 text-primary font-bold">Subject Code 101</Badge>
          </div>
        </div>

        <Progress value={(currentStep / questions.length) * 100} className="mb-12 h-2" />

        <Card className="border-none shadow-xl rounded-[2rem] bg-white mb-8 overflow-hidden" ref={questionCardRef}>
          <CardHeader className="bg-primary/5 pb-8 pt-10">
            <CardTitle className="text-xl text-center leading-relaxed mb-6 font-bold">{q.q}</CardTitle>
            <div className="flex flex-col gap-2">
              {q.parts.map((p, i) => (
                <div key={i} className="px-4 py-3 bg-white border border-primary/10 rounded-xl text-sm font-medium text-foreground shadow-sm flex items-start gap-3 group hover:border-primary/30 transition-colors">
                  <span className="font-mono font-bold text-primary bg-primary/5 w-6 h-6 flex items-center justify-center rounded-lg shrink-0">{String.fromCharCode(65 + i)}</span>
                  {p}
                </div>
              ))}
            </div>
          </CardHeader>
          <CardContent className="p-10 pt-6">
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
                      <span className="inline-block w-12 text-primary font-mono">{i + 1}.</span>
                      {opt}
                    </Label>
                  </div>
                )
              })}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="rounded-xl font-bold">
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          <Button size="lg" className="px-10 h-12 rounded-xl font-bold shadow-lg group" onClick={nextQuestion} disabled={answers[q.id] === undefined}>
            {currentStep === questions.length - 1 ? "Finish Set" : "Next Question"} <Target className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
          </Button>
        </div>

        <div className="mt-12 p-8 rounded-3xl bg-secondary/10 border border-secondary/20 flex gap-5 shadow-sm bg-white">
          <AlertCircle className="w-8 h-8 text-secondary-foreground shrink-0" />
          <div className="text-sm text-secondary-foreground font-bold">
            <strong className="block mb-1">Elite Protocol:</strong>
            Sequential items are high-yield but time-intensive. Use the "Opening Hook" strategy to save 30s per question. Every +5 counts towards your 250 goal.
          </div>
        </div>
      </main>
    </div>
  )
}
