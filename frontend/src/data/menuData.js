export const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  
export const menu = [
{
    day: "Monday",
    meals: {
    Breakfast: [
        "Aloo parantha (1 pc)",
        "Bread (2 pcs)",
        "Jam & Butter",
        "Milk / Tea",
        "Banana / Egg (1 pc)",
    ],
    Lunch: [
        "Jeera Rice",
        "Arhar Dal",
        "Bhindi Veg with Gravy",
        "Roti (2)",
        "Curd",
    ],
    Snacks: ["Papad", "Sauce"],
    Dinner: [
        "Plain Rice",
        "Masoor Dal",
        "Roti (2)",
        "Mix Veg / Paneer Masala",
        "Egg Rice / Chicken Masala",
    ],
    },
},
{
    day: "Tuesday",
    meals: {
    Breakfast: [
        "Aloo / Sattu Parantha",
        "Bread (2 pcs)",
        "Jam & Butter",
        "Milk / Tea",
        "Banana / Egg (1 pc)",
    ],
    Lunch: ["Plain Rice", "Dal", "Mixed Veg", "Roti", "Curd"],
    Snacks: ["Veg Cutlets", "Lime Juice / Coffee"],
    Dinner: [
        "Veg Biryani (Dahi + Raita)",
        "Mix Curry",
        "Suji Halwa / Gulab Jamun",
    ],
    },
},
{
    day: "Wednesday",
    meals: {
    Breakfast: [
        "Chole",
        "Aloo Parantha",
        "Bread",
        "Jam & Butter",
        "Chutney",
        "Milk / Tea",
        "Banana / Egg",
    ],
    Lunch: ["Rajma", "Plain Rice", "Aloo Squash", "Roti", "Curd"],
    Snacks: ["Maggi / Noodles", "Ketchup", "Tea"],
    Dinner: [
        "Jeera Rice",
        "Chana Dal",
        "Roti",
        "Kadhi Paneer / Veg Kofta",
        "Salad",
    ],
    },
},
{
    day: "Thursday",
    meals: {
    Breakfast: [
        "Bread (2 pcs)",
        "Jam & Butter",
        "Milk / Tea",
        "Banana / Egg",
    ],
    Lunch: ["Plain Rice", "Dal", "Mixed Veg", "Roti (2)", "Curd"],
    Snacks: ["Sandwich", "Sauce"],
    Dinner: [
        "Veg Pulao",
        "Chana Dal",
        "Roti",
        "Masoor Dal Tadka",
        "Bhindi / Mixed Veg",
    ],
    },
},
{
    day: "Friday",
    meals: {
    Breakfast: [
        "Plain Parantha",
        "Bread (2 pcs)",
        "Jam & Butter",
        "Milk / Tea",
        "Banana / Egg (1 pc)",
    ],
    Lunch: [
        "Rice",
        "Dal Tadka",
        "Aloo Methi / Kofta Curry",
        "Roti (2)",
        "Curd",
    ],
    Snacks: ["Boiled Chana / Sprouts", "Salt + Lemon", "Tea"],
    Dinner: [
        "Peas Pulao",
        "Dal Makhani",
        "Mix Veg",
        "Paneer Masala",
        "Roti (2)",
        "Egg Curry / Veg Kofta",
    ],
    },
},
{
    day: "Saturday",
    meals: {
    Breakfast: [
        "Vada (2 pcs)",
        "Sambar",
        "Coconut Chutney",
        "Bread (2 pcs)",
        "Jam & Butter",
        "Milk / Tea",
        "Banana / Egg (1 pc)",
    ],
    Lunch: [
        "Plain Rice",
        "Dal Makhani",
        "Aloo",
        "Roti (2)",
        "Fish Gravy (2 pc) / Paneer Curry",
    ],
    Snacks: ["Samosa (2 pcs)", "Chutney"],
    Dinner: ["Mix Khichdi", "Ghee", "Papad", "Pickle"],
    },
},
{
    day: "Sunday",
    meals: {
    Breakfast: ["Chole", "Bhatura", "Pickle", "Tea"],
    Lunch: [
        "Peas Pulao",
        "Chana Dal Fry",
        "Onion Salad",
        "Paneer Butter Masala / Chicken Gravy (4 pcs)",
    ],
    Snacks: ["NO SNACKS"],
    Dinner: [
        "Plain Rice",
        "Dal",
        "Roti",
        "Chole",
        "Mix Veg",
        "Ice Cream",
    ],
    },
},
];

export const getMealsForDay = (dayName) => {
  return menu.find((item) => item.day === dayName);
};

export const getDayName = (date) => {
  return dayNames[date.getDay()];
};