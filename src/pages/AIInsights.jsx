import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';
import {
  TrendingUp as TrendingIcon,
  Warning as WarningIcon,
  Repeat as RecurringIcon,
  Psychology as AIIcon,
  LocationOn as LocationIcon,
  ArrowForward as ArrowIcon,
  Lightbulb as InsightIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import { MapPlaceholder, ChartCard } from '../components/common';
import { aiInsights } from '../data/mockData';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const predictionData = [
  { day: 'Mon', predicted: 45, actual: 42 },
  { day: 'Tue', predicted: 52, actual: 55 },
  { day: 'Wed', predicted: 48, actual: 46 },
  { day: 'Thu', predicted: 58, actual: 62 },
  { day: 'Fri', predicted: 55, actual: 53 },
  { day: 'Sat', predicted: 35, actual: null },
  { day: 'Sun', predicted: 28, actual: null },
];

const getSeverityConfig = (severity) => {
  switch (severity) {
    case 'critical':
      return { color: '#c53030', bgcolor: '#fee6e6', icon: <WarningIcon /> };
    case 'high':
      return { color: '#dd6b20', bgcolor: '#fef5e6', icon: <WarningIcon /> };
    case 'medium':
      return { color: '#2b6cb0', bgcolor: '#e6f3ff', icon: <InsightIcon /> };
    default:
      return { color: '#718096', bgcolor: '#f1f5f9', icon: <InsightIcon /> };
  }
};

const getTypeConfig = (type) => {
  switch (type) {
    case 'recurring':
      return { label: 'Recurring Issue', icon: <RecurringIcon /> };
    case 'trend':
      return { label: 'Trend Alert', icon: <TrendingIcon /> };
    case 'prediction':
      return { label: 'Prediction', icon: <TimelineIcon /> };
    case 'risk':
      return { label: 'Risk Zone', icon: <WarningIcon /> };
    default:
      return { label: 'Insight', icon: <InsightIcon /> };
  }
};

const AIInsights = () => {
  const criticalInsights = aiInsights.filter((i) => i.severity === 'critical');
  const highInsights = aiInsights.filter((i) => i.severity === 'high');

  return (
    <Layout title="AI Insights">
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <AIIcon color="primary" />
          <Typography variant="body1" color="text.secondary">
            AI-powered analytics and predictive insights for proactive city management
          </Typography>
        </Box>
        <Alert severity="info" sx={{ mt: 2 }}>
          <AlertTitle>Mock AI Analysis</AlertTitle>
          These insights are generated from pattern analysis of complaint data. In production, this
          would be powered by machine learning algorithms.
        </Alert>
      </Box>

      {/* Critical Alerts */}
      {criticalInsights.length > 0 && (
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {criticalInsights.map((insight) => (
            <Grid size={{ xs: 12, md: 6 }} key={insight.id}>
              <Card sx={{ borderLeft: '4px solid #c53030' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#fee6e6', color: '#c53030' }}>
                      <WarningIcon />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6" fontWeight={600}>
                          {insight.title}
                        </Typography>
                        <Chip
                          label="CRITICAL"
                          size="small"
                          sx={{ bgcolor: '#fee6e6', color: '#c53030', fontWeight: 600 }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {insight.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {insight.location}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Insights Grid */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Main Insights List */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                All AI Insights
              </Typography>
              <List>
                {aiInsights.map((insight, index) => {
                  const severityConfig = getSeverityConfig(insight.severity);
                  const typeConfig = getTypeConfig(insight.type);
                  return (
                    <Box key={insight.id}>
                      <ListItem
                        sx={{
                          py: 2,
                          px: 0,
                          alignItems: 'flex-start',
                        }}
                        secondaryAction={
                          <Button
                            size="small"
                            endIcon={<ArrowIcon />}
                            sx={{ mt: 1 }}
                          >
                            View Details
                          </Button>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: severityConfig.bgcolor, color: severityConfig.color }}>
                            {typeConfig.icon}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                              <Typography variant="body1" fontWeight={600}>
                                {insight.title}
                              </Typography>
                              <Chip
                                label={typeConfig.label}
                                size="small"
                                sx={{
                                  height: 20,
                                  fontSize: '0.65rem',
                                  bgcolor: '#e2e8f0',
                                  color: '#4a5568',
                                }}
                              />
                              <Chip
                                label={insight.severity.toUpperCase()}
                                size="small"
                                sx={{
                                  height: 20,
                                  fontSize: '0.65rem',
                                  bgcolor: severityConfig.bgcolor,
                                  color: severityConfig.color,
                                  fontWeight: 600,
                                }}
                              />
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {insight.description}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <LocationIcon fontSize="small" sx={{ color: '#718096' }} />
                                  <Typography variant="caption" color="text.secondary">
                                    {insight.location}
                                  </Typography>
                                </Box>
                                {insight.count && (
                                  <Typography variant="caption" color="text.secondary">
                                    {insight.count} occurrences
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < aiInsights.length - 1 && <Divider />}
                    </Box>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Side Panel */}
        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Summary Card */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Insight Summary
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Critical Alerts
                  </Typography>
                  <Chip
                    label={criticalInsights.length}
                    size="small"
                    sx={{ bgcolor: '#fee6e6', color: '#c53030', fontWeight: 600 }}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    High Priority
                  </Typography>
                  <Chip
                    label={highInsights.length}
                    size="small"
                    sx={{ bgcolor: '#fef5e6', color: '#dd6b20', fontWeight: 600 }}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Insights
                  </Typography>
                  <Chip
                    label={aiInsights.length}
                    size="small"
                    sx={{ bgcolor: '#e6f3ff', color: '#2b6cb0', fontWeight: 600 }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Trend Cards */}
          <Card sx={{ mb: 3, bgcolor: '#1a365d', color: '#fff' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <TrendingIcon />
                <Typography variant="h6" fontWeight={600}>
                  Trending Pattern
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                Road infrastructure complaints increase by 40% during monsoon season. Preventive
                maintenance recommended in Q2.
              </Typography>
              <Chip
                label="Seasonal Pattern"
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff' }}
              />
            </CardContent>
          </Card>

          <Card sx={{ bgcolor: '#2f855a', color: '#fff' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <InsightIcon />
                <Typography variant="h6" fontWeight={600}>
                  Recommendation
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                Deploy additional officers in Zone B during peak hours (10AM-2PM) to reduce response
                time by 25%.
              </Typography>
              <Chip
                label="Resource Optimization"
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff' }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Prediction Chart & Map */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartCard
            title="Complaint Prediction Model"
            subtitle="AI predicted vs actual complaints"
            height={280}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={predictionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a365d" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1a365d" stopOpacity={0} />
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
                <Area
                  type="monotone"
                  dataKey="predicted"
                  stroke="#1a365d"
                  fillOpacity={1}
                  fill="url(#colorPredicted)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Predicted"
                />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="#2f855a"
                  fill="transparent"
                  strokeWidth={2}
                  name="Actual"
                  connectNulls={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <MapPlaceholder height={280} title="Risk Zone Heat Map" />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AIInsights;
