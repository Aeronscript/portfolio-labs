import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Code,
  Github,
  Keyboard,
  Layers,
  Linkedin,
  Mail,
  Moon,
  Palette,
  Pause,
  Play,
  Plus,
  ShieldCheck,
  Sun,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { TiktokIcon } from "@/components/TiktokIcon";
import { SkillsView } from "@/components/SkillsView";

import banner from "@/assets/images/banner_1786014506861.jpg";

/* ------------------------------------------------------------------ */
/*  Assets & identité                                                  */
/* ------------------------------------------------------------------ */

const ASSETS = {
  avatarLight: "/assets/bb9ad2a97b7d12fb381c6f61b91d5e11.jpg",
  avatarDark: "/assets/58672490508f6409279323aae99c944d.jpg",
  banner,
};

type SkillLabel = {
  label: string;
  color: string;
  dot: string;
  x: number;
  y: number;
  rotate: number;
};

const SKILLS_EN: SkillLabel[] = [
  { label: "Frontend", color: "bg-blue-50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300", dot: "bg-blue-500", x: -170, y: -80, rotate: -6 },
  { label: "Generative AI", color: "bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-500/20 dark:text-fuchsia-300", dot: "bg-fuchsia-500", x: 150, y: -90, rotate: 4 },
  { label: "React / Next.js", color: "bg-cyan-50 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300", dot: "bg-cyan-500", x: -210, y: 10, rotate: -8 },
  { label: "UI/UX Design", color: "bg-pink-50 text-pink-700 dark:bg-pink-500/20 dark:text-pink-300", dot: "bg-pink-500", x: 180, y: 5, rotate: 6 },
  { label: "Full-Stack", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300", dot: "bg-emerald-500", x: -140, y: 90, rotate: 2 },
  { label: "Prototyping", color: "bg-amber-50 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300", dot: "bg-amber-500", x: 130, y: 90, rotate: -4 },
];

const SKILLS_FR: SkillLabel[] = [
  { label: "Frontend", color: "bg-blue-50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300", dot: "bg-blue-500", x: -170, y: -80, rotate: -6 },
  { label: "IA Générative", color: "bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-500/20 dark:text-fuchsia-300", dot: "bg-fuchsia-500", x: 150, y: -90, rotate: 4 },
  { label: "React / Next.js", color: "bg-cyan-50 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300", dot: "bg-cyan-500", x: -210, y: 10, rotate: -8 },
  { label: "Design UI/UX", color: "bg-pink-50 text-pink-700 dark:bg-pink-500/20 dark:text-pink-300", dot: "bg-pink-500", x: 180, y: 5, rotate: 6 },
  { label: "Dév Full-Stack", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300", dot: "bg-emerald-500", x: -140, y: 90, rotate: 2 },
  { label: "Prototypage", color: "bg-amber-50 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300", dot: "bg-amber-500", x: 130, y: 90, rotate: -4 },
];

function ScatterSkills({ lang, isVisible }: { lang: "en" | "fr", isVisible: boolean }) {
  const skills = lang === "en" ? SKILLS_EN : SKILLS_FR;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scale = isMobile ? 0.6 : 1;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                x: skill.x * scale, 
                y: skill.y * scale, 
                rotate: skill.rotate 
              }}
              exit={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.5, delay: i * 0.04 }}
              className={cn(
                "absolute flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/40 px-3.5 py-2 text-[13px] md:text-[15px] font-medium shadow-xl backdrop-blur-md antialiased dark:border-white/10 origin-center -translate-x-1/2 -translate-y-1/2",
                skill.color
              )}
            >
              <span className={cn("size-1.5 rounded-full", skill.dot)} />
              {skill.label}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

/* Mots de l'univers du créateur (panneau défilant) */
const UNIVERSE = [
  "Creative Development",
  "Artificial Intelligence",
  "Product Design",
  "Web Engineering",
  "User Experience",
  "Machine Learning",
  "Automation",
  "Interface Design",
];

/* ------------------------------------------------------------------ */
/*  Contenu bilingue — EN par défaut                                   */
/* ------------------------------------------------------------------ */

type Lang = "en" | "fr";

interface Copy {
  pillAbout: string;
  name: string;
  titleLine1: string;
  titleLine2: [string, string];
  valueProp: string[];
  bubble: string[];
  hint: string;
  projectLabel: string;
  aboutEyebrow: string;
  intro: string;
  storyTitle: string;
  story: string[];
  whatTitle: string;
  what: { icon: React.ComponentType<{ className?: string }>; title: string; text: string }[];
  approachTitle: string;
  approach: string[];
  securityTitle: string;
  security: string;
  stackTitle: string;
  stack: string[];
  philosophyTitle: string;
  philosophy: string[];
  motivationTitle: string;
  motivation: string[];
  closing: string;
  skip: string;
}

