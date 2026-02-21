
"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Split, PenTool, Zap, CheckCircle2, Lightbulb, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function FillersPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-12 animate-fade-in-up">
          <div className="flex justify-between items-start">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Section 5 (50 Marks)</Badge>
              <h1 className="text-4xl font-headline font-bold mb-4 text-foreground">Fill in the Blanks</h1>
              <p className="text-muted-foreground text-lg max-w-2xl">Grammar meets context. Tenses, conjunctions, and prepositions are the heavy hitters in Code 101.</p>
            </div>
            <Button size="lg" className="rounded-2xl font-bold shadow-lg" asChild>
              <Link href="/study/fill-in-the-blanks/quiz">Start Topic Quiz</Link>
            </Button>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Card className="border-none shadow-sm bg-primary/5 rounded-[2rem]">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <Badge variant="outline" className="rounded-full bg-white text-primary border-primary/20">Tense Master Guide</Badge>
                </div>
                <CardTitle className="text-2xl font-bold">The Most Tested Structures</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {[
                  { name: "Past Perfect", use: "ONE past action BEFORE another past action.", formula: "had + V3", signal: "By the time, Before" },
                  { name: "No Sooner...Than", use: "Immediate sequence. Fixed structure.", formula: "No sooner did ... than ...", signal: "Always THAN (never when)" },
                  { name: "First Conditional", use: "Real situation/probable result.", formula: "If + present, ... will + base", signal: "No 'will' in if-clause" },
                  { name: "Second Conditional", use: "Imaginary/Hypothetical situation.", formula: "If + past, ... would + base", signal: "Use 'were' (not was)" }
                ].map((tense, i) => (
                  <div key={i} className="p-5 bg-white rounded-2xl border border-primary/10 shadow-sm">
                    <div className="font-bold mb-1 text-primary text-lg">{tense.name}</div>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed font-medium">{tense.use}</p>
                    <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                      <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20">{tense.formula}</span>
                      <span className="bg-secondary/20 text-secondary-foreground px-3 py-1.5 rounded-full border border-secondary/20">SIGNAL: {tense.signal}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <section className="grid md:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm bg-muted/30 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Split className="w-5 h-5 text-secondary-foreground" />
                    Conjunctions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="font-bold mb-1 text-secondary-foreground text-sm">CONTRAST</div>
                    <p className="text-xs text-muted-foreground font-medium italic">Despite (noun) vs Although (clause)</p>
                  </div>
                  <div>
                    <div className="font-bold mb-1 text-secondary-foreground text-sm">REASON & RESULT</div>
                    <p className="text-xs text-muted-foreground font-medium italic">Because (reason) vs Therefore (result)</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-muted/30 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <PenTool className="w-5 h-5 text-primary" />
                    Adverb Clues
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="font-bold mb-1 text-primary text-sm uppercase text-[10px]">Care/Attention</div>
                    <p className="font-bold text-xs">Meticulously, Diligently, Attentively</p>
                  </div>
                  <div>
                    <div className="font-bold mb-1 text-primary text-sm uppercase text-[10px]">Speed/Haste</div>
                    <p className="font-bold text-xs">Hastily, Rapidly, Briskly</p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          <aside className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-foreground text-background shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  The Golden Rule
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed font-bold italic">
                "Read the WHOLE sentence first. Find the CLUE word that tells you what the answer should be. NEVER look at options first."
              </CardContent>
            </Card>

            <Card className="bg-secondary/10 border-none rounded-2xl">
              <CardHeader>
                <CardTitle className="text-sm font-bold">Fixed Prepositions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-[10px] font-bold">
                {[
                  "at the eleventh hour",
                  "beyond expectations",
                  "in retrospect",
                  "in accordance with",
                  "on behalf of",
                  "in spite of"
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 border border-secondary/20 rounded-lg bg-white shadow-sm">
                    <CheckCircle2 className="w-3 h-3 text-secondary-foreground" />
                    <span className="uppercase">{s}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}
