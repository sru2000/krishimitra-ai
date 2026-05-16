import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AlertTriangle, CloudRain, Droplets, Thermometer, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { KpiCard } from "@/components/ui-blocks/KpiCard";
import { SectionCard } from "@/components/ui-blocks/SectionCard";
import { cropMix, kpis, recommendations, regions, riskColor, salesTrend, weeklyWeather } from "@/data/mockData";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Dashboard · KrishiMitra AI" }] }),
  component: Dashboard,
});

const tooltipStyle = {
  background: "oklch(0.22 0.025 165)",
  border: "1px solid oklch(0.3 0.02 170 / 0.6)",
  borderRadius: 12,
  fontSize: 12,
  color: "oklch(0.97 0.01 150)",
};

function Dashboard() {
  const priorityRegions = [...regions].sort((a, b) => b.priorityScore - a.priorityScore).slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-[0.08]" />
        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Field Force Intelligence · Live</div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Good morning, <span className="text-gradient">Arjun</span></h1>
            <p className="text-muted-foreground mt-2 max-w-xl">17 priority regions need attention today across Andhra Pradesh and Telangana. 3 critical advisories pending farmer outreach.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/regions" className="px-4 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
              View Risk Map <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/assistant" className="px-4 py-2.5 rounded-lg border border-border bg-card/50 text-sm font-medium flex items-center gap-2 hover:bg-card transition-colors">
              <Sparkles className="w-4 h-4" /> Ask AI
            </Link>
          </div>
        </div>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => <KpiCard key={k.label} {...k} index={i} />)}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Weather forecast" subtitle="7-day outlook · Andhra Pradesh" className="lg:col-span-2">
          <div className="grid grid-cols-3 gap-3 mb-4">
            <Stat icon={CloudRain} label="Rainfall" value="156mm" tint="info" />
            <Stat icon={Droplets} label="Humidity" value="82%" tint="primary" />
            <Stat icon={Thermometer} label="Avg Temp" value="29°C" tint="warning" />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weeklyWeather}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.78 0.19 145)" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="oklch(0.78 0.19 145)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.75 0.13 230)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="oklch(0.75 0.13 230)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.02 170 / 0.3)" />
              <XAxis dataKey="day" stroke="oklch(0.72 0.02 160)" fontSize={11} />
              <YAxis stroke="oklch(0.72 0.02 160)" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="humidity" stroke="oklch(0.75 0.13 230)" fill="url(#g2)" strokeWidth={2} />
              <Area type="monotone" dataKey="rainfall" stroke="oklch(0.78 0.19 145)" fill="url(#g1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Crop mix" subtitle="Active acreage tracked">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={cropMix} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3} stroke="none">
                {cropMix.map((e) => <Cell key={e.name} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {cropMix.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                  <span>{c.name}</span>
                </div>
                <span className="font-medium tabular-nums">{c.value}%</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Priority regions + Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Priority regions" subtitle="Sorted by intelligence score" className="lg:col-span-2"
          action={<Link to="/regions" className="text-xs text-primary hover:underline flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></Link>}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {priorityRegions.map((r, i) => (
              <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-xl p-4 border border-border bg-card/30 hover:bg-card/60 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.state}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl font-bold" style={{ color: riskColor(r.risk) }}>{r.priorityScore}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">score</div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {r.crops.map((c) => (
                    <span key={c} className="text-[10px] px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground">{c}</span>
                  ))}
                </div>
                {r.outbreak && (
                  <div className="mt-3 flex items-center gap-2 text-xs">
                    <AlertTriangle className="w-3.5 h-3.5" style={{ color: riskColor(r.risk) }} />
                    <span style={{ color: riskColor(r.risk) }}>{r.outbreak}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Product sales" subtitle="6-month trend (units)">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={salesTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.02 170 / 0.3)" />
              <XAxis dataKey="month" stroke="oklch(0.72 0.02 160)" fontSize={11} />
              <YAxis stroke="oklch(0.72 0.02 160)" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "oklch(0.3 0.02 170 / 0.2)" }} />
              <Bar dataKey="fungicide" fill="oklch(0.78 0.19 145)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="insecticide" fill="oklch(0.82 0.17 85)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="fertilizer" fill="oklch(0.75 0.13 230)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      {/* AI Recommendations */}
      <SectionCard title="AI recommendations" subtitle="Next-best-action with explainable reasoning"
        action={<span className="text-xs px-2 py-1 rounded-md bg-primary/15 text-primary flex items-center gap-1"><Sparkles className="w-3 h-3" /> Live</span>}>
        <div className="space-y-3">
          {recommendations.slice(0, 3).map((rec, i) => (
            <motion.div key={rec.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
              className="rounded-xl p-4 border border-border bg-card/30 flex flex-col md:flex-row md:items-center gap-4">
              <div className="md:w-1/4">
                <div className="text-xs uppercase tracking-wider" style={{ color: riskColor(rec.urgency) }}>{rec.urgency}</div>
                <div className="font-semibold mt-1">{rec.region}</div>
                <div className="text-xs text-muted-foreground">{rec.crop}</div>
              </div>
              <div className="flex-1">
                <div className="font-medium">{rec.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{rec.reason}</div>
                {rec.product !== "—" && <div className="text-xs mt-2"><span className="text-muted-foreground">Product: </span><span className="text-primary font-medium">{rec.product}</span></div>}
              </div>
              <div className="md:w-32 text-right">
                <div className="text-xs text-muted-foreground">Confidence</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-gradient-primary" style={{ width: `${rec.confidence}%` }} />
                  </div>
                  <span className="text-sm font-bold tabular-nums">{rec.confidence}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function Stat({ icon: Icon, label, value, tint }: { icon: typeof CloudRain; label: string; value: string; tint: "info" | "primary" | "warning" }) {
  const colors = { info: "text-info bg-info/10", primary: "text-primary bg-primary/10", warning: "text-warning bg-warning/10" } as const;
  return (
    <div className="rounded-xl p-3 border border-border bg-card/30">
      <div className={`w-8 h-8 rounded-lg grid place-items-center ${colors[tint]}`}><Icon className="w-4 h-4" /></div>
      <div className="text-xs text-muted-foreground mt-2">{label}</div>
      <div className="font-display text-xl font-bold">{value}</div>
    </div>
  );
}
