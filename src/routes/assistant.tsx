import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, Bot, User } from "lucide-react";
import { SectionCard } from "@/components/ui-blocks/SectionCard";

export const Route = createFileRoute("/assistant")({
  head: () => ({ meta: [{ title: "AI Assistant · KrishiMitra AI" }] }),
  component: Assistant,
});

interface Msg { role: "user" | "assistant"; content: string; }

const suggestions = [
  "Why is Guntur our top priority region today?",
  "What should I tell Ravi Kumar about his chilli crop?",
  "Summarize this week's pest outbreak risks",
  "Recommend products for Warangal cotton fields",
];

const cannedResponses: Record<string, string> = {
  default: "Based on current field telemetry across AP and Telangana, I'm seeing elevated risk in Guntur (priority score 94) driven by 86% humidity and an active thrips outbreak on chilli. I'd recommend dispatching field reps to brief farmers on Amistar Top 325 SC application within the next 48 hours. Confidence: 92%.",
  guntur: "Guntur scores 94 today because three signals converged:\n\n1. **Humidity at 86%** — historically a precursor to fungal infection in chilli within 72h.\n2. **Active thrips outbreak** confirmed across 4 villages, accelerating secondary infections.\n3. **Inventory pressure** — Amistar Top 325 SC stock in the Guntur depot is at 142 units against a reorder threshold of 200.\n\n**Recommended action:** Mobilize 6 field reps for farmer briefings; trigger reorder PO for 250 units; activate Telugu advisory broadcast.",
  ravi: "Ravi Kumar farms 8 acres of chilli in Tenali, Guntur — risk score 88. His preferred language is Telugu.\n\n**Advisory (te):** \"అధిక తేమ మరియు థ్రిప్స్ ఉధృతి గుర్తించబడింది. 48 గంటలలోపు అమిస్టార్ టాప్ 325 SC ను లీటరుకు 1ml చొప్పున పిచికారీ చేయండి.\"\n\nLast visit was 2 days ago — recommend a follow-up call today.",
  pest: "**This week's pest outbreak risk summary:**\n\n• **Thrips (Chilli) — Guntur, Krishna**: Active outbreak, 78% spread probability\n• **Pink bollworm (Cotton) — Warangal**: Larval count above ETL, peak moth flight Thu–Sat\n• **Blast (Rice) — Krishna**: Leaf wetness >10h + night temp 22–26°C matching risk window\n\nTotal estimated exposure: ~14,200 acres across 6 districts.",
  warangal: "For Warangal cotton fields:\n\n• **Primary**: Ampligo 150 ZC at 80ml/acre — controls pink bollworm at current larval pressure\n• **Preventive**: PB Knot pheromone dispensers — disrupts moth mating during this week's flight peak\n• **Inventory check**: Ampligo stock is currently CRITICAL at 58 units. Suggest splitting allocation 60/40 between Warangal and Khammam.",
};

function pickResponse(q: string): string {
  const l = q.toLowerCase();
  if (l.includes("guntur")) return cannedResponses.guntur;
  if (l.includes("ravi")) return cannedResponses.ravi;
  if (l.includes("pest") || l.includes("outbreak")) return cannedResponses.pest;
  if (l.includes("warangal") || l.includes("cotton")) return cannedResponses.warangal;
  return cannedResponses.default;
}

function Assistant() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi Arjun — I'm your KrishiMitra agent. I have live access to field telemetry, inventory, farmer profiles, and the recommendation engine. Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, thinking]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: pickResponse(text) }]);
      setThinking(false);
    }, 900);
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold flex items-center gap-3">
            AI Assistant
            <span className="text-xs px-2 py-1 rounded-md bg-primary/15 text-primary flex items-center gap-1 font-normal"><Sparkles className="w-3 h-3" /> CrewAI · LangChain</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Natural-language interface to the field intelligence engine.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <SectionCard title="Conversation" subtitle="Multi-agent reasoning · grounded in live data" className="lg:col-span-3 flex flex-col" >
          <div className="flex-1 min-h-[420px] max-h-[60vh] overflow-y-auto scrollbar-thin space-y-4 pr-2">
            {messages.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-lg shrink-0 grid place-items-center ${m.role === "user" ? "bg-muted" : "bg-gradient-primary"}`}>
                  {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-primary-foreground" />}
                </div>
                <div className={`rounded-2xl px-4 py-3 max-w-[80%] text-sm whitespace-pre-line ${m.role === "user" ? "bg-primary/15 text-foreground" : "bg-card/60 border border-border"}`}>
                  {m.content}
                </div>
              </motion.div>
            ))}
            {thinking && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary grid place-items-center"><Bot className="w-4 h-4 text-primary-foreground" /></div>
                <div className="rounded-2xl px-4 py-3 bg-card/60 border border-border flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.span key={i} className="w-2 h-2 rounded-full bg-primary"
                      animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="mt-4 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about regions, farmers, products, weather…"
              className="flex-1 h-11 px-4 rounded-lg bg-muted/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40" />
            <button type="submit" className="h-11 px-5 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:opacity-90">
              <Send className="w-4 h-4" /> Send
            </button>
          </form>
        </SectionCard>

        <SectionCard title="Try asking" className="lg:col-span-1">
          <div className="space-y-2">
            {suggestions.map((s) => (
              <button key={s} onClick={() => send(s)}
                className="w-full text-left text-xs p-3 rounded-lg border border-border bg-card/30 hover:bg-card/60 hover:border-primary/40 transition-all">
                {s}
              </button>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/30">
            <div className="text-xs uppercase tracking-wider text-primary mb-2 font-semibold">Agent capabilities</div>
            <ul className="text-xs space-y-1.5 text-muted-foreground">
              <li>• Explain recommendations</li>
              <li>• Summarize field conditions</li>
              <li>• Generate farmer guidance</li>
              <li>• Multilingual translation</li>
              <li>• Risk forecasting</li>
            </ul>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
