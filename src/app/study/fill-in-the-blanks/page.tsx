"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Clock, Split, PenTool, Zap, CheckCircle2, Lightbulb, ArrowRight, Table as TableIcon, BookOpen, Layers, Info } from "lucide-react"
import Link from "next/link"
import { ModuleNavigator } from "@/components/study/ModuleNavigator"

const FIXED_PREPOSITIONS = [
  { w: "Abstain", p: "from", m: "To refrain from something" },
  { w: "Accede", p: "to", m: "To agree to a request/proposal" },
  { w: "Accustomed", p: "to", m: "Familiar with something" },
  { w: "Acquitted", p: "of", m: "Found not guilty" },
  { w: "Adjacent", p: "to", m: "Next to" },
  { w: "Afflicted", p: "with", m: "Suffering from" },
  { w: "Amenable", p: "to", m: "Open to suggestion" },
  { w: "Apprise", p: "of", m: "To inform someone" },
  { w: "Avail", p: "of", m: "To take advantage of" },
  { w: "Beware", p: "of", m: "Be cautious" },
  { w: "Comply", p: "with", m: "To follow rules" },
  { w: "Conducive", p: "to", m: "Making a certain outcome likely" },
  { w: "Contrary", p: "to", m: "Opposite to" },
  { w: "Deprive", p: "of", m: "To take away from" },
  { w: "Eligible", p: "for", m: "Qualified for" },
  { w: "Enamoured", p: "of", m: "In love with" },
  { w: "Endowed", p: "with", m: "Provided with a quality" },
  { w: "Infested", p: "with", m: "Full of (usually pests)" },
  { w: "Injurious", p: "to", m: "Harmful to" },
  { w: "Insist", p: "on", m: "Demand something" },
  { w: "Jealous", p: "of", m: "Envious" },
  { w: "Prior", p: "to", m: "Before" },
  { w: "Proficient", p: "in", m: "Skilled in" },
  { w: "Relevant", p: "to", m: "Connected to" },
  { w: "Senior", p: "to", m: "Higher in rank" },
  { w: "Superior", p: "to", m: "Better than" },
  { w: "Sympathy", p: "for", m: "Feeling of pity" },
  { w: "Yield", p: "to", m: "Give way to" }
].sort((a, b) => a.w.localeCompare(b.w));

const PHRASAL_VERBS = [
  { v: "Abide by", m: "Respect or obey a rule/decision" },
  { v: "Back out", m: "Withdraw from a commitment" },
  { v: "Bear with", m: "Be patient with someone" },
  { v: "Break down", m: "Stop functioning" },
  { v: "Break into", m: "Enter by force" },
  { v: "Break out", m: "Start suddenly (war, fire)" },
  { v: "Bring about", m: "Cause to happen" },
  { v: "Bring up", m: "Mention a topic / Raise a child" },
  { v: "Call off", m: "Cancel" },
  { v: "Carry out", m: "Execute or perform" },
  { v: "Come across", m: "Find by chance" },
  { v: "Cut down", m: "Reduce consumption" },
  { v: "Do away with", m: "Abolish" },
  { v: "Fall out", m: "Quarrel" },
  { v: "Get over", m: "Recover from" },
  { v: "Give up", m: "Stop trying" },
  { v: "Look into", m: "Investigate" },
  { v: "Look up to", m: "Respect" },
  { v: "Make out", m: "Understand" },
  { v: "Put off", m: "Postpone" },
  { v: "Put up with", m: "Tolerate" },
  { v: "Run out of", m: "Have none left" },
  { v: "Set off", m: "Start a journey" },
  { v: "Take after", m: "Resemble a relative" },
  { v: "Turn down", m: "Reject" }
].sort((a, b) => a.v.localeCompare(b.v));

