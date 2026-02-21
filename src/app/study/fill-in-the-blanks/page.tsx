"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Split, PenTool, Zap, CheckCircle2 } from "lucide-react"

export default function FillersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-12">
          <Badge className="mb-4">Section 5 (50 Marks)</Badge>
          <h1 className="text-4xl font-headline font-bold mb-4">Fill in the Blanks</h1>
          <p className="text-muted-foreground text-lg">Choosing the right word involves mastering Grammar (Tenses, Conjunctions) and Vocabulary in Context.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-primary-foreground" />
                  <Badge variant="outline">The Most Tested Area</Badge>
                </div>
                <CardTitle>Tense Master Guide</CardTitle>
                <CardDescription>Master these specific structures for Subject Code 101.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  {[
                    { name: "Past Perfect", use: "Action BEFORE another past action.", formula: "had + V3", signal: "By the time, Before" },
                    { name: "No Sooner...Than", use: "Immediate sequence of actions.", formula: "No sooner did ... than ...", signal: "Always than (never when)" },
                    { name: "First Conditional", use: "Real situation/probable result.", formula: "If + present, ... will + base", signal: "No 'will' in if-clause" },
                    { name: "Second Conditional", use: "Imaginary/Hypothetical situation.", formula: "If + past, ... would + base", signal: "If I were (not was)" }
                  ].map((tense, i) => (
                    <div key={i} className="p-4 bg-white rounded-xl border">
                      <div className="font-bold mb-1 text-primary-foreground text-sm">{tense.name}</div>
                      <p className="text-[10px] text-muted-foreground mb-2 leading-tight">{tense.use}</p>
                      <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                        <span className="bg-primary/20 px-2 py-1 rounded border border-primary/20">{tense.formula}</span>
                        <span className="bg-secondary/20 px-2 py-1 rounded border border-secondary/20">Clue: {tense.signal}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <section className="grid md:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <Split className="w-5 h-5 text-secondary-foreground" />
                    Conjunctions
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs space-y-4">
                  <div>
                    <div className="font-bold mb-1 underline decoration-secondary">Contrast</div>
                    <p className="text-muted-foreground">Despite (noun) vs Although (clause)</p>
                  </div>
                  <div>
                    <div className="font-bold mb-1 underline decoration-secondary">Reason & Result</div>
                    <p className="text-muted-foreground">Because (reason) vs Therefore (result)</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <PenTool className="w-5 h-5 text-primary-foreground" />
                    Adverb Clues
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs space-y-4">
                  <div>
                    <div className="font-bold mb-1 uppercase text-[10px] opacity-60">Care/Attention</div>
                    <p className="font-medium">Meticulously, Diligently, Attentively</p>
                  </div>
                  <div>
                    <div className="font-bold mb-1 uppercase text-[10px] opacity-60">Speed/Haste</div>
                    <p className="font-medium">Hastily, Rapidly, Briskly</p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          <aside className="space-y-6">
            <Card className="bg-foreground text-background">
              <CardHeader>
                <CardTitle className="text-lg">The Golden Rule</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed font-medium">
                "Read the WHOLE sentence first. Find the CLUE word that tells you what the answer should be. NEVER look at options first."
              </CardContent>
            </Card>

            <Card className="bg-secondary/10 border-none">
              <CardHeader>
                <CardTitle className="text-sm font-bold">Fixed Prepositions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-[10px] font-mono">
                {[
                  "at the eleventh hour",
                  "beyond expectations",
                  "in retrospect",
                  "in accordance with",
                  "on behalf of",
                  "in spite of"
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 border rounded bg-white">
                    <CheckCircle2 className="w-3 h-3 text-secondary-foreground" />
                    <span>{s}</span>
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
