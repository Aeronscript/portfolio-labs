import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Eye,
  FolderKanban,
  Inbox,
  LogOut,
  Plus,
  Settings,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

const PROJECTS = [
  { name: "Nébuleuse", year: "2025", status: "Publié" },
  { name: "Studio Arpège", year: "2024", status: "Publié" },
  { name: "Kiosk", year: "2024", status: "Publié" },
  { name: "Atelier Flux", year: "2023", status: "Ébauche" },
];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-6 py-10 text-foreground">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-violet-500/15 blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-8%] h-80 w-80 rounded-full bg-fuchsia-400/10 blur-[110px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-violet-600 dark:text-violet-300">
              Espace privé — Gestion du portfolio
            </p>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
              Bonjour{user?.name ? `, ${user.name}` : ""} 👋
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              className="gap-2 text-muted-foreground"
              asChild
            >
              <Link to="/">
                <ArrowLeft className="size-4" />
                Voir le portfolio
              </Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer gap-2 border-violet-200 dark:border-white/10"
              onClick={handleSignOut}
            >
              <LogOut className="size-4" />
              Se déconnecter
            </Button>
          </div>
        </header>

        {/* Statistiques */}
        <div className="grid gap-px overflow-hidden rounded-2xl border border-violet-100 bg-violet-100 dark:border-white/10 dark:bg-white/10 sm:grid-cols-3">
          {[
            { value: "4", label: "Projets publiés", icon: FolderKanban },
            { value: "1", label: "Projet en ébauche", icon: Eye },
            { value: "0", label: "Messages reçus", icon: Inbox },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 bg-card p-6 dark:bg-card"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-md shadow-violet-600/25">
                <stat.icon className="size-5" />
              </span>
              <div>
                <p className="font-display text-2xl font-semibold tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Projets */}
          <Card className="border-violet-100 shadow-none dark:border-white/5 md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-display tracking-tight">
                  Gestion des projets
                </CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-1.5 border-violet-200 text-violet-700 dark:border-white/10 dark:text-violet-300"
                >
                  <Plus className="size-4" />
                  Nouveau projet
                </Button>
              </div>
            </CardHeader>
            <CardContent className="text-sm">
              <ul className="divide-y divide-violet-100 dark:divide-white/5">
                {PROJECTS.map((project) => (
                  <li
                    key={project.name}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="size-2 rounded-full bg-violet-500" />
                      <span className="font-medium">{project.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {project.year}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-medium",
                        project.status === "Publié"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300",
                      )}
                    >
                      {project.status}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="border-violet-100 shadow-none dark:border-white/5">
            <CardHeader>
              <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300">
                <Inbox className="size-5" />
              </div>
              <CardTitle className="font-display tracking-tight">
                Messages
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              <p className="rounded-xl border border-dashed border-violet-200 bg-violet-50/50 px-4 py-6 text-center dark:border-white/10 dark:bg-white/5">
                Aucun message pour le moment. Les demandes de contact
                apparaîtront ici.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Préférences */}
        <Card className="border-violet-100 shadow-none dark:border-white/5">
          <CardHeader>
            <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300">
              <Settings className="size-5" />
            </div>
            <CardTitle className="font-display tracking-tight">
              Préférences du site
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-muted-foreground">
            <p>
              Bientôt : modification du contenu du portfolio (projets,
              biographie, coordonnées), choix du thème et statistiques de
              visite.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