const COPY: Record<Lang, Copy> = {
  en: {
    pillAbout: "about",
    name: "Mohamed Amine",
    titleLine1: "Creative Developer",
    titleLine2: ["& AI", "Builder"],
    valueProp: [
      "Turning complex ideas into high-end web apps & intelligent AI experiences.",
      "Crafting elite digital products with minimalist design & peak performance.",
      "Merging robust technical architecture with flawless aesthetic precision.",
      "Building next-generation solutions powered by modern artificial intelligence.",
      "Transforming every engineering challenge into an unforgettable product experience.",
    ],
    bubble: [
      "Available for projects",
      "Replies within 48 hours",
      "Design · Code · AI",
      "Let's build something real",
    ],
    hint: "Case studies coming soon.",
    projectLabel: "Project",
    aboutEyebrow: "About",
    intro: "Hi, I'm Mohamed Amine, a creative developer & AI builder.",
    storyTitle: "My story",
    story: [
      "For years, I've devoted most of my time to learning, experimenting, and turning ideas into working applications.",
      "I'm fascinated by how AI can become a true creative partner, not replacing developers but taking them further. Simple experiences, built on solid technical architecture.",
      "Beyond code, I care about design and how a product is thought through as a whole: coherent, intuitive, and a pleasure to use.",
    ],
    whatTitle: "What I do",
    what: [
      {
        icon: Code,
        title: "Creative development",
        text: "Refined interfaces built with React, TypeScript & Python.",
      },
      {
        icon: Bot,
        title: "AI & automation",
        text: "Open-source models and APIs that turn complex tasks into simple tools.",
      },
      {
        icon: Palette,
        title: "Product design",
        text: "Experiences where simplicity and solid architecture work together.",
      },
    ],
    approachTitle: "My approach",
    approach: [
      "Start from a complex problem, analyse it, then break it down into clear, scalable, easy-to-maintain solutions.",
      "Every line of code is a way to turn an idea into something concrete.",
    ],
    securityTitle: "Security, systems & automation",
    security:
      "I also explore computer security, systems understanding, and the automation of technical workflows, to understand how technologies work, how they can be secured, and how AI can improve development processes.",
    stackTitle: "My stack",
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Python",
      "APIs",
      "Automation",
      "Open-source AI models",
    ],
    philosophyTitle: "Philosophy",
    philosophy: [
      "I don't just write code. I build products.",
      "I look to understand a problem, imagine a solution, build it, then evolve it through feedback and experience.",
    ],
    motivationTitle: "What drives me",
    motivation: [
      "Building useful, lasting products.",
      "Exploring what AI makes possible.",
      "Creating modern, simple, elegant interfaces.",
      "Writing clean, scalable architecture.",
      "Learning constantly, and sharing that journey through my projects.",
    ],
    closing: "Every project is an opportunity to learn, innovate, and build something meaningful.",
    skip: "Click to reveal everything",
  },
  fr: {
    pillAbout: "à propos",
    name: "Mohamed Amine",
    titleLine1: "Développeur créatif",
    titleLine2: ["&", "Créateur IA"],
    valueProp: [
      "Transformer vos idées en applications web haut de gamme et expériences IA.",
      "Concevoir des produits digitaux d'élite au design minimaliste et performances de pointe.",
      "Allier architecture technique robuste et précision esthétique irréprochable.",
      "Propulser vos projets vers le futur grâce à l'intelligence artificielle intégrée.",
      "Transformer chaque défi technique en une expérience produit d'exception.",
    ],
    bubble: [
      "Disponible pour vos projets",
      "Réponse sous 48 heures",
      "Design · Code · IA",
      "Construisons quelque chose de réel",
    ],
    hint: "Études de cas à venir.",
    projectLabel: "Projet",
    aboutEyebrow: "À propos",
    intro: "Bonjour, je suis Mohamed Amine, développeur créatif et créateur IA.",
    storyTitle: "Mon histoire",
    story: [
      "Depuis plusieurs années, je consacre l'essentiel de mon temps à apprendre, expérimenter et transformer des idées en applications concrètes.",
      "Je m'intéresse à la façon dont l'IA peut devenir un véritable partenaire de création, non pas pour remplacer les développeurs, mais pour leur permettre d'aller plus loin. La simplicité de l'expérience repose sur une architecture technique solide.",
      "Au-delà du code, je m'intéresse au design et à la manière dont un produit est pensé dans son ensemble : cohérent, intuitif, agréable à utiliser.",
    ],
    whatTitle: "Ce que je fais",
    what: [
      {
        icon: Code,
        title: "Développement créatif",
        text: "Des interfaces soignées, construites avec React, TypeScript & Python.",
      },
      {
        icon: Bot,
        title: "IA & automatisation",
        text: "Modèles open source et APIs qui transforment des tâches complexes en outils simples.",
      },
      {
        icon: Palette,
        title: "Design de produit",
        text: "Des expériences où simplicité et architecture solide travaillent ensemble.",
      },
    ],
    approachTitle: "Mon approche",
    approach: [
      "Partir d'un problème complexe, l'analyser, puis le découper en solutions claires, évolutives et faciles à maintenir.",
      "Chaque ligne de code est un moyen de transformer une idée en quelque chose de concret.",
    ],
    securityTitle: "Sécurité, systèmes & automatisation",
    security:
      "J'explore également les domaines liés à la sécurité informatique, à la compréhension des systèmes et à l'automatisation des flux techniques. Mon objectif est de mieux comprendre comment les technologies fonctionnent, comment elles peuvent être sécurisées et comment l'intelligence artificielle peut améliorer les processus de développement.",
    stackTitle: "Ma stack",
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Python",
      "APIs",
      "Automatisation",
      "Modèles d'IA open source",
    ],
    philosophyTitle: "Philosophie",
    philosophy: [
      "Je ne fais pas qu'écrire du code. Je construis des produits.",
      "Je cherche à comprendre un problème, imaginer une solution, la construire, puis la faire évoluer grâce aux retours et à l'expérience.",
    ],
    motivationTitle: "Ce qui me motive",
    motivation: [
      "Concevoir des produits utiles et durables.",
      "Explorer ce que l'IA rend possible.",
      "Créer des interfaces modernes, simples et élégantes.",
      "Développer des architectures propres et évolutives.",
      "Apprendre en permanence, et partager cette évolution à travers mes projets.",
    ],
    closing: "Chaque projet est une occasion d'apprendre, d'innover et de construire quelque chose qui a du sens.",
    skip: "Cliquez pour tout afficher",
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

function useThemeState() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    try {
      const stored = window.localStorage.getItem("portfolio-theme");
      if (stored === "dark" || stored === "light") return stored;
    } catch {
      /* ignore */
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage.setItem("portfolio-theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

function useLang() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    try {
      const stored = window.localStorage.getItem("portfolio-lang");
      if (stored === "en" || stored === "fr") return stored;
    } catch {
      /* ignore */
    }
    return "en";
  });
  useEffect(() => {
    try {
      window.localStorage.setItem("portfolio-lang", lang);
    } catch {
      /* ignore */
    }
  }, [lang]);
  return { lang, toggle: () => setLang((l) => (l === "en" ? "fr" : "en")) };
}

/* Moteur sonore (WebAudio, sans fichier) :
   — ambiance douce (bouton ▶ dans la pilule) ;
   — clics de frappe sur la page « À propos » (désactivables) ;
   — clic d'interrupteur au changement de thème (désactivable). */
