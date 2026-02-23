
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, RefreshCw, ChevronLeft, Target, BookOpen, Info, CheckCircle2, XCircle, Keyboard, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

type Question = {
  id: number
  text: string
  options: string[]
  correct: number | number[]
  explanation: string
}

type Passage = {
  id: string
  title: string
  description: string
  content: string
  questions: Question[]
}

const RC_PASSAGES: Passage[] = [
  {
    id: "dr-moo",
    title: "Dr. Moo and the Cosmic Continuum",
    description: "A narrative adventure exploring the intersection of grammar and time-travel.",
    content: "In the sprawling expanse of the cosmos, there existed a peculiar dimension known as The Milky Way, a realm where time flowed not in a straight line, but in loops of past, present, and future. Guarding this timeline was an unlikely hero: Dr. Moo, a time-travelling cow with a penchant for flawless English grammar. While other celestial beings concerned themselves with black holes, Dr. Moo focused on fixing temporal paradoxes caused by misplaced modifiers and incorrect verb forms. One epoch, a rogue comet threatened to scramble the timeline, merging the past continuous with the future perfect. \"We must make your English legend-dairy with tenses,\" she bellowed, activating her temporal hooves. She galloped through the cosmic dust, actively rewriting the stars. Where the comet had passively destroyed galaxies, Dr. Moo actively restored them. By ensuring the subject-verb agreement of the universe was perfectly aligned, she saved the continuum from collapsing into a chaotic jumble of dangling participles, proving that the fabric of time is held together by good punctuation.",
    questions: [
      { id: 85, text: "Based on the passage, what is Dr. Moo’s primary mission in The Milky Way?", options: ["To study black holes and celestial bodies", "To prevent galaxies from colliding passively", "To guard the timeline by fixing grammatical and temporal paradoxes", "To teach other celestial beings how to travel through time"], correct: 2, explanation: "The text states Dr. Moo 'focused on fixing temporal paradoxes caused by misplaced modifiers and incorrect verb forms'." },
      { id: 86, text: "Choose the correct meaning of the word 'penchant' as used in the passage:", options: ["A strong dislike or aversion", "A deep understanding of physics", "A magical ability to travel", "A strong or habitual liking for something"], correct: 3, explanation: "'Penchant' refers to a strong inclination or habitual liking for something—in this case, flawless English grammar." },
      { id: 87, text: "Identify the Figure of Speech (Poetic Device) used in the phrase: \"Make your English legend-dairy with tenses.\"", options: ["Pun", "Simile", "Oxymoron", "Personification"], correct: 0, explanation: "It uses a play on the words 'legendary' and 'dairy' in reference to the cow (Dr. Moo)." },
      { id: 88, text: "According to the passage, what specific grammatical element saved the continuum from collapsing?", options: ["Misplaced modifiers", "Subject-verb agreement", "Future perfect tense", "Dangling participles"], correct: 1, explanation: "The text explicitly says: 'By ensuring the subject-verb agreement of the universe was perfectly aligned, she saved the continuum'." }
    ]
  },
  {
    id: "smart-classrooms",
    title: "The Evolution of Smart Classrooms",
    description: "A factual look at how AI is transforming the pedagogical landscape.",
    content: "The landscape of modern education is undergoing a seismic shift, driven by the advent of artificial intelligence. Traditional classrooms, once reliant entirely on static textbooks, are now embracing dynamic digital ecosystems. Central to this transformation are AI-powered smart test applications designed to assess student learning outcomes with unprecedented accuracy. These intelligent testing platforms adapt to a student's proficiency level in real-time, offering personalized quizzes that identify specific areas of improvement. Furthermore, specialized AI frameworks are being developed to assist teachers in navigating dense literature. For example, micro-analysis apps can quickly break down classic literary texts into easily digestible summaries, character arcs, and thematic explorations. This allows educators to spend less time on basic reading comprehension and more time fostering critical thinking and debate. As these educational technologies evolve, the focus is shifting from rote memorization to active engagement. The ultimate goal is not to replace the educator, but to equip them with highly targeted, efficient tools that make the process of teaching both literature and language more intuitive and engaging for the digital generation.",
    questions: [
      { id: 89, text: "What is the central idea of the passage?", options: ["AI applications will soon replace teachers in the classroom", "Modern education relies entirely on static textbooks and rote memorization", "AI tools are transforming education by providing targeted assessments and assisting teachers with complex texts", "Literature can no longer be taught without the use of micro-analysis apps"], correct: 2, explanation: "The passage discusses how AI tools enhance teaching and assessment rather than replacing the human element." },
      { id: 90, text: "Pick the option that is the Antonym of the word 'dynamic' as used in the passage:", options: ["Energetic", "Static", "Unprecedented", "Intuitive"], correct: 1, explanation: "'Dynamic' means characterized by constant change or progress; 'static' means lacking in movement or change." },
      { id: 91, text: "According to the passage, what is a specific benefit of using micro-analysis apps for literature?", options: ["They eliminate the need for students to read the original texts", "They allow educators to focus more on critical thinking rather than basic comprehension", "They automatically grade student essays with unprecedented accuracy", "They force students to engage in rote memorization of character arcs"], correct: 1, explanation: "The text states these apps allow educators to 'spend less time on basic reading comprehension and more time fostering critical thinking'." },
      { id: 92, text: "Match the words in List I with their appropriate Synonyms in List II (Advent, Proficiency, Dense, Intuitive):", options: ["A-III, B-II, C-I, D-IV", "A-II, B-III, C-I, D-IV", "A-II, B-I, C-III, D-IV", "A-IV, B-III, C-II, D-I"], correct: 1, explanation: "Advent (Arrival), Proficiency (Competence), Dense (Complicated), Intuitive (Instinctive)." }
    ]
  },
  {
    id: "morning-assembly",
    title: "The Echoes of the Morning Assembly",
    description: "A philosophical reflection on the moral and communal value of school assemblies.",
    content: "The morning assembly in a school is far more than a routine administrative gathering; it is the heartbeat of the educational community. When the sun first crests the horizon, casting long shadows across the courtyard, hundreds of voices unite in a collective pause before the chaos of the day begins. A well-crafted assembly script does not merely announce upcoming events; it weaves a narrative of inspiration, often drawing upon the profound lessons hidden within classic literature. Whether reflecting on the quiet resilience of a protagonist facing adversity or the poetic beauty of an untrodden path, the spoken word has the power to set the moral compass for the entire day. The microphone becomes a conduit for empathy, transforming sleepy-eyed students into active participants in a shared cultural experience. It is a fleeting window where stories of triumph, ethical dilemmas, and historical courage are breathed into life. Ultimately, the true magic of the morning assembly lies in its ability to anchor the wandering mind, reminding every student and teacher that they are part of a larger, unfolding story, and that every new dawn is a blank page waiting to be written with purpose.",
    questions: [
      { id: 93, text: "Identify the Figure of Speech used in the expression: \"it is the heartbeat of the educational community\".", options: ["Simile", "Personification", "Metaphor", "Alliteration"], correct: 2, explanation: "The assembly is directly compared to a heartbeat without using 'like' or 'as'." },
      { id: 94, text: "According to the passage, what role does a well-crafted assembly script play?", options: ["It simply lists the timetable for the day's classes", "It weaves an inspiring narrative that sets the day's moral compass", "It ensures students are fully awake by forcing them to participate", "It evaluates the students' understanding of classic literature"], correct: 1, explanation: "The text says it 'weaves a narrative of inspiration' and 'sets the moral compass for the entire day'." },
      { id: 95, text: "The phrase \"every new dawn is a blank page\" implies that:", options: ["Students must write an essay every morning", "The future is unwritten and each day offers a fresh start to act with purpose", "The school lacks printed materials and books", "The morning assembly erases the memories of the previous day"], correct: 1, explanation: "It is a metaphorical way of saying each day is a new beginning with fresh opportunities." },
      { id: 96, text: "Choose the correct synonym for the word 'conduit' as used in the passage:", options: ["Barrier", "Channel", "Obstacle", "Microphone"], correct: 1, explanation: "Contextually, 'conduit' refers to a channel or medium through which something (empathy) is transmitted." }
    ]
  },
  {
    id: "einstein-agony",
    title: "Einstein's Agony",
    description: "The transformation of a scientist into a sage following the atomic bombings.",
    content: "(1) The sage of science, Einstein, was sitting in a depressive and pensive mood one evening. His eyes were brimming with tears. The pain was evident on his face. He peeped out of the window of his room. The sun had set a few minutes back. The sky was filled with a reddish glow. At this sunset, he felt that it was humanity that had sunk into devilish darkness and the reddish glow in the sky was the blood of humanity spilling all over the sky from earth. With tired steps, he walked back to his chair and settled down. It was the 9th of August, 1945. Three days back, he had felt the same agony as if someone had torn him apart. He was deeply hurt and depressed when he heard on the radio that America had dropped an atom bomb on the Japanese city, Hiroshima. Today, within three days, another bomb was dropped on another city, Nagasaki and lakhs of people had been killed.\n(2) He had heard that the blast released so much energy that it had paled all past destructions in comparison and death had played out a pitiable dance of destruction. The flames that broke out of the bomb were burning, melting and exploding buildings. Scared of the heat of the bomb, people had jumped into lakes and rivers, but the water was boiling and the people too were burnt and killed. The animals in the water were already boiled to death. Animals, trees, herbs, fragrant flowering plants were all turned into ashes. The atomic energy destruction had just not stopped there. It had entered the atmosphere there and had spread radiation that would affect people for generations to come and would also bring about destructive irreversible biological change in animals and plants.\n(3) As the news of the atomic attack reached Einstein, and he became aware of the glaring horror of the abuse of atomic energy, his distress and restlessness knew no bounds. He could not control himself and picked up his violin to turn his mind on to other things. While playing the violin, he tried to dissolve his distress in its sad notes, but couldn't. He was burning on the embers of destruction; his heart was filled with an ocean of agony and tears just continued streaming uncontrollably out of his eyes. Night had fallen. His daughter came up and asked him to eat something as he had not taken anything for the last four days. His voice was restrained and he said, \"I don't feel like eating.\"\n(4) He could not sleep that night. Lying down, he was thinking how he had drawn the attention of the then American President Roosevelt towards the destructive powers of an atomic bomb. He had thought that this would be used to scare Hitler and put an end to the barbarism that Hitler was up to. However, Roosevelt kept him in the dark and made false promises. Eventually, he had abused Einstein's equation of E=mc² that resulted in the destructive experiments. His actions had made science and scientists as murderers. Einstein kept on thinking for a long time. Eventually, he slipped into sleep. When he woke up at dawn, there was a new dawn in him too. The atomic threat had transformed his heart.\n(5) The next day, he decided to disassociate himself from the scientific policy of the government and all governmental institutions. He decided to open educational institutions for children, adolescents, and youth-institutions where along with science, spirituality will be compulsorily taught.\n(6) To inaugurate this institution, he had invited two great philosophers, Bertrand Russell and Albert Schweitzer. Ten other great scientists who had won Nobel Prizes in different fields were also invited. They all saw a different Einstein, not a great scientist but a sage in him. The institution was opened by garlanding a photo of Mahatma Gandhi. While garlanding the Mahatma, he became emotional and said with a lump in his throat, 'I bow down to the great man who fought for the Independence of his country through non-violence. He could do so because he was a truthful man and a true spiritualist'.\n(7) Those who teach science should be taught spirituality too. Without harmony between science and spirituality, the destruction would continue unabated. A few years after this institution was built, a Japanese delegation came to meet him. Einstein broke down in the meeting and said, 'You can give me any punishment and I will accept it. Anyway, I have decided to lead my life in penitence'. The Japanese were moved by his sincerity and forgot their grief.",
    questions: [
      { id: 19, text: "Which musical instrument did Einstein play when he was in grief?", options: ["Harmonium", "Guitar", "Violin", "Flute"], correct: 2, explanation: "Paragraph 3 mentions he picked up his 'violin' to divert his mind." },
      { id: 20, text: "How did Einstein learn about the Hiroshima bombing?", options: ["Television", "Newspaper", "Radio", "Telephonic message"], correct: 2, explanation: "Paragraph 1 says he heard on the 'radio' about the bomb dropped on Hiroshima." },
      { id: 21, text: "What did Einstein say to the Japanese delegation?", options: ["You can give me any punishment and I will accept it", "I am not at fault", "What could I do?", "The President didn't agree"], correct: 0, explanation: "Paragraph 7 records his direct quote expressing complete penitence." },
      { id: 22, text: "What did Einstein do to show his displeasure over the attack?", options: ["Open a science lab", "Establish an Educational Institution", "Disassociate from Government Institutions", "Invite philosophers"], correct: 2, explanation: "Paragraph 5 says he decided to 'disassociate himself from the scientific policy of the government'." },
      { id: 23, text: "To what was Einstein's depressive mood compared?", options: ["Sunrise", "Sunset", "Devilish darkness", "Tired steps"], correct: 1, explanation: "The passage opens with him watching the 'sunset', linking his mood to that time." },
      { id: 24, text: "What made Einstein restless and sleepless?", options: ["Hit on America", "Hit on Nagasaki", "Hit on Hiroshima", "Both Nagasaki and Hiroshima"], correct: 3, explanation: "Both bombings (Hiroshima and Nagasaki) caused him extreme agony." },
      { id: 25, text: "Identify the event that led him to play an instrument to divert his mind:", options: ["Getting news of the attack", "Inventing sad notes", "Hitler's barbarism", "False promises"], correct: 0, explanation: "Paragraph 3 says 'As the news of the atomic attack reached Einstein... he picked up his violin'." },
      { id: 26, text: "According to Einstein, what turned scientists into murderers?", options: ["Wrong use of E=mc²", "False promises", "The bombings", "None of these"], correct: 0, explanation: "Paragraph 4 explains Roosevelt abused his equation, which made scientists as murderers." },
      { id: 27, text: "Which philosopher did Einstein invite to his institution?", options: ["Bertrand Russell", "Albert Schweitzer", "Both philosophers", "Neither philosopher"], correct: 2, explanation: "Paragraph 6 mentions both Russell and Schweitzer were invited." },
      { id: 28, text: "Why should science teachers also be taught spirituality?", options: ["Make science easier", "Help make weapons", "Give more power", "Enable science for human welfare"], correct: 3, explanation: "The text suggests spirituality ensures science is used for the welfare of others." }
    ]
  }
]

