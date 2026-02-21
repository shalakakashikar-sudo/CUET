"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertTriangle, Book, HelpCircle, ArrowRight, Table } from "lucide-react"

const PASSAGE_TYPES = [
  { type: "Factual / Informational", desc: "Based on facts, data, or info.", examples: "Stoicism, Tiger population, Indian handicrafts." },
  { type: "Narrative / Literary", desc: "A story told by a narrator; character-driven.", examples: "Arjun in Varanasi, cooking experiences." },
  { type: "Discursive / Argumentative", desc: "Presents a point of view or contrast.", examples: "Einstein & Hiroshima bombing, Social media regulation." }
]

const QUESTION_TYPES = [
  { name: "Central Idea / Theme", where: "Read FIRST and LAST paragraph carefully.", trap: "Options that describe only ONE paragraph." },
  { name: "Specific Information", where: "Scan using keywords; verify from exact line.", trap: "Facts from real life NOT stated in passage." },
  { name: "Contextual Meaning", where: "Read 2 sentences BEFORE and AFTER word.", trap: "Dictionary meaning vs passage intent." },
  { name: "Inference / Evaluation", where: "Read tone and descriptive adjectives.", trap: "Extreme words (always, never, all)." }
]

const STEPS = [
  "Read all 4 questions FIRST (30 sec). Know what to look for.",
  "Read only FIRST and LAST line of each paragraph (90 sec) to find skeleton.",
  "Answer SPECIFIC INFO questions. Verify from the exact line.",
  "Answer WORD MEANING questions by reading around the word.",
  "Answer INFERENCE and CENTRAL IDEA last."
]

export default function RCPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-12 animate-fade-in-up">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Section 2 (60 Marks)</Badge>
          <h1 className="text-4xl font-headline font-bold mb-4 text-foreground">Reading Comprehension</h1>
          <p className="text-muted-foreground text-lg">Master the art of extracting answers from 3 passages and 12 total questions.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Tabs defaultValue="approach" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-12 bg-muted/50 p-1 rounded-xl">
                <TabsTrigger value="approach" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary">5-Step Method</TabsTrigger>
                <TabsTrigger value="types" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary">4 Question Types</TabsTrigger>
                <TabsTrigger value="traps" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary">Trap Decoder</TabsTrigger>
              </TabsList>

              <TabsContent value="approach" className="mt-8 space-y-6">
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <Book className="w-5 h-5" />
                      The 5-Step RC Approach
                    </CardTitle>
                    <CardDescription className="text-foreground/70">Follow this order to save time and reduce errors.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {STEPS.map((step, i) => (
                      <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-primary/10 shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">{i+1}</div>
                        <p className="text-sm font-medium leading-relaxed text-foreground">{step}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="types" className="mt-8">
                <div className="grid gap-6">
                  {QUESTION_TYPES.map((type, i) => (
                    <Card key={i} className="shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-lg text-foreground">{type.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm text-foreground/80">
                        <p><strong className="text-foreground">Where to look:</strong> {type.where}</p>
                        <p className="text-muted-foreground"><strong className="text-foreground">Common Trap:</strong> {type.trap}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="traps" className="mt-8">
                <div className="space-y-4">
                  {[
                    { label: "Too Specific", desc: "Correct for one paragraph, not the whole passage." },
                    { label: "Too Broad", desc: "Makes huge sweeping claims beyond the text." },
                    { label: "True but NOT in passage", desc: "Rule: CUET RC answers must be directly supported by passage text." },
                    { label: "Opposite Meaning", desc: "States the reverse of the passage." },
                    { label: "Partially Correct", desc: "First half is right, second half is wrong." }
                  ].map((trap, i) => (
                    <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-destructive/5 border border-destructive/10">
                      <AlertTriangle className="w-6 h-6 text-destructive shrink-0" />
                      <div>
                        <h4 className="font-bold text-destructive mb-1">{trap.label}</h4>
                        <p className="text-sm text-muted-foreground">{trap.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <aside className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-secondary/20 border-secondary/30 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-secondary-foreground">Passage Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {PASSAGE_TYPES.map((p, i) => (
                  <div key={i} className="space-y-1">
                    <div className="font-bold text-secondary-foreground">{p.type}</div>
                    <p className="text-xs text-muted-foreground">{p.desc}</p>
                    <p className="text-[10px] uppercase font-bold text-secondary-foreground/60 tracking-tighter">EG: {p.examples}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-foreground text-background shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Golden Rule
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm italic leading-relaxed text-background/90">
                "If the passage didn't say it, it's wrong -- no matter how true it seems in real life."
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}