export function useSoundEngine() {
  const ctxRef = useRef<AudioContext | null>(null);
  const padRef = useRef<{ stop: () => void } | null>(null);
  const playingRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  const [typingOn, setTypingOn] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      return window.localStorage.getItem("portfolio-snd-typing") !== "off";
    } catch {
      return true;
    }
  });
  const [switchOn, setSwitchOn] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      return window.localStorage.getItem("portfolio-snd-switch") !== "off";
    } catch {
      return true;
    }
  });
  const typingOnRef = useRef(typingOn);
  const switchOnRef = useRef(switchOn);

  useEffect(() => {
    typingOnRef.current = typingOn;
  }, [typingOn]);

  useEffect(() => {
    switchOnRef.current = switchOn;
  }, [switchOn]);

  useEffect(() => {
    try {
      window.localStorage.setItem("portfolio-snd-typing", typingOn ? "on" : "off");
    } catch {
      /* ignore */
    }
  }, [typingOn]);
  useEffect(() => {
    try {
      window.localStorage.setItem("portfolio-snd-switch", switchOn ? "on" : "off");
    } catch {
      /* ignore */
    }
  }, [switchOn]);

  const ensureCtx = useCallback(() => {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  /* Déverrouille l'AudioContext dans un geste utilisateur */
  const unlock = useCallback(() => {
    try {
      ensureCtx();
    } catch {
      /* ignore */
    }
  }, [ensureCtx]);

  /* Clic de frappe — doux, discret, adapté à la DA */
  const tick = useCallback(() => {
    if (!typingOnRef.current) return;
    try {
      const ctx = ensureCtx();
      if (ctx.state === "suspended") {
        void ctx.resume();
      }
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = 900 + Math.random() * 400;
      gain.gain.setValueAtTime(0.009, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.035);
    } catch {
      /* ignore */
    }
  }, [ensureCtx]);

  /* Son d'interrupteur (bascule du thème) — joué même au premier clic */
  const click = useCallback(() => {
    if (!switchOnRef.current) return;
    try {
      const ctx = ensureCtx();
      void ctx.resume();
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(90, t + 0.08);
      gain.gain.setValueAtTime(0.09, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.11);
    } catch {
      /* ignore */
    }
  }, [ensureCtx]);

  const toggle = useCallback(() => {
    const ctx = ensureCtx();
    if (playingRef.current) {
      padRef.current?.stop();
      padRef.current = null;
      playingRef.current = false;
      setPlaying(false);
      return;
    }
    playingRef.current = true;
    setPlaying(true);
    try {
      const master = ctx.createGain();
      master.gain.value = 0;
      master.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 2.5);
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 340;
      const o1 = ctx.createOscillator();
      const o2 = ctx.createOscillator();
      o1.type = "sine";
      o1.frequency.value = 110;
      o2.type = "sine";
      o2.frequency.value = 110.7;
      const g1 = ctx.createGain();
      g1.gain.value = 0.5;
      const g2 = ctx.createGain();
      g2.gain.value = 0.5;
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.08;
      lfoGain.gain.value = 0.02;
      lfo.connect(lfoGain);
      lfoGain.connect(master.gain);
      o1.connect(g1);
      o2.connect(g2);
      g1.connect(filter);
      g2.connect(filter);
      filter.connect(master);
      master.connect(ctx.destination);
      o1.start();
      o2.start();
      lfo.start();
      padRef.current = {
        stop: () => {
          master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
          o1.stop(ctx.currentTime + 0.9);
          o2.stop(ctx.currentTime + 0.9);
          lfo.stop(ctx.currentTime + 0.9);
        },
      };
    } catch {
      /* ignore */
    }
  }, [ensureCtx]);

  return {
    playing,
    toggle,
    tick,
    click,
    unlock,
    typingOn,
    switchOn,
    toggleTyping: () => setTypingOn((v) => !v),
    toggleSwitch: () => setSwitchOn((v) => !v),
  };
}

function CursorDot() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 38 });
  const sy = useSpring(y, { stiffness: 380, damping: 38 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden lg:block"
      style={{ x: sx, y: sy }}
    >
      <div className="size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/70 blur-[1px]" />
    </motion.div>
  );
}

