"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Compass, Clock, CheckCircle, AlertTriangle, Calculator, ListOrdered, FileText, Target } from "lucide-react"
import Link from "next/link"

export default function StrategyPage() {
  const timePlan = [
    { section: "Reading Comprehension (RC)", time: "15 min", q: "12-15" },
    { section: "Vocabulary (Syn/Ant)", time: "8 min", q: "10" },
    { section: "Grammar (Fill-ups)", time: "10 min", q: "10" },
    { section: "Match the Following", time: "12 min", q: "10" },
    { section: "Sentence Rearrangement", time: "10 min", q: "5-8" },
    { section: "Review / Buffer", time: "5 min", q: "-" },
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
            Master the 50-question paper structure with a focus on accuracy and speed.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <FileText className="w-6 h-6" />
                  Paper Structure
                </CardTitle>
                <CardDescription>Official Subject Code 101 Guidelines</CardDescription>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border space-y-2">
                  <div className="text-xs font-bold text-muted-foreground uppercase">Questions</div>
                  <div className="text-2xl font-bold">50 MCQs</div>
                  <p className="text-xs text-muted-foreground">Attempt all 50 questions for max marks.</p>
                </div>
                <div className="p-4 bg-white rounded-xl border space-y-2">
                  <div className="text-xs font-bold text-muted-foreground uppercase">Total Marks</div>
                  <div className="text-2xl font-bold">250 Marks</div>
                  <p className="text-xs text-muted-foreground">Correct: +5 | Wrong: -1</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Calculator className="w-6 h-6" />
                  The Accuracy Math
                </CardTitle>
                <CardDescription>Why every single mark counts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/30 p-6 rounded-2xl border shadow-sm">
                  <div className="space-y-3 text-sm font-mono">
                    <div className="flex justify-between border-b pb-2 text-green-600 font-bold">
                      <span>50 Correct, 0 Wrong</span>
                      <span>= 250 Marks</span>
                    </div>
                    <div className="flex justify-between border-b pb-2 text-yellow-600">
                      <span>45 Correct, 5 Wrong</span>
                      <span>= 220 Marks</span>
                    </div>
                    <div className="flex justify-between border-b pb-2 text-orange-600">
                      <span>40 Correct, 10 Wrong</span>
                      <span>= 190 Marks</span>
                    </div>
                    <div className="flex justify-between border-b pb-2 text-red-600">
                      <span>35 Correct, 15 Wrong</span>
                      <span>= 160 Marks</span>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground italic flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-orange-500" />
                    Unattempted questions give 0 marks. Guessing incorrectly costs you -1.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="font-bold text-green-700">70%+ Confident</div>
                    <p className="text-xs font-medium mt-1">ATTEMPT immediately.</p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="font-bold text-blue-700">50-70% Confident</div>
                    <p className="text-xs font-medium mt-1">Eliminate 2 options, then attempt.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ListOrdered className="w-6 h-6 text-primary-foreground" />
                  Time Plan (60 Minutes)
                </CardTitle>
                <CardDescription>Recommended time allocation for each section.</CardDescription>
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
                  Attempt Order
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p className="text-background/70 leading-relaxed">
                  Start with <strong>RC</strong> (answers are in text), move to <strong>Vocab</strong> and <strong>Grammar</strong> for speed, and save <strong>Sentence Rearrangement</strong> for the end as it is the most time-consuming.
                </p>
                <div className="pt-4 border-t border-background/20 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Accuracy over speed.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Double-check vocab traps.</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/20 border-secondary/30">
              <CardHeader>
                <CardTitle className="text-lg">Pro Strategy Tip</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Don't get stuck on one question. If it takes more than 60 seconds, flag it and move on. You need to average 72 seconds per question.
              </CardContent>
            </Card>

            <Button className="w-full h-14 text-lg font-bold rounded-2xl" asChild>
              <Link href="/quiz">Test This Strategy Now</Link>
            </Button>
          </aside>
        </div>
      </main>
    </div>
  )
}
