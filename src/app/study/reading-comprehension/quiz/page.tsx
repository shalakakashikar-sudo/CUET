
"use client"

import { useState, useEffect, useCallback } from "react"
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
  // Passage 1
  {
    id: 1,
    passage: "It's essential to focus on what you control, especially when life feels difficult. This mindset is often overshadowed by the flood of information we consume daily. For instance, I spent 30 minutes this morning going down a rabbit hole after reading about Bitcoin. I ended up lost in unrelated Wikipedia pages. Stoicism teaches us that time is our most valuable resource. While it's nice to know many things, most of the information we consume has little real value. We waste time on trivial pursuits, like reading negative news, stalking social media profiles, or watching shows just to \"kill time.\" Why kill something so precious? We're quick to get upset by things we can't control. Responding to every little thing we encounter is a habit. But true happiness comes from accepting that we don't control most things. Worrying about global issues like recessions, wars, or natural disasters is unproductive. Indifference to things outside our control is the key to happiness. Happiness comes from meaningful activities: good friendships, enjoyable work, reading thought-provoking books, walking in nature, working out, or watching a great movie. For example, a recent Saturday was fulfilling because I spent time reading, writing, walking, and enjoying meals with family. Contrast that with another day when I got caught up in negative conversations about COVID. The negativity drained me, and I accomplished nothing useful. Things are the way they are. The best we can do is focus on what matters and how we spend our time.",
    question: "1. Select the activity that contributes to happiness from the options given below:",
    options: ["(1) Watching random TV shows", "(2) Arguing on social media", "(3) Reading thought-provoking books", "(4) Browsing the internet for news"],
    correct: 2,
    explanation: "The passage explicitly lists 'reading thought-provoking books' as a meaningful activity that leads to happiness, contrasting it with trivial pursuits like 'watching shows just to kill time'."
  },
  {
    id: 2,
    passage: "It's essential to focus on what you control, especially when life feels difficult. This mindset is often overshadowed by the flood of information we consume daily. For instance, I spent 30 minutes this morning going down a rabbit hole after reading about Bitcoin. I ended up lost in unrelated Wikipedia pages. Stoicism teaches us that time is our most valuable resource. While it's nice to know many things, most of the information we consume has little real value. We waste time on trivial pursuits, like reading negative news, stalking social media profiles, or watching shows just to \"kill time.\" Why kill something so precious? We're quick to get upset by things we can't control. Responding to every little thing we encounter is a habit. But true happiness comes from accepting that we don't control most things. Worrying about global issues like recessions, wars, or natural disasters is unproductive. Indifference to things outside our control is the key to happiness. Happiness comes from meaningful activities: good friendships, enjoyable work, reading thought-provoking books, walking in nature, working out, or watching a great movie. For example, a recent Saturday was fulfilling because I spent time reading, writing, walking, and enjoying meals with family. Contrast that with another day when I got caught up in negative conversations about COVID. The negativity drained me, and I accomplished nothing useful. Things are the way they are. The best we can do is focus on what matters and how we spend our time.",
    question: "2. Select the central idea of the passage from the options given below:",
    options: ["Consuming more information leads to happiness.", "Responding to global issues is essential.", "Happiness comes from following current events.", "Time is a valuable resource we should use it wisely."],
    correct: 3,
    explanation: "The core message is that our time is precious and happiness depends on focusing on what we control and spending time wisely on meaningful activities."
  },
  {
    id: 3,
    passage: "It's essential to focus on what you control, especially when life feels difficult. This mindset is often overshadowed by the flood of information we consume daily. For instance, I spent 30 minutes this morning going down a rabbit hole after reading about Bitcoin. I ended up lost in unrelated Wikipedia pages. Stoicism teaches us that time is our most valuable resource. While it's nice to know many things, most of the information we consume has little real value. We waste time on trivial pursuits, like reading negative news, stalking social media profiles, or watching shows just to \"kill time.\" Why kill something so precious? We're quick to get upset by things we can't control. Responding to every little thing we encounter is a habit. But true happiness comes from accepting that we don't control most things. Worrying about global issues like recessions, wars, or natural disasters is unproductive. Indifference to things outside our control is the key to happiness. Happiness comes from meaningful activities: good friendships, enjoyable work, reading thought-provoking books, walking in nature, working out, or watching a great movie. For example, a recent Saturday was fulfilling because I spent time reading, writing, walking, and enjoying meals with family. Contrast that with another day when I got caught up in negative conversations about COVID. The negativity drained me, and I accomplished nothing useful. Things are the way they are. The best we can do is focus on what matters and how we spend our time.",
    question: "3. Choose the best option to complete the sentence: Practicing indifference to uncontrollable things helps to achieve",
    options: ["(1) Better focus on global events", "(2) Fulfilling and lasting happiness", "(3) Improved emotional reactivity", "(4) A deeper knowledge of issues"],
    correct: 1,
    explanation: "The author states: 'Indifference to things outside our control is the key to happiness.' This leads to fulfilling and lasting happiness rather than reactive misery."
  },
  {
    id: 4,
    passage: "It's essential to focus on what you control, especially when life feels difficult. This mindset is often overshadowed by the flood of information we consume daily. For instance, I spent 30 minutes this morning going down a rabbit hole after reading about Bitcoin. I ended up lost in unrelated Wikipedia pages. Stoicism teaches us that time is our most valuable resource. While it's nice to know many things, most of the information we consume has little real value. We waste time on trivial pursuits, like reading negative news, stalking social media profiles, or watching shows just to \"kill time.\" Why kill something so precious? We're quick to get upset by things we can't control. Responding to every little thing we encounter is a habit. But true happiness comes from accepting that we don't control most things. Worrying about global issues like recessions, wars, or natural disasters is unproductive. Indifference to things outside our control is the key to happiness. Happiness comes from meaningful activities: good friendships, enjoyable work, reading thought-provoking books, walking in nature, working out, or watching a great movie. For example, a recent Saturday was fulfilling because I spent time reading, writing, walking, and enjoying meals with family. Contrast that with another day when I got caught up in negative conversations about COVID. The negativity drained me, and I accomplished nothing useful. Things are the way they are. The best we can do is focus on what matters and how we spend our time.",
    question: "4. Choose an example of wasting time based on the passage from the options given below:",
    options: ["(1) Scrolling social media profiles", "(2) Walking in nature", "(3) Spending time with family", "(4) Writing and reflecting"],
    correct: 0,
    explanation: "The text identifies 'stalking social media profiles' as a trivial pursuit that wastes our most valuable resource: time."
  },
  // Passage 2
  {
    id: 5,
    passage: "In the ancient city of Varanasi, Arjun found his world transformed one monsoon afternoon. Born into a family of hardworking labourers, he was expected to follow in his father's footsteps. Yet, Arjun harboured an unspoken passion for art that no one knew about. As dark clouds gathered and the first raindrops fell, he wandered through the narrow lanes of the old city, seeking solace from the predictable rhythms of life. That day, as he took refuge under a vibrant awning in a bustling market, Arjun encountered an old painter named Raghav. With paint-splattered hands and eyes that shimmered with decades of experience, Raghav noticed the spark in Arjun's eyes. He invited Arjun into his humble studio, where canvases whispered stories of love, loss, and hope. Inspired by Raghav's gentle mentorship, Arjun discovered his own unique style, blending tradition with innovation. Over time, his artwork became a mirror reflecting the emotions of the city, and his reputation grew. Arjun's journey from a reluctant son to an emerging artist was not without hardship. Yet, every challenge became a brushstroke in the masterpiece of his life. Eventually, his creations graced galleries beyond Varanasi, uniting cultures and hearts. In every piece, Arjun celebrated the resilience of the human spirit, proving that passion and perseverance can transform even the most ordinary life into a vibrant work of art. His journey, filled with unexpected lessons and creative breakthroughs, taught him that every struggle offered a chance to begin anew, inspiring his art with hope and transformation.",
    question: "5. Determine the primary theme illustrated in the passage:",
    options: ["(1) The preventable hardships for those who choose artistic paths.", "(2) Conflicts between urban modernity and ancient traditions.", "(3) The fleeting beauty of monsoon afternoons encouraging passion.", "(4) The transformative influence of mentorship and following one's passion."],
    correct: 3,
    explanation: "The story focuses on how Arjun's encounter with Raghav (mentorship) and his dedication to his unspoken passion transformed his life despite being born into a different expected path."
  },
  {
    id: 6,
    passage: "In the ancient city of Varanasi, Arjun found his world transformed one monsoon afternoon. Born into a family of hardworking labourers, he was expected to follow in his father's footsteps. Yet, Arjun harboured an unspoken passion for art that no one knew about. As dark clouds gathered and the first raindrops fell, he wandered through the narrow lanes of the old city, seeking solace from the predictable rhythms of life. That day, as he took refuge under a vibrant awning in a bustling market, Arjun encountered an old painter named Raghav. With paint-splattered hands and eyes that shimmered with decades of experience, Raghav noticed the spark in Arjun's eyes. He invited Arjun into his humble studio, where canvases whispered stories of love, loss, and hope. Inspired by Raghav's gentle mentorship, Arjun discovered his own unique style, blending tradition with innovation. Over time, his artwork became a mirror reflecting the emotions of the city, and his reputation grew. Arjun's journey from a reluctant son to an emerging artist was not without hardship. Yet, every challenge became a brushstroke in the masterpiece of his life. Eventually, his creations graced galleries beyond Varanasi, uniting cultures and hearts. In every piece, Arjun celebrated the resilience of the human spirit, proving that passion and perseverance can transform even the most ordinary life into a vibrant work of art. His journey, filled with unexpected lessons and creative breakthroughs, taught him that every struggle offered a chance to begin anew, inspiring his art with hope and transformation.",
    question: "6. Evaluate the impact of Arjun's artwork as described in the passage:",
    options: ["(1) His art remained confined within the narrow lanes of Varanasi.", "(2) His work was mostly criticised and led to isolation.", "(3) His creations resonated deeply, uniting diverse cultures.", "(4) His art was solely a personal hobby that never gained public attention."],
    correct: 2,
    explanation: "The text states: 'Eventually, his creations graced galleries beyond Varanasi, uniting cultures and hearts.' This confirms a deep, broad impact."
  },
  {
    id: 7,
    passage: "In the ancient city of Varanasi, Arjun found his world transformed one monsoon afternoon. Born into a family of hardworking labourers, he was expected to follow in his father's footsteps. Yet, Arjun harboured an unspoken passion for art that no one knew about. As dark clouds gathered and the first raindrops fell, he wandered through the narrow lanes of the old city, seeking solace from the predictable rhythms of life. That day, as he took refuge under a vibrant awning in a bustling market, Arjun encountered an old painter named Raghav. With paint-splattered hands and eyes that shimmered with decades of experience, Raghav noticed the spark in Arjun's eyes. He invited Arjun into his humble studio, where canvases whispered stories of love, loss, and hope. Inspired by Raghav's gentle mentorship, Arjun discovered his own unique style, blending tradition with innovation. Over time, his artwork became a mirror reflecting the emotions of the city, and his reputation grew. Arjun's journey from a reluctant son to an emerging artist was not without hardship. Yet, every challenge became a brushstroke in the masterpiece of his life. Eventually, his creations graced galleries beyond Varanasi, uniting cultures and hearts. In every piece, Arjun celebrated the resilience of the human spirit, proving that passion and perseverance can transform even the most ordinary life into a vibrant work of art. His journey, filled with unexpected lessons and creative breakthroughs, taught him that every struggle offered a chance to begin anew, inspiring his art with hope and transformation.",
    question: "7. Deduce the message the author conveys about overcoming obstacles:",
    options: ["(1) Struggles are insurmountable barriers.", "(2) Every challenge offers an opportunity to grow and transform.", "(3) Only those with privileged backgrounds can successfully overcome obstacles.", "(4) Obstacles invariably lead to failure."],
    correct: 1,
    explanation: "Arjun's journey proves that 'every challenge became a brushstroke in the masterpiece of his life,' signifying growth through adversity."
  },
  {
    id: 8,
    passage: "In the ancient city of Varanasi, Arjun found his world transformed one monsoon afternoon. Born into a family of hardworking labourers, he was expected to follow in his father's footsteps. Yet, Arjun harboured an unspoken passion for art that no one knew about. As dark clouds gathered and the first raindrops fell, he wandered through the narrow lanes of the old city, seeking solace from the predictable rhythms of life. That day, as he took refuge under a vibrant awning in a bustling market, Arjun encountered an old painter named Raghav. With paint-splattered hands and eyes that shimmered with decades of experience, Raghav noticed the spark in Arjun's eyes. He invited Arjun into his humble studio, where canvases whispered stories of love, loss, and hope. Inspired by Raghav's gentle mentorship, Arjun discovered his own unique style, blending tradition with innovation. Over time, his artwork became a mirror reflecting the emotions of the city, and his reputation grew. Arjun's journey from a reluctant son to an emerging artist was not without hardship. Yet, every challenge became a brushstroke in the masterpiece of his life. Eventually, his creations graced galleries beyond Varanasi, uniting cultures and hearts. In every piece, Arjun celebrated the resilience of the human spirit, proving that passion and perseverance can transform even the most ordinary life into a vibrant work of art. His journey, filled with unexpected lessons and creative breakthroughs, taught him that every struggle offered a chance to begin anew, inspiring his art with hope and transformation.",
    question: "8. Interpret the change in Arjun's outlook on life throughout the passage:",
    options: ["(1) He learned to view every hardship as an essential brushstroke.", "(2) He became indifferent to challenges and avoided obstacles.", "(3) He rejected the idea of change and adhered to old beliefs.", "(4) He focused solely on attaining commercial success."],
    correct: 0,
    explanation: "The passage notes that 'every challenge became a brushstroke in the masterpiece of his life,' showing a positive and constructive outlook change."
  },
  // Passage 3
  {
    id: 9,
    passage: "India is renowned for its rich and diverse heritage of handicrafts, which reflect the country's deep cultural roots and artistic traditions. Each region in India has its own distinct craft, passed down through generations of artisans. These handicrafts showcase the intricate artistry, creativity, and skills of Indian craftsmen. In Kashmir, the famous Pashmina shawls and carpets are known for their delicate embroidery and luxurious feel. Rajasthan is a treasure trove of vibrant handicrafts, including its famous tie-and-dye fabrics, exquisite jewellery, and intricate meenakari work. Andhra Pradesh is recognised for its Bidriware, a form of metalwork, and the beautiful Pochampally sarees, which are known for their traditional ikat patterns. In Tamil Nadu, the intricate bronze sculptures and the traditional Kanjeevaram sarees are highly prized. Mysore is famous for its silk weaving and sandalwood products, while Kerala is known for its elegant ivory carvings and rosewood furniture. The terracotta figurines of Bankura, the delicate Chikan work from Lucknow, and the rich brocade and silk sarees from Banaras are a testament to India's diversity in craftsmanship. These handicrafts not only contribute to India's cultural heritage but also provide employment to millions of artisans across the country. Over the years, these traditional crafts have evolved while preserving their authenticity, creating a legacy of artistic excellence. Indian handicrafts are a testament to the timeless creativity and skill of the artisans who continue to keep these traditions alive for generations to come.",
    question: "9. Which of the following is NOT mentioned as a famous handicraft from Rajasthan?",
    options: ["(1) Tie-and-dye fabrics", "(2) Pashmina shawls", "(3) Stone studded Jewellery", "(4) Meenakari work"],
    correct: 1,
    explanation: "The passage specifically mentions Pashmina shawls as being from Kashmir, not Rajasthan."
  },
  {
    id: 10,
    passage: "India is renowned for its rich and diverse heritage of handicrafts, which reflect the country's deep cultural roots and artistic traditions. Each region in India has its own distinct craft, passed down through generations of artisans. These handicrafts showcase the intricate artistry, creativity, and skills of Indian craftsmen. In Kashmir, the famous Pashmina shawls and carpets are known for their delicate embroidery and luxurious feel. Rajasthan is a treasure trove of vibrant handicrafts, including its famous tie-and-dye fabrics, exquisite jewellery, and intricate meenakari work. Andhra Pradesh is recognised for its Bidriware, a form of metalwork, and the beautiful Pochampally sarees, which are known for their traditional ikat patterns. In Tamil Nadu, the intricate bronze sculptures and the traditional Kanjeevaram sarees are highly prized. Mysore is famous for its silk weaving and sandalwood products, while Kerala is known for its elegant ivory carvings and rosewood furniture. The terracotta figurines of Bankura, the delicate Chikan work from Lucknow, and the rich brocade and silk sarees from Banaras are a testament to India's diversity in craftsmanship. These handicrafts not only contribute to India's cultural heritage but also provide employment to millions of artisans across the country. Over the years, these traditional crafts have evolved while preserving their authenticity, creating a legacy of artistic excellence. Indian handicrafts are a testament to the timeless creativity and skill of the artisans who continue to keep these traditions alive for generations to come.",
    question: "10. The traditional ikat patterns are found in ___ sarees from Andhra Pradesh.",
    options: ["(1) Mysore", "(2) Kanjeevaram", "(3) Pochampally", "(4) Banaras"],
    correct: 2,
    explanation: "The passage states: 'Andhra Pradesh is recognised for ... the beautiful Pochampally sarees, which are known for their traditional ikat patterns'."
  },
  {
    id: 11,
    passage: "India is renowned for its rich and diverse heritage of handicrafts, which reflect the country's deep cultural roots and artistic traditions. Each region in India has its own distinct craft, passed down through generations of artisans. These handicrafts showcase the intricate artistry, creativity, and skills of Indian craftsmen. In Kashmir, the famous Pashmina shawls and carpets are known for their delicate embroidery and luxurious feel. Rajasthan is a treasure trove of vibrant handicrafts, including its famous tie-and-dye fabrics, exquisite jewellery, and intricate meenakari work. Andhra Pradesh is recognised for its Bidriware, a form of metalwork, and the beautiful Pochampally sarees, which are known for their traditional ikat patterns. In Tamil Nadu, the intricate bronze sculptures and the traditional Kanjeevaram sarees are highly prized. Mysore is famous for its silk weaving and sandalwood products, while Kerala is known for its elegant ivory carvings and rosewood furniture. The terracotta figurines of Bankura, the delicate Chikan work from Lucknow, and the rich brocade and silk sarees from Banaras are a testament to India's diversity in craftsmanship. These handicrafts not only contribute to India's cultural heritage but also provide employment to millions of artisans across the country. Over the years, these traditional crafts have evolved while preserving their authenticity, creating a legacy of artistic excellence. Indian handicrafts are a testament to the timeless creativity and skill of the artisans who continue to keep these traditions alive for generations to come.",
    question: "11. According to the passage, what has helped preserve Indian handicrafts over the years?",
    options: ["(1) Government support", "(2) Modern technologies", "(3) International demand", "(4) Generational knowledge passed down by artisans"],
    correct: 3,
    explanation: "The passage mentions that these distinct crafts are 'passed down through generations of artisans,' preserving their authenticity."
  },
  {
    id: 12,
    passage: "India is renowned for its rich and diverse heritage of handicrafts, which reflect the country's deep cultural roots and artistic traditions. Each region in India has its own distinct craft, passed down through generations of artisans. These handicrafts showcase the intricate artistry, creativity, and skills of Indian craftsmen. In Kashmir, the famous Pashmina shawls and carpets are known for their delicate embroidery and luxurious feel. Rajasthan is a treasure trove of vibrant handicrafts, including its famous tie-and-dye fabrics, exquisite jewellery, and intricate meenakari work. Andhra Pradesh is recognised for its Bidriware, a form of metalwork, and the beautiful Pochampally sarees, which are known for their traditional ikat patterns. In Tamil Nadu, the intricate bronze sculptures and the traditional Kanjeevaram sarees are highly prized. Mysore is famous for its silk weaving and sandalwood products, while Kerala is known for its elegant ivory carvings and rosewood furniture. The terracotta figurines of Bankura, the delicate Chikan work from Lucknow, and the rich brocade and silk sarees from Banaras are a testament to India's diversity in craftsmanship. These handicrafts not only contribute to India's cultural heritage but also provide employment to millions of artisans across the country. Over the years, these traditional crafts have evolved while preserving their authenticity, creating a legacy of artistic excellence. Indian handicrafts are a testament to the timeless creativity and skill of the artisans who continue to keep these traditions alive for generations to come.",
    question: "12. What does the passage primarily highlight?",
    options: ["(1) The economic impact of our handicrafts.", "(2) The diversity and richness of Indian handicrafts.", "(3) The use of handicrafts in the daily lives of Indians.", "(4) The role of Indian handicrafts in modern design."],
    correct: 1,
    explanation: "The passage's primary focus is describing the various crafts across different states, highlighting 'India's diversity in craftsmanship'."
  }
]

