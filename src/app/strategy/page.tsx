"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Compass, Clock, CheckCircle, AlertTriangle, Calculator, ListOrdered, FileText, Target, Gift } from "lucide-react"
import Link from "next/link"

export default function StrategyPage() {
  const timePlan = [
    { section: "Reading Comprehension (RC)", time: "15 min", q: "12-15" },
    { section: "Synonyms & Antonyms", time: "8 min", q: "10" },
    { section: "Fill in the Blanks", time: "10 min", q: "10" },
    { section: "Match the Following", time: "12 min", q: "10" },
    { section: "Sentence Rearrangement", time: "10 min", q: "5-8" },
    { section: "Review / Buffer", time: "5 min", q: "-" },
  ]

  const markingStrategy = [
    { cond: "70%+ Confident", action: "Attempt the question.", color: "text-green-600", bg: "bg-green-50" },
    { cond: "50-70% Confident", action: "Eliminate 1-2 options -> Attempt.", color: "text-blue-600", bg: "bg-blue-50" },
    { cond: "Below 50% Confident", action: "SKIP. 0 is better than -1.", color: "text-red-600", bg: "bg-red-50" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">Subject Code: 101</Badge>
            <Badge variant="outline">60 Mins</Badge>
          </div>
          <h1 className="text-4xl font-headline font-bold flex items-center gap-3">
            <Compass className="w-10 h-10 text-primary-foreground" />
            250/250 Strategic Blueprint
          </h1>
          <p className="text-muted-foreground text-lg mt-4">
            Master the 50-question paper structure with a focus on accuracy and the "Gift of Skips."
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-primary/40 bg-primary/10 overflow-hidden relative">
              <div className="absolute right-0 top-0 p-4 opacity-10">
                <Gift className="w-24 h-24" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Gift className="w-6 h-6 text-primary-foreground" />
                  The Gift of Skips
                </CardTitle>
                <CardDescription className="text-primary-foreground/80 font-medium">The single most important strategy: You have the choice to skip 10 questions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-3 gap-4">
                  {markingStrategy.map((item, i) => (
                    <div key={i} className={`${item.bg} p-4 rounded-xl border flex flex-col justify-center`}>
                      <div className={`text-xs font-bold ${item.color} uppercase mb-1`}>{item.cond}</div>
                      <div className="text-sm font-semibold leading-tight">{item.action}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Calculator className="w-6 h-6" />
                  The Maths of Uncertainty
                </CardTitle>
                <CardDescription>Lesson: Every wrong attempt on an uncertain question costs real marks.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/30 p-6 rounded-2xl border shadow-sm">
                  <div className="space-y-3 text-sm font-mono">
                    <div className="flex justify-between border-b pb-2 text-green-600 font-bold">
                      <span>40 Correct, 0 Wrong (Ideal)</span>
                      <span>= 200 Marks</span>
                    </div>
                    <div className="flex justify-between border-b pb-2 text-yellow-600">
                      <span>40 Correct, 10 Wrong</span>
                      <span>= 190 Marks</span>
                    </div>
                    <div className="flex justify-between border-b pb-2 text-orange-600">
                      <span>35 Correct, 15 Wrong</span>
                      <span>= 160 Marks</span>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground italic flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-orange-500" />
                    Unattempted questions give 0 marks. Guessing incorrectly costs you -1.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ListOrdered className="w-6 h-6 text-primary-foreground" />
                  Exam Day Time Plan
                </CardTitle>
                <CardDescription>Recommended 60-minute allocation for Subject Code 101.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {timePlan.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-xs">
                          {i + 1}
                        </div>
                        <div>
                          <div className="font-bold text-sm">{item.section}</div>
                          {item.q !== "-" && <div className="text-[10px] text-muted-foreground uppercase">{item.q} Questions</div>}
                        </div>
                      </div>
                      <Badge variant="outline" className="font-mono">{item.time}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6">
            <Card className="bg-foreground text-background">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Order of Attempt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <ol className="space-y-3 list-decimal list-inside text-background/80">
                  <li><strong>RC:</strong> Fastest safe marks (answers are IN the passage).</li>
                  <li><strong>Syn/Ant:</strong> Quick if you've studied the list.</li>
                  <li><strong>Fill in Blanks:</strong> Grammar-based and logical.</li>
                  <li><strong>Match:</strong> Requires specific knowledge (idioms).</li>
                  <li><strong>Rearrangement:</strong> Slowest; save for last.</li>
                </ol>
                <div className="pt-4 border-t border-background/20 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Accuracy over speed.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>0 is better than -1.</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full h-14 text-lg font-bold rounded-2xl" asChild>
              <Link href="/quiz">Practice Strategy Now</Link>
            </Button>
          </aside>
        </div>
      </main>
    </div>
  )
}
