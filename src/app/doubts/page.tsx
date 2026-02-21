
"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { HelpCircle, Search, MessageSquare, Book, Info } from "lucide-react"

const DOUBTS_DB = [
  {
    category: "Exam Pattern",
    questions: [
      { q: "What is the total duration of CUET 2026?", a: "The duration varies by section. Language is 45 mins, General Test is 60 mins, and most Domain subjects are 45 mins." },
      { q: "How many questions do I need to attempt in Domain subjects?", a: "Generally, you need to attempt 40 questions out of 50 in each domain subject." },
      { q: "Is there negative marking?", a: "Yes, for every correct answer you get +5, and for every incorrect answer, -1 mark is deducted." }
    ]
  },
  {
    category: "Grammar & Vocabulary",
    questions: [
      { q: "What is the difference between 'Affect' and 'Effect'?", a: "Affect is usually a verb (to influence), while Effect is usually a noun (a result). Example: The rain affected the game. The effect of the rain was a muddy field." },
      { q: "How to master Synonyms for CUET?", a: "Focus on 'Root Words' and contextual reading. Don't just memorize lists; try to use them in sentences." }
    ]
  },
  {
    category: "Preparation Tips",
    questions: [
      { q: "When should I start solving Mock Tests?", a: "Ideally, start solving full-length mocks once you have covered 70% of the syllabus. Until then, stick to topic-wise quizzes." },
      { q: "Which newspapers are best for CUET GK?", a: "The Hindu or The Indian Express are excellent for building both vocabulary and staying updated on national/international affairs." }
    ]
  }
]

export default function DoubtsPage() {
  const [search, setSearch] = useState("")

  const filteredDoubts = DOUBTS_DB.map(section => ({
    ...section,
    questions: section.questions.filter(q => 
      q.q.toLowerCase().includes(search.toLowerCase()) || 
      q.a.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(section => section.questions.length > 0)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <header className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-2xl mb-6">
              <HelpCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-headline font-bold mb-4">Doubt Resolution Center</h1>
            <p className="text-muted-foreground text-lg">Clear your concepts instantly with our curated knowledge base.</p>
          </header>

          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              className="pl-12 h-14 text-lg border-primary/20 shadow-sm rounded-2xl focus-visible:ring-primary" 
              placeholder="Search for your doubt (e.g., negative marking, synonyms...)" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="space-y-8">
            {filteredDoubts.length > 0 ? (
              filteredDoubts.map((section, sIdx) => (
                <div key={sIdx}>
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-primary-foreground">
                    <Book className="w-5 h-5" />
                    {section.category}
                  </h2>
                  <Accordion type="single" collapsible className="w-full space-y-3">
                    {section.questions.map((item, qIdx) => (
                      <AccordionItem key={qIdx} value={`${sIdx}-${qIdx}`} className="border rounded-xl px-6 bg-card">
                        <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed pb-4 border-t pt-4">
                          <div className="flex gap-3">
                            <Info className="w-5 h-5 text-secondary-foreground shrink-0 mt-0.5" />
                            {item.a}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))
            ) : (
              <Card className="p-12 text-center border-dashed">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <CardTitle className="mb-2">No matching doubts found</CardTitle>
                <CardDescription>Try a different keyword or browse categories above.</CardDescription>
              </Card>
            )}
          </div>

          <div className="mt-20 p-8 rounded-3xl bg-secondary/10 border border-secondary/20 flex flex-col md:flex-row items-center gap-6">
            <div className="bg-white p-4 rounded-full shadow-sm">
              <MessageSquare className="w-8 h-8 text-secondary-foreground" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-1">Still confused?</h3>
              <p className="text-muted-foreground">Post your question in the community forum and get answers from experts and peers.</p>
            </div>
            <Button size="lg" className="bg-secondary-foreground text-background shrink-0">Ask the Community</Button>
          </div>
        </div>
      </main>
    </div>
  )
}
