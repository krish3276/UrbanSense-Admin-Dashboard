import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Avatar,
  Tooltip,
  InputBase,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Brightness4 as ThemeIcon,
} from '@mui/icons-material';
import { useAppContext } from '../../context/AppContext';

const Header = ({ title }) => {
  const { toggleSidebar, sidebarOpen } = useAppContext();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #e2e8f0',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        ml: sidebarOpen ? '260px' : 0,
        width: sidebarOpen ? 'calc(100% - 260px)' : '100%',
        transition: 'margin-left 0.2s ease-in-out, width 0.2s ease-in-out',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={toggleSidebar}
            edge="start"
            sx={{ color: '#1a365d' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" color="text.primary" fontWeight={600}>
            {title}
          </Typography>
        </Box>

        {/* Center Section - Search */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f7fafc',
            borderRadius: 2,
            px: 2,
            py: 0.5,
            width: 300,
            border: '1px solid #e2e8f0',
          }}
        >
          <SearchIcon sx={{ color: '#718096', mr: 1 }} />
          <InputBase
            placeholder="Search..."
            sx={{ flex: 1, fontSize: '0.9rem' }}
          />
        </Box>

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Toggle Theme">
            <IconButton sx={{ color: '#4a5568' }}>
              <ThemeIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Notifications">
            <IconButton sx={{ color: '#4a5568' }}>
              <Badge badgeContent={5} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              ml: 2,
              pl: 2,
              borderLeft: '1px solid #e2e8f0',
            }}
          >
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body2" fontWeight={600} color="text.primary">
                Admin User
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Last login: Today, 9:30 AM
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: '#1a365d', width: 40, height: 40 }}>
              AD
            </Avatar>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
