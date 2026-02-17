import { useState } from 'react';
import { Product, CartItem } from '../types';
import { Star, Heart, Truck, RefreshCw, Shield, ChevronLeft, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { productImages } from '../imageMap';
import { reviews } from '../data';
import { ProductCard } from './ProductCard';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailPageProps {
  product: Product;
  relatedProducts: Product[];
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
  onNavigate: (page: string, params?: any) => void;
  onWishlistToggle: (productId: string) => void;
  isWishlisted: boolean;
  wishlistedProducts: Set<string>;
}

export function ProductDetailPage({
  product,
  relatedProducts,
  onAddToCart,
  onNavigate,
  onWishlistToggle,
  isWishlisted,
  wishlistedProducts,
}: ProductDetailPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  const productReviews = reviews[product.id] || [];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    onAddToCart({
      product,
      selectedColor,
      selectedSize,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <button
          onClick={() => onNavigate('back')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to shopping
        </button>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <div>
            {/* Main Image */}
            <div className="aspect-[3/4] mb-4 overflow-hidden rounded bg-muted">
              <ImageWithFallback
                src={productImages[product.images[selectedImageIndex]]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-[3/4] overflow-hidden rounded border-2 transition-all ${
                    selectedImageIndex === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <ImageWithFallback
                    src={productImages[image]}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                {product.isBestseller && (
                  <span className="inline-block bg-accent text-accent-foreground text-xs px-2 py-1 uppercase tracking-wider mb-2">
                    Bestseller
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl mb-2">{product.name}</h1>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-accent stroke-accent'
                            : 'stroke-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <button
                onClick={() => onWishlistToggle(product.id)}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isWishlisted ? 'fill-destructive stroke-destructive' : 'stroke-foreground'
                  }`}
                />
              </button>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
              <span className="text-3xl">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="bg-destructive text-destructive-foreground text-sm px-2 py-1">
                    Save ${product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm uppercase tracking-wider">
                  Color: <span className="text-muted-foreground">{selectedColor}</span>
                </label>
              </div>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? 'border-primary scale-110'
                        : 'border-border hover:border-primary'
                    }`}
                    title={color.name}
                  >
                    <div
                      className="w-full h-full rounded-full"
                      style={{ backgroundColor: color.hex }}
                    />
                    {selectedColor === color.name && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check className="w-5 h-5 stroke-white drop-shadow-md" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm uppercase tracking-wider">Select Size</label>
                <button className="text-sm text-accent hover:text-primary transition-colors underline">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border rounded text-sm transition-all ${
                      selectedSize === size
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-primary-foreground py-4 uppercase tracking-wider hover:bg-opacity-90 transition-all relative overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {addedToCart ? (
                    <motion.span
                      key="added"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Added to Cart
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                    >
                      Add to Cart
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-muted-foreground" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RefreshCw className="w-5 h-5 text-muted-foreground" />
                <span>Easy returns within 30 days</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <span>Secure checkout with SSL encryption</span>
              </div>
            </div>

            {/* Tabs */}
            <div>
              <div className="flex gap-6 border-b border-border mb-6">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-3 text-sm uppercase tracking-wider transition-colors relative ${
                    activeTab === 'description' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  Description
                  {activeTab === 'description' && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-3 text-sm uppercase tracking-wider transition-colors relative ${
                    activeTab === 'reviews' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  Reviews ({productReviews.length})
                  {activeTab === 'reviews' && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'description' ? (
                  <motion.div
                    key="description"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Fabric:</span> {product.fabric}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Care:</span> Machine wash cold, tumble dry low
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Fit:</span> True to size
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {productReviews.length > 0 ? (
                      productReviews.map((review) => (
                        <div key={review.id} className="pb-6 border-b border-border last:border-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium">{review.author}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < review.rating
                                          ? 'fill-accent stroke-accent'
                                          : 'stroke-muted-foreground'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-3xl mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onProductClick={(id) => onNavigate('product', { productId: id })}
                  onWishlistToggle={onWishlistToggle}
                  isWishlisted={wishlistedProducts.has(relatedProduct.id)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
