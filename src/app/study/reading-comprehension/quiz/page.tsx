
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, RefreshCw, ChevronLeft, Target, BookOpen, Info, CheckCircle2, XCircle, Keyboard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { cn } from "@/lib/utils"

const RC_QUIZ_DATA = [
  // --- SET 1: Stoicism & Time Management ---
  {
    id: 1,
    passage: "It's essential to focus on what you control, especially when life feels difficult. This mindset is often overshadowed by the flood of information we consume daily. For instance, I spent 30 minutes this morning going down a rabbit hole after reading about Bitcoin. I ended up lost in unrelated Wikipedia pages. Stoicism teaches us that time is our most valuable resource. While it's nice to know many things, most of the information we consume has little real value. We waste time on trivial pursuits, like reading negative news, stalking social media profiles, or watching shows just to \"kill time.\" Why kill something so precious? We're quick to get upset by things we can't control. Responding to every little thing we encounter is a habit. But true happiness comes from accepting that we don't control most things. Worrying about global issues like recessions, wars, or natural disasters is unproductive. Indifference to things outside our control is the key to happiness. Happiness comes from meaningful activities: good friendships, enjoyable work, reading thought-provoking books, walking in nature, working out, or watching a great movie. For example, a recent Saturday was fulfilling because I spent time reading, writing, walking, and enjoying meals with family. Contrast that with another day when I got caught up in negative conversations about COVID. The negativity drained me, and I accomplished nothing useful. Things are the way they are. The best we can do is focus on what matters and how we spend our time.",
    question: "Select the activity that contributes to happiness from the options given below:",
    options: ["Watching random TV shows", "Arguing on social media", "Reading thought-provoking books", "Browsing the internet for news"],
    correct: 2,
    explanation: "The passage explicitly lists 'reading thought-provoking books' as a meaningful activity that leads to happiness."
  },
  {
    id: 2,
    passage: "It's essential to focus on what you control...",
    question: "Select the central idea of the passage from the options given below:",
    options: ["Consuming more information leads to happiness.", "Responding to global issues is essential.", "Happiness comes from following current events.", "Time is a valuable resource we should use it wisely."],
    correct: 3,
    explanation: "The core message is that our time is precious and happiness depends on focusing on what we control."
  },
  {
    id: 3,
    passage: "It's essential to focus on what you control...",
    question: "Choose the best option to complete the sentence: Practicing indifference to uncontrollable things helps to achieve",
    options: ["Better focus on global events", "Fulfilling and lasting happiness", "Improved emotional reactivity", "A deeper knowledge of issues"],
    correct: 1,
    explanation: "The author states that indifference to things outside our control is the key to happiness."
  },
  {
    id: 4,
    passage: "It's essential to focus on what you control...",
    question: "Choose an example of wasting time based on the passage from the options given below:",
    options: ["Scrolling social media profiles", "Walking in nature", "Spending time with family", "Writing and reflecting"],
    correct: 0,
    explanation: "The text identifies 'stalking social media profiles' as a trivial pursuit that wastes time."
  },
  // --- SET 2: Arjun the Artist ---
  {
    id: 5,
    passage: "In the ancient city of Varanasi, Arjun found his world transformed one monsoon afternoon. Born into a family of hardworking labourers, he was expected to follow in his father's footsteps. Yet, Arjun harboured an unspoken passion for art that no one knew about. As dark clouds gathered and the first raindrops fell, he wandered through the narrow lanes of the old city, seeking solace from the predictable rhythms of life. That day, as he took refuge under a vibrant awning in a bustling market, Arjun encountered an old painter named Raghav. With paint-splattered hands and eyes that shimmered with decades of experience, Raghav noticed the spark in Arjun's eyes. He invited Arjun into his humble studio, where canvases whispered stories of love, loss, and hope. Inspired by Raghav's gentle mentorship, Arjun discovered his own unique style, blending tradition with innovation. Over time, his artwork became a mirror reflecting the emotions of the city, and his reputation grew. Arjun's journey from a reluctant son to an emerging artist was not without hardship. Yet, every challenge became a brushstroke in the masterpiece of his life. Eventually, his creations graced galleries beyond Varanasi, uniting cultures and hearts. In every piece, Arjun celebrated the resilience of the human spirit, proving that passion and perseverance can transform even the most ordinary life into a vibrant work of art. His journey, filled with unexpected lessons and creative breakthroughs, taught him that every struggle offered a chance to begin anew, inspiring his art with hope and transformation.",
    question: "Determine the primary theme illustrated in the passage:",
    options: ["The preventable hardships for those who choose artistic paths.", "Conflicts between urban modernity and ancient traditions.", "The beauty of monsoon afternoons encouraging passion.", "The transformative influence of mentorship and following one's passion."],
    correct: 3,
    explanation: "The story focuses on how Arjun's encounter with Raghav (mentorship) transformed his life."
  },
  {
    id: 6,
    passage: "In the ancient city of Varanasi...",
    question: "Evaluate the impact of Arjun's artwork as described in the passage:",
    options: ["His art remained confined within narrow lanes.", "His work was mostly criticised.", "His creations resonated deeply, uniting cultures.", "His art was solely a personal hobby."],
    correct: 2,
    explanation: "The text states his creations graced galleries beyond Varanasi, uniting cultures and hearts."
  },
  {
    id: 7,
    passage: "In the ancient city of Varanasi...",
    question: "Deduce the message the author conveys about overcoming obstacles:",
    options: ["Struggles are insurmountable barriers.", "Every challenge offers an opportunity to grow.", "Only privileged backgrounds can succeed.", "Obstacles invariably lead to failure."],
    correct: 1,
    explanation: "Arjun's journey proves that every challenge became a brushstroke in his masterpiece."
  },
  {
    id: 8,
    passage: "In the ancient city of Varanasi...",
    question: "Interpret the change in Arjun's outlook on life throughout the passage:",
    options: ["He viewed every hardship as an essential brushstroke.", "He became indifferent to challenges.", "He rejected the idea of change.", "He focused solely on commercial success."],
    correct: 0,
    explanation: "The passage notes that every challenge became a 'brushstroke in the masterpiece of his life'."
  },
  // --- SET 3: Indian Handicrafts ---
  {
    id: 9,
    passage: "India is renowned for its rich and diverse heritage of handicrafts...",
    question: "Which of the following is NOT mentioned as a famous handicraft from Rajasthan?",
    options: ["Tie-and-dye fabrics", "Pashmina shawls", "Exquisite jewellery", "Meenakari work"],
    correct: 1,
    explanation: "Pashmina shawls are specifically mentioned as being from Kashmir."
  },
  {
    id: 10,
    passage: "India is renowned for its rich and diverse heritage of handicrafts...",
    question: "The traditional ikat patterns are found in ___ sarees from Andhra Pradesh.",
    options: ["Mysore", "Kanjeevaram", "Pochampally", "Banaras"],
    correct: 2,
    explanation: "The passage recognizes Pochampally sarees for their traditional ikat patterns."
  },
  {
    id: 11,
    passage: "India is renowned for its rich and diverse heritage of handicrafts...",
    question: "According to the passage, what has helped preserve Indian handicrafts over the years?",
    options: ["Government support", "Modern technologies", "International demand", "Generational knowledge passed down by artisans"],
    correct: 3,
    explanation: "The crafts are 'passed down through generations of artisans,' preserving their authenticity."
  },
  {
    id: 12,
    passage: "India is renowned for its rich and diverse heritage of handicrafts...",
    question: "What does the passage primarily highlight?",
    options: ["The economic impact of handicrafts.", "The diversity and richness of Indian handicrafts.", "Handicrafts in daily lives.", "Handicrafts in modern design."],
    correct: 1,
    explanation: "The primary focus is describing the various crafts across different states."
  },
  // --- SET 4: The Tree and the Little Boy ---
  {
    id: 13,
    passage: "There is a lovely story of a tree and a little boy who used to play in its shade. They had become friends. One day, the boy sat leaning against the trunk of the tree, crying. He was hungry. \"Eat my fruit\" said the kind tree bending down one of its branches. The boy ate the fruit and was happy. The boy grew up. One day, he sat under the tree with an anxious look on his face. \"What is the matter?\" asked the tree. \"I am going to marry and I want a house to live in,\" said the young man. \"Cut down my branches and build your house,\" said the tree. The young man built a house with the branches of the tree. The young man became a sailor. One day, he sat under the tree with a worried look. \"What is the matter?\" asked the tree. \"My captain is a cruel fellow. I want a ship of my own,\" said the sailor. \"Cut down my trunk and build a ship.\" The sailor lost his ship and returned home as a helpless old man. On a cold winter's day, he stood where the tree once was, leaning on his stick and trembling with cold. \"Make a fire of me, and warm yourself\" said the stump of the tree. The stump of the unselfish tree burnt in the fire, softly humming a tune.",
    question: "Match the states of the boy with their reasons correctly:",
    options: [
      "A-IV, B-III, C-II, D-I",
      "A-III, B-II, C-I, D-IV",
      "A-I, B-III, C-II, D-IV",
      "A-II, B-I, C-IV, D-III"
    ],
    correct: 1,
    explanation: "A: Crying -> Hungry (III); B: Anxious -> Marry/House (II); C: Worried -> Own Ship (I); D: Stump -> Burnt in fire (IV)."
  },
  {
    id: 14,
    passage: "There is a lovely story of a tree and a little boy...",
    question: "The two protagonists of the story are:",
    options: [
      "Both innocent and naive",
      "One is intelligent and the other a fool",
      "Both cunning and selfish",
      "One is demanding and greedy, the other generous and supportive"
    ],
    correct: 3,
    explanation: "The boy repeatedly takes while the tree repeatedly gives everything it has."
  },
  {
    id: 15,
    passage: "There is a lovely story of a tree and a little boy...",
    question: "How were the tree and the little boy related to each other?",
    options: [
      "They were close contenders in survival",
      "They were very close friends due to long association",
      "They were colleagues working together",
      "They were competitors fulfilling needs"
    ],
    correct: 1,
    explanation: "The story begins by stating they had become friends through the boy playing in its shade."
  },
  {
    id: 16,
    passage: "There is a lovely story of a tree and a little boy...",
    question: "The story highlights a typical selfish human nature. Identify it:",
    options: [
      "Compassion and benevolence",
      "Conservation of forests",
      "Mindless greed to possess more wealth",
      "Heartless and foolish exploitation of nature"
    ],
    correct: 3,
    explanation: "The boy exploits the tree's generosity until nothing but a stump remains."
  },
  {
    id: 17,
    passage: "There is a lovely story of a tree and a little boy...",
    question: "\"The stump of the unselfish tree burnt in the fire, softly humming a tune\" means:",
    options: [
      "Every tree sings when it is burnt",
      "The tree felt no pain in its suffering while caring for others",
      "The tree tried to forget its pain by humming",
      "The tree was a fool and didn't realize it was dying"
    ],
    correct: 1,
    explanation: "It symbolizes the tree's ultimate peace and happiness in serving the boy one last time."
  },
  {
    id: 18,
    passage: "There is a lovely story of a tree and a little boy...",
    question: "How would you define the relationship that the story illustrates?",
    options: [
      "A mutual symbiotic relationship",
      "A relationship based on deceit",
      "A one-sided relationship where the tree supported the boy till the end",
      "A disguised enmity"
    ],
    correct: 2,
    explanation: "The tree gives unconditionally while the boy only returns when he needs something."
  },
  // --- SET 5: The Art of Silence and Shyness ---
  {
    id: 19,
    passage: "I must say that, beyond occasionally exposing me to laughter, my constitutional shyness has been of no great disadvantage to me. In fact, I can see that, on the contrary, it has been all to my advantage. My hesitancy in speech, which was once an annoyance, is now a pleasure. Its greatest pleasure has been that it has taught me the economy of words. I have naturally formed the habit of restraining my thoughts. And I can now, give myself the certificate that a thoughtless word hardly ever escapes of my tongue or pen. I do not recollect ever having had to regret anything in my speech or writing. I have thus been spared many a mishap and waste of time. Experience has taught me that silence is part of the spiritual discipline of a votary of truth. Proneness to exaggerate, to suppress or modify the truth, wittingly or unwittingly, is a natural weakness of man and silence is necessary in order to surmount it. A man of few words will rarely be thoughtless in his speech; he will measure every word.",
    question: "The expression, \"my constitutional shyness\" in the passage means:",
    options: [
      "Shyness mentioned in Article 1 of the Constitution",
      "Shyness prescribed as a mark of democracy",
      "The innate and natural shyness in the author",
      "A shyness the author pretends to have"
    ],
    correct: 2,
    explanation: "'Constitutional' here refers to one's physical or mental makeup; hence, innate nature."
  },
  {
    id: 20,
    passage: "I must say that...",
    question: "The author believes that his shy nature brought him:",
    options: [
      "Great advantage in life",
      "Unmatched joy and enchantment",
      "Disadvantage while performing rituals",
      "Media coverage"
    ],
    correct: 0,
    explanation: "The author explicitly states: 'it has been all to my advantage'."
  },
  {
    id: 21,
    passage: "I must say that...",
    question: "The author, due to his shy nature:",
    options: [
      "Would aggressively attack any crowd",
      "Worked hard to hide his stammer",
      "Naturally formed the habit of restraining his thoughts",
      "Became an ascetic"
    ],
    correct: 2,
    explanation: "The text states: 'I have naturally formed the habit of restraining my thoughts'."
  },
  {
    id: 22,
    passage: "I must say that...",
    question: "The author claims that:",
    options: [
      "He has rarely spoken a thoughtless word",
      "He always speaks without thinking",
      "He has become prone to nightmares",
      "It helped him become a cricket player"
    ],
    correct: 0,
    explanation: "He notes that 'a thoughtless word hardly ever escapes of my tongue or pen'."
  },
  {
    id: 23,
    passage: "I must say that...",
    question: "Experience has taught the author that:",
    options: [
      "Silence is better than laughter",
      "Silence is part of the spiritual discipline",
      "Silence is to be avoided",
      "Silence can never be attained"
    ],
    correct: 1,
    explanation: "The text says: 'Experience has taught me that silence is part of the spiritual discipline'."
  },
  {
    id: 24,
    passage: "I must say that...",
    question: "Match the phrases from the passage correctly:",
    options: [
      "A-IV, B-III, C-II, D-I",
      "A-II, B-I, C-IV, D-III",
      "A-III, B-IV, C-I, D-II",
      "A-I, B-II, C-III, D-IV"
    ],
    correct: 3,
    explanation: "A: Few words -> Rarely thoughtless (I); B: Hesitancy -> Once an annoyance (II); C: Exaggerate -> Weakness (III); D: Shyness -> Laughter (IV)."
  },
  // --- SET 6: The Sickness of Spirit ---
  {
    id: 25,
    passage: "Unhappiness and discontent spring not only from poverty. Man is a strange creature, fundamentally different from other animals. He has far horizons, invincible hopes, creative energies, spiritual powers. If they are left undeveloped and unsatisfied, he may have all the comforts which wealth can give, but will still feel that life is not worthwhile. The great humanist writers, Shaw and Wells, Arnold Bennett and Galsworthy, who are regarded as the prophets of the dawn, expose the foibles, inconsistencies and weaknesses of modern life, but they ignore the deeper currents and sometimes misrepresent them. At any rate, they give nothing in their place. In the void left by the removal of tradition, morality and religion, others are putting in vague sentiments of race and power. The modern mind is shaped by Rousseau's Social Contract, Marx's Capital, Darwin's On the Origin of Species and Spengler's The Decline of the West. The outward chaos and confusion of our life reflect the confusion of our hearts and minds. Constitutions, says Plato, \"are but the reflections in the outside world of the values which prevail in men's minds.\" There must be a change in the ideals we cherish, in the values we adopt, before we can give social expression to them. We help to secure the future only to the extent to which we ourselves are changed. What is missing in our age is the soul; there is nothing wrong with the body. We suffer from sickness of spirit. We must discover our roots in the eternal and regain faith in the transcendent truth which will order life, discipline discordant elements, and bring unity and purpose into it. If not, when the floods come and the winds blow and beat upon our houses, it will fall.",
    question: "The author implies that if eternal values are not regained:",
    options: [
      "The world will be flooded",
      "The sky will fall",
      "Human civilization will be ruined forever",
      "The earth will be sucked into a black hole"
    ],
    correct: 2,
    explanation: "The metaphor of the house falling implies the collapse of society's foundation."
  },
  {
    id: 26,
    passage: "Unhappiness and discontent spring not only from poverty...",
    question: "According to the author, humanist writers have ignored:",
    options: [
      "The spiritual aspect of life",
      "Religion and rituals",
      "Cultural progress",
      "Material welfare"
    ],
    correct: 0,
    explanation: "The author says they ignore 'deeper currents' and fail to provide spiritual alternatives."
  },
  {
    id: 27,
    passage: "Unhappiness and discontent spring not only from poverty...",
    question: "According to the author, how is man different from other animals?",
    options: [
      "Power of speech",
      "Hopes, creative energies, and spiritual powers",
      "Money and material achievements",
      "Physical prowess"
    ],
    correct: 1,
    explanation: "The passage lists these specific qualities as fundamental human differentiators."
  },
  {
    id: 28,
    passage: "Unhappiness and discontent spring not only from poverty...",
    question: "According to the author, unhappiness and discontent spring from:",
    options: [
      "Poverty alone",
      "Ignorance",
      "Poverty along with moral and spiritual degradation",
      "Mental turmoil"
    ],
    correct: 2,
    explanation: "The text starts by saying it springs 'not only from poverty' but later focuses on the 'sickness of spirit'."
  },
  {
    id: 29,
    passage: "Unhappiness and discontent spring not only from poverty...",
    question: "Man will feel incomplete even with wealth if:",
    options: [
      "He is prevented from mingling",
      "His creative energies and spiritual powers are unsatisfied",
      "He is deserted by friends",
      "He fails to enroll in a Central University"
    ],
    correct: 1,
    explanation: "The author states that if these powers are 'unsatisfied,' wealth won't make life worthwhile."
  }
]

