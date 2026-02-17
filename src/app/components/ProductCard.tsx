import { Heart, Star } from 'lucide-react';
import { Product } from '../types';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { productImages } from '../imageMap';

interface ProductCardProps {
  product: Product;
  onProductClick: (productId: string) => void;
  onWishlistToggle?: (productId: string) => void;
  isWishlisted?: boolean;
}

export function ProductCard({ product, onProductClick, onWishlistToggle, isWishlisted }: ProductCardProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group cursor-pointer">
      <div
        className="relative aspect-[3/4] mb-3 overflow-hidden bg-muted rounded"
        onMouseEnter={() => product.images.length > 1 && setImageIndex(1)}
        onMouseLeave={() => setImageIndex(0)}
        onClick={() => onProductClick(product.id)}
      >
        <ImageWithFallback
          src={productImages[product.images[imageIndex]] || productImages[product.images[0]]}
          alt={product.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 uppercase tracking-wider">
              New
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 uppercase tracking-wider">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist button */}
        {onWishlistToggle && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onWishlistToggle(product.id);
            }}
            className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-all opacity-0 group-hover:opacity-100"
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? 'fill-destructive stroke-destructive' : 'stroke-foreground'}`}
            />
          </button>
        )}

        {/* Quick add button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onProductClick(product.id);
          }}
          className="absolute bottom-3 left-3 right-3 bg-primary text-primary-foreground py-2 px-4 text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"
        >
          Quick View
        </button>
      </div>

      {/* Product info */}
      <div onClick={() => onProductClick(product.id)}>
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm line-clamp-2">{product.name}</h3>
          {product.isBestseller && (
            <span className="text-xs text-accent uppercase tracking-wider whitespace-nowrap">
              Bestseller
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 h-3 fill-accent stroke-accent" />
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Color swatches */}
        <div className="flex gap-1.5 mt-2">
          {product.colors.slice(0, 4).map((color) => (
            <div
              key={color.name}
              className="w-4 h-4 rounded-full border border-border"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          {product.colors.length > 4 && (
            <div className="w-4 h-4 rounded-full border border-border flex items-center justify-center text-[8px]">
              +{product.colors.length - 4}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}