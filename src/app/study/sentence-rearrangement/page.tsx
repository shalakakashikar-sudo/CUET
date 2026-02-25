
"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Layers, ListOrdered, CheckCircle2, ChevronRight, Target, Lightbulb, TrendingUp, Zap, Split } from "lucide-react"
import Link from "next/link"
import { ModuleNavigator } from "@/components/study/ModuleNavigator"

export default function SentenceRearrangementPage() {
  const patterns = [
    { pattern: "Setting → Subject → Action", eg: "As the storm approached, / the fishermen / prepared to return." },
    { pattern: "Problem → Cause → Purpose", eg: "Due to rising pollution / in major cities / the government launched a drive." },
    { pattern: "Character → State → Action", eg: "Feeling overwhelmed, / the young engineer / decided to take a break." },
    { pattern: "Condition → Constraint → Result", eg: "Unless we act now, / despite the risks, / we shall face failure." }
  ]

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-12 animate-fade-in-up">
          <div className="flex justify-between items-start">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Section 6 (40 Marks)</Badge>
              <h1 className="text-4xl font-headline font-bold mb-4 text-foreground">Sequential Logic Mastery</h1>
              <p className="text-muted-foreground text-lg max-w-2xl">Master the slowest section of the exam with clinical precision. In Subject Code 101, logical flow is the key to 40/40.</p>
            </div>
            <Button size="lg" className="rounded-2xl font-bold shadow-lg" asChild>
              <Link href="/study/sentence-rearrangement/quiz">Start Elite Quiz</Link>
            </Button>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Card className="border-none shadow-sm bg-primary/5 rounded-[2rem]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary text-2xl font-bold">
                  <ListOrdered className="w-6 h-6" />
                  The 3-Step Clinical Protocol
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { step: "Find the Opening Hook", desc: "Identify phrases that establish context or introduce a noun. Avoid segments starting with 'He', 'It', or 'But' unless the noun is already established." },
                  { step: "Relative Pronoun Bridge", desc: "Link segments using 'Who', 'Which', or 'That'. These usually follow immediately after the noun they describe." },
                  { step: "Option Elimination", desc: "Filter choices by the opener. In CUET, finding the first and last segments often eliminates 3 out of 4 options immediately." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start p-5 bg-white rounded-2xl border border-primary/10 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg shrink-0">{i+1}</div>
                    <div>
                      <h4 className="font-bold text-foreground text-lg">{item.step}</h4>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-muted/30 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
                  <Split className="w-6 h-6 text-secondary-foreground" />
                  Connector Logic Table
                </CardTitle>
                <CardDescription>Segments starting with these have specific placement rules.</CardDescription>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border">
                  <div className="text-[10px] font-bold text-destructive uppercase mb-2">Never at Start</div>
                  <ul className="text-sm space-y-1 font-bold text-muted-foreground">
                    <li>- However / Nevertheless</li>
                    <li>- Therefore / Consequently</li>
                    <li>- Moreover / Furthermore</li>
                    <li>- In addition to this</li>
                  </ul>
                </div>
                <div className="p-4 bg-white rounded-xl border">
                  <div className="text-[10px] font-bold text-green-600 uppercase mb-2">Often at Start</div>
                  <ul className="text-sm space-y-1 font-bold text-muted-foreground">
                    <li>- Although / Despite</li>
                    <li>- Since / Because</li>
                    <li>- Given that...</li>
                    <li>- In the wake of...</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <section className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                <Layers className="w-6 h-6 text-primary" />
                Advanced Structural Patterns
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {patterns.map((p, i) => (
                  <Card key={i} className="border-none shadow-sm bg-white rounded-2xl">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs font-bold uppercase tracking-wider text-primary">{p.pattern}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mb-2">Example</p>
                      <p className="text-sm leading-relaxed italic text-foreground font-bold">{p.eg}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <ModuleNavigator />

            <Card className="bg-foreground text-background shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center gap-2 font-bold">
                  <TrendingUp className="w-5 h-5" />
                  Pattern Decoding
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm font-medium">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <p>Pronoun Reference: 'He' must follow a specific name segment.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <p>Acronym Rule: Full form (World Health Org) comes before Acronym (WHO).</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <p>Chronology: Past events lead into Present analysis.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-secondary/30 bg-secondary/10 shadow-sm rounded-2xl bg-white">
              <CardHeader>
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-secondary-foreground">
                  <Target className="w-4 h-4" />
                  Elite Pro Tip
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs leading-relaxed text-secondary-foreground/80 font-bold">
                Logic is always embedded in the options. Don't arrange the segments in your head from scratch—test the provided sequences to save 30 seconds per item.
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}
