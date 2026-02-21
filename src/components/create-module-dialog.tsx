"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, BookOpen, Link2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Resource {
  type: string;
  title: string;
  url: string;
}

interface CreateModuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}

const RESOURCE_TYPES = [
  { value: "curso", label: "Curso" },
  { value: "playlist", label: "PlayList" },
  { value: "artigo", label: "Artigo" },
  { value: "livro", label: "Livro" },
  { value: "podcast", label: "Podcast" },
  { value: "video", label: "Video" },
  { value: "material", label: "Material Complementar" },
  { value: "serie", label: "Serie" },
  { value: "filme", label: "Filme" },
  { value: "musica", label: "Musica" },
];

export function CreateModuleDialog({
  open,
  onOpenChange,
  onCreated,
}: CreateModuleDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    bannerImage: "",
  });
  const [resources, setResources] = useState<Resource[]>([
    { type: "curso", title: "", url: "" },
  ]);

  const addResource = () => {
    setResources((prev) => [...prev, { type: "curso", title: "", url: "" }]);
  };

  const removeResource = (i: number) => {
    setResources((prev) => prev.filter((_, idx) => idx !== i));
  };

  const updateResource = (i: number, field: keyof Resource, value: string) => {
    setResources((prev) =>
      prev.map((r, idx) => (idx === i ? { ...r, [field]: value } : r))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.summary) {
      toast({ title: "Preencha título e resumo", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/modules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          resources: resources.filter((r) => r.title && r.url),
        }),
      });

      if (!res.ok) throw new Error();

      toast({ title: "Módulo criado com sucesso!" });
      onCreated();
      onOpenChange(false);
      setForm({ title: "", summary: "", bannerImage: "" });
      setResources([{ type: "curso", title: "", url: "" }]);
    } catch {
      toast({ title: "Erro ao criar módulo", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-thin">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-black">
            <div className="p-2 bg-accent/10 rounded-lg text-accent">
              <BookOpen className="w-5 h-5" />
            </div>
            Criar Novo Módulo
          </DialogTitle>
          <DialogDescription>
            Preencha as informações do módulo de estudo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-2">
          {/* Basic info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="font-semibold">
                Título *
              </Label>
              <Input
                id="title"
                placeholder="Ex: Fundamentos da Empresa Familiar"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary" className="font-semibold">
                Resumo *
              </Label>
              <Textarea
                id="summary"
                placeholder="Descreva o conteúdo deste módulo..."
                value={form.summary}
                onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
                className="resize-none h-24"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="banner" className="font-semibold">
                URL da Imagem de Capa
              </Label>
              <div className="relative">
                <Link2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="banner"
                  placeholder="https://..."
                  value={form.bannerImage}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, bannerImage: e.target.value }))
                  }
                  className="pl-10 h-11"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Deixe vazio para usar uma imagem aleatória.
              </p>
            </div>
          </div>

          {/* Resources */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="font-semibold text-base">Recursos</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addResource}
                className="gap-1.5 text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Adicionar
              </Button>
            </div>

            <AnimatePresence>
              <div className="space-y-3">
                {resources.map((resource, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="p-4 border rounded-xl bg-secondary/30 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-muted-foreground">
                        Recurso {i + 1}
                      </span>
                      {resources.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="w-7 h-7 text-muted-foreground hover:text-destructive"
                          onClick={() => removeResource(i)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs">Tipo</Label>
                        <Select
                          value={resource.type}
                          onValueChange={(v) => updateResource(i, "type", v)}
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {RESOURCE_TYPES.map((t) => (
                              <SelectItem key={t.value} value={t.value}>
                                {t.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs">Título</Label>
                        <Input
                          placeholder="Nome do recurso"
                          value={resource.title}
                          onChange={(e) => updateResource(i, "title", e.target.value)}
                          className="h-9"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs">URL</Label>
                      <Input
                        placeholder="https://..."
                        value={resource.url}
                        onChange={(e) => updateResource(i, "url", e.target.value)}
                        className="h-9"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-accent hover:bg-accent/90 text-white font-bold"
            >
              {loading ? "Criando..." : "Criar Módulo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
