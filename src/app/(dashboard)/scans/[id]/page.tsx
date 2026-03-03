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
  FlaskConical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockScans, mockLogs, mockFindings } from "@/data/mockData";

const STEPS = [
  { id: "spidering", label: "Spidering", icon: Search },
  { id: "mapping", label: "Mapping", icon: FileText },
  { id: "testing", label: "Testing", icon: FlaskConical },
  { id: "validating", label: "Validating", icon: ShieldCheck },
  { id: "reporting", label: "Reporting", icon: CheckCircle2 },
];

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
            parts.push(<span key={`${highlight}-${i}`} className="text-accent">{highlight}</span>);
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
            <span className="text-accent">{scan.name}</span>
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
        <div className="bg-surface border border-border rounded-xl p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Circular Progress */}
            <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="283" strokeDashoffset="283" className="text-accent transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold">0%</span>
                <span className="text-xs text-muted-foreground">In Progress</span>
              </div>
            </div>

            {/* Step Tracker */}
            <div className="flex-1 w-full max-w-3xl relative">
              <div className="absolute top-6 left-6 right-6 h-0.5 bg-muted -z-10" />
              <div className="flex justify-between relative">
                {STEPS.map((step, idx) => {
                  const isActive = idx === 0;
                  const Icon = step.icon;
                  return (
                    <div key={idx} className="flex flex-col items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isActive ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20" : "bg-surface border-2 border-muted text-muted-foreground"}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-sm font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Scan Type</p>
              <p className="text-sm font-medium">{scan.type}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Targets</p>
              <p className="text-sm font-medium">google.com</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Started At</p>
              <p className="text-sm font-medium">Nov 22, 09:00AM</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Credentials</p>
              <p className="text-sm font-medium">2 Active</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Files</p>
              <p className="text-sm font-medium">Control.pdf</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Checklists</p>
              <p className="text-sm font-medium text-accent">40/350</p>
            </div>
          </div>
        </div>

        {/* Console and Findings Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Console */}
          <div className="lg:col-span-2 bg-surface flex flex-col border border-border rounded-xl overflow-hidden h-[600px]">
            <div className="flex items-center justify-between p-3 border-b border-border bg-muted/20">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                <span className="font-medium text-sm">Live Scan Console</span>
                <Badge variant="default" className="bg-background border border-border font-normal text-muted-foreground">{scanState}</Badge>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md"><ChevronDown className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md"><X className="w-4 h-4" /></Button>
              </div>
            </div>

            <div className="flex items-center border-b border-border px-4">
              {['Activity Log', 'Verification Loops'].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1 bg-[#10191E] text-gray-300 p-4 font-mono text-xs sm:text-sm overflow-y-auto">
              <div className="space-y-4">
                {activeTab === 'Activity Log' ? (
                  mockLogs.map((log) => (
                    <div key={log.id} className="leading-relaxed">
                      <span className="text-muted-foreground mr-3">{log.timestamp}</span>
                      <span>{renderLogMessage(log.message, log.highlightTags)}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-muted-foreground italic">No verification loops initialized yet.</div>
                )}
              </div>
            </div>
          </div>

          {/* Finding Log */}
          <div className="bg-surface flex flex-col border border-border rounded-xl overflow-hidden h-[600px]">
            <div className="p-4 border-b border-border bg-muted/10 font-medium text-sm">
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
                  <p className="text-xs font-mono text-accent mb-2">{finding.endpoint}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {finding.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="bg-surface border-t border-border px-6 py-3 flex items-center justify-between text-xs font-medium z-10 shrink-0 overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-6 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
            <span className="text-muted-foreground">Sub-Agents: <strong className="text-foreground">0</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
            <span className="text-muted-foreground">Parallel Executions: <strong className="text-foreground">2</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
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
