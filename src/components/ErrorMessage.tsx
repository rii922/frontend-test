import * as React from 'react';
import { SxProps, Theme, Box, Paper } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

interface ErrorMessageProps {
  content: string;
  sx?: SxProps<Theme>;
}

const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  return (
    <Box sx={[{ display: 'flex', justifyContent: 'center' }, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}>
      <Paper
        elevation={0}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          color: 'error.main',
          bgcolor: '#fff0f5',
          px: 2,
          py: 1,
        }}
      >
        <ErrorOutline sx={{ mr: 1 }} />
        {props.content}
      </Paper>
    </Box>
  );
};

export default ErrorMessage;
