
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Link href="/">
          <Button variant="ghost" className="mb-4 gap-2 text-muted-foreground hover:text-primary">
            <ArrowLeft className="w-4 h-4" /> Voltar ao início
          </Button>
        </Link>
        
        <Card className="shadow-xl border-none">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-accent/10 text-accent">
                <Lock className="w-6 h-6" />
              </div>
            </div>
            <CardTitle className="text-2xl font-headline font-black text-primary">Acesse sua Conta</CardTitle>
            <CardDescription>
              Entre para acompanhar seu progresso individual no plano de estudos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="email" placeholder="nome@exemplo.com" className="pl-10" type="email" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link href="#" className="text-xs text-accent hover:underline">Esqueceu a senha?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" className="pl-10" />
              </div>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 font-bold h-11">
              Entrar
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="text-center text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <Link href="/register" className="text-accent font-bold hover:underline">
                Cadastre-se agora
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
