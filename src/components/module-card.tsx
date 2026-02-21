
"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Module } from "@/lib/data";
import { ChevronRight } from "lucide-react";

interface ModuleCardProps {
  module: Module;
  isCompleted?: boolean;
}

export function ModuleCard({ module, isCompleted }: ModuleCardProps) {
  return (
    <Link href={`/module/${module.id}`} className="block group transition-transform hover:-translate-y-1">
      <Card className="overflow-hidden border-none shadow-md bg-card relative">
        {isCompleted && (
          <div className="absolute top-4 right-4 z-10 bg-accent text-white px-2 py-1 rounded-full text-xs font-bold shadow-sm">
            CONCLUÍDO
          </div>
        )}
        <div className="relative h-48 w-full">
          <Image
            src={module.bannerImage}
            alt={module.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-headline text-xl font-bold leading-tight drop-shadow-sm">
              {module.title}
            </h3>
          </div>
        </div>
        <CardContent className="p-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground line-clamp-1 flex-1 mr-2">
            {module.summary}
          </p>
          <ChevronRight className="w-5 h-5 text-accent shrink-0" />
        </CardContent>
      </Card>
    </Link>
  );
}
