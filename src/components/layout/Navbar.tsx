"use client"

import Link from "next/link"
import { BookOpen, Award, Compass, LayoutDashboard, ChevronRight, Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { name: "Strategy Guide", href: "/strategy", icon: Compass },
  { name: "Study Material", href: "/study", icon: BookOpen },
  { name: "Adaptive Quiz", href: "/quiz", icon: Award },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-xl">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-headline font-bold text-xl tracking-tight text-primary">
          <div className="bg-primary/10 p-2 rounded-xl border border-primary/20">
            <Compass className="w-6 h-6 text-primary" />
          </div>
          <span className="hidden sm:inline-block">CUET Prep <span className="text-foreground/40 font-normal">2026</span></span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-2">
          <Link
            href="/"
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-primary/5 flex items-center gap-2",
              pathname === "/" ? "bg-primary text-white shadow-md" : "text-muted-foreground"
            )}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-primary/5 flex items-center gap-2",
                pathname === item.href ? "bg-primary text-white shadow-md" : "text-muted-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="flex items-center gap-4 text-lg font-medium p-4 rounded-2xl hover:bg-primary/10 transition-colors">
                  <LayoutDashboard className="w-6 h-6 text-primary" />
                  Dashboard
                </Link>
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="flex items-center gap-4 text-lg font-medium p-4 rounded-2xl hover:bg-primary/10 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}