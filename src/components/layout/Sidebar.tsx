"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  Bell,
  Settings,
  Moon,
  Sun,
  Menu,
  X,
  Calendar,
  ClipboardCheck,
  FileChartColumnIncreasing,
  CircleQuestionMark,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "#", icon: ClipboardCheck },
  { name: "Scans", href: "/scans/1", icon: FileChartColumnIncreasing },
  { name: "Schedule", href: "#", icon: Calendar },
];

const BOTTOM_NAV_ITEMS = [
  { name: "Notifications", href: "#", icon: Bell },
  { name: "Settings", href: "#", icon: Settings },
  { name: "Support", href: "#", icon: CircleQuestionMark },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ✅ Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const NavLinks = ({
    items,
    className = "",
    activityItems = [] as string[],
  }: {
    items: typeof NAV_ITEMS | typeof BOTTOM_NAV_ITEMS;
    className?: string;
    activityItems?: string[];
  }) => (
    <nav className={`space-y-1 ${className}`}>
      {items.map((item) => {
        const isActive = pathname.startsWith(
          item.name.toLowerCase() === "scans" ? "/scans" : item.href
        );
        const Icon = item.icon;
        const hasActivity = activityItems.includes(item.name);

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive
              ? "bg-accent/10 text-accent"
              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {hasActivity && (
                <span className="absolute -bottom-1 -left-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white" />
              )}
            </div>
            {item.name}
          </Link>
        );
      })}
    </nav>
  );

  const ThemeIcon = ({ size = 5 }: { size?: number }) => {
    if (!mounted) {
      return <div className={`w-${size} h-${size}`} />;
    }

    return theme === "dark" ? (
      <Sun className={`w-${size} h-${size}`} />
    ) : (
      <Moon className={`w-${size} h-${size}`} />
    );
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-surface sticky top-0 z-40">
        <div className="flex items-center gap-3 cursor-pointer">
          <Image src="/logo.png" alt="Logo" width={26} height={26} />
          <span className="text-2xl font-bold tracking-tight cursor-pointer text-primary">aps</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <ThemeIcon size={5} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border 
          transition-transform duration-300 ease-in-out flex flex-col
          lg:translate-x-0 lg:static
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo (Desktop) */}
        <div className="p-6 hidden lg:flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={26} height={26} />
            <span className="text-xl font-bold tracking-tight text-primary cursor-pointer">
              aps
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <ThemeIcon size={4} />
          </Button>
        </div>

        {/* Navigation */}
        <div className="px-3 flex-1 overflow-y-auto py-4 lg:py-0">
          <NavLinks items={NAV_ITEMS} activityItems={["Scans"]} />

          <div className="my-8 border-t border-border mx-4" />

          <NavLinks
            items={BOTTOM_NAV_ITEMS}
            activityItems={["Notifications"]}
          />
        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-border m-3 rounded-2xl bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-400 shrink-0 overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=facc15"
                alt="User"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                admin@edu.com
              </p>
              <p className="text-xs text-muted-foreground truncate">
                Security Lead
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}