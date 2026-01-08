import { Card, CardContent, CardHeader, Typography, Box, IconButton } from '@mui/material';
import { MoreVert as MoreIcon } from '@mui/icons-material';

const ChartCard = ({ title, subtitle, action, children, height = 300 }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
        }
        subheader={subtitle}
        action={
          action || (
            <IconButton size="small">
              <MoreIcon />
            </IconButton>
          )
        }
        sx={{ pb: 0 }}
      />
      <CardContent>
        <Box sx={{ height, width: '100%' }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
