import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export const Loading: React.FC = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
      <CircularProgress />
    </Box >
  );
};
