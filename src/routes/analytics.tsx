import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SectionCard } from "@/components/ui-blocks/SectionCard";
import { pestRiskRadar, salesTrend, weeklyWeather } from "@/data/mockData";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics · KrishiMitra AI" }] }),
  component: Analytics,
});

const tooltipStyle = { background: "oklch(0.22 0.025 165)", border: "1px solid oklch(0.3 0.02 170 / 0.6)", borderRadius: 12, fontSize: 12, color: "oklch(0.97 0.01 150)" };

const yieldData = [
  { month: "Apr", chilli: 18, cotton: 22, rice: 28, maize: 24 },
  { month: "May", chilli: 22, cotton: 26, rice: 30, maize: 27 },
  { month: "Jun", chilli: 28, cotton: 30, rice: 34, maize: 30 },
  { month: "Jul", chilli: 34, cotton: 33, rice: 38, maize: 32 },
  { month: "Aug", chilli: 38, cotton: 35, rice: 42, maize: 34 },
  { month: "Sep", chilli: 42, cotton: 38, rice: 45, maize: 36 },
];

function Analytics() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Deep-dive metrics across weather, pest dynamics and product performance.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Pest risk decomposition" subtitle="ML feature contributions">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={pestRiskRadar}>
              <PolarGrid stroke="oklch(0.3 0.02 170 / 0.4)" />
              <PolarAngleAxis dataKey="factor" stroke="oklch(0.72 0.02 160)" fontSize={11} />
              <Radar dataKey="value" stroke="oklch(0.78 0.19 145)" fill="oklch(0.78 0.19 145)" fillOpacity={0.35} />
              <Tooltip contentStyle={tooltipStyle} />
            </RadarChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Crop yield index" subtitle="Tons/acre · normalized">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yieldData}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.02 170 / 0.3)" />
              <XAxis dataKey="month" stroke="oklch(0.72 0.02 160)" fontSize={11} />
              <YAxis stroke="oklch(0.72 0.02 160)" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="chilli" stroke="oklch(0.65 0.24 28)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="cotton" stroke="oklch(0.78 0.19 145)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="rice" stroke="oklch(0.75 0.13 230)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="maize" stroke="oklch(0.82 0.17 85)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Product mix sales" subtitle="6 months">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.02 170 / 0.3)" />
              <XAxis dataKey="month" stroke="oklch(0.72 0.02 160)" fontSize={11} />
              <YAxis stroke="oklch(0.72 0.02 160)" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="fungicide" stackId="a" fill="oklch(0.78 0.19 145)" />
              <Bar dataKey="insecticide" stackId="a" fill="oklch(0.82 0.17 85)" />
              <Bar dataKey="fertilizer" stackId="a" fill="oklch(0.75 0.13 230)" />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Weather pattern" subtitle="Humidity vs rainfall · 7 days">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyWeather}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.02 170 / 0.3)" />
              <XAxis dataKey="day" stroke="oklch(0.72 0.02 160)" fontSize={11} />
              <YAxis stroke="oklch(0.72 0.02 160)" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="humidity" stroke="oklch(0.75 0.13 230)" strokeWidth={2} />
              <Line type="monotone" dataKey="rainfall" stroke="oklch(0.78 0.19 145)" strokeWidth={2} />
              <Line type="monotone" dataKey="temp" stroke="oklch(0.82 0.17 85)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>
    </div>
  );
}
