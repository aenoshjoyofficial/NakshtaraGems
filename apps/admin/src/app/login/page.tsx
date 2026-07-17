"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import {
  MailOutline,
  LockOutlined,
  Visibility,
  VisibilityOff,
  DiamondOutlined,
} from "@mui/icons-material";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [successMsg, setSuccessMsg] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setErrorMsg("Access Denied: Invalid credentials.");
      } else {
        setSuccessMsg("Access Granted: Initializing administrator console...");
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (err) {
      setErrorMsg("An unexpected connection error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)",
        color: "#ffffff",
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={12}
          sx={{
            p: 4,
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(197, 160, 89, 0.2)",
            borderRadius: 0,
            textAlign: "center",
          }}
        >
          <Box sx={{ mb: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <DiamondOutlined sx={{ fontSize: 40, color: "#C5A059", mb: 1 }} />
            <Typography
              variant="overline"
              sx={{ letterSpacing: 6, color: "#C5A059", fontWeight: "bold" }}
            >
              ADMIN PANEL
            </Typography>
            <Typography variant="h5" sx={{ fontFamily: "serif", fontWeight: 300, mt: 1 }}>
              Nakshatra Gems
            </Typography>
          </Box>

          {errorMsg && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 0, bgcolor: "rgba(211, 47, 47, 0.1)", color: "#ff8a80" }}>
              {errorMsg}
            </Alert>
          )}

          {successMsg && (
            <Alert severity="success" sx={{ mb: 3, borderRadius: 0, bgcolor: "rgba(46, 125, 50, 0.1)", color: "#a5d6a7" }}>
              {successMsg}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutline sx={{ color: "rgba(255, 255, 255, 0.5)" }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#ffffff",
                  borderRadius: 0,
                  "& fieldset": { borderColor: "rgba(255, 255, 255, 0.15)" },
                  "&:hover fieldset": { borderColor: "#C5A059" },
                  "&.Mui-focused fieldset": { borderColor: "#C5A059" },
                },
                "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.5)" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#C5A059" },
              }}
            />

            <TextField
              fullWidth
              label="Secret Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ color: "rgba(255, 255, 255, 0.5)" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#ffffff",
                  borderRadius: 0,
                  "& fieldset": { borderColor: "rgba(255, 255, 255, 0.15)" },
                  "&:hover fieldset": { borderColor: "#C5A059" },
                  "&.Mui-focused fieldset": { borderColor: "#C5A059" },
                },
                "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.5)" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#C5A059" },
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                mt: 4,
                py: 1.5,
                bgcolor: "#C5A059",
                color: "#000000",
                fontWeight: "bold",
                letterSpacing: 2,
                borderRadius: 0,
                "&:hover": {
                  bgcolor: "#b08e4f",
                },
                "&.Mui-disabled": {
                  bgcolor: "rgba(197, 160, 89, 0.3)",
                  color: "rgba(0, 0, 0, 0.5)",
                },
              }}
            >
              {loading ? "AUTHENTICATING..." : "ENTER PORTAL"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
