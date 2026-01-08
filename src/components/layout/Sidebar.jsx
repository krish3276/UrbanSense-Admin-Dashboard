import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  ReportProblem as ComplaintsIcon,
  Analytics as AnalyticsIcon,
  Psychology as AIIcon,
  Assessment as PerformanceIcon,
  LocationCity as CityIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useAppContext } from '../../context/AppContext';

const DRAWER_WIDTH = 260;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Officer Management', icon: <PeopleIcon />, path: '/officers' },
  { text: 'Complaints', icon: <ComplaintsIcon />, path: '/complaints' },
  { text: 'Department Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
  { text: 'AI Insights', icon: <AIIcon />, path: '/insights' },
  { text: 'Officer Performance', icon: <PerformanceIcon />, path: '/performance' },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sidebarOpen, logout } = useAppContext();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={sidebarOpen}
      sx={{
        width: sidebarOpen ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          backgroundColor: '#1a365d',
          color: '#fff',
          transition: 'width 0.2s ease-in-out',
          borderRight: 'none',
        },
      }}
    >
      {/* Logo/Brand Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 2.5,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Avatar
          sx={{
            bgcolor: '#48bb78',
            width: 44,
            height: 44,
          }}
        >
          <CityIcon />
        </Avatar>
        <Box>
          <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.2 }}>
            UrbanSense
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            Admin Dashboard
          </Typography>
        </Box>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, py: 2 }}>
        <List sx={{ px: 1.5 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    borderRadius: 2,
                    py: 1.2,
                    backgroundColor: isActive ? 'rgba(72, 187, 120, 0.2)' : 'transparent',
                    borderLeft: isActive ? '3px solid #48bb78' : '3px solid transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? '#48bb78' : 'rgba(255, 255, 255, 0.7)',
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.9)',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Bottom Section */}
      <Box sx={{ p: 2 }}>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2 }} />
        
        {/* Admin Profile */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: 1.5,
            borderRadius: 2,
            backgroundColor: 'rgba(255,255,255,0.05)',
            mb: 1,
          }}
        >
          <Avatar sx={{ bgcolor: '#dd6b20', width: 36, height: 36, fontSize: '0.9rem' }}>
            AD
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" fontWeight={600}>
              Admin User
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              Super Admin
            </Typography>
          </Box>
        </Box>

        {/* Settings & Logout */}
        <List dense sx={{ px: 0 }}>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                borderRadius: 1,
                py: 0.75,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
              }}
            >
              <ListItemIcon sx={{ color: 'rgba(255,255,255,0.6)', minWidth: 36 }}>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Settings"
                primaryTypographyProps={{ fontSize: '0.85rem' }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                borderRadius: 1,
                py: 0.75,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
              }}
            >
              <ListItemIcon sx={{ color: 'rgba(255,255,255,0.6)', minWidth: 36 }}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ fontSize: '0.85rem' }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
