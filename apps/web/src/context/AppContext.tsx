"use client";

import * as React from "react";
import { Product } from "@/mocks/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  shippingDetails: {
    name: string;
    phone: string;
    address: string;
    pincode: string;
  };
  shiprocketStatus: "Manifested" | "Picked Up" | "In Transit" | "Out for Delivery" | "Delivered";
  shiprocketHistory: { time: string; status: string; location: string; description: string }[];
  date: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  pincode?: string;
  dob?: string;
  ringSize?: string;
  preferredMetal?: string;
}

interface AppContextType {
  user: UserProfile | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => { success: boolean; message: string };
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => { success: boolean; message: string; isWishlisted: boolean };
  orders: Order[];
  placeOrder: (shippingDetails: Order["shippingDetails"]) => Order;
  advanceShiprocketStatus: (orderId: string) => void;
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserProfile | null>(null);
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [wishlist, setWishlist] = React.useState<string[]>([]);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [mounted, setMounted] = React.useState(false);

  const updateProfile = (profile: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return null;
      return { ...prev, ...profile };
    });
  };

  // Persistence logic on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem("nakshatra_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("nakshatra_user");
      }
    }

    const savedCart = localStorage.getItem("nakshatra_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {}
    }

    const savedWishlist = localStorage.getItem("nakshatra_wishlist");
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {}
    }

    const savedOrders = localStorage.getItem("nakshatra_orders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {}
    }

    setMounted(true);
  }, []);

  // Save updates to localStorage
  React.useEffect(() => {
    if (mounted) {
      if (user) {
        localStorage.setItem("nakshatra_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("nakshatra_user");
      }
    }
  }, [user, mounted]);

  React.useEffect(() => {
    if (mounted) {
      localStorage.setItem("nakshatra_cart", JSON.stringify(cart));
    }
  }, [cart, mounted]);

  React.useEffect(() => {
    if (mounted) {
      localStorage.setItem("nakshatra_wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, mounted]);

  React.useEffect(() => {
    if (mounted) {
      localStorage.setItem("nakshatra_orders", JSON.stringify(orders));
    }
  }, [orders, mounted]);

  const login = (name: string, email: string) => {
    setUser({ name, email });
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setWishlist([]);
  };

  const addToCart = (product: Product, quantity = 1) => {
    if (!user) {
      return { success: false, message: "Only registered clients can purchase. Please sign in or register." };
    }

    let success = false;
    let message = "";

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        success = true;
        message = `Updated ${product.name} quantity in your Jewellery Box.`;
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      success = true;
      message = `Added ${product.name} to your Jewellery Box.`;
      return [...prev, { product, quantity }];
    });

    return { success, message };
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    if (!user) {
      return { success: false, message: "Please sign in or register to add items to your wishlist.", isWishlisted: false };
    }

    let isWishlisted = false;
    let message = "";

    setWishlist((prev) => {
      if (prev.includes(productId)) {
        isWishlisted = false;
        message = "Removed from your Wishlist.";
        return prev.filter((id) => id !== productId);
      }
      isWishlisted = true;
      message = "Added to your Wishlist.";
      return [...prev, productId];
    });

    return { success: true, message, isWishlisted };
  };

  const placeOrder = (shippingDetails: Order["shippingDetails"]) => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.03); // 3% GST on jewellery
    const total = subtotal + tax;

    const newOrder: Order = {
      id: `NS-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...cart],
      subtotal,
      tax,
      total,
      shippingDetails,
      shiprocketStatus: "Manifested",
      shiprocketHistory: [
        {
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          status: "Order Manifested",
          location: "Nakshatra Atelier, Mumbai",
          description: "Shipping details registered with Shiprocket. Awaiting courier pickup."
        }
      ],
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const advanceShiprocketStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        let nextStatus: Order["shiprocketStatus"] = order.shiprocketStatus;
        let desc = "";
        let loc = "Shiprocket Hub, Mumbai";

        if (order.shiprocketStatus === "Manifested") {
          nextStatus = "Picked Up";
          loc = "Shiprocket Hub, Mumbai";
          desc = "Package picked up by Fedex delivery executive. Dispatched to regional sorting center.";
        } else if (order.shiprocketStatus === "Picked Up") {
          nextStatus = "In Transit";
          loc = "Transit Hub, Delhi";
          desc = "Package in transit. Safely loaded in fully-insured transport containers.";
        } else if (order.shiprocketStatus === "In Transit") {
          nextStatus = "Out for Delivery";
          loc = "Local Delivery Office";
          desc = "Package out for delivery with high-security courier agent. Expected delivery today.";
        } else if (order.shiprocketStatus === "Out for Delivery") {
          nextStatus = "Delivered";
          loc = "Client Destination Address";
          desc = "Creations delivered successfully and signed under biometric security verification.";
        } else {
          return order; // Already delivered
        }

        const newHistory = [
          ...order.shiprocketHistory,
          {
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            status: `Order ${nextStatus}`,
            location: loc,
            description: desc
          }
        ];

        return {
          ...order,
          shiprocketStatus: nextStatus,
          shiprocketHistory: newHistory
        };
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        updateProfile,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        orders,
        placeOrder,
        advanceShiprocketStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
