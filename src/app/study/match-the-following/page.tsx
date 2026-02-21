
"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Info, MessageCircle, RefreshCw, Star } from "lucide-react"

const IDIOMS = [
  { idiom: "At the eleventh hour", meaning: "At the very last possible moment." },
  { idiom: "Let the bygones be bygones", meaning: "To forget past mistakes or arguments." },
  { idiom: "Steal someone's thunder", meaning: "To take attention or credit away from someone." },
  { idiom: "Bite the bullet", meaning: "To endure a difficult situation with courage." },
  { idiom: "Turn a blind eye", meaning: "To deliberately ignore something wrong." },
]

const FIGURES = [
  { name: "Simile", def: "Comparison using 'like' or 'as'.", eg: "As fast as the wind." },
  { name: "Metaphor", def: "Direct comparison without 'like' or 'as'.", eg: "Life is a journey." },
  { name: "Oxymoron", def: "Two contradictory terms together.", eg: "Deafening silence." },
  { name: "Hyperbole", def: "Extreme exaggeration.", eg: "Told you a million times!" },
]

export default function MatchTheFollowingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-12">
          <Badge className="mb-4">Vocabulary Module</Badge>
          <h1 className="text-4xl font-headline font-bold mb-4">Idioms & Figures of Speech</h1>
          <p className="text-muted-foreground text-lg">Master the art of matching Column A to Column B with precision.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="idioms" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-12">
                <TabsTrigger value="idioms">Essential Idioms</TabsTrigger>
                <TabsTrigger value="figures">Figures of Speech</TabsTrigger>
              </TabsList>

              <TabsContent value="idioms" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      Idioms Master List
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Idiom</TableHead>
                          <TableHead>Meaning</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {IDIOMS.map((item, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-bold text-primary-foreground">{item.idiom}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{item.meaning}</TableCell>
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
                    <Card key={i} className="border-none shadow-sm bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-primary-foreground">{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm font-medium">{item.def}</p>
                        <p className="text-xs text-muted-foreground mt-1">Example: <span className="italic">{item.eg}</span></p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <Card className="bg-secondary/10 border-none">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="w-5 h-5 text-secondary-foreground" />
                  Homonyms Trap
                </CardTitle>
                <CardDescription>Sound the same, mean something different.</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-2 border rounded bg-white">
                  <span className="font-bold">Potable:</span> Safe to drink<br/>
                  <span className="font-bold">Portable:</span> Easy to carry
                </div>
                <div className="p-2 border rounded bg-white">
                  <span className="font-bold">Stationary:</span> Not moving<br/>
                  <span className="font-bold">Stationery:</span> Writing materials
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6">
            <Card className="bg-foreground text-background">
              <CardHeader>
                <CardTitle className="text-lg">Matching Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <RefreshCw className="w-5 h-5 shrink-0 text-primary" />
                  <p>Start with the item you are <strong>MOST certain</strong> about.</p>
                </div>
                <div className="flex gap-3">
                  <Info className="w-5 h-5 shrink-0 text-primary" />
                  <p>A correct match eliminates that option, making the rest easier to solve by deduction.</p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}
