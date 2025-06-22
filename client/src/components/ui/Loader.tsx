import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

interface LoaderProps {
  size?: number;
  message?: string;
  fullScreen?: boolean;
  color?: 'primary' | 'secondary' | 'inherit';
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 40, 
  message = 'Loading...', 
  fullScreen = false,
  color = 'primary'
}) => {
  const content = (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center"
      gap={2}
      className={fullScreen ? 'min-h-screen' : 'py-8'}
    >
      <CircularProgress size={size} color={color} />
      {message && (
        <Typography variant="body2" color="textSecondary">
          {message}
        </Typography>
      )}
    </Box>
  );

  if (fullScreen) {
    return (
      <Box 
        position="fixed" 
        top={0} 
        left={0} 
        width="100%" 
        height="100%" 
        bgcolor="rgba(255, 255, 255, 0.8)" 
        zIndex={9999}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {content}
      </Box>
    );
  }

  return content;
};

export default Loader;