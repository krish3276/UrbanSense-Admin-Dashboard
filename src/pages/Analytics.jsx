import { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import Layout from '../components/layout/Layout';
import { ChartCard } from '../components/common';
import { departmentAnalytics, weeklyTrend } from '../data/mockData';

const COLORS = ['#1a365d', '#2f855a', '#dd6b20', '#c53030', '#2b6cb0', '#805ad5'];

const monthlyData = [
  { month: 'Jul', complaints: 320, resolved: 280 },
  { month: 'Aug', complaints: 380, resolved: 340 },
  { month: 'Sep', complaints: 290, resolved: 270 },
  { month: 'Oct', complaints: 420, resolved: 380 },
  { month: 'Nov', complaints: 350, resolved: 320 },
  { month: 'Dec', complaints: 400, resolved: 360 },
  { month: 'Jan', complaints: 380, resolved: 350 },
];

const resolutionTimeData = departmentAnalytics.map((d) => ({
  department: d.department,
  avgTime: d.avgTime,
}));

const radarData = departmentAnalytics.map((d) => ({
  subject: d.department,
  complaints: d.complaints,
  resolved: d.resolved,
  fullMark: 200,
}));

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('week');

  const totalComplaints = departmentAnalytics.reduce((sum, d) => sum + d.complaints, 0);
  const totalResolved = departmentAnalytics.reduce((sum, d) => sum + d.resolved, 0);
  const totalPending = departmentAnalytics.reduce((sum, d) => sum + d.pending, 0);
  const avgResolutionTime = (
    departmentAnalytics.reduce((sum, d) => sum + d.avgTime, 0) / departmentAnalytics.length
  ).toFixed(1);

  return (
    <Layout title="Department Analytics">
      {/* Header Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Comprehensive analytics for all city departments
        </Typography>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="week">This Week</MenuItem>
            <MenuItem value="month">This Month</MenuItem>
            <MenuItem value="quarter">This Quarter</MenuItem>
            <MenuItem value="year">This Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Summary Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ bgcolor: '#1a365d', color: '#fff' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" fontWeight={700}>
                {totalComplaints}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Total Complaints
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ bgcolor: '#2f855a', color: '#fff' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" fontWeight={700}>
                {totalResolved}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Resolved
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ bgcolor: '#dd6b20', color: '#fff' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" fontWeight={700}>
                {totalPending}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ bgcolor: '#2b6cb0', color: '#fff' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" fontWeight={700}>
                {avgResolutionTime}h
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Avg Resolution Time
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <ChartCard title="Department-wise Complaints" subtitle="Resolved vs Pending comparison">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentAnalytics} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
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
          <ChartCard title="Resolution Time by Dept" subtitle="Average hours to resolve">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={resolutionTimeData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#718096" fontSize={12} unit="h" />
                <YAxis dataKey="department" type="category" stroke="#718096" fontSize={11} width={60} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                  }}
                  formatter={(value) => [`${value} hours`, 'Avg Time']}
                />
                <Bar dataKey="avgTime" fill="#1a365d" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Charts Row 2 */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartCard title="Monthly Trend" subtitle="6-month complaint trend" height={280}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#718096" fontSize={12} />
                <YAxis stroke="#718096" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="complaints"
                  stroke="#1a365d"
                  strokeWidth={2}
                  dot={{ fill: '#1a365d', strokeWidth: 2 }}
                  name="Complaints"
                />
                <Line
                  type="monotone"
                  dataKey="resolved"
                  stroke="#2f855a"
                  strokeWidth={2}
                  dot={{ fill: '#2f855a', strokeWidth: 2 }}
                  name="Resolved"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartCard title="Department Performance Radar" subtitle="Complaints vs Resolution" height={280}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 200]} fontSize={10} />
                <Radar
                  name="Complaints"
                  dataKey="complaints"
                  stroke="#1a365d"
                  fill="#1a365d"
                  fillOpacity={0.3}
                />
                <Radar
                  name="Resolved"
                  dataKey="resolved"
                  stroke="#2f855a"
                  fill="#2f855a"
                  fillOpacity={0.3}
                />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Department Details Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Department Performance Details
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Department</TableCell>
                  <TableCell align="center">Total Complaints</TableCell>
                  <TableCell align="center">Resolved</TableCell>
                  <TableCell align="center">Pending</TableCell>
                  <TableCell align="center">Resolution Rate</TableCell>
                  <TableCell align="center">Avg. Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {departmentAnalytics.map((dept) => {
                  const resolutionRate = ((dept.resolved / dept.complaints) * 100).toFixed(1);
                  return (
                    <TableRow key={dept.department} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {dept.department}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">{dept.complaints}</TableCell>
                      <TableCell align="center">
                        <Typography color="success.main" fontWeight={500}>
                          {dept.resolved}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography color="warning.main" fontWeight={500}>
                          {dept.pending}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={parseFloat(resolutionRate)}
                            sx={{
                              flex: 1,
                              height: 8,
                              borderRadius: 4,
                              bgcolor: '#e2e8f0',
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 4,
                                bgcolor:
                                  parseFloat(resolutionRate) >= 80
                                    ? '#2f855a'
                                    : parseFloat(resolutionRate) >= 60
                                    ? '#dd6b20'
                                    : '#c53030',
                              },
                            }}
                          />
                          <Typography variant="body2" fontWeight={500} sx={{ minWidth: 45 }}>
                            {resolutionRate}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" fontWeight={500}>
                          {dept.avgTime}h
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Analytics;
