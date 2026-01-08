import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Avatar,
  Alert,
} from '@mui/material';
import { LocationCity as CityIcon, Lock as LockIcon } from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication - accept any credentials for demo
    if (credentials.username && credentials.password) {
      login();
      navigate('/');
    } else {
      setError('Please enter both username and password');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #1a365d 100%)',
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 420, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <CardContent sx={{ p: 4 }}>
          {/* Logo Section */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Avatar
              sx={{
                bgcolor: '#1a365d',
                width: 72,
                height: 72,
                mx: 'auto',
                mb: 2,
              }}
            >
              <CityIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              UrbanSense
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Admin Dashboard Portal
            </Typography>
          </Box>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              sx={{ mb: 2 }}
              placeholder="Enter admin username"
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              sx={{ mb: 3 }}
              placeholder="Enter password"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              startIcon={<LockIcon />}
              sx={{
                py: 1.5,
                bgcolor: '#1a365d',
                '&:hover': { bgcolor: '#2c5282' },
              }}
            >
              Sign In
            </Button>
          </form>

          {/* Demo Credentials */}
          <Box
            sx={{
              mt: 3,
              p: 2,
              bgcolor: '#f7fafc',
              borderRadius: 2,
              border: '1px dashed #e2e8f0',
            }}
          >
            <Typography variant="caption" color="text.secondary" display="block" textAlign="center">
              Demo Mode: Enter any username and password to login
            </Typography>
          </Box>

          {/* Footer */}
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            textAlign="center"
            sx={{ mt: 3 }}
          >
            © 2026 UrbanSense. All rights reserved.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