export default function RCQuizPage() {
  const { toast } = useToast()
  const quizRef = useRef<HTMLDivElement>(null)
  const [questions, setQuestions] = useState(RC_QUIZ_DATA)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)

  const scrollToQuizTop = useCallback(() => {
    if (quizRef.current) {
      const offset = 80 // Offset for sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = quizRef.current.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  const nextQuestion = useCallback(() => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
      setTimeout(scrollToQuizTop, 100)
    } else {
      setIsFinished(true)
      toast({ title: "RC Set Complete!", description: "Check your +5/-1 accuracy." })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep, questions.length, toast, scrollToQuizTop])

  // Keyboard control: Enter to proceed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && answers[questions[currentStep]?.id] !== undefined && !isFinished) {
        nextQuestion()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [answers, currentStep, questions, isFinished, nextQuestion])

  const handleAnswer = (val: number) => {
    setAnswers({ ...answers, [questions[currentStep].id]: val })
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
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="text-center p-8 border-none shadow-2xl rounded-[3rem] bg-white">
            <div className="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline mb-2">RC Excellence Results</CardTitle>
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
            <div className="p-6 bg-foreground text-background rounded-[1.5rem] mb-8">
              <div className="text-sm opacity-70">Section Marks</div>
              <div className="text-4xl font-bold">{total} / {questions.length * 5}</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="flex-1 rounded-xl h-12 font-bold" onClick={() => window.location.reload()}>
                <RefreshCw className="w-4 h-4 mr-2" /> Retake
              </Button>
              <Button variant="outline" size="lg" className="flex-1 rounded-xl h-12" asChild>
                <Link href="/study/reading-comprehension">Back to Topics</Link>
              </Button>
            </div>
          </Card>

          <section className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2 px-2 text-foreground">
              <Info className="w-5 h-5 text-primary" />
              Detailed Item Analysis
            </h3>
            {questions.map((q, idx) => {
              const userAns = answers[q.id]
              const isCorrect = userAns === q.correct
              return (
                <Card key={idx} className="border-none shadow-md overflow-hidden rounded-[2rem] bg-white">
                  <div className={cn("px-6 py-3 flex items-center justify-between", isCorrect ? "bg-green-50" : "bg-red-50")}>
                    <Badge variant={isCorrect ? "default" : "destructive"} className="font-bold">
                      {isCorrect ? "CORRECT (+5)" : "ERROR (-1)"}
                    </Badge>
                  </div>
                  <CardContent className="p-8 space-y-4">
                    <div className="bg-muted/30 p-4 rounded-xl text-sm italic border-l-4 border-primary max-h-40 overflow-y-auto">
                      {q.passage}
                    </div>
                    <p className="font-bold text-lg text-foreground">{q.question}</p>
                    <div className="grid gap-2 text-sm">
                      <div className={cn("p-4 rounded-xl flex items-center gap-2 border", isCorrect ? "bg-green-100/30 border-green-200" : "bg-red-100/30 border-red-200")}>
                        {isCorrect ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                        <span><strong className="text-foreground">Your selection:</strong> {userAns !== undefined ? q.options[userAns] : "Skipped"}</span>
                      </div>
                      {!isCorrect && (
                        <div className="p-4 rounded-xl flex items-center gap-2 border bg-green-100/30 border-green-200">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span><strong className="text-foreground">Correct Option:</strong> {q.options[q.correct]}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground pt-4 border-t border-dashed">
                      <strong className="text-foreground">Strategy:</strong> {q.explanation}
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
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex items-center justify-between mb-8" ref={quizRef}>
          <div>
            <h1 className="text-2xl font-headline font-bold uppercase tracking-tight text-primary">RC Protocol</h1>
            <p className="text-muted-foreground font-mono text-sm">Question {currentStep + 1} of {questions.length}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full text-[10px] font-bold text-muted-foreground">
              <Keyboard className="w-3 h-3" />
              PRESS ENTER FOR NEXT
            </div>
            <Badge variant="outline" className="h-8 px-4 rounded-full border-primary/20 text-primary font-bold">Code 101</Badge>
          </div>
        </div>

        <Progress value={(currentStep / questions.length) * 100} className="mb-12 h-2" />

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Card className="border-none shadow-sm bg-white/70 backdrop-blur-sm p-8 rounded-[2.5rem]">
            <div className="flex items-center gap-2 mb-6 text-primary font-bold text-sm tracking-widest uppercase">
              <BookOpen className="w-4 h-4" /> COMPREHENSION PASSAGE
            </div>
            <div className="text-foreground leading-relaxed italic text-lg space-y-4">
              {q.passage.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="border-none shadow-xl rounded-[2.5rem] bg-white">
              <CardHeader className="p-8 pb-4">
                <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1 tracking-widest">Question {currentStep + 1}</div>
                <CardTitle className="text-xl leading-snug font-bold text-foreground">{q.question}</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-4">
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
                          className="flex-1 cursor-pointer text-base font-bold text-foreground leading-tight"
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

            <div className="flex justify-between items-center">
              <Button variant="ghost" onClick={() => {
                setCurrentStep(Math.max(0, currentStep - 1))
                setTimeout(scrollToQuizTop, 100)
              }} disabled={currentStep === 0} className="rounded-xl font-bold">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <Button size="lg" className="px-12 h-14 text-lg font-bold rounded-2xl shadow-xl group" onClick={nextQuestion} disabled={answers[q.id] === undefined}>
                {currentStep === questions.length - 1 ? "Submit Paper" : "Next Question"} <Target className="w-5 h-5 ml-3 group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
