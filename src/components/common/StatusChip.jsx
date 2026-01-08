import { Chip } from '@mui/material';

const StatusChip = ({ status, size = 'small' }) => {
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return { label: 'Active', color: 'success', bgcolor: '#e6f7ed', textColor: '#2f855a' };
      case 'inactive':
        return { label: 'Inactive', color: 'default', bgcolor: '#f1f5f9', textColor: '#64748b' };
      case 'resolved':
        return { label: 'Resolved', color: 'success', bgcolor: '#e6f7ed', textColor: '#2f855a' };
      case 'pending':
        return { label: 'Pending', color: 'warning', bgcolor: '#fef5e6', textColor: '#dd6b20' };
      case 'in-progress':
        return { label: 'In Progress', color: 'info', bgcolor: '#e6f3ff', textColor: '#2b6cb0' };
      case 'critical':
        return { label: 'Critical', color: 'error', bgcolor: '#fee6e6', textColor: '#c53030' };
      case 'high':
        return { label: 'High', color: 'error', bgcolor: '#fee6e6', textColor: '#c53030' };
      case 'medium':
        return { label: 'Medium', color: 'warning', bgcolor: '#fef5e6', textColor: '#dd6b20' };
      case 'low':
        return { label: 'Low', color: 'default', bgcolor: '#e6f3ff', textColor: '#2b6cb0' };
      default:
        return { label: status, color: 'default', bgcolor: '#f1f5f9', textColor: '#64748b' };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Chip
      label={config.label}
      size={size}
      sx={{
        backgroundColor: config.bgcolor,
        color: config.textColor,
        fontWeight: 600,
        fontSize: size === 'small' ? '0.75rem' : '0.85rem',
        borderRadius: '6px',
      }}
    />
  );
};

export default StatusChip;
