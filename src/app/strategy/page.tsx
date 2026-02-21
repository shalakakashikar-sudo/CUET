
"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Compass, Clock, CheckCircle, AlertTriangle, Calculator, ListOrdered } from "lucide-react"
import Link from "next/link"

export default function StrategyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-12">
          <Badge className="mb-4">Exam Mastery</Badge>
          <h1 className="text-4xl font-headline font-bold flex items-center gap-3">
            <Compass className="w-10 h-10 text-primary-foreground" />
            Smart Marking Strategy
          </h1>
          <p className="text-muted-foreground text-lg mt-4">The single most important strategy: YOU HAVE THE CHOICE TO SKIP 10 QUESTIONS.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Calculator className="w-6 h-6" />
                  The Choice Strategy
                </CardTitle>
                <CardDescription>Use your 10 skips wisely. 0 is better than -1.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="text-lg font-bold text-green-700">70%+ Confident</div>
                    <p className="text-xs font-medium mt-1">ATTEMPT the question.</p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="text-lg font-bold text-blue-700">50-70% Confident</div>
                    <p className="text-xs font-medium mt-1">ATTEMPT if you eliminated 1-2 options.</p>
                  </div>
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="text-lg font-bold text-red-700">Below 50%</div>
                    <p className="text-xs font-medium mt-1">SKIP. Avoid negative marks.</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border shadow-sm">
                  <h4 className="font-bold mb-4">The Math of Accuracy:</h4>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex justify-between border-b pb-1 text-green-600">
                      <span>40 correct, 0 wrong</span>
                      <span>= 200 Marks (Ideal)</span>
                    </div>
                    <div className="flex justify-between border-b pb-1 text-yellow-600">
                      <span>40 correct, 10 wrong</span>
                      <span>= 190 Marks</span>
                    </div>
                    <div className="flex justify-between border-b pb-1 text-red-600">
                      <span>35 correct, 15 wrong</span>
                      <span>= 160 Marks</span>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground italic">Lesson: Every wrong attempt on an uncertain question costs you real marks.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ListOrdered className="w-6 h-6 text-primary-foreground" />
                  Order of Attempt
                </CardTitle>
                <CardDescription>Maximise marks by doing these first.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { section: "Reading Comprehension", time: "15 min", reason: "Answers are IN the passage; fastest safe marks." },
                  { section: "Synonyms & Antonyms", time: "8 min", reason: "Quick if you studied the list." },
                  { section: "Fill in the Blanks", time: "10 min", reason: "Grammar-based; logical." },
                  { section: "Match the Following", time: "12 min", reason: "Requires specific knowledge." },
                  { section: "Sentence Rearrangement", time: "10 min", reason: "Slowest; do last." }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors border">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center font-bold text-xs shrink-0">{i+1}</div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-bold text-sm">{item.section}</span>
                        <Badge variant="secondary" className="text-[10px]">{item.time}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6">
            <Card className="bg-foreground text-background">
              <CardHeader>
                <CardTitle className="text-lg">Rank 1 Rule</CardTitle>
              </CardHeader>
              <CardContent>
                <blockquote className="italic border-l-2 border-primary pl-4 py-2 text-sm text-background/80">
                  "Accuracy over Speed. 100% accuracy on 40 questions is better than 80% accuracy on 50 questions."
                </blockquote>
              </CardContent>
            </Card>

            <Card className="bg-secondary/20 border-secondary/30">
              <CardHeader>
                <CardTitle className="text-lg">Section Timing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span>Language Section</span>
                  <Badge>45 Mins</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Review / Buffer</span>
                  <Badge variant="outline">5 Mins</Badge>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full h-12" asChild>
              <Link href="/quiz">Test Your Strategy</Link>
            </Button>
          </aside>
        </div>
      </main>
    </div>
  )
}
