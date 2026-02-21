"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Star, Sparkles, Lightbulb, Info } from "lucide-react"
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
  { idiom: "A piece of cake", meaning: "Something very easy to do." },
  { idiom: "Barking up the wrong tree", meaning: "Looking in the wrong place or accusing the wrong person." },
  { idiom: "Break the ice", meaning: "To start a conversation in a socially awkward situation." },
  { idiom: "Cry over spilt milk", meaning: "Complain about something that has already happened and cannot be changed." },
  { idiom: "Curiosity killed the cat", meaning: "Being too inquisitive can lead to unpleasant situations." },
  { idiom: "Cut to the chase", meaning: "Skip the unnecessary details and get to the main point." },
  { idiom: "Elephant in the room", meaning: "An obvious major problem that people are avoiding discussing." },
  { idiom: "Giving the cold shoulder", meaning: "Intentionally ignoring someone." },
  { idiom: "In a nutshell", meaning: "In a few words; briefly." },
  { idiom: "Jump on the bandwagon", meaning: "Follow a popular trend or activity." },
  { idiom: "Keep your chin up", meaning: "Remain positive during a difficult situation." },
  { idiom: "Method to the madness", meaning: "A specific, rational plan behind seemingly crazy behavior." },
  { idiom: "On thin ice", meaning: "In a risky or dangerous situation." },
  { idiom: "Pull someone's leg", meaning: "To tease or joke with someone." },
  { idiom: "Rainy day fund", meaning: "Money saved for an unexpected future emergency." },
  { idiom: "See eye to eye", meaning: "To agree completely with someone." },
  { idiom: "Steal someone's thunder", meaning: "Take credit for someone else's achievement." },
  { idiom: "Through thick and thin", meaning: "Under all circumstances, no matter how difficult." },
  { idiom: "Up in the air", meaning: "Uncertain or undecided." },
  { idiom: "Weather the storm", meaning: "Successfully survive a difficult period." },
  { idiom: "Your guess is as good as mine", meaning: "I have no idea." },
  { idiom: "Back to the drawing board", meaning: "When an attempt fails and it's time to start all over." },
  { idiom: "Best of both worlds", meaning: "A situation where you can enjoy the advantages of two very different things." },
  { idiom: "Burning bridges", meaning: "Acting in a way that destroys a relationship or path permanently." },
  { idiom: "Call it a day", meaning: "Decide to stop working on something." },
  { idiom: "Get a taste of your own medicine", meaning: "Get treated the way you've been treating others (usually negative)." },
  { idiom: "Let the cat out of the bag", meaning: "Accidentally reveal a secret." },
  { idiom: "Miss the boat", meaning: "It's too late to take an opportunity." },
  { idiom: "No pain, no gain", meaning: "You have to work hard for what you want." },
  { idiom: "Sit on the fence", meaning: "Avoid making a decision or taking sides." },
]

const FIGURES = [
  { name: "Simile", def: "Comparison using 'like' or 'as'.", eg: "As fast as the wind." },
  { name: "Metaphor", def: "Direct comparison without 'like' or 'as'.", eg: "Life is a journey." },
  { name: "Personification", def: "Human qualities to non-human things.", eg: "The trees whispered." },
  { name: "Hyperbole", def: "Extreme exaggeration.", eg: "Told you a million times!" },
  { name: "Oxymoron", def: "Two contradictory terms together.", eg: "Deafening silence." },
  { name: "Onomatopoeia", def: "A word that imitates the sound it describes.", eg: "The clock ticked." },
  { name: "Alliteration", def: "Repetition of consonant sounds at the beginning of words.", eg: "Peter Piper picked a peck." },
  { name: "Assonance", def: "Repetition of vowel sounds within nearby words.", eg: "The rain in Spain stays mainly in the plain." },
  { name: "Consonance", def: "Repetition of consonant sounds within or at the end of words.", eg: "The lock stuck back in the crack." },
  { name: "Irony", def: "Contrast between expectation and reality.", eg: "A fire station burns down." },
  { name: "Paradox", def: "A statement that seems contradictory but reveals a truth.", eg: "This is the beginning of the end." },
  { name: "Pun", def: "A play on words with multiple meanings or similar sounds.", eg: "An illustrator's life is sketchy." },
  { name: "Synecdoche", def: "A part used to represent the whole or vice versa.", eg: "Check out my new wheels (car)." },
  { name: "Metonymy", def: "Replacement of a name with something closely associated.", eg: "The Pen is mightier than the sword." },
  { name: "Euphemism", def: "A mild or indirect word substituted for one considered harsh.", eg: "Passed away instead of died." },
]

