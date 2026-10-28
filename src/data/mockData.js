export const INITIAL_MENU = [
  {
    id: 1,
    name: "Bruschetta",
    category: "starters",
    price: 10.99,
    description: "Grilled bread rubbed with garlic and topped with olive oil and salt.",
    ingredients: "Bread, Tomatoes, Garlic, Basil, Olive Oil",
    isVegetarian: true,
    isGlutenFree: false,
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Chicken Alfredo",
    category: "mains",
    price: 18.99,
    description: "Fettuccine pasta tossed in a rich, creamy parmesan sauce with grilled chicken.",
    ingredients: "Fettuccine, Heavy Cream, Parmesan, Chicken",
    isVegetarian: false,
    isGlutenFree: false,
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=500&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Vegetable Pasta",
    category: "mains",
    price: 15.99,
    description: "Fresh seasonal vegetables sautéed with garlic, herbs, and olive oil over penne.",
    ingredients: "Penne, Zucchini, Bell Peppers, Tomatoes, Olive Oil",
    isVegetarian: true,
    isGlutenFree: false,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Garden Salad",
    category: "starters",
    price: 9.99,
    description: "Crisp mixed greens, cherry tomatoes, cucumbers, and a light vinaigrette.",
    ingredients: "Mixed Greens, Tomatoes, Cucumbers, Dressing",
    isVegetarian: true,
    isGlutenFree: true,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Chocolate Lava Cake",
    category: "desserts",
    price: 8.99,
    description: "Warm chocolate cake with a molten chocolate center, served with vanilla ice cream.",
    ingredients: "Chocolate, Flour, Sugar, Butter, Vanilla Ice Cream",
    isVegetarian: true,
    isGlutenFree: false,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop"
  }
];

export const AI_KNOWLEDGE_BASE = [
  { question: "What are today's specials?", answer: "Today's special is Chicken Alfredo for $18.99." },
  { question: "What vegetarian meals do you have?", answer: "We offer Vegetable Pasta, Margherita Pizza, and Garden Salad." },
  { question: "What do you recommend?", answer: "Based on popular orders, we recommend our Chicken Alfredo." },
  { question: "Do you have gluten-free options?", answer: "Yes. We offer gluten-free pasta and selected salads." },
  { question: "What is the most popular dessert?", answer: "Our Chocolate Lava Cake is our most popular dessert." },
  { question: "What did I order last time?", answer: "Your previous order was Chicken Alfredo and Chocolate Lava Cake." }
];
