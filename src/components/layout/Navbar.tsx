
"use client"

import Link from "next/link"
import { BookOpen, Award, Compass, HelpCircle, LayoutDashboard, ChevronRight } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Study Material", href: "/study", icon: BookOpen },
  { name: "Adaptive Quiz", href: "/quiz", icon: Award },
  { name: "Strategy Guide", href: "/strategy", icon: Compass },
  { name: "Doubt Solving", href: "/doubts", icon: HelpCircle },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-headline font-bold text-xl tracking-tight">
          <div className="bg-primary p-1.5 rounded-lg shadow-sm border border-border/50">
            <Award className="w-6 h-6 text-foreground" />
          </div>
          <span>CUET Prep <span className="text-secondary-foreground/60">2026</span></span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-secondary-foreground/80 flex items-center gap-1.5",
                pathname === item.href ? "text-foreground font-semibold" : "text-muted-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </div>
        <div className="md:hidden">
          {/* Mobile menu could go here if needed, but keeping it minimalist for now */}
          <button className="p-2">
            <ChevronRight className="rotate-90" />
          </button>
        </div>
      </div>
    </nav>
  )
}
