import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Heart, ShoppingCart, Search, Phone, Mail } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Link } from "wouter";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  const { data: products, isLoading } = trpc.products.list.useQuery();
  const addToCartMutation = trpc.cart.add.useMutation();

  const categories = ["Piloto Automático", "Pulverizadores", "GPS Agrícola", "Acessórios", "Serviços"];

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  const handleAddToCart = (productId: number) => {
    addToCartMutation.mutate({ productId, quantity: 1 });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src="/logo-newagrostore.png" alt="NEWagro" className="h-12 w-auto" />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-accent transition">Produtos</Link>
            <Link href="/servicos" className="text-foreground hover:text-accent transition">Serviços</Link>
            <Link href="/sobre" className="text-foreground hover:text-accent transition">Sobre</Link>
            <Link href="/contato" className="text-foreground hover:text-accent transition">Contato</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-foreground hover:text-accent transition cursor-pointer" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent to-secondary py-16 text-white">
        <div className="container">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Tecnologia Agrícola de Precisão</h2>
            <p className="text-lg mb-8 opacity-90">Soluções completas em agricultura de precisão, piloto automático e sistemas de pulverização para maximizar sua produtividade.</p>
            <Button size="lg" className="bg-white text-accent hover:bg-gray-100">
              Explorar Catálogo
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="bg-white border-b border-border py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <select
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || undefined)}
              className="px-4 py-2 border border-border rounded-lg bg-white"
            >
              <option value="">Todas as categorias</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Products Catalog */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Catálogo de Produtos</h2>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg" />
                  <CardContent className="pt-4">
                    <div className="h-4 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="hover:shadow-lg transition overflow-hidden">
                  {product.images && product.images.length > 0 && (
                    <div className="h-48 bg-muted flex items-center justify-center overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-accent">
                        R$ {parseFloat(product.price).toFixed(2)}
                      </span>
                      <span className={`text-sm px-2 py-1 rounded ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {product.stock > 0 ? `${product.stock} em estoque` : 'Fora de estoque'}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        asChild
                        className="flex-1 bg-accent hover:bg-accent/90"
                        disabled={product.stock === 0}
                      >
                        <Link href={`/produto/${product.id}`}>
                          Ver Detalhes
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleAddToCart(product.id)}
                        disabled={product.stock === 0}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Nenhum produto encontrado</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Precisa de Suporte Técnico?</h2>
          <p className="text-lg mb-8 opacity-90">Entre em contato conosco para assistência especializada em agricultura de precisão</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-accent hover:bg-gray-100">
              <Phone className="w-4 h-4 mr-2" />
              (55) 99619-4261
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Mail className="w-4 h-4 mr-2" />
              Enviar Email
            </Button>
          </div>
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
