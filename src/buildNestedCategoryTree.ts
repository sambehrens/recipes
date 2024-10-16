import {Category, Recipe} from "./recipes";

export type NestedCategory = {
  name: string;
  subcategories: NestedCategory[];
  recipes: Recipe[];
};

// Helper function to group recipes into a deeply nested structure
export function buildNestedCategoryTree(recipes: Recipe[], categoriesOrder: readonly string[]): NestedCategory {
  const root: NestedCategory = { name: 'Root', subcategories: [], recipes: [] };

  recipes.forEach((recipe) => {
    let currentNode = root;

    // Go through each category in the order it appears in categoriesOrder
    categoriesOrder.forEach((category) => {
      if (recipe.categories.includes(category as Category)) {
        let subcategory = currentNode.subcategories.find(sub => sub.name === category);
        if (!subcategory) {
          subcategory = { name: category, subcategories: [], recipes: [] };
          currentNode.subcategories.push(subcategory);
        }
        currentNode = subcategory;
      }
    });

    // Once all relevant categories are traversed, add the recipe
    currentNode.recipes.push(recipe);
  });

  return root;
}
