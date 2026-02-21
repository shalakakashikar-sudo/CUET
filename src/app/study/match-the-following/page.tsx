"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Info, MessageCircle, RefreshCw, Star, Book, Sparkles, Lightbulb, Zap } from "lucide-react"
import Link from "next/link"

const IDIOMS = [
  { idiom: "At the eleventh hour", meaning: "At the very last moment." },
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

const FIGURES = [
  { name: "Simile", def: "Comparison using 'like' or 'as'.", eg: "As fast as the wind." },
  { name: "Metaphor", def: "Direct comparison without 'like' or 'as'.", eg: "Life is a journey." },
  { name: "Personification", def: "Human qualities to non-human things.", eg: "The trees whispered." },
  { name: "Hyperbole", def: "Extreme exaggeration.", eg: "Told you a million times!" },
  { name: "Oxymoron", def: "Two contradictory terms together.", eg: "Deafening silence." },
  { name: "Onomatopoeia", def: "A word that imitates the sound it describes.", eg: "The clock ticked." },
]

const HOMONYMS = [
  { w1: "Principal", m1: "Head of school", w2: "Principle", m2: "Fundamental rule" },
  { w1: "Stationery", m1: "Writing materials", w2: "Stationary", m2: "Not moving" },
  { w1: "Potable", m1: "Safe to drink", w2: "Portable", m2: "Easy to carry" },
  { w1: "Complement", m1: "Enhances", w2: "Compliment", m2: "Praise" },
  { w1: "Elicit", m1: "To draw out", w2: "Illicit", m2: "Illegal" },
  { w1: "Affect", m1: "To impact (verb)", w2: "Effect", m2: "The result (noun)" }
]

export default function MatchPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-12 animate-fade-in-up">
          <div className="flex justify-between items-start">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Section 4 (50 Marks)</Badge>
              <h1 className="text-4xl font-headline font-bold mb-4 text-foreground">Match Proficiency</h1>
              <p className="text-muted-foreground text-lg max-w-2xl">Idioms, Figures of Speech, and Homonyms. Deduction is key—start with what you are 100% certain about.</p>
            </div>
            <Button size="lg" className="rounded-2xl font-bold shadow-lg" asChild>
              <Link href="/study/match-the-following/quiz">Start Topic Quiz</Link>
            </Button>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Tabs defaultValue="idioms" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-12 bg-muted/50 p-1 rounded-xl">
                <TabsTrigger value="idioms" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary font-bold">Idioms</TabsTrigger>
                <TabsTrigger value="figures" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary font-bold">Figures</TabsTrigger>
                <TabsTrigger value="homonyms" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary font-bold">Homonyms</TabsTrigger>
              </TabsList>

              <TabsContent value="idioms" className="mt-8">
                <Card className="shadow-sm overflow-hidden rounded-2xl border-none">
                  <CardHeader className="bg-primary/5">
                    <CardTitle className="flex items-center gap-2 text-primary font-bold">
                      <MessageCircle className="w-5 h-5" />
                      Essential Idioms List
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 bg-white">
                    <Table>
                      <TableHeader className="bg-muted/30">
                        <TableRow>
                          <TableHead className="text-foreground font-bold py-4 pl-8">Idiom</TableHead>
                          <TableHead className="text-foreground font-bold">Meaning</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {IDIOMS.map((item, i) => (
                          <TableRow key={i} className="hover:bg-primary/5">
                            <TableCell className="font-bold text-primary py-4 pl-8">{item.idiom}</TableCell>
                            <TableCell className="text-xs text-muted-foreground font-medium">{item.meaning}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="figures" className="mt-8">
                <div className="grid gap-4">
                  {FIGURES.map((item, i) => (
                    <Card key={i} className="border-none shadow-sm bg-white rounded-2xl">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-primary font-bold">{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm font-medium text-foreground">{item.def}</p>
                        <p className="text-xs text-muted-foreground mt-2 italic font-bold">Example: {item.eg}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="homonyms" className="mt-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {HOMONYMS.map((item, i) => (
                    <div key={i} className="p-4 border border-secondary/20 rounded-xl bg-white shadow-sm space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-primary">{item.w1}</span>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">{item.m1}</span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-2">
                        <span className="font-bold text-secondary-foreground">{item.w2}</span>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">{item.m2}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <Card className="bg-secondary/10 border-none shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-secondary-foreground font-bold">
                  <Star className="w-5 h-5" />
                  Match Strategy
                </CardTitle>
                <CardDescription className="text-secondary-foreground/70 font-medium">Always start with the item you are MOST certain about to eliminate options.</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl shadow-sm border border-secondary/20">
                  <div className="text-xs font-bold text-primary uppercase mb-1">Step 1</div>
                  <p className="text-sm font-medium">Match the 100% known idioms/words.</p>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm border border-secondary/20">
                  <div className="text-xs font-bold text-primary uppercase mb-1">Step 2</div>
                  <p className="text-sm font-medium">Deduce remaining from remaining slots.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-foreground text-background shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center gap-2 font-bold">
                  <Lightbulb className="w-5 h-5" />
                  Strategic View
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm font-medium">
                <p>A correct match eliminates an option from the other column, making the rest easier. Accuracy is paramount.</p>
                <p className="text-primary italic">"Check both columns carefully before confirming."</p>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/50 border-border shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-foreground font-bold">Essential Proverbs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Many hands make light work",
                  "A stitch in time saves nine",
                  "Don't judge a book by its cover",
                  "Every cloud has a silver lining"
                ].map((p, i) => (
                  <div key={i} className="flex gap-2 text-xs font-bold text-foreground/80">
                    <Sparkles className="w-3 h-3 text-primary shrink-0 mt-0.5" />
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
