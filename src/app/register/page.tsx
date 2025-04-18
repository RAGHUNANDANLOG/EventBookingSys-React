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
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RegisterPage() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await axios.post(`${API_URL}/auth/register`, data);
      toast.success("Registration successful! Please login.", { position: "top-right" });
      reset();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Registration failed! Please try again.";
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
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to right, #e0eafc, #cfdef3)",
          px: 2,
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: "#ffffff",
            p: 4,
            borderRadius: 4,
            boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            textAlign="center"
            mb={3}
          >
            Create an Account
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              rules={{ required: "Full name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message as string}
                />
              )}
            />

            {/* Email */}
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
                  label="Email"
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

            {/* Password */}
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
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

            {/* Register Button */}
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
              {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Sign Up"}
            </Button>
          </form>

          {/* Login Link */}
          <Typography textAlign="center" mt={3}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#1976d2", fontWeight: "bold" }}>
              Login here
            </Link>
          </Typography>
        </Container>
      </Box>
    </>
  );
}