/* Effet de frappe déclenché quand l'élément entre dans le viewport */
function TypeOnView({
  text,
  className,
  startDelay = 0,
  skip = false,
  onChar,
  onDone,
}: {
  text: string;
  className?: string;
  startDelay?: number;
  skip?: boolean;
  onChar?: () => void;
  onDone?: () => void;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState("");
  const [started, setStarted] = useState(false);
  const onCharRef = useRef(onChar);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onCharRef.current = onChar;
  }, [onChar]);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (skip) {
      queueMicrotask(() => {
        setShown(text);
        onDoneRef.current?.();
      });
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [skip, text]);

  useEffect(() => {
    if (!started || skip) return;
    queueMicrotask(() => {
      setShown("");
    });
    let cancelled = false;
    let i = 0;
    let counter = 0;
    let iv: ReturnType<typeof setInterval> | null = null;
    const timeout = setTimeout(() => {
      iv = setInterval(() => {
        if (cancelled) {
          if (iv) clearInterval(iv);
          return;
        }
        i += 2;
        if (i >= text.length) {
          if (iv) clearInterval(iv);
          setShown(text);
          onDoneRef.current?.();
          return;
        }
        setShown(text.slice(0, i));
        counter += 1;
        if (counter % 2 === 0) onCharRef.current?.();
      }, 30);
    }, startDelay);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      if (iv) clearInterval(iv);
    };
  }, [started, text, startDelay, skip]);

  return (
    <span ref={ref} className={className}>
      {shown}
      {started && !skip && shown !== text && (
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[0.95em] w-[2px] translate-y-[0.15em] animate-pulse bg-violet-500"
        />
      )}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

const heroLineVariants: Variants = {
  hidden: { y: "115%" },
  show: (i: number) => ({
    y: 0,
    transition: { duration: 0.85, delay: 0.25 + i * 0.14, ease: easeOut },
  }),
};

function RotatingValueProp({ messages }: { messages: string[] }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((v) => (v + 1) % messages.length), 3000);
    return () => clearInterval(t);
  }, [messages]);

  return (
    <div className="mt-3 flex flex-col items-center w-full">
      <div className="h-12 sm:h-14 lg:h-16 flex items-center justify-center max-w-2xl px-4 text-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground/90 font-medium leading-relaxed tracking-tight"
          >
            {messages[idx]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-2 mt-2">
        {messages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Go to proposition ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === idx ? "w-6 bg-violet-600 dark:bg-violet-400 shadow-sm" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* Avatar circulaire (clair/sombre) + bulle qui change de message + clic pour afficher Bienvenu / Découvre */
function AvatarStack({ messages, dark, sound }: { messages: string[]; dark: boolean; sound: ReturnType<typeof useSoundEngine> }) {
  const [idx, setIdx] = useState(0);
  const [showCustom, setShowCustom] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      if (!showCustom) {
        setIdx((v) => (v + 1) % messages.length);
      }
    }, 3400);
    return () => clearInterval(t);
  }, [messages, showCustom]);

  const handleAvatarClick = () => {
    sound.click();
    setShowCustom((prev) => !prev);
  };

  const logoText = dark ? "Découvre" : "Bienvenu";

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handleAvatarClick}
        className="relative size-20 overflow-hidden rounded-full border-2 border-white/90 shadow-xl shadow-violet-600/25 ring-2 ring-violet-500/30 dark:border-black/50 dark:ring-violet-400/30 sm:size-24 cursor-pointer focus:outline-none transition-transform hover:scale-105 active:scale-95 group bg-violet-950/10 dark:bg-violet-900/20 text-left"
        title={dark ? "Clique pour afficher Découvre" : "Clique pour afficher Bienvenu"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {showCustom ? (
            <motion.div
              key="custom-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center bg-white dark:bg-zinc-900 text-foreground p-2 text-center select-none"
            >
              <span className="text-xs sm:text-sm font-medium tracking-tight">
                {logoText}
              </span>
            </motion.div>
          ) : (
            <motion.img
              key="avatar-img"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={dark ? ASSETS.avatarDark : ASSETS.avatarLight}
              alt="Avatar de Mohamed Amine"
              className="size-full object-cover"
              loading="eager"
              decoding="async"
            />
          )}
        </AnimatePresence>
      </button>

      <div className="absolute -top-4 left-full z-10 ml-3 hidden sm:block">
        <div className="relative whitespace-nowrap rounded-2xl rounded-bl-sm border border-violet-200/80 bg-white px-4 py-2 text-xs font-medium text-foreground shadow-lg shadow-violet-600/10 dark:border-white/10 dark:bg-card">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={idx}
              className="block"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {messages[idx]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* Tuile façon « icône d'app » (grille mobile) */
function AppTile({
  children,
  label,
  href,
  placeholder,
}: {
  children: React.ReactNode;
  label: string;
  href?: string;
  placeholder?: boolean;
}) {
  const tile = (
    <>
      <span
        className={cn(
          "flex size-16 items-center justify-center overflow-hidden rounded-[1.4rem] border transition-all duration-300 sm:size-20",
          placeholder
            ? "border-dashed border-violet-300/70 bg-violet-50/40 text-violet-400/80 dark:border-white/15 dark:bg-white/5 dark:text-violet-300/60"
            : "border-violet-200/80 bg-white shadow-sm group-hover:-translate-y-1.5 group-hover:scale-105 group-hover:border-violet-400 group-hover:shadow-xl group-hover:shadow-violet-600/25 dark:border-white/10 dark:bg-white/5 dark:group-hover:border-violet-400/50",
        )}
      >
        {children}
      </span>
      <span className="text-[12px] sm:text-[13px] font-medium text-muted-foreground transition-colors duration-300 group-hover:text-violet-600 dark:group-hover:text-violet-300">
        {label}
      </span>
    </>
  );

  const cls =
    "group flex w-[70px] flex-col items-center gap-2 text-center transition-transform duration-300 sm:w-[84px]";

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer noopener"
        className={cls}
        aria-label={label}
      >
        {tile}
      </a>
    );
  }
  return (
    <span className={cls} aria-label={label}>
      {tile}
    </span>
  );
}

const PROFILE_EMAIL = "aeronscriptlabs@gmail.com";
const PROJECTS = [
  { id: "p1", name: "Fishwari", href: "#" },
  { id: "p2", name: "Sketch challenge", href: "#" },
];

function GlitchName({
  defaultName,
  sound,
}: {
  defaultName: string;
  sound: ReturnType<typeof useSoundEngine>;
}) {
  const [isToggled, setIsToggled] = useState(false);
  const [displayText, setDisplayText] = useState(defaultName);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!isToggled && !isGlitching) {
      queueMicrotask(() => {
        setDisplayText(defaultName);
      });
    }
  }, [defaultName, isToggled, isGlitching]);

  const handleClick = () => {
    if (isGlitching) return;
    sound.click();
    setIsGlitching(true);

    const nextToggled = !isToggled;
    setIsToggled(nextToggled);
    const targetText = nextToggled ? "Aeronscript / univers" : defaultName;
    const chars = "Ø10X#$&%*+~</>_[]{}!@?";

    let step = 0;
    const maxSteps = 14;
    const interval = setInterval(() => {
      step++;
      if (step >= maxSteps) {
        clearInterval(interval);
        setDisplayText(targetText);
        setIsGlitching(false);
      } else {
        const progress = step / maxSteps;
        let scrambled = "";
        for (let i = 0; i < targetText.length; i++) {
          if (targetText[i] === " " || targetText[i] === "/") {
            scrambled += targetText[i];
          } else if (Math.random() < progress) {
            scrambled += targetText[i];
          } else {
            scrambled += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        setDisplayText(scrambled);
        if (step % 2 === 0) sound.tick();
      }
    }, 40);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mt-3 inline-block text-center font-serif text-xl font-medium tracking-tight text-foreground/90 sm:text-2xl cursor-pointer select-none focus:outline-none"
    >
      <motion.span
        key={displayText}
        animate={
          isGlitching
            ? {
                x: [-3, 3, -2, 2, -1, 0],
                y: [1, -2, 2, -1, 0],
                skewX: [-8, 8, -4, 4, 0],
              }
            : {}
        }
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "relative inline-block transition-colors duration-300",
          isToggled && "font-mono font-bold tracking-normal text-violet-600 dark:text-violet-400"
        )}
      >
        {displayText}
        {isGlitching && (
          <span
            aria-hidden
            className="absolute inset-0 select-none opacity-80 text-cyan-400 dark:text-cyan-300 -translate-x-0.5 translate-y-0.5 mix-blend-screen"
          >
            {displayText}
          </span>
        )}
      </motion.span>
    </button>
  );
}

