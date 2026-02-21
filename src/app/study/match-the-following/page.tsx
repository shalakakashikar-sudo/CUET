
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
  { idiom: "A blessing in disguise", meaning: "A misfortune that eventually results in something good happening later." },
  { idiom: "A dime a dozen", meaning: "Something very common and not particularly valuable." },
  { idiom: "A penny for your thoughts", meaning: "Asking someone what they are thinking about." },
  { idiom: "Actions speak louder than words", meaning: "People's intentions can be judged better by what they do than what they say." },
  { idiom: "Add fuel to the fire", meaning: "To make an already bad situation worse." },
  { idiom: "Add insult to injury", meaning: "To further a loss with mockery or indignity; to worsen an unfavorable situation." },
  { idiom: "At the eleventh hour", meaning: "At the very last moment." },
  { idiom: "Back to the drawing board", meaning: "When an attempt fails and it's time to start all over." },
  { idiom: "Barking up the wrong tree", meaning: "Looking in the wrong place or accusing the wrong person." },
  { idiom: "Beat around the bush", meaning: "Avoid talking about the main issue directly." },
  { idiom: "Better late than never", meaning: "It is better to arrive or do something late than not to do it at all." },
  { idiom: "Bite off more than you can chew", meaning: "Take on a task that is way too big." },
  { idiom: "Bite the bullet", meaning: "Endure a painful situation with courage." },
  { idiom: "Break a leg", meaning: "Good luck (usually said to performers)." },
  { idiom: "Break the ice", meaning: "To start a conversation in a socially awkward situation." },
  { idiom: "Burn the midnight oil", meaning: "To work late into the night." },
  { idiom: "Call it a day", meaning: "Decide to stop working on something." },
  { idiom: "Costs an arm and a leg", meaning: "Something that is very expensive." },
  { idiom: "Cry over spilt milk", meaning: "Complain about something that has already happened and cannot be changed." },
  { idiom: "Cut corners", meaning: "To do something poorly in order to save time or money." },
  { idiom: "Cut to the chase", meaning: "Skip the unnecessary details and get to the main point." },
  { idiom: "Don't count your chickens before they hatch", meaning: "Don't make plans based on events that haven't happened yet." },
  { idiom: "Don't put all your eggs in one basket", meaning: "Don't risk everything on a single venture." },
  { idiom: "Elephant in the room", meaning: "An obvious major problem that people are avoiding discussing." },
  { idiom: "Every cloud has a silver lining", meaning: "Every difficult situation has a positive side." },
  { idiom: "Get a taste of your own medicine", meaning: "Get treated the way you've been treating others." },
  { idiom: "Get out of hand", meaning: "To become difficult to control." },
  { idiom: "Give someone the cold shoulder", meaning: "Intentionally ignoring someone." },
  { idiom: "Go on a wild goose chase", meaning: "A hopeless search for something that is unattainable." },
  { idiom: "Hang in there", meaning: "Don't give up." },
  { idiom: "Hit the nail on the head", meaning: "To be precisely correct." },
  { idiom: "Hit the sack", meaning: "Go to sleep." },
  { idiom: "In a nutshell", meaning: "In a few words; briefly." },
  { idiom: "It takes two to tango", meaning: "Both people involved in a situation are equally responsible." },
  { idiom: "Jump on the bandwagon", meaning: "Follow a popular trend or activity." },
  { idiom: "Keep your chin up", meaning: "Remain positive during a difficult situation." },
  { idiom: "Kill two birds with one stone", meaning: "Accomplish two things with a single action." },
  { idiom: "Let sleeping dogs lie", meaning: "Avoid interfering in a situation that is currently stable." },
  { idiom: "Let the cat out of the bag", meaning: "Accidentally reveal a secret." },
  { idiom: "Make a long story short", meaning: "Come to the point without details." },
  { idiom: "Method to the madness", meaning: "A specific, rational plan behind seemingly crazy behavior." },
  { idiom: "Miss the boat", meaning: "It's too late to take an opportunity." },
  { idiom: "No pain, no gain", meaning: "You have to work hard for what you want." },
  { idiom: "On cloud nine", meaning: "Very happy and excited." },
  { idiom: "On thin ice", meaning: "In a risky or dangerous situation." },
  { idiom: "Once in a blue moon", meaning: "Very rarely; almost never." },
  { idiom: "Piece of cake", meaning: "Something very easy to do." },
  { idiom: "Pull someone's leg", meaning: "To tease or joke with someone." },
  { idiom: "Rain on someone's parade", meaning: "To spoil someone's plans or pleasure." },
  { idiom: "See eye to eye", meaning: "To agree completely with someone." },
  { idiom: "Sit on the fence", meaning: "Avoid making a decision or taking sides." },
  { idiom: "Spill the beans", meaning: "To reveal secret information." },
  { idiom: "Steal someone's thunder", meaning: "Take credit for someone else's achievement." },
  { idiom: "Take it with a grain of salt", meaning: "Don't take what someone says too seriously." },
  { idiom: "The ball is in your court", meaning: "It is your turn to make a decision or take action." },
  { idiom: "The best of both worlds", meaning: "A situation where you can enjoy the advantages of two very different things." },
  { idiom: "Through thick and thin", meaning: "Under all circumstances, no matter how difficult." },
  { idiom: "To get cold feet", meaning: "To become nervous or hesitant about a planned action." },
  { idiom: "To go the extra mile", meaning: "To do more than what is expected or required." },
  { idiom: "Under the weather", meaning: "Feeling slightly ill." },
  { idiom: "Up in the air", meaning: "Uncertain or undecided." },
  { idiom: "Weather the storm", meaning: "Successfully survive a difficult period." },
  { idiom: "When pigs fly", meaning: "Something that will never happen." },
  { idiom: "Wrap your head around something", meaning: "To understand a complicated idea or situation." },
  { idiom: "Your guess is as good as mine", meaning: "I have no idea." },
  { idiom: "A bird in the hand is worth two in the bush", meaning: "What you have is worth more than what you might get." },
  { idiom: "A chip on your shoulder", meaning: "Being angry about something that happened in the past." },
  { idiom: "A drop in the bucket", meaning: "A very small part of something big or whole." },
  { idiom: "A house of cards", meaning: "A plan or organization that is very weak and can easily fail." },
  { idiom: "A leopard can't change its spots", meaning: "You cannot change who you are." },
  { idiom: "A man of straw", meaning: "A weak or characterless person." },
  { idiom: "A piece of mind", meaning: "Telling someone exactly what you think, usually in an angry way." },
  { idiom: "Against the clock", meaning: "Trying to do something as fast as possible before a deadline." },
  { idiom: "All in the same boat", meaning: "In the same difficult situation as others." },
  { idiom: "An arm and a leg", meaning: "A large amount of money." },
  { idiom: "Apple of one's eye", meaning: "Someone very precious or dear." },
  { idiom: "At a snail's pace", meaning: "Moving very slowly." },
  { idiom: "Back to square one", meaning: "Return to the very beginning." },
  { idiom: "Bad blood", meaning: "Feelings of hate or strong dislike between people." },
  { idiom: "Ball in your court", meaning: "Responsibility for next action rests with you." },
  { idiom: "Be on the same page", meaning: "To have the same understanding or agreement." },
  { idiom: "Beat a dead horse", meaning: "Waste time on something that is already settled." },
  { idiom: "Below the belt", meaning: "Unfair or cruel (referring to a remark)." },
  { idiom: "Between a rock and a hard place", meaning: "Faced with two difficult choices." },
  { idiom: "Blow one's own trumpet", meaning: "To praise oneself." },
  { idiom: "Bolt from the blue", meaning: "A total surprise." },
  { idiom: "Break the bank", meaning: "To cost too much money." },
  { idiom: "By leaps and bounds", meaning: "Very rapidly." },
  { idiom: "Call a spade a spade", meaning: "To speak plainly and directly." },
  { idiom: "Carry the day", meaning: "To be successful or win." },
  { idiom: "Catch someone red-handed", meaning: "Catch someone in the act of doing something wrong." },
  { idiom: "Change of heart", meaning: "A change in opinion or feeling." },
  { idiom: "Checkered career", meaning: "A career marked by fluctuating fortunes." },
  { idiom: "Close shave", meaning: "A narrow escape from danger." },
  { idiom: "Come to a standstill", meaning: "To stop completely." },
  { idiom: "Couch potato", meaning: "A lazy person who watches too much TV." },
  { idiom: "Crocodile tears", meaning: "False expression of sorrow." },
  { idiom: "Dead ringer", meaning: "An exact duplicate." },
  { idiom: "Don't cry over spilt milk", meaning: "Don't worry about things that cannot be changed." },
  { idiom: "Double-edged sword", meaning: "Something that has both favorable and unfavorable consequences." },
  { idiom: "Down to earth", meaning: "Practical and realistic." },
  { idiom: "Draw the line", meaning: "To set a limit on what is allowed." },
  { idiom: "Eat humble pie", meaning: "To apologize and accept that you were wrong." },
  { idiom: "Face the music", meaning: "To accept the unpleasant consequences of one's actions." },
  { idiom: "Fair-weather friend", meaning: "A friend who is only there in good times." },
  { idiom: "Feather in one's cap", meaning: "An achievement to be proud of." },
  { idiom: "Fish out of water", meaning: "Someone in an unfamiliar and uncomfortable situation." },
  { idiom: "Flash in the pan", meaning: "Something that is successful for a short time but doesn't last." },
  { idiom: "Fly off the handle", meaning: "To lose one's temper suddenly." },
  { idiom: "Gain ground", meaning: "To make progress." },
  { idiom: "Get wind of", meaning: "To hear a rumor or secret information about something." },
  { idiom: "Give up the ghost", meaning: "To die or stop working." },
  { idiom: "Go through fire and water", meaning: "To undergo any risk or trouble." },
  { idiom: "Green thumb", meaning: "A natural talent for gardening." },
  { idiom: "Hard nut to crack", meaning: "A difficult problem to solve." },
  { idiom: "Heart in one's mouth", meaning: "Extremely nervous or afraid." },
  { idiom: "In the red", meaning: "Spending more money than is being earned." },
  { idiom: "In the same boat", meaning: "Sharing the same problems or circumstances." },
  { idiom: "Keep at arm's length", meaning: "To avoid intimacy or familiarity." },
  { idiom: "Keep the wolf from the door", meaning: "To earn enough money to afford basic necessities." },
  { idiom: "Lead someone up the garden path", meaning: "To deceive or mislead someone." },
  { idiom: "Lion's share", meaning: "The largest part of something." },
  { idiom: "Make both ends meet", meaning: "To earn just enough money to live on." },
  { idiom: "Nip in the bud", meaning: "To stop something at an early stage." },
  { idiom: "Not my cup of tea", meaning: "Not something that one likes or is interested in." },
  { idiom: "Off the cuff", meaning: "Without preparation; spontaneously." },
  { idiom: "On the cards", meaning: "Likely to happen." },
  { idiom: "Part and parcel", meaning: "An essential part of something." },
  { idiom: "Pay through the nose", meaning: "To pay an excessively high price." },
  { idiom: "Read between the lines", meaning: "To find hidden meaning." },
  { idiom: "Red tape", meaning: "Excessive bureaucracy or adherence to rules." },
  { idiom: "Rule of thumb", meaning: "A broadly accurate guide based on experience." },
  { idiom: "Sell like hot cakes", meaning: "To sell very quickly." },
  { idiom: "Take with a pinch of salt", meaning: "To listen with skepticism." },
  { idiom: "The last straw", meaning: "The final problem that makes a situation intolerable." },
  { idiom: "Through and through", meaning: "Completely; in every way." },
  { idiom: "Under the thumb of", meaning: "Controlled by someone else." },
  { idiom: "Wild goose chase", meaning: "A foolish and hopeless pursuit." },
  { idiom: "With a high hand", meaning: "In an arrogant or dictatorial manner." }
].sort((a, b) => a.idiom.localeCompare(b.idiom));