export default function FillersPage() {
  const tenses = [
    { name: "Past Perfect", use: "Action before another past action.", formula: "had + V3", signal: "By the time, Before" },
    { name: "No Sooner...Than", use: "Fixed immediate sequence structure.", formula: "No sooner did ... than ...", signal: "Always THAN (never when)" },
    { name: "First Conditional", use: "Real situation / probable result.", formula: "If + present, ... will + base", signal: "No 'will' in if-clause" },
    { name: "Second Conditional", use: "Hypothetical / imaginary situation.", formula: "If + past, ... would + base", signal: "Use 'were' (not was)" },
    { name: "Subject-Verb (Each/Every)", use: "Singular verb for distributive subjects.", formula: "Each of the + Plural Noun + Singular Verb", signal: "Each of the boys WAS (not were)" }
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="mb-12 animate-fade-in-up">
          <div className="flex justify-between items-start">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Section 5 (50 Marks)</Badge>
              <h1 className="text-4xl font-headline font-bold mb-4 text-foreground">Syntactic Precision</h1>
              <p className="text-muted-foreground text-lg max-w-2xl">Grammar meets context. Tenses, fixed prepositions, and phrasal verbs are the pillars of Section 5. Master these clinical patterns to secure 50/50 marks.</p>
            </div>
            <Button size="lg" className="rounded-2xl font-bold shadow-lg" asChild>
              <Link href="/study/fill-in-the-blanks/quiz">Start Topic Quiz</Link>
            </Button>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Tabs defaultValue="tenses" className="w-full">
              <TabsList className="grid w-full grid-cols-4 h-12 bg-muted/50 p-1 rounded-xl">
                <TabsTrigger value="tenses" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary font-bold">Tense Matrix</TabsTrigger>
                <TabsTrigger value="prepositions" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary font-bold">Prepositions</TabsTrigger>
                <TabsTrigger value="phrasal" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary font-bold">Phrasal Verbs</TabsTrigger>
                <TabsTrigger value="determiners" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary font-bold">Determiners</TabsTrigger>
              </TabsList>

              <TabsContent value="tenses" className="mt-8 space-y-6">
                <Card className="border-none shadow-sm bg-primary/5 rounded-[2rem]">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <Badge variant="outline" className="rounded-full bg-white text-primary border-primary/20 font-bold">Tense & Syntax Map</Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold">The High-Yield Structures</CardTitle>
                    <CardDescription className="text-primary/70 font-medium">Core rules that appear in almost every CUET paper.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    {tenses.map((tense, i) => (
                      <div key={i} className="p-5 bg-white rounded-2xl border border-primary/10 shadow-sm hover:border-primary/30 transition-colors">
                        <div className="font-bold mb-1 text-primary text-lg">{tense.name}</div>
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed font-bold">{tense.use}</p>
                        <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                          <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20">{tense.formula}</span>
                          <span className="bg-secondary/20 text-secondary-foreground px-3 py-1.5 rounded-full border border-secondary/20">CLUE: {tense.signal}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <section className="grid md:grid-cols-2 gap-6">
                  <Card className="border-none shadow-sm bg-muted/30 rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                        <Split className="w-5 h-5 text-secondary-foreground" />
                        Conjunction Logic
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="font-bold mb-1 text-secondary-foreground text-xs uppercase">CONTRAST</div>
                        <p className="text-xs text-muted-foreground font-bold italic">Despite (noun) vs Although (clause)</p>
                      </div>
                      <div>
                        <div className="font-bold mb-1 text-secondary-foreground text-xs uppercase">REASON</div>
                        <p className="text-xs text-muted-foreground font-bold italic">Because (reason) vs Therefore (result)</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-sm bg-muted/30 rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                        <PenTool className="w-5 h-5 text-primary" />
                        Adverb Tone Clues
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="font-bold mb-1 text-primary text-[10px] uppercase">Care / Attention</div>
                        <p className="font-bold text-xs">Meticulously, Diligently, Attentively</p>
                      </div>
                      <div>
                        <div className="font-bold mb-1 text-primary text-[10px] uppercase">Speed / Haste</div>
                        <p className="font-bold text-xs">Hastily, Rapidly, Briskly</p>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              </TabsContent>

              <TabsContent value="prepositions" className="mt-8">
                <Card className="shadow-sm overflow-hidden rounded-[2rem] border-none">
                  <CardHeader className="bg-primary/5">
                    <CardTitle className="flex items-center gap-2 text-primary font-bold">
                      <TableIcon className="w-5 h-5" />
                      Fixed Prepositions Repository
                    </CardTitle>
                    <CardDescription className="text-primary/70 font-medium">80+ Essential pairs for Subject Code 101.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 bg-white">
                    <ScrollArea className="h-[600px]">
                      <Table>
                        <TableHeader className="bg-muted/30 sticky top-0 z-10">
                          <TableRow>
                            <TableHead className="text-foreground font-bold py-4 pl-8">Word</TableHead>
                            <TableHead className="text-foreground font-bold text-primary">+ Preposition</TableHead>
                            <TableHead className="text-foreground font-bold">Context / Meaning</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {FIXED_PREPOSITIONS.map((item, i) => (
                            <TableRow key={i} className="hover:bg-primary/5 transition-colors">
                              <TableCell className="font-bold text-foreground py-4 pl-8">{item.w}</TableCell>
                              <TableCell className="font-bold text-primary">{item.p}</TableCell>
                              <TableCell className="text-xs text-muted-foreground font-medium pr-8">{item.m}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="phrasal" className="mt-8">
                <Card className="shadow-sm overflow-hidden rounded-[2rem] border-none">
                  <CardHeader className="bg-secondary/10">
                    <CardTitle className="flex items-center gap-2 text-secondary-foreground font-bold">
                      <Layers className="w-5 h-5" />
                      Elite Phrasal Verbs
                    </CardTitle>
                    <CardDescription className="text-secondary-foreground/70 font-medium">Common combinations used in fillers.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 bg-white">
                    <ScrollArea className="h-[600px]">
                      <div className="grid md:grid-cols-2 gap-px bg-border">
                        {PHRASAL_VERBS.map((item, i) => (
                          <div key={i} className="p-5 bg-white space-y-2 hover:bg-secondary/5 transition-colors border-b last:border-0 md:border-r">
                            <div className="font-bold text-secondary-foreground text-lg">{item.v}</div>
                            <div className="text-xs text-muted-foreground font-medium uppercase tracking-widest">{item.m}</div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="determiners" className="mt-8">
                <div className="grid gap-6">
                  {[
                    { title: "Few vs A Few vs The Few", content: "Few (Hardly any - negative), A Few (Some - positive), The Few (Not many but all of them - specific)." },
                    { title: "Little vs A Little vs The Little", content: "Used for uncountable nouns. Follows the same negative/positive/specific logic as 'Few'." },
                    { title: "Each vs Every", content: "Each (Distributive - individual focus), Every (Collective focus). Both take a SINGULAR verb." },
                    { title: "Either/Or & Neither/Nor", content: "Verb agrees with the subject CLOSEST to it. Example: Neither the principal nor the teachers ARE here." }
                  ].map((rule, i) => (
                    <Card key={i} className="border-none shadow-sm bg-white rounded-2xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="bg-accent/10 p-2 rounded-xl text-accent">
                          <Info className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-foreground mb-2">{rule.title}</h4>
                          <p className="text-sm text-muted-foreground font-medium leading-relaxed">{rule.content}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <aside className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <ModuleNavigator />

            <Card className="bg-foreground text-background shadow-xl rounded-2xl relative overflow-hidden">
              <div className="absolute right-0 top-0 p-4 opacity-10">
                <Lightbulb className="w-12 h-12 text-primary" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center gap-2 font-bold">
                  <Lightbulb className="w-5 h-5" />
                  The Prime Rule
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed font-bold italic text-background/80">
                "Identify the logical relationship first. Never look at options before understanding the sentence core. 70% of fillers are solved by identifying the fixed preposition."
              </CardContent>
            </Card>

            <Card className="bg-white border-primary/20 rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-bold text-foreground">Fixed Combinations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-[10px] font-bold">
                {[
                  "In accordance with",
                  "In the light of",
                  "At the eleventh hour",
                  "Beyond expectations",
                  "With a view to (+ gerund)",
                  "Prior to",
                  "On behalf of"
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 border border-primary/10 rounded-lg bg-white shadow-sm hover:bg-primary/5 transition-colors">
                    <CheckCircle2 className="w-3 h-3 text-primary" />
                    <span className="uppercase text-muted-foreground">{s}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button className="w-full h-14 rounded-2xl font-bold shadow-lg text-lg" asChild>
              <Link href="/quiz">Start Full Practise Set</Link>
            </Button>
          </aside>
        </div>
      </main>
    </div>
  )
}
