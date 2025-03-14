import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Box,
} from '@mui/material';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

interface MealAttribute {
  category: string;
  value: string;
}

interface MealCardProps {
  id: string;
  date: string;
  attributes: MealAttribute[];
  isLocked: boolean;
  onLockToggle: (id: string) => void;
  onGenerateTitle: (id: string) => string;
  onRedrawAttribute: (id: string, category: string) => void;
  onDrawAgain: (id: string) => void;
}

const MealCard: React.FC<MealCardProps> = ({
  id,
  date,
  attributes,
  isLocked,
  onLockToggle,
  onGenerateTitle,
  onRedrawAttribute,
  onDrawAgain,
}) => {
  const [generatedTitle, setGeneratedTitle] = useState<string | null>(null);

  const handleGenerateTitle = () => {
    console.log("Generating title...");
    const newTitle = onGenerateTitle(id);
    if (newTitle) {
      setGeneratedTitle(newTitle);
    }
  };

  const handleRedrawAttribute = (category: string) => {
    onRedrawAttribute(id, category);
    setGeneratedTitle(null);
  };

  const handleDrawAgain = (id: string) => {
    onDrawAgain(id);
    setGeneratedTitle(null);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: '0.75rem'
      }}>
        <Box>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontSize: { xs: '0.9375rem', sm: '1.0625rem' }, // Increased by 25%
              textTransform: 'uppercase',
              lineHeight: 1.2,
              fontWeight: 600,
              color: 'white' // White text
            }}
          >
            {date.split(',')[0]}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: { xs: '0.875rem', sm: '1rem' }, // Increased by 25%
              lineHeight: 1.2,
              color: '#D3D3D3', // Very light grey text
              fontWeight: 400
            }}
          >
            {date.split(',')[1].trim()}
          </Typography>
        </Box>
        <Button
          onClick={() => onLockToggle(id)}
          size="small"
          variant={isLocked ? "contained" : "outlined"}
          color={isLocked ? "primary" : "inherit"}
          sx={{ 
            minWidth: 'auto',
            padding: '4px 12px',
            fontSize: '0.82rem',
            lineHeight: 1,
            height: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            borderColor: isLocked ? 'primary.main' : '#6B8E23', // Medium green-grey outline
            color: isLocked ? 'black' : '#6B8E23', // Medium green-grey text for default state
            backgroundColor: isLocked ? '#DAA520' : 'transparent', // Dark gold background for active state
            '&:hover': {
              borderColor: isLocked ? 'primary.main' : '#6B8E23', // Medium green-grey outline on hover
              color: isLocked ? 'black' : '#6B8E23', // Medium green-grey text on hover for default state
              backgroundColor: isLocked ? '#DAA520' : 'transparent' // Dark gold background on hover for active state
            }
          }}
        >
          {isLocked ? "Held" : "Hold"}
          {isLocked ? <LockIcon sx={{ fontSize: '0.9rem', color: 'black' }} /> : <LockOpenIcon sx={{ fontSize: '0.9rem', color: '#6B8E23' }} />} {/* Medium green-grey icon for default state */}
        </Button>
      </div>

      <Card 
        sx={{ 
          height: { xs: 'auto', md: '322px' }, // Set height to 322px for desktop breakpoint
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          '& .MuiCardContent-root': {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column'
          },
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        }}
      >
        <CardContent sx={{ flexGrow: 1, pb: 1 }}>
          <List dense sx={{ p: 0 }}>
            {attributes.map((attr) => (
              <ListItem
                key={attr.category}
                disableGutters
                sx={{
                  py: 0,
                  pt: '12px',
                  px: 0,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <ListItemText
                  primary={attr.category === 'Starch' ? 'BASE' : attr.category.toUpperCase()} // Ensure "Base" is uppercase
                  secondary={attr.value}
                  sx={{
                    m: 0,
                    '& .MuiListItemText-primary': {
                      fontSize: '13.66px', // Increased by 10%
                      color: 'text.secondary',
                      fontWeight: 600,
                      lineHeight: 1.5,
                      fontFamily: 'Big Shoulders Display'
                    },
                    '& .MuiListItemText-secondary': {
                      fontSize: '14.49px', // Increased by 15%
                      color: 'text.primary',
                      fontWeight: 800, // Extra bold text
                      lineHeight: 1.5,
                      fontFamily: 'Raleway' // Changed font to Raleway
                    }
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={() => handleRedrawAttribute(attr.category)}
                    disabled={isLocked}
                    sx={{
                      padding: '2px',
                      '& .MuiSvgIcon-root': {
                        fontSize: '1.31rem',
                        color: '#DAA520',
                        transform: 'rotate(30deg)',
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'rotate(210deg)'
                        }
                      }
                    }}
                  >
                    <CasinoOutlinedIcon fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          <Typography
            variant="body2"
            onClick={handleGenerateTitle}
            sx={{
              display: 'flex',
              alignItems: 'flex-start', // Align items to the top
              cursor: 'pointer',
              color: 'primary.main',
              mt: 2,
              fontSize: '13.75px !important', // Updated font size
              '&.MuiTypography-body2': {
                fontSize: '13.75px !important' // Updated font size
              }
            }}
          >
            <RefreshIcon sx={{ mr: 0.5, fontSize: '1.03rem', alignSelf: 'flex-start' }} />
            {generatedTitle ? generatedTitle : 'Generate Title'}
          </Typography>
        </CardContent>
      </Card>

      <Button
        onClick={() => handleDrawAgain(id)}
        size="small"
        variant="contained"
        sx={{ 
          minWidth: 'auto',
          padding: '4px 12px',
          fontSize: '0.94rem', // Increased by 15%
          lineHeight: 1,
          height: 'auto',
          mb: 2,
          backgroundColor: '#014421', // Dark green background color
          color: 'white', // White text
          border: 'none', // No outline
          '&:hover': {
            backgroundColor: '#014421', // Dark green background color on hover
            color: 'white' // White text on hover
          }
        }}
      >
        Draw Again
      </Button>
    </Box>
  );
};

export default MealCard;
