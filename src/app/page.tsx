
import { Navbar } from "@/components/layout/Navbar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookOpen, Award, Compass, HelpCircle, TrendingUp, CheckCircle2, Clock } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const stats = [
    { label: "Vocabulary Mastered", value: 45, icon: BookOpen, color: "bg-blue-100 text-blue-600" },
    { label: "RC Accuracy", value: 78, icon: Award, color: "bg-purple-100 text-purple-600" },
    { label: "Grammar Proficiency", value: 62, icon: TrendingUp, color: "bg-green-100 text-green-600" },
  ]

  const modules = [
    { title: "Reading Comprehension", desc: "Factual, Narrative, and Discursive passages", link: "/study/reading-comprehension", progress: 30 },
    { title: "Synonyms & Antonyms", desc: "Master the 50+ essential word list", link: "/study/synonyms-antonyms", progress: 50 },
    { title: "Grammar & Fillers", desc: "Tenses, Conjunctions, and Prepositions", link: "/study/fill-in-the-blanks", progress: 20 },
    { title: "Idioms & Phrases", desc: "Figures of speech and common proverbs", link: "/study/match-the-following", progress: 15 },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold text-foreground mb-2">English Excellence Dashboard</h1>
            <p className="text-muted-foreground">Mastering the Language Section for CUET 2026.</p>
          </div>
          <div className="bg-primary/20 px-4 py-2 rounded-lg border border-primary/30 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary-foreground" />
            <span className="text-sm font-medium">420 Days to Exam</span>
          </div>
        </header>

        <section className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color.split(' ')[1]}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{stat.value}%</div>
                <Progress value={stat.value} className="h-1.5" />
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-headline font-semibold">Study Progress</h2>
                <Link href="/study" className="text-sm text-secondary-foreground hover:underline">View All Modules</Link>
              </div>
              <div className="grid gap-4">
                {modules.map((mod, i) => (
                  <Card key={i} className="group hover:bg-primary/5 transition-colors border-border/50">
                    <CardContent className="flex items-center p-6 gap-6">
                      <div className="bg-primary/40 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                        <BookOpen className="w-6 h-6 text-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg">{mod.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">{mod.desc}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <Progress value={mod.progress} className="h-1" />
                          <span className="text-xs font-medium">{mod.progress}%</span>
                        </div>
                      </div>
                      <Button asChild variant="ghost" size="sm" className="hidden sm:flex group-hover:bg-primary/50">
                        <Link href={mod.link}>Resume</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="bg-secondary/20 rounded-2xl p-8 border border-secondary/30 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-headline font-bold mb-4">Practice Strategy</h2>
                <p className="text-secondary-foreground/80 mb-6 max-w-md">Learn the "Smart Marking Strategy" and how to use your 10-question skip choice effectively.</p>
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90" asChild>
                  <Link href="/strategy">Master Strategy</Link>
                </Button>
              </div>
              <Award className="absolute -right-8 -bottom-8 w-48 h-48 text-secondary/40 -rotate-12 pointer-events-none" />
            </section>
          </div>

          <aside className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Section Weightage</CardTitle>
                <CardDescription>Targeting 200/200</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Reading Comprehension</span>
                  <span className="font-bold">60 Marks</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Vocabulary</span>
                  <span className="font-bold">50 Marks</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Grammar & Usage</span>
                  <span className="font-bold">50 Marks</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Sentence Logic</span>
                  <span className="font-bold">40 Marks</span>
                </div>
                <Separator />
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm">Master 8-10 words daily. Learn both synonym and antonym for each.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Quick Doubts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">Confused between 'Affect' and 'Effect' or 'Stationary' and 'Stationery'?</p>
                <Button className="w-full bg-white text-foreground hover:bg-white/90" asChild>
                  <Link href="/doubts">Search English FAQ</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}

import { Separator } from "@/components/ui/separator"
