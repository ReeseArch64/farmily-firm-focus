"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function ModuleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-black text-foreground mb-2">
            Erro ao carregar módulo
          </h1>
          <p className="text-muted-foreground">
            Ocorreu um problema ao buscar o conteúdo. Tente novamente em instantes.
          </p>
          {error?.digest && (
            <p className="text-xs text-muted-foreground/60 mt-2 font-mono">
              {error.digest}
            </p>
          )}
        </div>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={reset}>
            Tentar novamente
          </Button>
          <Link href="/">
            <Button className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
