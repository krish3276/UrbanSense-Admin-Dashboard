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
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={500}
              sx={{ mb: 0.5, fontSize: '0.75rem' }}
              noWrap
            >
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={700} color="text.primary" sx={{ mb: 0.25, fontSize: '1.5rem' }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
            {trendValue && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
                {isPositive ? (
                  <TrendingUp sx={{ fontSize: 14, color: '#2f855a' }} />
                ) : (
                  <TrendingDown sx={{ fontSize: 14, color: '#c53030' }} />
                )}
                <Typography
                  variant="caption"
                  fontWeight={600}
                  sx={{ color: isPositive ? '#2f855a' : '#c53030' }}
                >
                  {trendValue}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                  vs last week
                </Typography>
              </Box>
            )}
          </Box>
          <Avatar
            sx={{
              bgcolor: bgcolor || colors.light,
              color: colors.main,
              width: 44,
              height: 44,
              flexShrink: 0,
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
