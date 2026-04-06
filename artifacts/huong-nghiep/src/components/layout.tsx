import { Link, useLocation } from "wouter";
import { Compass, BookOpen, GraduationCap, Calculator, MessagesSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Trang chủ", icon: Compass },
    { href: "/truong", label: "Trường đại học", icon: GraduationCap },
    { href: "/nganh", label: "Ngành nghề", icon: BookOpen },
    { href: "/du-bao", label: "Dự báo", icon: Calculator },
    { href: "/dien-dan", label: "Diễn đàn", icon: MessagesSquare },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <span className="font-serif font-semibold text-lg">Hướng Nghiệp Thông Minh</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t bg-muted/40 py-12 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="font-serif text-lg mb-4">Người bạn đồng hành đáng tin cậy trên con đường chọn trường, chọn ngành.</p>
          <p className="text-sm">© {new Date().getFullYear()} Hướng Nghiệp Thông Minh. Dành cho học sinh THPT Việt Nam.</p>
        </div>
      </footer>
    </div>
  );
}
