
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
import Link from "next/link"
import { cn } from "@/lib/utils"

type Question = {
  id: number
  text: string
  options: string[]
  correct: number
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
    id: "stoicism",
    title: "Stoicism & Time Management",
    description: "Master the logic of time as a non-renewable resource.",
    content: "It's essential to focus on what you control, especially when life feels difficult. This mindset is often overshadowed by the flood of information we consume daily. For instance, I spent 30 minutes this morning going down a rabbit hole after reading about Bitcoin. I ended up lost in unrelated Wikipedia pages. Stoicism teaches us that time is our most valuable resource. While it's nice to know many things, most of the information we consume has little real value. We waste time on trivial pursuits, like reading negative news, stalking social media profiles, or watching shows just to \"kill time.\" Why kill something so precious? We're quick to get upset by things we can't control. Responding to every little thing we encounter is a habit. But true happiness comes from accepting that we don't control most things. Worrying about global issues like recessions, wars, or natural disasters is unproductive. Indifference to things outside our control is the key to happiness. Happiness comes from meaningful activities: good friendships, enjoyable work, reading thought-provoking books, walking in nature, working out, or watching a great movie. For example, a recent Saturday was fulfilling because I spent time reading, writing, walking, and enjoying meals with family. Contrast that with another day when I got caught up in negative conversations about COVID. The negativity drained me, and I accomplished nothing useful. Things are the way they are. The best we can do is focus on what matters and how we spend our time.",
    questions: [
      { id: 1, text: "Select the activity that contributes to happiness from the options given below:", options: ["Watching random TV shows", "Arguing on social media", "Reading thought-provoking books", "Browsing the internet for news"], correct: 2, explanation: "The passage explicitly lists 'reading thought-provoking books' as a meaningful activity." },
      { id: 2, text: "Select the central idea of the passage from the options given below:", options: ["Consuming more information leads to happiness.", "Responding to global issues is essential.", "Happiness comes from following current events.", "Time is a valuable resource we should use it wisely."], correct: 3, explanation: "The core message is wise time management and focus on controllable factors." },
      { id: 3, text: "Choose the best option to complete the sentence: Practicing indifference to uncontrollable things helps to achieve", options: ["Better focus on global events", "Fulfilling and lasting happiness", "Improved emotional reactivity", "A deeper knowledge of issues"], correct: 1, explanation: "Indifference to external factors is described as the key to happiness." },
      { id: 4, text: "Choose an example of wasting time based on the passage from the options given below:", options: ["Scrolling social media profiles", "Walking in nature", "Spending time with family", "Writing and reflecting"], correct: 0, explanation: "Stalking social media profiles is explicitly labeled as a trivial pursuit that wastes time." }
    ]
  },
  {
    id: "arjun",
    title: "Arjun the Artist",
    description: "A narrative on mentorship and artistic perseverance in Varanasi.",
    content: "In the ancient city of Varanasi, Arjun found his world transformed one monsoon afternoon. Born into a family of hardworking labourers, he was expected to follow in his father's footsteps. Yet, Arjun harboured an unspoken passion for art that no one knew about. As dark clouds gathered and the first raindrops fell, he wandered through the narrow lanes of the old city, seeking solace from the predictable rhythms of life. That day, as he took refuge under a vibrant awning in a bustling market, Arjun encountered an old painter named Raghav. With paint-splattered hands and eyes that shimmered with decades of experience, Raghav noticed the spark in Arjun's eyes. He invited Arjun into his humble studio, where canvases whispered stories of love, loss, and hope. Inspired by Raghav's gentle mentorship, Arjun discovered his own unique style, blending tradition with innovation. Over time, his artwork became a mirror reflecting the emotions of the city, and his reputation grew. Arjun's journey from a reluctant son to an emerging artist was not without hardship. Yet, every challenge became a brushstroke in the masterpiece of his life. Eventually, his creations graced galleries beyond Varanasi, uniting cultures and hearts. In every piece, Arjun celebrated the resilience of the human spirit, proving that passion and perseverance can transform even the most ordinary life into a vibrant work of art.",
    questions: [
      { id: 5, text: "Determine the primary theme illustrated in the passage:", options: ["Preventable hardships for artists", "Conflicts between urban modernity and tradition", "The beauty of monsoon afternoons", "Transformative influence of mentorship and passion"], correct: 3, explanation: "The focus is on how Raghav's guidance helped Arjun overcome adversity and find his voice." },
      { id: 6, text: "Evaluate the impact of Arjun's artwork as described in the passage:", options: ["Remained confined to narrow lanes", "Mostly criticised and led to isolation", "Resonated deeply, uniting diverse cultures", "Remained a satisfying personal hobby"], correct: 2, explanation: "The passage notes his creations graced galleries beyond Varanasi, uniting cultures." },
      { id: 7, text: "Deduce the message the author conveys about overcoming obstacles:", options: ["Struggles are insurmountable barriers", "Every challenge offers an opportunity to grow", "Only privileged backgrounds succeed", "Obstacles invariably lead to failure"], correct: 1, explanation: "Every challenge is described as a 'brushstroke in the masterpiece of his life'." },
      { id: 8, text: "Interpret the change in Arjun's outlook on life throughout the passage:", options: ["Viewed hardship as an essential brushstroke", "Became indifferent to challenges", "Rejected the idea of change", "Focused solely on commercial success"], correct: 0, explanation: "Arjun learned to see struggles as necessary parts of his journey." }
    ]
  },
  {
    id: "handicrafts",
    title: "Indian Handicrafts",
    description: "A survey of India's diverse and rich artistic heritage.",
    content: "India is renowned for its rich and diverse heritage of handicrafts, which reflect the country's deep cultural roots and artistic traditions. Each region in India has its own distinct craft, passed down through generations of artisans. In Kashmir, the famous Pashmina shawls and carpets are known for their delicate embroidery. Rajasthan is a treasure trove of vibrant handicrafts, including tie-and-dye fabrics, exquisite jewellery, and meenakari work. Andhra Pradesh is recognised for its Bidriware and Pochampally sarees, known for traditional ikat patterns. Tamil Nadu is prized for bronze sculptures and Kanjeevaram sarees. Mysore is famous for silk weaving and sandalwood products, while Kerala is known for ivory carvings and rosewood furniture. The terracotta figurines of Bankura, Chikan work from Lucknow, and silk sarees from Banaras are a testament to India's diversity. These handicrafts provide employment to millions of artisans. Indian handicrafts are a testament to the timeless creativity and skill of the artisans who continue to keep these traditions alive.",
    questions: [
      { id: 9, text: "Which of the following is NOT mentioned as a famous handicraft from Rajasthan?", options: ["Tie-and-dye fabrics", "Pashmina shawls", "Stone studded Jewellery", "Meenakari work"], correct: 1, explanation: "Pashmina shawls are specifically attributed to Kashmir in the passage." },
      { id: 10, text: "The traditional ikat patterns are found in ___ sarees from Andhra Pradesh.", options: ["Mysore", "Kanjeevaram", "Pochampally", "Banaras"], correct: 2, explanation: "The passage explicitly links Pochampally sarees with ikat patterns." },
      { id: 11, text: "According to the passage, what has helped preserve Indian handicrafts over the years?", options: ["Government support", "Modern technologies", "International demand", "Generational knowledge passed down by artisans"], correct: 3, explanation: "The text notes crafts are 'passed down through generations of artisans'." },
      { id: 12, text: "What does the passage primarily highlight?", options: ["Economic impact of handicrafts", "Diversity and richness of Indian handicrafts", "Use in daily lives", "Role in modern design"], correct: 1, explanation: "The overall focus is the variety and cultural depth across different regions." }
    ]
  },
  {
    id: "tree-boy",
    title: "The Tree and the Little Boy",
    description: "A poignant fable about nature's selflessness and human greed.",
    content: "There is a lovely story of a tree and a little boy who used to play in its shade. They had become friends. One day, the boy sat leaning against the trunk of the tree, crying. He was hungry. \"Eat my fruit\" said the kind tree bending down one of its branches. The boy ate the fruit and was happy. The boy grew up. One day, he sat under the tree with an anxious look on his face. \"What is the matter?\" asked the tree. \"I am going to marry and I want a house to live in,\" said the young man. \"Cut down my branches and build your house,\" said the tree. The young man built a house with the branches of the tree. The young man became a sailor. One day, he sat under the tree with a worried look. \"What is the matter?\" asked the tree. \"My captain is a cruel fellow. I want a ship of my own,\" said the sailor. \"Cut down my trunk and build a ship.\" The sailor lost his ship and returned home as a helpless old man. On a cold winter's day, he stood where the tree once was, leaning on his stick and trembling with cold. \"Make a fire of me, and warm yourself\" said the stump of the tree. The stump of the unselfish tree burnt in the fire, softly humming a tune.",
    questions: [
      { id: 13, text: "Match the states of the boy with their reasons correctly (Crying: Hungry; Anxious: House; Worried: Own Ship):", options: ["A-IV, B-III, C-II, D-I", "A-III, B-II, C-I, D-IV", "A-I, B-III, C-II, D-IV", "A-II, B-I, C-IV, D-III"], correct: 1, explanation: "A (Crying) matches III (Hungry); B (Anxious) matches II (Wanted House); C (Worried) matches I (Wanted Ship)." },
      { id: 14, text: "The two protagonists of the story are:", options: ["Both innocent and naive", "One is intelligent and the other a fool", "Both cunning and selfish", "One is demanding and greedy, the other generous and supportive"], correct: 3, explanation: "The story highlights the contrast between the boy's constant demands and the tree's unconditional giving." },
      { id: 15, text: "How were the tree and the little boy related to each other?", options: ["Close contenders in survival", "Close friends due to long association", "Colleagues working together", "Competitors in needs"], correct: 1, explanation: "The story explicitly states 'They had become friends'." },
      { id: 16, text: "The story highlights a typical selfish human nature. Identify it:", options: ["Compassion and benevolence", "Conservation of forests", "Mindless greed for wealth", "Heartless and foolish exploitation of nature"], correct: 3, explanation: "The boy uses the tree until it is nothing but a stump, reflecting exploitation." },
      { id: 17, text: "The stump of the unselfish tree burnt in the fire, softly humming a tune means:", options: ["Trees sing when burnt", "The tree felt no pain in its suffering while caring for others", "The tree tried to forget its pain", "The tree was a fool"], correct: 1, explanation: "The humming symbolizes the tree's final act of peace in serving its friend." },
      { id: 18, text: "How would you define the relationship that the story illustrates?", options: ["Mutual symbiotic relationship", "Relationship based on deceit", "One sided relationship of love and support", "Disguised enmity"], correct: 2, explanation: "The tree gives everything while the boy only returns to take." }
    ]
  },
  {
    id: "shyness",
    title: "The Art of Silence and Shyness",
    description: "An introspective look at the benefits of being reserved.",
    content: "I must say that, beyond occasionally exposing me to laughter, my constitutional shyness has been of no great disadvantage to me. In fact, I can see that, on the contrary, it has been all to my advantage. My hesitancy in speech, which was once an annoyance, is now a pleasure. Its greatest pleasure has been that it has taught me the economy of words. I have naturally formed the habit of restraining my thoughts. And I can now, give myself the certificate that a thoughtless word hardly ever escapes of my tongue or pen. I do not recollect ever having had to regret anything in my speech or writing. I have thus been spared many a mishap and waste of time. Experience has taught me that silence is part of the spiritual discipline of a votary of truth. Proneness to exaggerate, to suppress or modify the truth, wittingly or unwittingly, is a natural weakness of man and silence is necessary in order to surmount it. A man of few words will rarely be thoughtless in his speech; he will measure every word.",
    questions: [
      { id: 19, text: "The expression, \"my constitutional shyness\" in the given passage would mean:", options: ["Shyness in Article 1", "Shyness in the Preamble", "Innate and natural shyness", "Pretended shyness"], correct: 2, explanation: "'Constitutional' refers to one's physical or mental makeup; hence, innate." },
      { id: 20, text: "The author as a matured individual believes that his shy nature brought him:", options: ["Great advantage in life", "Unmatched joy and enchantment", "Disadvantage in rituals", "Media coverage"], correct: 0, explanation: "The author states 'it has been all to my advantage'." },
      { id: 21, text: "The author due to his shy nature:", options: ["Aggressively attacked crowds", "Worked hard to hide his stammer", "Naturally formed the habit of restraining thoughts", "Became an ascetic"], correct: 2, explanation: "He formed the habit of thinking before speaking." },
      { id: 22, text: "The author claims that:", options: ["He has rarely spoken a thoughtless word", "He always speaks without thinking", "He is prone to nightmares", "He became a cricket player"], correct: 0, explanation: "He states that a thoughtless word hardly ever escapes him." },
      { id: 23, text: "Experience has taught the author that:", options: ["Silence is better than laughter", "Silence is part of the spiritual discipline", "Silence is to be avoided", "Silence can never be attained"], correct: 1, explanation: "He explicitly calls silence 'part of the spiritual discipline of a votary of truth'." },
      { id: 24, text: "Match the phrases correctly (Few words: Rarely thoughtless; Hesitancy: Annoyance; Exaggerate: Weakness; Shyness: Laughter):", options: ["A-IV, B-III, C-II, D-I", "A-II, B-I, C-IV, D-III", "A-III, B-IV, C-I, D-II", "A-I, B-II, C-III, D-IV"], correct: 3, explanation: "A (Few words) -> I; B (Hesitancy) -> II; C (Exaggerate) -> III; D (Shyness) -> IV." }
    ]
  },
  {
    id: "spirit",
    title: "The Sickness of Spirit",
    description: "A philosophical exploration of modern life's spiritual void.",
    content: "Unhappiness and discontent spring not only from poverty. Man is a strange creature, fundamentally different from other animals. He has far horizons, invincible hopes, creative energies, spiritual powers. If they are left undeveloped and unsatisfied, he may have all the comforts which wealth can give, but will still feel that life is not worthwhile. The great humanist writers, Shaw and Wells, Arnold Bennett and Galsworthy, expose the foibles, inconsistencies and weaknesses of modern life, but they ignore the deeper currents. The outward chaos and confusion of our life reflect the confusion of our hearts and minds. Constitutions, says Plato, \"are but the reflections in the outside world of the values which prevail in men's minds.\" There must be a change in the ideals we cherish. What is missing in our age is the soul; there is nothing wrong with the body. We suffer from sickness of spirit. We must discover our roots in the eternal and regain faith in the transcendent truth which will order life.",
    questions: [
      { id: 25, text: "The author implies that if the eternal values and ideals are not regained, then:", options: ["The world will be flooded", "The sky will fall", "Civilization will be ruined forever", "The earth will fall into a black hole"], correct: 2, explanation: "The text warns that the 'house' (society) will fall without these values." },
      { id: 26, text: "According to the author, the humanist writers have ignored:", options: ["The spiritual aspect of life", "Religion and rituals", "Cultural progress", "Material welfare"], correct: 0, explanation: "He states they 'ignore the deeper currents'." },
      { id: 27, text: "According to the author, how is man different from other animals?", options: ["Power of speech", "Hopes, creative energies, and spiritual powers", "Money and achievement", "Physical prowess"], correct: 1, explanation: "These specific traits are listed as unique human differentiators." },
      { id: 28, text: "According to the author, unhappiness and discontent spring from:", options: ["Poverty alone", "Ignorance", "Poverty along with moral and spiritual degradation", "Mental turmoil"], correct: 2, explanation: "He links unhappiness to both poverty and the unsatisfied spirit." },
      { id: 29, text: "Despite wealth, man will feel incomplete if:", options: ["Prevented from mingling", "Creative energies and spiritual powers are unsatisfied", "Deserted by friends", "Failed to enroll in a university"], correct: 1, explanation: "The author explicitly links worthwhileness to these internal powers." }
    ]
  },
  {
    id: "team-building",
    title: "Team Building Exercises",
    description: "Tracing the origins of teamwork from medieval tournaments to business.",
    content: "The phrase \"team building exercises\" may be new but the reality is not. Its origin goes back at least as far as the medieval tournaments. These provided knights with military training and the opportunity to make reputations. Individual jousting and hand-to hand combat came first. Then there were team events. In these, a group of knights fought against another group. These teams often stayed together and fought side-by-side in real battle. Team games today, such as football, baseball, cricket and hockey, are the distant descendants of such medieval tournaments. A crucial event in the movement from being a group to becoming a team can be the team building exercise. This can be based upon either (1) a substitute team task (for example, a business case study or a few days of outdoor activities) or (2) a real task (for example, going away for a weekend to plan company strategy). There are pros and cons to both approaches. The advantage of a substitute task type of event is that success or failure is not of paramount importance. Nor are there any technological or professional challenges to meet, so that people can concentrate on the essential issue of learning as to how to work more effectively together as a team.",
    questions: [
      { id: 30, text: "Choose the correct meaning of the word 'Crucial' from the options given:", options: ["Decisive", "Essential", "Insignificant", "Immature"], correct: 0, explanation: "In this context, crucial means decisive or extremely important for a outcome." },
      { id: 31, text: "Choose the option that is the Antonym of the word 'Descendent':", options: ["Grandchildren", "Heir", "Ancestor", "Children"], correct: 2, explanation: "Ancestor is the opposite of a descendent." },
      { id: 32, text: "Match tasks: (Substitute: Outdoor; Training: Jousting; Knights Team: Battle; Real: Strategy):", options: ["(A)-(I), (B)-(III), (C)-(IV), (D)-(II)", "(A)-(I), (B)-(IV), (C)-(III), (D)-(II)", "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)", "(A)-(IV), (B)-(III), (C)-(II), (D)-(I)"], correct: 0, explanation: "A (Substitute) matches I; B (Training) matches III; C (Team/Knights) matches IV; D (Real) matches II." },
      { id: 33, text: "According to the passage, the reality of 'team-building exercise' is that, it is:", options: ["Advanced", "New", "Ancient", "Modern"], correct: 2, explanation: "The text says its reality goes back to medieval times, implying it is ancient." },
      { id: 34, text: "According to the passage, a group of knights fought against another group in:", options: ["Cricket Only", "Real Battle Only", "Baseball Only", "Hockey Only"], correct: 1, explanation: "The passage states they fought side-by-side in real battle." }
    ]
  },
  {
    id: "detachment",
    title: "Detachment - A Key to Simple Living",
    description: "Buddhist insights into living a light and abundant life.",
    content: "When things aren't going well, we tend to think we are lacking in something. But if we want to change our current situation, we should first part with something, before we look to acquire something else. This is a fundamental tenet of simple living. Discard your attachments. Let go of your assumptions. Reduce your possessions. Living simply is also about discarding your physical and mental burdens. It's amazing how refreshed we can feel after a good cry. Crying clears out whatever weight you were carrying in your heart. You feel energized to try again. I have always felt that the Buddhist concept of the 'enlightened mind' - the Japanese characters for which depict a \"clean mind\" refers to this 'refreshment' of the spirit. The act of discarding, of detaching from mental and physical burdens, from the baggage that weighs us down, is extremely difficult. Sometimes it can be accompanied by real pain, as when we part with someone who is dear to us. But if you want to improve the way things are, if you want to live with a light heart, you must start by discarding. The moment you detach, a new abundance will flow into your life.",
    questions: [
      { id: 35, text: "What is the fundamental tenet of 'simple living?'", options: ["Realising lack", "Feeling energised", "The act of letting go", "Attaining enlightenment"], correct: 2, explanation: "The text defines parting with things/letting go as the fundamental tenet." },
      { id: 36, text: "Which use of 'part' matches the context in paragraph 4?", options: ["Essential part of school", "Part and parcel of life", "Take part in competition", "Part our ways from evil"], correct: 3, explanation: "In the passage, 'part' means to separate or let go, matching 'part our ways from evil'." },
      { id: 37, text: "Which words match the meaning of 'discard'?", options: ["Detach and Let go", "Detach and Derived", "Derived and Disadvantage", "Disadvantage and Distant"], correct: 0, explanation: "Detach and Let go are synonyms for discard in this context." },
      { id: 38, text: "What can be the appropriate title for the passage?", options: ["Detachment - A key to simple living", "Enlightenment", "Burdens of life", "Japanese improvement"], correct: 0, explanation: "The entire passage focuses on detachment as a path to simple living." },
      { id: 39, text: "According to the passage, what are the qualities of 'a good cry'?", options: ["Makes you light and energized", "Way of detaching", "Sign of weakness", "Waste of time"], correct: 0, explanation: "The passage says it clears weight and makes you feel energized." }
    ]
  },
  {
    id: "horse",
    title: "The Autobiography of a Horse",
    description: "A horse's life journey through different owners and roles.",
    content: "The Autobiography of a Horse. Now that I am getting old and stiff in the joints, I like to meditate, while grazing in the pasture, on my foal days. I think that was the happiest part of my life. I had no work to do, and could run about after my mother, who was a fine white Arab mare, without any restraint. When I was old enough, the trainer came and began driving me round and round in circles with his long whip. However, my mother told me that it was no use of my resisting, and I was at last thoroughly trained as a riding-horse. I was bought by a young officer as a polo pony, and I soon got to love the game. But he got into debt, and had to sell me; and I was bought by a gentleman and a lady who kept a buggy. I hated this work; and I found that jibbing was a very good trick. My owner got disgusted at last, and sold me to a gentleman who was fond of hunting. I was delighted to get back to saddle-work; and thoroughly enjoyed my gallops with the hounds. But an accident put a stop to that; for one day my master pressed me to a big jump which I knew I could not do. I fell and master broke his arm, and I badly sprained one of my legs. I was sold to a gentleman who wanted a quiet riding-horse. He was a kind master, and used me well. Now that I am old, he gives me very little work, and I spend most of my time grazing in the pasture, and leading a quiet, contented life.",
    questions: [
      { id: 40, text: "The word \"nibbled\" as used in the passage means to:", options: ["Take huge bites", "Take small bites", "Gulp quickly", "Eat for long duration"], correct: 1, explanation: "To nibble means to eat in small, gentle bites." },
      { id: 41, text: "Arrange the trainer's steps: (B: Fasten rope -> A: Move in circles -> D: Angry/Frightened -> C: Tired -> E: No resistance):", options: ["(A), (B), (C), (D), (E)", "(D), (B), (A), (E), (C)", "(B), (C), (D), (A), (E)", "(B), (A), (D), (C), (E)"], correct: 3, explanation: "The trainer first fastens the rope, then drives the horse in circles, causing anger/fear until tired, finally leading to training." },
      { id: 42, text: "Find a word which means \"very happy\":", options: ["Steadily", "Tired", "Disgusted", "Delighted"], correct: 3, explanation: "Delighted is a synonym for very happy." },
      { id: 43, text: "Being old, the horse:", options: ["Enjoys polo", "Hunts with hounds", "Likes to meditate and graze", "Is unsatisfied"], correct: 2, explanation: "The passage says he likes to meditate and spend time grazing in his old age." },
      { id: 44, text: "Which trick was NOT part of the horse's coping mechanism when whipped?", options: ["Jibbing", "Galloping", "Shying", "Backing up"], correct: 1, explanation: "Galloping was part of the hunting work he enjoyed, not a coping trick." }
    ]
  }
]

