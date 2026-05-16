import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Package, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SectionCard } from "@/components/ui-blocks/SectionCard";
import { inventory } from "@/data/mockData";

export const Route = createFileRoute("/inventory")({
  head: () => ({ meta: [{ title: "Inventory · KrishiMitra AI" }] }),
  component: Inventory,
});

const tooltipStyle = { background: "oklch(0.22 0.025 165)", border: "1px solid oklch(0.3 0.02 170 / 0.6)", borderRadius: 12, fontSize: 12, color: "oklch(0.97 0.01 150)" };

const statusColor = { ok: "var(--color-success)", low: "var(--color-warning)", critical: "var(--color-destructive)" } as const;

function Inventory() {
  const critical = inventory.filter(i => i.status === "critical").length;
  const low = inventory.filter(i => i.status === "low").length;
  const total = inventory.reduce((s, i) => s + i.stock, 0);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold">Inventory</h1>
        <p className="text-sm text-muted-foreground mt-1">Stock-on-hand, reorder triggers and demand forecasting.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary grid place-items-center"><Package className="w-5 h-5" /></div>
          <div><div className="text-xs uppercase tracking-wider text-muted-foreground">Total units</div><div className="font-display text-2xl font-bold">{total.toLocaleString()}</div></div>
        </div>
        <div className="glass rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-warning/15 text-warning grid place-items-center"><TrendingUp className="w-5 h-5" /></div>
          <div><div className="text-xs uppercase tracking-wider text-muted-foreground">Low stock</div><div className="font-display text-2xl font-bold">{low}</div></div>
        </div>
        <div className="glass rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-destructive/15 text-destructive grid place-items-center"><AlertTriangle className="w-5 h-5" /></div>
          <div><div className="text-xs uppercase tracking-wider text-muted-foreground">Critical</div><div className="font-display text-2xl font-bold">{critical}</div></div>
        </div>
      </div>

      <SectionCard title="Stock vs reorder point" subtitle="Current units against AI-predicted reorder threshold">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={inventory}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.02 170 / 0.3)" />
            <XAxis dataKey="product" stroke="oklch(0.72 0.02 160)" fontSize={10} angle={-15} textAnchor="end" height={70} />
            <YAxis stroke="oklch(0.72 0.02 160)" fontSize={11} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "oklch(0.3 0.02 170 / 0.2)" }} />
            <Bar dataKey="stock" fill="oklch(0.78 0.19 145)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="reorder" fill="oklch(0.82 0.17 85)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      <SectionCard title="Inventory ledger">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="py-3 px-2">SKU</th>
                <th className="py-3 px-2">Product</th>
                <th className="py-3 px-2">Category</th>
                <th className="py-3 px-2 text-right">Stock</th>
                <th className="py-3 px-2 text-right">Reorder</th>
                <th className="py-3 px-2 text-right">Week sales</th>
                <th className="py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((i) => (
                <tr key={i.sku} className="border-b border-border/50 hover:bg-card/40 transition-colors">
                  <td className="py-3 px-2 font-mono text-xs text-muted-foreground">{i.sku}</td>
                  <td className="py-3 px-2 font-medium">{i.product}</td>
                  <td className="py-3 px-2"><span className="text-xs px-2 py-0.5 rounded-full bg-muted/60">{i.category}</span></td>
                  <td className="py-3 px-2 text-right tabular-nums">{i.stock}</td>
                  <td className="py-3 px-2 text-right tabular-nums text-muted-foreground">{i.reorder}</td>
                  <td className="py-3 px-2 text-right tabular-nums">{i.weekSales}</td>
                  <td className="py-3 px-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-md" style={{ background: `${statusColor[i.status]}20`, color: statusColor[i.status] }}>
                      {i.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
