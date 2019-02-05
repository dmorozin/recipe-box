const initState = {
  recipes: [
    {
      id: 1,
      name: "drek",
      ingr: ["govno", "drek", "sranje"]
    },
    {
      id: 2,
      name: "dasdsa",
      ingr: ["hgfhgfh", "izuiuziuz", "yxyxyy"]
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
