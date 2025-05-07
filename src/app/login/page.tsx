"use client";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import MuiAlert from "@mui/material/Alert";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info">("success");

  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/auth/login`, data);

      localStorage.setItem("email", response.data.email);
      localStorage.setItem("token", response.data.accessToken);

      setSnackbarMessage("Login successful!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleGoogleLoginClick = () => {
    setSnackbarMessage("🔹 Google login coming soon!");
    setSnackbarSeverity("info");
    setOpenSnackbar(true);
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          background: "#041C32",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "850px",
            height: "500px",
            position: "relative",
            borderRadius: 2,
            boxShadow: "0 0 40px #00ffff88",
            overflow: "hidden",
            display: "flex",
          }}
        >
          {/* Left Panel */}
          <Box
            sx={{
              width: "50%",
              background: "linear-gradient(135deg, #00bcd4, #00838f)",
              color: "white",
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              zIndex: 2,
              position: "relative",
            }}
          >
            <Typography variant="h4" fontWeight="bold" sx={{ mt: -40 }}>
              Welcome Back!
            </Typography>
            <Typography mt={2}>
              Login to continue booking and managing your events with ease.
            </Typography>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: -1,
                width: "100%",
                height: "100%",
                background: "#06283D",
                clipPath: "polygon(100% 0, 0% 100%, 100% 100%)",
                zIndex: 1,
              }}
            />
          </Box>

          {/* Right Panel - Login Form */}
          <Box
            sx={{
              width: "50%",
              background: "#06283D",
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              color: "white",
              zIndex: 2,
            }}
          >
            <Typography variant="h4" fontWeight="bold" mb={2}>
              Login
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
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
                    placeholder="Email"
                    variant="standard"
                    fullWidth
                    sx={{ input: { color: "white" }, mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: "#00bcd4" }} />
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.email}
                    helperText={errors.email?.message as string}
                  />
                )}
              />

              {/* Password Field */}
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
                    placeholder="Password"
                    type="password"
                    variant="standard"
                    fullWidth
                    sx={{ input: { color: "white" }, mb: 3 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: "#00bcd4" }} />
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.password}
                    helperText={errors.password?.message as string}
                  />
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                sx={{
                  background: "linear-gradient(to right, #00bcd4, #00838f)",
                  color: "white",
                  borderRadius: "25px",
                  textTransform: "none",
                  py: 1,
                  fontWeight: "bold",
                  mb: 2,
                  boxShadow: "0 0 10px #00ffff55",
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Login"}
              </Button>
            </form>

            {/* Google Login Button */}
            <Button
              fullWidth
              variant="outlined"
              sx={{
                color: "#00bcd4",
                borderColor: "#00bcd4",
                py: 1.2,
                fontWeight: "bold",
                borderRadius: "25px",
                textTransform: "none",
                mb: 2,
              }}
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLoginClick}
            >
              Login with Google
            </Button>

            {/* Links */}
            <Typography variant="body2" align="center">
              New user?{" "}
              <Link href="/register" style={{ color: "#00bcd4", fontWeight: "bold" }}>
                Register
              </Link>
            </Typography>

            <Typography variant="body2" align="center" mt={1}>
              Want to leave?{" "}
              <Link href="/" style={{ color: "#f44336", fontWeight: "bold" }}>
                Exit
              </Link>
            </Typography>
          </Box>
        </Box>

        {/* Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <MuiAlert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Box>
    </>
  );
}
