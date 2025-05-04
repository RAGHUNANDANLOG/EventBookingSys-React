"use client";
import React, { useState, useEffect } from "react";
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

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin`);
        let data = await response.data;
        setEvents(data);
        localStorage.setItem("events", JSON.stringify(data));
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #1e3c72, #2a5298)",
        py: 6,
        color: "white",
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center", mb: 5 }}>
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
          🌐 Discover Amazing Events
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "#e0e0e0" }}>
          Search and register for events around the world.
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.15)",
            borderRadius: 3,
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": { border: "none" },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
          }}
        />
      </Container>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {filteredEvents.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  backdropFilter: "blur(10px)",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "white",
                  borderRadius: 4,
                  boxShadow: 3,
                  overflow: "hidden",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "scale(1.03)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={event.image}
                  alt={event.title}
                  onError={(e) =>
                    (e.currentTarget.src = "/default-event.jpg")
                  }
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {event.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <CalendarTodayIcon sx={{ fontSize: 18, mr: 1 }} />
                    <Typography variant="body2">{event.date}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <LocationOnIcon sx={{ fontSize: 18, mr: 1 }} />
                    <Typography variant="body2">{event.location}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    <Button
                      component={Link}
                      href="/register"
                      variant="contained"
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        backgroundColor: "#64ffda",
                        color: "#003844",
                        "&:hover": {
                          backgroundColor: "#1de9b6",
                        },
                      }}
                    >
                      Register Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
