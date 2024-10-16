export type Recipe = {
  title: string;
  ingredients: Ingredient[];
  steps: string[];
  categories: Category[];
  source?: string;
  notes?: string;
};

export const Measurement = {
  count: {
    display: "",
    plural: "",
  },
  cup: {
    display: "cup",
    plural: "cups",
  },
  pinch: {
    display: "pinch",
    plural: "pinches",
  },
  tablespoon: {
    display: "tablespoon",
    plural: "tablespoons",
  },
  teaspoon: {
    display: "teaspoon",
    plural: "teaspoons",
  },
  ounce: {
    display: "oz",
    plural: "oz",
  },
  pound: {
    display: "lb",
    plural: "lb",
  },
  noQuantity: {
    display: "",
    plural: "",
  },
} as const;

export enum Scaler {
  Multiply = "linear",
  Constant = "constant",
}

export type Ingredient = {
  quantity: number;
  measurement: keyof typeof Measurement;
  name: string;
  scaler: Scaler;
};

export const categories = [
  "Breakfast",
  "Meats",
  "Chicken",
  "Beef",
  "Pasta",
  "Rice",
  "Dessert",
  "Instant-Pot",
] as const;
export type Category = (typeof categories)[number];

export function sortRecipesByCategory(recipes: Recipe[]) {
  return recipes.sort((a, b) => {
    const aCategoryIndex = Math.min(
      ...a.categories.map((category) => categories.indexOf(category))
    );
    const bCategoryIndex = Math.min(
      ...b.categories.map((category) => categories.indexOf(category))
    );

    return aCategoryIndex - bCategoryIndex;
  });
}

export function getRecipeId(recipe: Recipe) {
  return recipe.title.split(" ").join("-");
}

