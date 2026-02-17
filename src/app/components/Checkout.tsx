import { useState } from 'react';
import { CartItem } from '../types';
import { ChevronLeft, CreditCard, Lock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { productImages } from '../imageMap';
import { motion } from 'motion/react';

interface CheckoutProps {
  cart: CartItem[];
  onBack: () => void;
  onComplete: () => void;
}

export function Checkout({ cart, onBack, onComplete }: CheckoutProps) {
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'shipping') {
      setStep('payment');
    } else {
      // Simulate payment processing
      alert('Order placed successfully! Thank you for your purchase.');
      onComplete();
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-muted py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-lg p-6 md:p-8">
              {/* Progress Steps */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      step === 'shipping'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent text-accent-foreground'
                    }`}
                  >
                    1
                  </div>
                  <span className={step === 'shipping' ? 'font-medium' : 'text-muted-foreground'}>
                    Shipping
                  </span>
                </div>
                <div className="flex-1 h-px bg-border" />
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      step === 'payment'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    2
                  </div>
                  <span className={step === 'payment' ? 'font-medium' : 'text-muted-foreground'}>
                    Payment
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {step === 'shipping' ? (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-xl mb-4">Contact Information</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm mb-2">Email</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-primary bg-input-background"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl mb-4">Shipping Address</h2>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm mb-2">First Name</label>
                            <input
                              type="text"
                              value={formData.firstName}
                              onChange={(e) => updateField('firstName', e.target.value)}
                              required
                              className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-primary bg-input-background"
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-2">Last Name</label>
                            <input
                              type="text"
                              value={formData.lastName}
                              onChange={(e) => updateField('lastName', e.target.value)}
                              required
                              className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-primary bg-input-background"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm mb-2">Address</label>
                          <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => updateField('address', e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-primary bg-input-background"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm mb-2">City</label>
                            <input
                              type="text"
                              value={formData.city}
                              onChange={(e) => updateField('city', e.target.value)}
                              required
                              className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-primary bg-input-background"
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-2">State</label>
                            <input
                              type="text"
                              value={formData.state}
                              onChange={(e) => updateField('state', e.target.value)}
                              required
                              className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-primary bg-input-background"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm mb-2">ZIP Code</label>
                            <input
                              type="text"
                              value={formData.zipCode}
                              onChange={(e) => updateField('zipCode', e.target.value)}
                              required
                              className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-primary bg-input-background"
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-2">Country</label>
                            <select
                              value={formData.country}
                              onChange={(e) => updateField('country', e.target.value)}
                              className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-primary bg-input-background"
                            >
                              <option>United States</option>
                              <option>Canada</option>
                              <option>United Kingdom</option>
                              <option>Australia</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground py-3 uppercase tracking-wider hover:bg-opacity-90 transition-all"
                    >
                      Continue to Payment
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-xl mb-4">Payment Information</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm mb-2">Card Number</label>
                          <div className="relative">
                            <input
                              type="text"
                              value={formData.cardNumber}
                              onChange={(e) => updateField('cardNumber', e.target.value)}
                              required
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              className="w-full px-4 py-2 pr-12 border border-border rounded focus:outline-none focus:border-primary bg-input-background"
                            />
                            <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm mb-2">Cardholder Name</label>
                          <input
                            type="text"
                            value={formData.cardName}
                            onChange={(e) => updateField('cardName', e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-primary bg-input-background"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm mb-2">Expiry Date</label>
                            <input
                              type="text"
                              value={formData.expiryDate}
                              onChange={(e) => updateField('expiryDate', e.target.value)}
                              required
                              placeholder="MM/YY"
                              maxLength={5}
                              className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-primary bg-input-background"
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-2">CVV</label>
                            <input
                              type="text"
                              value={formData.cvv}
                              onChange={(e) => updateField('cvv', e.target.value)}
                              required
                              placeholder="123"
                              maxLength={3}
                              className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-primary bg-input-background"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="w-4 h-4" />
                      <span>Your payment information is secure and encrypted</span>
                    </div>

                    <div className="space-y-3">
                      <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground py-3 uppercase tracking-wider hover:bg-opacity-90 transition-all"
                      >
                        Place Order ${total.toFixed(2)}
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep('shipping')}
                        className="w-full border border-border py-3 uppercase tracking-wider text-sm hover:bg-secondary transition-all"
                      >
                        Back to Shipping
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-lg p-6 md:p-8 sticky top-24">
              <h2 className="text-xl mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="flex gap-4"
                  >
                    <div className="w-16 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={productImages[item.product.images[0]]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium line-clamp-1">{item.product.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {item.selectedColor} / {item.selectedSize}
                      </p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium mt-1">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-6 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-medium pt-3 border-t border-border">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