const HOMONYMS = [
  { w1: "Principal", m1: "Head of school", w2: "Principle", m2: "Fundamental rule" },
  { w1: "Stationery", m1: "Writing materials", w2: "Stationary", m2: "Not moving" },
  { w1: "Potable", m1: "Safe to drink", w2: "Portable", m2: "Easy to carry" },
  { w1: "Complement", m1: "Enhances/completes", w2: "Compliment", m2: "Praise" },
  { w1: "Elicit", m1: "To draw out", w2: "Illicit", m2: "Illegal" },
  { w1: "Affect", m1: "To impact (verb)", w2: "Effect", m2: "The result (noun)" },
  { w1: "Altar", m1: "Sacred table", w2: "Alter", m2: "To change" },
  { w1: "Ascent", m1: "A climb/upward path", w2: "Assent", m2: "Agreement" },
  { w1: "Berth", m1: "A sleeping place", w2: "Birth", m2: "Coming into life" },
  { w1: "Canvas", m1: "Strong cloth", w2: "Canvass", m2: "To seek votes/opinions" },
  { w1: "Council", m1: "Advisory group", w2: "Counsel", m2: "Advice/Lawyer" },
  { w1: "Desert", m1: "Arid land", w2: "Dessert", m2: "Sweet dish" },
  { w1: "Dual", m1: "Twofold", w2: "Duel", m2: "A formal fight" },
  { w1: "Fair", m1: "Just/Beautiful", w2: "Fare", m2: "Price of travel" },
  { w1: "Forth", m1: "Forward", w2: "Fourth", m2: "Ordinal of four" },
  { w1: "Hear", m1: "To perceive sound", w2: "Here", m2: "In this place" },
  { w1: "Knight", m1: "Medieval soldier", w2: "Night", m2: "Opposite of day" },
  { w1: "Loose", m1: "Not tight", w2: "Lose", m2: "To be deprived of" },
  { w1: "Peace", m1: "Calmness/No war", w2: "Piece", m2: "A portion" },
  { w1: "Plain", m1: "Simple/Flat land", w2: "Plane", m2: "Tool/Aeroplane" },
  { w1: "Quiet", m1: "Silent", w2: "Quite", m2: "Completely/Very" },
  { w1: "Rain", m1: "Precipitation", w2: "Reign", m2: "Rule of monarch" },
  { w1: "Right", m1: "Correct/Opp. left", w2: "Write", m2: "To form letters" },
  { w1: "Sight", m1: "Vision", w2: "Site", m2: "Location" },
  { w1: "Weak", m1: "Not strong", w2: "Week", m2: "Seven days" },
  { w1: "Weather", m1: "Atmospheric state", w2: "Whether", m2: "If/Choice" },
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
              <p className="text-muted-foreground text-lg max-w-2xl">Elite repository of Idioms, Figures of Speech, and Homonyms. Master these to secure full marks in Section 4.</p>
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
                      Elite Idioms Repository
                    </CardTitle>
                    <CardDescription className="text-primary/70 font-medium">Over 40 high-yield idioms for Code 101.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 bg-white">
                    <ScrollArea className="h-[600px]">
                      <Table>
                        <TableHeader className="bg-muted/30 sticky top-0 z-10">
                          <TableRow>
                            <TableHead className="text-foreground font-bold py-4 pl-8">Idiom</TableHead>
                            <TableHead className="text-foreground font-bold">Meaning</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {IDIOMS.map((item, i) => (
                            <TableRow key={i} className="hover:bg-primary/5 transition-colors">
                              <TableCell className="font-bold text-primary py-4 pl-8">{item.idiom}</TableCell>
                              <TableCell className="text-xs text-muted-foreground font-medium pr-8">{item.meaning}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="figures" className="mt-8">
                <ScrollArea className="h-[600px] pr-4">
                  <div className="grid gap-4">
                    {FIGURES.map((item, i) => (
                      <Card key={i} className="border-none shadow-sm bg-white rounded-2xl hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg text-primary font-bold">{item.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm font-medium text-foreground">{item.def}</p>
                          <div className="mt-3 p-3 bg-primary/5 rounded-xl border border-primary/10">
                            <p className="text-xs text-muted-foreground italic font-bold">Example: <span className="text-primary">{item.eg}</span></p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="homonyms" className="mt-8">
                <ScrollArea className="h-[600px] pr-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {HOMONYMS.map((item, i) => (
                      <div key={i} className="p-5 border border-primary/10 rounded-2xl bg-white shadow-sm space-y-3 hover:border-primary/30 transition-colors">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-primary text-base">{item.w1}</span>
                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{item.m1}</span>
                          </div>
                          <Info className="w-3 h-3 text-primary/30 shrink-0 mt-1" />
                        </div>
                        <div className="flex justify-between items-start gap-4 border-t pt-3">
                          <div className="flex flex-col">
                            <span className="font-bold text-accent text-base">{item.w2}</span>
                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{item.m2}</span>
                          </div>
                          <Sparkles className="w-3 h-3 text-accent/30 shrink-0 mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>

            <Card className="bg-primary/10 border-none shadow-sm rounded-2xl relative overflow-hidden">
              <div className="absolute right-0 top-0 p-4 opacity-5">
                <Star className="w-24 h-24 text-primary" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-primary font-bold">
                  <Star className="w-5 h-5" />
                  Elite Deduction Strategy
                </CardTitle>
                <CardDescription className="text-primary/70 font-medium">The CUET Match section is designed for elimination. Use it to your advantage.</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl shadow-sm border border-primary/10">
                  <div className="text-xs font-bold text-primary uppercase mb-1">Rule of 100%</div>
                  <p className="text-sm font-medium leading-relaxed">Match the idioms/words you are absolutely certain about first. This often eliminates 2-3 trap options immediately.</p>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm border border-primary/10">
                  <div className="text-xs font-bold text-primary uppercase mb-1">The Context Clue</div>
                  <p className="text-sm font-medium leading-relaxed">If a homonym pair looks identical, check the sentence part of speech. (e.g., Affect is a verb, Effect is a noun).</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-foreground text-background shadow-xl rounded-2xl border-none">
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center gap-2 font-bold">
                  <Lightbulb className="w-5 h-5" />
                  Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm font-medium text-background/80">
                <p>Idioms are figurative; never take them literally in the Match column.</p>
                <p>Figures of Speech require you to identify the <strong>intent</strong> behind the comparison.</p>
                <p className="text-primary font-bold italic">"Accuracy maintains your cool. Every correct match is +5."</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-primary/20 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-foreground font-bold">Essential Proverbs</CardTitle>
                <CardDescription>Common wisdom items for Code 101.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Many hands make light work",
                  "A stitch in time saves nine",
                  "Don't judge a book by its cover",
                  "Every cloud has a silver lining",
                  "Action speaks louder than words",
                  "Beauty lies in the eye of the beholder"
                ].map((p, i) => (
                  <div key={i} className="flex gap-2 text-xs font-bold text-foreground/80 p-2 hover:bg-primary/5 rounded-lg transition-colors">
                    <Sparkles className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                    {p}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button className="w-full h-14 rounded-2xl font-bold shadow-lg text-lg" asChild>
              <Link href="/quiz">Start Full Practice Set</Link>
            </Button>
          </aside>
        </div>
      </main>
    </div>
  )
}
