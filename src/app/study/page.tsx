"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, GraduationCap, MessageSquare, PenTool, Hash, Layers, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const syllabus = [
  {
    category: "Comprehension & Logic",
    topics: [
      { name: "Reading Comprehension", icon: MessageSquare, desc: "Factual, Narrative and Discursive (Argumentative) passages.", modules: 3, href: "/study/reading-comprehension", color: "bg-blue-100 text-blue-600" },
      { name: "Sentence Rearrangement", icon: Layers, desc: "Subject-Verb core logic and sequence patterns.", modules: 1, href: "/study/sentence-rearrangement", color: "bg-purple-100 text-purple-600" },
    ]
  },
  {
    category: "Vocabulary & Idioms",
    topics: [
      { name: "Synonyms & Antonyms", icon: Hash, desc: "Master the 50+ essential word list with prefix/suffix decoding.", modules: 5, href: "/study/synonyms-antonyms", color: "bg-amber-100 text-amber-600" },
      { name: "Match the Following", icon: PenTool, desc: "Idioms, Phrasal Verbs, Proverbs, and Figures of Speech.", modules: 4, href: "/study/match-the-following", color: "bg-emerald-100 text-emerald-600" },
    ]
  },
  {
    category: "Grammar & Structure",
    topics: [
      { name: "Fill in the Blanks", icon: BookOpen, desc: "Tenses, Conjunctions, Adverbs, and Prepositions.", modules: 4, href: "/study/fill-in-the-blanks", color: "bg-rose-100 text-rose-600" },
    ]
  }
]

export default function StudyPage() {
  return (
    <div className="min-h-screen pb-20">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <header className="mb-16 text-center animate-fade-in-up">
            <Badge variant="outline" className="mb-6 py-2 px-6 border-primary/40 text-primary font-bold uppercase tracking-widest rounded-full">Section 1: English (101)</Badge>
            <h1 className="text-5xl font-headline font-bold mb-6">Commanding the Curriculum</h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Dive deep into every rule, trap, and pattern required for a perfect 100th percentile.
            </p>
          </header>

          <div className="space-y-16">
            {syllabus.map((section, idx) => (
              <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <h2 className="text-2xl font-headline font-bold mb-8 flex items-center gap-4">
                  <div className="w-2 h-8 bg-primary rounded-full shadow-sm shadow-primary/40"></div>
                  {section.category}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {section.topics.map((topic, tIdx) => (
                    <Link key={tIdx} href={topic.href} className="group">
                      <Card className="h-full border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2rem] bg-white/70 backdrop-blur-sm overflow-hidden flex flex-col">
                        <CardHeader className="p-8">
                          <div className="flex justify-between items-start mb-6">
                            <div className={cn("p-4 rounded-[1.25rem] group-hover:scale-110 transition-transform", topic.color)}>
                              <topic.icon className="w-8 h-8" />
                            </div>
                            <Badge variant="secondary" className="rounded-full px-4 py-1 font-bold">{topic.modules} Modules</Badge>
                          </div>
                          <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors mb-3 text-foreground">{topic.name}</CardTitle>
                          <CardDescription className="text-base leading-relaxed">{topic.desc}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 pt-0 mt-auto">
                          <div className="flex items-center text-sm font-bold text-primary group-hover:translate-x-2 transition-transform">
                            Explore Curriculum <ArrowRight className="w-5 h-5 ml-2" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 p-12 rounded-[3rem] bg-primary text-white flex flex-col md:flex-row items-center gap-12 shadow-2xl overflow-hidden relative group animate-fade-in-up">
            <div className="absolute right-0 top-0 w-1/3 h-full bg-white/10 -skew-x-12 translate-x-1/2 group-hover:translate-x-1/3 transition-transform duration-700" />
            <div className="bg-white/20 p-8 rounded-[2rem] backdrop-blur-md shrink-0">
              <GraduationCap className="w-20 h-20 text-white" />
            </div>
            <div className="relative z-10 text-center md:text-left">
              <h3 className="text-3xl font-bold mb-4">Strategic Competitive Edge</h3>
              <p className="text-white/80 text-xl mb-8 max-w-xl">
                Knowledge alone isn't enough. Gain the accuracy required for a perfect 50/50 attempt.
              </p>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-10 rounded-2xl font-bold text-lg" asChild>
                <Link href="/strategy">View Strategy Guide</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
