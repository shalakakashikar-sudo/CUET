"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Layers, ListOrdered, CheckCircle2, ChevronRight, Target } from "lucide-react"

export default function SentenceRearrangementPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-12 animate-fade-in-up">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Section 6 (40 Marks)</Badge>
          <h1 className="text-4xl font-headline font-bold mb-4 text-foreground">Sentence Rearrangement</h1>
          <p className="text-muted-foreground text-lg">The 3-Step Method: Master sequence and logic for the slowest section of the exam.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <ListOrdered className="w-6 h-6" />
                  The 3-Step Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { step: "Find the Opener", desc: "Look for introductory phrases starting with 'As', 'When', 'Although', 'Despite'." },
                  { step: "Find Subject-Verb Core", desc: "Identify who is doing the action. This usually follows the opener." },
                  { step: "Eliminate via Options", desc: "Once you know the first part, 2 answer choices are immediately wrong." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start p-4 bg-white rounded-xl border border-primary/10 shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">{i+1}</div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm">{item.step}</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-tight">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <section className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                <Layers className="w-6 h-6 text-primary" />
                Common Sentence Patterns
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { pattern: "Setting → Subject → Action", eg: "As the storm approached, / the fishermen / prepared to return." },
                  { pattern: "Problem → Cause → Solution", eg: "Due to rising pollution / in major cities / the government launched a drive." },
                  { pattern: "Character → Internal State → Action", eg: "Feeling overwhelmed, / the young engineer / decided to take a break." }
                ].map((p, i) => (
                  <Card key={i} className="border-none shadow-sm bg-muted/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-primary">{p.pattern}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Example</p>
                      <p className="text-xs leading-relaxed italic text-foreground/80">{p.eg}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-foreground text-background shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Pattern Decoding</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-background/80">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p>Connectors like "However", "Therefore", and "Thus" never start a sentence.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p>Look for pronouns (He, She, It) and find the noun they refer to first.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-secondary/30 bg-secondary/10 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-secondary-foreground">
                  <Target className="w-4 h-4 text-secondary-foreground" />
                  Pro Tip
                </CardTitle>
              </CardHeader>
              <CardContent className="text-[10px] leading-relaxed text-secondary-foreground/80">
                Sentence Rearrangement is often the most time-consuming. Save it for last and use elimination to move faster.
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}
