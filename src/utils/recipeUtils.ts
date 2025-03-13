interface MealAttribute {
  category: string;
  value: string;
}

// Cooking methods based on cuisine and protein
const COOKING_METHODS: Record<string, string[]> = {
  Asian: ['Stir-Fried', 'Steamed', 'Glazed', 'Teriyaki', 'Curry'],
  Italian: ['Pan-Seared', 'Braised', 'Roasted', 'Grilled'],
  American: ['Grilled', 'BBQ', 'Pan-Fried', 'Roasted'],
  Indian: ['Curry', 'Tandoori', 'Masala', 'Spiced'],
  Mexican: ['Grilled', 'Braised', 'Spiced', 'Sautéed'],
};

// Descriptive adjectives for vegetables
const VEGETABLE_ADJECTIVES = [
  'Crispy',
  'Roasted',
  'Sautéed',
  'Fresh',
  'Seasoned',
  'Garden',
];

// Starch preparations
const STARCH_PREPARATIONS: Record<string, string[]> = {
  Rice: ['Steamed', 'Fragrant', 'Seasoned'],
  Pasta: ['Fresh', 'Al Dente', 'House-Made'],
  Quinoa: ['Fluffy', 'Seasoned', 'Herbed'],
  Potatoes: ['Roasted', 'Mashed', 'Crispy'],
};

// Get a random item from an array
const getRandomItem = <T,>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

// Generate a recipe title using different formats
export const generateRecipeTitle = (attributes: MealAttribute[]): string => {
  const cuisine = attributes.find((attr) => attr.category === 'Cuisine')?.value || '';
  const protein = attributes.find((attr) => attr.category === 'Protein')?.value || '';
  const vegetable = attributes.find((attr) => attr.category === 'Vegetable')?.value || '';
  const starch = attributes.find((attr) => attr.category === 'Starch')?.value || '';

  // Get random cooking method based on cuisine
  const cookingMethod = getRandomItem(COOKING_METHODS[cuisine] || ['Prepared']);
  const vegetableAdj = getRandomItem(VEGETABLE_ADJECTIVES);
  const starchPrep = getRandomItem(STARCH_PREPARATIONS[starch] || ['Seasoned']);

  // Different title formats
  const titleFormats = [
    // Format 1: [Cuisine] [Cooking Method] [Protein] with [Vegetable Adj] [Vegetable]
    `${cuisine} ${cookingMethod} ${protein} with ${vegetableAdj} ${vegetable}`,
    
    // Format 2: [Cooking Method] [Protein] over [Starch Prep] [Starch] with [Vegetable]
    `${cookingMethod} ${protein} over ${starchPrep} ${starch} with ${vegetable}`,
    
    // Format 3: [Cuisine]-Style [Protein] with [Vegetable] and [Starch]
    `${cuisine}-Style ${protein} with ${vegetable} and ${starch}`,
    
    // Format 4: [Cooking Method] [Protein] and [Vegetable Adj] [Vegetable]
    `${cookingMethod} ${protein} and ${vegetableAdj} ${vegetable}`,
  ];

  return getRandomItem(titleFormats);
};

// Generate a cooking method suggestion based on attributes
export const suggestCookingMethod = (attributes: MealAttribute[]): string => {
  const cuisine = attributes.find((attr) => attr.category === 'Cuisine')?.value || '';
  return getRandomItem(COOKING_METHODS[cuisine] || ['Prepared']);
}; 