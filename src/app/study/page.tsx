
import { Navbar } from "@/components/layout/Navbar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, GraduationCap, ChevronRight, MessageSquare, PenTool, Hash, Layers } from "lucide-react"
import Link from "next/link"

const syllabus = [
  {
    category: "Comprehension & Theme",
    topics: [
      { name: "Reading Comprehension", icon: MessageSquare, desc: "Factual, Narrative and Discursive (Argumentative) passages.", modules: 3, href: "/study/reading-comprehension" },
      { name: "Sentence Rearrangement", icon: Layers, desc: "Subject-Verb core logic and setting-action patterns.", modules: 1, href: "/study/sentence-rearrangement" },
    ]
  },
  {
    category: "Vocabulary & Idioms",
    topics: [
      { name: "Synonyms & Antonyms", icon: Hash, desc: "Master the 50+ essential word list with prefix/suffix decoding.", modules: 5, href: "/study/synonyms-antonyms" },
      { name: "Match the Following", icon: PenTool, desc: "Idioms, Phrasal Verbs, Proverbs, and Figures of Speech.", modules: 4, href: "/study/match-the-following" },
    ]
  },
  {
    category: "Grammar & Structure",
    topics: [
      { name: "Fill in the Blanks", icon: BookOpen, desc: "Tenses, Conjunctions, Adverbs, and Prepositions.", modules: 4, href: "/study/fill-in-the-blanks" },
    ]
  }
]

export default function StudyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <Badge variant="outline" className="mb-4 py-1 px-4 border-primary text-primary-foreground font-semibold uppercase tracking-wider">English Language Curriculum</Badge>
            <h1 className="text-4xl font-headline font-bold mb-4">Acing the English Section</h1>
            <p className="text-muted-foreground text-lg">Every rule, every trap, and every strategy for 200/200 marks.</p>
          </header>

          <div className="space-y-12">
            {syllabus.map((section, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-headline font-bold mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                  {section.category}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {section.topics.map((topic, tIdx) => (
                    <Link key={tIdx} href={topic.href}>
                      <Card className="h-full hover:border-primary hover:shadow-md transition-all group border-border/50">
                        <CardHeader>
                          <div className="flex justify-between items-start mb-2">
                            <div className="bg-secondary/50 p-2 rounded-lg">
                              <topic.icon className="w-5 h-5 text-secondary-foreground" />
                            </div>
                            <Badge variant="secondary">{topic.modules} Sections</Badge>
                          </div>
                          <CardTitle className="text-xl group-hover:text-primary-foreground/80 transition-colors">{topic.name}</CardTitle>
                          <CardDescription className="line-clamp-2">{topic.desc}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center text-sm font-medium text-primary-foreground/70">
                          Enter Module <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 p-8 rounded-3xl bg-foreground text-background flex flex-col md:flex-row items-center gap-8 shadow-xl">
            <div className="bg-background/10 p-6 rounded-2xl shrink-0">
              <GraduationCap className="w-16 h-16 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Master the Strategy</h3>
              <p className="text-background/70 mb-4">Learn why choosing to skip 10 questions is your greatest gift in the exam.</p>
              <Link href="/strategy" className="font-semibold text-primary hover:underline flex items-center gap-1">
                View Smart Strategy Guide <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
