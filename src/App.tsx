import React, { useState, useEffect } from 'react';
import MealCard from './components/MealCard';
import SettingsModal from './components/settings/SettingsModal';
import Button from './components/ui/Button';
import { getWeekDates, WeekInfo } from './utils/dateUtils';
import { generateRecipeTitle } from './utils/recipeUtils';
import {
  saveMealPlans,
  getWeekMealPlan,
  saveAttributes,
  getAttributes,
} from './utils/storageUtils';
import { ThemeProvider, CssBaseline, Grid, AppBar, IconButton, Box, Typography } from '@mui/material';
import theme from './theme';
import SettingsIcon from '@mui/icons-material/Settings';
import StyleIcon from '@mui/icons-material/Style';
import './App.css'; // Ensure you import your CSS file

interface Attributes {
  protein: string[];
  vegetable: string[];
  starch: string[];
  cuisine: string[];
}

interface MealAttribute {
  category: string;
  value: string;
}

interface MealCard {
  id: string;
  date: string;
  displayDate: string;
  attributes: MealAttribute[];
  isLocked: boolean;
  recipeTitle?: string;
}

const DEFAULT_ATTRIBUTES: Attributes = {
  protein: ['Chicken', 'Beef', 'Fish', 'Pork', 'Tofu'],
  vegetable: ['Carrots', 'Broccoli', 'Spinach', 'Asparagus'],
  starch: ['Rice', 'Potatoes', 'Quinoa', 'Pasta'],
  cuisine: ['Asian', 'Italian', 'American', 'Indian', 'Mexican'],
};

