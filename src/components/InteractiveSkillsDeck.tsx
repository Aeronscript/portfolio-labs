import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Code2,
  Terminal,
  Bot,
  Wand2,
  Layers,
  X,
  ChevronRight,
  Boxes,
  Compass,
  CheckCircle2,
  Zap,
  MoveHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface SkillCardData {
  id: string;
  category: string;
  titleFR: string;
  titleEN: string;
  subtitleFR: string;
  subtitleEN: string;
  iconName: "web" | "backend" | "ai" | "specialized" | "philosophy";
  badgeColor: string;
  borderGlow: string;
  rarity: string;
  number: string;
  items: string[];
  detailsFR: string;
  detailsEN: string;
  textFR?: string;
  textEN?: string;
}

const SKILL_CARDS: SkillCardData[] = [
  {
    id: "web",
    category: "FRONTEND & UI",
    titleFR: "Développement Web moderne",
    titleEN: "Modern Web Development",
    subtitleFR: "Création d'interfaces modernes et d'applications web performantes.",
    subtitleEN: "Creating modern interfaces & high-performance web applications.",
    iconName: "web",
    badgeColor: "bg-cyan-500/10 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300 border-cyan-500/20",
    borderGlow: "hover:border-cyan-500/50 hover:shadow-cyan-500/20 dark:hover:border-cyan-400/60 dark:hover:shadow-cyan-400/20",
    rarity: "CORE STACK",
    number: "#01",
    items: [
      "JavaScript / TypeScript",
      "React",
      "Next.js",
      "HTML5 / CSS3",
      "Tailwind CSS",
    ],
    detailsFR: "Spécialisé dans la création d'interfaces réactives, fluides et esthétiques. Focus sur l'ergonomie, les micro-interactions et la performance d'affichage.",
    detailsEN: "Focused on creating reactive, fluid, and aesthetic interfaces. Emphasis on ergonomics, micro-interactions, and rendering performance.",
  },
  {
    id: "backend",
    category: "SYSTEMS & LOGIC",
    titleFR: "Programmation & Backend",
    titleEN: "Programming & Backend",
    subtitleFR: "Conception de systèmes, logique applicative et automatisation.",
    subtitleEN: "System design, application logic & automation.",
    iconName: "backend",
    badgeColor: "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300 border-emerald-500/20",
    borderGlow: "hover:border-emerald-500/50 hover:shadow-emerald-500/20 dark:hover:border-emerald-400/60 dark:hover:shadow-emerald-400/20",
    rarity: "SYSTEM ENGINE",
    number: "#02",
    items: [
      "Python",
      "Node.js",
      "APIs REST / GraphQL",
      "Bases de données",
      "Architecture logicielle",
    ],
    detailsFR: "Développement de backends robustes, d'APIs structurées et de flux de traitement automatisés. Organisation modulaire et architectures pérennes.",
    detailsEN: "Developing robust backends, structured APIs, and automated processing workflows. Modular organization and long-lasting architectures.",
  },
  {
    id: "ai",
    category: "INTELLIGENCE & AUTOMATION",
    titleFR: "Intelligence artificielle",
    titleEN: "Artificial Intelligence",
    subtitleFR: "Exploration et intégration de solutions intelligentes avec les nouvelles technologies IA.",
    subtitleEN: "Exploring and integrating intelligent solutions with cutting-edge AI.",
    iconName: "ai",
    badgeColor: "bg-fuchsia-500/10 text-fuchsia-700 dark:bg-fuchsia-400/15 dark:text-fuchsia-300 border-fuchsia-500/20",
    borderGlow: "hover:border-fuchsia-500/50 hover:shadow-fuchsia-500/20 dark:hover:border-fuchsia-400/60 dark:hover:shadow-fuchsia-400/20",
    rarity: "ULTRA RARE",
    number: "#03",
    items: [
      "Intégration de LLM",
      "Automatisation IA",
      "Agents IA",
      "Prompt Engineering",
      "Expérimentation avec différents modèles",
    ],
    detailsFR: "Conception d'outils augmentés par l'IA, orchestration d'agents intelligents et personnalisation de prompts complexes pour transformer des idées brutes en fonctionnalités autonomes.",
    detailsEN: "Designing AI-augmented tools, orchestrating intelligent agents, and crafting complex prompts to turn raw concepts into autonomous software features.",
  },
  {
    id: "specialized",
    category: "SPECIALIZED & EXPERIMENTAL",
    titleFR: "Développement spécialisé & expérimentation",
    titleEN: "Specialized Dev & Experiments",
    subtitleFR: "Création de solutions dans des environnements spécifiques.",
    subtitleEN: "Building tailored solutions in specialized environments.",
    iconName: "specialized",
    badgeColor: "bg-amber-500/10 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300 border-amber-500/20",
    borderGlow: "hover:border-amber-500/50 hover:shadow-amber-500/20 dark:hover:border-amber-400/60 dark:hover:shadow-amber-400/20",
    rarity: "SPECIAL LAB",
    number: "#04",
    items: [
      "Lua / Luau (Roblox)",
      "Scripting avancé",
      "Systèmes interactifs",
      "Prototypage expérimental",
    ],
    detailsFR: "Expérimentation dans des moteurs et environnements virtuels spécialisés. Création de logiques temps réel, mécanismes interactifs complexes et prototypes rapides.",
    detailsEN: "Experimentation within specialized engines and virtual environments. Creating real-time logic, complex interactive mechanics, and rapid prototyping.",
  },
  {
    id: "philosophy",
    category: "VISION & METHODOLOGY",
    titleFR: "Approche technique",
    titleEN: "Technical Approach",
    subtitleFR: "Agnostique & Orientée Solutions",
    subtitleEN: "Tech-Agnostic & Solution-Driven",
    iconName: "philosophy",
    badgeColor: "bg-violet-500/10 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300 border-violet-500/20",
    borderGlow: "hover:border-violet-500/50 hover:shadow-violet-500/20 dark:hover:border-violet-400/60 dark:hover:shadow-violet-400/20",
    rarity: "MASTER DNA",
    number: "#05",
    items: [
      "Agilité technologique",
      "Sélection d'outils sur-mesure",
      "Pérennité & Scalabilité",
      "Sobriété & Efficacité",
    ],
    textFR: "Je ne suis pas limité à une technologie précise. Chaque projet possède ses propres contraintes et besoins.\n\nMon approche consiste à choisir les outils adaptés afin de construire des solutions efficaces, maintenables et évolutives.",
    textEN: "I am not limited to a single technology stack. Every project comes with its unique constraints and goals.\n\nMy approach focuses on selecting the right tools to build efficient, maintainable, and scalable solutions.",
    detailsFR: "Adopter l'outil le plus adapté au besoin réel sans dogme technologique. Favoriser la lisibilité du code, la sécurité et la flexibilité d'évolution.",
    detailsEN: "Adopting the best-suited tool for real needs without tech dogma. Favoring code readability, security, and long-term evolutionary flexibility.",
  },
];

