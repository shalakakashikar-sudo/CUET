import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Compass, ArrowRight, Target, ShieldCheck, Trophy, Zap } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const primaryActions = [
    {
      title: "Strategy Guide",
      desc: "Master the logic for a perfect 250/250 score.",
      icon: Compass,
      link: "/strategy",
      color: "bg-amber-100 text-amber-600",
      btnText: "View Blueprint"
    },
    {
      title: "Curriculum",
      desc: "Deep dive into Code 101 rules and traps.",
      icon: BookOpen,
      link: "/study",
      color: "bg-primary/10 text-primary",
      btnText: "Explore Topics"
    },
    {
      title: "Adaptive Quiz",
      desc: "Simulate the 60-min exam with +5/-1 scoring.",
      icon: Trophy,
      link: "/quiz",
      color: "bg-emerald-100 text-emerald-600",
      btnText: "Start Practice"
    }
  ]

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="mb-12 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-4 bg-primary/10 text-primary px-4 py-1.5 rounded-full border border-primary/20 text-xs font-bold uppercase tracking-widest">
            CUET 2026 | Subject Code: 101
          </div>
          <h1 className="text-5xl font-headline font-bold text-foreground tracking-tight mb-4">The Verbal Vantage</h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">Precision-engineered preparation for the 100th percentile in CUET English.</p>
        </header>

        {/* Action Grid */}
        <section className="grid md:grid-cols-3 gap-8 mb-16 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {primaryActions.map((action, i) => (
            <Card key={i} className="border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2rem] bg-white/70 backdrop-blur-sm overflow-hidden group flex flex-col">
              <CardHeader className="p-8 pb-4">
                <div className={`p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform ${action.color}`}>
                  <action.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">{action.title}</CardTitle>
                <CardDescription className="text-base mt-2">{action.desc}</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 mt-auto">
                <Button asChild className="w-full h-12 rounded-xl font-bold text-base shadow-sm group" variant={i === 2 ? "default" : "secondary"}>
                  <Link href={action.link}>
                    {action.btnText} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Quick Stats/Checklist */}
        <section className="grid md:grid-cols-2 gap-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <Card className="border-none bg-primary text-white rounded-[2rem] shadow-xl p-8 overflow-hidden relative">
            <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
              <Target className="w-64 h-64" />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-6 h-6" />
                Mission: 250/250
              </h2>
              <p className="text-white/80 text-lg mb-6 leading-relaxed">
                In Subject Code 101, accuracy is your greatest asset. Every correct answer maintains your momentum toward the maximum score.
              </p>
              <div className="flex items-center gap-4 bg-white/20 px-6 py-3 rounded-2xl backdrop-blur-sm border border-white/30 w-fit font-bold">
                <span className="text-3xl">50 / 50</span>
                <span className="text-white/60">Correct Answers</span>
              </div>
            </div>
          </Card>

          <Card className="border-none shadow-sm bg-white/70 backdrop-blur-sm rounded-[2rem] p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-foreground">
              <ShieldCheck className="w-6 h-6 text-primary" />
              Elite Standards
            </h2>
            <div className="space-y-4">
              {[
                "All 50 Questions Compulsory",
                "60 Minutes Total Time",
                "+5 for Accuracy | -1 for Errors",
                "Zero Guesswork Strategy"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-foreground font-medium">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </section>
      </main>
    </div>
  )
}
