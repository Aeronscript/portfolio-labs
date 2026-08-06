import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex min-h-screen flex-col overflow-hidden bg-background"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-violet-500/15 blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-8%] h-80 w-80 rounded-full bg-fuchsia-400/10 blur-[110px]" />
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="font-serif text-8xl font-light italic text-violet-600/80 dark:text-violet-300/80 sm:text-9xl">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Page introuvable
        </h1>
        <p className="mt-3 max-w-md text-base text-muted-foreground">
          Cette page s'est égarée dans le noir. Revenons à quelque chose de
          plus lumineux.
        </p>
        <Link
          to="/"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all duration-300 hover:gap-3 dark:bg-violet-400 dark:text-violet-950"
        >
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Retour au portfolio
        </Link>
      </div>
    </motion.div>
  );
}
