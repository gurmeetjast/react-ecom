import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-['Playfair_Display'] text-2xl mb-4">ATELIER</h3>
            <p className="text-sm opacity-80 mb-4">
              Timeless fashion designed for everyday confidence.
            </p>
            <div className="flex gap-4">
              <button className="hover:opacity-70 transition-opacity">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="hover:opacity-70 transition-opacity">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="hover:opacity-70 transition-opacity">
                <Twitter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="uppercase text-sm tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <button className="hover:opacity-100 transition-opacity">Women</button>
              </li>
              <li>
                <button className="hover:opacity-100 transition-opacity">Men</button>
              </li>
              <li>
                <button className="hover:opacity-100 transition-opacity">New Arrivals</button>
              </li>
              <li>
                <button className="hover:opacity-100 transition-opacity">Sale</button>
              </li>
              <li>
                <button className="hover:opacity-100 transition-opacity">Gift Cards</button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="uppercase text-sm tracking-wider mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <button className="hover:opacity-100 transition-opacity">Contact Us</button>
              </li>
              <li>
                <button className="hover:opacity-100 transition-opacity">Shipping Info</button>
              </li>
              <li>
                <button className="hover:opacity-100 transition-opacity">Returns & Exchanges</button>
              </li>
              <li>
                <button className="hover:opacity-100 transition-opacity">Size Guide</button>
              </li>
              <li>
                <button className="hover:opacity-100 transition-opacity">FAQs</button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="uppercase text-sm tracking-wider mb-4">Stay Connected</h4>
            <p className="text-sm opacity-80 mb-4">
              Subscribe to receive updates, exclusive offers, and styling tips.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-sm focus:outline-none focus:border-white/40"
              />
              <button className="p-2 bg-white/20 hover:bg-white/30 rounded transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80">
          <p>© 2026 Atelier. All rights reserved.</p>
          <div className="flex gap-6">
            <button className="hover:opacity-100 transition-opacity">Privacy Policy</button>
            <button className="hover:opacity-100 transition-opacity">Terms of Service</button>
            <button className="hover:opacity-100 transition-opacity">Accessibility</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
