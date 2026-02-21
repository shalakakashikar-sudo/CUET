"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Info, MessageCircle, RefreshCw, Star, Book, Sparkles } from "lucide-react"

const IDIOMS = [
  { idiom: "At the eleventh hour", meaning: "At the very last possible moment." },
  { idiom: "Let the bygones be bygones", meaning: "To forget past mistakes or arguments." },
  { idiom: "Add fuel to the fire", meaning: "To make an already bad situation worse." },
  { idiom: "Kill two birds with one stone", meaning: "Accomplish two things with a single action." },
  { idiom: "Beat around the bush", meaning: "Avoid talking about the main issue directly." },
  { idiom: "Hit the nail on the head", meaning: "To be precisely correct." },
  { idiom: "Once in a blue moon", meaning: "Very rarely; almost never." },
  { idiom: "Bite the bullet", meaning: "Endure a painful situation with courage." },
  { idiom: "Spill the beans", meaning: "To reveal secret information." },
  { idiom: "Under the weather", meaning: "Feeling slightly ill." },
]

const PHRASAL_VERBS = [
  { pv: "Put up with", m: "To tolerate or endure." },
  { pv: "Run out of", m: "To have no more left." },
  { pv: "Get away with", m: "To escape consequences." },
  { pv: "Call off", m: "To cancel." },
  { pv: "Look down on", m: "To regard with disdain." },
  { pv: "Come up with", m: "To produce an idea or plan." },
  { pv: "Take after", m: "To resemble a parent/relative." },
  { pv: "Ward off", m: "To prevent something unpleasant." },
]

const FIGURES = [
  { name: "Simile", def: "Comparison using 'like' or 'as'.", eg: "As fast as the wind." },
  { name: "Metaphor", def: "Direct comparison without 'like' or 'as'.", eg: "Life is a journey." },
  { name: "Personification", def: "Human qualities to non-human things.", eg: "The trees whispered." },
  { name: "Hyperbole", def: "Extreme exaggeration.", eg: "Told you a million times!" },
  { name: "Oxymoron", def: "Two contradictory terms together.", eg: "Deafening silence." },
  { name: "Onomatopoeia", def: "Word that imitates sound.", eg: "The bees buzzed." },
]

export default function MatchTheFollowingPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-12 animate-fade-in-up">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Section 4 (50 Marks)</Badge>
          <h1 className="text-4xl font-headline font-bold mb-4 text-foreground">Match the Following</h1>
          <p className="text-muted-foreground text-lg">Idioms, Phrasal Verbs, and Figures of Speech: Master Column A to Column B.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Tabs defaultValue="idioms" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-12 bg-muted/50 p-1 rounded-xl">
                <TabsTrigger value="idioms" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary">Idioms</TabsTrigger>
                <TabsTrigger value="phrasal" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary">Phrasal Verbs</TabsTrigger>
                <TabsTrigger value="figures" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary">Figures</TabsTrigger>
              </TabsList>

              <TabsContent value="idioms" className="mt-8">
                <Card className="shadow-sm overflow-hidden">
                  <CardHeader className="bg-primary/5">
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <MessageCircle className="w-5 h-5" />
                      Idioms Master List
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-muted/30">
                        <TableRow>
                          <TableHead className="text-foreground font-bold">Idiom</TableHead>
                          <TableHead className="text-foreground font-bold">Meaning</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {IDIOMS.map((item, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-bold text-primary text-xs">{item.idiom}</TableCell>
                            <TableCell className="text-[10px] text-muted-foreground">{item.meaning}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="phrasal" className="mt-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {PHRASAL_VERBS.map((item, i) => (
                    <div key={i} className="p-4 border border-primary/10 rounded-xl bg-white shadow-sm hover:border-primary transition-colors group">
                      <div className="font-bold text-primary text-sm group-hover:translate-x-1 transition-transform">{item.pv}</div>
                      <p className="text-xs text-muted-foreground mt-1">{item.m}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="figures" className="mt-8">
                <div className="grid gap-4">
                  {FIGURES.map((item, i) => (
                    <Card key={i} className="border-none shadow-sm bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-primary font-bold">{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[10px] font-medium leading-tight text-foreground">{item.def}</p>
                        <p className="text-[10px] text-muted-foreground mt-1 italic">Example: {item.eg}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <Card className="bg-secondary/10 border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-secondary-foreground">
                  <Star className="w-5 h-5" />
                  Homonyms Trap
                </CardTitle>
                <CardDescription className="text-secondary-foreground/70">Words that sound same, mean different.</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4 text-[10px] font-mono text-foreground">
                <div className="p-3 border border-secondary/20 rounded bg-white shadow-sm">
                  <span className="font-bold text-primary uppercase">potable:</span> Safe to drink<br/>
                  <span className="font-bold text-primary uppercase">portable:</span> Easy to carry
                </div>
                <div className="p-3 border border-secondary/20 rounded bg-white shadow-sm">
                  <span className="font-bold text-primary uppercase">principal:</span> Head of school<br/>
                  <span className="font-bold text-primary uppercase">principle:</span> Fundamental rule
                </div>
                <div className="p-3 border border-secondary/20 rounded bg-white shadow-sm">
                  <span className="font-bold text-primary uppercase">stationery:</span> Writing materials<br/>
                  <span className="font-bold text-primary uppercase">stationary:</span> Not moving
                </div>
                <div className="p-3 border border-secondary/20 rounded bg-white shadow-sm">
                  <span className="font-bold text-primary uppercase">complement:</span> Completes/enhances<br/>
                  <span className="font-bold text-primary uppercase">compliment:</span> Praise
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-foreground text-background shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Matching Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-background/80">
                <div className="flex gap-3">
                  <RefreshCw className="w-5 h-5 shrink-0 text-primary" />
                  <p>Start with the item you are <strong>MOST certain</strong> about. Deduction is key.</p>
                </div>
                <div className="flex gap-3">
                  <Book className="w-5 h-5 shrink-0 text-primary" />
                  <p>A correct match eliminates an option, making the rest easier.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/50 border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Essential Proverbs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Many hands make light work",
                  "A stitch in time saves nine",
                  "Don't judge a book by its cover",
                  "Every cloud has a silver lining"
                ].map((p, i) => (
                  <div key={i} className="flex gap-2 text-xs font-medium text-foreground/80">
                    <Sparkles className="w-3 h-3 text-secondary-foreground shrink-0 mt-0.5" />
                    {p}
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
