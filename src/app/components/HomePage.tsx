import { Hero } from './Hero';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { motion } from 'motion/react';
import { Star, Truck, RefreshCw, Shield, Mail } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { productImages } from '../imageMap';
import { testimonials } from '../data';
import { useState } from 'react';

interface HomePageProps {
  onNavigate: (page: string, params?: any) => void;
  products: Product[];
  onWishlistToggle: (productId: string) => void;
  wishlistedProducts: Set<string>;
}

export function HomePage({ onNavigate, products, onWishlistToggle, wishlistedProducts }: HomePageProps) {
  const bestsellers = products.filter(p => p.isBestseller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <div>
      {/* Hero */}
      <Hero onNavigate={onNavigate} />

      {/* Features */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary mb-3">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-sm uppercase tracking-wider mb-1">Free Shipping</h3>
              <p className="text-xs text-muted-foreground">On orders over $100</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary mb-3">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-sm uppercase tracking-wider mb-1">Easy Returns</h3>
              <p className="text-xs text-muted-foreground">30-day return policy</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary mb-3">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-sm uppercase tracking-wider mb-1">Secure Payment</h3>
              <p className="text-xs text-muted-foreground">SSL encrypted checkout</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary mb-3">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-sm uppercase tracking-wider mb-1">Premium Quality</h3>
              <p className="text-xs text-muted-foreground">Carefully curated pieces</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl mb-4">Shop by Collection</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully curated collections designed for modern living
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={() => onNavigate('women')}
              className="relative h-[500px] overflow-hidden rounded cursor-pointer group"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1580698864216-8008843ce6b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                alt="Women's Collection"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="font-['Playfair_Display'] text-4xl mb-2">Women</h3>
                  <p className="mb-4">Sophisticated elegance for every occasion</p>
                  <button className="border-2 border-white px-6 py-2 uppercase tracking-wider text-sm hover:bg-white hover:text-primary transition-all">
                    Explore Collection
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onClick={() => onNavigate('men')}
              className="relative h-[500px] overflow-hidden rounded cursor-pointer group"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1630780565118-511258d74d08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                alt="Men's Collection"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="font-['Playfair_Display'] text-4xl mb-2">Men</h3>
                  <p className="mb-4">Classic designs with modern refinement</p>
                  <button className="border-2 border-white px-6 py-2 uppercase tracking-wider text-sm hover:bg-white hover:text-primary transition-all">
                    Explore Collection
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl mb-4">Bestsellers</h2>
            <p className="text-muted-foreground">
              Our most loved pieces, chosen by you
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bestsellers.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  onProductClick={(id) => onNavigate('product', { productId: id })}
                  onWishlistToggle={onWishlistToggle}
                  isWishlisted={wishlistedProducts.has(product.id)}
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('shop')}
              className="bg-primary text-primary-foreground px-8 py-3 uppercase tracking-wider hover:bg-opacity-90 transition-all"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl mb-6">Designed for Everyday Confidence</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                At Atelier, we believe that great style begins with quality. Each piece in our collection
                is thoughtfully designed and crafted from premium materials to create timeless garments
                that elevate your everyday wardrobe.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                From the softest organic cotton to luxurious cashmere, we source responsibly and work
                with skilled artisans to ensure every detail is perfect.
              </p>
              <button
                onClick={() => onNavigate('about')}
                className="border-2 border-primary px-6 py-3 uppercase tracking-wider text-sm hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Our Story
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[600px] rounded overflow-hidden"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1769981653696-5ce5a59263bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                alt="Brand Story"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl mb-4">New Arrivals</h2>
              <p className="text-muted-foreground">
                Fresh styles for the season
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {newArrivals.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard
                    product={product}
                    onProductClick={(id) => onNavigate('product', { productId: id })}
                    onWishlistToggle={onWishlistToggle}
                    isWishlisted={wishlistedProducts.has(product.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground">
              Join thousands of satisfied customers worldwide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-8 rounded"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent stroke-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <ImageWithFallback
                      src={productImages[testimonial.image]}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <Mail className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl mb-4 font-['Playfair_Display']">
              Join Our Community
            </h2>
            <p className="mb-8 opacity-90">
              Subscribe to receive exclusive offers, styling tips, and early access to new collections
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded text-white placeholder:text-white/60 focus:outline-none focus:border-white/40"
              />
              <button
                type="submit"
                className="bg-white text-primary px-8 py-3 uppercase tracking-wider hover:bg-opacity-90 transition-all rounded"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs mt-4 opacity-70">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
