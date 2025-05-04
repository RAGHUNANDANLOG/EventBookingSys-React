"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  const isAdminPage = pathname === "/admin";
  const buttonLabel = isAdminPage ? "Home" : "Admin";
  const targetHref = isAdminPage ? "/" : "/admin";

  return (
    <AppBar
      position="sticky"
      elevation={6}
      sx={{
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        px: 2,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: isMobile ? "column" : "row",
          py: isMobile ? 1 : 0,
        }}
      >
        {/* Logo */}
        <Typography
          component={Link}
          href={`${basePath}/`}
          sx={{
            textDecoration: "none",
            color: "#64ffda",
            fontWeight: "bold",
            fontSize: "1.8rem",
            letterSpacing: 1,
            "&:hover": { opacity: 0.8 },
            mb: isMobile ? 1 : 0,
          }}
        >
          Eventora
        </Typography>

        {/* Navigation Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            component={Link}
            href={targetHref}
            variant="outlined"
            sx={{
              borderRadius: 3,
              px: 3,
              fontWeight: "bold",
              color: "#64ffda",
              borderColor: "#64ffda",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#64ffda",
                color: "#0c0c0c",
                borderColor: "#64ffda",
              },
            }}
          >
            {buttonLabel}
          </Button>

          {isLoggedIn ? (
            <Button
              variant="outlined"
              onClick={() => {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
                router.push("/login");
              }}
              sx={{
                borderRadius: 3,
                px: 3,
                fontWeight: "bold",
                color: "#ff5252",
                borderColor: "#ff5252",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#ff5252",
                  color: "#fff",
                },
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              component={Link}
              href="/login"
              variant="outlined"
              sx={{
                borderRadius: 3,
                px: 3,
                fontWeight: "bold",
                color: "#64ffda",
                borderColor: "#64ffda",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#64ffda",
                  color: "#0c0c0c",
                  borderColor: "#64ffda",
                },
              }}
            >
              Login
            </Button>

          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
