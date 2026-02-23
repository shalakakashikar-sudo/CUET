"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Layers, ListOrdered, CheckCircle2, ChevronRight, Target, Lightbulb, TrendingUp } from "lucide-react"
import Link from "next/link"
import { ModuleNavigator } from "@/components/study/ModuleNavigator"

export default function SentenceRearrangementPage() {
  const patterns = [
    { pattern: "Setting → Subject → Action", eg: "As the storm approached, / the fishermen / prepared to return." },
    { pattern: "Problem → Cause → Purpose", eg: "Due to rising pollution / in major cities / the government launched a drive." },
    { pattern: "Character → State → Action", eg: "Feeling overwhelmed, / the young engineer / decided to take a break." }
  ]

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-12 animate-fade-in-up">
          <div className="flex justify-between items-start">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Section 6 (40 Marks)</Badge>
              <h1 className="text-4xl font-headline font-bold mb-4 text-foreground">Sequential Logic</h1>
              <p className="text-muted-foreground text-lg max-w-2xl">The slowest section of the exam. Master the 3-Step Method to save time and secure your perfect 250/250.</p>
            </div>
            <Button size="lg" className="rounded-2xl font-bold shadow-lg" asChild>
              <Link href="/study/sentence-rearrangement/quiz">Start Topic Quiz</Link>
            </Button>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Card className="border-none shadow-sm bg-primary/5 rounded-[2rem]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary text-2xl font-bold">
                  <ListOrdered className="w-6 h-6" />
                  The 3-Step Protocol
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { step: "Find the Opener", desc: "Look for introductory phrases starting with 'As', 'When', 'Although', 'Despite'." },
                  { step: "Locate S-V Core", desc: "Identify the main subject and action. This follows the introductory setting." },
                  { step: "Filter via Options", desc: "Once you know the opener, 2 answer choices are immediately invalidated." }
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

            <section className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                <Layers className="w-6 h-6 text-primary" />
                Proven Structural Patterns
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
                  <p>Connectors like "However" and "Therefore" never initiate a sentence.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <p>Pronouns (He, She, It) must refer to a preceding noun.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-secondary/30 bg-secondary/10 shadow-sm rounded-2xl bg-white">
              <CardHeader>
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-secondary-foreground">
                  <Target className="w-4 h-4" />
                  Elite Pro Tip
                </Target>
              </CardHeader>
              <CardContent className="text-xs leading-relaxed text-secondary-foreground/80 font-bold">
                Logic is always embedded in the options. Use elimination to accelerate your process and avoid over-thinking.
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}
