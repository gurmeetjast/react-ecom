import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ProductListingPage } from './components/ProductListingPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { CartItem } from './types';
import { products } from './data';

type Page =
  | { type: 'home' }
  | { type: 'women' }
  | { type: 'men' }
  | { type: 'new' }
  | { type: 'sale' }
  | { type: 'shop' }
  | { type: 'product'; productId: string }
  | { type: 'checkout' };

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>({ type: 'home' });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [cartOpen, setCartOpen] = useState(false);
  const [pageHistory, setPageHistory] = useState<Page[]>([{ type: 'home' }]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const navigate = (page: string, params?: any) => {
    let newPage: Page;

    if (page === 'back' && pageHistory.length > 1) {
      const newHistory = [...pageHistory];
      newHistory.pop();
      setPageHistory(newHistory);
      setCurrentPage(newHistory[newHistory.length - 1]);
      return;
    }

    switch (page) {
      case 'home':
        newPage = { type: 'home' };
        break;
      case 'women':
        newPage = { type: 'women' };
        break;
      case 'men':
        newPage = { type: 'men' };
        break;
      case 'new':
        newPage = { type: 'new' };
        break;
      case 'sale':
        newPage = { type: 'sale' };
        break;
      case 'shop':
        newPage = { type: 'shop' };
        break;
      case 'product':
        newPage = { type: 'product', productId: params.productId };
        break;
      case 'checkout':
        newPage = { type: 'checkout' };
        break;
      default:
        newPage = { type: 'home' };
    }

    setCurrentPage(newPage);
    setPageHistory([...pageHistory, newPage]);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) =>
          cartItem.product.id === item.product.id &&
          cartItem.selectedColor === item.selectedColor &&
          cartItem.selectedSize === item.selectedSize
      );

      if (existingItemIndex >= 0) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
    
    // Show cart briefly when item is added
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleWishlistToggle = (productId: string) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  const handleCheckoutComplete = () => {
    setCart([]);
    navigate('home');
    alert('Thank you for your order!');
  };

  const renderPage = () => {
    switch (currentPage.type) {
      case 'home':
        return (
          <HomePage
            onNavigate={navigate}
            products={products}
            onWishlistToggle={handleWishlistToggle}
            wishlistedProducts={wishlist}
          />
        );

      case 'women':
      case 'men':
      case 'new':
      case 'sale':
        return (
          <ProductListingPage
            products={products}
            category={currentPage.type as any}
            onProductClick={(id) => navigate('product', { productId: id })}
            onWishlistToggle={handleWishlistToggle}
            wishlistedProducts={wishlist}
          />
        );

      case 'shop':
        return (
          <ProductListingPage
            products={products}
            onProductClick={(id) => navigate('product', { productId: id })}
            onWishlistToggle={handleWishlistToggle}
            wishlistedProducts={wishlist}
          />
        );

      case 'product': {
        const product = products.find((p) => p.id === currentPage.productId);
        if (!product) {
          navigate('home');
          return null;
        }

        const relatedProducts = products
          .filter(
            (p) =>
              p.id !== product.id &&
              (p.category === product.category || p.subcategory === product.subcategory)
          )
          .slice(0, 4);

        return (
          <ProductDetailPage
            product={product}
            relatedProducts={relatedProducts}
            onAddToCart={handleAddToCart}
            onNavigate={navigate}
            onWishlistToggle={handleWishlistToggle}
            isWishlisted={wishlist.has(product.id)}
            wishlistedProducts={wishlist}
          />
        );
      }

      case 'checkout':
        return (
          <Checkout
            cart={cart}
            onBack={() => {
              setCartOpen(true);
              navigate('back');
            }}
            onComplete={handleCheckoutComplete}
          />
        );

      default:
        return null;
    }
  };

  const showHeaderFooter = currentPage.type !== 'checkout';

  return (
    <div className="min-h-screen flex flex-col">
      {showHeaderFooter && (
        <Header
          onNavigate={navigate}
          cart={cart}
          wishlistCount={wishlist.size}
          onCartClick={() => setCartOpen(true)}
        />
      )}

      <main className="flex-1">{renderPage()}</main>

      {showHeaderFooter && <Footer />}

      {cartOpen && (
        <Cart
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClose={() => setCartOpen(false)}
          onCheckout={() => {
            setCartOpen(false);
            navigate('checkout');
          }}
        />
      )}
    </div>
  );
}