import { getRecipeId } from "./recipes";
import { NestedCategory } from "./buildNestedCategoryTree";
import styles from "./NestedCategoryTree.module.css";

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
      className={`${styles.nestedSection} ${
        category.name !== "Root" && parentId !== "Root"
          ? styles.notRootSection
          : ""
      }`}
    >
      <div>
        {category.name !== "Root" && (
          <div id={currentId} className={styles.categoryName}>
            {category.name}
          </div>
        )}
        <ul className={styles.recipesList}>
          {category.recipes.map((recipe) => (
            <li key={getRecipeId(recipe)}>
              <a href={`#${getRecipeId(recipe)}`}>{recipe.title}</a>
            </li>
          ))}
        </ul>
      </div>
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
