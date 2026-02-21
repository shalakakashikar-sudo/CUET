
import { Navbar } from "@/components/layout/Navbar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookOpen, Award, Compass, HelpCircle, TrendingUp, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const stats = [
    { label: "Syllabus Covered", value: 65, icon: BookOpen, color: "bg-blue-100 text-blue-600" },
    { label: "Mock Test Score", value: 82, icon: Award, color: "bg-purple-100 text-purple-600" },
    { label: "Accuracy Rate", value: 74, icon: TrendingUp, color: "bg-green-100 text-green-600" },
  ]

  const modules = [
    { title: "English Language", desc: "Grammar, Reading Comprehension, Vocabulary", link: "/study/english", progress: 80 },
    { title: "General Test", desc: "Numerical Ability, Logical Reasoning, GK", link: "/study/general", progress: 45 },
    { title: "Domain Specific", desc: "Business Studies, Psychology, History etc.", link: "/study/domain", progress: 20 },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-headline font-bold text-foreground mb-2">Welcome back, Scholar!</h1>
          <p className="text-muted-foreground">CUET 2026 is approximately 420 days away. Stay consistent!</p>
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
                <h2 className="text-xl font-headline font-semibold">Active Study Modules</h2>
                <Link href="/study" className="text-sm text-secondary-foreground hover:underline">View all</Link>
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
                <h2 className="text-2xl font-headline font-bold mb-4">Ready for a quick test?</h2>
                <p className="text-secondary-foreground/80 mb-6 max-w-md">Our adaptive quiz engine adjusts difficulty in real-time based on your current strengths and weaknesses.</p>
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90" asChild>
                  <Link href="/quiz">Start Practice Quiz</Link>
                </Button>
              </div>
              <Award className="absolute -right-8 -bottom-8 w-48 h-48 text-secondary/40 -rotate-12 pointer-events-none" />
            </section>
          </div>

          <aside className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Exam Strategy Corner</CardTitle>
                <CardDescription>Tips from top rankers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm">Master the English Comprehension section first; it carries the most weight in overall percentile.</p>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm">Logical Reasoning requires practice, not memorization. Solve 10 questions daily.</p>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/strategy">Full Guide</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Instant Doubts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">Got stuck on a grammar rule or a logic puzzle? Our knowledge base is here to help.</p>
                <Button className="w-full bg-white text-foreground hover:bg-white/90" asChild>
                  <Link href="/doubts">Search Knowledge Base</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}
