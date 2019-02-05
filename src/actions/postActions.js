export const addRecipe = (id, name, ingr) => {
  return {
    type: "ADD_RECIPE",
    id,
    name,
    ingr
  };
};

export const deleteRecipe = id => {
  return {
    type: "DELETE_RECIPE",
    id
  };
};

export const editRecipe = (id, name, ingr) => {
  return {
    type: "EDIT_RECIPE",
    id,
    name,
    ingr
  };
};
