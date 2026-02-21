
"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Compass, Clock, CheckCircle, HelpCircle, AlertTriangle, BookOpen } from "lucide-react"

export default function StrategyPage() {
  const [confidence, setConfidence] = useState<string>("")
  const [timeRemaining, setTimeRemaining] = useState<string>("")
  const [recommendation, setRecommendation] = useState<{ advice: string; color: string } | null>(null)

  const getRecommendation = () => {
    if (confidence === "High") {
      setRecommendation({ advice: "Definitely Attempt! Your accuracy is likely high here. Secure those +5 marks.", color: "bg-green-100 border-green-200 text-green-800" })
    } else if (confidence === "Medium" && timeRemaining === "Plenty") {
      setRecommendation({ advice: "Attempt with Review. Mark for review and double-check logic if time permits later.", color: "bg-blue-100 border-blue-200 text-blue-800" })
    } else if (confidence === "Medium" && timeRemaining === "Short") {
      setRecommendation({ advice: "Skip and Move On. Don't risk the -1 negative marking when time is tight.", color: "bg-yellow-100 border-yellow-200 text-yellow-800" })
    } else {
      setRecommendation({ advice: "Skip. Highly likely to result in negative marks. Focus on questions you know.", color: "bg-red-100 border-red-200 text-red-800" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-12">
          <h1 className="text-4xl font-headline font-bold flex items-center gap-3">
            <Compass className="w-10 h-10 text-primary-foreground" />
            CUET 2026 Strategy Guide
          </h1>
          <p className="text-muted-foreground text-lg mt-4">Master the art of test-taking to maximize your percentile.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="marking" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-12">
                <TabsTrigger value="marking">Marking Tool</TabsTrigger>
                <TabsTrigger value="time">Time Management</TabsTrigger>
                <TabsTrigger value="tips">Section Tips</TabsTrigger>
              </TabsList>
              
              <TabsContent value="marking" className="mt-8 space-y-6">
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle>Intelligent Marking Assistant</CardTitle>
                    <CardDescription>Simulate exam-day pressure to learn when to skip.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">Your Confidence in Topic</label>
                        <Select onValueChange={setConfidence}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select confidence" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="High">High (I know the concept well)</SelectItem>
                            <SelectItem value="Medium">Medium (I have some doubt)</SelectItem>
                            <SelectItem value="Low">Low (I am guessing)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">Time Remaining in Section</label>
                        <Select onValueChange={setTimeRemaining}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Plenty">Plenty (&gt;15 mins)</SelectItem>
                            <SelectItem value="Short">Short (&lt;5 mins)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button className="w-full h-12" onClick={getRecommendation} disabled={!confidence || !timeRemaining}>
                      Get Strategic Advice
                    </Button>

                    {recommendation && (
                      <div className={`p-6 rounded-xl border-2 animate-in fade-in slide-in-from-top-4 ${recommendation.color}`}>
                        <div className="flex gap-4">
                          <AlertTriangle className="w-6 h-6 shrink-0" />
                          <div>
                            <p className="font-bold text-lg mb-1">Recommended Action:</p>
                            <p className="font-medium">{recommendation.advice}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-none shadow-sm bg-muted/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="font-bold">Correct Answer</h3>
                      </div>
                      <p className="text-2xl font-bold text-green-700">+5 Marks</p>
                      <p className="text-xs text-muted-foreground mt-2">Every correct answer boosts your rank significantly.</p>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-sm bg-muted/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <h3 className="font-bold">Wrong Answer</h3>
                      </div>
                      <p className="text-2xl font-bold text-red-700">-1 Mark</p>
                      <p className="text-xs text-muted-foreground mt-2">Beware of wild guessing; negative marking hurts.</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="time" className="mt-8 space-y-6">
                <Card>
                  <CardContent className="p-8 space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Clock className="w-6 h-6 text-primary-foreground" />
                      45-Minute Breakdown (General Test)
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 rounded-xl border-l-4 border-l-blue-500 bg-blue-50/30">
                        <span className="font-mono font-bold w-20">0-5min</span>
                        <p>Scanning the paper. Identify 15 'Easy' questions to tackle first.</p>
                      </div>
                      <div className="flex items-center gap-4 p-4 rounded-xl border-l-4 border-l-green-500 bg-green-50/30">
                        <span className="font-mono font-bold w-20">5-25min</span>
                        <p>The 'Sprint'. Solve the easy and medium questions. Don't spend &gt;60s on any one problem.</p>
                      </div>
                      <div className="flex items-center gap-4 p-4 rounded-xl border-l-4 border-l-purple-500 bg-purple-50/30">
                        <span className="font-mono font-bold w-20">25-40min</span>
                        <p>Deep Thinking. Focus on the 'Marked for Review' logic problems.</p>
                      </div>
                      <div className="flex items-center gap-4 p-4 rounded-xl border-l-4 border-l-red-500 bg-red-50/30">
                        <span className="font-mono font-bold w-20">40-45min</span>
                        <p>Buffer & Submission. Final sanity check on answers.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tips" className="mt-8">
                 <div className="grid gap-6">
                    <div className="bg-primary/10 p-6 rounded-2xl border border-primary/20">
                      <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Language Section Mastery
                      </h4>
                      <ul className="list-disc list-inside space-y-2 text-sm text-foreground/80">
                        <li>Read the questions <strong>before</strong> the comprehension passage.</li>
                        <li>Eliminate two obviously wrong options first.</li>
                        <li>Root word analysis for Synonyms/Antonyms.</li>
                      </ul>
                    </div>
                    <div className="bg-secondary/10 p-6 rounded-2xl border border-secondary/20">
                      <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5" />
                        General Test Logic
                      </h4>
                      <ul className="list-disc list-inside space-y-2 text-sm text-foreground/80">
                        <li>Memorize tables up to 30 and squares up to 25.</li>
                        <li>Practice <strong>Mental Math</strong> to save calculation time.</li>
                        <li>Draw Venn diagrams for Syllogism questions instantly.</li>
                      </ul>
                    </div>
                 </div>
              </TabsContent>
            </Tabs>
          </div>

          <aside className="space-y-6">
            <Card className="bg-foreground text-background">
              <CardHeader>
                <CardTitle>Top Performer Rule</CardTitle>
              </CardHeader>
              <CardContent>
                <blockquote className="italic border-l-2 border-primary pl-4 py-2 text-sm text-background/80">
                  "Accuracy over Speed. In CUET, 100% accuracy on 40 questions is better than 80% accuracy on 50 questions due to negative marking."
                </blockquote>
                <p className="mt-4 text-xs font-bold text-primary">— Rank 1, CUET 2023</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Section Timings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-sm border-b pb-2">
                  <span>Language</span>
                  <Badge>45 Mins</Badge>
                </div>
                <div className="flex justify-between items-center text-sm border-b pb-2">
                  <span>Domain Sub 1</span>
                  <Badge>45 Mins</Badge>
                </div>
                <div className="flex justify-between items-center text-sm border-b pb-2">
                  <span>General Test</span>
                  <Badge>60 Mins</Badge>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}
