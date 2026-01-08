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
          width: sidebarOpen ? 'calc(100% - 260px)' : '100%',
          marginLeft: 0,
          transition: 'width 0.2s ease-in-out',
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        <Toolbar /> {/* Spacer for fixed AppBar */}
        <Box sx={{ p: 2.5, pl: 2, maxWidth: '100%', overflowX: 'auto' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
