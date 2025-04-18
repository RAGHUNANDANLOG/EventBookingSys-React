"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth();

    const handleStorageChange = () => checkAuth();

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
        px: 2,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.4)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            textDecoration: "none",
            color: "#00FFC6",
            fontWeight: "bold",
            fontSize: "1.75rem",
            fontFamily: "Montserrat, sans-serif",
            letterSpacing: 1,
            "&:hover": { opacity: 0.8 },
          }}
        >
          EventHub
        </Typography>

        <Box>
          <Button component={Link} href="/" sx={navStyle}>
            Home
          </Button>
          {isLoggedIn ? (
            <>
              <Button component={Link} href="/dashboard" sx={navStyle}>
                Dashboard
              </Button>
              <Button onClick={handleLogout} sx={navStyle}>
                Logout
              </Button>
            </>
          ) : (
            <Button component={Link} href="/login" sx={navStyle}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const navStyle = {
  color: "#ffffff",
  fontSize: "1rem",
  fontWeight: "600",
  fontFamily: "Roboto, sans-serif",
  textTransform: "none",
  mx: 1.5,
  px: 2,
  py: 1,
  borderRadius: "8px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#00FFC633",
    color: "#00FFC6",
  },
};

export default Header;
