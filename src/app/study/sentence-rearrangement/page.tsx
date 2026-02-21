
"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Layers, ListOrdered, CheckCircle2, ChevronRight } from "lucide-react"

export default function SentenceRearrangementPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-12">
          <Badge className="mb-4">Sentence Logic (40 Marks)</Badge>
          <h1 className="text-4xl font-headline font-bold mb-4">Sentence Rearrangement</h1>
          <p className="text-muted-foreground text-lg">Master the sequence of events and the subject-verb core logic.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ListOrdered className="w-6 h-6 text-primary" />
                  The 3-Step Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { step: "Find the Opener", desc: "Look for introductory phrases starting with 'As', 'When', 'Although', 'Despite'." },
                  { step: "Find Subject-Verb Core", desc: "Identify who is doing the action. This usually follows the opener." },
                  { step: "Eliminate via Options", desc: "Use the first part to eliminate 2 wrong answer choices immediately." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start p-4 bg-white rounded-xl border">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center font-bold text-sm shrink-0">{i+1}</div>
                    <div>
                      <h4 className="font-bold text-primary-foreground">{item.step}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <section className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Layers className="w-6 h-6 text-primary" />
                Common Sentence Patterns
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { pattern: "Setting → Subject → Action → Result", eg: "As the storm approached, / the fishermen / prepared to return / to protect their boats." },
                  { pattern: "Problem → Cause → Solution → Purpose", eg: "Due to rising pollution / in the major cities / the government launched a drive / to plant trees." }
                ].map((p, i) => (
                  <Card key={i} className="border-none shadow-sm bg-muted/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{p.pattern}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Example</p>
                      <p className="text-xs leading-relaxed italic">{p.eg}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <Card className="bg-foreground text-background">
              <CardHeader>
                <CardTitle className="text-lg">Pattern Decoding</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <p>Connectors like "However", "Therefore", and "Thus" never start a sentence.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <p>Look for pronouns (He, She, It, They) and find the noun they refer to first.</p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}
