"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Award,
  BookOpen,
  Users,
  LogIn,
  LogOut,
  User,
  Plus,
  ChevronRight,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModuleCard } from "@/components/module-card";
import { CreateModuleDialog } from "@/components/create-module-dialog";

interface Module {
  id: string;
  title: string;
  summary: string;
  bannerImage: string;
  order: number;
  resources: Array<{ id: string; type: string; title: string; url: string }>;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const heroVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function Home() {
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "ADMIN";
  const [modules, setModules] = useState<Module[]>([]);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  const fetchModules = async () => {
    const res = await fetch("/api/modules");
    const data = await res.json();
    setModules(data);
  };

  const fetchProgress = async () => {
    if (!session?.user) return;
    const res = await fetch("/api/progress");
    const data = await res.json();
    setProgress(data);
  };

  useEffect(() => {
    Promise.all([fetchModules()]).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchProgress();
  }, [session]);

  const completedCount = Object.values(progress).filter(Boolean).length;

  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        className="hero-gradient text-white relative overflow-hidden"
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                <GraduationCap className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm font-semibold text-white/80 tracking-wide">
                Family Firm Focus
              </span>
            </div>

            <div className="flex items-center gap-3">
              {isAdmin && (
                <Button
                  onClick={() => setShowCreate(true)}
                  className="gap-2 bg-accent hover:bg-accent/90 text-white font-bold shadow-lg shadow-accent/30 border-0"
                  size="sm"
                >
                  <Plus className="w-4 h-4" />
                  Novo Módulo
                </Button>
              )}
              {session?.user ? (
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2">
                    <User className="w-4 h-4 text-white/70" />
                    <span className="text-sm text-white/90 font-medium">
                      {session.user.name}
                    </span>
                    {isAdmin && (
                      <span className="text-xs bg-accent/80 text-white px-1.5 py-0.5 rounded-md font-bold">
                        ADMIN
                      </span>
                    )}
                  </div>
                  <Button
                    onClick={() => signOut()}
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-white/80 hover:text-white hover:bg-white/10 border border-white/10"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Sair</span>
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="gap-2 font-bold bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-sm"
                  >
                    <LogIn className="w-4 h-4" />
                    Entrar
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Hero content */}
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-bold tracking-widest uppercase text-accent/90">
                Academia Familiar
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-5xl md:text-6xl font-black leading-tight mb-5"
            >
              Aprenda a Gerir o{" "}
              <span className="text-gradient bg-gradient-to-r from-orange-300 to-amber-400 bg-clip-text text-transparent">
                Negócio
              </span>{" "}
              da Família
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg text-white/75 leading-relaxed max-w-xl"
            >
              Cursos, vídeos e materiais selecionados para você dominar a gestão
              e profissionalizar o negócio da sua família.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap items-center gap-6 mt-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm">
                  <BookOpen className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-xl font-black">{modules.length}</div>
                  <div className="text-xs text-white/60">Cursos</div>
                </div>
              </div>
              {session?.user && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm">
                    <Award className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-xl font-black">{completedCount}</div>
                    <div className="text-xs text-white/60">Concluídos</div>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-xl font-black">∞</div>
                  <div className="text-xs text-white/60">Gerações</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 27C840 35 960 40 1080 38C1200 35 1320 25 1380 20L1440 15V60H0Z" fill="hsl(220, 25%, 97%)" />
          </svg>
        </div>

        <div className="h-8" />
      </motion.header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-2xl font-black text-foreground">
              Cursos e Materiais
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {modules.length} conteúdos disponíveis
              {session?.user && modules.length > 0 && (
                <span className="ml-2 text-accent font-semibold">
                  · {completedCount}/{modules.length} concluídos
                </span>
              )}
            </p>
          </div>
          {!session?.user && (
            <Link href="/login">
              <Button variant="outline" size="sm" className="gap-2 font-semibold">
                <LogIn className="w-4 h-4" />
                Entre e acompanhe seu aprendizado
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-72 bg-card rounded-2xl animate-pulse border"
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {modules.map((module) => (
                <motion.div key={module.id} variants={itemVariants}>
                  <ModuleCard
                    module={module}
                    isCompleted={!!progress[module.id]}
                    isAdmin={isAdmin}
                    onDeleted={fetchModules}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 mt-20 pb-4 text-center">
        <div className="border-t pt-8">
          <p className="text-sm text-muted-foreground">
            © 2026 Family Firm Focus. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Create Module Dialog (admin only) */}
      {isAdmin && (
        <CreateModuleDialog
          open={showCreate}
          onOpenChange={setShowCreate}
          onCreated={fetchModules}
        />
      )}
    </div>
  );
}
