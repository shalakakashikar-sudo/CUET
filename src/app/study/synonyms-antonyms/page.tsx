"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Search, Info, Zap, BookOpen } from "lucide-react"

const WORD_LIST = [
  { word: "Munificent", meaning: "Very generous", synonym: "Bountiful, Lavish", antonym: "Penurious, Stingy" },
  { word: "Sagacious", meaning: "Wise, good judgement", synonym: "Astute, Prudent", antonym: "Foolish, Naive" },
  { word: "Tenuous", meaning: "Weak, fragile", synonym: "Feeble, Flimsy", antonym: "Robust, Strong" },
  { word: "Altruistic", meaning: "Selflessly caring for others", synonym: "Benevolent, Selfless", antonym: "Selfish, Egocentric" },
  { word: "Soporific", meaning: "Causing sleepiness", synonym: "Sedative, Somnolent", antonym: "Stimulating, Invigorating" },
  { word: "Indolent", meaning: "Habitually lazy", synonym: "Slothful, Idle", antonym: "Industrious, Diligent" },
  { word: "Pernicious", meaning: "Harmful in a subtle way", synonym: "Deleterious, Noxious", antonym: "Beneficial, Salubrious" },
  { word: "Recondite", meaning: "Obscure, not widely known", synonym: "Abstruse, Esoteric", antonym: "Simple, Lucid" },
  { word: "Irascible", meaning: "Easily angered", synonym: "Choleric, Irritable", antonym: "Amiable, Placid" },
  { word: "Scintillating", meaning: "Brilliantly clever or vivid", synonym: "Glittering, Dazzling", antonym: "Dull, Tedious" },
  { word: "Dexterous", meaning: "Skilled with the hands", synonym: "Adroit, Nimble", antonym: "Clumsy, Awkward" },
  { word: "Chutzpah", meaning: "Extreme self-confidence", synonym: "Boldness, Audacity", antonym: "Timidity, Meekness" },
  { word: "Ephemeral", meaning: "Lasting a very short time", synonym: "Transient, Fleeting", antonym: "Permanent, Enduring" },
  { word: "Loquacious", meaning: "Talking a great deal", synonym: "Garrulous, Verbose", antonym: "Reticent, Taciturn" },
  { word: "Acrimonious", meaning: "Angry and bitter", synonym: "Caustic, Bitter", antonym: "Amicable, Cordial" },
  { word: "Copious", meaning: "Abundant in supply", synonym: "Plentiful, Profuse", antonym: "Scarce, Meager" },
  { word: "Prudent", meaning: "Careful and sensible", synonym: "Judicious, Discreet", antonym: "Reckless, Impulsive" },
  { word: "Ubiquitous", meaning: "Present everywhere", synonym: "Omnipresent, Pervasive", antonym: "Rare, Scarce" },
  { word: "Languish", meaning: "To grow weak", synonym: "Wither, Deteriorate", antonym: "Flourish, Thrive" },
  { word: "Zealous", meaning: "Enthusiastically devoted", synonym: "Fervent, Passionate", antonym: "Apathetic, Indifferent" },
]

export default function SynonymsAntonymsPage() {
  const [search, setSearch] = useState("")

  const filteredWords = WORD_LIST.filter(w => 
    w.word.toLowerCase().includes(search.toLowerCase()) ||
    w.meaning.toLowerCase().includes(search.toLowerCase()) ||
    w.synonym.toLowerCase().includes(search.toLowerCase()) ||
    w.antonym.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-12">
          <Badge className="mb-4">Section 3 (50 Marks)</Badge>
          <h1 className="text-4xl font-headline font-bold mb-4">Synonyms & Antonyms</h1>
          <p className="text-muted-foreground text-lg">The Master Word List: Study 8-10 words per day with their opposites.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 bg-primary rounded-lg">
                  <Search className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl">Master Word List</CardTitle>
                  <CardDescription>Search for the 50 essential CUET words.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Input 
                  placeholder="Filter by word, meaning, or synonym..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="mb-6 h-12 text-lg"
                />
                <div className="border rounded-xl overflow-hidden bg-card">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-bold">Word</TableHead>
                        <TableHead className="font-bold">Synonyms</TableHead>
                        <TableHead className="font-bold">Antonyms</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredWords.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell>
                            <div className="font-bold text-primary-foreground">{item.word}</div>
                            <div className="text-[10px] text-muted-foreground uppercase">{item.meaning}</div>
                          </TableCell>
                          <TableCell className="text-xs">{item.synonym}</TableCell>
                          <TableCell className="text-xs">{item.antonym}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <section className="grid md:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm bg-secondary/10">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-secondary-foreground" />
                    Prefix Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  {[
                    { p: "un- / in- / im-", m: "Not / Opposite" },
                    { p: "mal- / mis-", m: "Bad / Wrong" },
                    { p: "bene- / bon-", m: "Good" },
                    { p: "pre- / post-", m: "Before / After" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between border-b pb-1 last:border-0">
                      <span className="font-mono font-bold">{item.p}</span>
                      <span className="text-muted-foreground italic">{item.m}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-primary/10">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary-foreground" />
                    Suffix Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  {[
                    { s: "-ous / -ive", m: "Having quality of" },
                    { s: "-ness / -ity", m: "State of being" },
                    { s: "-ify / -ize", m: "To make or cause" },
                    { s: "-less / -ful", m: "Without / Full of" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between border-b pb-1 last:border-0">
                      <span className="font-mono font-bold">{item.s}</span>
                      <span className="text-muted-foreground italic">{item.m}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>
          </div>

          <aside className="space-y-6">
            <Card className="bg-foreground text-background">
              <CardHeader>
                <CardTitle className="text-lg">Pro Tip: Trap Decoder</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 shrink-0 text-primary" />
                  <p>When the question asks for a <strong>synonym</strong>, the <strong>antonym</strong> is ALWAYS one of the 4 options to catch you.</p>
                </div>
                <div className="flex gap-3">
                  <Info className="w-5 h-5 shrink-0 text-primary" />
                  <p>Always re-read: Is it asking for the same or the opposite?</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Daily Mastery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Study 8-10 words per day to double your prep efficiency.</p>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-xs font-bold uppercase mb-1">Target Mastery</div>
                  <div className="text-2xl font-bold text-primary-foreground">50 Essential Words</div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}
