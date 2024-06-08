import * as React from 'react';
import { Box, Paper } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

interface ErrorMessageProps {
  content: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
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
