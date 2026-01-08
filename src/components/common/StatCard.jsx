import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  color = 'primary',
  bgcolor,
}) => {
  const isPositive = trend === 'up';

  const colorMap = {
    primary: { main: '#1a365d', light: '#e6f0ff' },
    success: { main: '#2f855a', light: '#e6f7ed' },
    warning: { main: '#dd6b20', light: '#fef5e6' },
    error: { main: '#c53030', light: '#fee6e6' },
    info: { main: '#2b6cb0', light: '#e6f3ff' },
  };

  const colors = colorMap[color] || colorMap.primary;

  return (
    <Card
      sx={{
        height: '100%',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={500}
              sx={{ mb: 1 }}
            >
              {title}
            </Typography>
            <Typography variant="h3" fontWeight={700} color="text.primary" sx={{ mb: 0.5 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
            {trendValue && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                {isPositive ? (
                  <TrendingUp sx={{ fontSize: 18, color: '#2f855a' }} />
                ) : (
                  <TrendingDown sx={{ fontSize: 18, color: '#c53030' }} />
                )}
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ color: isPositive ? '#2f855a' : '#c53030' }}
                >
                  {trendValue}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  vs last week
                </Typography>
              </Box>
            )}
          </Box>
          <Avatar
            sx={{
              bgcolor: bgcolor || colors.light,
              color: colors.main,
              width: 56,
              height: 56,
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