function CardIcon({ name, className }: { name: SkillCardData["iconName"]; className?: string }) {
  switch (name) {
    case "web":
      return <Code2 className={className} />;
    case "backend":
      return <Terminal className={className} />;
    case "ai":
      return <Bot className={className} />;
    case "specialized":
      return <Wand2 className={className} />;
    case "philosophy":
      return <Compass className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}

interface InteractiveSkillsDeckProps {
  lang: "fr" | "en";
  onSoundTick?: () => void;
  onSoundClick?: () => void;
}

export function InteractiveSkillsDeck({
  lang,
  onSoundTick,
  onSoundClick,
}: InteractiveSkillsDeckProps) {
  const [activeTab, setActiveTab] = useState<"case-study" | "skills">("case-study");
  const [selectedCard, setSelectedCard] = useState<SkillCardData | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Sync scroll position with buttons and tab state
  const checkScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 15);

    // Dynamic tab update based on scroll offset
    if (scrollLeft > 260) {
      setActiveTab("skills");
    } else {
      setActiveTab("case-study");
    }
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollBy = (offset: number) => {
    onSoundTick?.();
    trackRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  const scrollToSkills = () => {
    onSoundClick?.();
    setActiveTab("skills");
    if (trackRef.current) {
      // Scroll smoothly into the skill cards section
      trackRef.current.scrollTo({ left: 340, behavior: "smooth" });
    }
  };

  const scrollToCases = () => {
    onSoundClick?.();
    setActiveTab("case-study");
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto my-3 px-2 sm:px-4">
      {/* Navigation Header Bar & Section Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3 px-1">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Tab 1: Études de cas à venir */}
          <button
            type="button"
            onClick={scrollToCases}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer select-none border",
              activeTab === "case-study"
                ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-600/25 dark:bg-violet-500 dark:border-violet-500"
                : "bg-violet-50/80 text-violet-800 border-violet-200/80 hover:bg-violet-100 dark:bg-white/5 dark:text-violet-300 dark:border-white/10 dark:hover:bg-white/10"
            )}
          >
            <Sparkles className="size-3.5" />
            <span>{lang === "fr" ? "Études de cas à venir" : "Upcoming Case Studies"}</span>
          </button>

          <span className="text-muted-foreground/30 text-xs font-mono">→</span>

          {/* Tab 2: Compétences / Stack */}
          <button
            type="button"
            onClick={scrollToSkills}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer select-none border",
              activeTab === "skills"
                ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-600/25 dark:bg-violet-500 dark:border-violet-500"
                : "bg-violet-50/80 text-violet-800 border-violet-200/80 hover:bg-violet-100 dark:bg-white/5 dark:text-violet-300 dark:border-white/10 dark:hover:bg-white/10"
            )}
          >
            <Layers className="size-3.5" />
            <span>{lang === "fr" ? "Compétences / Stack → Ce que je maîtrise" : "Skills / Stack → What I Master"}</span>
          </button>
        </div>

        {/* Scroll Control Arrows */}
        <div className="flex items-center gap-1.5">
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground/70 mr-1">
            <MoveHorizontal className="size-3" />
            {lang === "fr" ? "Swiper" : "Swipe"}
          </span>

          <button
            type="button"
            onClick={() => scrollBy(-320)}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={cn(
              "flex size-8 items-center justify-center rounded-full border border-violet-200/80 bg-white/90 text-foreground transition-all duration-200 dark:border-white/10 dark:bg-black/60 cursor-pointer",
              canScrollLeft
                ? "hover:border-violet-500 hover:text-violet-600 dark:hover:border-violet-400 dark:hover:text-violet-300 shadow-sm"
                : "opacity-30 cursor-not-allowed"
            )}
          >
            <ArrowLeft className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => scrollBy(320)}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className={cn(
              "flex size-8 items-center justify-center rounded-full border border-violet-200/80 bg-white/90 text-foreground transition-all duration-200 dark:border-white/10 dark:bg-black/60 cursor-pointer relative",
              canScrollRight
                ? "hover:border-violet-500 hover:text-violet-600 dark:hover:border-violet-400 dark:hover:text-violet-300 shadow-sm"
                : "opacity-30 cursor-not-allowed"
            )}
          >
            <ArrowRight className="size-4" />
            {canScrollRight && (
              <span className="absolute -top-1 -right-1 size-2 rounded-full bg-violet-500 animate-ping" />
            )}
          </button>
        </div>
      </div>

      {/* Main Track with Horizontal Scroll */}
      <div className="relative group/track">
        <div
          ref={trackRef}
          className="flex items-stretch gap-3.5 overflow-x-auto pb-4 pt-1 px-1 no-scrollbar scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* SECTION 1: Études de cas à venir Card with Action Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="snap-center shrink-0 w-[290px] sm:w-[320px] rounded-2xl border border-violet-200/80 bg-gradient-to-br from-violet-500/10 via-card to-fuchsia-500/5 p-4 shadow-md shadow-violet-600/5 dark:border-white/10 dark:from-violet-950/30 dark:via-card dark:to-fuchsia-950/20 flex flex-col justify-between relative overflow-hidden group hover:border-violet-400/80 transition-all duration-300"
          >
            <div className="absolute -right-12 -bottom-12 size-40 rounded-full bg-violet-500/15 blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300 uppercase">
                  <span className="size-1.5 rounded-full bg-violet-500 animate-pulse" />
                  {lang === "fr" ? "Études de cas à venir" : "Upcoming Case Studies"}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground/60">00 / 05</span>
              </div>

              <h3 className="font-display text-base sm:text-lg font-bold tracking-tight text-foreground group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                {lang === "fr" ? "Projets en cours de documentation" : "Projects Under Documentation"}
              </h3>

              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                {lang === "fr"
                  ? "Retrouvez très bientôt l'analyse détaillée et le code source de mes projets phares (Fishwari, Sketch Challenge...)."
                  : "Detailed analysis and codebases for featured projects (Fishwari, Sketch Challenge...) coming very soon."}
              </p>

              {/* Badges Projets */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border border-dashed border-violet-300 bg-white/60 text-violet-900 dark:border-white/20 dark:bg-white/5 dark:text-violet-200">
                  <Zap className="size-3.5 text-amber-500" /> Fishwari
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border border-dashed border-violet-300 bg-white/60 text-violet-900 dark:border-white/20 dark:bg-white/5 dark:text-violet-200">
                  <Boxes className="size-3.5 text-cyan-500" /> Sketch Challenge
                </span>
              </div>
            </div>

            {/* Prominent Action Button with Horizontal Scroll Arrow */}
            <button
              type="button"
              onClick={scrollToSkills}
              className="mt-4 w-full flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-violet-600 text-white font-semibold text-xs shadow-md shadow-violet-600/25 hover:bg-violet-700 active:scale-[0.98] transition-all cursor-pointer group/btn"
            >
              <span>{lang === "fr" ? "Découvrir mes compétences" : "Explore My Tech Stack"}</span>
              <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-md group-hover/btn:translate-x-1 transition-transform">
                <span className="text-[10px] font-mono">SWIPE</span>
                <ArrowRight className="size-3.5" />
              </div>
            </button>
          </motion.div>

          {/* SECTION 2: Collectible Skill Cards (1 to 5) */}
          {SKILL_CARDS.map((card, idx) => (
            <CollectibleSkillCard
              key={card.id}
              card={card}
              index={idx}
              lang={lang}
              onSelect={() => {
                onSoundClick?.();
                setSelectedCard(card);
              }}
              onHover={() => onSoundTick?.()}
            />
          ))}
        </div>

        {/* Right Gradient Cue */}
        {canScrollRight && (
          <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-background to-transparent z-10 flex items-center justify-end pr-1">
            <ChevronRight className="size-5 text-violet-500 animate-pulse" />
          </div>
        )}
      </div>

      {/* Expanded Modal View on Card Selection */}
      <AnimatePresence>
        {selectedCard && (
          <SkillCardModal
            card={selectedCard}
            lang={lang}
            onClose={() => setSelectedCard(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Collectible Card Component with 3D Physics Tilt & Glass Sheen       */
/* ------------------------------------------------------------------ */

function CollectibleSkillCard({
  card,
  index,
  lang,
  onSelect,
  onHover,
}: {
  card: SkillCardData;
  index: number;
  lang: "fr" | "en";
  onSelect: () => void;
  onHover: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 320,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 320,
    damping: 25,
  });

  const glossX = useTransform(x, [-0.5, 0.5], [10, 90]);
  const glossY = useTransform(y, [-0.5, 0.5], [10, 90]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const title = lang === "fr" ? card.titleFR : card.titleEN;
  const subtitle = lang === "fr" ? card.subtitleFR : card.subtitleEN;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 16, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="snap-center shrink-0 w-[260px] sm:w-[285px] perspective-1000"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={onHover}
        onClick={onSelect}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative h-full rounded-2xl border border-violet-200/80 bg-card p-4 shadow-sm transition-all duration-300 cursor-pointer select-none group flex flex-col justify-between overflow-hidden dark:border-white/10 dark:bg-black/50",
          card.borderGlow
        )}
      >
        {/* Holographic specular light */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(circle at ${glossX}% ${glossY}%, rgba(168, 85, 247, 0.18), transparent 65%)`,
          }}
        />

        <div>
          {/* Header Badge */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border",
                card.badgeColor
              )}
            >
              {card.rarity}
            </span>
            <span className="font-mono text-xs font-semibold text-muted-foreground/70">
              {card.number}
            </span>
          </div>

          {/* Icon & Title */}
          <div className="flex items-start gap-2.5 mb-2">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-md shadow-violet-600/20 group-hover:scale-110 transition-transform duration-300">
              <CardIcon name={card.iconName} className="size-4" />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold leading-snug text-foreground group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                {title}
              </h4>
              <p className="text-[10px] text-muted-foreground/70 font-mono tracking-wide uppercase">
                {card.category}
              </p>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground mb-3 line-clamp-2">
            {subtitle}
          </p>

          {/* Stack Items */}
          <div className="flex flex-wrap gap-1.5">
            {card.items.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md text-[10px] font-medium border border-violet-100 bg-violet-50/60 text-violet-800 dark:border-white/10 dark:bg-white/5 dark:text-violet-200"
              >
                {tech}
              </span>
            ))}
            {card.items.length > 4 && (
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-semibold text-violet-600 dark:text-violet-400">
                +{card.items.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Footer Prompt */}
        <div className="mt-3 pt-2 border-t border-violet-100/60 dark:border-white/5 flex items-center justify-between text-[11px] font-semibold text-violet-600 dark:text-violet-300 group-hover:translate-x-0.5 transition-transform">
          <span>{lang === "fr" ? "Ouvrir la carte" : "Open Card"}</span>
          <ChevronRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card Modal Inspection View                                         */
/* ------------------------------------------------------------------ */

function SkillCardModal({
  card,
  lang,
  onClose,
}: {
  card: SkillCardData;
  lang: "fr" | "en";
  onClose: () => void;
}) {
  const title = lang === "fr" ? card.titleFR : card.titleEN;
  const subtitle = lang === "fr" ? card.subtitleFR : card.subtitleEN;
  const details = lang === "fr" ? card.detailsFR : card.detailsEN;
  const mainText = lang === "fr" ? card.textFR : card.textEN;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl border border-violet-200/80 bg-background p-6 shadow-2xl shadow-violet-600/20 dark:border-white/10 dark:bg-card overflow-hidden"
      >
        <div className="absolute -right-16 -top-16 size-48 rounded-full bg-violet-500/15 blur-3xl pointer-events-none" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full border border-violet-200 bg-white/80 text-foreground transition-all duration-200 hover:border-violet-500 hover:text-violet-600 dark:border-white/10 dark:bg-black/50 dark:hover:border-violet-400 cursor-pointer z-10"
        >
          <X className="size-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-600/30">
            <CardIcon name={card.iconName} className="size-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border",
                  card.badgeColor
                )}
              >
                {card.rarity}
              </span>
              <span className="font-mono text-xs text-muted-foreground">{card.number}</span>
            </div>
            <h3 className="font-display text-xl font-bold tracking-tight text-foreground mt-0.5">
              {title}
            </h3>
          </div>
        </div>

        <p className="text-sm font-medium text-violet-600 dark:text-violet-300 mb-4">
          {subtitle}
        </p>

        {mainText && (
          <div className="mb-4 rounded-xl border border-violet-200/60 bg-violet-50/50 p-3.5 text-xs sm:text-sm leading-relaxed text-foreground/90 dark:border-white/10 dark:bg-white/5 whitespace-pre-line">
            {mainText}
          </div>
        )}

        <div className="mb-5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {details}
        </div>

        <div className="mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
            {lang === "fr" ? "Éléments clés & Stack :" : "Key Stack & Competencies:"}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {card.items.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 p-2 rounded-xl border border-violet-100 bg-card dark:border-white/5 text-xs font-medium text-foreground"
              >
                <CheckCircle2 className="size-3.5 text-violet-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-violet-100 dark:border-white/5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-violet-600 text-white font-medium text-xs shadow-md shadow-violet-600/20 hover:bg-violet-700 transition-colors cursor-pointer"
          >
            {lang === "fr" ? "Fermer" : "Close"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
