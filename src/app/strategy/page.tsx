"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Compass, Clock, CheckCircle, AlertTriangle, Calculator, ListOrdered, Target, Zap, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function StrategyPage() {
  const timePlan = [
    { section: "Reading Comprehension", time: "15 min", q: "12" },
    { section: "Vocabulary (Syn/Ant)", time: "8 min", q: "10" },
    { section: "Grammar & Structure", time: "10 min", q: "10" },
    { section: "Match & Idioms", time: "12 min", q: "10" },
    { section: "Rearrangement", time: "10 min", q: "8" },
    { section: "Final Review", time: "5 min", q: "-" },
  ]

  const markingStrategy = [
    { cond: "70%+ Confident", action: "Confirm and lock answer.", colour: "text-green-600", bg: "bg-green-50" },
    { cond: "50-70% Confident", action: "Eliminate 2 options -> Solve.", colour: "text-blue-600", bg: "bg-blue-50" },
    { cond: "Below 50% Confident", action: "Re-read context clues immediately.", colour: "text-amber-600", bg: "bg-amber-50" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-12 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Subject Code: 101</Badge>
            <Badge variant="outline">60 Mins</Badge>
          </div>
          <h1 className="text-4xl font-headline font-bold flex items-center gap-3">
            <Compass className="w-10 h-10 text-primary" />
            Strategic Exam Blueprint
          </h1>
          <p className="text-muted-foreground text-lg mt-4">
            The road to 250/250 requires a clinical approach to all 50 questions. Accuracy over speed is the elite differentiator.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Card className="border-primary/40 bg-primary/10 overflow-hidden relative">
              <div className="absolute right-0 top-0 p-4 opacity-10">
                <Zap className="w-24 h-24 text-primary" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-primary font-bold">
                  <TrendingUp className="w-6 h-6" />
                  Accuracy Maintenance
                </CardTitle>
                <CardDescription className="text-foreground/70 font-medium">For a perfect 250, you must neutralise the -1 penalty with logical deduction.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-3 gap-4">
                  {markingStrategy.map((item, i) => (
                    <div key={i} className={`${item.bg} p-4 rounded-xl border border-primary/10 flex flex-col justify-center`}>
                      <div className={`text-xs font-bold ${item.colour} uppercase mb-1`}>{item.cond}</div>
                      <div className="text-sm font-semibold leading-tight text-foreground">{item.action}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <Calculator className="w-6 h-6 text-primary" />
                  The Scoring Formula
                </CardTitle>
                <CardDescription>Visualising the impact of Subject Code 101 marking.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/30 p-6 rounded-2xl border shadow-sm">
                  <div className="space-y-3 text-sm font-mono">
                    <div className="flex justify-between border-b pb-2 text-emerald-600 font-bold">
                      <span>50 Correct, 0 Wrong</span>
                      <span>= 250 Marks</span>
                    </div>
                    <div className="flex justify-between border-b pb-2 text-amber-600 font-bold">
                      <span>45 Correct, 5 Wrong</span>
                      <span>= 220 Marks</span>
                    </div>
                    <div className="flex justify-between border-b pb-2 text-orange-600 font-bold">
                      <span>40 Correct, 10 Wrong</span>
                      <span>= 190 Marks</span>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground italic flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-orange-500" />
                    Every wrong attempt costs you real momentum. Use the "Trap Decoder" in modules to stay sharp.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-bold">
                  <ListOrdered className="w-6 h-6 text-primary" />
                  Optimal 60-Min Timeline
                </CardTitle>
                <CardDescription>Battle-tested allocation for the English paper.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {timePlan.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-muted/30 transition-colors shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                          {i + 1}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-foreground">{item.section}</div>
                          {item.q !== "-" && <div className="text-[10px] text-muted-foreground uppercase font-bold">{item.q} Questions</div>}
                        </div>
                      </div>
                      <Badge variant="outline" className="font-mono text-primary border-primary/20 font-bold">{item.time}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-foreground text-background shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 font-bold">
                  <Target className="w-5 h-5 text-primary" />
                  Order of Operations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm font-medium">
                <ol className="space-y-3 list-decimal list-inside text-background/80">
                  <li><strong>RC:</strong> Secure the 60/60 base first.</li>
                  <li><strong>Vocab:</strong> High-speed marks for studied lists.</li>
                  <li><strong>Grammar:</strong> Logical structures; fast to solve.</li>
                  <li><strong>Match:</strong> Use elimination to avoid traps.</li>
                  <li><strong>Logic:</strong> Rearrangement takes time; save for last.</li>
                </ol>
                <div className="pt-4 border-t border-background/20 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Focus on context over memory.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Target: 50 Compulsory Correct.</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full h-14 text-lg font-bold rounded-2xl shadow-lg" asChild>
              <Link href="/quiz">Start Full Practise Set</Link>
            </Button>
          </aside>
        </div>
      </main>
    </div>
  )
}