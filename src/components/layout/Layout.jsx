import { Box, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAppContext } from '../../context/AppContext';

const Layout = ({ children, title = 'Dashboard' }) => {
  const { sidebarOpen } = useAppContext();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f7fafc' }}>
      <Sidebar />
      <Header title={title} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: sidebarOpen ? '260px' : 0,
          transition: 'margin-left 0.2s ease-in-out',
          minHeight: '100vh',
        }}
      >
        <Toolbar /> {/* Spacer for fixed AppBar */}
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
