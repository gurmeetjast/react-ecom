import { ShoppingBag, Heart, Search, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { CartItem } from '../types';

interface HeaderProps {
  onNavigate: (page: string) => void;
  cart: CartItem[];
  wishlistCount: number;
  onCartClick: () => void;
}

export function Header({ onNavigate, cart, wishlistCount, onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        {/* Top banner */}
        <div className="text-center py-2 text-sm border-b border-border">
          Free shipping on orders over $100 | Easy returns within 30 days
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="font-['Playfair_Display'] text-2xl tracking-wider hover:opacity-70 transition-opacity"
          >
            ATELIER
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => onNavigate('women')}
              className="text-sm uppercase tracking-wider hover:text-accent transition-colors"
            >
              Women
            </button>
            <button
              onClick={() => onNavigate('men')}
              className="text-sm uppercase tracking-wider hover:text-accent transition-colors"
            >
              Men
            </button>
            <button
              onClick={() => onNavigate('new')}
              className="text-sm uppercase tracking-wider hover:text-accent transition-colors"
            >
              New Arrivals
            </button>
            <button
              onClick={() => onNavigate('sale')}
              className="text-sm uppercase tracking-wider hover:text-accent transition-colors text-destructive"
            >
              Sale
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-secondary rounded-full transition-colors hidden sm:block">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-full transition-colors hidden sm:block">
              <User className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-full transition-colors relative hidden sm:block">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              onClick={onCartClick}
              className="p-2 hover:bg-secondary rounded-full transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <button
              onClick={() => {
                onNavigate('women');
                setMobileMenuOpen(false);
              }}
              className="text-left text-sm uppercase tracking-wider hover:text-accent transition-colors py-2"
            >
              Women
            </button>
            <button
              onClick={() => {
                onNavigate('men');
                setMobileMenuOpen(false);
              }}
              className="text-left text-sm uppercase tracking-wider hover:text-accent transition-colors py-2"
            >
              Men
            </button>
            <button
              onClick={() => {
                onNavigate('new');
                setMobileMenuOpen(false);
              }}
              className="text-left text-sm uppercase tracking-wider hover:text-accent transition-colors py-2"
            >
              New Arrivals
            </button>
            <button
              onClick={() => {
                onNavigate('sale');
                setMobileMenuOpen(false);
              }}
              className="text-left text-sm uppercase tracking-wider hover:text-accent transition-colors py-2 text-destructive"
            >
              Sale
            </button>
            <div className="flex gap-4 pt-4 border-t border-border">
              <button className="flex items-center gap-2 text-sm">
                <Search className="w-4 h-4" /> Search
              </button>
              <button className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4" /> Account
              </button>
              <button className="flex items-center gap-2 text-sm relative">
                <Heart className="w-4 h-4" /> Wishlist
                {wishlistCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs px-1.5 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
