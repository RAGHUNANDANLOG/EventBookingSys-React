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
  Tooltip,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import TheaterComedyIcon from "@mui/icons-material/Theaters";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/navigation";
import { string } from "prop-types";

export default function BookingApprovalPage() {
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [eventBookings, setEventBookings] = useState<Record<string, any[]>>({});
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userType = "organization";
  
        const res = await fetch("http://localhost:4000/admin/adminApprove", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userType }),
        });
  
        const data = await res.json();
  
        const grouped = data.reduce((acc: Record<string, any[]>, curr: any) => {
          const event = curr.eventName;
          if (!acc[event]) acc[event] = [];
          acc[event].push({
            ...curr,
            name: curr.userEmail.split("@")[0],
            status: "Pending",
          });
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
  
  

  const handleLogout = () => {
    localStorage.clear();
    router.push("/admin-login");
  };

  const currentBookings = eventBookings[selectedEvent] || [];
  const filteredBookings = currentBookings.filter((booking) =>
    booking.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getIdProofUrl = (file: { data: number[]; type: string }) => {
    const byteArray = new Uint8Array(file.data);
    let mimeType = "application/pdf"; // default fallback
  
    // Try to infer MIME type from file signature (magic numbers)
    const signature = byteArray.slice(0, 4).join(" ");
    if (signature.startsWith("255 216")) {
      mimeType = "image/jpeg";
    } else if (signature.startsWith("137 80 78 71")) {
      mimeType = "image/png";
    } else if (signature.startsWith("37 80 68 70")) {
      mimeType = "application/pdf";
    }
  
    const blob = new Blob([byteArray], { type: mimeType });
    return URL.createObjectURL(blob);
  };

  const getReqLetterUrl = (file: { data: number[]; type: string }) => {
    const byteArray = new Uint8Array(file.data);
    let mimeType = "application/pdf"; // default fallback
  
    // Try to infer MIME type from file signature (magic numbers)
    const signature = byteArray.slice(0, 4).join(" ");
    if (signature.startsWith("255 216")) {
      mimeType = "image/jpeg";
    } else if (signature.startsWith("137 80 78 71")) {
      mimeType = "image/png";
    } else if (signature.startsWith("37 80 68 70")) {
      mimeType = "application/pdf";
    }
  
    const blob = new Blob([byteArray], { type: mimeType });
    return URL.createObjectURL(blob);
  };
  
  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#121212" }}>
      {/* Sidebar */}
      <Box sx={{ width: 240, backgroundColor: "#1c1c2e", color: "#fff", p: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h6" mb={3}>Admin Dashboard</Typography>
          <List>
            {[
              { icon: <DashboardIcon />, label: "Dashboard" },
              { icon: <EventIcon />, label: "Event" },
              { icon: <PersonIcon />, label: "Customer", selected: true },
              { icon: <TheaterComedyIcon />, label: "Theater" },
              { icon: <SettingsIcon />, label: "Settings" },
            ].map((item) => (
              <ListItemButton
                key={item.label}
                selected={item.selected}
                sx={{
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: "#333",
                    color: "#1ac886",
                    '& .MuiListItemIcon-root': {
                      color: "#1ac886"
                    }
                  }
                }}
              >
                <ListItemIcon sx={{ color: "#aaa" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}

            {/* Red Logout in Sidebar */}
            <ListItemButton
              onClick={handleLogout}
              sx={{
                mt: 2,
                borderRadius: 2,
                color: "#f44336",
                '& .MuiListItemIcon-root': { color: "#f44336" },
                '&:hover': {
                  backgroundColor: "#330000",
                  color: "#ff7961",
                  '& .MuiListItemIcon-root': {
                    color: "#ff7961"
                  }
                }
              }}
            >
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Box>
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
              {/* <Tooltip title="Logout">
                <IconButton onClick={handleLogout}>
                  <LogoutIcon sx={{ color: "#aaa", '&:hover': { color: "#f44336" } }} />
                </IconButton>
              </Tooltip> */}
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
            Total Customers: {filteredBookings.length}
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
                  "Name", "Email", "Event Name","EventId","Event Date", "Event Location", "Seats",
                  "Mode of Travel", "Vehicle Details", "Status", "Id Proof", "reqLetter", "Actions"
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
                  <TableCell sx={{ color: "#fff" }}>{booking.eventName}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{booking.eventId}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{booking.eventDate}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{booking.eventLoaction}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{booking.numSeats}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{booking.modeOfTravel || 'N/A'}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{booking.vehicleDetails || 'N/A'}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{booking.status}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {booking.idProof?.data ? (
                      <Button
                        variant="text"
                        sx={{ color: "#1ac886" }}
                        onClick={() => {
                          const url = getIdProofUrl(booking.idProof);
                          window.open(url, "_blank");
                        }}
                      >
                        View
                      </Button>
                    ) : (
                      <Typography sx={{ color: "#888" }}>No Proof</Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {booking.idProof?.data ? (
                      <Button
                        variant="text"
                        sx={{ color: "#1ac886" }}
                        onClick={() => {
                          const url = getReqLetterUrl(booking.orgRequestLetter);
                          window.open(url, "_blank");
                        }}
                      >
                        View
                      </Button>
                    ) : (
                      <Typography sx={{ color: "#888" }}>No reqLetter</Typography>
                    )}
                  </TableCell>
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