export default function RCQuizPage() {
  const { toast } = useToast()
  const quizRef = useRef<HTMLDivElement>(null)
  const [selectedPassageId, setSelectedPassageId] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)

  const selectedPassage = RC_PASSAGES.find(p => p.id === selectedPassageId)
  const questions = selectedPassage?.questions || []

  const scrollToQuizTop = useCallback(() => {
    if (quizRef.current) {
      const offset = 80
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
      toast({ title: "Passage Complete!", description: "Check your performance analysis." })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep, questions.length, toast, scrollToQuizTop])

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

  // --- SELECTION VIEW ---
  if (!selectedPassageId) {
    return (
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 text-center animate-fade-in-up">
            <Badge variant="outline" className="mb-4 py-1 px-4 border-primary/40 text-primary font-bold uppercase tracking-widest">
              Section 2: RC
            </Badge>
            <h1 className="text-4xl font-headline font-bold mb-4">Reading Comprehension Mastery</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select a passage to begin your focused clinical practice. Target: 250/250 accuracy.
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
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
                    Begin Assessment <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // --- RESULTS VIEW ---
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
              const isCorrect = userAns === q.correct
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

  // --- QUIZ VIEW ---
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
              <BookOpen className="w-4 h-4" /> READING PASSAGE
            </div>
            <div className="text-foreground leading-relaxed italic text-lg space-y-4">
              {selectedPassage.content.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Card>

          <div className="space-y-6">
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
              <Button variant="ghost" onClick={() => {
                setCurrentStep(Math.max(0, currentStep - 1))
                setTimeout(scrollToQuizTop, 100)
              }} disabled={currentStep === 0} className="rounded-xl font-bold">
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
