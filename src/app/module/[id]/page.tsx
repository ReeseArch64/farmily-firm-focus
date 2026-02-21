
import { curriculum } from "@/lib/data";
import { ProgressCheckbox } from "@/components/progress-checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  ExternalLink, 
  PlayCircle, 
  BookText, 
  FileText, 
  Share2, 
  Globe
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const module = curriculum.find(m => m.id === id);

  if (!module) {
    notFound();
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'playlist': return <PlayCircle className="w-5 h-5" />;
      case 'book': return <BookText className="w-5 h-5" />;
      case 'material': return <FileText className="w-5 h-5" />;
      case 'post': return <Share2 className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6 hover:bg-white gap-2 text-muted-foreground hover:text-primary">
            <ArrowLeft className="w-4 h-4" /> Voltar para o Plano
          </Button>
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Hero Banner */}
          <div className="relative h-64 w-full">
            <Image 
              src={module.bannerImage} 
              alt={module.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl md:text-4xl font-headline font-black text-white drop-shadow-md">
                {module.title}
              </h1>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Summary Section */}
            <section className="mb-10">
              <h2 className="text-xs uppercase tracking-widest font-bold text-accent mb-3">Resumo do Módulo</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {module.summary}
              </p>
            </section>

            <Separator className="my-8" />

            {/* Resources Section */}
            <section className="mb-10">
              <h2 className="text-xl font-headline font-bold text-primary mb-6">Recursos e Materiais</h2>
              <div className="grid gap-3">
                {module.resources.map((resource, idx) => (
                  <a 
                    key={idx} 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl border-2 border-transparent bg-secondary/30 hover:bg-secondary/50 hover:border-accent/30 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-accent shadow-sm group-hover:scale-110 transition-transform">
                        {getIcon(resource.type)}
                      </div>
                      <div>
                        <p className="font-bold text-primary">{resource.title}</p>
                        <p className="text-xs text-muted-foreground uppercase">{resource.type}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent" />
                  </a>
                ))}
              </div>
            </section>

            <Separator className="my-8" />

            {/* Progress Tracking */}
            <section>
              <h2 className="text-xl font-headline font-bold text-primary mb-6">Seu Progresso</h2>
              <ProgressCheckbox moduleId={module.id} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
