import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Heart, ShoppingCart, Search, LogIn } from "lucide-react";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Link } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  const { data: products, isLoading } = trpc.products.list.useQuery();
  const { data: favorites } = trpc.favorites.list.useQuery(undefined, { enabled: isAuthenticated });
  const { data: cartItems } = trpc.cart.list.useQuery(undefined, { enabled: isAuthenticated });

  const addToCartMutation = trpc.cart.add.useMutation();
  const addToFavoritesMutation = trpc.favorites.add.useMutation();
  const removeFromFavoritesMutation = trpc.favorites.remove.useMutation();

  const isFavorited = (productId: number) => {
    return favorites?.some(fav => fav.productId === productId) || false;
  };

  const handleAddToCart = (productId: number) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    addToCartMutation.mutate({ productId, quantity: 1 });
  };

  const handleToggleFavorite = (productId: number) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    if (isFavorited(productId)) {
      removeFromFavoritesMutation.mutate({ productId });
    } else {
      addToFavoritesMutation.mutate({ productId });
    }
  };

  const categories = ["Piloto Automático", "Pulverizadores", "GPS Agrícola", "Acessórios", "Serviços"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src="/logo-newagrostore.png" alt="NEWagro" className="h-12 w-auto" />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-foreground hover:text-accent transition">Produtos</a>
            <a href="#" className="text-foreground hover:text-accent transition">Serviços</a>
            <a href="#" className="text-foreground hover:text-accent transition">Sobre</a>
            <a href="#" className="text-foreground hover:text-accent transition">Contato</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-foreground hover:text-accent transition cursor-pointer" />
              {cartItems && cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-destructive text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground">{user?.name || "Usuário"}</span>
                <Link href="/account">
                  <Button variant="outline" size="sm">Conta</Button>
                </Link>
              </div>
            ) : (
              <Button asChild size="sm">
                <a href={getLoginUrl()}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </a>
              </Button>
            )}
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
              className="px-4 py-2 border border-border rounded-lg bg-white text-foreground"
            >
              <option value="">Todas as categorias</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container">
          <h3 className="text-2xl font-bold mb-8 text-foreground">Catálogo de Produtos</h3>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted"></div>
                  <CardContent className="pt-4">
                    <div className="h-4 bg-muted mb-2"></div>
                    <div className="h-4 bg-muted w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products?.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition overflow-hidden">
                  <div className="relative h-48 bg-muted flex items-center justify-center overflow-hidden group">
                    {product.images && product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    ) : (
                      <div className="text-muted-foreground text-center">
                        <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        Sem imagem
                      </div>
                    )}
                    <button
                      onClick={() => handleToggleFavorite(product.id)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
                    >
                      <Heart
                        className={`w-5 h-5 ${isFavorited(product.id) ? "fill-destructive text-destructive" : "text-foreground"}`}
                      />
                    </button>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                    <CardDescription className="text-sm">{product.category}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-bold text-accent">
                        R$ {parseFloat(product.price.toString()).toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          R$ {parseFloat(product.originalPrice.toString()).toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAddToCart(product.id)}
                        className="flex-1 bg-accent hover:bg-accent/90"
                        disabled={product.stock === 0}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.stock === 0 ? "Indisponível" : "Carrinho"}
                      </Button>
                      <Link href={`/product/${product.id}`}>
                        <Button variant="outline" className="flex-1">
                          Detalhes
                        </Button>
                      </Link>
                    </div>

                    {product.stock <= 5 && product.stock > 0 && (
                      <p className="text-xs text-destructive mt-2">Apenas {product.stock} em estoque</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && (!products || products.length === 0) && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Nenhum produto encontrado</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white mt-16 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">NEWagro</h4>
              <p className="text-sm opacity-80">Soluções em agricultura de precisão e tecnologia agrícola.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Produtos</h4>
              <ul className="text-sm space-y-2 opacity-80">
                <li><a href="#" className="hover:opacity-100">Piloto Automático</a></li>
                <li><a href="#" className="hover:opacity-100">Pulverizadores</a></li>
                <li><a href="#" className="hover:opacity-100">GPS Agrícola</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Suporte</h4>
              <ul className="text-sm space-y-2 opacity-80">
                <li><a href="#" className="hover:opacity-100">Contato</a></li>
                <li><a href="#" className="hover:opacity-100">FAQ</a></li>
                <li><a href="#" className="hover:opacity-100">Documentação</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contato</h4>
              <p className="text-sm opacity-80">WhatsApp: (55) 99619-4261</p>
              <p className="text-sm opacity-80 mt-2">@NEWagroSB</p>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-sm opacity-80">
            <p>&copy; 2026 NEWagro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
