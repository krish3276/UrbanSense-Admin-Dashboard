import { Grid, Box, Typography, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, Avatar, Chip } from '@mui/material';
import {
  ReportProblem as ComplaintsIcon,
  CheckCircle as ResolvedIcon,
  Warning as CriticalIcon,
  AccessTime as TimeIcon,
  People as OfficersIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import Layout from '../components/layout/Layout';
import { StatCard, ChartCard, MapPlaceholder } from '../components/common';
import { dashboardStats, weeklyTrend, departmentAnalytics, zoneWiseComplaints, complaints } from '../data/mockData';

const COLORS = ['#1a365d', '#2f855a', '#dd6b20', '#c53030', '#2b6cb0', '#805ad5'];

const Dashboard = () => {
  const recentComplaints = complaints.slice(0, 5);

  return (
    <Layout title="City Overview Dashboard">
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Welcome back, Admin! Here's what's happening in your city today.
        </Typography>
      </Box>

      {/* Stats Row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatCard
            title="Today's Complaints"
            value={dashboardStats.totalComplaintsToday}
            icon={<ComplaintsIcon />}
            trend="up"
            trendValue="+12%"
            color="primary"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatCard
            title="Active Complaints"
            value={dashboardStats.activeComplaints}
            icon={<TrendingIcon />}
            color="warning"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatCard
            title="Resolved"
            value={dashboardStats.resolvedComplaints}
            icon={<ResolvedIcon />}
            trend="up"
            trendValue="+8%"
            color="success"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatCard
            title="Critical Issues"
            value={dashboardStats.criticalIssues}
            icon={<CriticalIcon />}
            color="error"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatCard
            title="Avg. Resolution"
            value={`${dashboardStats.avgResolutionTime}h`}
            icon={<TimeIcon />}
            subtitle="Hours"
            color="info"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatCard
            title="Active Officers"
            value={`${dashboardStats.activeOfficers}/${dashboardStats.totalOfficers}`}
            icon={<OfficersIcon />}
            color="success"
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <ChartCard title="Weekly Complaint Trends" subtitle="Complaints received vs resolved">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorComplaints" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a365d" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1a365d" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2f855a" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2f855a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#718096" fontSize={12} />
                <YAxis stroke="#718096" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="complaints"
                  stroke="#1a365d"
                  fillOpacity={1}
                  fill="url(#colorComplaints)"
                  strokeWidth={2}
                  name="Complaints"
                />
                <Area
                  type="monotone"
                  dataKey="resolved"
                  stroke="#2f855a"
                  fillOpacity={1}
                  fill="url(#colorResolved)"
                  strokeWidth={2}
                  name="Resolved"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <ChartCard title="Complaints by Zone" subtitle="Distribution across city zones">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={zoneWiseComplaints}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="zone"
                  label={({ zone, percent }) => `${zone} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {zoneWiseComplaints.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Department Analytics & Recent Complaints */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <ChartCard title="Department-wise Complaints" subtitle="Pending vs Resolved by department" height={280}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentAnalytics} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="department" stroke="#718096" fontSize={12} />
                <YAxis stroke="#718096" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                  }}
                />
                <Legend />
                <Bar dataKey="resolved" fill="#2f855a" name="Resolved" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="#dd6b20" name="Pending" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Recent Complaints
              </Typography>
              <List dense>
                {recentComplaints.map((complaint) => (
                  <ListItem
                    key={complaint.id}
                    sx={{
                      px: 0,
                      borderBottom: '1px solid #e2e8f0',
                      '&:last-child': { borderBottom: 'none' },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor:
                            complaint.priority === 'critical'
                              ? '#fee6e6'
                              : complaint.priority === 'high'
                              ? '#fef5e6'
                              : '#e6f3ff',
                          color:
                            complaint.priority === 'critical'
                              ? '#c53030'
                              : complaint.priority === 'high'
                              ? '#dd6b20'
                              : '#2b6cb0',
                          width: 36,
                          height: 36,
                        }}
                      >
                        <ComplaintsIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body2" fontWeight={500} noWrap>
                          {complaint.title}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5 }}>
                          <Chip
                            label={complaint.status}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: '0.65rem',
                              backgroundColor:
                                complaint.status === 'resolved'
                                  ? '#e6f7ed'
                                  : complaint.status === 'pending'
                                  ? '#fef5e6'
                                  : '#e6f3ff',
                              color:
                                complaint.status === 'resolved'
                                  ? '#2f855a'
                                  : complaint.status === 'pending'
                                  ? '#dd6b20'
                                  : '#2b6cb0',
                            }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {complaint.zone}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Map Section */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <MapPlaceholder height={350} title="City-wide Complaint Distribution" />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
