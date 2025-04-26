'use client';

import React from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function AdminLoginPage() {
  const { control, handleSubmit } = useForm<LoginFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await axios.post('http://localhost:4000/admin-user/login', data);
      if (res.data.success) {
        toast.success('Login successful');
        router.push('/approveBooking'); // 🔁 Redirect to booking approval page
      } else {
        toast.error(res.data.message || 'Login failed');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: '#1c1c2e', color: '#fff' }}>
        <Typography variant="h5" mb={3} align="center">
          Admin Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  sx={{ input: { color: '#fff' }, label: { color: '#aaa' } }}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  required
                  sx={{ input: { color: '#fff' }, label: { color: '#aaa' } }}
                />
              )}
            />
            <Button variant="contained" type="submit" color="primary" fullWidth>
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
