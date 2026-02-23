
"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Search, Zap, BookOpen, AlertTriangle, ArrowRight, Hash, Star } from "lucide-react"
import Link from "next/link"

const WORD_LIST = [
  { word: "Abjure", meaning: "To solemnly renounce a belief or claim", synonym: "Renounce, Forswear", antonym: "Affirm, Assert" },
  { word: "Altruistic", meaning: "Selflessly caring for others", synonym: "Benevolent, Selfless", antonym: "Selfish, Egocentric" },
  { word: "Ameliorate", meaning: "To make something better", synonym: "Improve, Enhance", antonym: "Worsen, Exacerbate" },
  { word: "Anachronism", meaning: "Something out of its proper time", synonym: "Misplacement, Archaism", antonym: "Contemporary, Current" },
  { word: "Belligerent", meaning: "Hostile and aggressive", synonym: "Antagonistic, Pugnacious", antonym: "Peaceable, Friendly" },
  { word: "Cacophony", meaning: "A harsh, discordant mixture of sounds", synonym: "Din, Discord", antonym: "Euphony, Harmony" },
  { word: "Capricious", meaning: "Given to sudden changes of mood", synonym: "Fickle, Inconstant", antonym: "Stable, Consistent" },
  { word: "Diatribe", meaning: "A forceful and bitter verbal attack", synonym: "Tirade, Harangue", antonym: "Praise, Encomium" },
  { word: "Ephemeral", meaning: "Lasting a very short time", synonym: "Transient, Fleeting", antonym: "Permanent, Enduring" },
  { word: "Enervate", meaning: "To cause someone to feel drained of energy", synonym: "Exhaust, Fatigue", antonym: "Invigorate, Energize" },
  { word: "Fastidious", meaning: "Very attentive to accuracy and detail", synonym: "Meticulous, Scrupulous", antonym: "Careless, Lax" },
  { word: "Garrulous", meaning: "Excessively talkative", synonym: "Loquacious, Voluble", antonym: "Taciturn, Reticent" },
  { word: "Harangue", meaning: "A lengthy and aggressive speech", synonym: "Tirade, Lecture", antonym: "Conversation, Chat" },
  { word: "Iconoclast", meaning: "One who attacks cherished beliefs", synonym: "Sceptic, Heretic", antonym: "Believer, Conformist" },
  { word: "Indolent", meaning: "Habitually lazy", synonym: "Slothful, Idle", antonym: "Industrious, Diligent" },
  { word: "Irascible", meaning: "Easily angered", synonym: "Choleric, Irritable", antonym: "Amiable, Placid" },
  { word: "Juxtapose", meaning: "Place side by side for contrast", synonym: "Collocate, Compare", antonym: "Separate, Disconnect" },
  { word: "Laconic", meaning: "Using very few words", synonym: "Brief, Concise", antonym: "Verbose, Wordy" },
  { word: "Loquacious", meaning: "Very talkative", synonym: "Garrulous, Verbose", antonym: "Reticent, Taciturn" },
  { word: "Magnanimous", meaning: "Generous or forgiving", synonym: "Charitable, Benevolent", antonym: "Mean, Vindictive" },
  { word: "Munificent", meaning: "Very generous", synonym: "Bountiful, Lavish", antonym: "Penurious, Stingy" },
  { word: "Nefarious", meaning: "Wicked or criminal", synonym: "Villainous, Heinous", antonym: "Noble, Exemplary" },
  { word: "Obsequious", meaning: "Obedient or attentive to an excessive degree", synonym: "Servile, Fawning", antonym: "Domineering, Arrogant" },
  { word: "Ostentatious", meaning: "Designed to impress or attract notice", synonym: "Showy, Pretentious", antonym: "Modest, Restrained" },
  { word: "Paradigm", meaning: "A typical example or pattern", synonym: "Model, Standard", antonym: "Anomaly, Exception" },
  { word: "Pernicious", meaning: "Harmful in a subtle way", synonym: "Deleterious, Noxious", antonym: "Beneficial, Salubrious" },
  { word: "Querulous", meaning: "Complaining in a whining manner", synonym: "Petulant, Peevish", antonym: "Contented, Cheerful" },
  { word: "Rancor", meaning: "Bitterness or resentfulness", synonym: "Malice, Spite", antonym: "Amity, Goodwill" },
  { word: "Recondite", meaning: "Obscure, not widely known", synonym: "Abstruse, Esoteric", antonym: "Simple, Lucid" },
  { word: "Sagacious", meaning: "Wise, good judgement", synonym: "Astute, Prudent", antonym: "Foolish, Naive" },
  { word: "Soporific", meaning: "Causing sleepiness", synonym: "Sedative, Somnolent", antonym: "Stimulating, Invigorating" },
  { word: "Sycophant", meaning: "A person who acts obsequiously to gain advantage", synonym: "Flatterer, Toady", antonym: "Rebel, Critic" },
  { word: "Taciturn", meaning: "Reserved or uncommunicative in speech", synonym: "Reticent, Quiet", antonym: "Talkative, Garrulous" },
  { word: "Tenuous", meaning: "Weak, fragile", synonym: "Feeble, Flimsy", antonym: "Robust, Strong" },
  { word: "Ubiquitous", meaning: "Present everywhere", synonym: "Omnipresent, Pervasive", antonym: "Rare, Scarce" },
  { word: "Umbrage", meaning: "Offence or annoyance", synonym: "Resentment, Pique", antonym: "Satisfaction, Pleasure" },
  { word: "Vacillate", meaning: "Waver between decisions", synonym: "Hesitate, Oscillate", antonym: "Resolve, Commit" },
  { word: "Venerate", meaning: "Regard with great respect", synonym: "Revere, Adore", antonym: "Despise, Dishonour" },
  { word: "Wary", meaning: "Feeling or showing caution", synonym: "Cautious, Circumspect", antonym: "Trusting, Reckless" },
  { word: "Zealot", meaning: "A person who is fanatical", synonym: "Fanatic, Enthusiast", antonym: "Moderate, Cynic" }
].sort((a, b) => a.word.localeCompare(b.word))

