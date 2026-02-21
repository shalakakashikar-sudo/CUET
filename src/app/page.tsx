import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookOpen, Award, Compass, Clock, ArrowRight, Zap, Target, Star, Gift, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const stats = [
    { label: "Vocabulary Mastery", value: 20, icon: Zap, color: "text-amber-500", bg: "bg-amber-100" },
    { label: "RC Accuracy", value: 45, icon: BookOpen, color: "text-primary", bg: "bg-primary/10" },
    { label: "Exam Readiness", value: 15, icon: Target, color: "text-emerald-500", bg: "bg-emerald-100" },
  ]

  const modules = [
    { title: "Reading Comprehension", desc: "3 Passages | 12 Questions | 60 Marks", link: "/study/reading-comprehension", progress: 0, tag: "High Weightage" },
    { title: "Synonyms & Antonyms", desc: "The Master Word List: Study 8-10 words/day", link: "/study/synonyms-antonyms", progress: 10, tag: "Daily Study" },
    { title: "Match the Following", desc: "Idioms, Proverbs, and Figures of Speech", link: "/study/match-the-following", progress: 0, tag: "Column Logic" },
    { title: "Fill in the Blanks", desc: "Tenses, Conjunctions, and Prepositions", link: "/study/fill-in-the-blanks", progress: 5, tag: "Grammar Core" },
    { title: "Sentence Rearrangement", desc: "Find the Opener & Subject-Verb logic", link: "/study/sentence-rearrangement", progress: 0, tag: "Step Method" },
  ]

  return (
    <div className="min-h-screen pb-20">
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/20">Subject Code: 101</span>
            </div>
            <h1 className="text-5xl font-headline font-bold text-foreground tracking-tight">English Mastery Hub</h1>
            <p className="text-muted-foreground text-xl">Your blueprint for a perfect 250/250 score in CUET 2026.</p>
          </div>
          <div className="bg-white/70 backdrop-blur-md px-8 py-4 rounded-3xl border shadow-sm flex items-center gap-4">
            <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Target Percentile</span>
              <span className="text-2xl font-bold text-foreground">100th Percentile</span>
            </div>
          </div>
        </header>

        {/* Hero Strategy Section */}
        <section className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <Card className="border-none bg-primary shadow-2xl overflow-hidden relative group rounded-[2.5rem]">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-white/10 -skew-x-12 translate-x-1/4 group-hover:translate-x-1/3 transition-transform duration-700" />
            <CardContent className="p-10 md:p-16 relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="bg-white/20 p-8 rounded-[2rem] backdrop-blur-md shadow-inner">
                <Compass className="w-20 h-20 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left text-white">
                <div className="inline-flex items-center gap-2 mb-6 bg-white/20 px-4 py-1.5 rounded-full border border-white/30 backdrop-blur-sm">
                  <Gift className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">The Gift of Skips</span>
                </div>
                <h2 className="text-4xl font-headline font-bold mb-6">Strategic Marking Blueprint</h2>
                <p className="text-white/80 text-xl mb-10 max-w-2xl leading-relaxed">
                  Master the marking scheme: <span className="text-white font-bold">+5 for Correct, -1 for Wrong</span>. 
                  Learn why unattempted is better than guessing on uncertainty.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-16 px-10 rounded-2xl font-bold text-lg shadow-xl" asChild>
                    <Link href="/strategy">Master The Strategy <ArrowRight className="ml-2 w-5 h-5" /></Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Stats Grid */}
        <section className="grid md:grid-cols-3 gap-8 mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl bg-white/70 backdrop-blur-sm overflow-hidden group">
              <div className={`h-2 w-full ${stat.bg.replace('10', '40')}`} />
              <CardHeader className="flex flex-row items-center justify-between pb-4 pt-6">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</CardTitle>
                <div className={`${stat.bg} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-4 text-foreground">{stat.value}%</div>
                <Progress value={stat.value} className="h-2.5" />
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-headline font-bold flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-xl">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                  Syllabus Modules
                </h2>
                <Link href="/study" className="text-sm font-bold text-primary hover:underline flex items-center gap-1 group">
                  View All Topics <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="pinterest-grid">
                {modules.map((mod, i) => (
                  <Card key={i} className="group hover:scale-[1.02] transition-all duration-300 border-none bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-xl rounded-3xl overflow-hidden cursor-pointer">
                    <CardHeader className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="bg-primary/5 p-3 rounded-2xl group-hover:bg-primary/20 transition-colors">
                          <BookOpen className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest bg-muted text-muted-foreground px-2 py-1 rounded-full">{mod.tag}</span>
                      </div>
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors text-foreground">{mod.title}</CardTitle>
                      <CardDescription className="text-sm mt-2">{mod.desc}</CardDescription>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 pt-0">
                      <div className="flex items-center gap-4 mt-2">
                        <Progress value={mod.progress} className="h-1.5 flex-1" />
                        <span className="text-[10px] font-bold font-mono text-muted-foreground">{mod.progress}%</span>
                      </div>
                      <Button asChild variant="secondary" className="w-full mt-6 rounded-2xl font-bold bg-primary/5 hover:bg-primary hover:text-white transition-all">
                        <Link href={mod.link}>Start Learning</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Card className="border-none bg-accent text-white rounded-[2rem] shadow-xl overflow-hidden relative">
              <div className="absolute -right-8 -bottom-8 opacity-20">
                <Award className="w-40 h-40" />
              </div>
              <CardHeader className="relative z-10 p-8">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Award className="w-8 h-8" />
                  Practice Arena
                </CardTitle>
                <CardDescription className="text-white/80 text-base mt-2">
                  Adaptive tests modeled on the latest Subject Code 101 patterns.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 p-8 pt-0">
                <Button className="w-full h-16 bg-white text-accent hover:bg-white/90 rounded-2xl font-bold text-xl shadow-lg group" asChild>
                  <Link href="/quiz">Start Practice Set <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm rounded-[2rem] p-4">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  Exam Checklist
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-border/50 text-sm font-bold text-foreground">
                  <div className="bg-primary/10 p-2 rounded-xl">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  50 Total Questions
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-border/50 text-sm font-bold text-foreground">
                  <div className="bg-primary/10 p-2 rounded-xl">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  60 Minutes Limit
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-border/50 text-sm font-bold text-foreground">
                  <div className="bg-primary/10 p-2 rounded-xl">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
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
