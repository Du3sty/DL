import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  Search, Github, Star, ExternalLink, Sparkles, Zap, Plus, Terminal,
  Download, Lock, LogOut, ShieldCheck, X,
} from "lucide-react";
import { categories, siteConfig, type Category, type Resource } from "@/data/resources";
import { ParticleField } from "@/components/ParticleField";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DL — Your Download Vault" },
      { name: "description", content: "Games, software, and resources — curated, searchable, and customizable." },
      { property: "og:title", content: "DL — Your Download Vault" },
      { property: "og:description", content: "Games, software, and resources — curated, searchable, and customizable." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Home,
});

const FAVS_KEY = "dl-favs";

function loadFavs(): Resource[] {
  try {
    return JSON.parse(localStorage.getItem(FAVS_KEY) || "[]");
  } catch {
    return [];
  }
}

function Home() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string>("all");
  const [favs, setFavs] = useState<Resource[]>([]);
  const [showFavs, setShowFavs] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    setFavs(loadFavs());
    setIsAdmin(sessionStorage.getItem("dl-admin") === "1");
  }, []);

  const toggleFav = (r: Resource) => {
    setFavs((prev) => {
      const exists = prev.some((f) => f.url === r.url);
      const next = exists ? prev.filter((f) => f.url !== r.url) : [...prev, r];
      localStorage.setItem(FAVS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const isFav = (r: Resource) => favs.some((f) => f.url === r.url);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories
      .filter((c) => activeId === "all" || c.id === activeId)
      .map((c) => ({
        ...c,
        resources: c.resources.filter(
          (r) =>
            !q ||
            r.name.toLowerCase().includes(q) ||
            r.description?.toLowerCase().includes(q) ||
            r.tags?.some((t) => t.toLowerCase().includes(q)),
        ),
      }))
      .filter((c) => c.resources.length > 0);
  }, [query, activeId]);

  const favResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    return favs.filter(
      (r) => !q || r.name.toLowerCase().includes(q) || r.description?.toLowerCase().includes(q),
    );
  }, [favs, query]);

  const totalResources = categories.reduce((n, c) => n + c.resources.length, 0);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleField />
      <div className="pointer-events-none fixed inset-0 -z-10 grid-bg" />
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="scanline" />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/40 glass">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-mono text-sm tracking-widest">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 text-primary pulse-glow">
              <Terminal className="h-4 w-4" />
            </span>
            <span className="text-foreground">{siteConfig.name}</span>
          </a>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFavs((v) => !v)}
              className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-mono transition ${
                showFavs
                  ? "border-primary/60 bg-primary/15 text-primary"
                  : "border-border/60 bg-secondary/40 text-muted-foreground hover:border-primary/60 hover:text-foreground"
              }`}
            >
              <Star className={`h-3.5 w-3.5 ${showFavs ? "fill-primary" : ""}`} />
              favorites ({favs.length})
            </button>
            {isAdmin ? (
              <button
                onClick={() => {
                  sessionStorage.removeItem("dl-admin");
                  setIsAdmin(false);
                }}
                className="inline-flex items-center gap-2 rounded-md border border-primary/60 bg-primary/15 px-3 py-1.5 text-xs font-mono text-primary transition hover:bg-primary/25"
              >
                <LogOut className="h-3.5 w-3.5" />
                admin
              </button>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-secondary/40 px-3 py-1.5 text-xs font-mono text-muted-foreground transition hover:border-primary/60 hover:text-foreground"
              >
                <Lock className="h-3.5 w-3.5" />
                login
              </button>
            )}
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="group hidden items-center gap-2 rounded-md border border-border/60 bg-secondary/40 px-3 py-1.5 text-xs font-mono text-muted-foreground transition hover:border-primary/60 hover:text-foreground sm:inline-flex"
            >
              <Github className="h-3.5 w-3.5 transition group-hover:text-primary" />
              github
            </a>
          </div>
        </div>
      </header>

      {/* Admin banner */}
      <AnimatePresence>
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-b border-primary/30 bg-primary/10"
          >
            <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-2 font-mono text-xs text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              admin mode enabled — edit src/data/resources.ts to manage downloads
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section id="top" className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary"
        >
          <Sparkles className="h-3 w-3" />
          v1.0 // open source
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="glitch mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
        >
          <span className="block text-foreground">Your downloads,</span>
          <span className="block bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent glow-text">
            one vault.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-6 max-w-xl text-balance text-muted-foreground"
        >
          {siteConfig.description}
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative mx-auto mt-10 max-w-xl"
        >
          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/40 via-accent/40 to-primary-glow/40 opacity-60 blur-md" />
          <div className="relative flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search games, software, tags…"
              className="w-full bg-transparent font-mono text-sm placeholder:text-muted-foreground/70 focus:outline-none"
            />
            <kbd className="hidden rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
              /
            </kbd>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mx-auto mt-8 flex max-w-md items-center justify-center gap-8 font-mono text-xs text-muted-foreground"
        >
          <Stat label="resources" value={totalResources} />
          <span className="h-6 w-px bg-border" />
          <Stat label="categories" value={categories.length} />
          <span className="h-6 w-px bg-border" />
          <Stat label="favorites" value={favs.length} />
        </motion.div>
      </section>

      {/* Filter chips */}
      {!showFavs && (
        <section className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Chip active={activeId === "all"} onClick={() => setActiveId("all")}>
              <Zap className="mr-1 h-3 w-3" /> all
            </Chip>
            {categories.map((c) => (
              <Chip key={c.id} active={activeId === c.id} onClick={() => setActiveId(c.id)}>
                <c.icon className="mr-1 h-3 w-3" /> {c.name.toLowerCase()}
              </Chip>
            ))}
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <AnimatePresence mode="popLayout">
          {showFavs ? (
            favResults.length === 0 ? (
              <EmptyState key="nofavs" text="no favorites yet — star something below" />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <motion.div
                  key="favs"
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative overflow-hidden rounded-xl glass p-5 md:col-span-2 lg:col-span-3"
                >
                  <h3 className="flex items-center gap-2 font-semibold text-foreground">
                    <Star className="h-4 w-4 fill-primary text-primary" /> Your favorites
                  </h3>
                  <ul className="mt-4 grid gap-1 md:grid-cols-2 lg:grid-cols-3">
                    {favResults.map((r) => (
                      <ResourceRow key={r.url} resource={r} isFav onToggleFav={() => toggleFav(r)} />
                    ))}
                  </ul>
                </motion.div>
              </div>
            )
          ) : filtered.length === 0 ? (
            <EmptyState key="empty" text={`no results for "${query}"`} />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((cat, idx) => (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  index={idx}
                  isFav={isFav}
                  onToggleFav={toggleFav}
                />
              ))}
              <AddCard />
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-center font-mono text-xs text-muted-foreground md:flex-row md:text-left">
          <p>
            {">"} edit <span className="text-primary">src/data/resources.ts</span> to customize
          </p>
          <p>open source · MIT · built with care</p>
        </div>
      </footer>

      {/* Auth modal */}
      <AnimatePresence>
        {authOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm"
            onClick={() => setAuthOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-xl glass p-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-mono text-sm text-foreground">
                  <Lock className="h-4 w-4 text-primary" /> admin login
                </h3>
                <button
                  onClick={() => setAuthOpen(false)}
                  className="text-muted-foreground transition hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <form
                className="mt-4 space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                  const pass = (form.elements.namedItem("pass") as HTMLInputElement).value;
                  if (email && pass) {
                    sessionStorage.setItem("dl-admin", "1");
                    setIsAdmin(true);
                    setAuthOpen(false);
                  }
                }}
              >
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className="w-full rounded-md border border-border bg-secondary/40 px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary/60 focus:outline-none"
                />
                <input
                  name="pass"
                  type="password"
                  required
                  placeholder="Password"
                  className="w-full rounded-md border border-border bg-secondary/40 px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary/60 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-md bg-primary py-2 font-mono text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Login
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-24 text-center font-mono text-sm text-muted-foreground"
    >
      {">"} {text}
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="text-center">
      <div className="text-xl font-semibold text-foreground">{value}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-widest">{label}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center rounded-full border px-3 py-1.5 font-mono text-xs transition ${
        active
          ? "border-primary/60 bg-primary/15 text-primary"
          : "border-border/60 bg-secondary/30 text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function ResourceRow({
  resource: r,
  isFav,
  onToggleFav,
}: {
  resource: Resource;
  isFav: boolean;
  onToggleFav: () => void;
}) {
  return (
    <li className="group/item flex items-center justify-between gap-2 rounded-md border border-transparent px-2 py-2 transition hover:border-primary/30 hover:bg-primary/5">
      <a href={r.url} target="_blank" rel="noreferrer" className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          {r.starred && <Star className="h-3 w-3 fill-primary text-primary" />}
          <span className="truncate text-sm text-foreground">{r.name}</span>
        </div>
        {r.description && (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{r.description}</p>
        )}
      </a>
      <div className="flex shrink-0 items-center gap-1">
        <button
          onClick={onToggleFav}
          title={isFav ? "Remove from favorites" : "Add to favorites"}
          className={`rounded-md p-1.5 transition ${
            isFav ? "text-primary" : "text-muted-foreground/50 hover:text-primary"
          }`}
        >
          <Star className={`h-3.5 w-3.5 ${isFav ? "fill-primary" : ""}`} />
        </button>
        <a
          href={r.url}
          target="_blank"
          rel="noreferrer"
          title="Download"
          className="rounded-md p-1.5 text-muted-foreground transition hover:text-primary"
        >
          <Download className="h-3.5 w-3.5" />
        </a>
      </div>
    </li>
  );
}

function CategoryCard({
  category,
  index,
  isFav,
  onToggleFav,
}: {
  category: Category;
  index: number;
  isFav: (r: Resource) => boolean;
  onToggleFav: (r: Resource) => void;
}) {
  const Icon = category.icon;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-xl glass p-5"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-primary/20" />
      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{category.name}</h3>
              <p className="text-xs text-muted-foreground">{category.description}</p>
            </div>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">
            {String(category.resources.length).padStart(2, "0")}
          </span>
        </div>

        <ul className="mt-4 space-y-1">
          {category.resources.map((r) => (
            <ResourceRow
              key={r.url}
              resource={r}
              isFav={isFav(r)}
              onToggleFav={() => onToggleFav(r)}
            />
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function AddCard() {
  return (
    <motion.a
      href={siteConfig.github}
      target="_blank"
      rel="noreferrer"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group relative flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-primary/30 bg-primary/[0.03] p-5 text-center transition hover:border-primary/60 hover:bg-primary/[0.06]"
    >
      <div>
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary transition group-hover:scale-110">
          <Plus className="h-5 w-5" />
        </div>
        <h3 className="mt-3 font-semibold text-foreground">Add your own</h3>
        <p className="mt-1 max-w-[220px] text-xs text-muted-foreground">
          Fork on GitHub and edit <span className="font-mono text-primary">resources.ts</span>
        </p>
      </div>
    </motion.a>
  );
}
