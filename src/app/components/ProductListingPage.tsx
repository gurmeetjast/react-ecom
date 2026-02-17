import { useState, useMemo } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductListingPageProps {
  products: Product[];
  category?: 'men' | 'women' | 'new' | 'sale';
  onProductClick: (productId: string) => void;
  onWishlistToggle: (productId: string) => void;
  wishlistedProducts: Set<string>;
}

export function ProductListingPage({
  products,
  category,
  onProductClick,
  onWishlistToggle,
  wishlistedProducts,
}: ProductListingPageProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'new' | 'popular' | 'price-low' | 'price-high'>('popular');
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set());
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (category === 'men' || category === 'women') {
      filtered = filtered.filter(p => p.category === category);
    } else if (category === 'new') {
      filtered = filtered.filter(p => p.isNew);
    } else if (category === 'sale') {
      filtered = filtered.filter(p => p.originalPrice);
    }

    // Size filter
    if (selectedSizes.size > 0) {
      filtered = filtered.filter(p => p.sizes.some(s => selectedSizes.has(s)));
    }

    // Color filter
    if (selectedColors.size > 0) {
      filtered = filtered.filter(p => p.colors.some(c => selectedColors.has(c.name)));
    }

    // Price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'new':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    return filtered;
  }, [products, category, selectedSizes, selectedColors, priceRange, sortBy]);

  const allSizes = useMemo(() => {
    const sizes = new Set<string>();
    products.forEach(p => p.sizes.forEach(s => sizes.add(s)));
    return Array.from(sizes);
  }, [products]);

  const allColors = useMemo(() => {
    const colorMap = new Map<string, string>();
    products.forEach(p =>
      p.colors.forEach(c => {
        if (!colorMap.has(c.name)) {
          colorMap.set(c.name, c.hex);
        }
      })
    );
    return Array.from(colorMap.entries()).map(([name, hex]) => ({ name, hex }));
  }, [products]);

  const toggleSize = (size: string) => {
    const newSet = new Set(selectedSizes);
    if (newSet.has(size)) {
      newSet.delete(size);
    } else {
      newSet.add(size);
    }
    setSelectedSizes(newSet);
  };

  const toggleColor = (color: string) => {
    const newSet = new Set(selectedColors);
    if (newSet.has(color)) {
      newSet.delete(color);
    } else {
      newSet.add(color);
    }
    setSelectedColors(newSet);
  };

  const clearFilters = () => {
    setSelectedSizes(new Set());
    setSelectedColors(new Set());
    setPriceRange([0, 500]);
  };

  const hasActiveFilters = selectedSizes.size > 0 || selectedColors.size > 0 || priceRange[0] > 0 || priceRange[1] < 500;

  const categoryTitle = {
    men: "Men's Collection",
    women: "Women's Collection",
    new: 'New Arrivals',
    sale: 'Sale',
  }[category || 'shop'] || 'All Products';

  const FilterSection = () => (
    <div className="space-y-8">
      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-sm text-accent hover:text-primary transition-colors flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Clear all filters
        </button>
      )}

      {/* Size Filter */}
      <div>
        <h3 className="uppercase text-sm tracking-wider mb-4">Size</h3>
        <div className="flex flex-wrap gap-2">
          {allSizes.map(size => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1.5 border rounded text-sm transition-all ${
                selectedSizes.has(size)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:border-primary'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div>
        <h3 className="uppercase text-sm tracking-wider mb-4">Color</h3>
        <div className="flex flex-wrap gap-3">
          {allColors.map(color => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              className={`relative group`}
              title={color.name}
            >
              <div
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColors.has(color.name)
                    ? 'border-primary scale-110'
                    : 'border-border hover:border-primary'
                }`}
                style={{ backgroundColor: color.hex }}
              />
              {selectedColors.has(color.name) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="uppercase text-sm tracking-wider mb-4">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </h3>
        <input
          type="range"
          min="0"
          max="500"
          step="10"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full accent-primary"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl mb-2">{categoryTitle}</h1>
            <p className="text-muted-foreground">{filteredProducts.length} products</p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded hover:bg-secondary transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex-1 md:flex-initial">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full md:w-auto appearance-none px-4 py-2 pr-10 border border-border rounded bg-white cursor-pointer hover:bg-secondary transition-colors"
              >
                <option value="popular">Most Popular</option>
                <option value="new">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSection />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <ProductCard
                      product={product}
                      onProductClick={onProductClick}
                      onWishlistToggle={onWishlistToggle}
                      isWishlisted={wishlistedProducts.has(product.id)}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground mb-4">No products found matching your filters.</p>
                <button
                  onClick={clearFilters}
                  className="text-accent hover:text-primary transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 overflow-y-auto lg:hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl">Filters</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 hover:bg-secondary rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterSection />
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full mt-8 bg-primary text-primary-foreground py-3 uppercase tracking-wider"
                >
                  View {filteredProducts.length} Products
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
