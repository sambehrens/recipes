import { Fragment, useEffect, useRef, useState } from "react";
import Fuse from "fuse.js";
import { Recipe, getRecipeId, recipes, sortRecipesByCategory } from "./recipes";
import { Icon } from "./Icon";
import { arrowRightSmall } from "./icons";
import styles from "./SearchBar.module.css";
import { useLocalStorage } from "./useLocalStorage";

export const sortedRecipes = sortRecipesByCategory(recipes);

let fuse = new Fuse(sortedRecipes, {
  includeScore: true,
  keys: [
    {
      name: "title",
      weight: 1,
    },
    {
      name: "ingredients",
      weight: 0.3,
    },
    {
      name: "steps",
      weight: 0.1,
    },
    {
      name: "categories",
      weight: 0.7,
    },
  ],
});

export function SearchBar() {
  let [query, setQuery] = useState("");
  let [results, setResults] = useState<Recipe[]>(sortedRecipes);
  let inputRef = useRef<HTMLInputElement>(null);
  let [searchResultsOpen, setSearchResultsOpen] = useState(false);
  let [recentSearches, setRecentSearches] = useLocalStorage<Recipe[]>(
    "recent-search-results",
    []
  );

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      let parentEl = (event.target as Element).closest("#search-bar");
      if (!parentEl) {
        setSearchResultsOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);

    if (value.trim() === "") {
      setResults(sortedRecipes);
      setSearchResultsOpen(true);
    } else {
      const fuseResults = fuse.search(value);
      const recipeResults = fuseResults.map((result) => result.item);
      setResults(recipeResults);
      setSearchResultsOpen(true);
    }
  };

  let mergedResults =
    query.trim().length === 0 && recentSearches.length > 0
      ? dedupeByKeyPreserveFirst([...recentSearches, ...results], "title")
      : results;

  return (
    <div id="search-bar" className={styles.searchBar}>
      <div className={styles.searchRow}>
        <input
          ref={inputRef}
          id="search-input"
          type="search"
          placeholder="Search recipes"
          value={query}
          className={`${styles.searchInput} ${
            searchResultsOpen ? styles.resultsOpen : ""
          }`}
          onChange={handleSearch}
          onClick={() => !searchResultsOpen && setSearchResultsOpen(true)}
        ></input>
        <button
          className={`link ${styles.searchCancel}`}
          onClick={() => setSearchResultsOpen(false)}
        >
          Cancel
        </button>
      </div>
      {searchResultsOpen && (
        <ul className={styles.searchResults}>
          {mergedResults.map((recipe) => (
            <li key={getRecipeId(recipe)} className="flex flex-col">
              <a
                href={`#${getRecipeId(recipe)}`}
                className={styles.searchLink}
                onClick={() => {
                  setRecentSearches((old) =>
                    dedupeByKeyPreserveFirst([recipe, ...old], "title").slice(
                      0,
                      10
                    )
                  );
                  setSearchResultsOpen(false);
                }}
              >
                <div className={styles.searchBreadcrumbs}>
                  {recipe.categories.map((category, index) => {
                    return (
                      <Fragment key={category}>
                        <span>{category}</span>
                        {index < recipe.categories.length - 1 && (
                          <Icon icon={arrowRightSmall} />
                        )}
                      </Fragment>
                    );
                  })}
                </div>
                {recipe.title}
              </a>
            </li>
          ))}
          {mergedResults.length === 0 && (
            <li className={styles.noResults}>No recipes found...</li>
          )}
        </ul>
      )}
    </div>
  );
}

function dedupeByKeyPreserveFirst<T>(items: T[], key: keyof T): T[] {
  const map = new Map<any, T>();

  for (const item of items) {
    if (!map.has(item[key])) {
      map.set(item[key], item); // Only add the first occurrence
    }
  }

  return Array.from(map.values());
}
