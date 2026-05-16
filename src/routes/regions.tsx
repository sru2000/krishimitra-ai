import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { SectionCard } from "@/components/ui-blocks/SectionCard";
import { regions, riskColor, type Region } from "@/data/mockData";

export const Route = createFileRoute("/regions")({
  head: () => ({ meta: [{ title: "Region Risk · KrishiMitra AI" }] }),
  component: Regions,
});

const RiskMap = lazy(() => import("@/components/map/RiskMap"));

function Regions() {
  const [selected, setSelected] = useState<Region>(regions[0]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold">Region Risk Monitoring</h1>
        <p className="text-sm text-muted-foreground mt-1">Live geospatial intelligence across Andhra Pradesh and Telangana.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Outbreak heatmap" subtitle="Bubble size = priority score · color = risk level" className="lg:col-span-2">
          <div className="h-[520px] rounded-xl overflow-hidden border border-border">
            <Suspense fallback={<div className="h-full grid place-items-center text-sm text-muted-foreground">Loading map…</div>}>
              <RiskMap regions={regions} onSelect={setSelected} selectedId={selected.id} />
            </Suspense>
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-xs">
            {(["critical", "high", "medium", "low"] as const).map((r) => (
              <div key={r} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ background: riskColor(r) }} /><span className="capitalize text-muted-foreground">{r}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Region detail" subtitle={`${selected.name}, ${selected.state}`}>
          <div className="space-y-4">
            <div className="rounded-xl p-4" style={{ background: `${riskColor(selected.risk)}15`, border: `1px solid ${riskColor(selected.risk)}40` }}>
              <div className="text-xs uppercase tracking-wider" style={{ color: riskColor(selected.risk) }}>{selected.risk} risk</div>
              <div className="font-display text-4xl font-bold mt-1" style={{ color: riskColor(selected.risk) }}>{selected.priorityScore}</div>
              <div className="text-xs text-muted-foreground">Priority score</div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Stat label="Rainfall" value={`${selected.rainfall}mm`} />
              <Stat label="Humidity" value={`${selected.humidity}%`} />
              <Stat label="Temp" value={`${selected.temp}°C`} />
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Pest risk index</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-primary" style={{ width: `${selected.pestRisk}%` }} />
                </div>
                <span className="font-bold tabular-nums">{selected.pestRisk}</span>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Active crops</div>
              <div className="flex flex-wrap gap-1.5">
                {selected.crops.map((c) => <span key={c} className="text-xs px-2 py-1 rounded-full bg-muted/60">{c}</span>)}
              </div>
            </div>

            {selected.outbreak && (
              <div className="rounded-xl p-3 bg-destructive/10 border border-destructive/30 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                <div className="text-xs"><span className="font-semibold text-destructive">Active outbreak: </span>{selected.outbreak}</div>
              </div>
            )}

            <button className="w-full h-10 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90">
              Dispatch field rep
            </button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg p-3 border border-border bg-card/30 text-center">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-display font-bold mt-0.5">{value}</div>
    </div>
  );
}
