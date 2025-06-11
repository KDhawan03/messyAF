import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import MealPanels from './components/MealPanels'
import Calendar from './components/Calendar'
import Signup from './components/Signup'
import 'react-calendar/dist/Calendar.css';

function App() {
  
  const today = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const todayName = dayNames[today.getDay()];
  
  const [selectedDay, setSelectedDay] = useState(todayName)

  const menu = [
    {
      day: 'Monday',
      meals: {
        Breakfast: ['Aloo parantha (1 pc)', 'Bread (2 pcs)', 'Jam & Butter', 'Milk / Tea', 'Banana / Egg (1 pc)'],
        Lunch: ['Jeera Rice', 'Arhar Dal', 'Bhindi Veg with Gravy', 'Roti (2)', 'Curd'],
        Snacks: ['Papad', 'Sauce'],
        Dinner: ['Plain Rice', 'Masoor Dal', 'Roti (2)', 'Mix Veg / Paneer Masala', 'Egg Rice / Chicken Masala']
      }
    },
    {
      day: 'Tuesday',
      meals: {
        Breakfast: ['Aloo / Sattu Parantha', 'Bread (2 pcs)', 'Jam & Butter', 'Milk / Tea', 'Banana / Egg (1 pc)'],
        Lunch: ['Plain Rice', 'Dal', 'Mixed Veg', 'Roti (2)', 'Curd'],
        Snacks: ['Veg Cutlets (2 pcs)', 'Lime Juice / Coffee'],
        Dinner: ['Veg Biryani (Dahi + Raita)', 'Mix Curry', 'Suji Halwa / Gulab Jamun']
      }
    },
    {
      day: 'Wednesday',
      meals: {
        Breakfast: ['Chole', 'Aloo Parantha', 'Bread (2 pcs)', 'Jam & Butter', 'Chutney', 'Milk / Tea', 'Banana / Egg (1 pc)'],
        Lunch: ['Rajma', 'Plain Rice', 'Aloo Squash', 'Roti (2)', 'Curd'],
        Snacks: ['Maggi / Noodles', 'Ketchup', 'Tea'],
        Dinner: ['Jeera Rice', 'Chana Dal', 'Roti (2)', 'Kadhi Paneer / Veg Kofta', 'Salad']
      }
    },
    {
      day: 'Thursday',
      meals: {
        Breakfast: ['Bread (2 pcs)', 'Jam & Butter', 'Milk / Tea', 'Banana / Egg (1 pc)'],
        Lunch: ['Plain Rice', 'Dal', 'Mixed Veg', 'Roti (2)', 'Curd'],
        Snacks: ['Sandwich', 'Sauce'],
        Dinner: ['Veg Pulao', 'Chana Dal', 'Roti', 'Masoor Dal Tadka', 'Bhindi / Mixed Veg']
      }
    },
    {
      day: 'Friday',
      meals: {
        Breakfast: ['Plain Parantha', 'Bread (2 pcs)', 'Jam & Butter', 'Milk / Tea', 'Banana / Egg (1 pc)'],
        Lunch: ['Rice', 'Dal Tadka', 'Aloo Methi / Kofta Curry', 'Roti (2)', 'Curd'],
        Snacks: ['Boiled Chana / Sprouts', 'Salt + Lemon', 'Tea'],
        Dinner: ['Peas Pulao', 'Dal Makhani', 'Mix Veg', 'Paneer Masala', 'Roti (2)', 'Egg Curry / Veg Kofta']
      }
    },
    {
      day: 'Saturday',
      meals: {
        Breakfast: ['Vada (2 pcs)', 'Sambar', 'Coconut Chutney', 'Bread (2 pcs)', 'Jam & Butter', 'Milk / Tea', 'Banana / Egg (1 pc)'],
        Lunch: ['Plain Rice', 'Dal Makhani', 'Aloo', 'Roti (2)', 'Fish Gravy (2 pc) / Paneer Curry'],
        Snacks: ['Samosa (2 pcs)', 'Chutney'],
        Dinner: ['Mix Khichdi', 'Ghee', 'Papad', 'Pickle']
      }
    },
    {
      day: 'Sunday',
      meals: {
        Breakfast: ['Chole', 'Bhatura', 'Pickle (2 pcs)', 'Tea'],
        Lunch: ['Peas Pulao', 'Chana Dal Fry', 'Onion Salad', 'Paneer Butter Masala / Chicken Gravy (4 pcs)'],
        Snacks: ['NO SNACKS'],
        Dinner: ['Plain Rice', 'Dal', 'Roti', 'Chole', 'Mix Veg', 'Ice Cream (1 scoop)']
      }
    }
  ];
  const todayMeals = menu.find((i) => i.day === selectedDay)
  return (
    <div>
      <Signup/>
      {/* <Navbar />
      <div className='flex justify-between pt-30 bg-[#abd1c6] min-h-screen'>
        <div className='flex flex-col flex-1'>
          {
            ['Breakfast', 'Lunch', 'Snacks', 'Dinner'].map((meal) => (
              <MealPanels 
                key={meal}
                mealType={meal}
                items={todayMeals.meals[meal]}
              />
            ))
          }
        </div>
        <div className={'w-96 bg-[#e8e4e6] self-start mt-38 rounded-lg mx-10'}>
          <Calendar/>
        </div>
      </div> */}
    </div>
  )
}

export default App
