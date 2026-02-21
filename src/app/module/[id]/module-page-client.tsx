"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ExternalLink,
  PlayCircle,
  BookText,
  FileText,
  Share2,
  Globe,
  CheckCircle2,
  Circle,
  LogIn,
  Edit,
} from "lucide-react";
import { EditModuleDialog } from "@/components/edit-module-dialog";

interface Resource {
  id?: string;
  type: string;
  title: string;
  url: string;
}

interface Module {
  id: string;
  title: string;
  summary: string;
  bannerImage: string;
  resources: Resource[];
}

interface ModulePageClientProps {
  module: Module;
  initialCompleted: boolean;
  isLoggedIn: boolean;
  isAdmin: boolean;
}

const resourceTypeConfig: Record<
  string,
  { icon: React.ElementType; color: string; label: string }
> = {
  playlist: { icon: PlayCircle, color: "text-red-500 bg-red-50", label: "Playlist" },
  book: { icon: BookText, color: "text-blue-500 bg-blue-50", label: "Livro" },
  material: { icon: FileText, color: "text-amber-500 bg-amber-50", label: "Material" },
  post: { icon: Share2, color: "text-purple-500 bg-purple-50", label: "Post" },
  blog: { icon: Globe, color: "text-emerald-500 bg-emerald-50", label: "Blog" },
};

export function ModulePageClient({
  module,
  initialCompleted,
  isLoggedIn,
  isAdmin,
}: ModulePageClientProps) {
  const { toast } = useToast();
  const [completed, setCompleted] = useState(initialCompleted);
  const [toggling, setToggling] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentModule, setCurrentModule] = useState(module);

  const handleToggle = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Faça login para rastrear progresso",
        description: "Entre na sua conta para salvar seu progresso.",
      });
      return;
    }

    setToggling(true);
    const next = !completed;
    setCompleted(next);

    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId: currentModule.id, completed: next }),
      });
      toast({
        title: next ? "Módulo concluído!" : "Progresso removido",
        description: next
          ? "Parabéns! Continue assim."
          : "Você pode marcar novamente quando quiser.",
      });
    } catch {
      setCompleted(!next);
      toast({ title: "Erro ao salvar progresso", variant: "destructive" });
    } finally {
      setToggling(false);
    }
  };

  const getResource = (type: string) =>
    resourceTypeConfig[type] ?? {
      icon: Globe,
      color: "text-slate-500 bg-slate-50",
      label: type,
    };

  return (
    <>
      <div className="min-h-screen bg-background pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
          {/* Back + Admin */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-foreground -ml-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar ao Plano
              </Button>
            </Link>

            {isAdmin && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEdit(true)}
                className="gap-2"
              >
                <Edit className="w-4 h-4" />
                Editar Módulo
              </Button>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl shadow-lg border border-border/60 overflow-hidden"
          >
            {/* Banner */}
            <div className="relative h-72 w-full">
              <Image
                src={currentModule.bannerImage}
                alt={currentModule.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {completed && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2 bg-emerald-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    <CheckCircle2 className="w-4 h-4" />
                    Concluído
                  </div>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Badge className="mb-3 bg-accent/80 text-white border-0 backdrop-blur-sm text-xs font-bold uppercase tracking-wide">
                  Módulo de Estudo
                </Badge>
                <h1 className="text-3xl md:text-4xl font-black text-white leading-tight drop-shadow-md">
                  {currentModule.title}
                </h1>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {/* Summary */}
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-10"
              >
                <h2 className="text-xs uppercase tracking-widest font-bold text-accent mb-3">
                  Sobre este Módulo
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {currentModule.summary}
                </p>
              </motion.section>

              <Separator className="my-8" />

              {/* Resources */}
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-10"
              >
                <h2 className="text-xl font-black text-foreground mb-6">
                  Recursos e Materiais
                </h2>
                <div className="grid gap-3">
                  {currentModule.resources.map((resource, idx) => {
                    const { icon: Icon, color, label } = getResource(resource.type);
                    return (
                      <motion.a
                        key={resource.id}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx + 0.3 }}
                        whileHover={{ x: 4 }}
                        className="flex items-center justify-between p-4 rounded-xl border border-border/60 bg-secondary/30 hover:bg-secondary/60 hover:border-accent/30 hover:shadow-md transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center ${color} shrink-0 transition-transform group-hover:scale-110 duration-200`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-foreground group-hover:text-accent transition-colors">
                              {resource.title}
                            </p>
                            <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wide mt-0.5">
                              {label}
                            </p>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
                      </motion.a>
                    );
                  })}

                  {currentModule.resources.length === 0 && (
                    <p className="text-muted-foreground text-sm text-center py-6">
                      Nenhum recurso disponível ainda.
                    </p>
                  )}
                </div>
              </motion.section>

              <Separator className="my-8" />

              {/* Progress */}
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-xl font-black text-foreground mb-4">
                  Seu Progresso
                </h2>

                {!isLoggedIn ? (
                  <div className="flex items-center justify-between p-5 rounded-xl border-2 border-dashed border-border bg-secondary/20">
                    <div>
                      <p className="font-bold text-foreground">
                        Faça login para salvar seu progresso
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Acompanhe o que já estudou entre sessões.
                      </p>
                    </div>
                    <Link href="/login">
                      <Button size="sm" className="gap-2 shrink-0">
                        <LogIn className="w-4 h-4" />
                        Entrar
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <motion.button
                    onClick={handleToggle}
                    disabled={toggling}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all cursor-pointer text-left ${
                      completed
                        ? "bg-emerald-50 border-emerald-400 shadow-emerald-100 shadow-md"
                        : "bg-card border-border hover:border-accent/50 hover:bg-secondary/30"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        completed
                          ? "bg-emerald-500 text-white"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {completed ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-black text-lg ${
                          completed ? "text-emerald-700" : "text-foreground"
                        }`}
                      >
                        {completed ? "Estudo Concluído!" : "Marcar como Concluído"}
                      </p>
                      <p
                        className={`text-sm mt-0.5 ${
                          completed
                            ? "text-emerald-600"
                            : "text-muted-foreground"
                        }`}
                      >
                        {completed
                          ? "Você dominou este módulo. Parabéns!"
                          : "Clique quando terminar de estudar este módulo."}
                      </p>
                    </div>
                    {completed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-emerald-500"
                      >
                        <CheckCircle2 className="w-7 h-7" />
                      </motion.div>
                    )}
                  </motion.button>
                )}
              </motion.section>
            </div>
          </motion.div>
        </div>
      </div>

      {isAdmin && (
        <EditModuleDialog
          open={showEdit}
          onOpenChange={setShowEdit}
          module={currentModule}
          onUpdated={(updated) => setCurrentModule(updated)}
        />
      )}
    </>
  );
}
