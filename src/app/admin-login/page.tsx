"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
  Paper,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/auth/login`, data);

      localStorage.setItem("email", response.data.email);
      localStorage.setItem("token", response.data.accessToken);

      toast.success("Login successful!", { autoClose: 2000 });
      router.push("/dashboard");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer autoClose={3000} hideProgressBar />
      <Box
        sx={{
          background: "linear-gradient(to right, #e0eafc, #cfdef3)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: 480,
            backgroundColor: "#ffffff",
            p: 4,
            borderRadius: 4,
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box textAlign="center" mb={3}>
            <AdminPanelSettingsIcon sx={{ fontSize: 40, color: "#1976d2" }} />
            <Typography variant="h5" fontWeight="bold" color="primary" mt={1}>
              Admin Login
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b" }}>
              Access your admin panel
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Admin Email"
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.email}
                  helperText={errors.email?.message as string}
                />
              )}
            />

            {/* Password Input */}
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.password}
                  helperText={errors.password?.message as string}
                />
              )}
            />

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{
                mt: 3,
                borderRadius: "30px",
                textTransform: "none",
                fontSize: "16px",
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Login as Admin"}
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
}
