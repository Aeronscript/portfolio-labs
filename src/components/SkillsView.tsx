import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  Braces,
  Cpu,
  Server,
  Orbit,
  Fingerprint,
  CheckCircle2,
  Play,
  Layers,
  ChevronRight,
  Code,
  Activity,
  Copy,
  Check,
} from "lucide-react";
import { useSoundEngine } from "@/pages/Landing";
import { cn } from "@/lib/utils";

const easeOut = [0.16, 1, 0.3, 1] as const;

export interface SkillDetail {
  name: string;
  level: number; // 1-100
  experience: string;
  tags: string[];
  codeSnippet?: string;
  codeLang?: string;
  summaryFR: string;
  summaryEN: string;
  liveDemoType?: "ui" | "ai" | "api" | "lua";
}

export interface SkillDomain {
  id: string;
  number: string;
  categoryFR: string;
  categoryEN: string;
  titleFR: string;
  titleEN: string;
  subtitleFR: string;
  subtitleEN: string;
  icon: React.ComponentType<{ className?: string }>;
  accentBg: string;
  badge: string;
  descriptionFR: string;
  descriptionEN: string;
  skills: SkillDetail[];
  metrics: {
    labelFR: string;
    labelEN: string;
    value: string;
  }[];
}

const SKILL_DOMAINS: SkillDomain[] = [
  {
    id: "frontend",
    number: "01",
    categoryFR: "FRONTEND & DESIGN SYSTEM",
    categoryEN: "FRONTEND & DESIGN SYSTEM",
    titleFR: "Développement Web & UI/UX",
    titleEN: "Web Development & UI/UX",
    subtitleFR: "Architectures modernes, composants réutilisables et micro-interactions fluides.",
    subtitleEN: "Modern architectures, reusable components, and fluid micro-interactions.",
    icon: Braces,
    accentBg: "bg-foreground text-background",
    badge: "CORE ENGINE",
    descriptionFR:
      "Conception d'expériences web ultra-réactives avec une attention obsessionnelle aux détails typographiques, aux espaces négatifs et à l'accessibilité. Intégration de design systems scalables.",
    descriptionEN:
      "Crafting highly responsive web experiences with obsessive attention to typographic details, negative space, and accessibility. Building scalable design systems.",
    metrics: [
      { labelFR: "Performance Lighthouse", labelEN: "Lighthouse Score", value: "99/100" },
      { labelFR: "Animations", labelEN: "Animations", value: "60-120 FPS" },
      { labelFR: "Norme WCAG", labelEN: "WCAG Standard", value: "AA Compliant" },
    ],
    skills: [
      {
        name: "React & Next.js",
        level: 95,
        experience: "5+ ans",
        tags: ["JSX/TSX", "Server Components", "App Router", "Hooks & Context", "Zustand"],
        codeLang: "typescript",
        codeSnippet: `// Next.js App Router & Server Action
export async function DynamicSkillCard({ skill }: { skill: SkillProps }) {
  const data = await fetchSkillAnalytics(skill.id);
  
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -4 }}
      className="p-6 rounded-2xl bg-card border border-border shadow-xl backdrop-blur-md"
    >
      <h3 className="font-display text-xl font-bold">{skill.name}</h3>
      <ProgressBar value={data.score} />
    </motion.div>
  );
}`,
        summaryFR: "Maîtrise complète de l'écosystème React, du SSR/SSG aux Server Components et la gestion d'état complexe.",
        summaryEN: "Full mastery of the React ecosystem, from SSR/SSG to Server Components and complex state management.",
        liveDemoType: "ui",
      },
      {
        name: "TypeScript",
        level: 92,
        experience: "4+ ans",
        tags: ["Strict Typing", "Generics", "Utility Types", "AST & Type Guards"],
        codeLang: "typescript",
        codeSnippet: `type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

interface AppConfig {
  theme: "dark" | "light";
  features: Record<string, boolean>;
}

export const CONFIG: DeepReadonly<AppConfig> = Object.freeze({
  theme: "dark",
  features: { aiEnabled: true, haptics: true }
});`,
        summaryFR: "Code typé de bout en bout pour une sécurité maximale à la compilation et une refactorisation sans risque.",
        summaryEN: "End-to-end typed code for maximum build-time security and zero-risk refactoring.",
        liveDemoType: "ui",
      },
      {
        name: "Tailwind CSS v4 & Motion",
        level: 96,
        experience: "4+ ans",
        tags: ["Utility-First", "Framer Motion", "Shadcn UI", "Design Systems"],
        codeLang: "tsx",
        codeSnippet: `<motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  className="px-5 py-2.5 rounded-full bg-foreground text-background font-semibold shadow-md"
>
  Explorer la démo
</motion.button>`,
        summaryFR: "Création d'interfaces élégantes avec Tailwind CSS et animations fluides pilotées par Framer Motion.",
        summaryEN: "Creating elegant interfaces with Tailwind CSS and fluid physics-based Framer Motion animations.",
        liveDemoType: "ui",
      },
    ],
  },
  {
    id: "ai",
    number: "02",
    categoryFR: "ARTIFICIAL INTELLIGENCE & AGENTS",
    categoryEN: "ARTIFICIAL INTELLIGENCE & AGENTS",
    titleFR: "Intelligence Artificielle & Generative AI",
    titleEN: "Artificial Intelligence & Generative AI",
    subtitleFR: "Orchestration de modèles LLM, agents autonomes et intégration d'APIs avancées.",
    subtitleEN: "LLM orchestration, autonomous agent systems, and advanced API integrations.",
    icon: Cpu,
    accentBg: "bg-muted text-foreground border border-border",
    badge: "INTELLIGENCE LAYER",
    descriptionFR: "Conception et déploiement d'agents intelligents capables d'exécuter des tâches autonomes, de raisonner à travers des chaînes de pensée et de communiquer via des flux de streaming temps réel.",
    descriptionEN: "Designing and deploying intelligent agents capable of executing autonomous tasks, reasoning through chain-of-thought, and streaming real-time outputs.",
    metrics: [
      { labelFR: "Modèles utilisés", labelEN: "Models Used", value: "Gemini 2.5 / 1.5 Pro" },
      { labelFR: "Architectures", labelEN: "Architectures", value: "RAG & Agents" },
      { labelFR: "Temps de réponse", labelEN: "Response Stream", value: "< 200ms Latency" },
    ],
    skills: [
      {
        name: "Google GenAI SDK & Gemini",
        level: 94,
        experience: "2+ ans",
        tags: ["@google/genai", "Structured Output", "Function Calling", "Multimodal", "Streaming"],
        codeLang: "typescript",
        codeSnippet: `import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateCodeReview(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      temperature: 0.2,
      systemInstruction: "Tu es un expert en révision de code TypeScript.",
    }
  });
  return response.text;
}`,
        summaryFR: "Intégration du SDK Google GenAI pour générer du contenu, traiter des images/vidéos et orchestrer des agents de code.",
        summaryEN: "Integration of Google GenAI SDK for content generation, multimodal processing, and agentic workflows.",
        liveDemoType: "ai",
      },
      {
        name: "Agents Autonomes & Function Calling",
        level: 90,
        experience: "2+ ans",
        tags: ["Tool Declarations", "Multi-Agent Networks", "RAG", "Vector Embeddings"],
        codeLang: "typescript",
        codeSnippet: `const searchTool = {
  name: "searchKnowledgeBase",
  description: "Cherche dans la documentation technique",
  parameters: { query: { type: "STRING" } }
};

// Intégration de boucle d'agent avec appels de fonctions automatiques
const agentResponse = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  tools: [{ functionDeclarations: [searchTool] }]
});`,
        summaryFR: "Création de systèmes autonomes capables d'interroger des bases de données et d'exécuter des actions API réelles.",
        summaryEN: "Building autonomous systems capable of querying databases and executing real API actions via tool use.",
        liveDemoType: "ai",
      },
    ],
  },
  {
    id: "backend",
    number: "03",
    categoryFR: "BACKEND & DISTRIBUTED SYSTEMS",
    categoryEN: "BACKEND & DISTRIBUTED SYSTEMS",
    titleFR: "Programmation & Back-End",
    titleEN: "Programming & Back-End",
    subtitleFR: "Architecture serveur, APIs haute disponibilité et gestion sécurisée des données.",
    subtitleEN: "Server architecture, high availability APIs, and secure data pipelines.",
    icon: Server,
    accentBg: "bg-muted text-foreground border border-border",
    badge: "BACKBONE",
    descriptionFR: "Développement de services back-end résilients en Python et Node.js. Conception d'APIs RESTful et GraphQL avec gestion optimisée de la mémoire et authentification OAuth2.",
    descriptionEN: "Developing resilient backend services in Python and Node.js. Designing RESTful & GraphQL APIs with optimized memory footprint and OAuth2 authentication.",
    metrics: [
      { labelFR: "Temps moyen API", labelEN: "Avg API Latency", value: "< 25ms" },
      { labelFR: "Base de données", labelEN: "Databases", value: "PostgreSQL / Convex / Redis" },
      { labelFR: "Couverture Tests", labelEN: "Test Coverage", value: "90%+" },
    ],
    skills: [
      {
        name: "Python & FastAPI",
        level: 90,
        experience: "4+ ans",
        tags: ["FastAPI", "Pydantic", "Asyncio", "SQLAlchemy", "Celery"],
        codeLang: "python",
        codeSnippet: `from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Portfolio Backend API")

class SkillPayload(BaseModel):
    name: str
    category: str
    proficiency: int

@app.post("/api/v1/skills/evaluate")
async def evaluate_skill(payload: SkillPayload):
    # Traitement asynchrone sécurisé
    return {"status": "success", "score": payload.proficiency * 1.15}`,
        summaryFR: "Microservices rapides et typés en Python avec documentation Swagger générée automatiquement et validation Pydantic.",
        summaryEN: "Fast, typed microservices in Python with auto-generated OpenAPI docs and Pydantic validation.",
        liveDemoType: "api",
      },
      {
        name: "Node.js & Express / Hono",
        level: 94,
        experience: "5+ ans",
        tags: ["Node.js", "Express", "Hono.js", "JWT & OAuth2", "Middleware Pipeline"],
        codeLang: "typescript",
        codeSnippet: `import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();
app.use("*", cors());

app.get("/api/health", (c) => c.json({ status: "online", timestamp: Date.now() }));

export default app;`,
        summaryFR: "Serveurs HTTP ultra-légers et performants pour la gestion de requêtes à fort trafic et websockets.",
        summaryEN: "Ultra-lightweight and high-performance HTTP servers handling high traffic and real-time websockets.",
        liveDemoType: "api",
      },
    ],
  },
  {
    id: "specialized",
    number: "04",
    categoryFR: "SPECIALIZED & REAL-TIME",
    categoryEN: "SPECIALIZED & REAL-TIME",
    titleFR: "Développement Spécialisé & Lua",
    titleEN: "Specialized Dev & Lua",
    subtitleFR: "Scripting temps réel, moteurs 3D et logique comportementale avancée.",
    subtitleEN: "Real-time scripting, 3D engines, and advanced behavioral logic.",
    icon: Orbit,
    accentBg: "bg-muted text-foreground border border-border",
    badge: "LAB & VIRTUAL",
    descriptionFR: "Spécialisation dans le scripting en Lua / Luau pour des environnements virtuels interactifs. Développement de frameworks orientés événements, de gestionnaires de physique et d'animations synchrone.",
    descriptionEN: "Specialized in Lua / Luau scripting for interactive virtual environments. Building event-driven frameworks, physics handlers, and synchronized animations.",
    metrics: [
      { labelFR: "Taux de rafraîchissement", labelEN: "Refresh Rate", value: "60-120 FPS" },
      { labelFR: "Architecture", labelEN: "Architecture", value: "Event-Driven & OOP" },
      { labelFR: "Optimisation", labelEN: "Optimization", value: "Zero Memory Leak" },
    ],
    skills: [
      {
        name: "Lua & Luau (Roblox Studio / Engines)",
        level: 95,
        experience: "5+ ans",
        tags: ["Luau Type Checking", "Metatables", "BindableEvents", "Network Replication", "OOP"],
        codeLang: "lua",
        codeSnippet: `-- ModuleScript Luau pour la gestion d'inventaire
local InventoryModule = {}
InventoryModule.__index = InventoryModule

function InventoryModule.new(player: Player)
    local self = setmetatable({}, InventoryModule)
    self.Player = player
    self.Items = {}
    return self
end

function InventoryModule:AddItem(itemId: string, quantity: number)
    self.Items[itemId] = (self.Items[itemId] or 0) + quantity
    print(string.format("Item %s ajouté pour %s", itemId, self.Player.Name))
end

return InventoryModule`,
        summaryFR: "Création de systèmes temps réel complexes, gestionnaires de données réseau et mécaniques interactives réactives.",
        summaryEN: "Creating complex real-time systems, network replication handlers, and responsive interactive mechanics.",
        liveDemoType: "lua",
      },
    ],
  },
  {
    id: "philosophy",
    number: "05",
    categoryFR: "VISION & METHODOLOGY",
    categoryEN: "VISION & METHODOLOGY",
    titleFR: "Philosophie & Approche Produits",
    titleEN: "Philosophy & Product Approach",
    subtitleFR: "Agnostisme technologique, sobriété numérique et orientation résultat.",
    subtitleEN: "Tech-agnostic, digital efficiency, and result-oriented execution.",
    icon: Fingerprint,
    accentBg: "bg-muted text-foreground border border-border",
    badge: "DNA & METHOD",
    descriptionFR: "Une vision pragmatique où la technologie est au service de l'expérience utilisateur et des objectifs réels. Pas de dogme technologique : choix systématique des meilleurs outils adaptés à la problématique.",
    descriptionEN: "A pragmatic vision where technology serves user experience and real goals. No technology dogma: choosing the best tool suited to the specific problem.",
    metrics: [
      { labelFR: "Approche", labelEN: "Approach", value: "Clean Code & Modular" },
      { labelFR: "Maintenance", labelEN: "Maintainability", value: "Long-term Durability" },
      { labelFR: "Collaboration", labelEN: "Collaboration", value: "Agile & Transparent" },
    ],
    skills: [
      {
        name: "Architecture & Sobriété Code",
        level: 98,
        experience: "Continuous",
        tags: ["DRY & KISS", "Clean Code", "Modular Components", "Scalability"],
        summaryFR: "Priorité à la simplicité de lecture, à la maintenabilité et au respect strict des principes de développement réutilisable.",
        summaryEN: "Priority on code readability, maintainability, and strict adherence to reusable development principles.",
      },
    ],
  },
];

