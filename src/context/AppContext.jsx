import { createContext, useContext, useState, useCallback } from 'react';
import { officers as initialOfficers, complaints as initialComplaints } from '../data/mockData';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [officers, setOfficers] = useState(initialOfficers);
  const [complaints, setComplaints] = useState(initialComplaints);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Mock auth state
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Officer Management
  const addOfficer = useCallback((officer) => {
    const newOfficer = {
      ...officer,
      id: officers.length + 1,
      joiningDate: new Date().toISOString().split('T')[0],
      complaintsResolved: 0,
      avgResponseTime: 0,
      feedbackScore: 0,
    };
    setOfficers((prev) => [...prev, newOfficer]);
    return newOfficer;
  }, [officers.length]);

  const updateOfficer = useCallback((id, updates) => {
    setOfficers((prev) =>
      prev.map((officer) =>
        officer.id === id ? { ...officer, ...updates } : officer
      )
    );
  }, []);

  const toggleOfficerStatus = useCallback((id) => {
    setOfficers((prev) =>
      prev.map((officer) =>
        officer.id === id
          ? { ...officer, status: officer.status === 'active' ? 'inactive' : 'active' }
          : officer
      )
    );
  }, []);

  const deleteOfficer = useCallback((id) => {
    setOfficers((prev) => prev.filter((officer) => officer.id !== id));
  }, []);

  // Complaint Management
  const updateComplaintStatus = useCallback((id, status) => {
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === id
          ? {
              ...complaint,
              status,
              resolvedDate: status === 'resolved' ? new Date().toISOString().split('T')[0] : null,
            }
          : complaint
      )
    );
  }, []);

  // Sidebar toggle
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  // Auth
  const login = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const value = {
    // State
    officers,
    complaints,
    isAuthenticated,
    sidebarOpen,
    // Officer Actions
    addOfficer,
    updateOfficer,
    toggleOfficerStatus,
    deleteOfficer,
    // Complaint Actions
    updateComplaintStatus,
    // UI Actions
    toggleSidebar,
    // Auth Actions
    login,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