function Hero({
  copy,
  dark,
  lang,
  sound,
  onOpenSkills,
}: {
  copy: Copy;
  dark: boolean;
  lang: Lang;
  sound: ReturnType<typeof useSoundEngine>;
  onOpenSkills: () => void;
}) {
  const [showSkills, setShowSkills] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const lastNavTime = useRef<number>(0);

  // Gérer la disparition automatique des skills après 2s
  useEffect(() => {
    if (showSkills) {
      const timer = setTimeout(() => setShowSkills(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showSkills]);

  const triggerOpenSkills = () => {
    const now = Date.now();
    if (now - lastNavTime.current < 700) return;
    lastNavTime.current = now;
    sound.unlock();
    onOpenSkills();
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Ne déclenche l'ouverture des skills que lors d'un défilement horizontal explicite
    if (Math.abs(e.deltaX) > 40 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      triggerOpenSkills();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    // Déclenche uniquement sur un vrai swipe horizontal vers la gauche (diffX > 60)
    // et s'assure que le mouvement est principalement horizontal (diffX nettement plus grand que diffY)
    if (diffX > 60 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      triggerOpenSkills();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const socials = [
    { key: "li", label: "LinkedIn", icon: Linkedin, href: "#" },
    { key: "em", label: "Email", icon: Mail, href: `mailto:${PROFILE_EMAIL}` },
    { key: "tt", label: "TikTok", icon: TiktokIcon, href: "https://www.tiktok.com/@aeronthemultiverse?_r=1&_t=ZS-98ekyiSS56j" },
    { key: "gh", label: "GitHub", icon: Github, href: "https://github.com/matserh" },
  ];

  return (
    <section
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative flex flex-1 flex-col items-center justify-between lg:justify-center overflow-hidden px-6 pt-8 pb-2 sm:px-10 lg:py-20 cursor-default select-none h-full lg:min-h-[85vh]"
    >
      {/* Lumières d'ambiance — uniquement en mode clair (noir pur en sombre) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[540px] w-[820px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[130px] dark:opacity-0" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center text-center">
        {/* Le contenu se fond en douceur au changement de langue */}
        <AnimatePresence mode="wait" initial>
          <motion.div
            key={lang}
            className="flex w-full flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
          >
            {/* Identité : avatar + nom */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut }}
              className="flex flex-col items-center"
            >
              <AvatarStack messages={copy.bubble} dark={dark} sound={sound} />
              <GlitchName defaultName={copy.name} sound={sound} />
            </motion.div>

            {/* Titre géant */}
            <h1 className="mt-4 font-display text-2xl font-medium leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl relative max-w-4xl text-center">
              <ScatterSkills lang={lang} isVisible={showSkills} />
              <motion.span
                className="inline-flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-1"
                custom={0}
                variants={heroLineVariants}
                initial="hidden"
                animate="show"
              >
                <span>{copy.titleLine1}</span>
                <span className="inline-flex items-center gap-2">
                  <span className="font-serif font-light italic text-foreground/80">
                    {copy.titleLine2[0]} {copy.titleLine2[1]}
                  </span>
                  <motion.button
                    onClick={() => setShowSkills(true)}
                    className="inline-flex items-center justify-center p-1 bg-transparent text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
                    aria-label="Show skills"
                    animate={{
                      y: [0, -3, 0],
                      rotate: [0, 4, -4, 0],
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Layers className="size-6 md:size-8" strokeWidth={2} />
                  </motion.button>
                </span>
              </motion.span>
            </h1>

            {/* Valeur ajoutée claire en 2 secondes avec animation rotative */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: easeOut }}
              className="w-full flex justify-center"
            >
              <RotatingValueProp messages={copy.valueProp} />
            </motion.div>

            {/* Grille d'icônes (mobile — le dock prend le relais en grand écran) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: easeOut }}
              className="mt-6 lg:hidden"
            >
              <div className="flex flex-wrap justify-center gap-x-7 gap-y-4">
                {PROJECTS.map((p) => (
                  <AppTile key={p.id} label={p.name} href={p.href} placeholder>
                    <Plus className="size-6" />
                  </AppTile>
                ))}
                {socials.map((s) => (
                  <AppTile key={s.key} label={s.label} href={s.href}>
                    <s.icon className="size-6 text-foreground/80" />
                  </AppTile>
                ))}
              </div>

              {/* Bouton élégant de navigation vers Domaines & Skills (Violet / Blanc) */}
              <div className="mt-6 flex justify-center">
                <motion.button
                  type="button"
                  onClick={() => {
                    sound.unlock();
                    onOpenSkills();
                  }}
                  whileHover={{ scale: 1.04, x: 2 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-violet-400/40 bg-violet-50/90 dark:bg-violet-950/50 text-violet-900 dark:text-violet-100 text-xs sm:text-sm font-semibold shadow-md shadow-violet-500/10 backdrop-blur-md cursor-pointer transition-all hover:border-violet-500 hover:bg-violet-100 dark:hover:bg-violet-900/70"
                >
                  <span>{lang === "fr" ? "Domaines & Skills" : "Domains & Skills"}</span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="flex size-6 items-center justify-center rounded-full bg-violet-600 text-white shadow-sm"
                  >
                    <ArrowRight className="size-3.5" />
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Les mots de l'univers, intégrés au hero — aucune bande « footer » */}
      <UniverseMarquee />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Mots de l'univers — défilement continu intégré au hero             */
/* ------------------------------------------------------------------ */

function UniverseMarquee() {
  const row = [...UNIVERSE, ...UNIVERSE];
  return (
    /* Apparition subtile et très douce */
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 1.3, ease: easeOut }}
      className="group relative overflow-hidden pb-2"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {row.map((word, i) => (
          <span key={`${word}-${i}`} className="flex items-center whitespace-nowrap">
            <span className="px-10 font-display text-[13px] sm:text-[14px] font-medium uppercase tracking-[0.4em] text-muted-foreground/60 transition-colors duration-300 hover:text-violet-600 dark:hover:text-violet-300">
              {word}
            </span>
            <span aria-hidden className="ml-10 inline-block size-1 rounded-full bg-violet-400/50" />
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dock central pour PC & Laptop — Style Glassmorphism macOS          */
/* ------------------------------------------------------------------ */

function Dock({
  lang,
  sound,
  onOpenSkills,
}: {
  lang: Lang;
  sound: ReturnType<typeof useSoundEngine>;
  onOpenSkills: () => void;
}) {
  const socials = [
    { key: "li", label: "LinkedIn", icon: Linkedin, href: "#" },
    { key: "tt", label: "TikTok", icon: TiktokIcon, href: "https://www.tiktok.com/@aeronthemultiverse?_r=1&_t=ZS-98ekyiSS56j" },
    { key: "gh", label: "GitHub", icon: Github, href: "https://github.com/matserh" },
    { key: "em", label: "Email", icon: Mail, href: `mailto:${PROFILE_EMAIL}` },
  ];

  return (
    <nav
      aria-label="Dock principal"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden lg:flex items-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6, ease: easeOut }}
        className="flex items-center gap-2 rounded-2xl border border-violet-200/80 bg-white/90 p-2 shadow-2xl shadow-violet-500/15 backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/85"
      >
        {/* Launcher Skills Button */}
        <motion.button
          type="button"
          onClick={() => {
            sound.unlock();
            onOpenSkills();
          }}
          whileHover={{ y: -4, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-violet-600 text-white font-semibold text-xs shadow-md shadow-violet-600/30 cursor-pointer transition-colors hover:bg-violet-500"
        >
          <Layers className="size-4" />
          <span>{lang === "fr" ? "Domaines & Skills" : "Domains & Skills"}</span>
          <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
        </motion.button>

        <span aria-hidden className="mx-1 h-6 w-px bg-border/60" />

        {/* Project App Tiles */}
        {PROJECTS.map((p) => (
          <motion.a
            key={p.id}
            href={p.href}
            whileHover={{ y: -5, scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex size-10 items-center justify-center rounded-xl border border-dashed border-violet-300/80 bg-violet-50/50 text-violet-700 dark:border-white/20 dark:bg-white/5 dark:text-violet-300 transition-colors hover:border-violet-500 hover:bg-violet-100 dark:hover:bg-white/10"
          >
            <Plus className="size-4 group-hover:rotate-90 transition-transform duration-300" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 text-[11px] font-mono font-medium shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {p.name}
            </span>
          </motion.a>
        ))}

        <span aria-hidden className="mx-1 h-6 w-px bg-border/60" />

        {/* Social Icons */}
        {socials.map((s) => (
          <motion.a
            key={s.key}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer noopener"
            whileHover={{ y: -5, scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex size-10 items-center justify-center rounded-xl bg-muted/60 text-foreground/80 hover:bg-violet-600 hover:text-white dark:bg-white/5 dark:hover:bg-violet-500 transition-all shadow-sm"
          >
            <s.icon className="size-4" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 text-[11px] font-mono font-medium shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {s.label}
            </span>
          </motion.a>
        ))}
      </motion.div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Vue « À propos »                                                   */
/* ------------------------------------------------------------------ */

function SectionTitle({
  n,
  text,
  skip,
  onChar,
}: {
  n: string;
  text: string;
  skip: boolean;
  onChar: () => void;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-3">
        <span
          aria-hidden
          className="bg-gradient-to-br from-violet-600 to-fuchsia-500 bg-clip-text font-display text-xs font-semibold tracking-[0.25em] text-transparent"
        >
          {n}
        </span>
        <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
          <TypeOnView text={text} skip={skip} onChar={onChar} />
        </h3>
      </div>
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: easeOut }}
        className="mt-3 block h-px w-24 origin-left bg-gradient-to-r from-violet-500 to-fuchsia-400"
      />
    </div>
  );
}

function AboutView({
  copy,
  onBack,
  sound,
}: {
  copy: Copy;
  onBack: () => void;
  sound: ReturnType<typeof useSoundEngine>;
}) {
  const [skipped, setSkipped] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  /* Changement de langue : on révèle tout d'un coup, sans re-frappe */
  const prevLangKey = useRef(copy.aboutEyebrow);
  useEffect(() => {
    if (prevLangKey.current !== copy.aboutEyebrow) {
      prevLangKey.current = copy.aboutEyebrow;
      setSkipped(true);
    }
  }, [copy.aboutEyebrow]);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: 40, opacity: 0, transition: { duration: 0.3, ease: easeOut } }}
      transition={{ type: "spring", damping: 34, stiffness: 260 }}
      className="fixed inset-x-0 top-0 z-50 h-[100dvh] bg-background"
    >
      <div className="relative h-full w-full">
        {/* Progression de lecture */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 top-0 z-40 h-0.5 origin-left bg-violet-500/60"
        />


        {/* Bouton retour — toujours visible */}
        <button
          type="button"
          onClick={onBack}
          aria-label="Retour"
          className="absolute left-4 top-5 z-40 flex size-10 items-center justify-center rounded-full border border-violet-200 bg-white/80 text-foreground shadow-sm backdrop-blur transition-all duration-300 hover:border-violet-500 hover:text-violet-600 dark:border-white/10 dark:bg-black/40 dark:hover:border-violet-400/60 dark:hover:text-violet-300"
        >
          <ArrowLeft className="size-4" />
        </button>

        {/* Contrôle sonore discret — glisse en haut à droite (ne recouvre jamais le contenu) */}
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.7, type: "spring", stiffness: 320, damping: 22 }}
          className="absolute right-4 top-16 z-40 flex items-center gap-0.5 rounded-full border border-violet-200/60 bg-white/85 p-1 shadow-lg shadow-violet-600/10 backdrop-blur dark:border-white/10 dark:bg-black/60"
        >
          <button
            type="button"
            onClick={sound.toggleTyping}
            aria-pressed={sound.typingOn}
            title={sound.typingOn ? "Couper le son de frappe" : "Activer le son de frappe"}
            className={cn(
              "flex size-8 items-center justify-center rounded-full transition-colors duration-300",
              sound.typingOn
                ? "bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300"
                : "text-muted-foreground opacity-50 hover:opacity-90",
            )}
          >
            <Keyboard className="size-4" />
          </button>
          <span aria-hidden className="h-4 w-px bg-violet-200/60 dark:bg-white/10" />
          <button
            type="button"
            onClick={sound.toggleSwitch}
            aria-pressed={sound.switchOn}
            title={
              sound.switchOn
                ? "Couper le son du changement de thème"
                : "Activer le son du changement de thème"
            }
            className={cn(
              "flex size-8 items-center justify-center rounded-full transition-colors duration-300",
              sound.switchOn
                ? "bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300"
                : "text-muted-foreground opacity-50 hover:opacity-90",
            )}
          >
            {sound.switchOn ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
          </button>
        </motion.div>

        {/* Contenu défilant */}
        <div ref={scrollRef} onClick={() => setSkipped(true)} className="h-full overflow-y-auto">
          <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-24 sm:px-10">
            {/* Bannière avec cadre lumineux rotatif (rouge & violet) */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: easeOut }}
              className="relative mx-auto mt-4 w-full max-w-md group"
            >
              <div className="relative overflow-hidden rounded-2xl p-[2px] shadow-2xl shadow-violet-600/25">
                <motion.div
                  aria-hidden
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-[50%] bg-[conic-gradient(from_0deg,transparent_0_320deg,#8b5cf6_340deg,#ec4899_360deg)] opacity-80"
                />
                <div className="relative overflow-hidden rounded-[15px] bg-black">
                  <img src={ASSETS.banner} alt="Bannière" className="block w-full" />
                </div>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={copy.aboutEyebrow}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Intro */}
                <div className="relative mt-12">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[100px] dark:opacity-0"
                  />
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-600 dark:text-violet-300">
                    {copy.aboutEyebrow}
                  </p>
                  <p className="relative mt-5 min-h-[3.2em] font-display text-3xl font-medium leading-[1.22] tracking-tight sm:text-4xl">
                    <TypeOnView
                      text={copy.intro}
                      startDelay={1300}
                      skip={skipped}
                      onChar={sound.tick}
                      onDone={() => setIntroDone(true)}
                    />
                  </p>
                  {!skipped && !introDone && (
                    <p className="mt-3 text-[12px] sm:text-[13px] font-medium text-muted-foreground">
                      {copy.skip}
                    </p>
                  )}
                </div>

                {/* 01 — Mon histoire */}
                <section className="mt-20">
                  <SectionTitle n="01" text={copy.storyTitle} skip={skipped} onChar={sound.tick} />
                  <div className="mt-6 space-y-5">
                    {copy.story.map((p, i) => (
                      <motion.p
                        key={p.slice(0, 24)}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.55, delay: i * 0.08, ease: easeOut }}
                        className="text-[15px] leading-relaxed text-foreground/85"
                      >
                        {p}
                      </motion.p>
                    ))}
                  </div>
                </section>

                {/* 02 — Ce que je fais */}
                <section className="mt-20">
                  <SectionTitle n="02" text={copy.whatTitle} skip={skipped} onChar={sound.tick} />
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {copy.what.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: easeOut }}
                    className="rounded-2xl border border-violet-100 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-600/10 dark:border-white/5"
                  >
                    <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-md shadow-violet-600/25">
                      <item.icon className="size-4" />
                    </span>
                        <p className="mt-4 text-sm font-semibold leading-snug">{item.title}</p>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                          {item.text}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* 03 — Mon approche */}
                <section className="mt-20">
                  <SectionTitle
                    n="03"
                    text={copy.approachTitle}
                    skip={skipped}
                    onChar={sound.tick}
                  />
                  <div className="mt-6">
                    {copy.approach.map((line, i) => (
                      <motion.div
                        key={line.slice(0, 24)}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.6, delay: i * 0.12, ease: easeOut }}
                        className="flex items-baseline gap-6 border-t border-violet-100 py-5 first:border-t-0 first:pt-0 dark:border-white/5"
                      >
                        <span
                          aria-hidden
                          className="font-serif text-2xl font-light italic text-violet-400/80 dark:text-violet-500/50"
                        >
                          0{i + 1}
                        </span>
                        <p className="text-[15px] leading-relaxed text-foreground/85">{line}</p>
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* 04 — Sécurité, systèmes & automatisation */}
                <section className="mt-20">
                  <SectionTitle
                    n="04"
                    text={copy.securityTitle}
                    skip={skipped}
                    onChar={sound.tick}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, ease: easeOut }}
                    className="mt-6 rounded-2xl border border-violet-100 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-600/10 dark:border-white/5"
                  >
                    <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-md shadow-violet-600/25">
                      <ShieldCheck className="size-4" />
                    </span>
                    <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">
                      {copy.security}
                    </p>
                  </motion.div>
                </section>

                {/* 05 — Ma stack */}
                <section className="mt-20">
                  <SectionTitle n="05" text={copy.stackTitle} skip={skipped} onChar={sound.tick} />
                  <div className="mt-6 flex flex-wrap gap-2">
                    {copy.stack.map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.4, delay: i * 0.05, ease: easeOut }}
                        className="rounded-full border border-violet-200 bg-violet-50/60 px-3.5 py-1.5 text-xs font-medium text-violet-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400 hover:bg-violet-100 dark:border-white/10 dark:bg-white/5 dark:text-violet-200 dark:hover:border-violet-400/50"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </section>

                {/* 06 — Philosophie */}
                <section className="mt-20">
                  <SectionTitle
                    n="06"
                    text={copy.philosophyTitle}
                    skip={skipped}
                    onChar={sound.tick}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, ease: easeOut }}
                    className="mt-6 space-y-3 border-l border-violet-200 pl-6 dark:border-violet-500/30"
                  >
                    {copy.philosophy.map((line, i) => (
                      <p
                        key={line.slice(0, 20)}
                        className={cn(
                          "font-serif leading-relaxed",
                          i === 0
                            ? "text-xl font-light italic text-foreground sm:text-2xl"
                            : "text-sm text-muted-foreground sm:text-base",
                        )}
                      >
                        {line}
                      </p>
                    ))}
                  </motion.div>
                </section>

                {/* 07 — Ce qui me motive */}
                <section className="mt-20">
                  <SectionTitle
                    n="07"
                    text={copy.motivationTitle}
                    skip={skipped}
                    onChar={sound.tick}
                  />
                  <ul className="mt-6 space-y-3">
                    {copy.motivation.map((item, i) => (
                      <motion.li
                        key={item.slice(0, 20)}
                        initial={{ opacity: 0, x: -14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, delay: i * 0.07, ease: easeOut }}
                        className="flex items-start gap-3 text-base leading-relaxed text-foreground/90"
                      >
                    <span
                      aria-hidden
                      className="mt-[0.65em] h-px w-6 shrink-0 bg-gradient-to-r from-violet-500 to-fuchsia-400"
                    />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </section>

                {/* Conclusion */}
                <motion.p
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, ease: easeOut }}
                  className="mt-20 font-serif text-xl font-light italic leading-relaxed text-violet-700 dark:text-violet-200 sm:text-2xl"
                >
                  {copy.closing}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

type View = { name: "home" } | { name: "about" } | { name: "skills" };

export default function Landing() {
  const { theme, toggle: toggleTheme } = useThemeState();
  const { lang, toggle: toggleLang } = useLang();
  
  const sound = useSoundEngine();
  const [view, setView] = useState<View>({ name: "home" });

  const copy = COPY[lang];
  const viewOpen = view.name !== "home";

  useEffect(() => {
    if (!viewOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setView({ name: "home" });
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [viewOpen]);

  const handleToggleTheme = () => {
    sound.click();
    toggleTheme();
  };

  const openAbout = () => {
    sound.unlock();
    setView({ name: "about" });
  };

  const openSkills = useCallback(() => {
    sound.unlock();
    setView({ name: "skills" });
  }, [sound]);

  // Écouteur global pour la navigation au scroll / roulette et swipe tactile sur l'écran d'accueil
  // Déclenchement intentionnel uniquement via les boutons de navigation (pas de défilement brusque)
  useEffect(() => {
    // Intentionally empty to avoid sudden auto-page transitions on scroll
  }, [view.name, openSkills]);

  return (
    <div className="relative h-[100dvh] overflow-hidden overscroll-none bg-background text-foreground">
      <div className="grain" aria-hidden />
      <CursorDot />

      {/* Pilule d'en-tête — visible uniquement sur la page d'accueil */}
      {view.name === "home" && (
        <header className="pointer-events-none fixed inset-x-0 top-2.5 z-[55] flex justify-center px-4">
          <div className="pointer-events-auto flex items-center gap-0.5 rounded-full border border-border bg-card/90 p-0.5 shadow-lg backdrop-blur-xl">
            <button
              type="button"
              onClick={handleToggleTheme}
              aria-label={theme === "dark" ? "Passer au thème clair" : "Passer au thème sombre"}
              className="flex size-7 items-center justify-center rounded-full text-foreground transition-colors hover:text-foreground/70"
            >
              {theme === "dark" ? <Sun className="size-3" /> : <Moon className="size-3" />}
            </button>
            <span aria-hidden className="h-3.5 w-px bg-border" />
            <button
              type="button"
              onClick={sound.toggle}
              aria-label={sound.playing ? "Couper le son" : "Activer le son"}
              className="relative flex size-7 items-center justify-center rounded-full text-foreground transition-colors hover:text-foreground/70"
            >
              {sound.playing ? <Pause className="size-3" /> : <Play className="size-3" />}
              {sound.playing && (
                <span
                  aria-hidden
                  className="absolute bottom-0 left-1/2 h-0.5 w-3 -translate-x-1/2 overflow-hidden rounded-full bg-border"
                >
                  <span className="block h-full animate-sound-progress bg-foreground" />
                </span>
              )}
            </button>
            <span aria-hidden className="h-3.5 w-px bg-border" />
            <button
              type="button"
              onClick={openAbout}
              className="flex h-7 items-center px-2.5 text-[12px] sm:text-[13px] font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              {copy.pillAbout}
            </button>
            <span aria-hidden className="h-3.5 w-px bg-border" />
            <button
              type="button"
              onClick={toggleLang}
              aria-label="Basculer la langue"
              className="flex h-7 items-center gap-1 px-2 text-[13px] sm:text-[14px] font-semibold tracking-wide transition-colors hover:text-foreground"
            >
              <span className={lang === "en" ? "text-foreground" : "text-muted-foreground"}>EN</span>
              <span className="text-muted-foreground/40">/</span>
              <span className={lang === "fr" ? "text-foreground" : "text-muted-foreground"}>FR</span>
            </button>
          </div>
        </header>
      )}

      {/* Un seul écran : hero + dock — aucun scroll vertical */}
      <main className="relative flex h-[100dvh] flex-col overflow-hidden">
        <Hero
          copy={copy}
          dark={theme === "dark"}
          lang={lang}
          sound={sound}
          onOpenSkills={openSkills}
        />
        <Dock lang={lang} sound={sound} onOpenSkills={openSkills} />
      </main>

      {/* Vue À propos */}
      <AnimatePresence>
        {view.name === "about" && (
          <AboutView copy={copy} onBack={() => setView({ name: "home" })} sound={sound} />
        )}
      </AnimatePresence>

      {/* Vue Domaines & Skills */}
      <AnimatePresence>
        {view.name === "skills" && (
          <SkillsView lang={lang} onBack={() => setView({ name: "home" })} sound={sound} />
        )}
      </AnimatePresence>
    </div>
  );
}
