import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as ViewIcon,
  FilterList as FilterIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  CalendarToday as DateIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import { StatusChip, StatCard } from '../components/common';
import { useAppContext } from '../context/AppContext';
import { departments, zones } from '../data/mockData';

const Complaints = () => {
  const { complaints, updateComplaintStatus } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterZone, setFilterZone] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Filter complaints
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = !filterDepartment || complaint.category === filterDepartment;
    const matchesStatus = !filterStatus || complaint.status === filterStatus;
    const matchesPriority = !filterPriority || complaint.priority === filterPriority;
    const matchesZone = !filterZone || complaint.zone === filterZone;
    return matchesSearch && matchesDepartment && matchesStatus && matchesPriority && matchesZone;
  });

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setDetailsOpen(true);
  };

  const handleStatusChange = (id, newStatus) => {
    updateComplaintStatus(id, newStatus);
  };

  // Stats
  const totalComplaints = complaints.length;
  const pendingCount = complaints.filter((c) => c.status === 'pending').length;
  const inProgressCount = complaints.filter((c) => c.status === 'in-progress').length;
  const resolvedCount = complaints.filter((c) => c.status === 'resolved').length;
  const criticalCount = complaints.filter((c) => c.priority === 'critical').length;

  return (
    <Layout title="Complaint Monitoring">
      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" fontWeight={700} color="primary.main">
                {totalComplaints}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Complaints
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" fontWeight={700} color="warning.main">
                {pendingCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" fontWeight={700} color="info.main">
                {inProgressCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                In Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" fontWeight={700} color="success.main">
                {resolvedCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Resolved
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight={600}>
              All Complaints
            </Typography>
            <Chip
              label={`${criticalCount} Critical Issues`}
              color="error"
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Box>

          {/* Filters */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <TextField
              size="small"
              placeholder="Search by ID, title, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#718096' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 280 }}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Department</InputLabel>
              <Select
                value={filterDepartment}
                label="Department"
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {departments.map((dept) => (
                  <MenuItem key={dept.id} value={dept.name}>
                    {dept.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                label="Status"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="resolved">Resolved</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={filterPriority}
                label="Priority"
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Zone</InputLabel>
              <Select
                value={filterZone}
                label="Zone"
                onChange={(e) => setFilterZone(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {zones.map((zone) => (
                  <MenuItem key={zone.id} value={zone.name}>
                    {zone.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Complaints Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Complaint ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Zone</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Assigned To</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredComplaints
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((complaint) => (
                    <TableRow key={complaint.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600} color="primary.main">
                          {complaint.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500} sx={{ maxWidth: 200 }} noWrap>
                          {complaint.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {complaint.location}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={complaint.category} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{complaint.zone}</Typography>
                      </TableCell>
                      <TableCell>
                        <StatusChip status={complaint.priority} />
                      </TableCell>
                      <TableCell>
                        <StatusChip status={complaint.status} />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {complaint.assignedOfficer || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{complaint.reportedDate}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="View Details">
                          <IconButton size="small" onClick={() => handleViewDetails(complaint)}>
                            <ViewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredComplaints.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </CardContent>
      </Card>

      {/* Complaint Details Dialog */}
      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedComplaint && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight={600}>
                  Complaint Details
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <StatusChip status={selectedComplaint.priority} />
                  <StatusChip status={selectedComplaint.status} />
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                {/* Basic Info */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Complaint ID
                  </Typography>
                  <Typography variant="body1" fontWeight={600} color="primary.main">
                    {selectedComplaint.id}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Title
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {selectedComplaint.title}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body2">
                    {selectedComplaint.description}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Divider />
                </Grid>

                {/* Location & Assignment */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <LocationIcon fontSize="small" color="action" />
                    <Typography variant="subtitle2" color="text.secondary">
                      Location
                    </Typography>
                  </Box>
                  <Typography variant="body2">{selectedComplaint.location}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {selectedComplaint.zone}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <PersonIcon fontSize="small" color="action" />
                    <Typography variant="subtitle2" color="text.secondary">
                      Assigned Officer
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    {selectedComplaint.assignedOfficer || 'Not assigned yet'}
                  </Typography>
                </Grid>

                {/* Dates */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <DateIcon fontSize="small" color="action" />
                    <Typography variant="subtitle2" color="text.secondary">
                      Reported Date
                    </Typography>
                  </Box>
                  <Typography variant="body2">{selectedComplaint.reportedDate}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <DateIcon fontSize="small" color="action" />
                    <Typography variant="subtitle2" color="text.secondary">
                      Resolved Date
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    {selectedComplaint.resolvedDate || 'Not resolved yet'}
                  </Typography>
                </Grid>

                {/* Reporter Info */}
                <Grid size={{ xs: 12 }}>
                  <Divider />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Reporter Name
                  </Typography>
                  <Typography variant="body2">{selectedComplaint.reporterName}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PhoneIcon fontSize="small" color="action" />
                    <Typography variant="body2">{selectedComplaint.reporterPhone}</Typography>
                  </Box>
                </Grid>

                {/* Images */}
                <Grid size={{ xs: 12 }}>
                  <Divider />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Before/After Images
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Box
                        sx={{
                          height: 150,
                          bgcolor: '#f1f5f9',
                          borderRadius: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px dashed #cbd5e0',
                        }}
                      >
                        <ImageIcon sx={{ fontSize: 40, color: '#718096', mb: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          Before Image
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Box
                        sx={{
                          height: 150,
                          bgcolor: selectedComplaint.afterImage ? '#e6f7ed' : '#f1f5f9',
                          borderRadius: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px dashed #cbd5e0',
                        }}
                      >
                        <ImageIcon
                          sx={{
                            fontSize: 40,
                            color: selectedComplaint.afterImage ? '#2f855a' : '#718096',
                            mb: 1,
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {selectedComplaint.afterImage ? 'After Image' : 'No After Image Yet'}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Status Update */}
                <Grid size={{ xs: 12 }}>
                  <Divider />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Update Status</InputLabel>
                    <Select
                      value={selectedComplaint.status}
                      label="Update Status"
                      onChange={(e) => {
                        handleStatusChange(selectedComplaint.id, e.target.value);
                        setSelectedComplaint({
                          ...selectedComplaint,
                          status: e.target.value,
                        });
                      }}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="in-progress">In Progress</MenuItem>
                      <MenuItem value="resolved">Resolved</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailsOpen(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Layout>
  );
};

export default Complaints;
