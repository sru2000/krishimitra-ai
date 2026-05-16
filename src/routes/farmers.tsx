import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Languages, MapPin, Phone, Sparkles } from "lucide-react";
import { SectionCard } from "@/components/ui-blocks/SectionCard";
import { advisories, farmers } from "@/data/mockData";

export const Route = createFileRoute("/farmers")({
  head: () => ({ meta: [{ title: "Farmer Insights · KrishiMitra AI" }] }),
  component: Farmers,
});

const langLabels = { en: "English", te: "తెలుగు", hi: "हिन्दी" } as const;

function Farmers() {
  const [lang, setLang] = useState<"en" | "te" | "hi">("en");

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Farmer Insights</h1>
          <p className="text-sm text-muted-foreground mt-1">Personalized profiles, risk scores and multilingual advisories.</p>
        </div>
        <div className="flex items-center gap-2 p-1 rounded-lg glass">
          <Languages className="w-4 h-4 text-primary ml-2" />
          {(Object.keys(langLabels) as Array<keyof typeof langLabels>).map((k) => (
            <button key={k} onClick={() => setLang(k)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${lang === k ? "bg-gradient-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {langLabels[k]}
            </button>
          ))}
        </div>
      </header>

      {/* Advisories */}
      <SectionCard title="Multilingual advisory broadcast" subtitle="Auto-translated by AI agent · sent via SMS / WhatsApp"
        action={<span className="text-xs px-2 py-1 rounded-md bg-primary/15 text-primary flex items-center gap-1"><Sparkles className="w-3 h-3" /> {langLabels[lang]}</span>}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {Object.entries(advisories).map(([key, msgs]) => (
            <div key={key} className="rounded-xl p-4 border border-border bg-card/30">
              <div className="text-xs uppercase tracking-wider text-primary mb-2">{key.replace(/([A-Z])/g, " $1")}</div>
              <p className="text-sm leading-relaxed">{msgs[lang]}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Farmer list */}
      <SectionCard title="Farmer directory" subtitle={`${farmers.length} farmers in active rotation`}>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="py-3 px-2">Farmer</th>
                <th className="py-3 px-2">Location</th>
                <th className="py-3 px-2">Acres</th>
                <th className="py-3 px-2">Crops</th>
                <th className="py-3 px-2">Risk</th>
                <th className="py-3 px-2">Last visit</th>
                <th className="py-3 px-2">Lang</th>
                <th className="py-3 px-2"></th>
              </tr>
            </thead>
            <tbody>
              {farmers.map((f) => (
                <tr key={f.id} className="border-b border-border/50 hover:bg-card/40 transition-colors">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-primary grid place-items-center text-xs font-bold text-primary-foreground">
                        {f.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-medium">{f.name}</div>
                        <div className="text-xs text-muted-foreground">{f.id.toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" /> {f.village}, {f.district}
                    </div>
                  </td>
                  <td className="py-3 px-2 tabular-nums">{f.acres}</td>
                  <td className="py-3 px-2">
                    <div className="flex gap-1">
                      {f.crops.map((c) => <span key={c} className="text-[10px] px-2 py-0.5 rounded-full bg-muted/60">{c}</span>)}
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full" style={{
                          width: `${f.riskScore}%`,
                          background: f.riskScore > 70 ? "var(--color-destructive)" : f.riskScore > 50 ? "var(--color-warning)" : "var(--color-success)",
                        }} />
                      </div>
                      <span className="text-xs tabular-nums">{f.riskScore}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-xs text-muted-foreground">{f.lastVisit}</td>
                  <td className="py-3 px-2"><span className="text-[10px] uppercase">{f.preferredLang}</span></td>
                  <td className="py-3 px-2">
                    <button className="w-8 h-8 rounded-lg bg-muted/50 hover:bg-primary/20 hover:text-primary grid place-items-center transition-colors">
                      <Phone className="w-3.5 h-3.5" />
                    </button>
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
