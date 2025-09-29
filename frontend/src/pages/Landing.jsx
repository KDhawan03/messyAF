import React, {useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import MealPanels from "../components/MealPanels";
import Calendar from "../components/Calendar";
import "react-calendar/dist/Calendar.css";
import '../styling/Landing.css'

const Landing = () => {
  const today = new Date();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayName = dayNames[today.getDay()];

  const selectedDay = todayName;

  const menu = [
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
        Lunch: ["Plain Rice", "Dal", "Mixed Veg", "Roti (2)", "Curd"],
        Snacks: ["Veg Cutlets (2 pcs)", "Lime Juice / Coffee"],
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
          "Bread (2 pcs)",
          "Jam & Butter",
          "Chutney",
          "Milk / Tea",
          "Banana / Egg (1 pc)",
        ],
        Lunch: ["Rajma", "Plain Rice", "Aloo Squash", "Roti (2)", "Curd"],
        Snacks: ["Maggi / Noodles", "Ketchup", "Tea"],
        Dinner: [
          "Jeera Rice",
          "Chana Dal",
          "Roti (2)",
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
          "Banana / Egg (1 pc)",
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
        Breakfast: ["Chole", "Bhatura", "Pickle (2 pcs)", "Tea"],
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
          "Ice Cream (1 scoop)",
        ],
      },
    },
  ];
  const todayMeals = menu.find((i) => i.day === selectedDay);

  const[dailyRatings, setDailyRatings] = useState({});
  const[mealStats, setMealStats] = useState({});

  useEffect(() => {
    loadUserRatings();
  }, []);

  const loadUserRatings = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await fetch(`http://localhost:3000/api/ratings/temp-user/${today}`);
      if(!response.ok) {
        throw new error('Failed to load ratings');
      }
      const ratings = await response.json();
      console.log('Loaded user ratings:', ratings);
      setDailyRatings(ratings);
    } catch (error) {
        console.error('Failed to load user ratings:', error);
    }
  };

  const handleRateMeal = async (mealType, rating) => {
    console.log('Rating clicked:', mealType, rating);

    setDailyRatings(prev => {
      const newRatings = { ...prev, [mealType]: rating };
      console.log('Updated ratings:', newRatings);
      return newRatings;
    });
    
    try {
      const response = await fetch('http://localhost:3000/api/rate', {
        method: 'POST', 
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
        user: 'temp-user', // Use actual user ID later
        date: new Date().toISOString().split('T')[0],
        ratings: {
          [mealType]:rating
        }
      })
    });
    if(!response.ok) {
      throw new Error('Failed to save rating')
    }
    const result = await response.json();
    console.log('Rating saved', result);
      } catch(error) {
        console.log('Failed to save rating:', error);
        setDailyRatings(prev => ({
          ...prev,
          [mealType]: 0
      }));
    }
  };

  const getCurrentMeals = () => {
    const hour = new Date().getHours();
    if(hour < 11) return ["Breakfast"];
    if(hour < 15) return ["Breakfast", "Lunch"];
    if(hour < 19) return ["Breakfast", "Lunch", "Snacks"];
    return ["Breakfast", "Lunch", "Snacks", "Dinner"];
  };
  const visibleMeals = getCurrentMeals();
  return (
    <div className="w-screen min-h-screen bg-[#abd1c6]">
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-6 p-6 pt-24 max-w-7xl mx-auto">
        <div className="flex-1 space-y-4">
          {visibleMeals.map((meal) => (
            <MealPanels
              key={meal}
              mealType={meal}
              items={todayMeals.meals[meal]}
              onRate = {handleRateMeal}
              currentRating = {dailyRatings[meal]}
              ratingStats = {mealStats[meal]}
            />
          ))}
        </div>
        <div className="w-full lg:w-80 bg-white rounded-lg p-4 shadow-lg h-fit sticky top-24">
          <h3 className="text-lg font-semibold mb-4 text-center">Calendar</h3>
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default Landing;
