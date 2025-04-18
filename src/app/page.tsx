"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin`);
        const data = await response.data;
        setEvents(data);
        localStorage.setItem("events", JSON.stringify(data));
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ background: "linear-gradient(to right, #e0eafc, #cfdef3)", minHeight: "100vh", py: 6 }}>
      {/* Hero Section */}
      <Container maxWidth="md" sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h3" fontWeight="bold" sx={{ color: "#1976d2", mb: 1 }}>
          Discover Exciting Events
        </Typography>
        <Typography variant="h6" sx={{ color: "#5f6368", mb: 3 }}>
          Find conferences, concerts & meetups near you
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            bgcolor: "#ffffff",
            borderRadius: 2,
            boxShadow: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              px: 2,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Container>

      {/* Events Section */}
      <Container>
        <Typography variant="h5" sx={{ textAlign: "center", mb: 4, fontWeight: "bold", color: "#1976d2" }}>
          Upcoming Events
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {filteredEvents.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                sx={{
                  bgcolor: "#ffffff",
                  borderRadius: 3,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s ease",
                  height: "100%",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 6px 15px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={event.image}
                  alt={event.title}
                  onError={(e) => (e.currentTarget.src = "/default-event.jpg")}
                  sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                />
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {event.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                    <CalendarTodayIcon sx={{ fontSize: 18, mr: 1, color: "#1976d2" }} />
                    <Typography variant="body2">{event.date}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LocationOnIcon sx={{ fontSize: 18, mr: 1, color: "#1976d2" }} />
                    <Typography variant="body2">{event.location}</Typography>
                  </Box>
                  <Button
                    component={Link}
                    href="/register"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    sx={{
                      mt: 2,
                      borderRadius: 2,
                      backgroundColor: "#ff4081",
                      "&:hover": {
                        backgroundColor: "#f50057",
                      },
                    }}
                  >
                    Register
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
