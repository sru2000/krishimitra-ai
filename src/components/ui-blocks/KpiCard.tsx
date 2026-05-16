import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface Props {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  hint: string;
  index?: number;
}

export function KpiCard({ label, value, delta, trend, hint, index = 0 }: Props) {
  const up = trend === "up";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass rounded-2xl p-5 relative overflow-hidden group"
    >
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-colors" />
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-2 flex items-end justify-between">
        <div className="font-display text-4xl font-bold tracking-tight">{value}</div>
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md ${up ? "text-success bg-success/10" : "text-destructive bg-destructive/10"}`}>
          {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {delta}
        </div>
      </div>
      <div className="mt-3 text-xs text-muted-foreground">{hint}</div>
    </motion.div>
  );
}
