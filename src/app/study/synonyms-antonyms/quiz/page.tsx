
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, RefreshCw, ChevronLeft, Target, Hash, Info, CheckCircle2, XCircle, Keyboard, ArrowRight, BookOpen } from "lucide-react"
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

const VOCAB_QUIZ_DATA: Question[] = [
  // Set 1
  { id: 1, q: "Choose the synonym of EPHEMERAL:", options: ["Permanent", "Transient", "Eternal", "Enduring"], correct: 1, explanation: "'Ephemeral' refers to something that lasts for a very short time. 'Transient' is its direct synonym." },
  { id: 2, q: "Choose the antonym of LOQUACIOUS:", options: ["Talkative", "Garrulous", "Verbose", "Reticent"], correct: 3, explanation: "'Loquacious' means talkative. 'Reticent' means reserved or silent, making it the correct antonym." },
  { id: 3, q: "Choose the synonym of ACRIMONIOUS:", options: ["Pleasant", "Bitter", "Amiable", "Joyful"], correct: 1, explanation: "'Acrimonious' implies bitterness or ill-feeling in speech or debate." },
  { id: 4, q: "Choose the antonym of COPIOUS:", options: ["Plentiful", "Abundant", "Meager", "Profuse"], correct: 2, explanation: "'Copious' means abundant in supply. 'Meager' is the opposite, meaning lacking in quantity." },
  { id: 5, q: "Choose the synonym of PRUDENT:", options: ["Reckless", "Impulsive", "Judicious", "Hasty"], correct: 2, explanation: "'Prudent' means acting with or showing care and thought for the future. 'Judicious' is a close synonym." },
  { id: 6, q: "Choose the antonym of DAUNTLESS:", options: ["Bold", "Intrepid", "Fearless", "Timid"], correct: 3, explanation: "'Dauntless' means showing fearlessness. 'Timid' means showing a lack of courage or confidence." },
  { id: 7, q: "Choose the synonym of CANDID:", options: ["Deceptive", "Evasive", "Frank", "Cunning"], correct: 2, explanation: "'Candid' means truthful and straightforward. 'Frank' is its direct synonym." },
  { id: 8, q: "Choose the antonym of UBIQUITOUS:", options: ["Omnipresent", "Pervasive", "Widespread", "Rare"], correct: 3, explanation: "'Ubiquitous' means present everywhere. 'Rare' is its logical opposite." },
  { id: 9, q: "Choose the synonym of LANGUISH:", options: ["Flourish", "Thrive", "Wither", "Prosper"], correct: 2, explanation: "'Languish' means to grow weak or feeble. 'Wither' captures this sense of decline." },
  { id: 10, q: "Choose the antonym of ZEALOUS:", options: ["Passionate", "Fervent", "Apathetic", "Enthusiastic"], correct: 2, explanation: "'Zealous' means showing great energy or enthusiasm. 'Apathetic' means showing no interest or concern." },
  // Set 2
  { id: 11, q: "Choose the synonym of ABJURE:", options: ["Assert", "Renounce", "Embrace", "Adopt"], correct: 1, explanation: "'Abjure' means to solemnly renounce a belief or claim." },
  { id: 12, q: "Choose the antonym of ALACRITY:", options: ["Eagerness", "Lethargy", "Zeal", "Promptness"], correct: 1, explanation: "'Alacrity' is brisk and cheerful readiness. 'Lethargy' is its opposite." },
  { id: 13, q: "Choose the synonym of AMELIORATE:", options: ["Worsen", "Improve", "Exacerbate", "Stagnate"], correct: 1, explanation: "'Ameliorate' means to make something better." },
  { id: 14, q: "Choose the antonym of ANTIPATHY:", options: ["Aversion", "Hostility", "Affinity", "Dislike"], correct: 2, explanation: "'Antipathy' is a deep-seated feeling of dislike. 'Affinity' is a natural liking." },
  { id: 15, q: "Choose the synonym of ASSIDUOUS:", options: ["Indolent", "Diligent", "Lazy", "Careless"], correct: 1, explanation: "'Assiduous' means showing great care and perseverance." },
  { id: 16, q: "Choose the antonym of AUDACIOUS:", options: ["Bold", "Daring", "Timid", "Fearless"], correct: 2, explanation: "'Audacious' means taking bold risks. 'Timid' is its opposite." },
  { id: 17, q: "Choose the synonym of BANAL:", options: ["Original", "Trite", "Fresh", "Novel"], correct: 1, explanation: "'Banal' means so lacking in originality as to be obvious and boring." },
  { id: 18, q: "Choose the antonym of BENEVOLENT:", options: ["Kind", "Charitable", "Malevolent", "Generous"], correct: 2, explanation: "'Benevolent' means well-meaning and kindly. 'Malevolent' means wishing evil to others." },
  { id: 19, q: "Choose the synonym of CACOPHONY:", options: ["Harmony", "Din", "Euphony", "Silence"], correct: 1, explanation: "'Cacophony' is a harsh, discordant mixture of sounds." },
  { id: 20, q: "Choose the antonym of CAPRICIOUS:", options: ["Fickle", "Inconstant", "Stable", "Variable"], correct: 2, explanation: "'Capricious' means given to sudden changes. 'Stable' is its opposite." },
  // Additional 80 questions follow similar patterns... (truncated for brevity but included in full sets)
  { id: 21, q: "Choose the synonym of CASTIGATE:", options: ["Praise", "Chastise", "Commend", "Approve"], correct: 1, explanation: "'Castigate' means to reprimand someone severely." },
  { id: 22, q: "Choose the antonym of COGENT:", options: ["Compelling", "Vague", "Convincing", "Valid"], correct: 1, explanation: "'Cogent' means clear, logical, and convincing. 'Vague' lacks clarity." },
  { id: 23, q: "Choose the synonym of DELETERIOUS:", options: ["Helpful", "Harmful", "Beneficial", "Salubrious"], correct: 1, explanation: "'Deleterious' means causing harm or damage." },
  { id: 24, q: "Choose the antonym of DIFFIDENT:", options: ["Shy", "Confident", "Bashful", "Modest"], correct: 1, explanation: "'Diffident' means modest or shy due to lack of self-confidence." },
  { id: 25, q: "Choose the synonym of EBULLIENT:", options: ["Depressed", "Exuberant", "Gloomy", "Apathetic"], correct: 1, explanation: "'Ebullient' means cheerful and full of energy." },
  { id: 26, q: "Choose the antonym of ERUDITE:", options: ["Learned", "Ignorant", "Scholarly", "Educated"], correct: 1, explanation: "'Erudite' means having or showing great knowledge." },
  { id: 27, q: "Choose the synonym of FASTIDIOUS:", options: ["Careless", "Meticulous", "Sloppy", "Lax"], correct: 1, explanation: "'Fastidious' means very attentive to and concerned about accuracy and detail." },
  { id: 28, q: "Choose the antonym of GREGARIOUS:", options: ["Sociable", "Reclusive", "Convivial", "Friendly"], correct: 1, explanation: "'Gregarious' means fond of company; sociable." },
  { id: 29, q: "Choose the synonym of IMPECCABLE:", options: ["Flawed", "Faultless", "Defective", "Corrupt"], correct: 1, explanation: "'Impeccable' means in accordance with the highest standards; faultless." },
  { id: 30, q: "Choose the antonym of INDOLENT:", options: ["Lazy", "Industrious", "Idle", "Slothful"], correct: 1, explanation: "'Indolent' means wanting to avoid activity or exertion; lazy." },
  // ... (Sets 4-10)
  { id: 31, q: "Choose the synonym of INGENUOUS:", options: ["Naive", "Cunning", "Deceitful", "Artful"], correct: 0, explanation: "'Ingenuous' means innocent and unsuspecting." },
  { id: 32, q: "Choose the antonym of IRASCIBLE:", options: ["Irritable", "Placid", "Choleric", "Petulant"], correct: 1, explanation: "'Irascible' means having a tendency to be easily angered. 'Placid' means calm." },
  { id: 33, q: "Choose the synonym of LACONIC:", options: ["Verbose", "Brief", "Wordy", "Garrulous"], correct: 1, explanation: "'Laconic' means using very few words." },
  { id: 34, q: "Choose the antonym of MAGNANIMOUS:", options: ["Generous", "Vindictive", "Charitable", "Benevolent"], correct: 1, explanation: "'Magnanimous' means generous or forgiving. 'Vindictive' means having a desire for revenge." },
  { id: 35, q: "Choose the synonym of METICULOUS:", options: ["Careless", "Scrupulous", "Hasty", "Negligent"], correct: 1, explanation: "'Meticulous' means showing great attention to detail." },
  { id: 36, q: "Choose the antonym of NEOPHYTE:", options: ["Beginner", "Veteran", "Novice", "Learner"], correct: 1, explanation: "'Neophyte' is a person who is new to a subject or skill." },
  { id: 37, q: "Choose the synonym of OBDURATE:", options: ["Yielding", "Obstinate", "Flexible", "Amenable"], correct: 1, explanation: "'Obdurate' means stubbornly refusing to change one's opinion." },
  { id: 38, q: "Choose the antonym of OSTENTATIOUS:", options: ["Showy", "Modest", "Pretentious", "Flamboyant"], correct: 1, explanation: "'Ostentatious' means characterized by pretentious display." },
  { id: 39, q: "Choose the synonym of PAUCITY:", options: ["Abundance", "Scarcity", "Plethora", "Surfeit"], correct: 1, explanation: "'Paucity' means the presence of something only in small or insufficient quantities." },
  { id: 40, q: "Choose the antonym of PERNICIOUS:", options: ["Harmful", "Beneficial", "Damaging", "Noxious"], correct: 1, explanation: "'Pernicious' means having a harmful effect, especially in a gradual or subtle way." },
  // Set 5 (41-50)
  { id: 41, q: "Choose the synonym of QUERULOUS:", options: ["Contented", "Petulant", "Cheerful", "Placid"], correct: 1, explanation: "'Querulous' means complaining in a petulant or whining manner." },
  { id: 42, q: "Choose the antonym of SAGACIOUS:", options: ["Wise", "Foolish", "Prudent", "Astute"], correct: 1, explanation: "'Sagacious' means having or showing keen mental discernment and good judgement." },
  { id: 43, q: "Choose the synonym of TACITURN:", options: ["Talkative", "Reticent", "Loquacious", "Garrulous"], correct: 1, explanation: "'Taciturn' means reserved or uncommunicative in speech." },
  { id: 44, q: "Choose the antonym of VACILLATE:", options: ["Waver", "Decide", "Hesitate", "Oscillate"], correct: 1, explanation: "'Vacillate' means to waver between different opinions or actions. 'Decide' is firm." },
  { id: 45, q: "Choose the synonym of VENERATE:", options: ["Despise", "Revere", "Scorn", "Mock"], correct: 1, explanation: "'Venerate' means to regard with great respect." },
  { id: 46, q: "Choose the antonym of VERACIOUS:", options: ["Truthful", "Mendacious", "Honest", "Frank"], correct: 1, explanation: "'Veracious' means speaking or representing the truth. 'Mendacious' means lying." },
  { id: 47, q: "Choose the synonym of ZEALOT:", options: ["Moderate", "Fanatic", "Cynic", "Skeptic"], correct: 1, explanation: "'Zealot' is a person who is fanatical and uncompromising in pursuit of their ideals." },
  { id: 48, q: "Choose the antonym of ABSTRUSE:", options: ["Obscure", "Lucid", "Esoteric", "Recondite"], correct: 1, explanation: "'Abstruse' means difficult to understand. 'Lucid' means easy to understand." },
  { id: 49, q: "Choose the synonym of BELLIGERENT:", options: ["Peaceable", "Pugnacious", "Friendly", "Amiable"], correct: 1, explanation: "'Belligerent' means hostile and aggressive." },
  { id: 50, q: "Choose the antonym of COMPLACENT:", options: ["Smug", "Dissatisfied", "Contented", "Satisfied"], correct: 1, explanation: "'Complacent' means showing uncritical satisfaction with oneself. 'Dissatisfied' is the opposite." },
  // (Items 51-100 would follow similar clinical themes)
  { id: 51, q: "Choose the synonym of DESULTORY:", options: ["Systematic", "Casual", "Methodical", "Orderly"], correct: 1, explanation: "'Desultory' means lacking a plan, purpose, or enthusiasm." },
  { id: 52, q: "Choose the antonym of EBULLIENT:", options: ["Buoyant", "Depressed", "Cheerful", "Animated"], correct: 1, explanation: "'Ebullient' means cheerful and full of energy." },
  { id: 53, q: "Choose the synonym of ENERVATE:", options: ["Energise", "Exhaust", "Invigorate", "Strengthen"], correct: 1, explanation: "'Enervate' means to make someone feel drained of energy." },
  { id: 54, q: "Choose the antonym of EQUANIMITY:", options: ["Composure", "Agitation", "Serenity", "Calmness"], correct: 1, explanation: "'Equanimity' is calmness and composure, especially in a difficult situation." },
  { id: 55, q: "Choose the synonym of EXCULPATE:", options: ["Convict", "Exonerate", "Blame", "Accuse"], correct: 1, explanation: "'Exculpate' means to show or declare that someone is not guilty of wrongdoing." },
  { id: 56, q: "Choose the antonym of FERVOR:", options: ["Passion", "Apathy", "Ardor", "Eagerness"], correct: 1, explanation: "'Fervor' is intense and passionate feeling. 'Apathy' is a lack of interest." },
  { id: 57, q: "Choose the synonym of GARRULOUS:", options: ["Taciturn", "Voluble", "Reticent", "Silent"], correct: 1, explanation: "'Garrulous' means excessively talkative, especially on trivial matters." },
  { id: 58, q: "Choose the antonym of HARANGUE:", options: ["Tirade", "Conversation", "Lecture", "Diatribe"], correct: 1, explanation: "'Harangue' is a lengthy and aggressive speech." },
  { id: 59, q: "Choose the synonym of ICONOCLAST:", options: ["Believer", "Heretic", "Conformist", "Follower"], correct: 1, explanation: "'Iconoclast' is a person who attacks cherished beliefs or institutions." },
  { id: 60, q: "Choose the antonym of IMMUTABLE:", options: ["Fixed", "Variable", "Constant", "Eternal"], correct: 1, explanation: "'Immutable' means unchanging over time or unable to be changed." },
  { id: 61, q: "Choose the synonym of IMPLACABLE:", options: ["Relentless", "Forgiving", "Merciful", "Yielding"], correct: 0, explanation: "'Implacable' means unable to be appeased or placated." },
  { id: 62, q: "Choose the antonym of INCHOATE:", options: ["Rudimentary", "Developed", "Formless", "Emerging"], correct: 1, explanation: "'Inchoate' means just begun and so not fully formed or developed." },
  { id: 63, q: "Choose the synonym of INSIPID:", options: ["Bland", "Exciting", "Flavourful", "Savory"], correct: 0, explanation: "'Insipid' means lacking flavour or interest." },
  { id: 64, q: "Choose the antonym of INTREPID:", options: ["Fearless", "Timid", "Brave", "Dauntless"], correct: 1, explanation: "'Intrepid' means fearless; adventurous." },
  { id: 65, q: "Choose the synonym of LACONIC:", options: ["Verbose", "Succinct", "Wordy", "Prolix"], correct: 1, explanation: "'Laconic' means using very few words." },
  { id: 66, q: "Choose the antonym of MALLEABLE:", options: ["Pliant", "Rigid", "Ductile", "Flexible"], correct: 1, explanation: "'Malleable' means easily influenced or shaped. 'Rigid' is unyielding." },
  { id: 67, q: "Choose the synonym of MUNIFICENT:", options: ["Stingy", "Bountiful", "Penurious", "Frugal"], correct: 1, explanation: "'Munificent' means very generous." },
  { id: 68, q: "Choose the antonym of OBSEQUIOUS:", options: ["Servile", "Domineering", "Fawning", "Sycophantic"], correct: 1, explanation: "'Obsequious' means obedient or attentive to an excessive degree." },
  { id: 69, q: "Choose the synonym of PENCHANT:", options: ["Dislike", "Inclination", "Aversion", "Hatred"], correct: 1, explanation: "'Penchant' means a strong or habitual liking for something." },
  { id: 70, q: "Choose the antonym of PRODIGAL:", options: ["Wasteful", "Parsimonious", "Extravagant", "Lavish"], correct: 1, explanation: "'Prodigal' means spending money freely and recklessly. 'Parsimonious' means very unwilling to spend." },
  { id: 71, q: "Choose the synonym of RANCOR:", options: ["Amity", "Malice", "Goodwill", "Friendship"], correct: 1, explanation: "'Rancor' means bitterness or resentfulness." },
  { id: 72, q: "Choose the antonym of RETICENT:", options: ["Reserved", "Garrulous", "Quiet", "Taciturn"], correct: 1, explanation: "'Reticent' means not revealing one's thoughts easily." },
  { id: 73, q: "Choose the synonym of SALUBRIOUS:", options: ["Healthy", "Noxious", "Harmful", "Unwholesome"], correct: 0, explanation: "'Salubrious' means health-giving; healthy." },
  { id: 74, q: "Choose the antonym of SOPORIFIC:", options: ["Somnolent", "Stimulating", "Sedative", "Sleepy"], correct: 1, explanation: "'Soporific' means tending to induce sleep." },
  { id: 75, q: "Choose the synonym of SPECIOUS:", options: ["Genuine", "Deceptive", "Valid", "Authentic"], correct: 1, explanation: "'Specious' means superficially plausible, but actually wrong." },
  { id: 76, q: "Choose the antonym of TORPOR:", options: ["Lethargy", "Animation", "Sluggishness", "Inactivity"], correct: 1, explanation: "'Torpor' is a state of physical or mental inactivity." },
  { id: 77, q: "Choose the synonym of UBIQUITOUS:", options: ["Rare", "Pervasive", "Scarce", "Unique"], correct: 1, explanation: "'Ubiquitous' means present, appearing, or found everywhere." },
  { id: 78, q: "Choose the antonym of VENERATE:", options: ["Revere", "Dishonour", "Hallow", "Worship"], correct: 1, explanation: "'Venerate' means to regard with great respect." },
  { id: 79, q: "Choose the synonym of VOLATILE:", options: ["Stable", "Unstable", "Constant", "Steady"], correct: 1, explanation: "'Volatile' means liable to change rapidly and unpredictably." },
  { id: 80, q: "Choose the antonym of WARY:", options: ["Cautious", "Trusting", "Circumspect", "Alert"], correct: 1, explanation: "'Wary' means feeling or showing caution about possible dangers." },
  { id: 81, q: "Choose the synonym of ABSTRUSE:", options: ["Lucid", "Recondite", "Simple", "Plain"], correct: 1, explanation: "'Abstruse' means difficult to understand; obscure." },
  { id: 82, q: "Choose the antonym of AMENABLE:", options: ["Compliant", "Intractable", "Docile", "Responsive"], correct: 1, explanation: "'Amenable' means open and responsive to suggestion." },
  { id: 83, q: "Choose the synonym of CAUSTIC:", options: ["Mild", "Acerbic", "Kind", "Soothing"], correct: 1, explanation: "'Caustic' means sarcastic in a scathing and bitter way." },
  { id: 84, q: "Choose the antonym of DEFERENCE:", options: ["Respect", "Contempt", "Homage", "Reverence"], correct: 1, explanation: "'Deference' is polite submission and respect." },
  { id: 85, q: "Choose the synonym of ELUCIDATE:", options: ["Confuse", "Clarify", "Obscure", "Cloud"], correct: 1, explanation: "'Elucidate' means to make something clear; explain." },
  { id: 86, q: "Choose the antonym of FACETIOUS:", options: ["Flippant", "Serious", "Glib", "Joking"], correct: 1, explanation: "'Facetious' means treating serious issues with deliberately inappropriate humour." },
  { id: 87, q: "Choose the synonym of GUILD:", options: ["Deceit", "Candor", "Honesty", "Frankness"], correct: 0, explanation: "'Guile' means sly or cunning intelligence." },
  { id: 88, q: "Choose the antonym of HAPLESS:", options: ["Unfortunate", "Lucky", "Wretched", "Miserable"], correct: 1, explanation: "'Hapless' means unfortunate." },
  { id: 89, q: "Choose the synonym of INURED:", options: ["Sensitive", "Hardened", "Fragile", "Delicate"], correct: 1, explanation: "'Inured' means accustomed to something, especially something unpleasant." },
  { id: 90, q: "Choose the antonym of JUXTAPOSE:", options: ["Collocate", "Separate", "Compare", "Match"], correct: 1, explanation: "'Juxtapose' means to place side by side for contrast." },
  { id: 91, q: "Choose the synonym of MALIGN:", options: ["Praise", "Slander", "Commend", "Applaud"], correct: 1, explanation: "'Malign' means to speak about someone in a spitefully critical manner." },
  { id: 92, q: "Choose the antonym of NONCHALANT:", options: ["Calm", "Anxious", "Composed", "Indifferent"], correct: 1, explanation: "'Nonchalant' means feeling or appearing casually calm and relaxed." },
  { id: 93, q: "Choose the synonym of OPULENT:", options: ["Poor", "Wealthy", "Destitute", "Indigent"], correct: 1, explanation: "'Opulent' means ostentatiously costly and luxurious." },
  { id: 94, q: "Choose the antonym of PERFUNCTORY:", options: ["Cursory", "Thorough", "Careless", "Hasty"], correct: 1, explanation: "'Perfunctory' means carried out with a minimum of effort or reflection." },
  { id: 95, q: "Choose the synonym of RECAPITULATE:", options: ["Summarise", "Expand", "Elongate", "Prolong"], correct: 0, explanation: "'Recapitulate' means to summarise and state again the main points." },
  { id: 96, q: "Choose the antonym of SPURIOUS:", options: ["Deceptive", "Authentic", "Fake", "False"], correct: 1, explanation: "'Spurious' means not being what it purports to be; false." },
  { id: 97, q: "Choose the synonym of TENUOUS:", options: ["Robust", "Flimsy", "Strong", "Sturdy"], correct: 1, explanation: "'Tenuous' means very weak or slight." },
  { id: 98, q: "Choose the antonym of UPBRAID:", options: ["Scold", "Commend", "Chastise", "Reprimand"], correct: 1, explanation: "'Upbraid' means to find fault with someone; scold." },
  { id: 99, q: "Choose the synonym of WIZENED:", options: ["Youthful", "Shrivelled", "Fresh", "Smooth"], correct: 1, explanation: "'Wizened' means shrivelled or wrinkled with age." },
  { id: 100, q: "Choose the antonym of ZENITH:", options: ["Peak", "Nadir", "Summit", "Apex"], correct: 1, explanation: "'Zenith' is the time at which something is most powerful. 'Nadir' is the lowest point." }
]

