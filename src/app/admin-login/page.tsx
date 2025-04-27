'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import GoogleIcon from '@mui/icons-material/Google';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function AdminLoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setLoading(true);
      const res = await axios.post("https://eventbookingsys-api.onrender.com/admin-user/login", data);
      if (res.data.success) {
        toast.success('Login successful!');
        router.push('/approveBooking');
      } else {
        toast.error(res.data.message || 'Login failed');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer autoClose={3000} hideProgressBar />
      <Box
        sx={{
          background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: '#ffffff',
            p: 4,
            borderRadius: 4,
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            textAlign="center"
            mb={3}
          >
            Admin Login
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email format',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{
                mt: 3,
                borderRadius: '30px',
                textTransform: 'none',
                fontSize: '16px',
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Login'}
            </Button>
          </form>

          <Button
            fullWidth
            variant="outlined"
            size="large"
            sx={{
              mt: 2,
              borderRadius: '30px',
              textTransform: 'none',
              fontSize: '16px',
              color: '#000',
              borderColor: '#ccc',
            }}
            startIcon={<GoogleIcon />}
            onClick={() => toast.info('🔹 Google login coming soon!', { position: 'top-right' })}
          >
            Login with Google
          </Button>

          {/* <Typography textAlign="center" mt={3}>
            New User?{' '}
            <Link href="/register" style={{ color: '#1976d2', fontWeight: 'bold' }}>
              Register here
            </Link>
          </Typography> */}

          <Typography textAlign="center" mt={1}>
            Want to leave?{' '}
            <Link href="/" style={{ color: '#f44336', fontWeight: 'bold' }}>
              Exit
            </Link>
          </Typography>
        </Container>
      </Box>
    </>
  );
}
