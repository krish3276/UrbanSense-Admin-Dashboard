import { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Rating,
  Chip,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  Speed as SpeedIcon,
  CheckCircle as ResolvedIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  ComposedChart,
} from 'recharts';
import Layout from '../components/layout/Layout';
import { ChartCard, StatusChip } from '../components/common';
import { officerPerformance, officers, departments } from '../data/mockData';

const departmentPerformance = [
  { department: 'Roads', avgTime: 3.2, resolved: 120, feedback: 4.2 },
  { department: 'Water', avgTime: 2.1, resolved: 85, feedback: 4.5 },
  { department: 'Electricity', avgTime: 1.8, resolved: 95, feedback: 4.3 },
  { department: 'Sanitation', avgTime: 2.5, resolved: 140, feedback: 4.1 },
  { department: 'Safety', avgTime: 1.2, resolved: 60, feedback: 4.7 },
  { department: 'Parks', avgTime: 4.5, resolved: 28, feedback: 4.0 },
];

const weeklyPerformance = [
  { day: 'Mon', responseTime: 2.2, resolved: 12 },
  { day: 'Tue', responseTime: 1.8, resolved: 15 },
  { day: 'Wed', responseTime: 2.5, resolved: 10 },
  { day: 'Thu', responseTime: 1.5, resolved: 18 },
  { day: 'Fri', responseTime: 2.0, resolved: 14 },
  { day: 'Sat', responseTime: 3.0, resolved: 8 },
  { day: 'Sun', responseTime: 3.5, resolved: 5 },
];

const OfficerPerformance = () => {
  const [filterDepartment, setFilterDepartment] = useState('');

  // Get top performers
  const sortedByResolved = [...officers].sort((a, b) => b.complaintsResolved - a.complaintsResolved);
  const sortedBySpeed = [...officers].sort((a, b) => a.avgResponseTime - b.avgResponseTime);
  const sortedByFeedback = [...officers].sort((a, b) => b.feedbackScore - a.feedbackScore);

  const topPerformer = sortedByResolved[0];
  const fastestResponder = sortedBySpeed[0];
  const highestRated = sortedByFeedback[0];

  const filteredOfficers = filterDepartment
    ? officers.filter((o) => o.department === filterDepartment)
    : officers;

  return (
    <Layout title="Officer Performance">
      {/* Top Performers */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderTop: '4px solid #ffd700' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#fef5e6', color: '#dd6b20', width: 56, height: 56 }}>
                  <TrophyIcon />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Top Performer
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {topPerformer?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {topPerformer?.complaintsResolved} complaints resolved
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderTop: '4px solid #2f855a' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#e6f7ed', color: '#2f855a', width: 56, height: 56 }}>
                  <SpeedIcon />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Fastest Responder
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {fastestResponder?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {fastestResponder?.avgResponseTime}h avg response time
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderTop: '4px solid #2b6cb0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#e6f3ff', color: '#2b6cb0', width: 56, height: 56 }}>
                  <StarIcon />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Highest Rated
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {highestRated?.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Rating value={highestRated?.feedbackScore} precision={0.1} size="small" readOnly />
                    <Typography variant="body2" color="text.secondary">
                      ({highestRated?.feedbackScore})
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartCard title="Officer Comparison" subtitle="Top 5 officers by performance">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={officerPerformance}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#718096" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#718096" fontSize={12} width={70} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                  }}
                />
                <Legend />
                <Bar dataKey="resolved" fill="#2f855a" name="Resolved" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartCard title="Weekly Performance Trend" subtitle="Response time vs resolutions">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={weeklyPerformance} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#718096" fontSize={12} />
                <YAxis yAxisId="left" stroke="#718096" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#718096" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                  }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="resolved"
                  fill="#2f855a"
                  name="Resolved"
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="responseTime"
                  stroke="#dd6b20"
                  strokeWidth={2}
                  name="Avg Response (hrs)"
                  dot={{ fill: '#dd6b20' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Department Comparison */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12 }}>
          <ChartCard title="Department-wise Performance" subtitle="Response time and feedback comparison" height={250}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentPerformance} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
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
                <Bar dataKey="avgTime" fill="#dd6b20" name="Avg Response Time (hrs)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="feedback" fill="#2b6cb0" name="Feedback Score" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Officer Details Table */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight={600}>
              All Officers Performance
            </Typography>
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Filter by Department</InputLabel>
              <Select
                value={filterDepartment}
                label="Filter by Department"
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <MenuItem value="">All Departments</MenuItem>
                {departments.map((dept) => (
                  <MenuItem key={dept.id} value={dept.name}>
                    {dept.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell>Officer</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Zone</TableCell>
                  <TableCell align="center">Complaints Resolved</TableCell>
                  <TableCell align="center">Avg Response Time</TableCell>
                  <TableCell align="center">Feedback Score</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOfficers
                  .sort((a, b) => b.complaintsResolved - a.complaintsResolved)
                  .map((officer, index) => (
                    <TableRow key={officer.id} hover>
                      <TableCell>
                        {index < 3 ? (
                          <Avatar
                            sx={{
                              width: 28,
                              height: 28,
                              fontSize: '0.75rem',
                              bgcolor:
                                index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : '#cd7f32',
                              color: '#fff',
                            }}
                          >
                            {index + 1}
                          </Avatar>
                        ) : (
                          <Typography variant="body2" sx={{ pl: 1 }}>
                            {index + 1}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ bgcolor: '#1a365d', width: 36, height: 36, fontSize: '0.85rem' }}>
                            {officer.name.split(' ').map((n) => n[0]).join('')}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight={600}>
                              {officer.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Since {officer.joiningDate}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={officer.department} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{officer.zone}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                          <ResolvedIcon sx={{ fontSize: 18, color: '#2f855a' }} />
                          <Typography variant="body2" fontWeight={600}>
                            {officer.complaintsResolved}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={Math.max(0, 100 - officer.avgResponseTime * 20)}
                            sx={{
                              flex: 1,
                              height: 8,
                              borderRadius: 4,
                              bgcolor: '#e2e8f0',
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 4,
                                bgcolor:
                                  officer.avgResponseTime <= 2
                                    ? '#2f855a'
                                    : officer.avgResponseTime <= 3
                                    ? '#dd6b20'
                                    : '#c53030',
                              },
                            }}
                          />
                          <Typography variant="body2" fontWeight={500} sx={{ minWidth: 35 }}>
                            {officer.avgResponseTime}h
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                          <Rating value={officer.feedbackScore} precision={0.1} size="small" readOnly />
                          <Typography variant="body2" fontWeight={500}>
                            {officer.feedbackScore}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <StatusChip status={officer.status} />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default OfficerPerformance;
