"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Home,
  ChevronRight,
  StopCircle,
  Download,
  Search,
  FileText,
  Beaker,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  X,
  FlaskConical,
  Info,
  Timer,
  GitBranch
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockScans, mockLogs, mockFindings } from "@/data/mockData";

const STEPS = [
  { id: "spidering", label: "Spidering", icon: Search },
  { id: "mapping", label: "Mapping", icon: GitBranch },
  { id: "testing", label: "Testing", icon: FlaskConical },
  { id: "validating", label: "Validating", icon: ShieldCheck },
  { id: "reporting", label: "Reporting", icon: FileText },
];

function StatItem({ label, value, accent }: { label: string; value: string | undefined; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className={`text-sm font-semibold ${accent ? 'text-primary' : 'text-foreground'}`}>{value}</span>
    </div>
  );
}

export default function ScanDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("Activity Log");
  const [scanState, setScanState] = useState("Running...");

  const scan = mockScans.find(s => s.id === params.id) || mockScans[0];

  const renderLogMessage = (msg: string, highlights?: string[]) => {
    if (!highlights || highlights.length === 0) return msg;

    let rendered: React.ReactNode[] = [msg];
    highlights.forEach(highlight => {
      const parts: React.ReactNode[] = [];
      rendered.forEach(str => {
        if (typeof str !== "string") {
          parts.push(str);
          return;
        }
        const split = str.split(highlight);
        for (let i = 0; i < split.length; i++) {
          parts.push(split[i]);
          if (i < split.length - 1) {
            parts.push(<span key={`${highlight}-${i}`} className="text-primary">{highlight}</span>);
          }
        }
      });
      rendered = parts;
    });

    return rendered;
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top Header */}
      <div className="p-4 lg:py-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border bg-background z-10">
        <div className="flex items-center text-sm">
          <Link href="/dashboard" className="text-foreground font-semibold text-lg mr-4">Scan</Link>
          <div className="flex items-center text-muted-foreground gap-2">
            <Home className="w-4 h-4" />
            <ChevronRight className="w-4 h-4" />
            <Link href="#" className="hover:text-foreground">Private Assets</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary">{scan.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export Report
          </Button>
          <Button variant="destructive" className="gap-2" onClick={() => setScanState("Stopped")}>
            <StopCircle className="w-4 h-4" /> Stop Scan
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">

        {/* Progress Tracker Card */}
        <div className="bg-surface border border-border rounded-2xl p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-start">

            {/* ===== LEFT: Circular Progress ===== */}
            <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">

              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 rounded-full dark:bg-gray-900 ">
                <span className="text-3xl font-bold text-[#22CDAF] dark:text-[#22CDAF]">36%</span>
                <span className="text-xs text-muted-foreground mt-1">
                  In Progress
                </span>
              </div>
            </div>

            {/* ===== VERTICAL SEPARATOR ===== */}
            <div className="hidden lg:block w-px bg-border h-40 self-center" />

            {/* ===== RIGHT: Stages and Metadata ===== */}
            <div className="flex-1 w-full">

              {/* Connected Steps */}
              <div className="relative">
                {/* Background Line */}
                <div className="absolute top-6 left-6 right-6 h-[2px] bg-muted/40" />
                {/* Active Progress Line */}
                <div
                  className="absolute top-6 left-6 h-[2px] bg-primary transition-all duration-700"
                  style={{ width: "0%" }}
                />
                <div className="relative flex justify-between">
                  {STEPS.map((step, index) => {
                    const Icon = step.icon;
                    const activeIndex = 0; // Spidering active
                    const isCompleted = index < activeIndex;
                    const isActive = index === activeIndex;

                    return (
                      <div
                        key={step.id}
                        className="flex flex-col items-center text-center w-full relative z-10"
                      >
                        <div className="relative">
                          {isActive && (
                            <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping shadow-[0_0_15px_rgba(12,200,168,0.5)]" />
                          )}
                          <div
                            className={`
                    relative z-10 w-12 h-12 rounded-full flex items-center justify-center
                    border-2 transition-all duration-300
                    ${isCompleted
                                ? "bg-primary text-primary-foreground border-primary"
                                : isActive
                                  ? "bg-primary/80 text-primary border-primary"
                                  : "bg-background border-muted text-muted-foreground"
                              }
                  `}
                          >
                            <Icon className={isActive ? "w-5 h-5 text-white" : "w-5 h-5"} />
                          </div>
                        </div>
                        <span
                          className={`
                    mt-3 text-xs sm:text-sm font-medium whitespace-nowrap
                    ${isCompleted || isActive
                              ? "text-foreground"
                              : "text-muted-foreground"
                            }
                  `}
                        >
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Separator */}
              <div className="mt-10 border-t border-border" />

              {/* Metadata Section */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                <StatItem label="Scan Type" value={scan.type || "N/A"} />
                <StatItem label="Targets" value="google.com" />
                <StatItem label="Started At" value="Nov 22, 09:00AM" />
                <StatItem label="Credentials" value="2 Active" />
                <StatItem label="Files" value="Control.pdf" />
                <StatItem label="Checklists" value="40 / 350" accent />
              </div>
            </div>
          </div>
        </div>

        {/* Console and Findings Unified Card */}
        <div className="bg-surface flex flex-col border border-border rounded-xl overflow-hidden mt-6 shadow-sm">
          {/* Common Header */}
          <div className="flex items-center justify-between p-3 border-b border-border bg-muted/20">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span className="font-medium text-sm">Live Scan Console</span>
              <Badge variant="outline" className="bg-background border-border font-normal text-muted-foreground flex items-center gap-1 shadow-sm">
                <Timer className="w-3 h-3" /> {scanState}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md hover:bg-muted/50 cursor-pointer"><ChevronDown className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md hover:bg-muted/50 cursor-pointer"><X className="w-4 h-4" /></Button>
            </div>
          </div>

          {/* Grid content split */}
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border">
            {/* LEFT SIDE: Active Logs Box */}
            <div className="lg:col-span-2 flex flex-col h-[600px] bg-background">
              <div className="flex items-center border-b border-border px-4">
                {['Activity Log', 'Verification Loops'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex-1 bg-white dark:bg-[#10191E] text-gray-800 dark:text-gray-300 p-4 font-mono text-xs sm:text-sm overflow-y-auto">
                <div className="space-y-4">
                  {activeTab === 'Activity Log' ? (
                    mockLogs.map((log) => (
                      <div key={log.id} className="leading-relaxed">
                        <span className="text-muted-foreground mr-3">[{log.timestamp}]</span>
                        <span>{renderLogMessage(log.message, log.highlightTags)}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-muted-foreground italic">No verification loops initialized yet.</div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Finding Logs */}
            <div className="flex flex-col h-[600px] bg-background">
              <div className="p-3 px-4 border-b border-border font-semibold text-sm h-[46px] flex items-center shrink-0">
                Finding Log
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/5">
                {mockFindings.map((finding) => (
                  <div key={finding.id} className="bg-surface border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant={finding.severity.toLowerCase() as any}>{finding.severity}</Badge>
                      <span className="text-xs text-muted-foreground">{finding.timestamp}</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{finding.title}</h4>
                    <p className="text-xs font-mono text-primary mb-2">{finding.endpoint}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {finding.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="bg-surface border-t border-border px-6 py-3 flex items-center justify-between text-xs font-medium z-10 shrink-0 overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-6 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            <span className="text-muted-foreground">Sub-Agents: <strong className="text-foreground">0</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            <span className="text-muted-foreground">Parallel Executions: <strong className="text-foreground">2</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            <span className="text-muted-foreground">Operations: <strong className="text-foreground">1</strong></span>
          </div>
        </div>
        <div className="flex items-center gap-4 whitespace-nowrap ml-6">
          <span className="text-critical">Critical: 0</span>
          <span className="text-high">High: 0</span>
          <span className="text-medium">Medium: 0</span>
          <span className="text-low">Low: 0</span>
        </div>
      </div>
    </div>
  );
}