export default function RCQuizPage() {
  const { toast } = useToast()
  const [questions, setQuestions] = useState(RC_QUIZ_DATA)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    // We don't randomize RC because questions are tied to specific passages in a sequence
    setQuestions(RC_QUIZ_DATA)
  }, [])

  const nextQuestion = useCallback(() => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setIsFinished(true)
      toast({ title: "RC Set Complete!", description: "Check your +5/-1 accuracy." })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep, questions.length, toast])

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

  const handleAnswer = (val: string) => {
    setAnswers({ ...answers, [questions[currentStep].id]: parseInt(val) })
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
        <div className="max-w-3xl mx-auto space-y-8">
          <Card className="text-center p-8 border-none shadow-2xl rounded-[2rem] bg-white">
            <div className="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline mb-2">RC Excellence Score</CardTitle>
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
              <div className="text-sm opacity-70">Total Section Marks</div>
              <div className="text-4xl font-bold">{total} / {questions.length * 5}</div>
            </div>
            <div className="flex flex-col gap-3">
              <Button size="lg" className="rounded-xl h-12 font-bold" onClick={() => window.location.reload()}>
                <RefreshCw className="w-4 h-4 mr-2" /> Retake quiz
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl h-12" asChild>
                <Link href="/study/reading-comprehension">Back to Material</Link>
              </Button>
            </div>
          </Card>

          <section className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2 px-2">
              <Info className="w-5 h-5 text-primary" />
              Detailed Item Analysis
            </h3>
            {questions.map((q, idx) => {
              const userAns = answers[q.id]
              const isCorrect = userAns === q.correct
              return (
                <Card key={idx} className="border-none shadow-md overflow-hidden rounded-[2rem] bg-white">
                  <div className={cn("px-6 py-3 flex items-center justify-between", isCorrect ? "bg-green-50" : "bg-red-50")}>
                    <Badge variant={isCorrect ? "default" : "destructive"}>
                      {isCorrect ? "Correct" : "Error"}
                    </Badge>
                  </div>
                  <CardContent className="p-8 space-y-4">
                    <div className="bg-muted/30 p-4 rounded-xl text-sm italic border-l-4 border-primary max-h-32 overflow-y-auto">
                      {q.passage}
                    </div>
                    <p className="font-bold text-lg">{q.question}</p>
                    <div className="grid gap-2 text-sm">
                      <div className={cn("p-4 rounded-xl flex items-center gap-2 border", isCorrect ? "bg-green-100/30 border-green-200" : "bg-red-100/30 border-red-200")}>
                        {isCorrect ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                        <span><strong className="text-foreground">Your answer:</strong> {userAns !== undefined ? q.options[userAns] : "Not Attempted"}</span>
                      </div>
                      {!isCorrect && (
                        <div className="p-4 rounded-xl flex items-center gap-2 border bg-green-100/30 border-green-200">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span><strong className="text-foreground">Correct answer:</strong> {q.options[q.correct]}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground pt-4 border-t border-dashed">
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

  const q = questions[currentStep]

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-headline font-bold uppercase tracking-tight text-primary">RC Practice</h1>
            <p className="text-muted-foreground font-mono text-sm">Passage {currentStep + 1} of {questions.length}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full text-[10px] font-bold text-muted-foreground">
              <Keyboard className="w-3 h-3" />
              PRESS ENTER TO PROCEED
            </div>
            <Badge variant="outline" className="h-8 px-4 rounded-full border-primary/20 text-primary">Subject Code 101</Badge>
          </div>
        </div>

        <Progress value={(currentStep / questions.length) * 100} className="mb-12 h-2" />

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Card className="border-none shadow-sm bg-white/70 backdrop-blur-sm p-8 rounded-[2.5rem]">
            <div className="flex items-center gap-2 mb-6 text-primary font-bold text-sm tracking-widest uppercase">
              <BookOpen className="w-4 h-4" /> COMPLETE PASSAGE TEXT
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
                <CardTitle className="text-xl leading-snug font-bold">{q.question}</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-4">
                <RadioGroup onValueChange={handleAnswer} value={answers[q.id]?.toString()} className="grid gap-3">
                  {q.options.map((opt, i) => {
                    const isSelected = answers[q.id] === i
                    return (
                      <div 
                        key={i} 
                        onClick={() => handleAnswer(i.toString())}
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
                          onClick={(e) => e.stopPropagation()} // Prevent double trigger
                        >
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
                {currentStep === questions.length - 1 ? "Finish Set" : "Next Passage"} <Target className="w-5 h-5 ml-3 group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
