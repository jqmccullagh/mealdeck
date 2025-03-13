import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  Collapse,
  TextField,
  Chip,
  Typography,
  useTheme,
  useMediaQuery,
  Box,
  Divider,
  Theme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';

interface AttributeCategory {
  title: string;
  items: string[];
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  attributes: {
    protein: string[];
    vegetable: string[];
    starch: string[];
    cuisine: string[];
  };
  onUpdateAttribute: (category: string, items: string[]) => void;
}

const MAX_ITEMS = 20;

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  attributes,
  onUpdateAttribute,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [newItems, setNewItems] = useState<Record<string, string>>({
    protein: '',
    vegetable: '',
    starch: '',
    cuisine: '',
  });

  const handleSectionToggle = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleAddItem = (category: string) => {
    const categoryKey = category.toLowerCase() as keyof typeof attributes;
    const newItem = newItems[categoryKey].trim();
    
    if (!newItem) return;
    
    const currentItems = attributes[categoryKey];
    
    if (currentItems.length >= MAX_ITEMS) return;
    if (currentItems.includes(newItem)) return;
    
    onUpdateAttribute(category, [...currentItems, newItem]);
    setNewItems(prev => ({
      ...prev,
      [categoryKey]: ''
    }));
  };

  const handleRemoveItem = (category: string, itemToRemove: string) => {
    console.log('Removing item:', itemToRemove, 'from category:', category); // Debug log
    const categoryKey = category.toLowerCase() as keyof typeof attributes;
    const currentItems = [...attributes[categoryKey]];
    const updatedItems = currentItems.filter(item => item !== itemToRemove);
    console.log('Updated items:', updatedItems); // Debug log
    onUpdateAttribute(category, updatedItems);
  };

  const handleInputChange = (category: string, value: string) => {
    const categoryKey = category.toLowerCase() as keyof typeof attributes;
    setNewItems(prev => ({
      ...prev,
      [categoryKey]: value
    }));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, category: string) => {
    if (e.key === 'Enter') {
      handleAddItem(category);
    }
  };

  const renderSection = (category: string) => {
    const categoryKey = category.toLowerCase() as keyof typeof attributes;
    const items = attributes[categoryKey];
    const isExpanded = expandedSection === category;

    return (
      <React.Fragment key={category}>
        <ListItem
          component="div"
          onClick={() => handleSectionToggle(category)}
          sx={{
            py: 2,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <ListItemText
            primary={
              <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                {category === 'Starch' ? 'Base' : category}
              </Typography>
            }
            secondary={`${items.length}/${MAX_ITEMS} items`}
          />
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={isExpanded} timeout="auto">
          <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              mb: 2,
              flexDirection: { xs: 'column', sm: 'row' }
            }}>
              <TextField
                fullWidth
                size="small"
                placeholder={`Add new ${category === 'Starch' ? 'base' : category.toLowerCase()}`}
                value={newItems[categoryKey]}
                onChange={(e) => handleInputChange(category, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, category)}
                sx={{ flex: 1 }}
              />
              <Button
                variant="contained"
                onClick={() => handleAddItem(category)}
                disabled={items.length >= MAX_ITEMS}
                startIcon={<AddIcon />}
                sx={{ 
                  minHeight: 40,
                  width: { xs: '100%', sm: 'auto' }
                }}
              >
                Add
              </Button>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1,
              maxHeight: { xs: '150px', sm: '200px' },
              overflowY: 'auto',
              p: 1
            }}>
              {items.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  onDelete={() => {
                    console.log('Delete clicked for:', item); // Debug log
                    handleRemoveItem(category, item);
                  }}
                  deleteIcon={
                    <IconButton 
                      size="small" 
                      sx={{ 
                        '&:hover': { 
                          color: 'error.main',
                          backgroundColor: 'transparent'
                        },
                        p: 0.5
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  }
                  sx={{ 
                    height: 'auto',
                    '& .MuiChip-label': { 
                      px: 2,
                      py: 1,
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    },
                    '& .MuiChip-deleteIcon': {
                      mr: 0.5,
                      '&:hover': {
                        color: 'error.main',
                      },
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Collapse>
        <Divider />
      </React.Fragment>
    );
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          m: isMobile ? 0 : 2,
          borderRadius: isMobile ? 0 : 2,
        },
      }}
    >
      <DialogTitle sx={{ 
        m: 0, 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        <Typography variant="h6" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          Settings
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme: Theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <List disablePadding>
          {['Protein', 'Vegetable', 'Starch', 'Cuisine'].map(renderSection)}
        </List>
      </DialogContent>
      <DialogActions sx={{ 
        p: 2, 
        borderTop: 1,
        borderColor: 'divider',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 1
      }}>
        <Button
          onClick={onClose}
          variant="contained"
          fullWidth={isMobile}
          sx={{ 
            minHeight: { xs: 48, sm: 40 },
            order: { xs: 2, sm: 1 }
          }}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsModal; 