const FIGURES = [
  { name: "Alliteration", def: "Repetition of initial consonant sounds.", eg: "Peter Piper picked a peck of pickled peppers." },
  { name: "Assonance", def: "Repetition of vowel sounds within nearby words.", eg: "The rain in Spain stays mainly in the plain." },
  { name: "Consonance", def: "Repetition of consonant sounds within or at the end of words.", eg: "The lock stuck back in the crack." },
  { name: "Hyperbole", def: "Extreme exaggeration for emphasis.", eg: "I've told you a million times!" },
  { name: "Irony", def: "Contrast between expectation and reality.", eg: "A pilot has a fear of heights." },
  { name: "Metaphor", def: "Direct comparison without using 'like' or 'as'.", eg: "Life is a roller coaster." },
  { name: "Metonymy", def: "Replacing a name with something closely associated.", eg: "The White House issued a statement (meaning the President)." },
  { name: "Onomatopoeia", def: "Words that imitate sounds.", eg: "The bees buzzed; the clock ticked." },
  { name: "Oxymoron", def: "Two contradictory terms used together.", eg: "Original copy; bittersweet." },
  { name: "Paradox", def: "A statement that seems contradictory but reveals a truth.", eg: "This is the beginning of the end." },
  { name: "Personification", def: "Giving human qualities to non-human things.", eg: "The stars winked at us." },
  { name: "Pun", def: "A play on words with multiple meanings or similar sounds.", eg: "I was wondering why the ball was getting bigger. Then it hit me." },
  { name: "Simile", def: "Comparison using 'like' or 'as'.", eg: "He is as brave as a lion." },
  { name: "Synecdoche", def: "A part used to represent the whole.", eg: "All hands on deck (meaning the whole crew)." },
  { name: "Euphemism", def: "A mild word used in place of a harsh one.", eg: "Passed away instead of died." },
]

