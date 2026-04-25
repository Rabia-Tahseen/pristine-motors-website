import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { useCart, formatPrice } from "@/contexts/CartContext";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, formattedSubtotal, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <main className="pt-24 pb-20 bg-background min-h-screen">
        <div className="section-container text-center py-20">
          <ShoppingCart size={64} className="mx-auto text-muted-foreground mb-6" />
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Your Cart is Empty</h1>
          <p className="text-muted-foreground font-body mb-6">Browse our collection and add items to your cart.</p>
          <Link to="/parts" className="btn-primary">Browse Parts</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      <div className="section-container">
        <Link
          to="/parts"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 font-body text-sm"
        >
          <ArrowLeft size={16} /> Continue Shopping
        </Link>

        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
          Shopping Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 p-4 rounded-xl border border-border bg-card"
              >
                <Link to={`/parts/${item.product.id}`} className="flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/parts/${item.product.id}`}>
                    <h3 className="font-display font-semibold text-foreground text-sm leading-tight hover:text-primary transition-colors">
                      {item.product.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-muted-foreground font-body mt-0.5">{item.product.vehicle}</p>
                  <p className="font-body font-bold text-primary mt-1">{formatPrice(item.product.price)}</p>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">
                    Quantity: 1
                    </span>

                    <div className="flex items-center gap-4">
                      <span className="font-body font-bold text-foreground text-sm">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-muted-foreground hover:text-destructive transition p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-xl border border-border bg-card p-6 sticky top-24">
              <h2 className="font-display font-bold text-foreground text-lg mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold text-foreground">{formattedSubtotal}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-muted-foreground">Free Delivery</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-body">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-bold text-primary text-lg">{formattedSubtotal}</span>
                </div>
              </div>
              <Link to="/checkout" className="btn-primary w-full text-center">
                Proceed to Checkout
              </Link>
              <Link to="/parts" className="btn-secondary w-full text-center mt-3">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
