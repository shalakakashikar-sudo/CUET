"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { MessageSquare, Layers, Hash, PenTool, BookOpen, ChevronRight } from "lucide-react"

const modules = [
  { name: "Reading Comprehension", href: "/study/reading-comprehension", icon: MessageSquare },
  { name: "Sentence Rearrangement", href: "/study/sentence-rearrangement", icon: Layers },
  { name: "Synonyms & Antonyms", href: "/study/synonyms-antonyms", icon: Hash },
  { name: "Match the Following", href: "/study/match-the-following", icon: PenTool },
  { name: "Fill in the Blanks", href: "/study/fill-in-the-blanks", icon: BookOpen },
]

export function ModuleNavigator() {
  const pathname = usePathname()

  return (
    <Card className="border-none shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Curriculum Navigator</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <nav className="flex flex-col">
          {modules.map((module) => {
            const isActive = pathname === module.href
            return (
              <Link
                key={module.href}
                href={module.href}
                className={cn(
                  "flex items-center gap-3 px-6 py-4 transition-all duration-200 group border-l-4",
                  isActive 
                    ? "bg-primary/10 border-primary text-primary font-bold" 
                    : "border-transparent text-foreground/60 hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <module.icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", isActive ? "text-primary" : "text-muted-foreground")} />
                <span className="text-sm flex-1">{module.name}</span>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            )
          })}
        </nav>
      </CardContent>
    </Card>
  )
}