interface SkillsViewProps {
  lang: "fr" | "en";
  onBack: () => void;
  sound: ReturnType<typeof useSoundEngine>;
}

export function SkillsView({ lang, onBack, sound }: SkillsViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<{
    domain: SkillDomain;
    skill: SkillDetail;
  } | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  // Filter logic
  const filteredDomains = SKILL_DOMAINS.filter((domain) => {
    if (activeCategory !== "all" && domain.id !== activeCategory) {
      return false;
    }
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.25 } }}
      transition={{ duration: 0.35, ease: easeOut }}
      className="fixed inset-0 z-50 flex flex-col bg-background text-foreground font-sans overflow-hidden select-none"
    >
      {/* Scroll reading progress indicator */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-violet-500/60"
      />

      {/* Floating Back Button (No sticky header bar) */}
      <motion.button
        type="button"
        onClick={() => {
          sound.click();
          onBack();
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        aria-label={lang === "fr" ? "Retour au portfolio" : "Back to portfolio"}
        className="fixed top-4 left-4 sm:top-6 sm:left-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full border border-violet-400/30 bg-violet-50/90 dark:bg-violet-950/70 text-violet-900 dark:text-violet-100 text-xs font-semibold shadow-lg shadow-violet-500/10 backdrop-blur-md transition-all hover:border-violet-500 hover:scale-105 cursor-pointer"
      >
        <ArrowLeft className="size-3.5 text-violet-600 dark:text-violet-300" />
        <span>{lang === "fr" ? "Retour" : "Back"}</span>
      </motion.button>

      {/* Main Container - Invisible scrollbar, smooth scrolling */}
      <div
        ref={scrollRef}
        className="relative z-20 flex-1 overflow-y-auto overscroll-contain scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-8 md:px-12 pt-16 sm:pt-20 pb-20">
          
          {/* Hero Section */}
          <div className="mb-6 text-center sm:text-left max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-400/30 bg-violet-50/80 dark:bg-violet-950/50 text-[11px] font-mono font-semibold tracking-wider text-violet-900 dark:text-violet-200 uppercase mb-3">
              <span className="size-2 rounded-full bg-violet-500 animate-pulse" />
              <span>{lang === "fr" ? "Expertise & Stack" : "Expertise & Stack"}</span>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-2 leading-[1.12]">
              {lang === "fr" ? "Domaines & Compétences" : "Domains & Skills"}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
              {lang === "fr"
                ? "Une architecture technique globale, combinant développement web réactif, ingénierie d'agents IA autonomes et systèmes temps réel."
                : "A unified technical architecture, spanning responsive web development, autonomous AI agent engineering, and real-time systems."}
            </p>
          </div>

          {/* Controls: Mobile-optimized horizontal scroll Filter Pills with smooth right edge fade */}
          <div className="relative mb-8 pb-3 border-b border-border/40">
            <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-w-full pr-8">
              {[
                { id: "all", labelFR: "Tous", labelEN: "All" },
                { id: "frontend", labelFR: "Frontend & UI", labelEN: "Frontend & UI" },
                { id: "ai", labelFR: "IA & Agents", labelEN: "AI & Agents" },
                { id: "backend", labelFR: "Backend & Systems", labelEN: "Backend & Systems" },
                { id: "specialized", labelFR: "Lua & Spécialisé", labelEN: "Lua & Specialized" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    sound.tick();
                    setActiveCategory(cat.id);
                  }}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border shrink-0",
                    activeCategory === cat.id
                      ? "bg-violet-600 text-white border-violet-500 font-bold shadow-md shadow-violet-600/20 dark:bg-violet-600"
                      : "bg-card/90 border-border/80 text-muted-foreground hover:text-foreground hover:border-border"
                  )}
                >
                  {lang === "fr" ? cat.labelFR : cat.labelEN}
                </button>
              ))}
            </div>
            {/* Visual fade hint on mobile scroll edge */}
            <div className="sm:hidden absolute right-0 top-0 bottom-3 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          </div>

          {/* Skill Domains Render */}
          <div className="space-y-12">
            <AnimatePresence mode="popLayout">
              {filteredDomains.map((domain, index) => (
                <DomainCard
                  key={domain.id}
                  domain={domain}
                  index={index}
                  lang={lang}
                  sound={sound}
                  onSelectSkill={(skill) => {
                    sound.click();
                    setSelectedSkill({ domain, skill });
                  }}
                />
              ))}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Interactive Modal / Inspection Sheet */}
      <AnimatePresence>
        {selectedSkill && (
          <SkillInspectorModal
            data={selectedSkill}
            lang={lang}
            sound={sound}
            onClose={() => setSelectedSkill(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Domain Card Component                                             */
/* ------------------------------------------------------------------ */

function DomainCard({
  domain,
  index,
  lang,
  sound,
  onSelectSkill,
}: {
  domain: SkillDomain;
  index: number;
  lang: "fr" | "en";
  sound: ReturnType<typeof useSoundEngine>;
  onSelectSkill: (skill: SkillDetail) => void;
}) {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const IconComponent = domain.icon;
  const title = lang === "fr" ? domain.titleFR : domain.titleEN;
  const subtitle = lang === "fr" ? domain.subtitleFR : domain.subtitleEN;
  const description = lang === "fr" ? domain.descriptionFR : domain.descriptionEN;
  const category = lang === "fr" ? domain.categoryFR : domain.categoryEN;

  const handleCopyDescription = (e: React.MouseEvent) => {
    e.stopPropagation();
    const fullText = `${title}\n${subtitle}\n${description}`;
    navigator.clipboard.writeText(fullText);
    sound.click();
    setCopiedText(lang === "fr" ? "Description copiée !" : "Description copied!");
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: easeOut }}
      className="group relative rounded-3xl p-[2px] overflow-hidden shadow-xl shadow-violet-600/10 hover:shadow-2xl hover:shadow-violet-600/20 transition-all"
    >
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-[50%] bg-[conic-gradient(from_0deg,transparent_0_320deg,#8b5cf6_340deg,#ec4899_360deg)] opacity-40 group-hover:opacity-90 transition-opacity"
      />
      <div className="relative rounded-[22px] bg-card p-4 sm:p-6 md:p-8 backdrop-blur-xl overflow-hidden">
      {/* Copy Feedback Toast inside card */}
      <AnimatePresence>
        {copiedText && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-4 right-4 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground text-background text-[11px] font-mono font-bold shadow-lg"
          >
            <Check className="size-3 text-emerald-400" />
            <span>{copiedText}</span>
          </motion.div>
        )}
      </AnimatePresence>

        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-border/40">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className={cn("flex size-12 shrink-0 items-center justify-center rounded-2xl font-bold shadow-sm", domain.accentBg)}>
              <IconComponent className="size-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-muted-foreground">
                  #{domain.number}
                </span>
                <span className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground/80 uppercase">
                  {category}
                </span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleCopyDescription}
              title={lang === "fr" ? "Copier le texte" : "Copy text"}
              className="p-1.5 rounded-full bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <Copy className="size-3.5" />
            </button>
            <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase bg-muted text-foreground border border-border/80">
              {domain.badge}
            </span>
          </div>
        </div>

        {/* Description & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <p className="text-xs sm:text-sm font-semibold text-foreground/90 mb-2">
              {subtitle}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* Metrics Box */}
          <div className="rounded-2xl bg-muted/30 p-4 border border-border/40 flex flex-col justify-center space-y-2.5">
            {domain.metrics.map((m, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium">
                  {lang === "fr" ? m.labelFR : m.labelEN}
                </span>
                <span className="font-mono font-bold text-foreground bg-background px-2 py-0.5 rounded border border-border/50">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
            <Layers className="size-3.5 text-foreground/70" />
            {lang === "fr" ? "Compétences clés & Code" : "Key Skills & Code Samples"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {domain.skills.map((s) => (
              <motion.div
                key={s.name}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onSelectSkill(s)}
                onMouseEnter={() => sound.tick()}
                className="group/skill flex flex-col justify-between p-4 rounded-2xl bg-background border border-border/80 hover:border-foreground/50 transition-all cursor-pointer shadow-sm relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-foreground transition-colors flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-foreground/70 shrink-0" />
                      {s.name}
                    </h4>
                    <span className="text-[11px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                      {s.experience}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                    {lang === "fr" ? s.summaryFR : s.summaryEN}
                  </p>

                  {/* Level Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mb-1">
                      <span>{lang === "fr" ? "Maîtrise" : "Proficiency"}</span>
                      <span className="font-bold text-foreground">{s.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-foreground rounded-full"
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-muted/60 text-foreground/80 border border-border/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-border/40 flex items-center justify-between text-[11px] font-semibold text-foreground group-hover/skill:translate-x-1 transition-transform">
                  <span>{lang === "fr" ? "Inspecter le code & démo" : "Inspect code & demo"}</span>
                  <ChevronRight className="size-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Interactive Skill Inspector Modal                                 */
/* ------------------------------------------------------------------ */

function SkillInspectorModal({
  data,
  lang,
  sound,
  onClose,
}: {
  data: { domain: SkillDomain; skill: SkillDetail };
  lang: "fr" | "en";
  sound: ReturnType<typeof useSoundEngine>;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "demo">("code");
  const { skill, domain } = data;

  const handleCopy = () => {
    if (skill.codeSnippet) {
      navigator.clipboard.writeText(skill.codeSnippet);
      setCopied(true);
      sound.click();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", damping: 26, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col text-foreground max-h-[85vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-foreground text-background font-bold">
              <Code className="size-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-muted-foreground font-bold tracking-wider">
                {lang === "fr" ? domain.titleFR : domain.titleEN}
              </span>
              <h3 className="font-display text-lg font-bold text-foreground">
                {skill.name}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full bg-muted text-foreground hover:bg-foreground hover:text-background transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content Body - Invisible scrollbar */}
        <div className="p-6 overflow-y-auto space-y-6 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <p className="text-sm text-foreground/80 leading-relaxed">
            {lang === "fr" ? skill.summaryFR : skill.summaryEN}
          </p>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 border-b border-border pb-2">
            <button
              type="button"
              onClick={() => {
                sound.tick();
                setActiveTab("code");
              }}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5",
                activeTab === "code"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Code className="size-3.5" />
              <span>{lang === "fr" ? "Extrait de Code" : "Code Snippet"}</span>
            </button>

            {skill.liveDemoType && (
              <button
                type="button"
                onClick={() => {
                  sound.tick();
                  setActiveTab("demo");
                }}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5",
                  activeTab === "demo"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Activity className="size-3.5" />
                <span>{lang === "fr" ? "Simulateur Interactif" : "Interactive Demo"}</span>
              </button>
            )}
          </div>

          {/* Code Tab */}
          {activeTab === "code" && (
            <div>
              {skill.codeSnippet ? (
                <div className="relative rounded-2xl bg-zinc-950 text-zinc-100 p-4 font-mono text-xs overflow-x-auto border border-zinc-800 shadow-inner scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-800 text-[10px] text-zinc-400">
                    <span>{skill.codeLang || "typescript"}</span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                      <span>{copied ? "Copié !" : "Copier"}</span>
                    </button>
                  </div>
                  <pre className="leading-relaxed">
                    <code>{skill.codeSnippet}</code>
                  </pre>
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-muted-foreground bg-muted/30 rounded-2xl">
                  {lang === "fr"
                    ? "Code source disponible sur demande ou dans la section Projets."
                    : "Source code available upon request or in the Projects section."}
                </div>
              )}
            </div>
          )}

          {/* Interactive Demo Tab */}
          {activeTab === "demo" && skill.liveDemoType && (
            <InteractiveSkillWidget type={skill.liveDemoType} lang={lang} sound={sound} />
          )}

          {/* Tags */}
          <div>
            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block mb-2 font-bold">
              {lang === "fr" ? "Mots-clés & Stack" : "Keywords & Stack"}
            </span>
            <div className="flex flex-wrap gap-2">
              {skill.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-muted text-foreground border border-border"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-border bg-muted/20 flex items-center justify-between text-xs text-muted-foreground">
          <span>{lang === "fr" ? `${skill.experience} d'expérience pratique` : `${skill.experience} hands-on experience`}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-foreground text-background font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            {lang === "fr" ? "Fermer" : "Close"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mini Interactive Widget for Skill Inspection                      */
/* ------------------------------------------------------------------ */

function InteractiveSkillWidget({
  type,
  lang,
  sound,
}: {
  type: "ui" | "ai" | "api" | "lua";
  lang: "fr" | "en";
  sound: ReturnType<typeof useSoundEngine>;
}) {
  const [count, setCount] = useState(0);
  const [aiPrompt, setAiPrompt] = useState(
    lang === "fr" ? "Propose une refactorisation TypeScript propre" : "Suggest a clean TypeScript refactoring"
  );
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [logs, setLogs] = useState<string[]>(
    lang === "fr"
      ? ["[SYSTEM] Module Luau initialisé à 120 FPS", "[EVENT] BindableEvent: PlayerDataLoaded"]
      : ["[SYSTEM] Luau Module initialized @ 120 FPS", "[EVENT] BindableEvent: PlayerDataLoaded"]
  );

  const handleSimulateAI = () => {
    sound.click();
    setIsGenerating(true);
    setAiResponse(null);
    setTimeout(() => {
      setIsGenerating(false);
      setAiResponse(
        lang === "fr"
          ? "✅ Refactorisation terminée : Utilisation de Generics strictes et élimination des 'any'. Performance améliorée de 34%."
          : "✅ Refactoring complete: Utilized strict Generics and eliminated 'any'. Performance improved by 34%."
      );
    }, 1200);
  };

  const handleTriggerLua = () => {
    sound.click();
    setLogs((prev) => [
      lang === "fr"
        ? `[EVENT ${new Date().toLocaleTimeString()}] Action Joueur exécutée -> Sync Réseau 12ms`
        : `[EVENT ${new Date().toLocaleTimeString()}] Player Action Executed -> Network Sync 12ms`,
      ...prev.slice(0, 4),
    ]);
  };

  if (type === "ui") {
    return (
      <div className="p-6 rounded-2xl bg-muted/30 border border-border text-center">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground mb-3">
          {lang === "fr" ? "Simulateur de Composant Réactif" : "Reactive Component Simulator"}
        </h4>
        <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-card border border-border shadow-md">
          <button
            type="button"
            onClick={() => {
              sound.click();
              setCount((c) => c - 1);
            }}
            className="size-9 rounded-full bg-muted text-foreground font-bold hover:scale-110 transition-transform cursor-pointer border border-border"
          >
            -
          </button>
          <span className="font-mono text-2xl font-bold min-w-[3ch] text-foreground">
            {count}
          </span>
          <button
            type="button"
            onClick={() => {
              sound.click();
              setCount((c) => c + 1);
            }}
            className="size-9 rounded-full bg-foreground text-background font-bold hover:scale-110 transition-transform cursor-pointer"
          >
            +
          </button>
        </div>
        <p className="text-[11px] text-muted-foreground mt-3">
          {lang === "fr" ? "Micro-animation d'état React avec synchro sonore" : "React state micro-animation with sound sync"}
        </p>
      </div>
    );
  }

  if (type === "ai") {
    return (
      <div className="p-4 rounded-2xl bg-zinc-950 text-zinc-100 border border-zinc-800 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between text-[10px] text-zinc-400 border-b border-zinc-800 pb-2">
          <span className="flex items-center gap-1 text-zinc-200">
            <Cpu className="size-3.5" /> {lang === "fr" ? "SIMULATEUR AGENT GEMINI" : "GEMINI AGENT SIMULATOR"}
          </span>
          <span>gemini-2.5-flash</span>
        </div>

        <input
          type="text"
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-zinc-500"
        />

        <button
          type="button"
          onClick={handleSimulateAI}
          disabled={isGenerating}
          className="w-full py-2 rounded-lg bg-zinc-100 text-zinc-900 font-semibold hover:bg-white transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <Activity className="size-4 animate-spin" />
          ) : (
            <Play className="size-4" />
          )}
          <span>{isGenerating ? (lang === "fr" ? "Génération en cours..." : "Generating...") : (lang === "fr" ? "Lancer le Prompt Agent" : "Run Agent Prompt")}</span>
        </button>

        {aiResponse && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-lg bg-zinc-900 border border-zinc-700 text-emerald-400 text-[11px] leading-relaxed"
          >
            {aiResponse}
          </motion.div>
        )}
      </div>
    );
  }

  if (type === "api") {
    return (
      <div className="p-4 rounded-2xl bg-zinc-950 text-emerald-400 border border-zinc-800 font-mono text-xs space-y-2">
        <div className="flex items-center justify-between text-[10px] text-zinc-500 border-b border-zinc-800 pb-2">
          <span>HTTP/2 200 OK</span>
          <span>LATENCY: 14ms</span>
        </div>
        <pre className="text-[11px] leading-relaxed">
{`{
  "status": "healthy",
  "engine": "FastAPI + Asyncio",
  "requests_per_sec": 14200,
  "database": "PostgreSQL Pooled"
}`}
        </pre>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-2xl bg-zinc-950 text-zinc-100 border border-zinc-800 font-mono text-xs space-y-3">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-[10px] text-zinc-300">
        <span>{lang === "fr" ? "CONSOLE TEMPS RÉEL LUAU" : "LUAU REAL-TIME CONSOLE"}</span>
        <button
          type="button"
          onClick={handleTriggerLua}
          className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-100 font-semibold hover:bg-zinc-700 transition-colors cursor-pointer border border-zinc-700"
        >
          {lang === "fr" ? "Émettre un événement" : "Fire Event"}
        </button>
      </div>
      <div className="space-y-1 text-[11px] text-zinc-300">
        {logs.map((log, i) => (
          <div key={i} className="leading-relaxed">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
