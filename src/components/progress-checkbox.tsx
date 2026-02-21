
"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressCheckboxProps {
  moduleId: string;
}

export function ProgressCheckbox({ moduleId }: ProgressCheckboxProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const progress = localStorage.getItem("family-firm-progress");
    if (progress) {
      const completedModules = JSON.parse(progress);
      setIsCompleted(!!completedModules[moduleId]);
    }
  }, [moduleId]);

  const handleToggle = (checked: boolean) => {
    setIsCompleted(checked);
    const progress = localStorage.getItem("family-firm-progress");
    const completedModules = progress ? JSON.parse(progress) : {};
    
    if (checked) {
      completedModules[moduleId] = true;
    } else {
      delete completedModules[moduleId];
    }
    
    localStorage.setItem("family-firm-progress", JSON.stringify(completedModules));
    // Trigger storage event for cross-component sync
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className={cn(
      "flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer",
      isCompleted ? "bg-accent/10 border-accent" : "bg-card border-transparent shadow-sm"
    )}
    onClick={() => handleToggle(!isCompleted)}
    >
      <Checkbox 
        id={`complete-${moduleId}`} 
        checked={isCompleted} 
        onCheckedChange={(val) => handleToggle(!!val)}
        className="w-6 h-6 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
      />
      <div className="flex flex-col">
        <Label 
          htmlFor={`complete-${moduleId}`} 
          className="text-base font-bold cursor-pointer select-none"
        >
          {isCompleted ? "Estudo Concluído" : "Marcar como Concluído"}
        </Label>
        <p className="text-xs text-muted-foreground">
          {isCompleted ? "Você dominou este módulo!" : "Ainda há material para revisar."}
        </p>
      </div>
      {isCompleted && <CheckCircle2 className="ml-auto text-accent w-6 h-6 animate-in zoom-in" />}
    </div>
  );
}