export default function RCQuizPage() {
  const { toast } = useToast()
  const quizRef = useRef<HTMLDivElement>(null)
  const questionRef = useRef<HTMLDivElement>(null)
  const [selectedPassageId, setSelectedPassageId] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)

  const selectedPassage = RC_PASSAGES.find(p => p.id === selectedPassageId)
  const questions = selectedPassage?.questions || []

  const scrollToTarget = useCallback(() => {
    const target = (currentStep > 0 && questionRef.current) ? questionRef.current : quizRef.current;
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
    if (selectedPassageId && !isFinished) {
      const timer = setTimeout(scrollToTarget, 100)
      return () => clearTimeout(timer)
    }
  }, [currentStep, selectedPassageId, isFinished, scrollToTarget])

  const nextQuestion = useCallback(() => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsFinished(true)
      toast({ title: "Passage Complete!", description: "Check your performance analysis." })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep, questions.length, toast])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && selectedPassageId && !isFinished) {
        const qId = questions[currentStep]?.id
        if (answers[qId] !== undefined) {
          nextQuestion()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [answers, currentStep, questions, isFinished, selectedPassageId, nextQuestion])

  const handleAnswer = (val: number) => {
    if (!selectedPassageId) return
    const qId = questions[currentStep].id
    setAnswers({ ...answers, [qId]: val })
  }

  const isAnswerCorrect = (userAns: number, correctAns: number | number[]) => {
    if (Array.isArray(correctAns)) {
      return correctAns.includes(userAns)
    }
    return userAns === correctAns
  }

  const calculateScore = () => {
    let correct = 0
    let wrong = 0
    questions.forEach(q => {
      const ans = answers[q.id]
      if (ans === undefined) return
      if (isAnswerCorrect(ans, q.correct)) correct++
      else wrong++
    })
    return { correct, wrong, total: correct * 5 - wrong * 1 }
  }

  if (!selectedPassageId) {
    return (
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 text-center animate-fade-in-up">
            <Badge variant="outline" className="mb-4 py-1 px-4 border-primary/40 text-primary font-bold uppercase tracking-widest">
              Section 2: RC Selection
            </Badge>
            <h1 className="text-4xl font-headline font-bold mb-4">Reading Comprehension Mastery</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select a passage to begin your focused practice. Each set follows official CUET marking protocols.
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {RC_PASSAGES.map((p) => (
              <Card 
                key={p.id} 
                className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2rem] bg-white/70 backdrop-blur-sm cursor-pointer overflow-hidden flex flex-col"
                onClick={() => setSelectedPassageId(p.id)}
              >
                <CardHeader className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="rounded-full font-bold">{p.questions.length} Qs</Badge>
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{p.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-2">{p.description}</CardDescription>
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
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="text-center p-8 border-none shadow-2xl rounded-[3rem] bg-white">
            <div className="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline mb-2">{selectedPassage.title} Results</CardTitle>
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
            <div className="p-6 bg-foreground text-background rounded-[1.5rem] mb-8">
              <div className="text-sm opacity-70">Passage Total</div>
              <div className="text-4xl font-bold">{total} / {questions.length * 5}</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="flex-1 rounded-xl h-12 font-bold" onClick={() => {
                setIsFinished(false)
                setCurrentStep(0)
                setAnswers({})
              }}>
                <RefreshCw className="w-4 h-4 mr-2" /> Retake Passage
              </Button>
              <Button variant="outline" size="lg" className="flex-1 rounded-xl h-12" onClick={() => {
                setSelectedPassageId(null)
                setIsFinished(false)
                setAnswers({})
                setCurrentStep(0)
              }}>
                Pick Another Passage
              </Button>
            </div>
          </Card>

          <section className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2 px-2 text-foreground">
              <Info className="w-5 h-5 text-primary" />
              Strategic Review
            </h3>
            {questions.map((q, idx) => {
              const userAns = answers[q.id]
              const isCorrect = isAnswerCorrect(userAns, q.correct)
              return (
                <Card key={idx} className="border-none shadow-md overflow-hidden rounded-[2rem] bg-white">
                  <div className={cn("px-6 py-3 flex items-center justify-between", isCorrect ? "bg-green-50" : "bg-red-50")}>
                    <Badge variant={isCorrect ? "default" : "destructive"} className="font-bold">
                      {isCorrect ? "CORRECT (+5)" : "ERROR (-1)"}
                    </Badge>
                  </div>
                  <CardContent className="p-8 space-y-4">
                    <p className="font-bold text-lg text-foreground">{q.text}</p>
                    <div className="grid gap-2 text-sm">
                      <div className={cn("p-4 rounded-xl flex items-center gap-2 border", isCorrect ? "bg-green-100/30 border-green-200" : "bg-red-100/30 border-red-200")}>
                        {isCorrect ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                        <span><strong className="text-foreground">Your selection:</strong> {userAns !== undefined ? q.options[userAns] : "Skipped"}</span>
                      </div>
                      {!isCorrect && (
                        <div className="p-4 rounded-xl flex items-center gap-2 border bg-green-100/30 border-green-200">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span>
                            <strong className="text-foreground">{Array.isArray(q.correct) ? "Valid Options: " : "Correct Option: "}</strong>
                            {Array.isArray(q.correct)
                              ? q.correct.map(i => q.options[i]).join(" OR ")
                              : q.options[q.correct as number]
                            }
                          </span>
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
    <div className="min-h-screen bg-background pb-20">
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex items-center justify-between mb-8" ref={quizRef}>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setSelectedPassageId(null)} className="rounded-full">
              <ChevronLeft className="w-4 h-4 mr-1" /> All Passages
            </Button>
            <div>
              <h1 className="text-xl font-headline font-bold text-primary">{selectedPassage.title}</h1>
              <p className="text-muted-foreground font-mono text-xs">Item {currentStep + 1} / {questions.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full text-[10px] font-bold text-muted-foreground">
              <Keyboard className="w-3 h-3" />
              PRESS ENTER
            </div>
            <Badge variant="outline" className="h-8 px-4 rounded-full border-primary/20 text-primary font-bold">Code 101</Badge>
          </div>
        </div>

        <Progress value={(currentStep / questions.length) * 100} className="mb-12 h-2" />

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Card className="border-none shadow-sm bg-white/70 backdrop-blur-sm p-8 rounded-[2.5rem]">
            <div className="flex items-center gap-2 mb-6 text-primary font-bold text-xs tracking-widest uppercase">
              < BookOpen className="w-4 h-4" /> READING PASSAGE
            </div>
            <div className="text-foreground leading-relaxed italic text-lg space-y-4">
              {selectedPassage.content.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Card>

          <div className="space-y-6" ref={questionRef}>
            <Card className="border-none shadow-xl rounded-[2.5rem] bg-white">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-xl leading-snug font-bold text-foreground">{q.text}</CardTitle>
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
              <Button variant="ghost" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="rounded-xl font-bold">
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              <Button size="lg" className="px-12 h-14 text-lg font-bold rounded-2xl shadow-xl group" onClick={nextQuestion} disabled={answers[q.id] === undefined}>
                {currentStep === questions.length - 1 ? "Submit Set" : "Next Question"} <Target className="w-5 h-5 ml-3 group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
