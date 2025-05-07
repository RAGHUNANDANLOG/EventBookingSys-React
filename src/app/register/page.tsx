'use client';

import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/auth/register`, data);
      if (res.status === 200 || res.status === 201) {
        toast.success('Registration successful!', { position: 'top-right' });
        setTimeout(() => {
          router.push('/login');
        }, 2000);
        reset();
      } else {
        toast.error('Unexpected server response.', { position: 'top-right' });
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed!', {
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer autoClose={3000} hideProgressBar />

      <Box
        sx={{
          height: '100vh',
          background: '#041C32',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '850px',
            height: '500px',
            position: 'relative',
            borderRadius: 2,
            boxShadow: '0 0 40px #00ffff88',
            overflow: 'hidden',
            display: 'flex',
          }}
        >
          {/* Left Panel */}
          <Box
            sx={{
              width: '50%',
              background: 'linear-gradient(135deg, #00bcd4, #00838f)',
              color: 'white',
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              zIndex: 2,
              position: 'relative',
            }}
          >
            <Typography variant="h4" fontWeight="bold" sx={{ mt: -40 }}>
            WELCOME TO EVENT HUB!
            </Typography>
            <Typography mt={2}>
            Create your account to book and manage your events effortlessly.
            </Typography>

            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: -1,
                width: '100%',
                height: '100%',
                background: '#06283D',
                clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)',
                zIndex: 1,
              }}
            />
          </Box>

          {/* Right Panel - Sign Up Form */}
          <Box
            sx={{
              width: '50%',
              background: '#06283D',
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              color: 'white',
              zIndex: 2,
            }}
          >
            <Typography variant="h4" fontWeight="bold" mb={2}>
              Register
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name */}
              <Controller
                name="fullName"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Full name is required',
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: 'Only alphabets and spaces allowed',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Full Name"
                    variant="standard"
                    fullWidth
                    sx={{ input: { color: 'white' }, mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: '#00bcd4' }} />
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
                  required: 'Email is required',
                  pattern: {
                    value:
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid email format',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Email"
                    variant="standard"
                    fullWidth
                    sx={{ input: { color: 'white' }, mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: '#00bcd4' }} />
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
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    placeholder="Password"
                    variant="standard"
                    fullWidth
                    sx={{ input: { color: 'white' }, mb: 3 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: '#00bcd4' }} />
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
                  background: 'linear-gradient(to right, #00bcd4, #00838f)',
                  color: 'white',
                  borderRadius: '25px',
                  textTransform: 'none',
                  py: 1,
                  fontWeight: 'bold',
                  mb: 2,
                  boxShadow: '0 0 10px #00ffff55',
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Register'}
              </Button>
            </form>

            <Typography variant="body2" align="center">
              Already have an account?{' '}
              <Link href="/login" style={{ color: '#00bcd4', cursor: 'pointer' }}>
                Login
              </Link>
            </Typography>
	    {/* Exit Link */}
          <Typography color="white" textAlign="center">
            Want to leave?{" "}
            <Link
              href="/"
              style={{
                color: "#f44336", // red color for exit
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Exit
            </Link>
          </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
