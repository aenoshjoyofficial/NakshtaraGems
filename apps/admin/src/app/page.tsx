"use client";

import * as React from "react";
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
  VisibilityOff as VisibilityOffIcon
} from "@mui/icons-material";

export default function AdminDashboard() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [activeView, setActiveView] = React.useState<"overview" | "announcements" | "inventory" | "about" | "collections" | "bookings" | "header" | "addProduct" | "editProduct">("overview");
  const [editingProductId, setEditingProductId] = React.useState<string | null>(null);
  
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

  // Fetch db.json on load
  React.useEffect(() => {
    if (mounted) {
      fetch("/api/db")
        .then((res) => res.json())
        .then((data) => {
          setDb(data);
          setAnnouncementText(data.announcements.join("\n"));
          setBrandName(data.header?.brandName || "Nakshatra Gems & Fine Jewellery");
          setLogoUrl(data.header?.logo || "/logo.png");
          setNavLinks(data.header?.navLinks || []);
          setHeroBadge(data.hero.badge || "");
          setHeroTitle(data.hero.title);
          setHeroSubtitle(data.hero.subtitle);
          setHeroDescription(data.hero.description);
          setHeroBgImage(data.hero.bgImage || "");
          setAboutTitle(data.about.title);
          setAboutDescription(data.about.description);
          setAboutOrigins(data.about.origins);
          setAboutQuote(data.about.quote);
          setCollections(data.collections);
          setProducts(data.products);
          setBookings(data.bookings);
        })
        .catch(() => triggerToast("Failed to load storefront data.", "error"));
    }
  }, [mounted]);

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
      quote: aboutQuote
    };
    saveDatabase({ ...db, about: updatedAbout });
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

  if (!mounted || !db) {
    return (
      <Box sx={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", bgcolor: "#fcfbfa", flexDirection: "column", gap: 2 }}>
        <img
          src="/logo.png"
          alt="Nakshatra Gems & Jewelry"
          style={{ height: "60px", objectFit: "contain" }}
        />
        <Typography variant="caption" sx={{ letterSpacing: 2, color: "#888888", mt: 1 }}>
          Loading Atelier Database...
        </Typography>
      </Box>
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
            { id: "inventory", label: "Product Catalog", icon: <GemIcon /> },
            { id: "about", label: "Heritage Editor", icon: <BookIcon /> },
            { id: "collections", label: "Collections Hub", icon: <CategoryIcon /> },
            { id: "bookings", label: "Consultation Bookings", icon: <CalendarIcon /> }
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
            <Button size="small" variant="outlined" color="inherit" sx={{ borderColor: "#e0e0e0", fontSize: 10, letterSpacing: 1.5 }}>
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
              <Grid container spacing={3}>
                {[
                  { label: "Active Creations", value: products.length, icon: <GemIcon sx={{ color: "#d4af37" }} /> },
                  { label: "Consultations Scheduled", value: bookings.length, icon: <CalendarIcon sx={{ color: "#d4af37" }} /> },
                  { label: "Design Collections", value: collections.length, icon: <CategoryIcon sx={{ color: "#d4af37" }} /> }
                ].map((stat, i) => (
                  <Grid item xs={12} sm={4} key={i}>
                    <Card sx={{ border: "1px solid #eaeaea", boxShadow: "none" }}>
                      <CardContent sx={{ display: "flex", alignItems: "center", justifySpace: "space-between", justifyContent: "space-between" }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 1, textTransform: "uppercase" }}>
                            {stat.label}
                          </Typography>
                          <Typography variant="h4" sx={{ fontWeight: "light", mt: 1 }}>
                            {stat.value}
                          </Typography>
                        </Box>
                        <Box sx={{ p: 1.5, bgcolor: "#fcfbfa", borderRadius: "50%" }}>{stat.icon}</Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
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
            <Box component="form" onSubmit={handleSaveAbout} sx={{ maxWidth: 650 }}>
              <Typography variant="h5" sx={{ fontFamily: "serif", mb: 4, color: "#111111" }}>
                Edit Maison Story & Heritage
              </Typography>
              <Paper sx={{ p: 4, border: "1px solid #eaeaea", boxShadow: "none" }}>
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
                <Button type="submit" variant="contained" sx={{ bgcolor: "#111111", color: "#ffffff", py: 1.2, px: 4, fontSize: 11, letterSpacing: 2, borderRadius: 0, "&:hover": { bgcolor: "#d4af37", color: "#111111" } }}>
                  Save Heritage Details
                </Button>
              </Paper>
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
