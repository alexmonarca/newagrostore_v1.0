import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Wrench, Zap, BarChart3, Smartphone, Truck } from "lucide-react";
import { Link } from "wouter";

export default function Servicos() {
  const servicos = [
    {
      icon: Wrench,
      title: "Manutenção de Equipamentos",
      description: "Conserto e manutenção de monitores GPS touchscreen, pulverizadores e sistemas de piloto automático de todas as marcas.",
      detalhes: ["Diagnóstico técnico", "Reparo eletrônico", "Troca de componentes", "Testes de funcionamento"]
    },
    {
      icon: Zap,
      title: "Atualização de Sistemas",
      description: "Atualização de software e firmware para pulverizadores e sistemas de agricultura de precisão.",
      detalhes: ["Atualização multimarcas", "Compatibilidade garantida", "Suporte técnico", "Testes pós-atualização"]
    },
    {
      icon: BarChart3,
      title: "Calibração de Pulverizadores",
      description: "Calibração profissional de pulverizadores para otimizar a aplicação de defensivos e reduzir desperdícios.",
      detalhes: ["Análise de vazão", "Ajuste de pressão", "Teste de uniformidade", "Relatório técnico"]
    },
    {
      icon: Smartphone,
      title: "Assistência Técnica em Campo",
      description: "Suporte técnico especializado diretamente na sua propriedade para resolver problemas e otimizar operações.",
      detalhes: ["Atendimento rápido", "Diagnóstico no local", "Soluções imediatas", "Treinamento do operador"]
    },
    {
      icon: Truck,
      title: "Entrega Técnica de Equipamentos",
      description: "Instalação, configuração e treinamento de novos equipamentos de agricultura de precisão.",
      detalhes: ["Instalação profissional", "Configuração completa", "Treinamento de operadores", "Documentação técnica"]
    },
    {
      icon: CheckCircle,
      title: "Suporte a Múltiplas Marcas",
      description: "Atendimento especializado para Hexagon, Trimble, John Deere, Jacto e outras marcas do mercado agrícola.",
      detalhes: ["Conhecimento multimarcas", "Peças originais", "Garantia de qualidade", "Expertise comprovada"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo-newagrostore.png" alt="NEWagro" className="h-12 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-accent transition">Produtos</Link>
            <Link href="/servicos" className="text-foreground hover:text-accent transition font-semibold text-accent">Serviços</Link>
            <Link href="/sobre" className="text-foreground hover:text-accent transition">Sobre</Link>
            <Link href="/contato" className="text-foreground hover:text-accent transition">Contato</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent to-secondary py-16 text-white">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nossos Serviços</h1>
          <p className="text-lg opacity-90">Soluções técnicas especializadas em agricultura de precisão</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicos.map((servico, index) => {
              const Icon = servico.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-8 h-8 text-accent" />
                      <CardTitle className="text-xl">{servico.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{servico.description}</CardDescription>
                    <ul className="space-y-2">
                      {servico.detalhes.map((detalhe, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                          <span>{detalhe}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Solicite um Orçamento</h2>
          <p className="text-lg mb-8 opacity-90">Entre em contato conosco para mais informações sobre nossos serviços</p>
          <Button size="lg" className="bg-white text-accent hover:bg-gray-100">
            Entrar em Contato
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">NEWagro</h3>
              <p className="text-sm opacity-75">Soluções em agricultura de precisão</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produtos</h4>
              <ul className="space-y-2 text-sm opacity-75">
                <li><a href="#" className="hover:opacity-100">Piloto Automático</a></li>
                <li><a href="#" className="hover:opacity-100">Pulverizadores</a></li>
                <li><a href="#" className="hover:opacity-100">GPS Agrícola</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm opacity-75">
                <li><Link href="/sobre" className="hover:opacity-100">Sobre</Link></li>
                <li><Link href="/servicos" className="hover:opacity-100">Serviços</Link></li>
                <li><Link href="/contato" className="hover:opacity-100">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <p className="text-sm opacity-75 mb-2">WhatsApp: (55) 99619-4261</p>
              <p className="text-sm opacity-75">São Borja - RS</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm opacity-75">
            <p>&copy; 2026 NEWagro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
