import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'icon';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', sx, ...props }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        };
      case 'secondary':
        return {
          backgroundColor: 'background.paper',
          color: 'text.primary',
          border: 1,
          borderColor: 'divider',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        };
      case 'icon':
        return {
          minWidth: 'auto',
          padding: 1,
          borderRadius: '50%',
        };
      default:
        return {};
    }
  };

  return (
    <MuiButton
      {...props}
      variant={variant === 'icon' ? 'text' : 'contained'}
      sx={{
        textTransform: 'none',
        borderRadius: 2,
        ...getVariantStyles(),
        ...sx,
      }}
    />
  );
};

export default Button; 