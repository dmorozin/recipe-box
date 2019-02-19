const initState = {
  recipes: [
    {
      id: 1,
      name: "Pancakes",
      ingr: [
        "1/2 cups all-purpose flour",
        "3 1/2 teaspoons baking powder",
        "1 teaspoon salt",
        "1 tablespoon white sugar",
        "1 1/4 cups milk",
        "1 egg",
        "3 tablespoons butter melted"
      ]
    },
    {
      id: 2,
      name: "Homemade Pizza",
      ingr: [
        "1 1/2 cups (355 ml) warm water (105°F-115°F)",
        "1 package (2 1/4 teaspoons) of active dry yeast",
        "3 3/4 cups (490 g) bread flour",
        "2 Tbsp olive oil ",
        "2 teaspoons salt",
        "1 teaspoon sugar"
      ]
    }
  ]
};

const rootReducer = (state = initState, action) => {
  if (action.type === "ADD_RECIPE") {
    const newRecipe = {
      id: action.id,
      name: action.name,
      ingr: action.ingr
    };
    const recipes = [...state.recipes, newRecipe];
    return {
      ...state,
      recipes
    };
  }
  if (action.type === "DELETE_RECIPE") {
    const newRecipes = state.recipes.filter(recipe => recipe.id !== action.id);
    return {
      ...state,
      recipes: newRecipes
    };
  }
  if (action.type === "EDIT_RECIPE") {
    const recipes = [...state.recipes];
    recipes.forEach(recipe => {
      if (recipe.id === action.id) {
        recipe.name = action.name;
        recipe.ingr = action.ingr;
      }
    });
    return {
      ...state,
      recipes
    };
  }
  return state;
};

export default rootReducer;
