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
  Category as CategoryIcon
} from "@mui/icons-material";

export default function AdminDashboard() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [activeView, setActiveView] = React.useState<"overview" | "announcements" | "inventory" | "about" | "collections" | "bookings">("overview");
  
  // Full db.json State
  const [db, setDb] = React.useState<any>(null);
  
  // Form fields
  const [announcementText, setAnnouncementText] = React.useState("");
  const [heroTitle, setHeroTitle] = React.useState("");
  const [heroSubtitle, setHeroSubtitle] = React.useState("");
  const [heroDescription, setHeroDescription] = React.useState("");
  
  const [aboutTitle, setAboutTitle] = React.useState("");
  const [aboutDescription, setAboutDescription] = React.useState("");
  const [aboutOrigins, setAboutOrigins] = React.useState("");
  const [aboutQuote, setAboutQuote] = React.useState("");

  const [collections, setCollections] = React.useState<any[]>([]);
  const [products, setProducts] = React.useState<any[]>([]);
  const [bookings, setBookings] = React.useState<any[]>([]);

  // Modal Dialog Form States for Product
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
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
    rating: "5.0"
  });

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
          setHeroTitle(data.hero.title);
          setHeroSubtitle(data.hero.subtitle);
          setHeroDescription(data.hero.description);
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
    const id = `${newProduct.category === "diamond" ? "dia" : "jewel"}-${Date.now().toString().slice(-3)}`;
    const created: any = {
      id,
      name: newProduct.name,
      category: newProduct.category,
      price: parsedPrice,
      inStock: true,
      rating: parseFloat(newProduct.rating) || 5.0,
      image: newProduct.image
    };

    if (newProduct.category === "diamond") {
      created.shape = newProduct.shape;
      created.carat = parseFloat(newProduct.carat) || 1.0;
      created.cut = newProduct.cut;
      created.color = newProduct.color;
      created.clarity = newProduct.clarity;
      created.certificate = newProduct.certificate;
    } else {
      created.metal = newProduct.metal;
      created.collection = newProduct.collection;
    }

    const updatedProducts = [...products, created];
    setProducts(updatedProducts);
    saveDatabase({ ...db, products: updatedProducts });
    setOpenAddDialog(false);
    setNewProduct({
      name: "", category: "diamond", price: "", metal: "Platinum", collection: "Solitaire",
      shape: "Round", carat: "1.0", cut: "Ideal", color: "D", clarity: "IF", certificate: "GIA", image: "round-diamond", rating: "5.0"
    });
  };

  // Save Announcements & Hero
  const handleSaveHeroAndAnnouncements = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedAnnouncements = announcementText.split("\n").filter(t => t.trim() !== "");
    const updatedHero = {
      title: heroTitle,
      subtitle: heroSubtitle,
      description: heroDescription
    };
    saveDatabase({ ...db, announcements: updatedAnnouncements, hero: updatedHero });
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
        <Typography variant="h6" sx={{ fontFamily: "serif", letterSpacing: 3, color: "#d4af37" }}>
          NAKSHTARA
        </Typography>
        <Typography variant="caption" sx={{ letterSpacing: 2, color: "#888888" }}>
          Loading Atelier Database...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fcfbfa" }}>
      {/* Sidebar navigation */}
      <Box sx={{ width: 260, bgcolor: "#111111", color: "#ffffff", display: "flex", flexDirection: "column" }}>
        <Box sx={{ p: 3, borderBottom: "1px solid #222222", textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontFamily: "serif", letterSpacing: 3, color: "#d4af37" }}>
            NAKSHTARA
          </Typography>
          <Typography variant="caption" sx={{ letterSpacing: 2, color: "#888888", display: "block", mt: 0.5 }}>
            ADMIN PORTAL
          </Typography>
        </Box>
        <List sx={{ flexGrow: 1, px: 2, py: 3 }}>
          {[
            { id: "overview", label: "Overview", icon: <DashboardIcon /> },
            { id: "announcements", label: "Hero & Announcement", icon: <EditIcon /> },
            { id: "inventory", label: "Product Catalog", icon: <GemIcon /> },
            { id: "about", label: "Heritage Editor", icon: <BookIcon /> },
            { id: "collections", label: "Collections Hub", icon: <CategoryIcon /> },
            { id: "bookings", label: "Consultation Bookings", icon: <CalendarIcon /> }
          ].map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                selected={activeView === item.id}
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

          {/* VIEW: ANNOUNCEMENTS & HERO */}
          {activeView === "announcements" && (
            <Box component="form" onSubmit={handleSaveHeroAndAnnouncements} sx={{ maxWidth: 650 }}>
              <Typography variant="h5" sx={{ fontFamily: "serif", mb: 4, color: "#111111" }}>
                Edit Announcements & Hero
              </Typography>
              <Paper sx={{ p: 4, border: "1px solid #eaeaea", boxShadow: "none" }}>
                <Box sx={{ mb: 3 }}>
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
                  onClick={() => setOpenAddDialog(true)}
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
                      <TableCell sx={{ fontSize: 10, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase" }}>Stock Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell sx={{ fontSize: 12, fontFamily: "monospace" }}>{row.id}</TableCell>
                        <TableCell sx={{ fontSize: 12 }}>{row.name}</TableCell>
                        <TableCell sx={{ fontSize: 12, textTransform: "capitalize" }}>{row.category}</TableCell>
                        <TableCell sx={{ fontSize: 12, fontWeight: "medium" }}>{formatPrice(row.price)}</TableCell>
                        <TableCell>
                          <Switch
                            checked={row.inStock}
                            onChange={() => handleToggleStock(row.id)}
                            color="default"
                            sx={{
                              "& .MuiSwitch-switchBase.Mui-checked": { color: "#d4af37" },
                              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: "#d4af37" }
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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

      {/* DIALOG: ADD PRODUCT */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle sx={{ fontFamily: "serif", fontSize: 18 }}>Add to Maison Inventory</DialogTitle>
        <DialogContent sx={{ minWidth: 350, pt: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
            <TextField
              label="Creation Name"
              size="small"
              fullWidth
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
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
            </TextField>
            <TextField
              label="Price (in INR)"
              size="small"
              type="number"
              fullWidth
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            {newProduct.category === "diamond" ? (
              <>
                <TextField
                  label="Shape"
                  size="small"
                  fullWidth
                  value={newProduct.shape}
                  onChange={(e) => setNewProduct({ ...newProduct, shape: e.target.value })}
                />
                <TextField
                  label="Carat Weight"
                  size="small"
                  type="number"
                  fullWidth
                  value={newProduct.carat}
                  onChange={(e) => setNewProduct({ ...newProduct, carat: e.target.value })}
                />
                <TextField
                  label="Cut Quality"
                  size="small"
                  fullWidth
                  value={newProduct.cut}
                  onChange={(e) => setNewProduct({ ...newProduct, cut: e.target.value })}
                />
                <TextField
                  label="Color Grade"
                  size="small"
                  fullWidth
                  value={newProduct.color}
                  onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
                />
                <TextField
                  label="Clarity Grade"
                  size="small"
                  fullWidth
                  value={newProduct.clarity}
                  onChange={(e) => setNewProduct({ ...newProduct, clarity: e.target.value })}
                />
                <TextField
                  label="Lab Certificate"
                  size="small"
                  fullWidth
                  value={newProduct.certificate}
                  onChange={(e) => setNewProduct({ ...newProduct, certificate: e.target.value })}
                />
              </>
            ) : (
              <>
                <TextField
                  label="Metal Composition"
                  size="small"
                  fullWidth
                  value={newProduct.metal}
                  onChange={(e) => setNewProduct({ ...newProduct, metal: e.target.value })}
                />
                <TextField
                  label="Design Family Collection"
                  size="small"
                  fullWidth
                  value={newProduct.collection}
                  onChange={(e) => setNewProduct({ ...newProduct, collection: e.target.value })}
                />
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenAddDialog(false)} sx={{ color: "#888888", fontSize: 11, letterSpacing: 1.5 }}>
            Cancel
          </Button>
          <Button onClick={handleAddProduct} variant="contained" sx={{ bgcolor: "#111111", color: "#ffffff", fontSize: 11, letterSpacing: 1.5, "&:hover": { bgcolor: "#d4af37", color: "#111111" } }}>
            Add Product
          </Button>
        </DialogActions>
      </Dialog>

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
