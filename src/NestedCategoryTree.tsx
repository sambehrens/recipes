import { getRecipeId } from "./recipes";
import { NestedCategory } from "./buildNestedCategoryTree";

type NestedCategoryTreeProps = {
  category: NestedCategory;
  parentId: string;
};

export function NestedCategoryTree({
  category,
  parentId,
}: NestedCategoryTreeProps) {
  const currentId =
    parentId && parentId != "Root"
      ? `${parentId}-${category.name}`
      : category.name;

  return (
    <div
      style={
        category.name !== "Root" && parentId !== "Root"
          ? { paddingLeft: "1rem" }
          : undefined
      }
    >
      {category.name !== "Root" && <div id={currentId}>{category.name}</div>}
      <ul>
        {category.recipes.map((recipe) => (
          <li key={getRecipeId(recipe)}>
            <a href={`#${getRecipeId(recipe)}`}>{recipe.title}</a>
          </li>
        ))}
      </ul>
      {category.subcategories.map((subcategory) => (
        <NestedCategoryTree
          key={subcategory.name}
          category={subcategory}
          parentId={currentId}
        />
      ))}
    </div>
  );
}