const HOMONYMS = [
  { w1: "Affect", m1: "To impact (verb)", w2: "Effect", m2: "The result (noun)" },
  { w1: "Altar", m1: "Sacred table in a church", w2: "Alter", m2: "To change" },
  { w1: "Ascent", m1: "A climb/upward path", w2: "Assent", m2: "Agreement" },
  { w1: "Berth", m1: "A sleeping place in a train/ship", w2: "Birth", m2: "Coming into life" },
  { w1: "Canvas", m1: "Strong cloth", w2: "Canvass", m2: "To seek votes/opinions" },
  { w1: "Complement", m1: "Enhances or completes", w2: "Compliment", m2: "Praise" },
  { w1: "Council", m1: "Advisory group", w2: "Counsel", m2: "Advice or a lawyer" },
  { w1: "Desert", m1: "Arid land", w2: "Dessert", m2: "Sweet dish" },
  { w1: "Dual", m1: "Twofold", w2: "Duel", m2: "A formal fight" },
  { w1: "Elicit", m1: "To draw out a response", w2: "Illicit", m2: "Illegal" },
  { w1: "Fair", m1: "Just or beautiful", w2: "Fare", m2: "Price of travel" },
  { w1: "Loose", m1: "Not tight", w2: "Lose", m2: "To be deprived of something" },
  { w1: "Peace", m1: "Calmness", w2: "Piece", m2: "A portion" },
  { w1: "Principal", m1: "Head of school", w2: "Principle", m2: "Fundamental rule" },
  { w1: "Quiet", m1: "Silent", w2: "Quite", m2: "Completely or very" },
  { w1: "Sight", m1: "Vision", w2: "Site", m2: "Location" },
  { w1: "Stationary", m1: "Not moving", w2: "Stationery", m2: "Writing materials" },
  { w1: "Weak", m1: "Not strong", w2: "Week", m2: "Seven days" },
  { w1: "Weather", m1: "Atmospheric state", w2: "Whether", m2: "If / Choice" },
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
                <TabsTrigger value="idioms" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary font-bold">Idioms ({IDIOMS.length})</TabsTrigger>
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
                    <CardDescription className="text-primary/70 font-medium">Over 100 high-yield idioms for Code 101.</CardDescription>
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
