
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, UserPlus, Mail, Lock, User } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 py-12">
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
                <UserPlus className="w-6 h-6" />
              </div>
            </div>
            <CardTitle className="text-2xl font-headline font-black text-primary">Criar Nova Conta</CardTitle>
            <CardDescription>
              Comece sua jornada de profissionalização da empresa familiar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="name" placeholder="Seu nome" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail Profissional</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="email" placeholder="nome@empresa.com.br" className="pl-10" type="email" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="confirm-password" type="password" className="pl-10" />
              </div>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 font-bold h-11 mt-4">
              Criar Conta
            </Button>
          </CardContent>
          <CardFooter>
            <div className="text-center text-sm text-muted-foreground w-full">
              Já possui uma conta?{" "}
              <Link href="/login" className="text-accent font-bold hover:underline">
                Fazer Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
