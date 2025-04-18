"use client";

import { Box, Typography, Link, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(90deg, #1f1c2c, #928dab)",
        color: "#ffffff",
        py: 4,
        mt: 6,
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        {/* Footer Links */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 4,
            mb: 2,
          }}
        >
          <Link href="/" sx={footerLinkStyle}>
            Home
          </Link>
          <Link href="/about" sx={footerLinkStyle}>
            About Us
          </Link>
          <Link href="/contact" sx={footerLinkStyle}>
            Contact
          </Link>
          <Link href="/privacy" sx={footerLinkStyle}>
            Privacy Policy
          </Link>
        </Box>

        {/* Copyright */}
        <Typography
          variant="body2"
          sx={{ fontSize: "0.85rem", fontFamily: "Roboto, sans-serif" }}
        >
          © {new Date().getFullYear()} EventHub. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

// Footer Link Style
const footerLinkStyle = {
  color: "#ffffff",
  fontWeight: "600",
  textDecoration: "none",
  fontSize: "0.95rem",
  letterSpacing: "0.5px",
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#00FFC6",
    textDecoration: "underline",
  },
};

export default Footer;
