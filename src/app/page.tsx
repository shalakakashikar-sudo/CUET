import { Navbar } from "@/components/layout/Navbar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookOpen, Award, Compass, Clock, ArrowRight, Zap, Target } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const stats = [
    { label: "Vocabulary Mastery", value: 20, icon: Zap, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "RC Accuracy", value: 45, icon: BookOpen, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Exam Readiness", value: 15, icon: Target, color: "text-green-600", bg: "bg-green-100" },
  ]

  const modules = [
    { title: "Reading Comprehension", desc: "Factual, Narrative, and Discursive passages", link: "/study/reading-comprehension", progress: 0 },
    { title: "Synonyms & Antonyms", desc: "Master the 50+ essential word list", link: "/study/synonyms-antonyms", progress: 10 },
    { title: "Match the Following", desc: "Idioms, Proverbs, and Figures of Speech", link: "/study/match-the-following", progress: 0 },
    { title: "Fill in the Blanks", desc: "Tenses, Conjunctions, and Prepositions", link: "/study/fill-in-the-blanks", progress: 5 },
    { title: "Sentence Rearrangement", desc: "Logic and Subject-Verb patterns", link: "/study/sentence-rearrangement", progress: 0 },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-headline font-bold text-foreground mb-2">English Excellence Dashboard</h1>
            <p className="text-muted-foreground text-lg">Subject Code: 101 | Your path to 250/250.</p>
          </div>
          <div className="bg-primary/20 px-6 py-3 rounded-2xl border border-primary/30 flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary-foreground" />
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider opacity-60">Exam Duration</span>
              <span className="text-xl font-bold">60 Minutes</span>
            </div>
          </div>
        </header>

        {/* Priority 1: Strategy Guide */}
        <section className="mb-12">
          <Card className="border-none bg-foreground text-background overflow-hidden relative group">
            <div className="absolute right-0 top-0 w-1/3 h-full bg-primary/10 -skew-x-12 translate-x-1/2 group-hover:translate-x-1/3 transition-transform duration-500" />
            <CardContent className="p-8 md:p-12 relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="bg-primary/20 p-6 rounded-3xl">
                <Compass className="w-16 h-16 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Strategy Blueprint</span>
                </div>
                <h2 className="text-3xl font-headline font-bold mb-4">The 250/250 Accuracy Guide</h2>
                <p className="text-background/70 text-lg mb-8 max-w-2xl">
                  Master the marking scheme: +5 for Correct, -1 for Wrong. Learn the order of attempt to finish 50 questions in 60 minutes.
                </p>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 rounded-xl font-bold" asChild>
                  <Link href="/strategy">Master The Strategy <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Stats Section */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-sm hover:shadow-md transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</CardTitle>
                <div className={`${stat.bg} p-2 rounded-lg`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-3">{stat.value}%</div>
                <Progress value={stat.value} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-headline font-bold flex items-center gap-3">
                  <BookOpen className="w-7 h-7 text-primary-foreground" />
                  Syllabus Modules
                </h2>
                <Link href="/study" className="text-sm font-bold text-secondary-foreground hover:underline flex items-center gap-1">
                  View All Topics <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid gap-4">
                {modules.map((mod, i) => (
                  <Card key={i} className="group hover:border-primary/50 transition-all border-border/50 bg-card/50">
                    <CardContent className="flex items-center p-6 gap-6">
                      <div className="bg-primary/20 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary/40 transition-colors">
                        <BookOpen className="w-7 h-7 text-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-xl mb-1">{mod.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">{mod.desc}</p>
                        <div className="flex items-center gap-4 mt-4">
                          <Progress value={mod.progress} className="h-1.5 flex-1" />
                          <span className="text-xs font-bold font-mono">{mod.progress}%</span>
                        </div>
                      </div>
                      <Button asChild variant="secondary" size="sm" className="hidden sm:flex rounded-xl font-bold">
                        <Link href={mod.link}>Start</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <Card className="border-none bg-secondary/10 border border-secondary/20">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3">
                  <Award className="w-6 h-6 text-secondary-foreground" />
                  Practice Arena
                </CardTitle>
                <CardDescription className="text-secondary-foreground/70">
                  Adaptive tests modeled on Subject Code 101 patterns.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full h-14 bg-secondary-foreground text-background hover:opacity-90 rounded-2xl font-bold text-lg" asChild>
                  <Link href="/quiz">Start Practice Set</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Exam Checklist</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 text-sm font-medium">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  50 Total Questions
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 text-sm font-medium">
                  <Clock className="w-4 h-4 text-blue-500" />
                  60 Minutes Limit
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 text-sm font-medium">
                  <Target className="w-4 h-4 text-red-500" />
                  -1 Negative Marking
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}