export default function SynonymsPage() {
  const [search, setSearch] = useState("")

  const filteredWords = WORD_LIST.filter(w => 
    w.word.toLowerCase().includes(search.toLowerCase()) ||
    w.meaning.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-12 animate-fade-in-up">
          <div className="flex justify-between items-start">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Section 3 (50 Marks)</Badge>
              <h1 className="text-4xl font-headline font-bold mb-4 text-foreground">Lexical Intelligence</h1>
              <p className="text-muted-foreground text-lg max-w-2xl">Elite word repository inspired by the Blackbook of English Vocabulary. Master these word families to neutralise the -1 penalty.</p>
            </div>
            <Button size="lg" className="rounded-2xl font-bold shadow-lg" asChild>
              <Link href="/study/synonyms-antonyms/quiz">Start Topic Quiz</Link>
            </Button>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Card className="border-none shadow-sm bg-white overflow-hidden rounded-[2rem]">
              <CardHeader className="bg-primary/5 pb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary rounded-2xl shadow-sm">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold">Elite Word Repository</CardTitle>
                    <CardDescription className="font-medium">The essential words for CUET 2026 Code 101.</CardDescription>
                  </div>
                </div>
                <div className="mt-6">
                  <Input 
                    placeholder="Search by word or meaning..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-12 text-lg border-primary/20 focus-visible:ring-primary rounded-xl"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead className="font-bold py-4 pl-8">Word & Meaning</TableHead>
                      <TableHead className="font-bold">Synonyms</TableHead>
                      <TableHead className="font-bold">Antonyms</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredWords.map((item, idx) => (
                      <TableRow key={idx} className="hover:bg-primary/5 transition-colors">
                        <TableCell className="py-4 pl-8">
                          <div className="font-bold text-primary text-base">{item.word}</div>
                          <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{item.meaning}</div>
                        </TableCell>
                        <TableCell className="text-xs font-bold">{item.synonym}</TableCell>
                        <TableCell className="text-xs font-bold text-destructive/80">{item.antonym}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <section className="grid md:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm bg-secondary/10 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-secondary-foreground font-bold">
                    <Zap className="w-5 h-5" />
                    Prefix Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { p: "un- / in- / im-", m: "Not / Opposite" },
                    { p: "mal- / mis-", m: "Bad / Wrong" },
                    { p: "pre- / post-", m: "Before / After" },
                    { p: "omni-", m: "All / Every" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-white/50 p-2 rounded-lg border border-secondary/20">
                      <span className="font-mono font-bold text-secondary-foreground">{item.p}</span>
                      <span className="text-xs italic text-muted-foreground font-bold">{item.m}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-primary/10 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-primary font-bold">
                    <BookOpen className="w-5 h-5" />
                    Suffix Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { s: "-ous / -ive", m: "Quality of" },
                    { s: "-ness / -ity", m: "State of being" },
                    { s: "-less", m: "Without" },
                    { s: "-ify / -ize", m: "To make/cause" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-white/50 p-2 rounded-lg border border-primary/20">
                      <span className="font-mono font-bold text-primary">{item.s}</span>
                      <span className="text-xs italic text-muted-foreground font-bold">{item.m}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>
          </div>

          <aside className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-foreground text-background shadow-xl rounded-2xl overflow-hidden relative">
              <div className="absolute right-0 top-0 p-4 opacity-10">
                <AlertTriangle className="w-12 h-12" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg text-primary font-bold">Trap Decoder</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed font-medium">
                <p>When asking for a <strong>synonym</strong>, the <strong>antonym</strong> is ALWAYS an option to trap you.</p>
                <p>Always verify the prompt: Is it asking for same or opposite?</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 rounded-2xl bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Daily Protocol</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted rounded-xl text-center">
                  <div className="text-3xl font-bold text-primary mb-1">10 Words</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase">Target Daily Intake</div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}
