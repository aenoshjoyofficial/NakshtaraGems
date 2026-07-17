"use client";

import * as React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Snackbar,
  Alert
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Edit as EditIcon,
  CalendarMonth as CalendarIcon,
  Add as AddIcon,
  Diamond as GemIcon,
  Book as BookIcon,
  Category as CategoryIcon,
  ViewHeadline as HeaderIcon,
  ArrowBack as ArrowBackIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Videocam as VideocamIcon,
  Image as ImageIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Home as HomeIcon,
  ContactMail as ContactIcon,
  ShoppingBag as ShoppingBagIcon,
  People as PeopleIcon,
  LocalShipping as CourierIcon,
  RssFeed as JournalIcon,
  Settings as SettingsIcon
} from "@mui/icons-material";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [activeView, setActiveView] = React.useState<"overview" | "announcements" | "inventory" | "about" | "collections" | "bookings" | "header" | "addProduct" | "editProduct" | "homepage" | "contact" | "orders" | "users" | "courier" | "blog" | "officialSettings">("overview");
  const [editingProductId, setEditingProductId] = React.useState<string | null>(null);
  const [orders, setOrders] = React.useState<any[]>([]);
  const [users, setUsers] = React.useState<any[]>([]);

  // Official Settings States
  const [gstRate, setGstRate] = React.useState(3);
  const [facebookUrl, setFacebookUrl] = React.useState("");
  const [instagramUrl, setInstagramUrl] = React.useState("");
  const [pinterestUrl, setPinterestUrl] = React.useState("");
  const [shippingContent, setShippingContent] = React.useState("");
  const [returnsContent, setReturnsContent] = React.useState("");
  const [faqItems, setFaqItems] = React.useState<{ q: string; a: string }[]>([]);
  const [privacyContent, setPrivacyContent] = React.useState("");
  const [termsContent, setTermsContent] = React.useState("");
  
  // Blog states
  const [blog, setBlog] = React.useState<any[]>([]);
  const [openBlogDialog, setOpenBlogDialog] = React.useState(false);
  const [editingBlogPost, setEditingBlogPost] = React.useState<any>(null);
  const [blogForm, setBlogForm] = React.useState({
    title: "",
    excerpt: "",
    category: "Education",
    date: ""
  });

  // Courier management states
  const [openCourierDialog, setOpenCourierDialog] = React.useState(false);
  const [selectedOrderForCourier, setSelectedOrderForCourier] = React.useState<any>(null);
  const [courierCarrier, setCourierCarrier] = React.useState("FedEx Armored");
  const [courierAWB, setCourierAWB] = React.useState("");

  const [openCheckpointDialog, setOpenCheckpointDialog] = React.useState(false);
  const [checkpointLocation, setCheckpointLocation] = React.useState("");
  const [checkpointDesc, setCheckpointDesc] = React.useState("");

  const [openDeliveryAgentDialog, setOpenDeliveryAgentDialog] = React.useState(false);
  const [agentName, setAgentName] = React.useState("");
  const [agentPhone, setAgentPhone] = React.useState("");

  const [openHandoverDialog, setOpenHandoverDialog] = React.useState(false);
  const [receivedBy, setReceivedBy] = React.useState("");
  const [signatureCode, setSignatureCode] = React.useState("");

  // Full db.json State
  const [db, setDb] = React.useState<any>(null);

  // Form fields
  const [announcementText, setAnnouncementText] = React.useState("");
  const [heroBadge, setHeroBadge] = React.useState("");
  const [heroTitle, setHeroTitle] = React.useState("");
  const [heroSubtitle, setHeroSubtitle] = React.useState("");
  const [heroDescription, setHeroDescription] = React.useState("");
  const [heroBgImage, setHeroBgImage] = React.useState("");
  const [uploading, setUploading] = React.useState(false);

  const [brandName, setBrandName] = React.useState("");
  const [logoUrl, setLogoUrl] = React.useState("");
  const [uploadingLogo, setUploadingLogo] = React.useState(false);
  const [navLinks, setNavLinks] = React.useState<any[]>([]);
  const [openNavDialog, setOpenNavDialog] = React.useState(false);
  const [editingNavIndex, setEditingNavIndex] = React.useState<number | null>(null);

  const [navLabel, setNavLabel] = React.useState("");
  const [navHref, setNavHref] = React.useState("");
  const [navHasDropdown, setNavHasDropdown] = React.useState(false);
  const [navDropdownColumns, setNavDropdownColumns] = React.useState<any[]>([]);
  const [featuredCardTag, setFeaturedCardTag] = React.useState("");
  const [featuredCardTitle, setFeaturedCardTitle] = React.useState("");
  const [featuredCardDesc, setFeaturedCardDesc] = React.useState("");
  const [featuredCardLink, setFeaturedCardLink] = React.useState("");

  const [aboutTitle, setAboutTitle] = React.useState("");
  const [aboutDescription, setAboutDescription] = React.useState("");
  const [aboutOrigins, setAboutOrigins] = React.useState("");
  const [aboutQuote, setAboutQuote] = React.useState("");

  // Homepage Sections States
  const [homepageFeatures, setHomepageFeatures] = React.useState<any[]>([]);
  const [homepageGems, setHomepageGems] = React.useState<any[]>([]);
  const [uploadingGemIndex, setUploadingGemIndex] = React.useState<number | null>(null);
  const [homepageCollections, setHomepageCollections] = React.useState<any[]>([]);
  const [uploadingCollIndex, setUploadingCollIndex] = React.useState<number | null>(null);
  const [evaluatorTitle, setEvaluatorTitle] = React.useState("");
  const [evaluatorDesc, setEvaluatorDesc] = React.useState("");
  const [evaluatorBasePrice, setEvaluatorBasePrice] = React.useState(5000);
  const [homepageMilestones, setHomepageMilestones] = React.useState<any[]>([]);
  const [editorialQuoteText, setEditorialQuoteText] = React.useState("");
  const [editorialQuoteAuthor, setEditorialQuoteAuthor] = React.useState("");
  const [editorialQuoteTitle, setEditorialQuoteTitle] = React.useState("");

  // Contact Settings States
  const [contactBadge, setContactBadge] = React.useState("");
  const [contactTitle, setContactTitle] = React.useState("");
  const [contactDescription, setContactDescription] = React.useState("");
  const [contactChannelsTitle, setContactChannelsTitle] = React.useState("");
  const [contactChannelsDescription, setContactChannelsDescription] = React.useState("");
  const [contactPhone, setContactPhone] = React.useState("");
  const [contactEmail, setContactEmail] = React.useState("");
  const [contactAddress, setContactAddress] = React.useState("");
  const [contactAppointmentNote, setContactAppointmentNote] = React.useState("");

  // About Promises States
  const [promisesTitle, setPromisesTitle] = React.useState("");
  const [promisesSubtitle, setPromisesSubtitle] = React.useState("");
  const [aboutPromises, setAboutPromises] = React.useState<any[]>([]);

  const [collections, setCollections] = React.useState<any[]>([]);
  const [products, setProducts] = React.useState<any[]>([]);
  const [bookings, setBookings] = React.useState<any[]>([]);

  // Product form fields
  const [newProduct, setNewProduct] = React.useState({
    name: "",
    category: "diamond",
    price: "",
    metal: "Platinum",
    collection: "Solitaire",
    shape: "Round",
    carat: "1.0",
    cut: "Ideal",
    color: "D",
    clarity: "IF",
    certificate: "GIA",
    image: "round-diamond",
    rating: "5.0",
    gemType: "Sapphire",
    origin: "Ceylon",
    treatment: "Natural / Unheated",
    stockCount: "10"
  });

  // Product Media Upload States
  const [productImages, setProductImages] = React.useState<(string | null)[]>([null, null, null, null]);
  const [productVideo, setProductVideo] = React.useState<string | null>(null);
  const [uploadingMedia, setUploadingMedia] = React.useState<number | null>(null); // index 0-3 for images, 4 for video

  // Modal Dialog Form States for Collection
  const [openCollectionDialog, setOpenCollectionDialog] = React.useState(false);
  const [editingCollectionIndex, setEditingCollectionIndex] = React.useState<number | null>(null);
  const [collectionForm, setCollectionForm] = React.useState({
    name: "",
    desc: "",
    badge: "",
    link: "/shop?category=all",
    bgClass: "bg-luxury-ivory/40"
  });

  // Snackbar Notification State
  const [toast, setToast] = React.useState({ open: false, message: "", severity: "success" as "success" | "info" | "warning" | "error" });

  const triggerToast = (message: string, severity: "success" | "info" | "warning" | "error" = "success") => {
    setToast({ open: true, message, severity });
  };

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (mounted && status === "unauthenticated") {
      router.push("/login");
    }
  }, [mounted, status, router]);

  // Fetch db.json on load
  React.useEffect(() => {
    if (mounted && status === "authenticated") {
      fetch("/api/db")
        .then((res) => res.json())
        .then((data) => {
          setDb(data);
          setAnnouncementText((data.announcements || []).join("\n"));
          setBrandName(data.header?.brandName || "Nakshatra Gems & Fine Jewellery");
          setLogoUrl(data.header?.logo || "/logo.png");
          setNavLinks(data.header?.navLinks || []);
          setHeroBadge(data.hero?.badge || "");
          setHeroTitle(data.hero?.title || "");
          setHeroSubtitle(data.hero?.subtitle || "");
          setHeroDescription(data.hero?.description || "");
          setHeroBgImage(data.hero?.bgImage || "");
          setAboutTitle(data.about?.title || "");
          setAboutDescription(data.about?.description || "");
          setAboutOrigins(data.about?.origins || "");
          setAboutQuote(data.about?.quote || "");
          setPromisesTitle(data.about?.promisesTitle || "Our Three Promises");
          setPromisesSubtitle(data.about?.promisesSubtitle || "Ethical Standards");
          setAboutPromises(data.about?.promises || []);
          setCollections(data.collections || []);
          setProducts(data.products || []);
          setBookings(data.bookings || []);
          setOrders(data.orders || []);
          setUsers(data.users || []);
          setBlog(data.blog || []);

          // Set official settings
          const official = data.officialSettings || {};
          setGstRate(official.gstRate || 3);
          setFacebookUrl(official.facebook || "");
          setInstagramUrl(official.instagram || "");
          setPinterestUrl(official.pinterest || "");
          setShippingContent(official.shippingContent || "");
          setReturnsContent(official.returnsContent || "");
          setFaqItems((() => {
            try {
              const parsed = JSON.parse(official.faqContent || "[]");
              return Array.isArray(parsed) ? parsed : [];
            } catch { return []; }
          })());
          setPrivacyContent(official.privacyContent || "");
          setTermsContent(official.termsContent || "");

          // Set homepage settings
          setHomepageFeatures(data.features || []);
          setHomepageGems(data.featuredGems || []);
          setHomepageCollections(data.homepageCollections || []);
          setEvaluatorTitle(data.evaluator?.title || "Interactive GIA Diamond Evaluator");
          setEvaluatorDesc(data.evaluator?.desc || "");
          setEvaluatorBasePrice(data.evaluator?.basePrice || 5000);
          setHomepageMilestones(data.milestones || []);
          setEditorialQuoteText(data.editorialQuote?.text || "");
          setEditorialQuoteAuthor(data.editorialQuote?.author || "");
          setEditorialQuoteTitle(data.editorialQuote?.title || "");

          // Set contact settings
          const contact = data.contactSettings || {};
          setContactBadge(contact.badge || "Private Concierge");
          setContactTitle(contact.title || "Book a Consultation");
          setContactDescription(contact.description || "");
          setContactChannelsTitle(contact.channelsTitle || "Direct Channels");
          setContactChannelsDescription(contact.channelsDescription || "");
          setContactPhone(contact.phone || "");
          setContactEmail(contact.email || "");
          setContactAddress(contact.address || "");
          setContactAppointmentNote(contact.appointmentNote || "");
        })
        .catch(() => triggerToast("Failed to load storefront data.", "error"));
    }
  }, [mounted, status]);

  // General Save database handler
  const saveDatabase = async (updatedData: any) => {
    try {
      const response = await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      });
      if (response.ok) {
        setDb(updatedData);
        triggerToast("Changes successfully saved & synced with Storefront!", "success");
      } else {
        triggerToast("Failed to save changes.", "error");
      }
    } catch {
      triggerToast("Error saving database.", "error");
    }
  };

  // Orders helper functions
  const advanceOrderStatus = (orderId: string) => {
    const nextStatusMap: Record<string, string> = {
      "Manifested": "Picked Up",
      "Picked Up": "In Transit",
      "In Transit": "Out for Delivery",
      "Out for Delivery": "Delivered"
    };
    const locationMap: Record<string, string> = {
      "Picked Up": "Shiprocket Hub, Mumbai",
      "In Transit": "Transit Hub, Delhi",
      "Out for Delivery": "Local Delivery Office",
      "Delivered": "Client Destination Address"
    };
    const descMap: Record<string, string> = {
      "Picked Up": "Package picked up by Fedex delivery executive. Dispatched to regional sorting center.",
      "In Transit": "Package in transit. Safely loaded in fully-insured transport containers.",
      "Out for Delivery": "Package out for delivery with high-security courier agent. Expected delivery today.",
      "Delivered": "Creations delivered successfully and signed under biometric security verification."
    };

    const updatedOrders = orders.map((order) => {
      if (order.id !== orderId) return order;

      const currentStatus = order.shiprocketStatus;
      const nextStatus = nextStatusMap[currentStatus];
      if (!nextStatus) return order;

      const newHistoryItem = {
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: `Order ${nextStatus}`,
        location: locationMap[nextStatus] || "Transit Hub",
        description: descMap[nextStatus] || ""
      };

      return {
        ...order,
        shiprocketStatus: nextStatus,
        shiprocketHistory: [...(order.shiprocketHistory || []), newHistoryItem]
      };
    });

    setOrders(updatedOrders);
    saveDatabase({
      ...db,
      orders: updatedOrders
    });
  };

  const deleteOrder = (orderId: string) => {
    if (confirm("Are you sure you want to cancel and delete this order?")) {
      const updatedOrders = orders.filter((o) => o.id !== orderId);
      setOrders(updatedOrders);
      saveDatabase({
        ...db,
        orders: updatedOrders
      });
    }
  };

  const deleteUser = (email: string) => {
    if (confirm(`Are you sure you want to remove the registered client with email: ${email}?`)) {
      const updatedUsers = users.filter((u) => u.email !== email);
      setUsers(updatedUsers);
      saveDatabase({
        ...db,
        users: updatedUsers
      });
    }
  };

  // Courier Actions
  const handleAssignCourier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForCourier) return;

    const updatedOrders = orders.map((o) => {
      if (o.id !== selectedOrderForCourier.id) return o;

      const newHistoryItem = {
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "Order Manifested",
        location: "Nakshatra Atelier, Mumbai",
        description: `Shipping details registered with ${courierCarrier}. AWB tracking number is ${courierAWB}.`
      };

      return {
        ...o,
        shiprocketStatus: "Manifested",
        shiprocketHistory: [newHistoryItem],
        courierDetails: {
          carrier: courierCarrier,
          awbNumber: courierAWB
        }
      };
    });

    setOrders(updatedOrders);
    saveDatabase({
      ...db,
      orders: updatedOrders
    });
    setOpenCourierDialog(false);
    setSelectedOrderForCourier(null);
  };

  const handleAddTransitCheckpoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForCourier) return;

    const updatedOrders = orders.map((o) => {
      if (o.id !== selectedOrderForCourier.id) return o;

      const newHistoryItem = {
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "Order In Transit",
        location: checkpointLocation,
        description: checkpointDesc
      };

      return {
        ...o,
        shiprocketStatus: "In Transit",
        shiprocketHistory: [...(o.shiprocketHistory || []), newHistoryItem]
      };
    });

    setOrders(updatedOrders);
    saveDatabase({
      ...db,
      orders: updatedOrders
    });
    setOpenCheckpointDialog(false);
    setSelectedOrderForCourier(null);
    setCheckpointLocation("");
    setCheckpointDesc("");
  };

  const handleMarkOutForDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForCourier) return;

    const updatedOrders = orders.map((o) => {
      if (o.id !== selectedOrderForCourier.id) return o;

      const newHistoryItem = {
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "Order Out for Delivery",
        location: "Local Delivery Office",
        description: `Package out for delivery with high-security courier agent ${agentName} (Tel: ${agentPhone}). Expected delivery today.`
      };

      return {
        ...o,
        shiprocketStatus: "Out for Delivery",
        shiprocketHistory: [...(o.shiprocketHistory || []), newHistoryItem],
        courierDetails: {
          ...(o.courierDetails || {}),
          deliveryAgent: agentName,
          agentPhone: agentPhone
        }
      };
    });

    setOrders(updatedOrders);
    saveDatabase({
      ...db,
      orders: updatedOrders
    });
    setOpenDeliveryAgentDialog(false);
    setSelectedOrderForCourier(null);
    setAgentName("");
    setAgentPhone("");
  };

  const handleMarkDelivered = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForCourier) return;

    const updatedOrders = orders.map((o) => {
      if (o.id !== selectedOrderForCourier.id) return o;

      const newHistoryItem = {
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "Order Delivered",
        location: "Client Destination Address",
        description: `Creations delivered successfully and signed by ${receivedBy} under biometric security verification code ${signatureCode}.`
      };

      return {
        ...o,
        shiprocketStatus: "Delivered",
        shiprocketHistory: [...(o.shiprocketHistory || []), newHistoryItem],
        courierDetails: {
          ...(o.courierDetails || {}),
          receivedBy: receivedBy,
          signatureCode: signatureCode
        }
      };
    });

    setOrders(updatedOrders);
    saveDatabase({
      ...db,
      orders: updatedOrders
    });
    setOpenHandoverDialog(false);
    setSelectedOrderForCourier(null);
    setReceivedBy("");
    setSignatureCode("");
  };

  // Blog Management Helpers
  const handleSaveBlogPost = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedBlog = [...blog];

    if (editingBlogPost) {
      updatedBlog = blog.map((post) =>
        post.id === editingBlogPost.id ? { ...post, ...blogForm } : post
      );
      triggerToast("Blog post updated successfully!", "success");
    } else {
      const newPost = {
        id: Date.now().toString(),
        title: blogForm.title,
        excerpt: blogForm.excerpt,
        category: blogForm.category,
        date: blogForm.date || new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric"
        })
      };
      updatedBlog = [newPost, ...blog];
      triggerToast("New blog post published successfully!", "success");
    }

    setBlog(updatedBlog);
    saveDatabase({
      ...db,
      blog: updatedBlog
    });
    setOpenBlogDialog(false);
    setEditingBlogPost(null);
    setBlogForm({ title: "", excerpt: "", category: "Education", date: "" });
  };

  const handleDeleteBlogPost = (postId: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      const updatedBlog = blog.filter((post) => post.id !== postId);
      setBlog(updatedBlog);
      saveDatabase({
        ...db,
        blog: updatedBlog
      });
      triggerToast("Blog post deleted.", "info");
    }
  };

  const handleSaveOfficialSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSettings = {
      gstRate: Number(gstRate),
      facebook: facebookUrl,
      instagram: instagramUrl,
      pinterest: pinterestUrl,
      shippingContent: shippingContent,
      returnsContent: returnsContent,
      faqContent: JSON.stringify(faqItems),
      privacyContent: privacyContent,
      termsContent: termsContent
    };

    saveDatabase({
      ...db,
      officialSettings: updatedSettings
    });
  };

  // Toggle stock helper
  const handleToggleStock = (id: string) => {
    const updatedProducts = products.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p);
    setProducts(updatedProducts);
    saveDatabase({ ...db, products: updatedProducts });
  };

  // Add product helper
  const handleAddProduct = () => {
    const parsedPrice = parseFloat(newProduct.price);
    if (!newProduct.name || isNaN(parsedPrice) || parsedPrice <= 0) {
      triggerToast("Please enter a valid name and positive price value", "warning");
      return;
    }
    const id = `${newProduct.category === "diamond" ? "dia" : (newProduct.category === "gemstone" ? "gem" : "jewel")}-${Date.now().toString().slice(-3)}`;
    const parsedStock = parseInt(newProduct.stockCount || "0", 10);
    const finalStockCount = isNaN(parsedStock) ? 0 : parsedStock;
    const finalInStock = finalStockCount > 0;

    const created: any = {
      id,
      name: newProduct.name,
      category: newProduct.category,
      price: parsedPrice,
      inStock: finalInStock,
      stockCount: finalStockCount,
      draft: false, // Default to published when added
      rating: parseFloat(newProduct.rating) || 5.0,
      image: productImages[0] || newProduct.image,
      images: productImages.filter(Boolean),
      video: productVideo || undefined
    };

    if (newProduct.category === "diamond") {
      created.shape = newProduct.shape;
      created.carat = parseFloat(newProduct.carat) || 1.0;
      created.cut = newProduct.cut;
      created.color = newProduct.color;
      created.clarity = newProduct.clarity;
      created.certificate = newProduct.certificate;
    } else if (newProduct.category === "gemstone") {
      created.gemType = newProduct.gemType;
      created.origin = newProduct.origin;
      created.treatment = newProduct.treatment;
      created.metal = newProduct.metal;
      created.collection = newProduct.collection;
    } else {
      created.metal = newProduct.metal;
      created.collection = newProduct.collection;
    }

    const updatedProducts = [...products, created];
    setProducts(updatedProducts);
    saveDatabase({ ...db, products: updatedProducts });
    setActiveView("inventory");
    setNewProduct({
      name: "", category: "diamond", price: "", metal: "Platinum", collection: "Solitaire",
      shape: "Round", carat: "1.0", cut: "Ideal", color: "D", clarity: "IF", certificate: "GIA", image: "round-diamond", rating: "5.0",
      gemType: "Sapphire", origin: "Ceylon", treatment: "Natural / Unheated", stockCount: "10"
    });
    setProductImages([null, null, null, null]);
    setProductVideo(null);
  };

  const handleEditProductClick = (prod: any) => {
    setEditingProductId(prod.id);

    // Map product object fields to the form state
    setNewProduct({
      name: prod.name || "",
      category: prod.category || "diamond",
      price: String(prod.price || ""),
      metal: prod.metal || "Platinum",
      collection: prod.collection || "Solitaire",
      shape: prod.shape || "Round",
      carat: String(prod.carat || "1.0"),
      cut: prod.cut || "Ideal",
      color: prod.color || "D",
      clarity: prod.clarity || "IF",
      certificate: prod.certificate || "GIA",
      image: prod.image || "round-diamond",
      rating: String(prod.rating || "5.0"),
      gemType: prod.gemType || "Sapphire",
      origin: prod.origin || "Ceylon",
      treatment: prod.treatment || "Natural / Unheated",
      stockCount: String(prod.stockCount !== undefined ? prod.stockCount : 10)
    });

    // Load media files
    const mediaImages = [null, null, null, null] as (string | null)[];
    if (prod.images && Array.isArray(prod.images)) {
      prod.images.forEach((img: string, i: number) => {
        if (i < 4) mediaImages[i] = img;
      });
    } else if (prod.image) {
      mediaImages[0] = prod.image;
    }
    setProductImages(mediaImages);
    setProductVideo(prod.video || null);

    setActiveView("editProduct");
  };

  const handleUpdateProduct = () => {
    const parsedPrice = parseFloat(newProduct.price);
    if (!newProduct.name || isNaN(parsedPrice) || parsedPrice <= 0) {
      triggerToast("Please enter a valid name and positive price value", "warning");
      return;
    }

    const parsedStock = parseInt(newProduct.stockCount || "0", 10);
    const finalStockCount = isNaN(parsedStock) ? 0 : parsedStock;
    const finalInStock = finalStockCount > 0;

    const updatedList = products.map((prod) => {
      if (prod.id !== editingProductId) return prod;

      const updatedProd: any = {
        ...prod,
        name: newProduct.name,
        category: newProduct.category,
        price: parsedPrice,
        inStock: finalInStock,
        stockCount: finalStockCount,
        rating: parseFloat(newProduct.rating) || 5.0,
        image: productImages[0] || newProduct.image,
        images: productImages.filter(Boolean),
        video: productVideo || undefined
      };

      if (newProduct.category === "diamond") {
        updatedProd.shape = newProduct.shape;
        updatedProd.carat = parseFloat(newProduct.carat) || 1.0;
        updatedProd.cut = newProduct.cut;
        updatedProd.color = newProduct.color;
        updatedProd.clarity = newProduct.clarity;
        updatedProd.certificate = newProduct.certificate;
      } else if (newProduct.category === "gemstone") {
        updatedProd.gemType = newProduct.gemType;
        updatedProd.origin = newProduct.origin;
        updatedProd.treatment = newProduct.treatment;
        updatedProd.metal = newProduct.metal;
        updatedProd.collection = newProduct.collection;
      } else {
        updatedProd.metal = newProduct.metal;
        updatedProd.collection = newProduct.collection;
      }

      return updatedProd;
    });

    setProducts(updatedList);
    saveDatabase({ ...db, products: updatedList });
    setActiveView("inventory");
    setEditingProductId(null);
    setNewProduct({
      name: "", category: "diamond", price: "", metal: "Platinum", collection: "Solitaire",
      shape: "Round", carat: "1.0", cut: "Ideal", color: "D", clarity: "IF", certificate: "GIA", image: "round-diamond", rating: "5.0",
      gemType: "Sapphire", origin: "Ceylon", treatment: "Natural / Unheated", stockCount: "10"
    });
    setProductImages([null, null, null, null]);
    setProductVideo(null);
  };

  const handleToggleDraft = (id: string) => {
    const updatedList = products.map((prod) => {
      if (prod.id !== id) return prod;
      const isCurrentlyDraft = !!prod.draft;
      return { ...prod, draft: !isCurrentlyDraft };
    });
    setProducts(updatedList);
    saveDatabase({ ...db, products: updatedList });
    triggerToast("Publishing status updated", "success");
  };

  const handleDeleteProduct = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this creation? This action cannot be undone.")) {
      return;
    }
    const updatedList = products.filter((prod) => prod.id !== id);
    setProducts(updatedList);
    saveDatabase({ ...db, products: updatedList });
    triggerToast("Product successfully deleted from catalog", "info");
  };

  // Save Announcements & Hero
  const handleSaveHeroAndAnnouncements = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedAnnouncements = announcementText.split("\n").filter(t => t.trim() !== "");
    const updatedHero = {
      badge: heroBadge,
      title: heroTitle,
      subtitle: heroSubtitle,
      description: heroDescription,
      bgImage: heroBgImage
    };
    saveDatabase({ ...db, announcements: updatedAnnouncements, hero: updatedHero });
  };

  // Save Homepage Settings
  const handleSaveHomepage = (e: React.FormEvent) => {
    e.preventDefault();
    saveDatabase({
      ...db,
      features: homepageFeatures,
      featuredGems: homepageGems,
      homepageCollections: homepageCollections,
      evaluator: {
        title: evaluatorTitle,
        desc: evaluatorDesc,
        basePrice: evaluatorBasePrice
      },
      milestones: homepageMilestones,
      editorialQuote: {
        text: editorialQuoteText,
        author: editorialQuoteAuthor,
        title: editorialQuoteTitle
      }
    });
  };

  // Save Contact Settings
  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    saveDatabase({
      ...db,
      contactSettings: {
        badge: contactBadge,
        title: contactTitle,
        description: contactDescription,
        channelsTitle: contactChannelsTitle,
        channelsDescription: contactChannelsDescription,
        phone: contactPhone,
        email: contactEmail,
        address: contactAddress,
        appointmentNote: contactAppointmentNote
      }
    });
  };

  const handleGemstoneImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      triggerToast("Image file size must be under 1 MB.", "warning");
      return;
    }

    setUploadingGemIndex(index);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "products");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        const updated = [...homepageGems];
        updated[index] = { ...updated[index], image: data.url };
        setHomepageGems(updated);
        triggerToast("Gemstone image uploaded successfully!", "success");
      } else {
        triggerToast(data.error || "Upload failed", "error");
      }
    } catch (error) {
      triggerToast("An error occurred during upload.", "error");
    } finally {
      setUploadingGemIndex(null);
    }
  };

  const handleCollImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      triggerToast("Image file size must be under 1 MB.", "warning");
      return;
    }

    setUploadingCollIndex(index);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "collections");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        const updated = [...homepageCollections];
        updated[index] = { ...updated[index], image: data.url };
        setHomepageCollections(updated);
        triggerToast("Collection image uploaded successfully!", "success");
      } else {
        triggerToast(data.error || "Upload failed", "error");
      }
    } catch (error) {
      triggerToast("An error occurred during upload.", "error");
    } finally {
      setUploadingCollIndex(null);
    }
  };

  const handleCollChange = (idx: number, field: string, val: string) => {
    const updated = homepageCollections.map((item, i) => {
      if (i !== idx) return item;
      return { ...item, [field]: val };
    });
    setHomepageCollections(updated);
  };

  const handleAddMilestone = () => {
    setHomepageMilestones([...homepageMilestones, { year: "", title: "", desc: "" }]);
  };

  const handleRemoveMilestone = (idx: number) => {
    const updated = homepageMilestones.filter((_, i) => i !== idx);
    setHomepageMilestones(updated);
  };

  const handleMilestoneChange = (idx: number, field: string, val: string) => {
    const updated = homepageMilestones.map((item, i) => {
      if (i !== idx) return item;
      return { ...item, [field]: val };
    });
    setHomepageMilestones(updated);
  };

  const handleAddFeature = () => {
    setHomepageFeatures([...homepageFeatures, { icon: "", title: "", desc: "" }]);
  };

  const handleRemoveFeature = (idx: number) => {
    setHomepageFeatures(homepageFeatures.filter((_, i) => i !== idx));
  };

  const handleFeatureChange = (idx: number, field: string, val: string) => {
    const updated = homepageFeatures.map((item, i) => {
      if (i !== idx) return item;
      return { ...item, [field]: val };
    });
    setHomepageFeatures(updated);
  };

  const handleAddGem = () => {
    setHomepageGems([...homepageGems, { image: "", name: "", desc: "", href: "" }]);
  };

  const handleRemoveGem = (idx: number) => {
    setHomepageGems(homepageGems.filter((_, i) => i !== idx));
  };

  const handleGemChange = (idx: number, field: string, val: string) => {
    const updated = homepageGems.map((item, i) => {
      if (i !== idx) return item;
      return { ...item, [field]: val };
    });
    setHomepageGems(updated);
  };

  const handleAddColl = () => {
    setHomepageCollections([...homepageCollections, { image: "", badge: "", title: "", link: "/shop?category=all" }]);
  };

  const handleRemoveColl = (idx: number) => {
    setHomepageCollections(homepageCollections.filter((_, i) => i !== idx));
  };

  const handleAddFaq = () => {
    setFaqItems([...faqItems, { q: "", a: "" }]);
  };

  const handleRemoveFaq = (idx: number) => {
    setFaqItems(faqItems.filter((_, i) => i !== idx));
  };

  const handleFaqChange = (idx: number, field: "q" | "a", val: string) => {
    setFaqItems(faqItems.map((item, i) => i === idx ? { ...item, [field]: val } : item));
  };

  const handleSaveHeader = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedAnnouncements = announcementText.split("\n").filter(t => t.trim() !== "");
    const updatedHeader = {
      brandName: brandName,
      logo: logoUrl,
      navLinks: navLinks
    };
    saveDatabase({ ...db, announcements: updatedAnnouncements, header: updatedHeader });
  };

  const handleSaveNavigationMenu = () => {
    const updatedHeader = {
      brandName: brandName,
      logo: logoUrl,
      navLinks: navLinks
    };
    saveDatabase({ ...db, header: updatedHeader });
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 200 * 1024) {
      triggerToast("Warning: Logo file size should ideally be under 200 KB for fast header rendering.", "warning");
    }

    setUploadingLogo(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setLogoUrl(data.url);
        triggerToast("Logo uploaded successfully! Click Deploy Changes to save.", "success");
      } else {
        triggerToast(data.error || "Upload failed", "error");
      }
    } catch (error) {
      triggerToast("An error occurred during upload.", "error");
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 300 * 1024) {
      triggerToast("Warning: File size exceeds 300 KB. It may slow down storefront load times.", "warning");
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setHeroBgImage(data.url);
        triggerToast("Hero background image uploaded successfully! Click Deploy Changes to save.", "success");
      } else {
        triggerToast(data.error || "Upload failed", "error");
      }
    } catch (error) {
      triggerToast("An error occurred during upload.", "error");
    } finally {
      setUploading(false);
    }
  };

  // Product media upload handler (images: index 0-3, video: index 4)
  const handleProductMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>, slotIndex: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = slotIndex === 4;

    // Validate file size: images < 1MB, video < 50MB
    if (!isVideo && file.size > 1 * 1024 * 1024) {
      triggerToast("Image file size must be under 1 MB. Please compress or resize your image.", "warning");
      return;
    }
    if (isVideo && file.size > 50 * 1024 * 1024) {
      triggerToast("Video file size must be under 50 MB.", "warning");
      return;
    }

    // Validate file type
    if (!isVideo && !file.type.startsWith("image/")) {
      triggerToast("Please upload a valid image file (JPEG, PNG, or WebP).", "warning");
      return;
    }
    if (isVideo && !file.type.startsWith("video/")) {
      triggerToast("Please upload a valid video file (MP4).", "warning");
      return;
    }

    setUploadingMedia(slotIndex);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "products");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        if (isVideo) {
          setProductVideo(data.url);
        } else {
          const updated = [...productImages];
          updated[slotIndex] = data.url;
          setProductImages(updated);
        }
        triggerToast(`${isVideo ? "Video" : "Image"} uploaded successfully!`, "success");
      } else {
        triggerToast(data.error || "Upload failed", "error");
      }
    } catch (error) {
      triggerToast("An error occurred during upload.", "error");
    } finally {
      setUploadingMedia(null);
    }
  };

  const handleRemoveProductMedia = (slotIndex: number) => {
    if (slotIndex === 4) {
      setProductVideo(null);
    } else {
      const updated = [...productImages];
      updated[slotIndex] = null;
      setProductImages(updated);
    }
    triggerToast("Media removed.", "info");
  };

  // Open dialog to add new Nav Link
  const handleAddNavLinkOpen = () => {
    setEditingNavIndex(null);
    setNavLabel("");
    setNavHref("");
    setNavHasDropdown(false);
    setNavDropdownColumns([]);
    setFeaturedCardTag("");
    setFeaturedCardTitle("");
    setFeaturedCardDesc("");
    setFeaturedCardLink("");
    setOpenNavDialog(true);
  };

  // Open dialog to edit existing Nav Link
  const handleEditNavLinkOpen = (index: number) => {
    const item = navLinks[index];
    setEditingNavIndex(index);
    setNavLabel(item.label || "");
    setNavHref(item.href || "");
    setNavHasDropdown(!!item.dropdown);
    setNavDropdownColumns(item.dropdown?.columns || []);
    setFeaturedCardTag(item.dropdown?.featuredCard?.tag || "");
    setFeaturedCardTitle(item.dropdown?.featuredCard?.title || "");
    setFeaturedCardDesc(item.dropdown?.featuredCard?.desc || "");
    setFeaturedCardLink(item.dropdown?.featuredCard?.link || "");
    setOpenNavDialog(true);
  };

  // Save the Nav Link from the dialog
  const handleSaveNavLink = () => {
    if (!navLabel.trim()) {
      triggerToast("Label is required", "error");
      return;
    }

    const dropdown = navHasDropdown ? {
      columns: navDropdownColumns,
      featuredCard: {
        tag: featuredCardTag,
        title: featuredCardTitle,
        desc: featuredCardDesc,
        link: featuredCardLink
      }
    } : undefined;

    const newLink = {
      id: navLabel.toLowerCase().replace(/\s+/g, "-"),
      label: navLabel,
      href: navHasDropdown ? "" : navHref,
      dropdown
    };

    let updated = [...navLinks];
    if (editingNavIndex !== null) {
      updated[editingNavIndex] = newLink;
    } else {
      updated.push(newLink);
    }
    setNavLinks(updated);
    setOpenNavDialog(false);
    triggerToast("Navigation menu updated. Click Deploy Changes to apply.", "success");
  };

  // Delete a Nav Link
  const handleDeleteNavLink = (index: number) => {
    const updated = navLinks.filter((_, idx) => idx !== index);
    setNavLinks(updated);
    triggerToast("Navigation item removed. Click Deploy Changes to apply.", "info");
  };

  // Move Nav Link Up
  const handleMoveNavUp = (index: number) => {
    if (index === 0) return;
    const updated = [...navLinks];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setNavLinks(updated);
  };

  // Move Nav Link Down
  const handleMoveNavDown = (index: number) => {
    if (index === navLinks.length - 1) return;
    const updated = [...navLinks];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setNavLinks(updated);
  };

  // Add a new column to the dropdown
  const handleAddDropdownColumn = () => {
    setNavDropdownColumns([...navDropdownColumns, { title: "New Column", links: [] }]);
  };

  // Remove a column from the dropdown
  const handleRemoveDropdownColumn = (colIdx: number) => {
    const updated = navDropdownColumns.filter((_, idx) => idx !== colIdx);
    setNavDropdownColumns(updated);
  };

  // Edit column title
  const handleColumnTitleChange = (colIdx: number, title: string) => {
    const updated = [...navDropdownColumns];
    updated[colIdx] = { ...updated[colIdx], title };
    setNavDropdownColumns(updated);
  };

  // Add a link to a column
  const handleAddColumnLink = (colIdx: number) => {
    const updated = [...navDropdownColumns];
    updated[colIdx].links = [...(updated[colIdx].links || []), { label: "New Link", href: "/shop" }];
    setNavDropdownColumns(updated);
  };

  // Remove a link from a column
  const handleRemoveColumnLink = (colIdx: number, lnIdx: number) => {
    const updated = [...navDropdownColumns];
    updated[colIdx].links = updated[colIdx].links.filter((_: any, idx: number) => idx !== lnIdx);
    setNavDropdownColumns(updated);
  };

  // Update a link inside a column
  const handleColumnLinkChange = (colIdx: number, lnIdx: number, field: "label" | "href", value: string) => {
    const updated = [...navDropdownColumns];
    const links = [...updated[colIdx].links];
    links[lnIdx] = { ...links[lnIdx], [field]: value };
    updated[colIdx].links = links;
    setNavDropdownColumns(updated);
  };

  // Save About & Heritage Details
  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedAbout = {
      title: aboutTitle,
      description: aboutDescription,
      origins: aboutOrigins,
      quote: aboutQuote,
      promisesTitle: promisesTitle,
      promisesSubtitle: promisesSubtitle,
      promises: aboutPromises
    };
    saveDatabase({ ...db, about: updatedAbout });
  };

  const handlePromiseChange = (idx: number, field: string, value: string) => {
    const updated = [...aboutPromises];
    updated[idx] = { ...updated[idx], [field]: value };
    setAboutPromises(updated);
  };

  // Open Edit Collection Dialog
  const handleOpenEditCollection = (idx: number) => {
    setEditingCollectionIndex(idx);
    setCollectionForm(collections[idx]);
    setOpenCollectionDialog(true);
  };

  // Save Collection config
  const handleSaveCollection = () => {
    if (editingCollectionIndex !== null) {
      const updatedCollections = [...collections];
      updatedCollections[editingCollectionIndex] = collectionForm;
      setCollections(updatedCollections);
      saveDatabase({ ...db, collections: updatedCollections });
      setOpenCollectionDialog(false);
      setEditingCollectionIndex(null);
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!mounted || status === "loading" || !db) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", backgroundColor: "#fcfbfa", flexDirection: "column", gap: "8px" }}>
        <img
          src="/logo.png"
          alt="Nakshatra Gems & Jewelry"
          style={{ height: "60px", objectFit: "contain" }}
        />
        <span style={{ letterSpacing: "2px", color: "#888888", marginTop: "4px", fontSize: "0.75rem", fontFamily: "var(--font-geist-mono), monospace" }}>
          {status === "unauthenticated" ? "Redirecting to login..." : "Loading Atelier Database..."}
        </span>
      </div>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fcfbfa" }}>
      {/* Sidebar navigation */}
      <Box sx={{ width: 260, bgcolor: "#111111", color: "#ffffff", display: "flex", flexDirection: "column" }}>
        <Box sx={{ p: 3, borderBottom: "1px solid #222222", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img
            src={db.header?.logo || "/logo.png"}
            alt={db.header?.brandName || "Nakshatra Gems & Jewelry"}
            style={{ height: "40px", objectFit: "contain", filter: "invert(1) brightness(2.5)" }}
          />
          <Typography variant="caption" sx={{ letterSpacing: 2, color: "#888888", display: "block", mt: 1 }}>
            ADMIN PORTAL
          </Typography>
        </Box>
        <List sx={{ flexGrow: 1, px: 2, py: 3 }}>
          {[
            { id: "overview", label: "Overview", icon: <DashboardIcon /> },
            { id: "header", label: "Header Settings", icon: <HeaderIcon /> },
            { id: "announcements", label: "Hero Banner", icon: <EditIcon /> },
            { id: "homepage", label: "Homepage Settings", icon: <HomeIcon /> },
            { id: "inventory", label: "Product Catalog", icon: <GemIcon /> },
            { id: "about", label: "About Settings", icon: <BookIcon /> },
            { id: "collections", label: "Collections Hub", icon: <CategoryIcon /> },
            { id: "bookings", label: "Consultation Bookings", icon: <CalendarIcon /> },
            { id: "orders", label: "Client Orders", icon: <ShoppingBagIcon /> },
            { id: "users", label: "Client Registry", icon: <PeopleIcon /> },
            { id: "courier", label: "Courier Services", icon: <CourierIcon /> },
            { id: "blog", label: "Maison Journal", icon: <JournalIcon /> },
            { id: "contact", label: "Contact Settings", icon: <ContactIcon /> },
            { id: "officialSettings", label: "Official Settings", icon: <SettingsIcon /> }
          ].map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                selected={((activeView === "addProduct" || activeView === "editProduct") ? "inventory" : activeView) === item.id}
                onClick={() => setActiveView(item.id as any)}
                sx={{
                  borderRadius: 1,
                  color: activeView === item.id ? "#d4af37" : "#cccccc",
                  "&.Mui-selected": {
                    bgcolor: "rgba(212, 175, 55, 0.15)",
                    color: "#d4af37",
                    "&:hover": { bgcolor: "rgba(212, 175, 55, 0.2)" }
                  },
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)" }
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 13, fontWeight: "medium", letterSpacing: 1 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <AppBar position="static" sx={{ bgcolor: "#ffffff", color: "#111111", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="subtitle2" sx={{ letterSpacing: 1.5, textTransform: "uppercase", color: "#888888" }}>
              Atelier Management System
            </Typography>
            <Button
              size="small"
              variant="outlined"
              color="inherit"
              onClick={() => signOut({ callbackUrl: "/login" })}
              sx={{ borderColor: "#e0e0e0", fontSize: 10, letterSpacing: 1.5 }}
            >
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 4, flexGrow: 1 }}>
          {/* VIEW: OVERVIEW */}
          {activeView === "overview" && (
            <Box>
              <Typography variant="h5" sx={{ fontFamily: "serif", mb: 4, color: "#111111" }}>
                Operational Overview
              </Typography>

              {/* Stat Cards */}
              <Grid container spacing={3} sx={{ mb: 5 }}>
                {[
                  { label: "Total Products", value: products.length, icon: <GemIcon sx={{ color: "#d4af37" }} />, color: "#d4af37" },
                  { label: "Total Orders", value: orders.length, icon: <ShoppingBagIcon sx={{ color: "#d4af37" }} />, color: "#d4af37" },
                  { label: "Registered Clients", value: users.length, icon: <PeopleIcon sx={{ color: "#d4af37" }} />, color: "#d4af37" },
                  { label: "Consultations", value: bookings.length, icon: <CalendarIcon sx={{ color: "#d4af37" }} />, color: "#d4af37" },
                  { label: "Collections", value: collections.length, icon: <CategoryIcon sx={{ color: "#d4af37" }} />, color: "#d4af37" },
                  { label: "Blog Posts", value: blog.length, icon: <JournalIcon sx={{ color: "#d4af37" }} />, color: "#d4af37" },
                ].map((stat, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Card sx={{ border: "1px solid #eaeaea", boxShadow: "none", transition: "all 0.2s", "&:hover": { borderColor: "#d4af37", boxShadow: "0 2px 12px rgba(212,175,55,0.12)" } }}>
                      <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 1, textTransform: "uppercase", fontSize: 9 }}>
                            {stat.label}
                          </Typography>
                          <Typography variant="h4" sx={{ fontWeight: "light", mt: 0.5 }}>
                            {stat.value}
                          </Typography>
                        </Box>
                        <Box sx={{ p: 1.5, bgcolor: "#fcfbfa", borderRadius: "50%" }}>{stat.icon}</Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Revenue + Pending Bookings Row */}
              <Grid container spacing={3} sx={{ mb: 5 }}>
                <Grid item xs={12} sm={6}>
                  <Card sx={{ border: "1px solid #eaeaea", boxShadow: "none" }}>
                    <CardContent>
                      <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 1, textTransform: "uppercase", fontSize: 9 }}>
                        Total Revenue
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: "light", mt: 0.5, color: "#111" }}>
                        {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
                          orders.reduce((sum: number, o: any) => sum + (Number(o.total) || 0), 0)
                        )}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#888", mt: 0.5, display: "block" }}>
                        From {orders.length} order{orders.length !== 1 ? "s" : ""}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card sx={{ border: "1px solid #eaeaea", boxShadow: "none" }}>
                    <CardContent>
                      <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 1, textTransform: "uppercase", fontSize: 9 }}>
                        Pending Consultations
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: "light", mt: 0.5, color: "#111" }}>
                        {bookings.filter((b: any) => {
                          const bDate = new Date(b.date);
                          return bDate >= new Date();
                        }).length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#888", mt: 0.5, display: "block" }}>
                        Upcoming scheduled sessions
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Quick Actions */}
              <Typography variant="h6" sx={{ fontFamily: "serif", mb: 2, color: "#111111", fontSize: 16 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2} sx={{ mb: 5 }}>
                {[
                  { label: "Add Product", view: "addProduct", icon: <AddIcon /> },
                  { label: "Manage Orders", view: "orders", icon: <ShoppingBagIcon /> },
                  { label: "View Clients", view: "users", icon: <PeopleIcon /> },
                  { label: "Homepage Settings", view: "homepage", icon: <HomeIcon /> },
                  { label: "Write Blog Post", view: "blog", icon: <JournalIcon /> },
                  { label: "Official Settings", view: "officialSettings", icon: <SettingsIcon /> },
                ].map((action, i) => (
                  <Grid item xs={6} sm={4} md={2} key={i}>
                    <Card
                      onClick={() => setActiveView(action.view as any)}
                      sx={{ border: "1px solid #eaeaea", boxShadow: "none", cursor: "pointer", textAlign: "center", transition: "all 0.2s", "&:hover": { borderColor: "#d4af37", bgcolor: "#fcfbfa" } }}
                    >
                      <CardContent sx={{ py: 2, "&:last-child": { pb: 2 } }}>
                        <Box sx={{ color: "#d4af37", mb: 1 }}>{action.icon}</Box>
                        <Typography variant="caption" sx={{ fontSize: 9, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 }}>
                          {action.label}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Recent Orders + Recent Clients */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                  <Typography variant="h6" sx={{ fontFamily: "serif", mb: 2, color: "#111111", fontSize: 16 }}>
                    Recent Orders
                  </Typography>
                  <TableContainer component={Paper} sx={{ border: "1px solid #eaeaea", boxShadow: "none" }}>
                    <Table size="small">
                      <TableHead sx={{ bgcolor: "#fcfbfa" }}>
                        <TableRow>
                          <TableCell sx={{ fontSize: 9, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Order ID</TableCell>
                          <TableCell sx={{ fontSize: 9, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Client</TableCell>
                          <TableCell sx={{ fontSize: 9, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Amount</TableCell>
                          <TableCell sx={{ fontSize: 9, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Status</TableCell>
                          <TableCell sx={{ fontSize: 9, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orders.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} sx={{ fontSize: 11, textAlign: "center", py: 4, color: "#888" }}>
                              No orders yet.
                            </TableCell>
                          </TableRow>
                        ) : (
                          orders.slice(0, 5).map((order: any) => (
                            <TableRow key={order.id}>
                              <TableCell sx={{ fontSize: 11, fontWeight: 600 }}>{order.id}</TableCell>
                              <TableCell sx={{ fontSize: 11 }}>{order.shippingDetails?.name || "N/A"}</TableCell>
                              <TableCell sx={{ fontSize: 11 }}>
                                {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(order.total) || 0)}
                              </TableCell>
                              <TableCell sx={{ fontSize: 11 }}>
                                <Box component="span" sx={{
                                  px: 1, py: 0.3, fontSize: 9, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase",
                                  bgcolor: order.shiprocketStatus === "Delivered" ? "#e8f5e9" : order.shiprocketStatus === "In Transit" ? "#fff3e0" : "#f5f5f5",
                                  color: order.shiprocketStatus === "Delivered" ? "#2e7d32" : order.shiprocketStatus === "In Transit" ? "#e65100" : "#666",
                                }}>
                                  {order.shiprocketStatus || order.status || "Placed"}
                                </Box>
                              </TableCell>
                              <TableCell sx={{ fontSize: 11, color: "#888" }}>{order.date || "N/A"}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {orders.length > 5 && (
                    <Box sx={{ mt: 1, textAlign: "right" }}>
                      <Button size="small" onClick={() => setActiveView("orders")} sx={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>
                        View All Orders
                      </Button>
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} md={5}>
                  <Typography variant="h6" sx={{ fontFamily: "serif", mb: 2, color: "#111111", fontSize: 16 }}>
                    Recent Clients
                  </Typography>
                  <TableContainer component={Paper} sx={{ border: "1px solid #eaeaea", boxShadow: "none" }}>
                    <Table size="small">
                      <TableHead sx={{ bgcolor: "#fcfbfa" }}>
                        <TableRow>
                          <TableCell sx={{ fontSize: 9, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Name</TableCell>
                          <TableCell sx={{ fontSize: 9, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Email</TableCell>
                          <TableCell sx={{ fontSize: 9, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Joined</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={3} sx={{ fontSize: 11, textAlign: "center", py: 4, color: "#888" }}>
                              No clients registered yet.
                            </TableCell>
                          </TableRow>
                        ) : (
                          users.filter((u: any) => u.role !== "admin").slice(0, 6).map((client: any, idx: number) => (
                            <TableRow key={idx}>
                              <TableCell sx={{ fontSize: 11, fontWeight: 600 }}>{client.name}</TableCell>
                              <TableCell sx={{ fontSize: 11 }}>{client.email}</TableCell>
                              <TableCell sx={{ fontSize: 11, color: "#888" }}>
                                {client.createdAt ? new Date(client.createdAt).toLocaleDateString("en-IN") : "N/A"}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {users.length > 6 && (
                    <Box sx={{ mt: 1, textAlign: "right" }}>
                      <Button size="small" onClick={() => setActiveView("users")} sx={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>
                        View All Clients
                      </Button>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
          )}

          {/* VIEW: HEADER SETTINGS */}
          {activeView === "header" && (
            <Box component="form" onSubmit={handleSaveHeader} sx={{ maxWidth: 650 }}>
              <Typography variant="h5" sx={{ fontFamily: "serif", mb: 4, color: "#111111" }}>
                Edit Header Settings
              </Typography>
              <Paper sx={{ p: 4, border: "1px solid #eaeaea", boxShadow: "none" }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" sx={{ letterSpacing: 1, textTransform: "uppercase", display: "block", mb: 1, color: "#888888", fontWeight: "bold" }}>
                    Brand Name / Alt Text
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" sx={{ letterSpacing: 1, textTransform: "uppercase", display: "block", mb: 1, color: "#888888", fontWeight: "bold" }}>
                    Store Logo
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                    <Button
                      variant="outlined"
                      component="label"
                      disabled={uploadingLogo}
                      sx={{
                        borderColor: "#111111",
                        color: "#111111",
                        borderRadius: 0,
                        fontSize: 10,
                        letterSpacing: 1,
                        "&:hover": { borderColor: "#d4af37", color: "#d4af37" }
                      }}
                    >
                      {uploadingLogo ? "Uploading..." : "Upload Logo"}
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleLogoUpload}
                      />
                    </Button>
                    {logoUrl && (
                      <Typography variant="body2" sx={{ color: "#2e7d32", fontSize: 11 }}>
                        ✓ {logoUrl.split('/').pop()}
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="caption" sx={{ color: "#777777", display: "block", mt: 1, fontStyle: "italic", fontSize: 10, lineHeight: 1.5 }}>
                    Recommended specifications:<br />
                    • Dimensions: <strong>160 × 50 px</strong> (or similar ratio)<br />
                    • Background: <strong>Transparent (PNG/WebP)</strong><br />
                    • File size: <strong>&lt; 150 KB</strong>
                  </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="caption" sx={{ letterSpacing: 1, textTransform: "uppercase", display: "block", mb: 1, color: "#888888", fontWeight: "bold" }}>
                    Announcement Messages (One per line)
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    size="small"
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                  />
                </Box>

                <Button type="submit" variant="contained" sx={{ bgcolor: "#111111", color: "#ffffff", py: 1.2, px: 4, fontSize: 11, letterSpacing: 2, borderRadius: 0, "&:hover": { bgcolor: "#d4af37", color: "#111111" } }}>
                  Deploy Changes
                </Button>
              </Paper>

              <Typography variant="h5" sx={{ fontFamily: "serif", mt: 6, mb: 4, color: "#111111" }}>
                Edit Navigation Menu
              </Typography>
              <Paper sx={{ p: 4, border: "1px solid #eaeaea", boxShadow: "none" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>Menu Items</Typography>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleAddNavLinkOpen}
                    sx={{ bgcolor: "#111111", color: "#ffffff", fontSize: 10, letterSpacing: 1, borderRadius: 0, "&:hover": { bgcolor: "#d4af37", color: "#111111" } }}
                  >
                    Add Menu Link
                  </Button>
                </Box>
                <TableContainer component={Paper} sx={{ border: "1px solid #eaeaea", boxShadow: "none", borderRadius: 0 }}>
                  <Table size="small">
                    <TableHead sx={{ bgcolor: "#fcfbfa" }}>
                      <TableRow>
                        <TableCell sx={{ fontSize: 11, fontWeight: "bold", py: 1.5 }}>Label</TableCell>
                        <TableCell sx={{ fontSize: 11, fontWeight: "bold", py: 1.5 }}>Link URL / Dropdown</TableCell>
                        <TableCell sx={{ fontSize: 11, fontWeight: "bold", py: 1.5 }} align="center">Reorder</TableCell>
                        <TableCell sx={{ fontSize: 11, fontWeight: "bold", py: 1.5 }} align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {navLinks.map((link, idx) => (
                        <TableRow key={idx}>
                          <TableCell sx={{ fontSize: 12, py: 1 }}>{link.label}</TableCell>
                          <TableCell sx={{ fontSize: 12, py: 1, color: link.dropdown ? "#d4af37" : "text.secondary" }}>
                            {link.dropdown ? "[Mega Menu Dropdown]" : (link.href || "/")}
                          </TableCell>
                          <TableCell sx={{ py: 1 }} align="center">
                            <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
                              <Button
                                size="small"
                                disabled={idx === 0}
                                onClick={() => handleMoveNavUp(idx)}
                                sx={{ minWidth: "auto", p: 0.5, fontSize: 10 }}
                              >
                                ▲
                              </Button>
                              <Button
                                size="small"
                                disabled={idx === navLinks.length - 1}
                                onClick={() => handleMoveNavDown(idx)}
                                sx={{ minWidth: "auto", p: 0.5, fontSize: 10 }}
                              >
                                ▼
                              </Button>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ py: 1 }} align="right">
                            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => handleEditNavLinkOpen(idx)}
                                sx={{ borderColor: "#111111", color: "#111111", fontSize: 9, p: "2px 6px", borderRadius: 0, "&:hover": { borderColor: "#d4af37", color: "#d4af37" } }}
                              >
                                Edit Link
                              </Button>
                              <Button
                                size="small"
                                color="error"
                                onClick={() => handleDeleteNavLink(idx)}
                                sx={{ fontSize: 9, p: "2px 6px" }}
                              >
                                Delete
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button
                  variant="contained"
                  onClick={handleSaveNavigationMenu}
                  sx={{ bgcolor: "#111111", color: "#ffffff", mt: 3, py: 1.2, px: 4, fontSize: 11, letterSpacing: 2, borderRadius: 0, "&:hover": { bgcolor: "#d4af37", color: "#111111" } }}
                >
                  Deploy Menu Changes
                </Button>
              </Paper>
            </Box>
          )}

          {/* VIEW: HERO BANNER */}
          {activeView === "announcements" && (
            <Box component="form" onSubmit={handleSaveHeroAndAnnouncements} sx={{ maxWidth: 650 }}>
              <Typography variant="h5" sx={{ fontFamily: "serif", mb: 4, color: "#111111" }}>
                Edit Hero Banner
              </Typography>
              <Paper sx={{ p: 4, border: "1px solid #eaeaea", boxShadow: "none" }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" sx={{ letterSpacing: 1, textTransform: "uppercase", display: "block", mb: 1, color: "#888888", fontWeight: "bold" }}>
                    Hero Banner Top Badge
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={heroBadge}
                    onChange={(e) => setHeroBadge(e.target.value)}
                  />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" sx={{ letterSpacing: 1, textTransform: "uppercase", display: "block", mb: 1, color: "#888888", fontWeight: "bold" }}>
                    Hero Background Image
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                    <Button
                      variant="outlined"
                      component="label"
                      disabled={uploading}
                      sx={{
                        borderColor: "#111111",
                        color: "#111111",
                        borderRadius: 0,
                        fontSize: 10,
                        letterSpacing: 1,
                        "&:hover": { borderColor: "#d4af37", color: "#d4af37" }
                      }}
                    >
                      {uploading ? "Uploading..." : "Upload Image"}
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </Button>
                    {heroBgImage && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Typography variant="body2" sx={{ color: "#2e7d32", fontSize: 11 }}>
                          ✓ {heroBgImage.split('/').pop()}
                        </Typography>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => {
                            setHeroBgImage("");
                            triggerToast("Hero background image cleared. Click Deploy Changes to restore default gradient.", "info");
                          }}
                          sx={{ fontSize: 9, minWidth: "auto", p: "2px 6px", textTransform: "none", border: "1px solid" }}
                        >
                          Remove
                        </Button>
                      </Box>
                    )}
                  </Box>
                  <Typography variant="caption" sx={{ color: "#777777", display: "block", mt: 1, fontStyle: "italic", fontSize: 10, lineHeight: 1.5 }}>
                    Recommended specifications:<br />
                    • Dimensions: <strong>1920 × 1080 px</strong> (16:9 aspect ratio)<br />
                    • File size: <strong>&lt; 300 KB</strong> (optimal: &lt; 150 KB)<br />
                    • Format: <strong>WebP</strong> (highly recommended) or optimized JPEG
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" sx={{ letterSpacing: 1, textTransform: "uppercase", display: "block", mb: 1, color: "#888888", fontWeight: "bold" }}>
                    Hero Banner Title
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                  />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" sx={{ letterSpacing: 1, textTransform: "uppercase", display: "block", mb: 1, color: "#888888", fontWeight: "bold" }}>
                    Hero Banner Subtitle
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={heroSubtitle}
                    onChange={(e) => setHeroSubtitle(e.target.value)}
                  />
                </Box>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="caption" sx={{ letterSpacing: 1, textTransform: "uppercase", display: "block", mb: 1, color: "#888888", fontWeight: "bold" }}>
                    Hero Detailed Description
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)}
                  />
                </Box>
                <Button type="submit" variant="contained" sx={{ bgcolor: "#111111", color: "#ffffff", py: 1.2, px: 4, fontSize: 11, letterSpacing: 2, borderRadius: 0, "&:hover": { bgcolor: "#d4af37", color: "#111111" } }}>
                  Deploy Changes
                </Button>
              </Paper>
            </Box>
          )}

          {/* VIEW: HOMEPAGE SETTINGS */}
          {activeView === "homepage" && (
            <Box component="form" onSubmit={handleSaveHomepage} sx={{ maxWidth: 800 }}>
              <Typography variant="h5" sx={{ fontFamily: "serif", mb: 1, color: "#111111" }}>
                Homepage Section Settings
              </Typography>
              <Typography variant="body2" sx={{ color: "#888888", mb: 4, fontSize: 12 }}>
                Customize and manage all content sections appearing on the main landing page.
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>

                {/* 1. FEATURES SECTION */}
                <Paper sx={{ p: 4, border: "1px solid #eaeaea", boxShadow: "none" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ letterSpacing: 1, textTransform: "uppercase", color: "#d4af37", fontWeight: "bold", fontSize: 11 }}>
                      Features & Highlights
                    </Typography>
                    <Button size="small" variant="outlined" onClick={handleAddFeature} sx={{ borderColor: "#111111", color: "#111111", fontSize: 10, borderRadius: 0 }}>
                      Add Feature
                    </Button>
                  </Box>
                  <Grid container spacing={3}>
                    {homepageFeatures.map((feat, idx) => (
                      <Grid item xs={12} md={4} key={idx}>
                        <Paper variant="outlined" sx={{ p: 2.5, bgcolor: "#fafafa", position: "relative" }}>
                          <Button onClick={() => handleRemoveFeature(idx)} sx={{ position: "absolute", top: 10, right: 10, minWidth: "auto", color: "#d32f2f", fontSize: 10, letterSpacing: 1 }}>
                            Remove
                          </Button>
                          <Typography variant="caption" sx={{ fontWeight: "bold", color: "#888888", display: "block", mb: 2, pt: 1 }}>
                            Feature {idx + 1}
                          </Typography>
                          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <TextField
                              label="Icon Name"
                              size="small"
                              fullWidth
                              value={feat.icon || ""}
                              onChange={(e) => handleFeatureChange(idx, "icon", e.target.value)}
                              placeholder="Gem, ShieldCheck, or Sparkles"
                            />
                            <TextField
                              label="Feature Title"
                              size="small"
                              fullWidth
                              value={feat.title || ""}
                              onChange={(e) => handleFeatureChange(idx, "title", e.target.value)}
                            />
                            <TextField
                              label="Short Description"
                              size="small"
                              fullWidth
                              multiline
                              rows={2.5}
                              value={feat.desc || ""}
                              onChange={(e) => handleFeatureChange(idx, "desc", e.target.value)}
                            />
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>

                {/* 2. PRECIOUS GEMSTONE GALLERY */}
                <Paper sx={{ p: 4, border: "1px solid #eaeaea", boxShadow: "none" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ letterSpacing: 1, textTransform: "uppercase", color: "#d4af37", fontWeight: "bold", fontSize: 11 }}>
                      Precious Gemstone Gallery
                    </Typography>
                    <Button size="small" variant="outlined" onClick={handleAddGem} sx={{ borderColor: "#111111", color: "#111111", fontSize: 10, borderRadius: 0 }}>
                      Add Gemstone
                    </Button>
                  </Box>
                  <Grid container spacing={3}>
                    {homepageGems.map((gem, idx) => (
                      <Grid item xs={12} md={4} key={idx}>
                        <Paper variant="outlined" sx={{ p: 2.5, bgcolor: "#fafafa", position: "relative" }}>
                          <Button onClick={() => handleRemoveGem(idx)} sx={{ position: "absolute", top: 10, right: 10, minWidth: "auto", color: "#d32f2f", fontSize: 10, letterSpacing: 1 }}>
                            Remove
                          </Button>
                          <Typography variant="caption" sx={{ fontWeight: "bold", color: "#888888", display: "block", mb: 2, pt: 1 }}>
                            Gemstone {idx + 1}
                          </Typography>

                          {/* Image preview & upload */}
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" sx={{ display: "block", mb: 1, color: "#888888" }}>Image Asset</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                              <Button
                                variant="outlined"
                                component="label"
                                size="small"
                                disabled={uploadingGemIndex === idx}
                                sx={{ borderColor: "#111111", color: "#111111", fontSize: 10, borderRadius: 0 }}
                              >
                                {uploadingGemIndex === idx ? "Uploading..." : "Upload"}
                                <input
                                  type="file"
                                  hidden
                                  accept="image/*"
                                  onChange={(e) => handleGemstoneImageUpload(e, idx)}
                                />
                              </Button>
                              {gem.image && (
                                <Box
                                  component="img"
                                  src={gem.image}
                                  sx={{ width: 32, height: 32, objectFit: "contain", border: "1px solid #ddd", bgcolor: "#fff" }}
                                />
                              )}
                            </Box>
                          </Box>

                          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <TextField
                              label="Gemstone Name"
                              size="small"
                              fullWidth
                              value={gem.name || ""}
                              onChange={(e) => handleGemChange(idx, "name", e.target.value)}
                            />
                            <TextField
                              label="Description"
                              size="small"
                              fullWidth
                              multiline
                              rows={2.5}
                              value={gem.desc || ""}
                              onChange={(e) => handleGemChange(idx, "desc", e.target.value)}
                            />
                            <TextField
                              label="Target Link (Href)"
                              size="small"
                              fullWidth
                              value={gem.href || ""}
                              onChange={(e) => handleGemChange(idx, "href", e.target.value)}
                            />
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>

                {/* 3. SHOP THE COLLECTIONS EDITORIAL CATEGORY CARDS */}
                <Paper sx={{ p: 4, border: "1px solid #eaeaea", boxShadow: "none" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ letterSpacing: 1, textTransform: "uppercase", color: "#d4af37", fontWeight: "bold", fontSize: 11 }}>
                      Shop the Collections (Homepage Cards)
                    </Typography>
                    <Button size="small" variant="outlined" onClick={handleAddColl} sx={{ borderColor: "#111111", color: "#111111", fontSize: 10, borderRadius: 0 }}>
                      Add Collection
                    </Button>
                  </Box>
                  <Grid container spacing={3}>
                    {homepageCollections.map((col, idx) => (
                      <Grid item xs={12} md={4} key={idx}>
                        <Paper variant="outlined" sx={{ p: 2.5, bgcolor: "#fafafa", position: "relative" }}>
                          <Button onClick={() => handleRemoveColl(idx)} sx={{ position: "absolute", top: 10, right: 10, minWidth: "auto", color: "#d32f2f", fontSize: 10, letterSpacing: 1 }}>
                            Remove
                          </Button>
                          <Typography variant="caption" sx={{ fontWeight: "bold", color: "#888888", display: "block", mb: 2, pt: 1 }}>
                            Collection Card {idx + 1}
                          </Typography>

                          {/* Image preview & upload */}
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" sx={{ display: "block", mb: 1, color: "#888888" }}>Background Image</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                              <Button
                                variant="outlined"
                                component="label"
                                size="small"
                                disabled={uploadingCollIndex === idx}
                                sx={{ borderColor: "#111111", color: "#111111", fontSize: 10, borderRadius: 0 }}
                              >
                                {uploadingCollIndex === idx ? "Uploading..." : "Upload"}
                                <input
                                  type="file"
                                  hidden
                                  accept="image/*"
                                  onChange={(e) => handleCollImageUpload(e, idx)}
                                />
                              </Button>
                              {col.image && (
                                <Box
                                  component="img"
                                  src={col.image}
                                  sx={{ width: 32, height: 32, objectFit: "contain", border: "1px solid #ddd", bgcolor: "#fff" }}
                                />
                              )}
                            </Box>
                          </Box>

                          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <TextField
                              label="Badge Name"
                              size="small"
                              fullWidth
                              value={col.badge || ""}
                              onChange={(e) => handleCollChange(idx, "badge", e.target.value)}
                              placeholder="e.g. Brilliant & Certified"
                            />
                            <TextField
                              label="Collection Title"
                              size="small"
                              fullWidth
                              value={col.title || ""}
                              onChange={(e) => handleCollChange(idx, "title", e.target.value)}
                              placeholder="e.g. Engagement Rings"
                            />
                            <TextField
                              label="Redirect Link (Href)"
                              size="small"
                              fullWidth
                              value={col.link || ""}
                              onChange={(e) => handleCollChange(idx, "link", e.target.value)}
                            />
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>

                {/* 4. INTERACTIVE DIAMOND EVALUATOR */}
                <Paper sx={{ p: 4, border: "1px solid #eaeaea", boxShadow: "none" }}>
                  <Typography variant="subtitle2" sx={{ letterSpacing: 1, textTransform: "uppercase", color: "#d4af37", fontWeight: "bold", mb: 3, fontSize: 11 }}>
                    Interactive GIA Diamond Evaluator
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                    <TextField
                      label="Evaluator Header Title"
                      size="small"
                      fullWidth
                      value={evaluatorTitle}
                      onChange={(e) => setEvaluatorTitle(e.target.value)}
                    />
                    <TextField
                      label="Evaluator Description Text"
                      size="small"
                      fullWidth
                      multiline
                      rows={2}
                      value={evaluatorDesc}
                      onChange={(e) => setEvaluatorDesc(e.target.value)}
                    />
                    <TextField
                      label="Base Price Constant (USD per carat)"
                      size="small"
                      type="number"
                      sx={{ maxWidth: 260 }}
                      value={evaluatorBasePrice}
                      onChange={(e) => setEvaluatorBasePrice(parseInt(e.target.value) || 5000)}
                    />
                  </Box>
                </Paper>

                {/* 4. HERITAGE TIMELINE TIMELINE MILESTONES */}
                <Paper sx={{ p: 4, border: "1px solid #eaeaea", boxShadow: "none" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ letterSpacing: 1, textTransform: "uppercase", color: "#d4af37", fontWeight: "bold", fontSize: 11 }}>
                      Heritage Milestones & Timelines
                    </Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={handleAddMilestone}
                      sx={{ borderColor: "#111111", color: "#111111", fontSize: 10, borderRadius: 0 }}
                    >
                      Add Milestone
                    </Button>
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
                    {homepageMilestones.map((milestone, idx) => (
                      <Paper variant="outlined" sx={{ p: 3, bgcolor: "#fafafa", position: "relative" }} key={idx}>
                        <Button
                          onClick={() => handleRemoveMilestone(idx)}
                          sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            minWidth: "auto",
                            color: "#d32f2f",
                            fontSize: 10,
                            letterSpacing: 1
                          }}
                        >
                          Remove
                        </Button>

                        <Grid container spacing={2} sx={{ pt: 1 }}>
                          <Grid item xs={3}>
                            <TextField
                              label="Year/Label"
                              size="small"
                              fullWidth
                              value={milestone.year || ""}
                              onChange={(e) => handleMilestoneChange(idx, "year", e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              label="Milestone Title"
                              size="small"
                              fullWidth
                              value={milestone.title || ""}
                              onChange={(e) => handleMilestoneChange(idx, "title", e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Milestone Description"
                              size="small"
                              fullWidth
                              multiline
                              rows={2.5}
                              value={milestone.desc || ""}
                              onChange={(e) => handleMilestoneChange(idx, "desc", e.target.value)}
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </Box>
                </Paper>

                {/* 5. BRAND EDITORIAL QUOTE */}
                <Paper sx={{ p: 4, border: "1px solid #eaeaea", boxShadow: "none" }}>
                  <Typography variant="subtitle2" sx={{ letterSpacing: 1, textTransform: "uppercase", color: "#d4af37", fontWeight: "bold", mb: 3, fontSize: 11 }}>
                    Brand Editorial Quote
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                    <TextField
                      label="Editorial Quote Text"
                      size="small"
                      fullWidth
                      multiline
                      rows={3}
                      value={editorialQuoteText}
                      onChange={(e) => setEditorialQuoteText(e.target.value)}
                    />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          label="Author Name"
                          size="small"
                          fullWidth
                          value={editorialQuoteAuthor}
                          onChange={(e) => setEditorialQuoteAuthor(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Author Title / Designation"
                          size="small"
                          fullWidth
                          value={editorialQuoteTitle}
                          onChange={(e) => setEditorialQuoteTitle(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>

              </Box>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "#111111",
                  color: "#ffffff",
                  mt: 4,
                  mb: 6,
                  py: 1.4,
                  px: 6,
                  fontSize: 11,
                  letterSpacing: 2,
                  borderRadius: 0,
                  "&:hover": { bgcolor: "#d4af37", color: "#111111" }
                }}
              >
                Deploy Homepage Changes
              </Button>
            </Box>
          )}

          {/* VIEW: CONTACT SETTINGS */}
          {activeView === "contact" && (
            <Box component="form" onSubmit={handleSaveContact} sx={{ maxWidth: 800 }}>
              <Typography variant="h5" sx={{ fontFamily: "serif", mb: 1, color: "#111111" }}>
                Contact Settings
              </Typography>
              <Typography variant="body2" sx={{ color: "#888888", mb: 4, fontSize: 12 }}>
                Configure all communication channels, private concierge booking headlines, and showroom physical location.
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {/* 1. HEADER SECTION */}
                <Paper sx={{ p: 4, border: "1px solid #eaeaea", boxShadow: "none" }}>
                  <Typography variant="subtitle2" sx={{ letterSpacing: 1, textTransform: "uppercase", color: "#d4af37", fontWeight: "bold", mb: 3, fontSize: 11 }}>
                    Private Concierge Booking Header
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Badge Tag"
                        size="small"
                        fullWidth
                        value={contactBadge}
                        onChange={(e) => setContactBadge(e.target.value)}
                        placeholder="e.g. Private Concierge"
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        label="Booking Page Title"
                        size="small"
                        fullWidth
                        value={contactTitle}
                        onChange={(e) => setContactTitle(e.target.value)}
                        placeholder="e.g. Book a Consultation"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Introductory Description"
                        size="small"
                        fullWidth
                        multiline
                        rows={3}
                        value={contactDescription}
                        onChange={(e) => setContactDescription(e.target.value)}
                        placeholder="Enter the main explanation text for your scheduling system"
                      />
                    </Grid>
                  </Grid>
                </Paper>

                {/* 2. CHANNELS INFORMATION */}
                <Paper sx={{ p: 4, border: "1px solid #eaeaea", boxShadow: "none" }}>
                  <Typography variant="subtitle2" sx={{ letterSpacing: 1, textTransform: "uppercase", color: "#d4af37", fontWeight: "bold", mb: 3, fontSize: 11 }}>
                    Direct Channels & Location Info
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Channels Heading"
                        size="small"
                        fullWidth
                        value={contactChannelsTitle}
                        onChange={(e) => setContactChannelsTitle(e.target.value)}
                        placeholder="e.g. Direct Channels"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Telephone Helpline"
                        size="small"
                        fullWidth
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="e.g. +91 22 1234 5678"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Support Email Address"
                        size="small"
                        fullWidth
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="e.g. concierge@nakshtaragems.com"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Appointment Restriction / Footer Note"
                        size="small"
                        fullWidth
                        value={contactAppointmentNote}
                        onChange={(e) => setContactAppointmentNote(e.target.value)}
                        placeholder="e.g. By Appointment Only • Secure Showroom Access"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Desk Hours & Advisory Description"
                        size="small"
                        fullWidth
                        multiline
                        rows={3}
                        value={contactChannelsDescription}
                        onChange={(e) => setContactChannelsDescription(e.target.value)}
                        placeholder="Describe availability hours or client guidelines"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Showroom Mailing Address"
                        size="small"
                        fullWidth
                        multiline
                        rows={3.5}
                        value={contactAddress}
                        onChange={(e) => setContactAddress(e.target.value)}
                        placeholder="Provide the physical mailing location details"
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Box>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "#111111",
                  color: "#ffffff",
                  mt: 4,
                  mb: 6,
                  py: 1.4,
                  px: 6,
                  fontSize: 11,
                  letterSpacing: 2,
                  borderRadius: 0,
                  "&:hover": { bgcolor: "#d4af37", color: "#111111" }
                }}
              >
                Save Contact Settings
              </Button>
            </Box>
          )}

          {/* VIEW: PRODUCT CATALOG */}
          {activeView === "inventory" && (
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Typography variant="h5" sx={{ fontFamily: "serif", color: "#111111" }}>
                  Product Catalog Showcase
                </Typography>
                <Button
                  onClick={() => setActiveView("addProduct")}
                  variant="outlined"
                  color="inherit"
                  startIcon={<AddIcon />}
                  sx={{ fontSize: 11, letterSpacing: 1.5, py: 1, px: 2, borderColor: "#111111", color: "#111111", borderRadius: 0 }}
                >
                  Add Diamond / Jewellery
                </Button>
              </Box>

              <TableContainer component={Paper} sx={{ border: "1px solid #eaeaea", boxShadow: "none" }}>
                <Table>
                  <TableHead sx={{ bgcolor: "#fcfbfa" }}>
                    <TableRow>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>ID</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Name</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Category</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Price</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Stock Qty</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>In Stock</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase", textAlign: "right", pr: 3 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell sx={{ fontSize: 12, fontFamily: "monospace" }}>{row.id}</TableCell>
                        <TableCell sx={{ fontSize: 12 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            {row.name}
                            {row.draft && (
                              <Box
                                component="span"
                                sx={{
                                  fontSize: 8,
                                  fontWeight: "bold",
                                  bgcolor: "#f0f0f0",
                                  color: "#666666",
                                  px: 1,
                                  py: 0.3,
                                  borderRadius: 0.5,
                                  letterSpacing: 0.5,
                                  textTransform: "uppercase"
                                }}
                              >
                                Draft
                              </Box>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontSize: 12, textTransform: "capitalize" }}>{row.category}</TableCell>
                        <TableCell sx={{ fontSize: 12, fontWeight: "medium" }}>{formatPrice(row.price)}</TableCell>
                        <TableCell sx={{ fontSize: 12 }}>{row.stockCount !== undefined ? row.stockCount : 10}</TableCell>
                        <TableCell>
                          <Switch
                            checked={!!row.inStock}
                            onChange={() => handleToggleStock(row.id)}
                            disabled={row.stockCount === 0}
                            color="default"
                            sx={{
                              "& .MuiSwitch-switchBase.Mui-checked": { color: "#d4af37" },
                              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: "#d4af37" }
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ textAlign: "right", pr: 1 }}>
                          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                            <Button
                              size="small"
                              onClick={() => handleToggleDraft(row.id)}
                              sx={{
                                minWidth: 32,
                                width: 32,
                                height: 32,
                                color: row.draft ? "#aaaaaa" : "#d4af37",
                                "&:hover": { bgcolor: "rgba(0,0,0,0.04)" }
                              }}
                              title={row.draft ? "Publish Product" : "Save as Draft"}
                            >
                              {row.draft ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
                            </Button>
                            <Button
                              size="small"
                              onClick={() => handleEditProductClick(row)}
                              sx={{
                                minWidth: 32,
                                width: 32,
                                height: 32,
                                color: "#111111",
                                "&:hover": { bgcolor: "rgba(0,0,0,0.04)" }
                              }}
                              title="Edit Details"
                            >
                              <EditIcon sx={{ fontSize: 18 }} />
                            </Button>
                            <Button
                              size="small"
                              onClick={() => handleDeleteProduct(row.id)}
                              sx={{
                                minWidth: 32,
                                width: 32,
                                height: 32,
                                color: "#d32f2f",
                                "&:hover": { bgcolor: "rgba(211,47,47,0.08)" }
                              }}
                              title="Delete Product"
                            >
                              <DeleteIcon sx={{ fontSize: 18 }} />
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* VIEW: ADD PRODUCT (DEDICATED PAGE) */}
          {activeView === "addProduct" && (
            <Box>
              {/* Header with back button */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                <Button
                  onClick={() => setActiveView("inventory")}
                  startIcon={<ArrowBackIcon />}
                  sx={{ color: "#888888", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" }}
                >
                  Back to Catalog
                </Button>
              </Box>
              <Typography variant="h5" sx={{ fontFamily: "serif", color: "#111111", mb: 1 }}>
                Add New Product
              </Typography>
              <Typography variant="body2" sx={{ color: "#888888", mb: 4, fontSize: 12, letterSpacing: 0.5 }}>
                Fill in the product details and upload high-quality media for the storefront showcase.
              </Typography>

              <Grid container spacing={4}>
                {/* LEFT COLUMN: Product Details */}
                <Grid item xs={12} lg={7}>
                  <Paper sx={{ p: 4, border: "1px solid #eaeaea", boxShadow: "none" }}>
                    <Typography variant="subtitle2" sx={{ letterSpacing: 1.5, textTransform: "uppercase", color: "#888888", mb: 3, fontWeight: "bold", fontSize: 10 }}>
                      Product Information
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                      <TextField
                        label="Product Name"
                        size="small"
                        fullWidth
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="e.g. Natural Blue Sapphire Ring"
                      />
                      <TextField
                        select
                        label="Category"
                        size="small"
                        fullWidth
                        SelectProps={{ native: true }}
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      >
                        <option value="diamond">Loose Diamond</option>
                        <option value="jewellery">Fine Jewellery</option>
                        <option value="gemstone">Gemstones</option>
                      </TextField>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <TextField
                            label="Price (INR)"
                            size="small"
                            type="number"
                            fullWidth
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            label="Stock Quantity"
                            size="small"
                            type="number"
                            fullWidth
                            value={newProduct.stockCount}
                            onChange={(e) => setNewProduct({ ...newProduct, stockCount: e.target.value })}
                            inputProps={{ min: 0 }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            label="Rating (out of 5)"
                            size="small"
                            type="number"
                            fullWidth
                            value={newProduct.rating}
                            onChange={(e) => setNewProduct({ ...newProduct, rating: e.target.value })}
                            inputProps={{ min: 0, max: 5, step: 0.1 }}
                          />
                        </Grid>
                      </Grid>

                      {/* Conditional fields based on category */}
                      {newProduct.category === "diamond" && (
                        <>
                          <Typography variant="subtitle2" sx={{ letterSpacing: 1.5, textTransform: "uppercase", color: "#d4af37", mt: 1, fontWeight: "bold", fontSize: 10 }}>
                            Diamond Specifications
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <TextField label="Shape" size="small" fullWidth value={newProduct.shape} onChange={(e) => setNewProduct({ ...newProduct, shape: e.target.value })} />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField label="Carat Weight" size="small" type="number" fullWidth value={newProduct.carat} onChange={(e) => setNewProduct({ ...newProduct, carat: e.target.value })} />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField label="Cut Quality" size="small" fullWidth value={newProduct.cut} onChange={(e) => setNewProduct({ ...newProduct, cut: e.target.value })} />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField label="Color Grade" size="small" fullWidth value={newProduct.color} onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })} />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField label="Clarity Grade" size="small" fullWidth value={newProduct.clarity} onChange={(e) => setNewProduct({ ...newProduct, clarity: e.target.value })} />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField label="Lab Certificate" size="small" fullWidth value={newProduct.certificate} onChange={(e) => setNewProduct({ ...newProduct, certificate: e.target.value })} />
                            </Grid>
                          </Grid>
                        </>
                      )}

                      {newProduct.category === "gemstone" && (
                        <>
                          <Typography variant="subtitle2" sx={{ letterSpacing: 1.5, textTransform: "uppercase", color: "#d4af37", mt: 1, fontWeight: "bold", fontSize: 10 }}>
                            Gemstone Specifications
                          </Typography>
                          <TextField label="Gemstone Type" size="small" fullWidth value={newProduct.gemType} onChange={(e) => setNewProduct({ ...newProduct, gemType: e.target.value })} placeholder="e.g. Sapphire, Ruby, Emerald" />
                          <TextField label="Origin Country" size="small" fullWidth value={newProduct.origin} onChange={(e) => setNewProduct({ ...newProduct, origin: e.target.value })} placeholder="e.g. Ceylon, Madagascar" />
                          <TextField label="Treatment / Heat Status" size="small" fullWidth value={newProduct.treatment} onChange={(e) => setNewProduct({ ...newProduct, treatment: e.target.value })} placeholder="e.g. Natural (No Heat)" />
                          <TextField label="Metal (if mounted)" size="small" fullWidth value={newProduct.metal} onChange={(e) => setNewProduct({ ...newProduct, metal: e.target.value })} />
                          <TextField label="Collection" size="small" fullWidth value={newProduct.collection} onChange={(e) => setNewProduct({ ...newProduct, collection: e.target.value })} />
                        </>
                      )}

                      {newProduct.category === "jewellery" && (
                        <>
                          <Typography variant="subtitle2" sx={{ letterSpacing: 1.5, textTransform: "uppercase", color: "#d4af37", mt: 1, fontWeight: "bold", fontSize: 10 }}>
                            Jewellery Specifications
                          </Typography>
                          <TextField label="Metal Composition" size="small" fullWidth value={newProduct.metal} onChange={(e) => setNewProduct({ ...newProduct, metal: e.target.value })} />
                          <TextField label="Design Collection" size="small" fullWidth value={newProduct.collection} onChange={(e) => setNewProduct({ ...newProduct, collection: e.target.value })} />
                        </>
                      )}
                    </Box>
                  </Paper>
                </Grid>

                {/* RIGHT COLUMN: Media Upload */}
                <Grid item xs={12} lg={5}>
                  <Paper sx={{ p: 4, border: "1px solid #eaeaea", boxShadow: "none" }}>
                    <Typography variant="subtitle2" sx={{ letterSpacing: 1.5, textTransform: "uppercase", color: "#888888", mb: 1, fontWeight: "bold", fontSize: 10 }}>
                      Product Media
                    </Typography>
                    <Typography variant="caption" sx={{ display: "block", color: "#aaaaaa", mb: 3, lineHeight: 1.6 }}>
                      Upload high-quality product images and a short showcase video.
                      <br />
                      <strong>Images:</strong> Min 1000 × 1000 px &bull; Max 1 MB &bull; JPEG, PNG, or WebP
                      <br />
                      <strong>Video:</strong> Max 50 MB &bull; MP4 format &bull; Keep under 30 seconds
                    </Typography>

                    {/* Image Upload Grid */}
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      {["Main Image", "Image 2", "Image 3", "Image 4"].map((label, index) => (
                        <Grid item xs={6} key={index}>
                          <Box
                            sx={{
                              border: productImages[index] ? "2px solid #d4af37" : "2px dashed #d0d0d0",
                              borderRadius: 1,
                              height: 160,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              position: "relative",
                              overflow: "hidden",
                              bgcolor: productImages[index] ? "#000" : "#fafafa",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                borderColor: "#d4af37",
                                bgcolor: productImages[index] ? "#000" : "#f5f3ef"
                              }
                            }}
                          >
                            {productImages[index] ? (
                              <>
                                <Box
                                  component="img"
                                  src={productImages[index]!}
                                  alt={label}
                                  sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                                />
                                <Button
                                  onClick={() => handleRemoveProductMedia(index)}
                                  size="small"
                                  sx={{
                                    position: "absolute",
                                    top: 4,
                                    right: 4,
                                    minWidth: 28,
                                    width: 28,
                                    height: 28,
                                    borderRadius: "50%",
                                    bgcolor: "rgba(0,0,0,0.6)",
                                    color: "#fff",
                                    "&:hover": { bgcolor: "rgba(220,50,50,0.9)" }
                                  }}
                                >
                                  <DeleteIcon sx={{ fontSize: 16 }} />
                                </Button>
                                {index === 0 && (
                                  <Box sx={{
                                    position: "absolute", bottom: 0, left: 0, right: 0,
                                    bgcolor: "rgba(212,175,55,0.9)", py: 0.3,
                                    textAlign: "center"
                                  }}>
                                    <Typography sx={{ fontSize: 9, fontWeight: "bold", letterSpacing: 1.5, color: "#111", textTransform: "uppercase" }}>Main Image</Typography>
                                  </Box>
                                )}
                              </>
                            ) : (
                              <Box
                                component="label"
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "100%",
                                  height: "100%",
                                  cursor: "pointer"
                                }}
                              >
                                {uploadingMedia === index ? (
                                  <Typography sx={{ fontSize: 11, color: "#d4af37", letterSpacing: 1 }}>Uploading...</Typography>
                                ) : (
                                  <>
                                    {index === 0 ? (
                                      <ImageIcon sx={{ fontSize: 32, color: "#d4af37", mb: 0.5 }} />
                                    ) : (
                                      <CloudUploadIcon sx={{ fontSize: 28, color: "#c0c0c0", mb: 0.5 }} />
                                    )}
                                    <Typography sx={{ fontSize: 10, color: index === 0 ? "#d4af37" : "#aaaaaa", fontWeight: index === 0 ? "bold" : "normal", letterSpacing: 1, textTransform: "uppercase" }}>
                                      {label}
                                    </Typography>
                                    <Typography sx={{ fontSize: 9, color: "#c0c0c0", mt: 0.5 }}>
                                      1000×1000 px &bull; &lt; 1 MB
                                    </Typography>
                                  </>
                                )}
                                <input
                                  type="file"
                                  accept="image/jpeg,image/png,image/webp"
                                  hidden
                                  onChange={(e) => handleProductMediaUpload(e, index)}
                                />
                              </Box>
                            )}
                          </Box>
                        </Grid>
                      ))}
                    </Grid>

                    {/* Video Upload */}
                    <Box
                      sx={{
                        border: productVideo ? "2px solid #d4af37" : "2px dashed #d0d0d0",
                        borderRadius: 1,
                        height: 120,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        overflow: "hidden",
                        bgcolor: productVideo ? "#000" : "#fafafa",
                        transition: "all 0.2s ease",
                        "&:hover": { borderColor: "#d4af37" }
                      }}
                    >
                      {productVideo ? (
                        <>
                          <Box component="video" src={productVideo} sx={{ width: "100%", height: "100%", objectFit: "contain" }} muted />
                          <Button
                            onClick={() => handleRemoveProductMedia(4)}
                            size="small"
                            sx={{
                              position: "absolute",
                              top: 4,
                              right: 4,
                              minWidth: 28,
                              width: 28,
                              height: 28,
                              borderRadius: "50%",
                              bgcolor: "rgba(0,0,0,0.6)",
                              color: "#fff",
                              "&:hover": { bgcolor: "rgba(220,50,50,0.9)" }
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: 16 }} />
                          </Button>
                          <Box sx={{
                            position: "absolute", bottom: 0, left: 0, right: 0,
                            bgcolor: "rgba(212,175,55,0.9)", py: 0.3,
                            textAlign: "center"
                          }}>
                            <Typography sx={{ fontSize: 9, fontWeight: "bold", letterSpacing: 1.5, color: "#111", textTransform: "uppercase" }}>Product Video</Typography>
                          </Box>
                        </>
                      ) : (
                        <Box
                          component="label"
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer"
                          }}
                        >
                          {uploadingMedia === 4 ? (
                            <Typography sx={{ fontSize: 11, color: "#d4af37", letterSpacing: 1 }}>Uploading...</Typography>
                          ) : (
                            <>
                              <VideocamIcon sx={{ fontSize: 32, color: "#c0c0c0", mb: 0.5 }} />
                              <Typography sx={{ fontSize: 10, color: "#aaaaaa", letterSpacing: 1, textTransform: "uppercase" }}>
                                Short Showcase Video
                              </Typography>
                              <Typography sx={{ fontSize: 9, color: "#c0c0c0", mt: 0.5 }}>
                                MP4 &bull; &lt; 50 MB &bull; Under 30 sec
                              </Typography>
                            </>
                          )}
                          <input
                            type="file"
                            accept="video/mp4,video/webm"
                            hidden
                            onChange={(e) => handleProductMediaUpload(e, 4)}
                          />
                        </Box>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              {/* Publish Button */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4, mb: 4 }}>
                <Button
                  onClick={() => setActiveView("inventory")}
                  sx={{ color: "#888888", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", px: 3, py: 1.2, borderRadius: 0 }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddProduct}
                  variant="contained"
                  sx={{
                    bgcolor: "#111111",
                    color: "#ffffff",
                    py: 1.2,
                    px: 5,
                    fontSize: 11,
                    letterSpacing: 2,
                    borderRadius: 0,
                    "&:hover": { bgcolor: "#d4af37", color: "#111111" }
                  }}
                >
                  Publish Product
                </Button>
              </Box>
            </Box>
          )}

          {/* VIEW: EDIT PRODUCT (DEDICATED PAGE) */}
          {activeView === "editProduct" && (
            <Box>
              {/* Header with back button */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                <Button
                  onClick={() => {
                    setActiveView("inventory");
                    setEditingProductId(null);
                  }}
                  startIcon={<ArrowBackIcon />}
                  sx={{ color: "#888888", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" }}
                >
                  Back to Catalog
                </Button>
              </Box>
              <Typography variant="h5" sx={{ fontFamily: "serif", color: "#111111", mb: 1 }}>
                Edit Product Creation: <span style={{ fontFamily: "monospace", fontSize: 18, color: "#d4af37" }}>{editingProductId}</span>
              </Typography>
              <Typography variant="body2" sx={{ color: "#888888", mb: 4, fontSize: 12, letterSpacing: 0.5 }}>
                Modify product details, category specific specifications, and showcase media files below.
              </Typography>

              <Grid container spacing={4}>
                {/* LEFT COLUMN: Product Details */}
                <Grid item xs={12} lg={7}>
                  <Paper sx={{ p: 4, border: "1px solid #eaeaea", boxShadow: "none" }}>
                    <Typography variant="subtitle2" sx={{ letterSpacing: 1.5, textTransform: "uppercase", color: "#888888", mb: 3, fontWeight: "bold", fontSize: 10 }}>
                      Product Information
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                      <TextField
                        label="Product Name"
                        size="small"
                        fullWidth
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="e.g. Natural Blue Sapphire Ring"
                      />
                      <TextField
                        select
                        label="Category"
                        size="small"
                        fullWidth
                        SelectProps={{ native: true }}
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      >
                        <option value="diamond">Loose Diamond</option>
                        <option value="jewellery">Fine Jewellery</option>
                        <option value="gemstone">Gemstones</option>
                      </TextField>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <TextField
                            label="Price (INR)"
                            size="small"
                            type="number"
                            fullWidth
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            label="Stock Quantity"
                            size="small"
                            type="number"
                            fullWidth
                            value={newProduct.stockCount}
                            onChange={(e) => setNewProduct({ ...newProduct, stockCount: e.target.value })}
                            inputProps={{ min: 0 }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            label="Rating (out of 5)"
                            size="small"
                            type="number"
                            fullWidth
                            value={newProduct.rating}
                            onChange={(e) => setNewProduct({ ...newProduct, rating: e.target.value })}
                            inputProps={{ min: 0, max: 5, step: 0.1 }}
                          />
                        </Grid>
                      </Grid>

                      {/* Conditional fields based on category */}
                      {newProduct.category === "diamond" && (
                        <>
                          <Typography variant="subtitle2" sx={{ letterSpacing: 1.5, textTransform: "uppercase", color: "#d4af37", mt: 1, fontWeight: "bold", fontSize: 10 }}>
                            Diamond Specifications
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <TextField label="Shape" size="small" fullWidth value={newProduct.shape} onChange={(e) => setNewProduct({ ...newProduct, shape: e.target.value })} />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField label="Carat Weight" size="small" type="number" fullWidth value={newProduct.carat} onChange={(e) => setNewProduct({ ...newProduct, carat: e.target.value })} />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField label="Cut Quality" size="small" fullWidth value={newProduct.cut} onChange={(e) => setNewProduct({ ...newProduct, cut: e.target.value })} />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField label="Color Grade" size="small" fullWidth value={newProduct.color} onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })} />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField label="Clarity Grade" size="small" fullWidth value={newProduct.clarity} onChange={(e) => setNewProduct({ ...newProduct, clarity: e.target.value })} />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField label="Lab Certificate" size="small" fullWidth value={newProduct.certificate} onChange={(e) => setNewProduct({ ...newProduct, certificate: e.target.value })} />
                            </Grid>
                          </Grid>
                        </>
                      )}

                      {newProduct.category === "gemstone" && (
                        <>
                          <Typography variant="subtitle2" sx={{ letterSpacing: 1.5, textTransform: "uppercase", color: "#d4af37", mt: 1, fontWeight: "bold", fontSize: 10 }}>
                            Gemstone Specifications
                          </Typography>
                          <TextField label="Gemstone Type" size="small" fullWidth value={newProduct.gemType} onChange={(e) => setNewProduct({ ...newProduct, gemType: e.target.value })} placeholder="e.g. Sapphire, Ruby, Emerald" />
                          <TextField label="Origin Country" size="small" fullWidth value={newProduct.origin} onChange={(e) => setNewProduct({ ...newProduct, origin: e.target.value })} placeholder="e.g. Ceylon, Madagascar" />
                          <TextField label="Treatment / Heat Status" size="small" fullWidth value={newProduct.treatment} onChange={(e) => setNewProduct({ ...newProduct, treatment: e.target.value })} placeholder="e.g. Natural (No Heat)" />
                          <TextField label="Metal (if mounted)" size="small" fullWidth value={newProduct.metal} onChange={(e) => setNewProduct({ ...newProduct, metal: e.target.value })} />
                          <TextField label="Collection" size="small" fullWidth value={newProduct.collection} onChange={(e) => setNewProduct({ ...newProduct, collection: e.target.value })} />
                        </>
                      )}

                      {newProduct.category === "jewellery" && (
                        <>
                          <Typography variant="subtitle2" sx={{ letterSpacing: 1.5, textTransform: "uppercase", color: "#d4af37", mt: 1, fontWeight: "bold", fontSize: 10 }}>
                            Jewellery Specifications
                          </Typography>
                          <TextField label="Metal Composition" size="small" fullWidth value={newProduct.metal} onChange={(e) => setNewProduct({ ...newProduct, metal: e.target.value })} />
                          <TextField label="Design Collection" size="small" fullWidth value={newProduct.collection} onChange={(e) => setNewProduct({ ...newProduct, collection: e.target.value })} />
                        </>
                      )}
                    </Box>
                  </Paper>
                </Grid>

                {/* RIGHT COLUMN: Media Upload */}
                <Grid item xs={12} lg={5}>
                  <Paper sx={{ p: 4, border: "1px solid #eaeaea", boxShadow: "none" }}>
                    <Typography variant="subtitle2" sx={{ letterSpacing: 1.5, textTransform: "uppercase", color: "#888888", mb: 1, fontWeight: "bold", fontSize: 10 }}>
                      Product Media
                    </Typography>
                    <Typography variant="caption" sx={{ display: "block", color: "#aaaaaa", mb: 3, lineHeight: 1.6 }}>
                      Upload high-quality product images and a short showcase video.
                      <br />
                      <strong>Images:</strong> Min 1000 × 1000 px &bull; Max 1 MB &bull; JPEG, PNG, or WebP
                      <br />
                      <strong>Video:</strong> Max 50 MB &bull; MP4 format &bull; Keep under 30 seconds
                    </Typography>

                    {/* Image Upload Grid */}
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      {["Main Image", "Image 2", "Image 3", "Image 4"].map((label, index) => (
                        <Grid item xs={6} key={index}>
                          <Box
                            sx={{
                              border: productImages[index] ? "2px solid #d4af37" : "2px dashed #d0d0d0",
                              borderRadius: 1,
                              height: 160,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              position: "relative",
                              overflow: "hidden",
                              bgcolor: productImages[index] ? "#000" : "#fafafa",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                borderColor: "#d4af37",
                                bgcolor: productImages[index] ? "#000" : "#f5f3ef"
                              }
                            }}
                          >
                            {productImages[index] ? (
                              <>
                                <Box
                                  component="img"
                                  src={productImages[index]!}
                                  alt={label}
                                  sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                                />
                                <Button
                                  onClick={() => handleRemoveProductMedia(index)}
                                  size="small"
                                  sx={{
                                    position: "absolute",
                                    top: 4,
                                    right: 4,
                                    minWidth: 28,
                                    width: 28,
                                    height: 28,
                                    borderRadius: "50%",
                                    bgcolor: "rgba(0,0,0,0.6)",
                                    color: "#fff",
                                    "&:hover": { bgcolor: "rgba(220,50,50,0.9)" }
                                  }}
                                >
                                  <DeleteIcon sx={{ fontSize: 16 }} />
                                </Button>
                                {index === 0 && (
                                  <Box sx={{
                                    position: "absolute", bottom: 0, left: 0, right: 0,
                                    bgcolor: "rgba(212,175,55,0.9)", py: 0.3,
                                    textAlign: "center"
                                  }}>
                                    <Typography sx={{ fontSize: 9, fontWeight: "bold", letterSpacing: 1.5, color: "#111", textTransform: "uppercase" }}>Main Image</Typography>
                                  </Box>
                                )}
                              </>
                            ) : (
                              <Box
                                component="label"
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "100%",
                                  height: "100%",
                                  cursor: "pointer"
                                }}
                              >
                                {uploadingMedia === index ? (
                                  <Typography sx={{ fontSize: 11, color: "#d4af37", letterSpacing: 1 }}>Uploading...</Typography>
                                ) : (
                                  <>
                                    {index === 0 ? (
                                      <ImageIcon sx={{ fontSize: 32, color: "#d4af37", mb: 0.5 }} />
                                    ) : (
                                      <CloudUploadIcon sx={{ fontSize: 28, color: "#c0c0c0", mb: 0.5 }} />
                                    )}
                                    <Typography sx={{ fontSize: 10, color: index === 0 ? "#d4af37" : "#aaaaaa", fontWeight: index === 0 ? "bold" : "normal", letterSpacing: 1, textTransform: "uppercase" }}>
                                      {label}
                                    </Typography>
                                    <Typography sx={{ fontSize: 9, color: "#c0c0c0", mt: 0.5 }}>
                                      1000×1000 px &bull; &lt; 1 MB
                                    </Typography>
                                  </>
                                )}
                                <input
                                  type="file"
                                  accept="image/jpeg,image/png,image/webp"
                                  hidden
                                  onChange={(e) => handleProductMediaUpload(e, index)}
                                />
                              </Box>
                            )}
                          </Box>
                        </Grid>
                      ))}
                    </Grid>

                    {/* Video Upload */}
                    <Box
                      sx={{
                        border: productVideo ? "2px solid #d4af37" : "2px dashed #d0d0d0",
                        borderRadius: 1,
                        height: 120,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        overflow: "hidden",
                        bgcolor: productVideo ? "#000" : "#fafafa",
                        transition: "all 0.2s ease",
                        "&:hover": { borderColor: "#d4af37" }
                      }}
                    >
                      {productVideo ? (
                        <>
                          <Box component="video" src={productVideo} sx={{ width: "100%", height: "100%", objectFit: "contain" }} muted />
                          <Button
                            onClick={() => handleRemoveProductMedia(4)}
                            size="small"
                            sx={{
                              position: "absolute",
                              top: 4,
                              right: 4,
                              minWidth: 28,
                              width: 28,
                              height: 28,
                              borderRadius: "50%",
                              bgcolor: "rgba(0,0,0,0.6)",
                              color: "#fff",
                              "&:hover": { bgcolor: "rgba(220,50,50,0.9)" }
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: 16 }} />
                          </Button>
                          <Box sx={{
                            position: "absolute", bottom: 0, left: 0, right: 0,
                            bgcolor: "rgba(212,175,55,0.9)", py: 0.3,
                            textAlign: "center"
                          }}>
                            <Typography sx={{ fontSize: 9, fontWeight: "bold", letterSpacing: 1.5, color: "#111", textTransform: "uppercase" }}>Product Video</Typography>
                          </Box>
                        </>
                      ) : (
                        <Box
                          component="label"
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer"
                          }}
                        >
                          {uploadingMedia === 4 ? (
                            <Typography sx={{ fontSize: 11, color: "#d4af37", letterSpacing: 1 }}>Uploading...</Typography>
                          ) : (
                            <>
                              <VideocamIcon sx={{ fontSize: 32, color: "#c0c0c0", mb: 0.5 }} />
                              <Typography sx={{ fontSize: 10, color: "#aaaaaa", letterSpacing: 1, textTransform: "uppercase" }}>
                                Short Showcase Video
                              </Typography>
                              <Typography sx={{ fontSize: 9, color: "#c0c0c0", mt: 0.5 }}>
                                MP4 &bull; &lt; 50 MB &bull; Under 30 sec
                              </Typography>
                            </>
                          )}
                          <input
                            type="file"
                            accept="video/mp4,video/webm"
                            hidden
                            onChange={(e) => handleProductMediaUpload(e, 4)}
                          />
                        </Box>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              {/* Action Buttons */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4, mb: 4 }}>
                <Button
                  onClick={() => {
                    setActiveView("inventory");
                    setEditingProductId(null);
                  }}
                  sx={{ color: "#888888", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", px: 3, py: 1.2, borderRadius: 0 }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateProduct}
                  variant="contained"
                  sx={{
                    bgcolor: "#111111",
                    color: "#ffffff",
                    py: 1.2,
                    px: 5,
                    fontSize: 11,
                    letterSpacing: 2,
                    borderRadius: 0,
                    "&:hover": { bgcolor: "#d4af37", color: "#111111" }
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </Box>
          )}

          {/* VIEW: ABOUT & HERITAGE */}
          {activeView === "about" && (
            <Box component="form" onSubmit={handleSaveAbout} sx={{ maxWidth: 800 }}>
              <Typography variant="h5" sx={{ fontFamily: "serif", mb: 4, color: "#111111" }}>
                Edit Maison Story & About Settings
              </Typography>
              <Paper sx={{ p: 4, border: "1px solid #eaeaea", boxShadow: "none", mb: 4 }}>
                <Typography variant="subtitle2" sx={{ letterSpacing: 1, textTransform: "uppercase", color: "#d4af37", fontWeight: "bold", mb: 3, fontSize: 11 }}>
                  Maison Story & Heritage
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" sx={{ letterSpacing: 1, textTransform: "uppercase", display: "block", mb: 1, color: "#888888", fontWeight: "bold" }}>
                    Heritage Title
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={aboutTitle}
                    onChange={(e) => setAboutTitle(e.target.value)}
                  />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" sx={{ letterSpacing: 1, textTransform: "uppercase", display: "block", mb: 1, color: "#888888", fontWeight: "bold" }}>
                    Introductory Description
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={aboutDescription}
                    onChange={(e) => setAboutDescription(e.target.value)}
                  />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" sx={{ letterSpacing: 1, textTransform: "uppercase", display: "block", mb: 1, color: "#888888", fontWeight: "bold" }}>
                    Historical Origins Text
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    value={aboutOrigins}
                    onChange={(e) => setAboutOrigins(e.target.value)}
                  />
                </Box>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="caption" sx={{ letterSpacing: 1, textTransform: "uppercase", display: "block", mb: 1, color: "#888888", fontWeight: "bold" }}>
                    Atelier Brand Quote
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    value={aboutQuote}
                    onChange={(e) => setAboutQuote(e.target.value)}
                  />
                </Box>
              </Paper>

              <Paper sx={{ p: 4, border: "1px solid #eaeaea", boxShadow: "none", mb: 4 }}>
                <Typography variant="subtitle2" sx={{ letterSpacing: 1, textTransform: "uppercase", color: "#d4af37", fontWeight: "bold", mb: 3, fontSize: 11 }}>
                  Maison Ethical Promises
                </Typography>
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Promises Section Title"
                      size="small"
                      fullWidth
                      value={promisesTitle}
                      onChange={(e) => setPromisesTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Promises Section Subtitle"
                      size="small"
                      fullWidth
                      value={promisesSubtitle}
                      onChange={(e) => setPromisesSubtitle(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  {aboutPromises.map((promise, idx) => (
                    <Grid item xs={12} md={4} key={idx}>
                      <Paper variant="outlined" sx={{ p: 2.5, bgcolor: "#fafafa" }}>
                        <Typography variant="caption" sx={{ fontWeight: "bold", color: "#888888", display: "block", mb: 2 }}>
                          Promise Card {idx + 1}
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          <TextField
                            label="Card Title"
                            size="small"
                            fullWidth
                            value={promise.title || ""}
                            onChange={(e) => handlePromiseChange(idx, "title", e.target.value)}
                          />
                          <TextField
                            label="Card Description"
                            size="small"
                            fullWidth
                            multiline
                            rows={4}
                            value={promise.desc || ""}
                            onChange={(e) => handlePromiseChange(idx, "desc", e.target.value)}
                          />
                          <TextField
                            label="Icon ID"
                            size="small"
                            fullWidth
                            value={promise.icon || ""}
                            onChange={(e) => handlePromiseChange(idx, "icon", e.target.value)}
                            placeholder="BookOpen, ShieldAlert, or Award"
                          />
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Paper>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "#111111",
                  color: "#ffffff",
                  py: 1.4,
                  px: 6,
                  fontSize: 11,
                  letterSpacing: 2,
                  borderRadius: 0,
                  "&:hover": { bgcolor: "#d4af37", color: "#111111" }
                }}
              >
                Save About Settings
              </Button>
            </Box>
          )}

          {/* VIEW: COLLECTIONS HUB */}
          {activeView === "collections" && (
            <Box>
              <Typography variant="h5" sx={{ fontFamily: "serif", mb: 4, color: "#111111" }}>
                Collections Showcase Configuration
              </Typography>
              <TableContainer component={Paper} sx={{ border: "1px solid #eaeaea", boxShadow: "none" }}>
                <Table>
                  <TableHead sx={{ bgcolor: "#fcfbfa" }}>
                    <TableRow>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Name</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Badge</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Description</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {collections.map((col, idx) => (
                      <TableRow key={idx}>
                        <TableCell sx={{ fontSize: 12, fontWeight: "semibold" }}>{col.name}</TableCell>
                        <TableCell sx={{ fontSize: 11, fontStyle: "italic" }}>{col.badge}</TableCell>
                        <TableCell sx={{ fontSize: 12, maxWidth: 300 }}>{col.desc}</TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            variant="outlined"
                            color="inherit"
                            onClick={() => handleOpenEditCollection(idx)}
                            sx={{ fontSize: 10, py: 0.5, px: 1.5, borderColor: "#cccccc" }}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* VIEW: CONSULTATIONS */}
          {activeView === "bookings" && (
            <Box>
              <Typography variant="h5" sx={{ fontFamily: "serif", mb: 4, color: "#111111" }}>
                Consultations Calendar Scheduler
              </Typography>
              <TableContainer component={Paper} sx={{ border: "1px solid #eaeaea", boxShadow: "none" }}>
                <Table>
                  <TableHead sx={{ bgcolor: "#fcfbfa" }}>
                    <TableRow>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>ID</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Client</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Email</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Mode</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Preferred Date</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Time Slot</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookings.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell sx={{ fontSize: 12 }}>{row.id}</TableCell>
                        <TableCell sx={{ fontSize: 12, fontWeight: "medium" }}>{row.client}</TableCell>
                        <TableCell sx={{ fontSize: 12 }}>{row.email}</TableCell>
                        <TableCell sx={{ fontSize: 12 }}>{row.type}</TableCell>
                        <TableCell sx={{ fontSize: 12 }}>{row.date}</TableCell>
                        <TableCell sx={{ fontSize: 12 }}>{row.slot}</TableCell>
                        <TableCell sx={{ fontSize: 12, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* VIEW: ORDERS */}
          {activeView === "orders" && (
            <Box>
              <Typography variant="h5" sx={{ fontFamily: "serif", mb: 4, color: "#111111" }}>
                Client Order Registry & Fulfilment
              </Typography>
              <TableContainer component={Paper} sx={{ border: "1px solid #eaeaea", boxShadow: "none" }}>
                <Table>
                  <TableHead sx={{ bgcolor: "#fcfbfa" }}>
                    <TableRow>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Order ID</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Client / Contact</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Shipping Address</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Creations Ordered</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Total (INR)</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Status</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase", textAlign: "right" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} sx={{ fontSize: 12, textAlign: "center", py: 4, color: "#888888" }}>
                          No client orders placed yet.
                        </TableCell>
                      </TableRow>
                    ) : (
                      orders.map((order) => {
                        const nextStatusMap: Record<string, string> = {
                          "Manifested": "Pick Up",
                          "Picked Up": "Ship In-Transit",
                          "In Transit": "Out for Delivery",
                          "Out for Delivery": "Deliver"
                        };
                        const nextActionLabel = nextStatusMap[order.shiprocketStatus];

                        return (
                          <TableRow key={order.id}>
                            <TableCell sx={{ fontSize: 12, fontWeight: "bold" }}>
                              {order.id}
                              <Typography variant="caption" display="block" sx={{ color: "#666" }}>
                                {order.date}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ fontSize: 12 }}>
                              <Typography variant="body2" sx={{ fontWeight: "medium", fontSize: 12 }}>
                                {order.shippingDetails?.name}
                              </Typography>
                              <Typography variant="caption" display="block" sx={{ color: "#666" }}>
                                Tel: {order.shippingDetails?.phone}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ fontSize: 12, maxWidth: 200 }}>
                              {order.shippingDetails?.address}
                              <Typography variant="caption" display="block" sx={{ color: "#888" }}>
                                PIN: {order.shippingDetails?.pincode}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ fontSize: 12 }}>
                              {order.items?.map((item: any, idx: number) => (
                                <Box key={idx} sx={{ mb: 0.5 }}>
                                  {item.product?.name} (x{item.quantity})
                                </Box>
                              ))}
                            </TableCell>
                            <TableCell sx={{ fontSize: 12, fontWeight: "semibold" }}>
                              {new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: "INR",
                                maximumFractionDigits: 0
                              }).format(order.total)}
                            </TableCell>
                            <TableCell sx={{ fontSize: 12 }}>
                              <Box
                                component="span"
                                sx={{
                                  px: 1.5,
                                  py: 0.5,
                                  borderRadius: "12px",
                                  fontSize: "10px",
                                  fontWeight: "bold",
                                  textTransform: "uppercase",
                                  bgcolor: order.shiprocketStatus === "Delivered" ? "#e6f4ea" : "#fff8e1",
                                  color: order.shiprocketStatus === "Delivered" ? "#137333" : "#b06000",
                                  border: order.shiprocketStatus === "Delivered" ? "1px solid #137333" : "1px solid #b06000"
                                }}
                              >
                                {order.shiprocketStatus}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ fontSize: 12, textAlign: "right" }}>
                              <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                                {nextActionLabel && (
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => advanceOrderStatus(order.id)}
                                    sx={{
                                      fontSize: 10,
                                      color: "#d4af37",
                                      borderColor: "#d4af37",
                                      "&:hover": {
                                        borderColor: "#b8972f",
                                        bgcolor: "rgba(212, 175, 55, 0.05)"
                                      }
                                    }}
                                  >
                                    {nextActionLabel}
                                  </Button>
                                )}
                                <Button
                                  variant="outlined"
                                  color="error"
                                  size="small"
                                  onClick={() => deleteOrder(order.id)}
                                  sx={{ fontSize: 10 }}
                                >
                                  Cancel
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* VIEW: REGISTERED USERS */}
          {activeView === "users" && (
            <Box>
              <Typography variant="h5" sx={{ fontFamily: "serif", mb: 4, color: "#111111" }}>
                Client Registry (Registered Accounts)
              </Typography>
              <TableContainer component={Paper} sx={{ border: "1px solid #eaeaea", boxShadow: "none" }}>
                <Table>
                  <TableHead sx={{ bgcolor: "#fcfbfa" }}>
                    <TableRow>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Client Name</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Email Address</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Phone</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Address</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Ring Size</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Preferred Metal</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Registered</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase", textAlign: "right" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} sx={{ fontSize: 12, textAlign: "center", py: 4, color: "#888888" }}>
                          No registered accounts found in database.
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((client: any, idx: number) => (
                        <TableRow key={idx}>
                          <TableCell sx={{ fontSize: 12, fontWeight: "semibold" }}>{client.name}</TableCell>
                          <TableCell sx={{ fontSize: 12 }}>{client.email}</TableCell>
                          <TableCell sx={{ fontSize: 12 }}>{client.phone || "—"}</TableCell>
                          <TableCell sx={{ fontSize: 12 }}>{client.address || "—"}{client.pincode ? `, ${client.pincode}` : ""}</TableCell>
                          <TableCell sx={{ fontSize: 12 }}>{client.ringSize || "—"}</TableCell>
                          <TableCell sx={{ fontSize: 12 }}>{client.preferredMetal || "—"}</TableCell>
                          <TableCell sx={{ fontSize: 12 }}>{client.createdAt ? new Date(client.createdAt).toLocaleDateString("en-IN") : "N/A"}</TableCell>
                          <TableCell sx={{ fontSize: 12, textAlign: "right" }}>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => deleteUser(client.email)}
                              sx={{ fontSize: 10 }}
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* VIEW: COURIER SERVICES */}
          {activeView === "courier" && (
            <Box>
              <Typography variant="h5" sx={{ fontFamily: "serif", mb: 4, color: "#111111" }}>
                Courier Logistics & Fulfilment Hub
              </Typography>
              <TableContainer component={Paper} sx={{ border: "1px solid #eaeaea", boxShadow: "none" }}>
                <Table>
                  <TableHead sx={{ bgcolor: "#fcfbfa" }}>
                    <TableRow>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Order Info</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Carrier / AWB</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Recipient Shipping Info</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Current Stage</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Logistics History Timeline</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase", textAlign: "right" }}>Courier Workflow Steps</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} sx={{ fontSize: 12, textAlign: "center", py: 4, color: "#888888" }}>
                          No client orders placed yet.
                        </TableCell>
                      </TableRow>
                    ) : (
                      orders.map((order) => {
                        const hasCourier = !!order.courierDetails?.awbNumber;

                        return (
                          <TableRow key={order.id}>
                            <TableCell sx={{ fontSize: 12, fontWeight: "bold" }}>
                              {order.id}
                              <Typography variant="caption" display="block" sx={{ color: "#666" }}>
                                Date: {order.date}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ fontSize: 12 }}>
                              {hasCourier ? (
                                <>
                                  <Typography variant="body2" sx={{ fontWeight: "semibold", fontSize: 12 }}>
                                    {order.courierDetails?.carrier}
                                  </Typography>
                                  <Typography variant="caption" display="block" sx={{ color: "#666", fontFamily: "monospace" }}>
                                    AWB: {order.courierDetails?.awbNumber}
                                  </Typography>
                                </>
                              ) : (
                                <Typography variant="caption" sx={{ color: "#b8972f", fontWeight: "bold", textTransform: "uppercase" }}>
                                  Unassigned
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell sx={{ fontSize: 12 }}>
                              <Typography variant="body2" sx={{ fontWeight: "medium", fontSize: 12 }}>
                                {order.shippingDetails?.name}
                              </Typography>
                              <Typography variant="caption" display="block" sx={{ color: "#666" }}>
                                {order.shippingDetails?.address}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ fontSize: 12 }}>
                              <Box
                                component="span"
                                sx={{
                                  px: 1.5,
                                  py: 0.5,
                                  borderRadius: "12px",
                                  fontSize: "9px",
                                  fontWeight: "bold",
                                  textTransform: "uppercase",
                                  bgcolor: order.shiprocketStatus === "Delivered" ? "#e6f4ea" : "#fff8e1",
                                  color: order.shiprocketStatus === "Delivered" ? "#137333" : "#b06000",
                                  border: order.shiprocketStatus === "Delivered" ? "1px solid #137333" : "1px solid #b06000"
                                }}
                              >
                                {order.shiprocketStatus}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ fontSize: 11, maxWidth: 300 }}>
                              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                {order.shiprocketHistory?.slice(-2).map((h: any, i: number) => (
                                  <Box key={i} sx={{ borderLeft: "2px solid #d4af37", pl: 1 }}>
                                    <Typography variant="caption" sx={{ fontWeight: "bold", display: "block" }}>
                                      {h.status} ({h.location})
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: "#666", fontSize: 10 }}>
                                      {h.description}
                                    </Typography>
                                  </Box>
                                ))}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ fontSize: 12, textAlign: "right" }}>
                              <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", flexWrap: "wrap", maxWidth: 220 }}>
                                {!hasCourier ? (
                                  <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => {
                                      setSelectedOrderForCourier(order);
                                      setCourierAWB(`NS-AWB-${Math.floor(100000 + Math.random() * 900000)}`);
                                      setOpenCourierDialog(true);
                                    }}
                                    sx={{
                                      fontSize: 10,
                                      bgcolor: "#111111",
                                      color: "#ffffff",
                                      "&:hover": { bgcolor: "#d4af37", color: "#111111" }
                                    }}
                                  >
                                    Assign Courier
                                  </Button>
                                ) : (
                                  <>
                                    {order.shiprocketStatus === "Manifested" && (
                                      <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => {
                                          const updatedOrders = orders.map((o) => {
                                            if (o.id !== order.id) return o;
                                            return {
                                              ...o,
                                              shiprocketStatus: "Picked Up",
                                              shiprocketHistory: [
                                                ...(o.shiprocketHistory || []),
                                                {
                                                  time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                                                  status: "Order Picked Up",
                                                  location: "Shiprocket Hub, Mumbai",
                                                  description: `Package picked up by ${o.courierDetails?.carrier || "FedEx"} delivery executive. Dispatched to regional sorting center.`
                                                }
                                              ]
                                            };
                                          });
                                          setOrders(updatedOrders);
                                          saveDatabase({ ...db, orders: updatedOrders });
                                        }}
                                        sx={{ fontSize: 10, color: "#d4af37", borderColor: "#d4af37" }}
                                      >
                                        Mark Picked Up
                                      </Button>
                                    )}

                                    {(order.shiprocketStatus === "Picked Up" || order.shiprocketStatus === "In Transit") && (
                                      <>
                                        <Button
                                          variant="outlined"
                                          size="small"
                                          onClick={() => {
                                            setSelectedOrderForCourier(order);
                                            setOpenCheckpointDialog(true);
                                          }}
                                          sx={{ fontSize: 10, color: "#111111", borderColor: "#111111" }}
                                        >
                                          Add Transit Log
                                        </Button>

                                        <Button
                                          variant="outlined"
                                          size="small"
                                          onClick={() => {
                                            setSelectedOrderForCourier(order);
                                            setOpenDeliveryAgentDialog(true);
                                          }}
                                          sx={{ fontSize: 10, color: "#d4af37", borderColor: "#d4af37" }}
                                        >
                                          Out For Delivery
                                        </Button>
                                      </>
                                    )}

                                    {order.shiprocketStatus === "Out for Delivery" && (
                                      <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => {
                                          setSelectedOrderForCourier(order);
                                          setOpenHandoverDialog(true);
                                        }}
                                        sx={{
                                          fontSize: 10,
                                          bgcolor: "#d4af37",
                                          color: "#111111",
                                          "&:hover": { bgcolor: "#111111", color: "#ffffff" }
                                        }}
                                      >
                                        Mark Delivered
                                      </Button>
                                    )}

                                    {order.shiprocketStatus === "Delivered" && (
                                      <Typography variant="caption" sx={{ color: "#137333", fontWeight: "bold" }}>
                                        Completed
                                      </Typography>
                                    )}
                                  </>
                                )}
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* VIEW: MAISON JOURNAL */}
          {activeView === "blog" && (
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Typography variant="h5" sx={{ fontFamily: "serif", color: "#111111" }}>
                  Maison Editorial Journal (Diamond Education)
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    setEditingBlogPost(null);
                    setBlogForm({ title: "", excerpt: "", category: "Education", date: "" });
                    setOpenBlogDialog(true);
                  }}
                  sx={{
                    bgcolor: "#111111",
                    color: "#ffffff",
                    fontSize: 11,
                    letterSpacing: 1.5,
                    px: 3,
                    py: 1,
                    "&:hover": { bgcolor: "#d4af37", color: "#111111" }
                  }}
                >
                  Create Article
                </Button>
              </Box>

              <TableContainer component={Paper} sx={{ border: "1px solid #eaeaea", boxShadow: "none" }}>
                <Table>
                  <TableHead sx={{ bgcolor: "#fcfbfa" }}>
                    <TableRow>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Article Title</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Excerpt / Snippet</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Category</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Publication Date</TableCell>
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase", textAlign: "right" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {blog.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} sx={{ fontSize: 12, textAlign: "center", py: 4, color: "#888888" }}>
                          No editorial journal entries found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      blog.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell sx={{ fontSize: 12, fontWeight: "semibold", maxWidth: 200 }}>{post.title}</TableCell>
                          <TableCell sx={{ fontSize: 12, maxWidth: 350, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.excerpt}</TableCell>
                          <TableCell sx={{ fontSize: 12 }}>
                            <Box
                              component="span"
                              sx={{
                                px: 1,
                                py: 0.25,
                                borderRadius: "4px",
                                fontSize: "10px",
                                fontWeight: "bold",
                                bgcolor: "#f5f5f5",
                                color: "#666"
                              }}
                            >
                              {post.category}
                            </Box>
                          </TableCell>
                          <TableCell sx={{ fontSize: 12 }}>{post.date}</TableCell>
                          <TableCell sx={{ fontSize: 12, textAlign: "right" }}>
                            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => {
                                  setEditingBlogPost(post);
                                  setBlogForm({
                                    title: post.title,
                                    excerpt: post.excerpt,
                                    category: post.category,
                                    date: post.date
                                  });
                                  setOpenBlogDialog(true);
                                }}
                                sx={{ fontSize: 10, color: "#d4af37", borderColor: "#d4af37" }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => handleDeleteBlogPost(post.id)}
                                sx={{ fontSize: 10 }}
                              >
                                Delete
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* VIEW: OFFICIAL SETTINGS */}
          {activeView === "officialSettings" && (
            <Box>
              <Typography variant="h5" sx={{ fontFamily: "serif", mb: 4, color: "#111111" }}>
                Official Settings & Store Configuration
              </Typography>
              <form onSubmit={handleSaveOfficialSettings}>
                <Paper sx={{ p: 4, border: "1px solid #eaeaea", boxShadow: "none", mb: 3 }}>
                  <Typography variant="h6" sx={{ fontFamily: "serif", fontSize: 16, mb: 3, pb: 1, borderBottom: "1px solid #eaeaea" }}>
                    Global Taxation Settings
                  </Typography>
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="GST Tax Rate (%)"
                        type="number"
                        inputProps={{ min: 0, max: 100, step: 0.1 }}
                        size="small"
                        fullWidth
                        required
                        value={gstRate}
                        onChange={(e) => setGstRate(Number(e.target.value))}
                        helperText="The default GST tax percentage calculated during checkout."
                      />
                    </Grid>
                  </Grid>

                  <Typography variant="h6" sx={{ fontFamily: "serif", fontSize: 16, mb: 3, pb: 1, borderBottom: "1px solid #eaeaea" }}>
                    Maison Social Media Profiles
                  </Typography>
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Facebook Page URL"
                        size="small"
                        fullWidth
                        value={facebookUrl}
                        onChange={(e) => setFacebookUrl(e.target.value)}
                        placeholder="https://facebook.com/brandname"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Instagram Profile URL"
                        size="small"
                        fullWidth
                        value={instagramUrl}
                        onChange={(e) => setInstagramUrl(e.target.value)}
                        placeholder="https://instagram.com/brandname"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Pinterest Profile URL"
                        size="small"
                        fullWidth
                        value={pinterestUrl}
                        onChange={(e) => setPinterestUrl(e.target.value)}
                        placeholder="https://pinterest.com/brandname"
                      />
                    </Grid>
                  </Grid>

                  <Typography variant="h6" sx={{ fontFamily: "serif", fontSize: 16, mb: 3, pb: 1, borderBottom: "1px solid #eaeaea" }}>
                    Atelier Page Content Management
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        label="Shipping & Insurance Page Content"
                        size="small"
                        fullWidth
                        multiline
                        rows={6}
                        required
                        value={shippingContent}
                        onChange={(e) => setShippingContent(e.target.value)}
                        helperText="Provide full paragraphs. Line breaks will be preserved on the storefront page."
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Returns & Exchanges Page Content"
                        size="small"
                        fullWidth
                        multiline
                        rows={6}
                        required
                        value={returnsContent}
                        onChange={(e) => setReturnsContent(e.target.value)}
                        helperText="Provide full paragraphs. Line breaks will be preserved on the storefront page."
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ letterSpacing: 1, textTransform: "uppercase", color: "#d4af37", fontWeight: "bold", fontSize: 11 }}>
                          Frequently Asked Questions (FAQ)
                        </Typography>
                        <Button size="small" variant="outlined" onClick={handleAddFaq} sx={{ borderColor: "#111111", color: "#111111", fontSize: 10, borderRadius: 0 }}>
                          Add Question
                        </Button>
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                        {faqItems.map((faq, idx) => (
                          <Paper key={idx} variant="outlined" sx={{ p: 2.5, bgcolor: "#fafafa", position: "relative" }}>
                            <Button onClick={() => handleRemoveFaq(idx)} sx={{ position: "absolute", top: 10, right: 10, minWidth: "auto", color: "#d32f2f", fontSize: 10, letterSpacing: 1 }}>
                              Remove
                            </Button>
                            <Typography variant="caption" sx={{ fontWeight: "bold", color: "#888888", display: "block", mb: 2, pt: 1 }}>
                              Question {idx + 1}
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                              <TextField
                                label="Question"
                                size="small"
                                fullWidth
                                value={faq.q || ""}
                                onChange={(e) => handleFaqChange(idx, "q", e.target.value)}
                              />
                              <TextField
                                label="Answer"
                                size="small"
                                fullWidth
                                multiline
                                rows={3}
                                value={faq.a || ""}
                                onChange={(e) => handleFaqChange(idx, "a", e.target.value)}
                              />
                            </Box>
                          </Paper>
                        ))}
                        {faqItems.length === 0 && (
                          <Typography variant="caption" sx={{ color: "#888888", fontStyle: "italic" }}>
                            No FAQ items yet. Click "Add Question" to create one.
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Privacy Policy Page Content"
                        size="small"
                        fullWidth
                        multiline
                        rows={6}
                        required
                        value={privacyContent}
                        onChange={(e) => setPrivacyContent(e.target.value)}
                        helperText="Provide full paragraphs. Line breaks will be preserved on the storefront page."
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Terms of Service Page Content"
                        size="small"
                        fullWidth
                        multiline
                        rows={6}
                        required
                        value={termsContent}
                        onChange={(e) => setTermsContent(e.target.value)}
                        helperText="Provide full paragraphs. Line breaks will be preserved on the storefront page."
                      />
                    </Grid>
                  </Grid>
                </Paper>

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: "#111111",
                      color: "#ffffff",
                      fontSize: 11,
                      letterSpacing: 1.5,
                      px: 4,
                      py: 1.5,
                      "&:hover": { bgcolor: "#d4af37", color: "#111111" }
                    }}
                  >
                    Save Official Settings
                  </Button>
                </Box>
              </form>
            </Box>
          )}
        </Box>
      </Box>

      {/* DIALOG: EDIT COLLECTION */}
      <Dialog open={openCollectionDialog} onClose={() => setOpenCollectionDialog(false)}>
        <DialogTitle sx={{ fontFamily: "serif", fontSize: 18 }}>Edit Design Collection</DialogTitle>
        <DialogContent sx={{ minWidth: 350, pt: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
            <TextField
              label="Collection Name"
              size="small"
              fullWidth
              value={collectionForm.name}
              onChange={(e) => setCollectionForm({ ...collectionForm, name: e.target.value })}
            />
            <TextField
              label="Badge / Status Title"
              size="small"
              fullWidth
              value={collectionForm.badge}
              onChange={(e) => setCollectionForm({ ...collectionForm, badge: e.target.value })}
            />
            <TextField
              label="Description Summary"
              size="small"
              multiline
              rows={3}
              fullWidth
              value={collectionForm.desc}
              onChange={(e) => setCollectionForm({ ...collectionForm, desc: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenCollectionDialog(false)} sx={{ color: "#888888", fontSize: 11, letterSpacing: 1.5 }}>
            Cancel
          </Button>
          <Button onClick={handleSaveCollection} variant="contained" sx={{ bgcolor: "#111111", color: "#ffffff", fontSize: 11, letterSpacing: 1.5, "&:hover": { bgcolor: "#d4af37", color: "#111111" } }}>
            Save Collection
          </Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG: EDIT NAVIGATION LINK & DROPDOWNS */}
      <Dialog open={openNavDialog} onClose={() => setOpenNavDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontFamily: "serif", fontSize: 18 }}>
          {editingNavIndex !== null ? "Edit Navigation Link" : "Add Navigation Link"}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Menu Item Label"
                size="small"
                fullWidth
                value={navLabel}
                onChange={(e) => setNavLabel(e.target.value)}
                placeholder="e.g. Gemstones"
              />
              {!navHasDropdown && (
                <TextField
                  label="Navigation URL Path"
                  size="small"
                  fullWidth
                  value={navHref}
                  onChange={(e) => setNavHref(e.target.value)}
                  placeholder="e.g. /shop?category=gems"
                />
              )}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2">Enable Mega Menu Dropdown</Typography>
              <Switch
                checked={navHasDropdown}
                onChange={(e) => setNavHasDropdown(e.target.checked)}
              />
            </Box>

            {navHasDropdown && (
              <Box sx={{ border: "1px solid #eaeaea", p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>Dropdown Categories / Columns</Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={handleAddDropdownColumn}
                    sx={{ borderColor: "#111111", color: "#111111", fontSize: 10, borderRadius: 0, "&:hover": { borderColor: "#d4af37", color: "#d4af37" } }}
                  >
                    Add Dropdown Category
                  </Button>
                </Box>

                {navDropdownColumns.map((col, colIdx) => (
                  <Box key={colIdx} sx={{ borderLeft: "3px solid #d4af37", pl: 2, py: 1, display: "flex", flexDirection: "column", gap: 2, bgcolor: "#fcfbfa", p: 2 }}>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <TextField
                        label="Category / Column Title"
                        size="small"
                        value={col.title}
                        onChange={(e) => handleColumnTitleChange(colIdx, e.target.value)}
                        sx={{ bgcolor: "#ffffff" }}
                      />
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleRemoveDropdownColumn(colIdx)}
                      >
                        Remove Category
                      </Button>
                    </Box>

                    <Typography variant="caption" sx={{ fontWeight: "bold", mt: 1 }}>Category Sublinks</Typography>
                    {(col.links || []).map((lnk: any, lnIdx: number) => (
                      <Box key={lnIdx} sx={{ display: "flex", gap: 2, alignItems: "center", pl: 2 }}>
                        <TextField
                          label="Sublink Name"
                          size="small"
                          value={lnk.label}
                          onChange={(e) => handleColumnLinkChange(colIdx, lnIdx, "label", e.target.value)}
                          sx={{ bgcolor: "#ffffff", width: "40%" }}
                        />
                        <TextField
                          label="Sublink Path URL"
                          size="small"
                          value={lnk.href}
                          onChange={(e) => handleColumnLinkChange(colIdx, lnIdx, "href", e.target.value)}
                          sx={{ bgcolor: "#ffffff", width: "45%" }}
                        />
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleRemoveColumnLink(colIdx, lnIdx)}
                          sx={{ minWidth: "auto" }}
                        >
                          X
                        </Button>
                      </Box>
                    ))}
                    <Button
                      size="small"
                      variant="text"
                      onClick={() => handleAddColumnLink(colIdx)}
                      sx={{ alignSelf: "flex-start", fontSize: 10, textTransform: "none", color: "#d4af37" }}
                    >
                      + Add Category Sublink
                    </Button>
                  </Box>
                ))}

                <Typography variant="subtitle2" sx={{ fontWeight: "bold", mt: 2 }}>Featured Dropdown Promo Card</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Featured Badge Tag (e.g. Exclusive)"
                      size="small"
                      fullWidth
                      value={featuredCardTag}
                      onChange={(e) => setFeaturedCardTag(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Featured Title"
                      size="small"
                      fullWidth
                      value={featuredCardTitle}
                      onChange={(e) => setFeaturedCardTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Featured Description Text"
                      size="small"
                      fullWidth
                      value={featuredCardDesc}
                      onChange={(e) => setFeaturedCardDesc(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Featured Click Action URL Link"
                      size="small"
                      fullWidth
                      value={featuredCardLink}
                      onChange={(e) => setFeaturedCardLink(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenNavDialog(false)} sx={{ color: "#888888", fontSize: 11, letterSpacing: 1.5 }}>
            Cancel
          </Button>
          <Button onClick={handleSaveNavLink} variant="contained" sx={{ bgcolor: "#111111", color: "#ffffff", fontSize: 11, letterSpacing: 1.5, "&:hover": { bgcolor: "#d4af37", color: "#111111" } }}>
            Save Navigation Link
          </Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG: ASSIGN COURIER DETAILS */}
      <Dialog open={openCourierDialog} onClose={() => setOpenCourierDialog(false)}>
        <DialogTitle sx={{ fontFamily: "serif", fontSize: 18 }}>Assign Courier Partner</DialogTitle>
        <form onSubmit={handleAssignCourier}>
          <DialogContent sx={{ minWidth: 350, pt: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
              <TextField
                label="Courier Partner"
                size="small"
                fullWidth
                required
                value={courierCarrier}
                onChange={(e) => setCourierCarrier(e.target.value)}
                placeholder="e.g. FedEx Armored, BlueDart, Delhivery"
              />
              <TextField
                label="Air Waybill (AWB) Tracking ID"
                size="small"
                fullWidth
                required
                value={courierAWB}
                onChange={(e) => setCourierAWB(e.target.value)}
                placeholder="ENTER AWB NUMBER"
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpenCourierDialog(false)} sx={{ color: "#888888", fontSize: 11, letterSpacing: 1.5 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: "#111111", color: "#ffffff", fontSize: 11, letterSpacing: 1.5, "&:hover": { bgcolor: "#d4af37", color: "#111111" } }}>
              Register Shipment
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* DIALOG: ADD TRANSIT CHECKPOINT */}
      <Dialog open={openCheckpointDialog} onClose={() => setOpenCheckpointDialog(false)}>
        <DialogTitle sx={{ fontFamily: "serif", fontSize: 18 }}>Log Transit Checkpoint</DialogTitle>
        <form onSubmit={handleAddTransitCheckpoint}>
          <DialogContent sx={{ minWidth: 350, pt: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
              <TextField
                label="Current Location"
                size="small"
                fullWidth
                required
                value={checkpointLocation}
                onChange={(e) => setCheckpointLocation(e.target.value)}
                placeholder="e.g. Transit Hub, Delhi"
              />
              <TextField
                label="Status Description"
                size="small"
                fullWidth
                required
                multiline
                rows={2}
                value={checkpointDesc}
                onChange={(e) => setCheckpointDesc(e.target.value)}
                placeholder="e.g. Shipment sorted and forwarded to destination sorting hub."
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpenCheckpointDialog(false)} sx={{ color: "#888888", fontSize: 11, letterSpacing: 1.5 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: "#111111", color: "#ffffff", fontSize: 11, letterSpacing: 1.5, "&:hover": { bgcolor: "#d4af37", color: "#111111" } }}>
              Log Checkpoint
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* DIALOG: OUT FOR DELIVERY */}
      <Dialog open={openDeliveryAgentDialog} onClose={() => setOpenDeliveryAgentDialog(false)}>
        <DialogTitle sx={{ fontFamily: "serif", fontSize: 18 }}>Assign Security Agent</DialogTitle>
        <form onSubmit={handleMarkOutForDelivery}>
          <DialogContent sx={{ minWidth: 350, pt: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
              <TextField
                label="Delivery Executive Name"
                size="small"
                fullWidth
                required
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="ENTER FULL NAME"
              />
              <TextField
                label="Agent Contact Phone"
                size="small"
                fullWidth
                required
                value={agentPhone}
                onChange={(e) => setAgentPhone(e.target.value)}
                placeholder="ENTER MOBILE NUMBER"
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpenDeliveryAgentDialog(false)} sx={{ color: "#888888", fontSize: 11, letterSpacing: 1.5 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: "#111111", color: "#ffffff", fontSize: 11, letterSpacing: 1.5, "&:hover": { bgcolor: "#d4af37", color: "#111111" } }}>
              Dispatch Out For Delivery
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* DIALOG: SECURE HANDOVER DELIVERED */}
      <Dialog open={openHandoverDialog} onClose={() => setOpenHandoverDialog(false)}>
        <DialogTitle sx={{ fontFamily: "serif", fontSize: 18 }}>Secure Handover Verification</DialogTitle>
        <form onSubmit={handleMarkDelivered}>
          <DialogContent sx={{ minWidth: 350, pt: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
              <TextField
                label="Received By (Client Name)"
                size="small"
                fullWidth
                required
                value={receivedBy}
                onChange={(e) => setReceivedBy(e.target.value)}
                placeholder="ENTER RECIPIENT NAME"
              />
              <TextField
                label="Biometric / Signature Verification Code"
                size="small"
                fullWidth
                required
                value={signatureCode}
                onChange={(e) => setSignatureCode(e.target.value)}
                placeholder="e.g. BIO-928, SIGN-482"
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpenHandoverDialog(false)} sx={{ color: "#888888", fontSize: 11, letterSpacing: 1.5 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: "#111111", color: "#ffffff", fontSize: 11, letterSpacing: 1.5, "&:hover": { bgcolor: "#d4af37", color: "#111111" } }}>
              Confirm Handover Delivery
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* DIALOG: EDIT/CREATE BLOG POST */}
      <Dialog open={openBlogDialog} onClose={() => setOpenBlogDialog(false)}>
        <DialogTitle sx={{ fontFamily: "serif", fontSize: 18 }}>
          {editingBlogPost ? "Edit Journal Article" : "Create Journal Article"}
        </DialogTitle>
        <form onSubmit={handleSaveBlogPost}>
          <DialogContent sx={{ minWidth: 380, pt: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
              <TextField
                label="Article Title"
                size="small"
                fullWidth
                required
                value={blogForm.title}
                onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                placeholder="ENTER ARTICLE TITLE"
              />
              <TextField
                label="Category"
                size="small"
                fullWidth
                required
                value={blogForm.category}
                onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                placeholder="e.g. Education, Industry Insights, Ethics"
              />
              <TextField
                label="Publication Date (Optional)"
                size="small"
                fullWidth
                value={blogForm.date}
                onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                placeholder="e.g. June 25, 2026 (Leave blank for today)"
              />
              <TextField
                label="Excerpt / Summary Snippet"
                size="small"
                fullWidth
                required
                multiline
                rows={3}
                value={blogForm.excerpt}
                onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                placeholder="Provide a brief summary snippet for client previews..."
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpenBlogDialog(false)} sx={{ color: "#888888", fontSize: 11, letterSpacing: 1.5 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: "#111111", color: "#ffffff", fontSize: 11, letterSpacing: 1.5, "&:hover": { bgcolor: "#d4af37", color: "#111111" } }}>
              {editingBlogPost ? "Update Article" : "Publish Article"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* TOAST SNACKBAR */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={toast.severity} onClose={() => setToast({ ...toast, open: false })} sx={{ fontSize: 12 }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
