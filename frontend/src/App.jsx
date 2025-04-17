import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import MealPanels from './components/MealPanels'
import Calendar from 'react-calendar'

function App() {
  
  const today = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const todayName = dayNames[today.getDay()];
  
  const [selectedDay, setSelectedDay] = useState(todayName)

  const menu = [
    {
      day : 'Monday',
      meals : {
        Breakfast: ['Aloo parantha', 'chai'],
        Lunch: [''],
        Snacks: [''],
        Dinner: ['']
      }
    }, 
    {
      day : 'Tuesday',
      meals : {
        Breakfast: ['Sattu parantha', 'chai'],
        Lunch: [''],
        Snacks: [''],
        Dinner: ['']
      }
    },
    {
      day : 'Wednesday',
      meals : {
        Breakfast: ['Aloo parantha', 'chai'],
        Lunch: [''],
        Snacks: [''],
        Dinner: ['']
      }
    },
    {
      day : 'Thursday',
      meals : {
        Breakfast: [' parantha', 'chai'],
        Lunch: [''],
        Snacks: [''],
        Dinner: ['']
      }
    },
    {
      day : 'Friday',
      meals : {
        Breakfast: ['Aloo parantha', 'chai'],
        Lunch: [''],
        Snacks: [''],
        Dinner: ['']
      }
    },
    {
      day : 'Saturday',
      meals : {
        Breakfast: ['Aloo parantha', 'chai'],
        Lunch: [''],
        Snacks: [''],
        Dinner: ['']
      }
    },
    {
      day : 'Sunday',
      meals : {
        Breakfast: ['Aloo parantha', 'chai'],
        Lunch: [''],
        Snacks: [''],
        Dinner: ['']
      }
    }
  ]

  const todayMeals = menu.find((i) => i.day === selectedDay)
  return (
    <div>
      <Navbar />
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
        <div className={'w-100'}>
          <Calendar/>
        </div>
      </div>
    </div>
  )
}

export default App