export default function VocabQuizPage() {
  const { toast } = useToast()
  const quizRef = useRef<HTMLDivElement>(null)
  const questionCardRef = useRef<HTMLDivElement>(null)
  const feedbackRef = useRef<HTMLDivElement>(null)
  
  const [selectedSetIndex, setSelectedSetIndex] = useState<number | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)

  const quizSets = Array.from({ length: 10 }, (_, i) => ({
    name: `Practice Set ${i + 1}`,
    range: [i * 10, (i + 1) * 10],
    desc: `Targets high-yield word families ${i * 10 + 1}-${(i + 1) * 10}.`
  }))

  useEffect(() => {
    if (selectedSetIndex !== null) {
      const { range } = quizSets[selectedSetIndex]
      const selectedQuestions = VOCAB_QUIZ_DATA.slice(range[0], range[1]).map(q => {
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
      toast({ title: "Vocab Set Complete!", description: "Check your +5/-1 accuracy." })
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
              Section 3: Lexical Selection
            </Badge>
            <h1 className="text-4xl font-headline font-bold mb-4 text-foreground">Practice Selection</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select a clinical set to target specific word families. Each set contains 10 high-yield items with anti-guess logic applied.
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
              <Target className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline mb-2 font-bold">{quizSets[selectedSetIndex].name} Results</CardTitle>
            <div className="grid grid-cols-2 gap-4 my-8">
              <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                <div className="text-xs font-bold text-green-700 uppercase">Correct</div>
                <div className="text-2xl font-bold text-green-700">+{correct * 5}</div>
              </div>
              <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                <div className="text-xs font-bold text-red-700 uppercase">Errors</div>
                <div className="text-2xl font-bold text-red-700">-{wrong}</div>
              </div>
            </div>
            <div className="p-6 bg-foreground text-background rounded-[1.5rem] mb-8 shadow-xl">
              <div className="text-sm opacity-70 font-bold">Total Vocab Score</div>
              <div className="text-4xl font-bold">{total} / {questions.length * 5}</div>
            </div>
            <div className="flex flex-col gap-3">
              <Button size="lg" className="rounded-xl h-12 font-bold shadow-md" onClick={() => {
                const { range } = quizSets[selectedSetIndex]
                const selectedQuestions = VOCAB_QUIZ_DATA.slice(range[0], range[1]).map(q => {
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
              }}>
                <RefreshCw className="w-4 h-4 mr-2" /> Retake randomized quiz
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl h-12 font-bold" onClick={() => setSelectedSetIndex(null)}>
                Back to Dashboard
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
                  <CardContent className="p-6 space-y-3">
                    <p className="font-bold text-lg">{q.q}</p>
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
              <h1 className="text-xl font-headline font-bold uppercase tracking-tight text-primary">Lexical Practice</h1>
              <p className="text-muted-foreground font-mono text-sm font-bold">Question {currentStep + 1} of {questions.length}</p>
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
            <CardTitle className="text-2xl text-center leading-relaxed font-bold">{q.q}</CardTitle>
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
