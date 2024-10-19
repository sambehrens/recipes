export type Recipe = {
  title: string;
  ingredients: Ingredient[];
  steps: string[];
  categories: Category[];
  source?: string;
  notes?: string;
  defaultMeasurement?: "weight";
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
  gram: {
    display: "gram",
    plural: "grams",
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
  weight?: Weight;
};

export type Weight = {
  quantity: number;
  measurement: keyof typeof Measurement;
};

export const categories = [
  "Breakfast",
  "Meats",
  "Chicken",
  "Beef",
  "Pork",
  "Fish",
  "Pasta",
  "Stew",
  "Bread",
  "Sourdough",
  "Salad",
  "Dressing",
  "Rice",
  "Dessert",
  "Instant-Pot",
  "Miscellaneous",
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
      "Rinse rice and put into the instant-pot.",
      "Add water and salt to the instant-pot.",
      'Put the lid on the pot and click "Manual".',
      "Set time to 4 minutes.",
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
      "Rinse rice and put into the instant-pot.",
      "Add water and salt to the instant-pot.",
      'Put the lid on the pot and click "Manual".',
      "Set time to 5 minutes.",
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
      "Rinse rice and put into the instant-pot.",
      "Add water and salt to the instant-pot.",
      'Put the lid on the pot and click "Manual".',
      "Set time to 30 minutes.",
      'Enjoy immediately or allow "Keep Warm" mode for up to 10 minutes.',
    ],
  },
  {
    title: "Sushi Rice (Instant-Pot)",
    categories: ["Rice", "Instant-Pot"],
    ingredients: [
      {
        quantity: 2,
        measurement: "cup",
        name: "short grain Calrose rice (e.g., Nishiki)",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "cup",
        name: "cold water",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1 / 3,
        measurement: "cup",
        name: "rice vinegar",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "tablespoon",
        name: "salt",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "tablespoon",
        name: "Sugar",
        scaler: Scaler.Multiply,
      },
    ],
    steps: [
      "Rinse the rice ten times.",
      "Place the rinsed rice into the Instant-Pot and add the cold water.",
      'Put the lid on the Instant-Pot and click "Manual".',
      "Set time to 5 minutes.",
      "While the rice cooks, add the rice vinegar, salt and sugar into a saucepan on medium heat.",
      "Whisk until the sugar and salt dissolve, then pour the mixture into a container to cool.",
      "When the rice is done, transfer it to a wide-bottomed container.",
      "Use a wooden or plastic paddle to spread the rice evenly.",
      "Pour the vinegar mixture over the rice and mix well.",
      "Let the rice cool for 20-30 minutes, stirring every 5 minutes to release steam.",
      "Once the rice is warm but not hot to the touch, it’s ready to use for making sushi.",
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
    title: "Sticky Apricot Glazed Chicken",
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
  {
    title: "Sourdough Loaf",
    source:
      "https://alexandracooks.com/2017/10/24/artisan-sourdough-made-simple-sourdough-bread-demystified-a-beginners-guide-to-sourdough-baking/",
    categories: ["Bread", "Sourdough"],
    defaultMeasurement: "weight",
    ingredients: [
      {
        quantity: 50,
        measurement: "gram",
        name: "bread flour (to feed starter)",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 50,
        measurement: "gram",
        name: "water, room temperature, filtered (to feed starter)",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "cup",
        name: "bubbly, active starter",
        scaler: Scaler.Multiply,
        weight: {
          quantity: 100,
          measurement: "gram",
        },
      },
      {
        quantity: 1.5 + 1 / 16,
        measurement: "cup",
        name: "room temperature, filtered water",
        scaler: Scaler.Multiply,
        weight: {
          quantity: 375,
          measurement: "gram",
        },
      },
      {
        quantity: 4 + 1 / 8,
        measurement: "cup",
        name: "bread flour",
        scaler: Scaler.Multiply,
        weight: {
          quantity: 500,
          measurement: "gram",
        },
      },
      {
        quantity: 2.5,
        measurement: "teaspoon",
        name: "sea salt",
        scaler: Scaler.Multiply,
        weight: {
          quantity: 12,
          measurement: "gram",
        },
      },
      {
        quantity: 0,
        measurement: "noQuantity",
        name: "rice flour",
        scaler: Scaler.Constant,
      },
    ],
    steps: [
      "Feed the starter with the flour and water. Let it double in size at room temperature.",
      "Mix the starter and water together in a large bowl with a spatula.",
      "Add the flour and salt. Mix to combine, finishing by hand if necessary to form a rough dough.",
      "Move dough to the proofing container and cover with a towel to let rest for 30 minutes.",
      "After 30 minutes, stretch and fold: Grab a corner of the dough, pull it up, and fold it into the center. Repeat 4 to 5 times.",
      "Let the dough rest for another 30 minutes and repeat the stretching and folding.",
      "If you have time, repeat the stretching and folding twice more over 2 hours.",
      "Cover the container with a towel and let rise for 8-10 hours at 70°F (21°C), or until it increases by 50% in volume.",
      "If in a warm environment, monitor the rise more closely. Use visual cues to determine when the bulk fermentation is done.",
      "Transfer the dough onto a lightly floured surface and gently shape it into a round.",
      "Let the dough rest seam-side up for 30 minutes.",
      "Line an 8-inch bowl or proofing basket with a rice-floured towel.",
      "Shape the dough again and place it seam-side up into the lined bowl.",
      "Cover the dough and refrigerate for 1 to 48 hours (24 hours recommended).",
      "Preheat the oven to 550°F (290°C) with a Dutch oven inside.",
      "Cut a piece of parchment to fit the baking pot.",
      "Place the parchment over the dough and invert the bowl to release it.",
      "Score the dough with a knife or razor blade (a simple 'X' works well).",
      "Lower the oven temperature to 450°F (230°C), transfer the dough to the preheated pot, cover, and bake for 30 minutes.",
      "Remove the lid (or remove the loaf from the dutch oven entirely), lower the oven to 400°F (200°C), and bake for 10-15 minutes more.",
      "If needed, lift the loaf out and bake directly on the oven rack for the last 5-10 minutes.",
      "Cool on a wire rack for 1 hour before slicing.",
      "Store at room temperature in an airtight container for up to 3 days, or freeze for longer storage.",
    ],
  },
  {
    title: "Sourdough Focaccia",
    source:
      "https://alexandracooks.com/2019/03/22/simple-sourdough-focaccia-a-beginners-guide/",
    categories: ["Bread", "Sourdough"],
    defaultMeasurement: "weight",
    ingredients: [
      {
        quantity: 50,
        measurement: "gram",
        name: "bread flour (to feed starter)",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 50,
        measurement: "gram",
        name: "water, room temperature, filtered (to feed starter)",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "cup",
        name: "active starter",
        scaler: Scaler.Multiply,
        weight: {
          quantity: 100,
          measurement: "gram",
        },
      },
      {
        quantity: 2.5,
        measurement: "teaspoon",
        name: "kosher salt",
        scaler: Scaler.Multiply,
        weight: {
          quantity: 10,
          measurement: "gram",
        },
      },
      {
        quantity: 1.75,
        measurement: "cup",
        name: "room temperature water",
        scaler: Scaler.Multiply,
        weight: {
          quantity: 440,
          measurement: "gram",
        },
      },
      {
        quantity: 4,
        measurement: "cup",
        name: "bread flour",
        scaler: Scaler.Multiply,
        weight: {
          quantity: 512,
          measurement: "gram",
        },
      },
      {
        quantity: 3,
        measurement: "tablespoon",
        name: "extra-virgin olive oil, divided",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0,
        measurement: "noQuantity",
        name: "flaky sea salt, such as Maldon, for sprinkling",
        scaler: Scaler.Multiply,
      },
    ],
    steps: [
      "Feed the starter with the flour and water. Let it double in size at room temperature.",
      "Place the starter, salt, and water in a large bowl and stir with a spatula to combine.",
      "Add the flour and mix until fully incorporated.",
      "If time allows, perform one 'fold': 30 minutes after mixing, pull the dough up and into the center, rotating the bowl between pulls. Repeat 8-10 times.",
      "Drizzle a splash of olive oil over the dough and rub to coat.",
      "Cover the bowl and let the dough rise at room temperature for 4 to 18 hours, until doubled in volume.",
      "Prepare a 9×13-inch pan by adding 2 tablespoons of olive oil (butter the pan if using glass to prevent sticking).",
      "Gently deflate the dough and release it from the bowl. Scoop it into the prepared pan.",
      "Fold the dough envelope-style from top to bottom and side to side, forming a rough rectangle. Turn seam-side down.",
      "Rub the top with oil and let it rest uncovered for 4 to 6 hours, until puffy and nearly doubled.",
      "Preheat the oven to 425ºF.",
      "Rub hands lightly with oil and press all ten fingers gently into the dough to dimple and stretch it to nearly fit the pan.",
      "Sprinkle generously with flaky sea salt.",
      "Bake for about 25-30 minutes, or until golden all around.",
      "Transfer the bread to a cooling rack and let cool for at least 20 minutes before slicing.",
    ],
  },
  {
    title: "Skillet Sourdough Biscuits",
    categories: ["Bread", "Sourdough"],
    source:
      "https://www.kingarthurbaking.com/recipes/the-simplest-sourdough-biscuits-recipe",
    defaultMeasurement: "weight",
    ingredients: [
      {
        quantity: 1,
        measurement: "cup",
        name: "all-purpose flour",
        scaler: Scaler.Multiply,
        weight: {
          quantity: 120,
          measurement: "gram",
        },
      },
      {
        quantity: 1,
        measurement: "tablespoon",
        name: "baking powder",
        scaler: Scaler.Multiply,
        weight: {
          quantity: 12,
          measurement: "gram",
        },
      },
      {
        quantity: 0.25,
        measurement: "teaspoon",
        name: "salt",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 4,
        measurement: "tablespoon",
        name: "unsalted butter, cold, thinly sliced",
        scaler: Scaler.Multiply,
        weight: {
          quantity: 60,
          measurement: "gram",
        },
      },
      {
        quantity: 3 / 8,
        measurement: "cup",
        name: "sourdough starter",
        scaler: Scaler.Multiply,
        weight: {
          quantity: 90,
          measurement: "gram",
        },
      },
      {
        quantity: 2,
        measurement: "tablespoon",
        name: "milk or heavy cream, plus more if needed to bring the dough together",
        scaler: Scaler.Multiply,
        weight: {
          quantity: 30,
          measurement: "gram",
        },
      },
    ],
    steps: [
      "Preheat the oven to 450°F.",
      'Rub a 9" or larger cast iron skillet with a bit of oil and place it in the top third of the oven.',
      "In a medium bowl, whisk together the flour, baking powder, and salt.",
      "Work in the cold butter, mixing until fairly well combined but with some small chunks of butter remaining intact.",
      "Stir in the starter, then the milk or cream, adding enough to make a cohesive, firm dough.",
      "Transfer the dough to a greased piece of parchment or waxed paper, or other greased work surface.",
      "Knead it gently several times to smooth it out.",
      'Fold it in thirds like a letter, then pat it into a rough 4” x 8” rectangle; it should be a scant 3/4" thick.',
      "Flip the rectangle over so the smoother side is on top.",
      "Cut eight square biscuits, or use a 2” biscuit cutter to cut rounds, patting together the scraps as necessary to cut additional biscuits",
      "Wrap the biscuits in the parchment or waxed paper and place them in the freezer while the oven finishes preheating.",
      "Remove the hot skillet from the oven.",
      "Unwrap the biscuits and arrange them in the skillet (or on the baking sheet).",
      "Place the skillet or pan on the oven’s upper rack.",
      "Bake the biscuits for about 12 to 14 minutes. The biscuits should be lightly browned.",
      "Remove the biscuits from the oven and brush them with melted butter, if desired; brown butter is especially yummy.",
      "Allow the biscuits to cool completely, then store airtight at room temperature for several days.",
    ],
  },
  {
    title: "Beer Battered Fish",
    categories: ["Meats", "Fish"],
    source:
      "https://www.food.com/recipe/beer-battered-fish-130102?units=us&scale=8",
    ingredients: [
      {
        quantity: 1,
        measurement: "noQuantity",
        name: "avocado oil (for frying)",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 8,
        measurement: "count",
        name: "(4 ounce) cod fish fillets",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "cup",
        name: "all-purpose flour",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "tablespoon",
        name: "garlic powder",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "tablespoon",
        name: "paprika",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "teaspoon",
        name: "salt",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "teaspoon",
        name: "ground black pepper",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "count",
        name: "egg, beaten",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 12,
        measurement: "ounce",
        name: "bottle of beer",
        scaler: Scaler.Multiply,
      },
    ],
    steps: [
      "Heat oil in a deep fryer to 365°F (185°C).",
      "Rinse fish, pat dry, and season with salt and pepper.",
      "In a bowl, combine flour, garlic powder, paprika, salt, and pepper.",
      "Stir the beaten egg into the dry ingredients.",
      "Gradually mix in one beer until a thin batter forms (like pancake batter).",
      "Dip fish fillets into the batter, one at a time, then carefully drop them into the hot oil.",
      "Fry the fish, turning once, until both sides are golden brown.",
      "Drain the fried fish on paper towels and serve warm.",
    ],
  },
  {
    title: "Chicken and Dumplings",
    source: "https://thecozycook.com/chicken-and-dumplings/",
    categories: ["Stew"],
    ingredients: [
      {
        quantity: 1,
        measurement: "tablespoon",
        name: "olive oil",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "pound",
        name: "bone-in skinless chicken breast or thighs",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "noQuantity",
        name: "salt",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "noQuantity",
        name: "pepper",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 5,
        measurement: "tablespoon",
        name: "butter",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "count",
        name: "small yellow onion, diced",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "cup",
        name: "carrots, diced",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "count",
        name: "celery sticks, diced",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 3,
        measurement: "count",
        name: "garlic cloves, minced",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "teaspoon",
        name: "Worcestershire sauce",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "teaspoon",
        name: "hot sauce (e.g., Franks)",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1 / 3,
        measurement: "cup",
        name: "flour",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 4.5,
        measurement: "cup",
        name: "chicken broth",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "count",
        name: "chicken bouillon cube (optional)",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1.5,
        measurement: "cup",
        name: "half and half",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.75,
        measurement: "cup",
        name: "frozen peas",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "teaspoon",
        name: "onion powder",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "teaspoon",
        name: "dried basil",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "teaspoon",
        name: "dried parsley",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "teaspoon",
        name: "thyme",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "teaspoon",
        name: "rosemary",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "teaspoon",
        name: "mustard powder",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.25,
        measurement: "teaspoon",
        name: "ground sage",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.125,
        measurement: "teaspoon",
        name: "pepper",
        scaler: Scaler.Multiply,
      },
      // Dumplings
      {
        quantity: 2,
        measurement: "cup",
        name: "cake flour or all-purpose flour",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "teaspoon",
        name: "baking powder",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "teaspoon",
        name: "baking soda",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "teaspoon",
        name: "salt",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "teaspoon",
        name: "garlic powder",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "teaspoon",
        name: "sugar",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.75,
        measurement: "cup",
        name: "cold sour cream",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.25,
        measurement: "cup",
        name: "cold milk",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 4,
        measurement: "tablespoon",
        name: "butter, melted",
        scaler: Scaler.Multiply,
      },
    ],
    steps: [
      "Season the chicken with salt and pepper. Heat olive oil in a soup pot over medium-high heat and sear the chicken for 3 minutes per side. Let the chicken rest for 10 minutes, then dice into bite-sized pieces.",
      "Combine the onion powder, dried basil, parsley, thyme, rosemary, mustard powder, ground sage, and pepper and set aside.",
      "Melt butter in the same pot over medium heat and scrape the bottom of the pot.",
      "Add diced onions, carrots, and celery, cooking for 5 minutes.",
      "Add garlic, Worcestershire sauce, hot sauce, and seasonings. Cook for 1 minute.",
      "Add flour and toss to coat. Cook for 2 minutes, stirring continuously.",
      "Add chicken broth in small splashes, stirring continuously and scraping the bottom of the pot. Add half and half and bouillon if using.",
      "Add frozen peas and bring to a gentle boil. Let the soup simmer uncovered while you make the dumplings.",
      "For the dumplings, combine flour, baking powder, baking soda, salt, garlic powder, and sugar in a bowl.",
      "Add cold milk, sour cream, and melted butter. Use a folding motion to form a dough, being careful not to overmix.",
      "Add the chicken and any juices back into the soup and stir to combine. Reduce the heat to low.",
      "Use a cookie scoop to place the dumplings evenly over the soup. Spoon a little liquid over each dumpling.",
      "Cover tightly and increase the heat slightly to bring the soup to a gentle simmer. Set a timer for 15 minutes without lifting the lid for the dumplings to steam.",
      "After 15 minutes, check the dumplings with a toothpick. If it comes out clean, it’s ready. If not, cover and simmer for a few more minutes.",
      "Once the dumplings are cooked through, garnish with parsley and serve!",
    ],
  },
  {
    title: "How To Start the Traeger",
    categories: ["Miscellaneous"],
    ingredients: [],
    steps: [
      "Close any windows that are open near the grill.",
      "Take the cover off and roll it out so it is not next to the house and plug it in.",
      "Verify that there are plenty of pellets in the hopper.",
      "Clean off the grill grates.",
      "(Important!) With the lid open, turn the dial to 'Smoke'.",
      "Once the grill has started emitting smoke (~5 minutes), turn the dial to your desired temperature and close the lid.",
      "When the grill has reached the desired temperature, grill away!",
      "(Important!) When you are finished grilling, turn the dial to 'Shutdown Cycle'. Do not unplug the grill or turn the power switch off.",
      "Once you don't hear the grill humming anymore, turn the power switch off and unplug it from the outlet.",
      "Once the grill is barely warm or cool to the touch, roll it next to the house and put the cover on it.",
    ],
  },
  {
    title: "Pok Pok Chicken Wings",
    categories: ["Meats", "Chicken"],
    ingredients: [
      {
        quantity: 0.5,
        measurement: "cup",
        name: "Vietnamese fish sauce (3 Crabs recommended)",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "cup",
        name: "granulated palm sugar",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 4,
        measurement: "count",
        name: "garlic cloves, divided",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "tablespoon",
        name: "lime juice",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 3,
        measurement: "pound",
        name: "chicken wings, split at the joints, tips discarded",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "tablespoon",
        name: "avocado oil",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "tablespoon",
        name: "chopped cilantro",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "tablespoon",
        name: "chopped mint",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "noQuantity",
        name: "chili flakes (optional)",
        scaler: Scaler.Multiply,
      },
    ],
    steps: [
      "In a small saucepan, combine the fish sauce and palm sugar. Warm over low heat, stirring occasionally until the sugar melts.",
      "Add 2 crushed garlic cloves and lime juice to the sauce.",
      "Place the wings in a large container. Pour the sauce over the wings, toss to coat, cover, and refrigerate for 3 hours, tossing occasionally.",
      "Heat the grill to medium-high. Meanwhile, mince the remaining 2 garlic cloves.",
      "In a small saucepan, heat the oil over medium heat. Fry the minced garlic until golden. Remove with a slotted spoon and drain on paper towels. Discard the oil and wipe out the pan.",
      "Remove the wings from the marinade, allowing the excess to drip off.",
      "Grill the wings over direct heat for 12-15 minutes, turning frequently and lowering the heat if they start to burn.",
      "Pour the marinade into the saucepan and simmer over medium-high heat until thick and syrupy, about 5 minutes.",
      "When the wings are done, transfer them to a platter and pour the syrupy sauce over them. Toss to coat.",
      "Garnish with fried garlic, cilantro, mint, and chili flakes. Serve immediately.",
    ],
  },
  {
    title: "Gnocchi with Tomato Sauce",
    source:
      "https://cooking.nytimes.com/recipes/1015178-marcella-hazans-tomato-sauce",
    categories: ["Pasta"],
    ingredients: [
      {
        quantity: 1,
        measurement: "pound",
        name: "gnocchi, (Trader Joes is good)",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "count",
        name: "28 oz can of San Marzano whole peeled tomatoes",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 5,
        measurement: "tablespoon",
        name: "butter",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 4,
        measurement: "pinch",
        name: "salt",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0,
        measurement: "noQuantity",
        name: "pepper",
        scaler: Scaler.Constant,
      },
    ],
    steps: [
      "Combine the tomatoes, their juices, the butter and the onion halves in a saucepan. Add half the salt.",
      "Place over medium heat and bring to a simmer.",
      "Cook, uncovered, for about 45 minutes. Stir occasionally, mashing any large pieces of tomato with a spoon.",
      "Add salt as needed.",
      "While the sauce cooks, boil a pot of water with half the remaining salt for the gnocchi.",
      "Once the pot has come to a boil, add the gnocci.",
      "Gnocchi cooks quickly. As they float to the top, remove them from the water and place them into a pasta bowl.",
      "Discard the onion from the sauce before tossing the sauce with pasta.",
    ],
  },
  {
    title: "Apple Cider Vinaigrette",
    categories: ["Salad", "Dressing"],
    ingredients: [
      {
        quantity: 1 / 3,
        measurement: "cup",
        name: "extra-virgin olive oil",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.25,
        measurement: "cup",
        name: "apple cider vinegar",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "tablespoon",
        name: "Dijon mustard",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "count",
        name: "shallot, minced",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.25,
        measurement: "teaspoon",
        name: "fine sea salt",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.25,
        measurement: "teaspoon",
        name: "freshly ground black pepper",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "teaspoon",
        name: "maple syrup, (optional)",
        scaler: Scaler.Multiply,
      },
    ],
    steps: [
      "Combine the olive oil, vinegar, mustard, shallot, salt, and pepper in a glass jar with a lid.",
      "Shake the jar vigorously until the mixture is emulsified.",
      "Store the dressing in the fridge for up to 1 week. If the oil solidifies, microwave on low until melted.",
    ],
  },
  {
    title: "Balsamic Vinaigrette",
    categories: ["Salad", "Dressing"],
    ingredients: [
      {
        quantity: 4,
        measurement: "tablespoon",
        name: "extra-virgin olive oil",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "tablespoon",
        name: "balsamic vinegar",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "teaspoon",
        name: "maple syrup",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.75,
        measurement: "teaspoon",
        name: "Dijon mustard",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "pinch",
        name: "sea salt",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "noQuantity",
        name: "freshly ground black pepper",
        scaler: Scaler.Multiply,
      },
    ],
    steps: [
      "Place all dressing ingredients in a glass jar with a lid.",
      "Shake the jar vigorously until the mixture is emulsified.",
    ],
  },
  {
    title: "Lemon Miso Dressing",
    categories: ["Salad", "Dressing"],
    ingredients: [
      {
        quantity: 0.5,
        measurement: "cup",
        name: "extra-virgin olive oil",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1 / 3,
        measurement: "cup",
        name: "lemon juice",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "count",
        name: "garlic cloves, minced",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "teaspoon",
        name: "miso paste (preferably mellow white)",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.5,
        measurement: "teaspoon",
        name: "fine sea salt",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 0.25,
        measurement: "teaspoon",
        name: "freshly ground black pepper",
        scaler: Scaler.Multiply,
      },
    ],
    steps: [
      "Combine the olive oil, lemon juice, garlic, miso, salt, and pepper in a glass jar with a lid.",
      "Use a fork to stir in the miso, then shake vigorously to emulsify.",
      "Store in the fridge for up to 1 week. If the oil solidifies, briefly microwave on low until melted.",
    ],
  },
  {
    title: "Fennel-Rubbed Pork Chops",
    categories: ["Meats", "Pork"],
    ingredients: [
      {
        quantity: 2,
        measurement: "tablespoon",
        name: "fennel seed",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "tablespoon",
        name: "light brown sugar",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 4,
        measurement: "teaspoon",
        name: "kosher salt, plus more as needed",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "teaspoon",
        name: "freshly ground black pepper",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "count",
        name: "(1½-inch-thick) bone-in pork chops",
        scaler: Scaler.Multiply,
        weight: {
          quantity: 2.5,
          measurement: "pound",
        },
      },
      {
        quantity: 2,
        measurement: "tablespoon",
        name: "avocado oil",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "count",
        name: "fennel bulbs, sliced lengthwise ¼ inch thick",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 1,
        measurement: "cup",
        name: "fresh herbs, such as parsley, cilantro, dill, and/or tarragon, coarsely chopped",
        scaler: Scaler.Multiply,
      },
      {
        quantity: 2,
        measurement: "tablespoon",
        name: "finely grated lemon zest",
        scaler: Scaler.Multiply,
      },
    ],
    steps: [
      "Toast the fennel seed in a small skillet over medium heat, swirling until fragrant and light golden brown, about 2 minutes.",
      "Remove from heat and grind or finely chop.",
      "Combine the toasted fennel seed with brown sugar, salt, and pepper.",
      "Rub the mixture all over the pork chops.",
      "Cover and let sit for at least 30 minutes at room temperature, or up to 24 hours in the refrigerator.",
      "Heat the avocado oil in a large skillet over medium-high heat.",
      "Sear the pork chops until caramelized on one side, about 5 to 8 minutes.",
      "Flip the pork chops and add the sliced fennel to the skillet. Cook, stirring the fennel occasionally, until tender and golden brown, without disturbing the pork chops.",
      "Continue cooking until the thickest part of the pork chop registers 145°F with an instant-read thermometer, another 8 to 10 minutes.",
      "Transfer the meat to a cutting board to rest for a few minutes.",
      "Meanwhile, combine the herbs and lemon zest in a small bowl and season with salt.",
      "Serve the pork chops with the cooked fennel and garnish with the herb mixture.",
    ],
  },
];
