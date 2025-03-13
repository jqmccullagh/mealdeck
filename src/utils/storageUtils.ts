interface StoredMealCard {
  id: string;
  date: string;
  displayDate: string;
  attributes: {
    category: string;
    value: string;
  }[];
  isLocked: boolean;
  recipeTitle?: string;
}

interface StoredAttributes {
  protein: string[];
  vegetable: string[];
  starch: string[];
  cuisine: string[];
}

const STORAGE_KEYS = {
  MEAL_PLANS: 'mealDeck_mealPlans',
  ATTRIBUTES: 'mealDeck_attributes',
} as const;

export const saveMealPlans = (weekOffset: number, mealCards: StoredMealCard[]): void => {
  try {
    const storedPlans = getMealPlans();
    storedPlans[weekOffset] = mealCards;
    localStorage.setItem(STORAGE_KEYS.MEAL_PLANS, JSON.stringify(storedPlans));
  } catch (error) {
    console.error('Error saving meal plans:', error);
  }
};

export const getMealPlans = (): Record<number, StoredMealCard[]> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.MEAL_PLANS);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error retrieving meal plans:', error);
    return {};
  }
};

export const getWeekMealPlan = (weekOffset: number): StoredMealCard[] | null => {
  const plans = getMealPlans();
  return plans[weekOffset] || null;
};

export const saveAttributes = (attributes: StoredAttributes): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.ATTRIBUTES, JSON.stringify(attributes));
  } catch (error) {
    console.error('Error saving attributes:', error);
  }
};

export const getAttributes = (): StoredAttributes | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ATTRIBUTES);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error retrieving attributes:', error);
    return null;
  }
}; 