const App: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [weekInfo, setWeekInfo] = useState<WeekInfo>(getWeekDates(0));
  
  // Initialize attributes from storage or defaults
  const [attributes, setAttributes] = useState<Attributes>(() => {
    const stored = getAttributes();
    return stored || DEFAULT_ATTRIBUTES;
  });

  const [mealCards, setMealCards] = useState<MealCard[]>([]);

  // Load or generate meal cards when week changes
  useEffect(() => {
    setWeekInfo(getWeekDates(currentWeek));
    
    // Try to load saved meal plan for the week
    const savedMealPlan = getWeekMealPlan(currentWeek);
    
    if (savedMealPlan) {
      setMealCards(savedMealPlan);
    } else {
      // Generate new meal cards if no saved plan exists
      const newMealCards = weekInfo.days.map((day, index) => ({
        id: `${currentWeek}-${index}`,
        date: `${day.name}, ${day.displayDate}`,
        displayDate: day.displayDate,
        attributes: generateRandomMeal(),
      isLocked: false,
      recipeTitle: '',
      }));
      setMealCards(newMealCards);
      
      // Save the newly generated meal plan
      saveMealPlans(currentWeek, newMealCards);
    }
  }, [currentWeek]);

  // Save attributes when they change
  useEffect(() => {
    saveAttributes(attributes);
  }, [attributes]);

  // Save meal cards when they change
  useEffect(() => {
    if (mealCards.length > 0) {
      saveMealPlans(currentWeek, mealCards);
    }
  }, [mealCards, currentWeek]);

  // Helper function to get a random item from an array
  const getRandomItem = <T,>(items: T[]): T => {
    return items[Math.floor(Math.random() * items.length)];
  };

  // Generate a new random meal
  const generateRandomMeal = (): MealAttribute[] => {
    return [
      { category: 'Protein', value: getRandomItem(attributes.protein) },
      { category: 'Vegetable', value: getRandomItem(attributes.vegetable) },
      { category: 'Starch', value: getRandomItem(attributes.starch) },
      { category: 'Cuisine', value: getRandomItem(attributes.cuisine) },
    ];
  };

  // Handle redrawing a single attribute
  const handleRedrawAttribute = (cardId: string, category: string) => {
    setMealCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id === cardId && !card.isLocked) {
          const attributeKey = category.toLowerCase() as keyof Attributes;
          const newValue = getRandomItem(attributes[attributeKey]);
          return {
            ...card,
            attributes: card.attributes.map((attr) =>
              attr.category === category ? { ...attr, value: newValue } : attr
            ),
          };
        }
        return card;
      })
    );
  };

  // Handle redrawing an entire meal card
  const handleDrawAgain = (cardId: string) => {
    setMealCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId && !card.isLocked
          ? {
              ...card,
              attributes: generateRandomMeal(),
              recipeTitle: '', // Reset title to be generated later
            }
          : card
      )
    );
  };

  // Handle locking/unlocking a meal card
  const handleLockToggle = (id: string) => {
    setMealCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isLocked: !card.isLocked } : card
      )
    );
  };

  const handleGenerateTitle = (id: string): string => {
    const mealCard = mealCards.find(card => card.id === id);
    if (mealCard) {
      const title = `Delicious ${mealCard.attributes.map(attr => attr.value).join(', ')}`;
      return title; // Ensure this returns the generated title
    }
    return ''; // Return an empty string if not found
  };

  const handleUpdateAttribute = (category: string, items: string[]) => {
    const categoryKey = category.toLowerCase() as keyof Attributes;
    console.log('Updating category:', categoryKey, 'with items:', items); // Debug log
    setAttributes((prev) => ({
      ...prev,
      [categoryKey]: items,
    }));
  };

  const handlePreviousWeek = () => {
    setCurrentWeek((prev) => prev - 1);
  };

  const handleNextWeek = () => {
    setCurrentWeek((prev) => prev + 1);
  };

  // Update handleShuffleAll to reorder instead of regenerate
  const handleShuffleAll = () => {
    setMealCards((prevCards) => {
      const unlockedCards = prevCards.filter(card => !card.isLocked);
      
      // Fisher-Yates shuffle for unlocked cards
      for (let i = unlockedCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [unlockedCards[i], unlockedCards[j]] = [unlockedCards[j], unlockedCards[i]];
      }

      // Combine locked and shuffled unlocked cards back in their original positions
      return prevCards.map(card => {
        if (card.isLocked) {
          return card;
        }
        return unlockedCards.shift() || card;
      });
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;500;600;700&family=Raleway:wght@400;500;600&display=swap');
          
          * {
            box-sizing: border-box;
          }
          
          html, body, #root {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            width: 100%;
            font-family: 'Big Shoulders Display', sans-serif;
            background-color: #f5f5f5;
          }

          #root {
            display: flex;
          }
        `}
      </style>
      <div style={{
        background: 'linear-gradient(to right, #D3C4E0, #B2E0B2)', // Light purplish-grey to light green
        minHeight: '100vh',
        margin: 0,
      }}>
        <Box 
          sx={{ 
            width: '100vw',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.default',
            overflow: 'hidden'
          }}
        >
          <AppBar position="static" color="default" elevation={1} sx={{ width: '100%' }}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%'
            }}>
              <Box sx={{ 
                width: '1400px',
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                py: 1,
                px: 3,
                '@media (max-width: 1400px)': {
                  width: '100%'
                }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StyleIcon sx={{ fontSize: '2rem', color: 'primary.main' }} />
                  <Typography variant="h1" sx={{ 
                    fontSize: '2rem', 
                    fontWeight: 700,
                    m: 0,
                    fontFamily: 'Big Shoulders Display',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    MealDeck
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => setIsSettingsOpen(true)}
                  aria-label="Settings"
                  size="large"
                >
                  <SettingsIcon />
                </IconButton>
              </Box>
            </Box>
          </AppBar>

          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            padding: { xs: '24px', sm: '32px', md: '40px' }
          }}>
            <Box 
              sx={{ 
                width: '1400px',
                display: 'flex',
                flexDirection: 'column',
                '@media (max-width: 1400px)': {
                  width: '100%'
                }
              }}
            >
              <Box sx={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 3, sm: 4 }
              }}>
                {/* Week Navigation */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}>
                      <Button 
                        variant="secondary" 
                        onClick={handlePreviousWeek}
                        sx={{ 
                          minWidth: { xs: '100%', sm: 'auto' }
                        }}
                      >
                        Previous Week
                      </Button>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontSize: '1.125rem', 
                          fontWeight: 500,
                          order: { xs: -1, sm: 0 },
                          width: { xs: '100%', sm: 'auto' },
                          textAlign: { xs: 'center', sm: 'left' },
                          fontFamily: 'Big Shoulders Display'
                        }}
                      >
                        {weekInfo.displayRange}
                      </Typography>
                      <Button 
                        variant="secondary" 
                        onClick={handleNextWeek}
                        sx={{ 
                          minWidth: { xs: '100%', sm: 'auto' }
                        }}
                      >
                        Next Week
                      </Button>
                    </Box>
                  </Grid>
                </Grid>

                {/* Card Grid */}
                <Box 
                  sx={{ 
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(4, 1fr)',
                      lg: 'repeat(5, 1fr)',
                      xl: 'repeat(7, 185px)'  // Fixed width of 185px at xl breakpoint
                    },
                    rowGap: { 
                      xs: 8,
                      sm: 8,
                      md: 8
                    },
                    columnGap: {
                      xs: 4,
                      sm: 4,
                      md: 4,
                      xl: 2.5  // 20px gap at xl
                    },
                    width: '100%',
                    mb: { xs: 12, sm: 14 },
                    px: { xs: 2, sm: 3, md: 4, xl: 2 },
                    py: { xs: 3, sm: 4, md: 5 },
                    justifyContent: 'center'  // Center the grid when using fixed widths
                  }}
                >
                  {mealCards.map((card) => (
                    <Box 
                      key={card.id}
                      sx={{
                        height: '340px',
                        width: '100%'
                      }}
                    >
            <MealCard
              id={card.id}
              date={card.date}
              attributes={card.attributes}
              isLocked={card.isLocked}
              recipeTitle={card.recipeTitle}
              onLockToggle={handleLockToggle}
              onGenerateTitle={handleGenerateTitle}
                        onRedrawAttribute={handleRedrawAttribute}
                        onDrawAgain={handleDrawAgain}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Action Buttons Container */}
              <Box 
                sx={{ 
                  width: '100%',
                  position: 'fixed',
                  bottom: 0,
                  left: 0,
                  bgcolor: 'background.default',
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  py: 3
                }}
              >
                <Box 
                  sx={{ 
                    maxWidth: '1400px',
                    margin: '0 auto',
                    px: 3
                  }}
                >
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm="auto">
                      <Button
                        variant="primary"
                        onClick={handleShuffleAll}
                        sx={{ 
                          width: { xs: '100%', sm: 'auto' },
                          minWidth: { sm: '200px' }
                        }}
                      >
                        Shuffle All
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm="auto">
                      <Button
                        variant="primary"
                        onClick={() => {
                          mealCards
                            .filter(card => !card.isLocked)
                            .forEach(card => handleDrawAgain(card.id));
                        }}
                        sx={{ 
                          width: { xs: '100%', sm: 'auto' },
                          minWidth: { sm: '200px' }
                        }}
                      >
                        Draw All Unlocked
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>

              <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                attributes={attributes}
                onUpdateAttribute={handleUpdateAttribute}
              />
            </Box>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default App;
