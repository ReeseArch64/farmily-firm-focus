
import { curriculum } from "@/lib/data";
import { ModuleCard } from "@/components/module-card";
import { BookOpen, Award, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen pb-20">
      {/* Hero Header */}
      <header className="bg-primary text-primary-foreground py-16 px-6 shadow-xl">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-accent w-8 h-8" />
            <span className="uppercase tracking-widest text-xs font-bold text-accent">Plano de Excelência</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-black mb-4">
            Family Firm Focus
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl leading-relaxed">
            Plano de Estudos para Gestão da Empresa da Família. Conecte-se com os melhores materiais para profissionalizar seu legado.
          </p>
        </div>
      </header>

      {/* Curriculum Section */}
      <main className="max-w-6xl mx-auto px-6 -mt-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <BookOpen className="text-primary w-5 h-5" />
            <h2 className="text-2xl font-headline font-bold text-primary">Módulos de Estudo</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curriculum.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </main>

      {/* Footer Info */}
      <footer className="max-w-6xl mx-auto px-6 mt-16 text-center text-muted-foreground">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <Users className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Focado na continuidade da sua família</span>
          </div>
          <p className="text-xs">© 2024 Family Firm Focus. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
