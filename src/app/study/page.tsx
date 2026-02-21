
import { Navbar } from "@/components/layout/Navbar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, GraduationCap, ChevronRight } from "lucide-react"
import Link from "next/link"

const syllabus = [
  {
    category: "Language (Section 1A)",
    topics: [
      { name: "Reading Comprehension", desc: "Factual, Narrative and Literary texts", modules: 12 },
      { name: "Verbal Ability", desc: "Grammar, Sentence Correction, Rearrangement", modules: 8 },
      { name: "Synonyms & Antonyms", desc: "Contextual vocabulary mastery", modules: 15 },
      { name: "Idioms & Phrases", desc: "Commonly used idioms and their meanings", modules: 6 },
    ]
  },
  {
    category: "General Test (Section 3)",
    topics: [
      { name: "Quantitative Reasoning", desc: "Arithmetic, Algebra, Geometry (Grade 8 level)", modules: 20 },
      { name: "Logical & Analytical Reasoning", desc: "Series, Blood Relations, Coding-Decoding", modules: 14 },
      { name: "General Knowledge", desc: "Current Affairs, History, Geography", modules: 25 },
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
            <Badge variant="outline" className="mb-4 py-1 px-4 border-primary text-primary-foreground font-semibold">Study Material</Badge>
            <h1 className="text-4xl font-headline font-bold mb-4">Everything you need to ace CUET</h1>
            <p className="text-muted-foreground text-lg">Curated modules based on the official 2026 syllabus pattern.</p>
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
                    <Link key={tIdx} href={`/study/${topic.name.toLowerCase().replace(/ /g, '-')}`}>
                      <Card className="h-full hover:border-primary hover:shadow-md transition-all group">
                        <CardHeader>
                          <div className="flex justify-between items-start mb-2">
                            <div className="bg-secondary/50 p-2 rounded-lg">
                              <BookOpen className="w-5 h-5 text-secondary-foreground" />
                            </div>
                            <Badge variant="secondary">{topic.modules} Modules</Badge>
                          </div>
                          <CardTitle className="text-xl group-hover:text-primary-foreground/80 transition-colors">{topic.name}</CardTitle>
                          <CardDescription className="line-clamp-2">{topic.desc}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center text-sm font-medium text-primary-foreground/70">
                          Start Learning <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
              <h3 className="text-2xl font-bold mb-2">Domain Specific Preparation?</h3>
              <p className="text-background/70 mb-4">We also offer deep-dive modules for specific domains like Accountancy, Political Science, and more.</p>
              <Link href="/study/domains" className="font-semibold text-primary hover:underline flex items-center gap-1">
                Explore Domain Modules <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
