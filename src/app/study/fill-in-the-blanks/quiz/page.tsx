
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, RefreshCw, ChevronLeft, Target, PenTool, CheckCircle2, XCircle, Info, Keyboard, ArrowRight, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

type Question = {
  id: number
  q: string
  options: string[]
  correct: number
  explanation: string
}

const FILLERS_QUIZ_DATA: Question[] = [
  // SET 1: Tenses & Conjunctions
  { id: 1, q: "By the time the ambulance arrived, the patient ______ unconscious for twenty minutes.", options: ["was", "has been", "had been", "is"], correct: 2, explanation: "Two actions happened in the past. The first action (being unconscious) must be in Past Perfect ('had been')." },
  { id: 2, q: "______ the heavy criticism, the director chose to screen the film internationally.", options: ["Because of", "Despite", "Although", "Since"], correct: 1, explanation: "'Despite' is used before a noun/phrase to show contrast. 'Although' requires a full clause." },
  { id: 3, q: "No sooner did the bell ring ______ the actor started singing.", options: ["when", "after", "than", "before"], correct: 2, explanation: "'No sooner' is always paired with 'than' in standard comparative structures of sequence." },
  { id: 4, q: "If I ______ you, I would apologise immediately.", options: ["am", "was", "were", "will be"], correct: 2, explanation: "In hypothetical/imaginary conditions (Second Conditional), 'were' is used for all subjects." },
  { id: 5, q: "She has not visited her native village ______ she moved to the city.", options: ["when", "after", "since", "before"], correct: 2, explanation: "'Since' is used to indicate a point in time starting from the past action (moving to the city)." },
  { id: 6, q: "Scarcely had he reached the station ______ the train departed.", options: ["than", "when", "then", "after"], correct: 1, explanation: "'Scarcely' and 'Hardly' are always followed by 'when' in sequence structures." },
  { id: 7, q: "Neither the principal nor the teachers ______ present at the function yesterday.", options: ["was", "were", "has been", "is"], correct: 1, explanation: "In 'Neither/Nor' structures, the verb agrees with the subject closest to it (teachers = plural)." },
  { id: 8, q: "He works hard lest he ______ fail in the examination.", options: ["would", "should", "could", "might"], correct: 1, explanation: "'Lest' is traditionally followed by 'should' regardless of the tense of the main clause." },
  { id: 9, q: "I have been waiting for you ______ three hours.", options: ["since", "from", "for", "by"], correct: 2, explanation: "'For' is used for a duration/period of time, while 'since' is for a specific point in time." },
  { id: 10, q: "Although he is wealthy, ______ he is very humble.", options: ["but", "yet", "and", "still"], correct: 1, explanation: "'Although' is usually paired with 'yet' or a comma, never 'but'." },

  // SET 2: Fixed Prepositions
  { id: 11, q: "The young officer was acquitted ______ all the charges brought against him.", options: ["from", "of", "off", "with"], correct: 1, explanation: "The verb 'Acquitted' is always followed by the fixed preposition 'of'." },
  { id: 12, q: "You must abstain ______ smoking if you want to improve your health.", options: ["from", "to", "for", "by"], correct: 0, explanation: "'Abstain' and 'Refrain' are always followed by 'from'." },
  { id: 13, q: "He is senior ______ me by five years in the department.", options: ["than", "to", "from", "with"], correct: 1, explanation: "Adjectives ending in '-ior' (senior, junior, superior) take 'to', never 'than'." },
  { id: 14, q: "The climate of this hill station is conducive ______ good health.", options: ["for", "to", "with", "in"], correct: 1, explanation: "'Conducive' is always followed by the fixed preposition 'to'." },
  { id: 15, q: "She has been suffering ______ malaria for the last two days.", options: ["with", "from", "by", "of"], correct: 1, explanation: "'Suffering' takes the preposition 'from' when referring to a disease." },
  { id: 16, q: "The thief broke ______ the house and stole the jewellery.", options: ["in", "into", "through", "off"], correct: 1, explanation: "'Break into' is a phrasal verb meaning to enter by force." },
  { id: 17, q: "He deals ______ silk goods but he doesn't know how to deal ______ customers.", options: ["with, in", "in, with", "in, in", "with, with"], correct: 1, explanation: "'Deal in' means to trade; 'Deal with' means to handle a person or situation." },
  { id: 18, q: "I am fond ______ reading detective novels in my spare time.", options: ["of", "off", "about", "for"], correct: 0, explanation: "'Fond' is always followed by 'of'." },
  { id: 19, q: "He was blind ______ one eye since birth.", options: ["to", "in", "with", "of"], correct: 1, explanation: "'Blind in' refers to physical sight; 'Blind to' refers to ignoring defects or facts." },
  { id: 20, q: "We should always abide ______ the rules of the academy.", options: ["to", "by", "with", "for"], correct: 1, explanation: "'Abide by' means to follow or obey a rule/decision." },

  // SET 3: Phrasal Verbs & Vocabulary
  { id: 21, q: "The committee decided to ______ the meeting due to lack of quorum.", options: ["call on", "call off", "call out", "call up"], correct: 1, explanation: "'Call off' is a phrasal verb meaning to cancel." },
  { id: 22, q: "The patient passed ______ peacefully in his sleep last night.", options: ["out", "off", "away", "by"], correct: 2, explanation: "'Pass away' is a polite euphemism for 'to die'." },
  { id: 23, q: "It is hard to ______ with his constant complaining.", options: ["put up", "put out", "put off", "put by"], correct: 0, explanation: "'Put up with' means to tolerate something unpleasant." },
  { id: 24, q: "The scientist spoke ______ to the reporters, ensuring her research was clearly understood.", options: ["carelessly", "hastily", "abruptly", "lucidly"], correct: 3, explanation: "'Lucidly' means clearly and easily understood." },
  { id: 25, q: "The firemen managed to ______ the fire after three hours.", options: ["put off", "put out", "put on", "put away"], correct: 1, explanation: "'Put out' means to extinguish a flame." },
  { id: 26, q: "She takes ______ her mother in both appearance and temperament.", options: ["after", "off", "on", "up"], correct: 0, explanation: "'Take after' means to resemble a parent or relative." },
  { id: 27, q: "I am ______ for a new job in the marketing sector.", options: ["looking into", "looking for", "looking after", "looking up"], correct: 1, explanation: "'Looking for' means to search for something." },
  { id: 28, q: "The police are ______ the mysterious disappearance of the hiker.", options: ["looking into", "looking at", "looking for", "looking over"], correct: 0, explanation: "'Looking into' means to investigate." },
  { id: 29, q: "You should ______ your bad habits before it's too late.", options: ["give in", "give up", "give away", "give out"], correct: 1, explanation: "'Give up' means to stop doing something (especially a habit)." },
  { id: 30, q: "The plane ______ on time despite the heavy fog.", options: ["took off", "took out", "took in", "took up"], correct: 0, explanation: "'Took off' means to leave the ground (for aircraft)." },

  // SET 4: Determiners & Modals
  { id: 31, q: "He has ______ knowledge of the subject, so he failed the test.", options: ["a little", "little", "the little", "few"], correct: 1, explanation: "'Little' (without 'a') has a negative meaning, implying 'hardly any'." },
  { id: 32, q: "I have ______ friends in this city, so I don't feel lonely.", options: ["few", "a few", "the few", "little"], correct: 1, explanation: "'A few' has a positive meaning, implying 'some'." },
  { id: 33, q: "______ information he had was not reliable.", options: ["Little", "A little", "The little", "Few"], correct: 2, explanation: "'The little' refers to 'not much, but all that is available'." },
  { id: 34, q: "There isn't ______ milk left in the refrigerator.", options: ["many", "much", "few", "some"], correct: 1, explanation: "'Much' is used with uncountable nouns (milk) in negative sentences." },
  { id: 35, q: "______ of the two candidates is suitable for the job.", options: ["Neither", "None", "Any", "No one"], correct: 0, explanation: "'Neither' is used when choosing between exactly two options." },
  { id: 36, q: "Each of the students ______ given a certificate today.", options: ["were", "was", "have been", "are"], correct: 1, explanation: "'Each' always takes a singular verb." },
  { id: 37, q: "You ______ not worry about the results; you have done your best.", options: ["must", "need", "should", "ought"], correct: 1, explanation: "'Need not' expresses lack of necessity." },
  { id: 38, q: "He is ______ honest man.", options: ["a", "an", "the", "no article"], correct: 1, explanation: "'Honest' starts with a vowel sound (silent 'h'), so it takes 'an'." },
  { id: 39, q: "Can you give me ______ water?", options: ["many", "any", "some", "few"], correct: 2, explanation: "'Some' is used in requests or when we expect a 'yes' answer." },
  { id: 40, q: "I haven't got ______ money in my pocket.", options: ["some", "any", "many", "no"], correct: 1, explanation: "'Any' is used in negative sentences and questions." },

  // SET 5: Mix Proficiency
  { id: 41, q: "The elder brother is more intelligent ______ the two.", options: ["than", "among", "of", "in"], correct: 2, explanation: "When comparing exactly two, we use 'of the two'." },
  { id: 42, q: "Hardly had I entered the room ______ the light went out.", options: ["than", "when", "then", "after"], correct: 1, explanation: "'Hardly' is followed by 'when'." },
  { id: 43, q: "He is addicted ______ gambling.", options: ["with", "to", "for", "in"], correct: 1, explanation: "'Addicted' is followed by the fixed preposition 'to'." },
  { id: 44, q: "The teacher was angry ______ his misbehaviour.", options: ["at", "with", "on", "to"], correct: 0, explanation: "We are 'angry with' a person, but 'angry at' a thing or behaviour." },
  { id: 45, q: "I prefer coffee ______ tea.", options: ["than", "to", "over", "from"], correct: 1, explanation: "'Prefer' is always followed by 'to'." },
  { id: 46, q: "Death is preferable ______ dishonour.", options: ["than", "to", "from", "over"], correct: 1, explanation: "'Preferable' takes 'to'." },
  { id: 47, q: "He jumped ______ the river to save the drowning child.", options: ["in", "into", "to", "on"], correct: 1, explanation: "'Into' indicates motion towards the inside of something." },
  { id: 48, q: "She is good ______ English but weak ______ Mathematics.", options: ["in, in", "at, at", "at, in", "in, at"], correct: 2, explanation: "'Good at' and 'Weak in' are the standard clinical pairings." },
  { id: 49, q: "Please wait ______ me at the bus stop.", options: ["on", "for", "by", "to"], correct: 1, explanation: "'Wait for' someone; 'Wait on' means to serve someone (like in a restaurant)." },
  { id: 50, q: "The meeting was put ______ because of the storm.", options: ["out", "off", "up", "away"], correct: 1, explanation: "'Put off' means to postpone." },

  // SET 6: Tense Nuance (Advanced)
  { id: 51, q: "If the plane ______ late, I will miss my connecting flight.", options: ["arrives", "arrived", "will arrive", "has arrived"], correct: 0, explanation: "In First Conditional, the 'if' clause takes Present Simple." },
  { id: 52, q: "I ______ the report before the deadline yesterday.", options: ["completed", "have completed", "had completed", "was completing"], correct: 2, explanation: "Past Perfect is used for an action completed before a specific past point." },
  { id: 53, q: "The sun ______ in the east and sets in the west.", options: ["rose", "is rising", "rises", "has risen"], correct: 2, explanation: "Scientific facts are expressed in Present Simple." },
  { id: 54, q: "We ______ for three hours when it started to rain.", options: ["walked", "were walking", "have been walking", "had been walking"], correct: 3, explanation: "Past Perfect Continuous describes an ongoing action before another past event." },
  { id: 55, q: "By next year, I ______ my graduation.", options: ["will complete", "will have completed", "completed", "have completed"], correct: 1, explanation: "Future Perfect is used for actions that will be finished by a specific time in the future." },
  { id: 56, q: "They ______ to each other since their argument last month.", options: ["didn't speak", "aren't speaking", "haven't spoken", "won't speak"], correct: 2, explanation: "Present Perfect is used for actions spanning from the past to the present." },
  { id: 57, q: "I wish I ______ more attention in the class.", options: ["paid", "had paid", "have paid", "was paying"], correct: 1, explanation: "Wishes about the past use Past Perfect." },
  { id: 58, q: "If he ______ faster, he would have won the race.", options: ["runs", "ran", "had run", "was running"], correct: 2, explanation: "Third Conditional uses 'If + Past Perfect'." },
  { id: 59, q: "The train ______ before we reached the platform.", options: ["left", "has left", "had left", "was leaving"], correct: 2, explanation: "Past Perfect for the earlier of two past actions." },
  { id: 60, q: "I ______ coffee when the phone rang.", options: ["drank", "was drinking", "have drunk", "had drunk"], correct: 1, explanation: "Past Continuous for an action interrupted by another past action." },

  // SET 7: Prepositional Mastery
  { id: 61, q: "He is jealous ______ his brother's success.", options: ["of", "for", "with", "at"], correct: 0, explanation: "'Jealous' is always followed by 'of'." },
  { id: 62, q: "The cat jumped ______ the table.", options: ["on", "onto", "at", "to"], correct: 1, explanation: "'Onto' indicates movement towards a surface." },
  { id: 63, q: "She is very good ______ playing the piano.", options: ["in", "at", "with", "on"], correct: 1, explanation: "'Good at' is the correct fixed preposition for skills." },
  { id: 64, q: "I am tired ______ waiting for the results.", options: ["from", "of", "with", "by"], correct: 1, explanation: "'Tired of' means bored or impatient." },
  { id: 65, q: "The patient is recovering ______ his illness.", options: ["from", "of", "with", "by"], correct: 0, explanation: "'Recovering from' is the standard clinical pairing." },
  { id: 66, q: "He was blind ______ the faults of his children.", options: ["in", "to", "with", "at"], correct: 1, explanation: "'Blind to' means unaware of or ignoring something." },
  { id: 67, q: "This path is parallel ______ the river.", options: ["with", "to", "of", "from"], correct: 1, explanation: "'Parallel to' is the fixed prepositional pair." },
  { id: 68, q: "You should not laugh ______ others' misfortunes.", options: ["on", "at", "for", "with"], correct: 1, explanation: "'Laugh at' is the correct pairing." },
  { id: 69, q: "The property is adjacent ______ the park.", options: ["with", "to", "by", "near"], correct: 1, explanation: "'Adjacent to' means next to." },
  { id: 70, q: "He was ashamed ______ his behaviour.", options: ["of", "for", "at", "with"], correct: 0, explanation: "'Ashamed of' is the correct pairing." },

  // SET 8: Phrasal Power
  { id: 71, q: "The firemen managed to ______ the blaze.", options: ["put out", "put off", "put on", "put in"], correct: 0, explanation: "'Put out' means to extinguish." },
  { id: 72, q: "Please ______ your shoes before entering the temple.", options: ["take off", "take out", "take in", "take up"], correct: 0, explanation: "'Take off' means to remove clothing/shoes." },
  { id: 73, q: "We should ______ our ancestors with respect.", options: ["look after", "look up to", "look into", "look for"], correct: 1, explanation: "'Look up to' means to admire or respect." },
  { id: 74, q: "The old man ______ in his sleep last night.", options: ["passed out", "passed away", "passed by", "passed on"], correct: 1, explanation: "'Passed away' is a polite way to say died." },
  { id: 75, q: "Don't ______ your goals, keep working hard.", options: ["give in", "give up", "give out", "give away"], correct: 1, explanation: "'Give up' means to stop trying." },
  { id: 76, q: "The manager decided to ______ the meeting.", options: ["call off", "call on", "call out", "call in"], correct: 0, explanation: "'Call off' means to cancel." },
  { id: 77, q: "I will ______ the matter and get back to you.", options: ["look for", "look after", "look into", "look at"], correct: 2, explanation: "'Look into' means to investigate." },
  { id: 78, q: "How are you ______ with your new classmates?", options: ["getting along", "getting away", "getting up", "getting in"], correct: 0, explanation: "'Getting along' means having a good relationship." },
  { id: 79, q: "The car ______ in the middle of the highway.", options: ["broke down", "broke into", "broke out", "broke up"], correct: 0, explanation: "'Broke down' means stopped working." },
  { id: 80, q: "The soldiers had to ______ when they ran out of ammo.", options: ["fall back", "fall out", "fall through", "fall off"], correct: 0, explanation: "'Fall back' means to retreat." },

  // SET 9: Subject-Verb Protocol
  { id: 81, q: "The quality of these mangoes ______ not good.", options: ["is", "are", "were", "have been"], correct: 0, explanation: "The subject is 'Quality' (singular), not 'mangoes'." },
  { id: 82, q: "Neither of the two candidates ______ suitable.", options: ["is", "are", "were", "have been"], correct: 0, explanation: "'Neither' takes a singular verb." },
  { id: 83, q: "Bread and butter ______ my favourite breakfast.", options: ["is", "are", "were", "have been"], correct: 0, explanation: "Compound subjects referring to a single idea take a singular verb." },
  { id: 84, q: "Ten miles ______ a long distance to walk.", options: ["is", "are", "were", "have been"], correct: 0, explanation: "Distances and sums take singular verbs when viewed as a whole." },
  { id: 85, q: "Politics ______ a dirty game.", options: ["is", "are", "were", "have been"], correct: 0, explanation: "'Politics' is treated as a singular noun." },
  { id: 86, q: "Each of the boys ______ rewarded.", options: ["was", "were", "have been", "are"], correct: 0, explanation: "'Each' always takes a singular verb." },
  { id: 87, q: "The jury ______ divided in their opinion.", options: ["is", "are", "was", "has been"], correct: 1, explanation: "Collective nouns take plural verbs when members act individually." },
  { id: 88, q: "Slow and steady ______ the race.", options: ["win", "wins", "is winning", "has won"], correct: 1, explanation: "Singular verb for a compound subject expressing one idea." },
  { id: 89, q: "A large number of people ______ present.", options: ["was", "is", "were", "has been"], correct: 2, explanation: "'A number of' takes a plural verb." },
  { id: 90, q: "The principal, along with the teachers, ______ coming.", options: ["is", "are", "were", "have been"], correct: 0, explanation: "Verb agrees with the first subject when joined by 'along with'." },

  // SET 10: Lexical Precision
  { id: 91, q: "He is ______ honest man.", options: ["a", "an", "the", "no article"], correct: 1, explanation: "Use 'an' before silent 'h'." },
  { id: 92, q: "There is ______ milk in the jug.", options: ["many", "much", "few", "a few"], correct: 1, explanation: "Use 'much' for uncountable nouns." },
  { id: 93, q: "I have ______ friends in this city.", options: ["little", "much", "a few", "a little"], correct: 2, explanation: "Use 'a few' for countable nouns (some)." },
  { id: 94, q: "The man ______ stole my wallet was caught.", options: ["which", "who", "whom", "whose"], correct: 1, explanation: "Use 'who' for people as subjects." },
  { id: 95, q: "This is the book ______ I was looking for.", options: ["who", "which", "whom", "whose"], correct: 1, explanation: "Use 'which' or 'that' for objects." },
  { id: 96, q: "He works hard ______ he may pass.", options: ["so that", "lest", "because", "although"], correct: 0, explanation: "Use 'so that' to express purpose." },
  { id: 97, q: "Wait here ______ I come back.", options: ["till", "unless", "since", "while"], correct: 0, explanation: "Use 'till' or 'until' for time limits." },
  { id: 98, q: "I ______ not come today as I am busy.", options: ["will", "can", "may", "must"], correct: 0, explanation: "'Will' expresses future intention." },
  { id: 99, q: "You ______ respect your elders.", options: ["ought to", "can", "may", "might"], correct: 0, explanation: "'Ought to' expresses moral obligation." },
  { id: 100, q: "He is ______ superior to me.", options: ["much", "more", "very", "too"], correct: 0, explanation: "Use 'much' with comparative forms." }
]

