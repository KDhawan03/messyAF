import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MealPanels from "../components/MealPanels";
import Calendar from "../components/Calendar";
import "react-calendar/dist/Calendar.css";
import '../styling/Landing.css'
import api from '../utils/axiosConfig';
import {getMealsForDay, getDayName } from '../data/menuData';

const Landing = () => {

  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateString, setSelectedDateString] = useState(new Date().toISOString().split('T')[0]);
  const selectedDay = getDayName(selectedDate);

  const todayMeals = getMealsForDay(selectedDay);
  
  const[dailyRatings, setDailyRatings] = useState({});
  const[user, setUser] = useState(null);
  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if(userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      loadUserRatings(parsedUser);
    } else {
      navigate('/signup');
    }

  }, [navigate]);


  const loadUserRatings = async (userData = user, date = selectedDateString) => {
    try {
      if(!userData) return;
      const response = await api.get(`/ratings/${userData.id}/${date}`);
      setDailyRatings(response.data);
    } catch (error) {
        console.error('Failed to load user ratings:', error);
        if(error.response?.status === 401) {
          localStorage.clear();
        }
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const dateString = date.toISOString().split('T')[0];
    setSelectedDateString(dateString);
    
    // Load ratings for selected date
    if (user) {
      loadUserRatings(user, dateString);
    }
  };

  const handleRateMeal = async (mealType, rating) => {

    setDailyRatings(prev => {
      const newRatings = { ...prev, [mealType]: rating };
      return newRatings;
    });
    
    try {
      const response = await api.post('/rate', {
        date: selectedDateString,
        ratings: {
          [mealType]:rating
        }
      });
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
  const visibleMeals = getCurrentMeals()
  return (
    <div className="w-screen h-screen bg-[#abd1c6]">
      <Navbar />
        <div className="flex flex-row justify-center ">
        <div className="flex flex-2 min-w-0 flex-col mt-[150px] gap-6 ml-[50px] max-w-4xl">
          {visibleMeals.map((meal) => (
            <MealPanels
              key={meal}
              mealType={meal}
              items={todayMeals.meals[meal]}
              onRate={handleRateMeal}
              currentRating={dailyRatings[meal]}
              selectedDate={selectedDateString}
            />
          ))}
        </div>
          <div className="flex flex-1 min-w-0 items-center justify-center">
            <Calendar onDateChange={handleDateChange} selectedDate={selectedDate} />
          </div>
        </div>
    </div>
  );
};
export default Landing
