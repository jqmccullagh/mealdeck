import React from 'react';
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

interface MealAttribute {
  category: string;
  value: string;
}

interface MealCardProps {
  id: string;
  date: string;
  attributes: MealAttribute[];
  isLocked: boolean;
  recipeTitle?: string;
  onLockToggle: (id: string) => void;
  onGenerateTitle: (id: string) => void;
  onRedrawAttribute: (id: string, category: string) => void;
  onDrawAgain: (id: string) => void;
}

const MealCard: React.FC<MealCardProps> = ({
  id,
  date,
  attributes,
  isLocked,
  recipeTitle,
  onLockToggle,
  onGenerateTitle,
  onRedrawAttribute,
  onDrawAgain,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Card 
        sx={{ 
          height: '100%',
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
                  fontSize: { xs: '0.75rem', sm: '0.85rem' },
                  textTransform: 'uppercase',
                  lineHeight: 1.2,
                  fontWeight: 600,
                  color: '#4a0072'
                }}
              >
                {date.split(',')[0]}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: { xs: '0.7rem', sm: '0.8rem' },
                  lineHeight: 1.2,
                  color: 'text.secondary',
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
                padding: '1px 6px',
                fontSize: '0.6rem',
                lineHeight: 1,
                height: 'auto'
              }}
            >
              Hold
            </Button>
          </div>

          {recipeTitle && (
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mb: 1.5,
                fontSize: '0.7rem',
                fontWeight: 500,
                fontStyle: 'italic',
                color: 'text.primary'
              }}
            >
              {recipeTitle}
            </Typography>
          )}

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
                  primary={attr.category === 'Starch' ? 'Base' : attr.category}
                  secondary={attr.value}
                  sx={{
                    m: 0,
                    '& .MuiListItemText-primary': {
                      fontSize: '12px',
                      color: 'text.secondary',
                      fontWeight: 600,
                      lineHeight: 1.5,
                      fontFamily: 'Big Shoulders Display'
                    },
                    '& .MuiListItemText-secondary': {
                      fontSize: '14px',
                      color: 'text.primary',
                      fontWeight: 500,
                      lineHeight: 1.5,
                      fontFamily: 'Raleway'
                    }
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={() => onRedrawAttribute(id, attr.category)}
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
          <Button
            onClick={() => onDrawAgain(id)}
            size="small"
            variant="outlined"
            sx={{ 
              minWidth: 'auto',
              padding: '1px 6px',
              fontSize: '0.6rem',
              lineHeight: 1,
              height: 'auto',
              mt: 1
            }}
          >
            Draw Again
          </Button>
        </CardContent>
      </Card>
      <Button
        size="small"
        variant="outlined"
        onClick={() => onGenerateTitle(id)}
        fullWidth
        sx={{ 
          fontSize: { xs: '0.75rem', sm: '0.875rem' }
        }}
      >
        Generate Title
      </Button>
    </Box>
  );
};

export default MealCard;
