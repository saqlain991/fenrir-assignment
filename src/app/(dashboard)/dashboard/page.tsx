"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, ColumnsIcon, Plus, Ban, AlertTriangle, AlertCircle, Info, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockScans } from "@/data/mockData";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredScans = useMemo(() => {
    if (!searchQuery) return mockScans;
    return mockScans.filter(scan => 
      scan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <span>Org: <strong className="text-foreground font-medium">Project X</strong></span>
          <div className="w-px h-4 bg-border mx-2" />
          <span>Owner: <strong className="text-foreground font-medium">Nammagiri</strong></span>
          <div className="w-px h-4 bg-border mx-2" />
          <span>Total Scans: <strong className="text-foreground font-medium">100</strong></span>
          <div className="w-px h-4 bg-border mx-2" />
          <span>Scheduled: <strong className="text-foreground font-medium">1000</strong></span>
          <div className="w-px h-4 bg-border mx-2" />
          <span>Rescans: <strong className="text-foreground font-medium">100</strong></span>
          <div className="w-px h-4 bg-border mx-2" />
          <span>Failed Scans: <strong className="text-foreground font-medium">100</strong></span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0 border border-border px-3 py-1.5 rounded-full bg-surface">
          <RefreshCw className="w-3.5 h-3.5 text-accent" />
          10 mins ago
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Critical Severity", count: 86, change: "+2%", icon: Ban, color: "text-critical", bg: "bg-critical/10", changeColor: "text-critical" },
          { label: "High Severity", count: 16, change: "+0.9%", icon: AlertTriangle, color: "text-high", bg: "bg-high/10", changeColor: "text-critical" }, // Note: High increase might be treated as negative (red) logically
          { label: "Medium Severity", count: 26, change: "-0.9%", icon: AlertCircle, color: "text-medium", bg: "bg-medium/10", changeColor: "text-low" },
          { label: "Low Severity", count: 16, change: "+0.9%", icon: Info, color: "text-low", bg: "bg-low/10", changeColor: "text-critical" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-surface border border-border rounded-xl p-5 flex flex-col relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-foreground">{stat.label}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-end gap-3 mt-auto">
                <span className="text-3xl font-bold">{stat.count}</span>
                <span className={`text-xs font-medium mb-1 ${stat.changeColor}`}>
                  {stat.change.startsWith('+') ? '↑' : '↓'} {stat.change} {stat.change.startsWith('-') ? 'decrease' : 'increase'} than yesterday
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Table Section */}
      <div className="bg-surface border border-border rounded-xl flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-muted/20">
          <div className="w-full sm:max-w-md">
            <Input 
              icon={<Search className="w-4 h-4" />}
              placeholder="Search scans by name or type..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-surface"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none gap-2">
              <Filter className="w-4 h-4" /> Filter
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none gap-2">
              <ColumnsIcon className="w-4 h-4" /> Column
            </Button>
            <Button variant="teal" className="flex-1 sm:flex-none gap-2 px-5 shadow-accent/20">
              <Plus className="w-4 h-4" /> New scan
            </Button>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Scan Name</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Progress</th>
                <th className="px-6 py-4 font-medium text-center">Vulnerability</th>
                <th className="px-6 py-4 font-medium text-right">Last Scan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredScans.map((scan) => (
                <tr 
                  key={scan.id} 
                  className="hover:bg-muted/30 transition-colors group cursor-pointer"
                  onClick={() => window.location.href = `/scans/${scan.id}`}
                >
                  <td className="px-6 py-4 font-medium text-foreground group-hover:text-accent transition-colors">
                    <Link href={`/scans/${scan.id}`}>{scan.name}</Link>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{scan.type}</td>
                  <td className="px-6 py-4">
                    <Badge variant={scan.status.toLowerCase() as any} className="capitalize relative">
                      {scan.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-24 bg-muted overflow-hidden rounded-full">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${scan.status === 'Failed' ? 'bg-critical' : 'bg-accent'}`}
                          style={{ width: `${scan.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground font-medium w-9">
                        {scan.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1.5 min-w-[120px]">
                      {scan.vulnerabilities.critical !== null && (
                        <span className="w-6 h-6 rounded bg-critical flex items-center justify-center text-[10px] font-bold text-white leading-none">
                          {scan.vulnerabilities.critical}
                        </span>
                      )}
                      {scan.vulnerabilities.high !== null && (
                        <span className="w-6 h-6 rounded bg-high flex items-center justify-center text-[10px] font-bold text-white leading-none">
                          {scan.vulnerabilities.high}
                        </span>
                      )}
                      {scan.vulnerabilities.medium !== null && (
                        <span className="w-6 h-6 rounded bg-medium flex items-center justify-center text-[10px] font-bold text-[#1A1A1A] leading-none">
                          {scan.vulnerabilities.medium}
                        </span>
                      )}
                      {scan.vulnerabilities.low !== null && (
                        <span className="w-6 h-6 rounded bg-low flex items-center justify-center text-[10px] font-bold text-white leading-none">
                          {scan.vulnerabilities.low}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-muted-foreground">
                    {scan.lastScan}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredScans.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No scans found matching your search.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground bg-muted/10">
          <span>Showing {filteredScans.length} of {mockScans.length} Scans</span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded border border-border flex items-center justify-center hover:bg-muted disabled:opacity-50">&lt;</button>
            <button className="w-7 h-7 rounded border border-border flex items-center justify-center hover:bg-muted">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
