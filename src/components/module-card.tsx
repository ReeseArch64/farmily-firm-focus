"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Resource {
  id: string;
  type: string;
  title: string;
  url: string;
}

interface ModuleCardProps {
  module: {
    id: string;
    title: string;
    summary: string;
    bannerImage: string;
    resources: Resource[];
  };
  isCompleted?: boolean;
  isAdmin?: boolean;
  onDeleted?: () => void;
}

export function ModuleCard({
  module,
  isCompleted,
  isAdmin,
  onDeleted,
}: ModuleCardProps) {
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await fetch(`/api/modules/${module.id}`, { method: "DELETE" });
    setDeleting(false);
    setShowDelete(false);
    onDeleted?.();
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="relative group"
      >
        <Link href={`/module/${module.id}`} className="block">
          <Card className="overflow-hidden border border-border/60 shadow-sm hover:shadow-xl hover:shadow-primary/8 transition-all duration-300 bg-card rounded-2xl">
            {/* Banner */}
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={module.bannerImage}
                alt={module.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Badges top */}
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge className="bg-black/40 backdrop-blur-sm text-white border-white/10 text-[10px] font-semibold">
                  <BookOpen className="w-3 h-3 mr-1" />
                  {module.resources.length} recursos
                </Badge>
              </div>

              {isCompleted && (
                <div className="absolute top-3 right-3">
                  <div className="flex items-center gap-1.5 bg-emerald-500/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg">
                    <CheckCircle2 className="w-3 h-3" />
                    Concluído
                  </div>
                </div>
              )}

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-black text-lg leading-tight drop-shadow-sm">
                  {module.title}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex items-start justify-between gap-3">
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
                {module.summary}
              </p>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent shrink-0 mt-0.5 group-hover:bg-accent group-hover:text-white transition-colors duration-200">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </Card>
        </Link>

        {/* Admin delete button */}
        {isAdmin && (
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-3 right-3 w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowDelete(true);
            }}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        )}
      </motion.div>

      <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Excluir módulo
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir{" "}
              <strong>&quot;{module.title}&quot;</strong>? Esta ação não pode
              ser desfeita e todos os recursos serão removidos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {deleting ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
