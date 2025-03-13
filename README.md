# MealDeck

MealDeck is a meal planning application that helps users generate and organize their weekly meals using customizable attributes and random selection.

## Features

### Core Functionality
- Weekly meal planning interface with day-by-day view
- Customizable meal attributes:
  - Protein (e.g., Chicken, Beef, Fish, Pork, Tofu)
  - Vegetable
  - Starch
  - Cuisine type
- Maximum of 20 items per attribute category
- Individual meal card features:
  - Lock/unlock mechanism to preserve desired meals
  - Draw Again option for regenerating individual meals
  - Recipe title generation
  - Attribute randomization

### Settings
- Settings modal interface:
  - Collapsible sections for each attribute category
  - Item counter showing used/available slots (max 20 per category)
  - Add new items via input field with "+" button
  - Remove items via "×" button on item chips
  - Visual feedback for item management
  - Close button to save changes
- Attribute categories:
  - Protein
  - Vegetable
  - Starch
  - Cuisine
- Data validation and constraints:
  - Maximum 20 items per category
  - No duplicate items allowed
  - Input validation for new items

### Navigation
- Week-by-week navigation
- Date range display (e.g., "January 12 - 18")

## Implementation Status

### Completed
- Basic React + TypeScript + Vite setup
- Initial MealCard component structure
- Week navigation controls
- Basic meal attribute structure
- State management for meal attributes and settings
- Settings modal with attribute customization
- Date handling and week navigation
- Meal locking mechanism
- Randomization logic and "Draw Again" functionality
- Recipe title generation
- Local storage for settings and meal plans

### To Do

#### Responsive Design & Mobile Optimization
- [ ] Layout Improvements
  - [ ] Optimize card grid for different screen sizes
  - [ ] Adjust typography and spacing for mobile
  - [ ] Implement collapsible sections for small screens
  - [ ] Create compact view for meal cards on mobile

- [ ] Touch Interactions
  - [ ] Add swipe gestures for week navigation
  - [ ] Implement touch-friendly buttons and controls
  - [ ] Add pull-to-refresh functionality
  - [ ] Optimize touch targets for mobile use

- [ ] Mobile-First Features
  - [ ] Create mobile navigation menu
  - [ ] Add bottom navigation bar for key actions
  - [ ] Implement responsive modals and overlays
  - [ ] Add mobile-optimized settings interface

## Development

### Setup
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
```