export const recipes: Recipe[] = [
  {
    title: "Jasmine Rice (Instant-Pot)",
    categories: ["Rice", "Instant-Pot"],
    source: "https://aidenjn.github.io/foodstuff/#jasmine-rice",
    ingredients: [
      {
        quantity: 1,
        measurement: "cup",
        name: "Jasmine Rice",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1.25,
        measurement: "cup",
        name: "Water",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "teaspoon",
        name: "Salt",
        scaler: Scaler.Multiply,
      },
    ],
    steps: [
      "Rince rice and put into the instant-pot.",
      "Add water and salt to the instant-pot.",
      'Put the lid on the pot and click "Manual".',
      "Set time to 4 minutes on high pressure.",
      'Enjoy immediately or allow "Keep Warm" mode for up to 10 minutes.',
    ],
  },
  {
    title: "Long Grain White Rice (Instant-Pot)",
    categories: ["Rice", "Instant-Pot"],
    source: "https://aidenjn.github.io/foodstuff/#long-grain-white-rice",
    ingredients: [
      {
        quantity: 1,
        measurement: "cup",
        name: "Long grain white rice",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1.5,
        measurement: "cup",
        name: "Water",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "teaspoon",
        name: "Salt",
        scaler: Scaler.Multiply,
      },
    ],
    steps: [
      "Rince rice and put into the instant-pot.",
      "Add water and salt to the instant-pot.",
      'Put the lid on the pot and click "Manual".',
      "Set time to 5 minutes on high pressure.",
      'Enjoy immediately or allow "Keep Warm" mode for up to 10 minutes.',
    ],
  },
  {
    title: "Short Grain Brown Rice (Instant-Pot)",
    categories: ["Rice", "Instant-Pot"],
    source: "https://aidenjn.github.io/foodstuff/#short-grain-brown-rice",
    ingredients: [
      {
        quantity: 1,
        measurement: "cup",
        name: "Short grain brown rice",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1.25,
        measurement: "cup",
        name: "Water",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "teaspoon",
        name: "Salt",
        scaler: Scaler.Multiply,
      },
    ],
    steps: [
      "Rince rice and put into the instant-pot.",
      "Add water and salt to the instant-pot.",
      'Put the lid on the pot and click "Manual".',
      "Set time to 30 minutes on high pressure.",
      'Enjoy immediately or allow "Keep Warm" mode for up to 10 minutes.',
    ],
  },
  {
    title: "Mexican Lasagna",
    categories: ["Pasta"],
    source: "https://aidenjn.github.io/foodstuff/#mexican-lasagna",
    ingredients: [
      {
        quantity: 2,
        measurement: "pound",
        name: "Ground beef or ground turkey",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "count",
        name: "Onions, chopped",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "count",
        name: "Garlic clove, chopped",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "tablespoon",
        name: "Chili powder",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "teaspoon",
        name: "Paprika",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "teaspoon",
        name: "Cumin",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 4,
        measurement: "cup",
        name: "Tomato puree or tomato sauce",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 4,
        measurement: "ounce",
        name: "Diced green chiles (1 can)",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "cup",
        name: "Chopped black olives",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "tablespoon",
        name: "Salt",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 8,
        measurement: "count",
        name: "Corn tortillas",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "cup",
        name: "Small curd cottage cheese",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "count",
        name: "Egg, beaten",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 8,
        measurement: "ounce",
        name: "Monterey Jack cheese, shredded",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 4,
        measurement: "ounce",
        name: "Cheddar cheese, shredded",
        scaler: Scaler.Multiply,
      },
    ],
    steps: [
      "Heat oven to 350 degrees.",
      "Brown the meat in a skillet; drain.",
      "Add onion and garlic to the meat and cook until the onion is tender.",
      "Add the chili powder, cumin, and paprika.",
      "Stir in the tomato sauce, chiles, olives, and salt. Simmer for 15 minutes.",
      "Mix the cottage cheese and egg in a small bowl.",
      "Layer 1/3 of the ground beef mixture, 1/2 of the Monterey Jack cheese, 1/2 of the cottage cheese mixture, and 1/2 of the tortillas in a 9x13 baking dish.",
      "Top with 1/2 of the remaining ground beef mixture, the remaining Monterey Jack cheese, remaining cottage cheese mixture, remaining tortillas and remaining ground beef mixture.",
      "Sprinkle with the Cheddar Cheese.",
      "Bake for 30 minutes.",
    ],
  },
  {
    title: "Sticky Apricot Garlic Glazed Chicken",
    categories: ["Meats", "Chicken"],
    source:
      "https://www.food.com/recipe/so-easy-sticky-apricot-garlic-glazed-chicken-148046?units=us&scale=6",
    ingredients: [
      {
        quantity: 1,
        measurement: "cup",
        name: "Apricot preserves",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "cup",
        name: "White wine vinegar",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 4,
        measurement: "tablespoon",
        name: "Hot mustard",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "tablespoon",
        name: "Fresh garlic, chopped",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 14,
        measurement: "count",
        name: "Chicken pieces",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0,
        measurement: "noQuantity",
        name: "Salt",
        scaler: Scaler.Constant,
      },
      {
        quantity: 0,
        measurement: "noQuantity",
        name: "Pepper",
        scaler: Scaler.Constant,
      },
    ],
    steps: [
      "In a small saucepan, combine the apricot preserves, white wine vinegar, hot mustard, and garlic.",
      "Whisk the mixture over medium heat until the preserves melt, then set aside.",
      "Heat grill to medium-high heat.",
      "Season the chicken pieces with salt and pepper.",
      "Place the chicken skin-side down on the grill.",
      "Grill chicken for 20 minutes, turn over the chicken and continue to grill for another 15-20 minutes or until the chicken is cooked.",
      "Brush the chicken with glaze and turn occasionally during the final cooking stages.",
    ],
  },
  {
    title: "Extra-Billowy Dutch Baby",
    categories: ["Breakfast"],
    source:
      "https://smittenkitchen.com/2019/03/extra-billowy-dutch-baby-pancake/",
    ingredients: [
      {
        quantity: 3,
        measurement: "tablespoon",
        name: "Unsalted butter",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 4,
        measurement: "count",
        name: "Large eggs",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "cup",
        name: "All-purpose flour",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "cup",
        name: "Milk (ideally whole milk)",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.25,
        measurement: "teaspoon",
        name: "Kosher salt",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "tablespoon",
        name: "Granulated sugar or honey (optional for sweet version)",
        scaler: Scaler.Multiply,
      },
    ],
    steps: [
      "Preheat oven to 425°F with one 12-inch ovenproof skillet, two 9-inch skillets, or similarly sized baking dishes inside.",
      "In a large bowl or blender, beat eggs thoroughly with a whisk or fork.",
      "Add salt and flour, whisk until lumps disappear. Add milk and whisk until smooth. If making a sweet version, add sugar or honey.",
      "When the oven and baking dishes are fully heated, carefully remove them. Melt the butter inside the skillet(s) and roll it around to coat the sides.",
      "Pour the batter into the buttered dish(es) and return them to the oven.",
      "Bake for 12 to 13 minutes, then check in 1 to 2 minute increments until the edges are golden brown and the centers are just beginning to color.",
      "Finish sweet pancakes with lemon juice and powdered sugar.",
      "Serve immediately; these pancakes are best eaten hot from the oven.",
    ],
  },
  {
    title: "Buttermilk Pancakes",
    categories: ["Breakfast"],
    source: "https://www.goodreads.com/en/book/show/158935.The_Breakfast_Book",
    ingredients: [
      {
        quantity: 1,
        measurement: "cup",
        name: "buttermilk",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "count",
        name: "eggs, room temperature",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 3,
        measurement: "tablespoon",
        name: "butter, melted",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.75,
        measurement: "cup",
        name: "all-purpose flour",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "teaspoon",
        name: "salt",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "teaspoon",
        name: "baking soda",
        scaler: Scaler.Multiply,
      },
    ],
    steps: [
      "Put the buttermilk, egg, and melted butter in a mixing bowl.",
      "Stir briskly until the mixture is smooth and blended.",
      "Stir the flour, salt, and baking soda together in a small bowl so they are well blended.",
      "Stir into the buttermilk mixture only until the dry ingredients are moistened -leave the lumps.",
      "Heat a skillet or griddle to medium hot.",
      "Grease lightly and spoon out about 3 tablespoons of batter per pancake. Spread the batter with the back of the spoon so it is thinned out a little.",
      "Cook until a few bubbles break on top.",
      "Turn the pancake over and cook briefly.",
      "Keep pancakes warm until enough are cooked to serve.",
    ],
  },
  {
    title: "Yellow Cornmeal Pancakes",
    categories: ["Breakfast"],
    source: "https://www.goodreads.com/en/book/show/158935.The_Breakfast_Book",
    ingredients: [
      {
        quantity: 1,
        measurement: "cup",
        name: "buttermilk",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "count",
        name: "eggs, room temperature",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 3,
        measurement: "tablespoon",
        name: "butter, melted",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "cup",
        name: "all-purpose flour",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.25,
        measurement: "cup",
        name: "yellow cornmeal",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "teaspoon",
        name: "salt",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "teaspoon",
        name: "baking soda",
        scaler: Scaler.Multiply,
      },
    ],
    steps: [
      "Put the buttermilk, egg, and melted butter in a mixing bowl.",
      "Stir briskly until the mixture is smooth and blended.",
      "Stir the flour, cornmeal, salt, and baking soda together in a small bowl so they are well blended.",
      "Stir into the buttermilk mixture only until the dry ingredients are moistened -leave the lumps.",
      "Heat a skillet or griddle to medium hot.",
      "Grease lightly and spoon out about 3 tablespoons of batter per pancake. Spread the batter with the back of the spoon so it is thinned out a little.",
      "Cook until a few bubbles break on top.",
      "Turn the pancake over and cook briefly.",
      "Keep pancakes warm until enough are cooked to serve.",
    ],
  },
  {
    title: "Apple Puffy Pancake",
    categories: ["Breakfast"],
    source: "https://www.goodreads.com/en/book/show/158935.The_Breakfast_Book",
    ingredients: [
      {
        quantity: 12,
        measurement: "tablespoon",
        name: "butter",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 4,
        measurement: "count",
        name: "large apples, cored and sliced (McIntoshes are good)",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 6,
        measurement: "tablespoon",
        name: "lemon juice",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "teaspoon",
        name: "cinnamon",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 10,
        measurement: "tablespoon",
        name: "confectioners' sugar (depending on apple sweetness)",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 6,
        measurement: "count",
        name: "eggs, room temperature",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "teaspoon",
        name: "salt",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "cup",
        name: "all-purpose flour",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "cup",
        name: "milk (or half buttermilk, half milk)",
        scaler: Scaler.Multiply,
      },
    ],
    steps: [
      "Preheat the oven to 425°F.",
      "Melt the butter in a large skillet or shallow pan and take off heat. If the handle of the skillet is not ovenproof, wrap it with several layers of foil.",
      "Remove 1/3 of the melted butter and set aside in a small bowl.",
      "Put the apple slices in a large bowl with the lemon juice.",
      "Stir the cinnamon into the sugar and sprinkle the sugar mixture over the apple slices. Toss to mix.",
      "Put the skillet back on the burner and turn the heat to medium.",
      "Add the apples and cook, stirring often, for about 3 or 4 minutes, or until the apples are tender but still hold their shape.",
      "In a separate bowl (or blender, or food processor) combine the eggs, salt, flour, milk, and the reserved melted butter.",
      "Spread the apples evenly over the bottom of the skillet and pour the batter on top.",
      "Bake for about 20 minutes, or until golden and puffy.",
      "Turn immediately onto a warm platter so the apples are on top.",
      "Dust with a little confectioners' sugar and serve at once.",
    ],
  },
  {
    title: "Traeger Hamburgers",
    categories: ["Meats", "Beef"],
    ingredients: [
      {
        quantity: 1,
        measurement: "pound",
        name: "grass-fed ground beef 80% lean",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0,
        measurement: "noQuantity",
        name: "salt",
        scaler: Scaler.Constant,
      },
      {
        quantity: 0,
        measurement: "noQuantity",
        name: "freshly ground black pepper",
        scaler: Scaler.Constant,
      },
    ],
    steps: [
      "Form 1/3 lb patties from the ground beef. Create an indent in the middle as they will expand as they cook.",
      "Generously salt and pepper the patties on each side.",
      "Heat Traeger to high (~400-500 degrees).",
      "Grill burgers for 4-5 minutes (medium rare).",
      "Flip the burgers and cook for 4-5 more minutes.",
      "In the last minute of cooking, add a slice of cheese for cheese burgers.",
    ],
  },
];
