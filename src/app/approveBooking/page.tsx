'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Avatar,
  Badge,
  Paper,
  List,
  ListItemIcon,
  ListItemText,
  Select,
  MenuItem,
  ListItemButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import TheaterComedyIcon from "@mui/icons-material/Theaters";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function BookingApprovalPage() {
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [eventBookings, setEventBookings] = useState<Record<string, any[]>>({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:4000/event");
        const grouped = res.data.reduce((acc: Record<string, any[]>, curr: any) => {
          const event = curr.eventName;
          if (!acc[event]) acc[event] = [];
          acc[event].push({ ...curr, name: curr.userEmail.split("@")[0], status: "Pending" });
          return acc;
        }, {});
        setEventBookings(grouped);

        const eventNames = Object.keys(grouped);
        if (eventNames.length > 0) {
          setSelectedEvent(eventNames[0]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const currentBookings = eventBookings[selectedEvent] || [];
  const filteredBookings = currentBookings.filter((booking) =>
    booking.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#121212" }}>
      {/* Sidebar */}
      <Box sx={{ width: 240, backgroundColor: "#1c1c2e", color: "#fff", p: 2 }}>
        <Typography variant="h6" mb={3}>Admin Dashboard</Typography>
        <List>
          <ListItemButton>
            <ListItemIcon sx={{ color: "#aaa" }}><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon sx={{ color: "#aaa" }}><EventIcon /></ListItemIcon>
            <ListItemText primary="Event" />
          </ListItemButton>
          <ListItemButton selected>
            <ListItemIcon sx={{ color: "#aaa" }}><PersonIcon /></ListItemIcon>
            <ListItemText primary="Customer" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon sx={{ color: "#aaa" }}><TheaterComedyIcon /></ListItemIcon>
            <ListItemText primary="Theater" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon sx={{ color: "#aaa" }}><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </List>
      </Box>

      {/* Main Content */}
      <Box
        flex={1}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          p: 3,
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "6px",
            height: "6px"
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#1c1c2e"
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#444",
            borderRadius: "4px"
          },
        }}
      >
        {/* Top Bar */}
        <AppBar position="static" sx={{ backgroundColor: "#1e1e2f", boxShadow: "none", mb: 3 }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box display="flex" alignItems="center" sx={{ backgroundColor: "#2a2a40", borderRadius: 1, px: 2 }}>
              <SearchIcon sx={{ color: "#aaa", mr: 1 }} />
              <InputBase
                placeholder="Search here"
                sx={{ color: "#fff" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton>
                <Badge variant="dot" color="success"><SettingsIcon sx={{ color: "#aaa" }} /></Badge>
              </IconButton>
              <IconButton>
                <Badge variant="dot" color="warning"><NotificationsIcon sx={{ color: "#aaa" }} /></Badge>
              </IconButton>
              <Avatar alt="Admin" src="/avatar.png" />
            </Box>
          </Toolbar>
        </AppBar>

        {/* Filters */}
        <Box display="flex" gap={2} alignItems="center" mb={2} flexWrap="wrap">
          <Select
            value={selectedEvent}
            onChange={(e) => {
              setSelectedEvent(e.target.value as string);
              setCurrentPage(1);
            }}
            sx={{ backgroundColor: "#2a2a40", color: "#fff", borderRadius: 2, minWidth: 150 }}
          >
            {Object.keys(eventBookings).map((event) => (
              <MenuItem key={event} value={event}>{event}</MenuItem>
            ))}
          </Select>

          <Paper sx={{ backgroundColor: "#2a2a40", px: 2, py: 1.5, color: "#fff", borderRadius: 2 }}>
            👤 Total Customers: {filteredBookings.length}
          </Paper>

          <Select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value as string));
              setCurrentPage(1);
            }}
            sx={{ backgroundColor: "#2a2a40", color: "#fff", borderRadius: 2 }}
          >
            {[5, 10, 20].map((count) => (
              <MenuItem key={count} value={count}>Show {count}</MenuItem>
            ))}
          </Select>
        </Box>

        {/* Table */}
        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 1200 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#2a2a40" }}>
                {[
                  "Name", "Email", "Event Date", "Event Location", "Seats",
                  "Mode of Travel", "Vehicle Details", "Address", "State", "District",
                  "Pincode", "Country", "ID Type", "ID Number", "Actions"
                ].map(header => (
                  <TableCell key={header} sx={{ color: "#fff" }}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell sx={{ color: "#fff" }}>{booking.name}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{booking.userEmail}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{booking.eventDate}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{booking.eventLoaction}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{booking.numSeats}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{booking.modeOfTravel || 'N/A'}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{booking.vehicleDetails || 'N/A'}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{booking.addressLine}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{booking.state}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{booking.district}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{booking.pincode}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{booking.country}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{booking.idType}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{booking.idNumber}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" sx={{ color: "#1ac886", borderColor: "#1ac886", mr: 1 }}>Approve</Button>
                    <Button variant="outlined" size="small" sx={{ color: "#d32f2f", borderColor: "#d32f2f" }}>Reject</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* Pagination */}
        <Box mt={2} display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
          <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} sx={{ color: "#fff" }}>Previous</Button>
          <Typography sx={{ color: "#fff" }}>Page {currentPage} of {totalPages}</Typography>
          <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} sx={{ color: "#fff" }}>Next</Button>
        </Box>
      </Box>
    </Box>
  );
}
