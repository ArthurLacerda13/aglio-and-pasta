import favorites from './favorites-massas.js';
import promotions from './promotion.js';

const extraProducts = [
  {
    id: "p-pizza-1",
    name: "Pizza Quattro Formaggi",
    description: "Creamy combination of Mozzarella, Gorgonzola, Parmigiano-Reggiano, and Fontina cheese with fresh herbs.",
    category: "Pizzas",
    rating: 9,
    price: 48.00,
    imagePath: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: "p-pizza-2",
    name: "Pizza Diavola",
    description: "Spicy Italian salami, San Marzano tomato sauce, fresh mozzarella, and hot chili oil.",
    category: "Pizzas",
    rating: 9,
    price: 46.50,
    imagePath: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: "p-risotto-1",
    name: "Risotto al Zafferano e Salsiccia",
    description: "Golden saffron Arborio rice with crumbled Italian sausage and aged Parmigiano.",
    category: "Rissotos",
    rating: 9,
    price: 52.00,
    imagePath: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: "p-wine-1",
    name: "Chianti Classico DOCG 2019",
    description: "Full-bodied Tuscan red wine with notes of ripe cherries, violets, and subtle spice.",
    category: "Wines",
    rating: 10,
    price: 120.00,
    imagePath: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: "p-wine-2",
    name: "Pinot Grigio delle Venezie",
    description: "Crisp and refreshing white wine with crisp apple, green pear, and citrus aromas.",
    category: "Wines",
    rating: 9,
    price: 89.00,
    imagePath: "https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: "p-starter-1",
    name: "Carpaccio di Manzo",
    description: "Paper-thin raw beef tenderloin, capers, arugula, shaved Parmesan, and truffle olive oil.",
    category: "Antipasti",
    rating: 9,
    price: 34.00,
    imagePath: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: "p-gelato-1",
    name: "Gelato Artigianale Pistacchio",
    description: "Authentic Sicilian pistachio gelato crafted with pure Bronte pistachios.",
    category: "Gelato",
    rating: 10,
    price: 18.00,
    imagePath: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=400&fit=crop"
  }
];

// Combine and deduplicate
const allProductsMap = new Map();

[...favorites, ...promotions, ...extraProducts].forEach((item, index) => {
  const key = item.name.toLowerCase();
  if (!allProductsMap.has(key)) {
    allProductsMap.set(key, {
      id: item.id || `product-${index}`,
      name: item.name,
      description: item.description,
      category: item.category === "Massas" ? "Pasta" : (item.category === "Rissotos" ? "Risotto" : item.category),
      rating: item.rating || 9,
      price: item.price || 35.00,
      imagePath: item.imagePath,
      desconto: item.desconto || 0,
      isFavorite: item.rating >= 9
    });
  }
});

export const allProducts = Array.from(allProductsMap.values());
export default allProducts;