export default function FillersQuizPage() {
  const { toast } = useToast()
  const quizRef = useRef<HTMLDivElement>(null)
  const questionCardRef = useRef<HTMLDivElement>(null)
  const feedbackRef = useRef<HTMLDivElement>(null)
  
  const [selectedSetIndex, setSelectedSetIndex] = useState<number | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)

  const quizSets = [
    { name: "Practice Set 1", range: [0, 10], desc: "Tenses & Conjunctions" },
    { name: "Practice Set 2", range: [10, 20], desc: "Fixed Prepositions" },
    { name: "Practice Set 3", range: [20, 30], desc: "Phrasal Verbs & Vocab" },
    { name: "Practice Set 4", range: [30, 40], desc: "Determiners & Modals" },
    { name: "Practice Set 5", range: [40, 50], desc: "Mixed Proficiency" },
    { name: "Practice Set 6", range: [50, 60], desc: "Tense Nuance (Adv)" },
    { name: "Practice Set 7", range: [60, 70], desc: "Prepositional Mastery" },
    { name: "Practice Set 8", range: [70, 80], desc: "Phrasal Power" },
    { name: "Practice Set 9", range: [80, 90], desc: "Subject-Verb Protocol" },
    { name: "Practice Set 10", range: [90, 100], desc: "Lexical Precision" },
  ]

  useEffect(() => {
    if (selectedSetIndex !== null) {
      const { range } = quizSets[selectedSetIndex]
      const selectedQuestions = FILLERS_QUIZ_DATA.slice(range[0], range[1]).map(q => {
        const cloned = { ...q, options: [...q.options] }
        const initialCorrectOpt = cloned.options[cloned.correct]
        const shuffled = [...cloned.options].sort(() => Math.random() - 0.5)
        cloned.options = shuffled
        cloned.correct = shuffled.indexOf(initialCorrectOpt)
        return cloned
      })
      setQuestions([...selectedQuestions].sort(() => Math.random() - 0.5))
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
      toast({ title: "Grammar Set Complete!", description: "Check your +5/-1 accuracy." })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep, questions.length, toast])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && selectedSetIndex !== null && !isFinished && questions.length > 0) {
        const q = questions[currentStep]
        if (answers[q.id] !== undefined) {
          nextQuestion()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [answers, currentStep, questions, isFinished, selectedSetIndex, nextQuestion])

  const handleAnswer = (val: number) => {
    const qId = questions[currentStep].id
    if (answers[qId] !== undefined) return
    setAnswers({ ...answers, [qId]: val })
    
    setTimeout(() => {
      feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
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
              Section 5: Syntactic Set
            </Badge>
            <h1 className="text-4xl font-headline font-bold mb-4 text-foreground">Practice Selection</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select a clinical set to target specific grammar patterns. Each set contains 10 high-yield items with anti-guess logic applied.
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
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="rounded-full font-bold">10 Items</Badge>
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{set.name}</CardTitle>
                  <CardDescription className="mt-2 font-medium">{set.desc}</CardDescription>
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
              <PenTool className="w-10 h-10 text-primary" />
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
              <div className="text-sm opacity-70 font-bold">Total Set Score</div>
              <div className="text-4xl font-bold">{total} / {questions.length * 5}</div>
            </div>
            <div className="flex flex-col gap-3">
              <Button size="lg" className="rounded-xl h-12 font-bold shadow-md" onClick={() => {
                setIsFinished(false)
                setCurrentStep(0)
                setAnswers({})
                // Force reshuffle
                const { range } = quizSets[selectedSetIndex]
                const selectedQuestions = FILLERS_QUIZ_DATA.slice(range[0], range[1]).map(q => {
                  const cloned = { ...q, options: [...q.options] }
                  const initialCorrectOpt = cloned.options[cloned.correct]
                  const shuffled = [...cloned.options].sort(() => Math.random() - 0.5)
                  cloned.options = shuffled
                  cloned.correct = shuffled.indexOf(initialCorrectOpt)
                  return cloned
                })
                setQuestions([...selectedQuestions].sort(() => Math.random() - 0.5))
              }}>
                <RefreshCw className="w-4 h-4 mr-2" /> Retake this Set
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl h-12 font-bold" onClick={() => setSelectedSetIndex(null)}>
                Choose Another Set
              </Button>
            </div>
          </Card>

          <section className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 px-2 text-foreground">
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
                  <CardContent className="p-6 space-y-3">
                    <p className="font-bold text-lg text-foreground">{q.q}</p>
                    <div className="grid gap-2 text-sm">
                      <div className={cn("p-3 rounded-lg flex items-center gap-2", isCorrect ? "bg-green-100/30" : "bg-red-100/30")}>
                        {isCorrect ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
                        <span><strong className="text-foreground">Your selection:</strong> {userAns !== undefined ? q.options[userAns] : "Skipped"}</span>
                      </div>
                      {!isCorrect && (
                        <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>
                            <strong className="text-foreground">Correct Option:</strong> {q.options[q.correct]}
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
  const userAnswer = answers[q.id]
  const isCorrect = userAnswer !== undefined && userAnswer === q.correct

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="flex items-center justify-between mb-8" ref={quizRef}>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setSelectedSetIndex(null)} className="rounded-full">
              <ChevronLeft className="w-4 h-4 mr-1" /> Sets
            </Button>
            <div>
              <h1 className="text-xl font-headline font-bold text-primary">Syntactic Practice</h1>
              <p className="text-muted-foreground font-mono text-xs font-bold">Question {currentStep + 1} of {questions.length}</p>
            </div>
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
            <CardTitle className="text-2xl text-center leading-relaxed font-bold text-foreground">{q.q}</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <RadioGroup 
              onValueChange={(val) => handleAnswer(parseInt(val))} 
              value={userAnswer?.toString()} 
              disabled={userAnswer !== undefined}
              className="grid gap-3"
            >
              {q.options.map((opt, i) => {
                const isSelected = userAnswer === i
                const isCorrectOption = i === q.correct
                
                return (
                  <div 
                    key={i} 
                    onClick={() => handleAnswer(i)}
                    className={cn(
                      "flex items-center space-x-3 border p-5 rounded-2xl transition-all cursor-pointer group",
                      userAnswer === undefined && "hover:bg-primary/5 hover:border-primary/20",
                      isSelected && !isCorrect && "border-destructive bg-destructive/5 ring-1 ring-destructive/20 shadow-md",
                      isSelected && isCorrect && "border-green-500 bg-green-50 ring-1 ring-green-200 shadow-md",
                      userAnswer !== undefined && isCorrectOption && !isSelected && "border-green-500/50 bg-green-50/30"
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
                    {userAnswer !== undefined && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                    {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive" />}
                  </div>
                )
              })}
            </RadioGroup>

            <AnimatePresence>
              {userAnswer !== undefined && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="mt-8 pt-8 border-t border-dashed"
                  ref={feedbackRef}
                >
                  <div className={cn("p-6 rounded-2xl", isCorrect ? "bg-green-50 border border-green-100" : "bg-red-50 border border-red-100")}>
                    <div className="flex items-center gap-3 mb-3">
                      {isCorrect ? <CheckCircle2 className="w-6 h-6 text-green-600" /> : <XCircle className="w-6 h-6 text-red-600" />}
                      <span className={cn("text-xl font-bold", isCorrect ? "text-green-700" : "text-red-700")}>
                        {isCorrect ? "Perfect Scoop!" : "Brain Freeze!"}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm font-medium">
                      <strong className="text-foreground">Clinical Strategy:</strong> {q.explanation}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center mt-8">
          <Button variant="ghost" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="rounded-xl font-bold text-muted-foreground hover:text-primary">
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          <Button size="lg" className="px-10 h-12 rounded-xl font-bold shadow-lg group" onClick={nextQuestion} disabled={userAnswer === undefined}>
            {currentStep === questions.length - 1 ? "Finish Set" : "Next Question"} <Target className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </main>
    </div>
  )
}
