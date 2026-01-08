import { Box, Card, CardContent, Typography } from '@mui/material';
import { Map as MapIcon } from '@mui/icons-material';

const MapPlaceholder = ({ height = 400, title = 'City Map View' }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        <Box
          sx={{
            flex: 1,
            minHeight: height,
            backgroundColor: '#e2e8f0',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #cbd5e0',
          }}
        >
          <MapIcon sx={{ fontSize: 64, color: '#718096', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Map View Placeholder
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ maxWidth: 300 }}>
            Interactive city map will be displayed here showing complaint locations and zone distributions.
          </Typography>
          <Box
            sx={{
              mt: 3,
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {['Zone A', 'Zone B', 'Zone C', 'Zone D'].map((zone) => (
              <Box
                key={zone}
                sx={{
                  px: 2,
                  py: 0.75,
                  borderRadius: 1,
                  backgroundColor: '#fff',
                  border: '1px solid #cbd5e0',
                }}
              >
                <Typography variant="caption" fontWeight={500}>
                  {zone}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MapPlaceholder;
