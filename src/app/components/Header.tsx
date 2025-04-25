"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

// Set your basePath from env or fallback to empty
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("token");
      setIsLoggedIn(!!updatedToken);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsLoggedIn(false);
    router.push(`${basePath}/`);
  };

  return (
    <AppBar
      position="static"
      sx={{
        px: 2,
        background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          href={`${basePath}/`}
          sx={{
            textDecoration: "none",
            color: "#36d576",
            fontWeight: "bold",
            fontSize: "1.5rem",
            "&:hover": { opacity: 0.8 },
          }}
        >
          EventHub
        </Typography>

        <Box>
          {isLoggedIn ? (
            <>
              <Button
                sx={navStyle}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} href="/admin-login" sx={navStyle}>
                Admin Login
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// Styling
const navStyle = {
  color: "#fff",
  fontSize: "1rem",
  fontWeight: "bold",
  mx: 1,
  "&:hover": { color: "#36d576", transition: "0.3s" },
};

export default Header;
