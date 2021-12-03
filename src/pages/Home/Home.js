import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addCity } from "../../store/actions";

import Weather from "../../components/Weather/Weather";
import WeatherInfo from "../../components/WeatherInfo/WeatherInfo";

import { FaHeart } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const dayWeekFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thuthday", "Fryday", "Saturday"];
  const dayWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fry", "Sat"];
  const [city, setCity] = useState("");
  const [dataOfCity, setDataOfCity] = useState(null);
  const [cashCities, setCashCities] = useState([]);
  const [activeDay, setActiveDay] = useState(null)
  const [defaultActive, setDefaultActive] = useState(0);
  const [activeWeek, setActiveWeek] = useState(null);
  const [defaultTemp, setDefaultTemp] = useState("C");

  const dispatch = useDispatch();
  const favouritesList = useSelector(state => state.favourites.favourites);

  const getWeather = async () => {
    if (city !== "" && /[A-Za-z]/.test(city)) {
      const findCity = cashCities.find(item => item.city.toLowerCase() === city.toLowerCase());

      if (!findCity) {
        const getWoeid = await axios.get(`/search/?query=${city}`);
        setCashCities([...cashCities, { "city": getWoeid.data[0].title, "woeid": getWoeid.data[0].woeid }]);
        const getCity = await axios.get(`/${getWoeid.data[0].woeid}/`);
        getDatas(
          getCity.data,
          getCity.data.consolidated_weather[defaultActive],
          getDayOfTheWeek(getCity.data.consolidated_weather[defaultActive].applicable_date)
        );
      } else {
        const getCity = await axios.get(`/${findCity.woeid}/`);
        getDatas(
          getCity.data,
          getCity.data.consolidated_weather[defaultActive],
          getDayOfTheWeek(getCity.data.consolidated_weather[defaultActive].applicable_date)
        );
      }
    }
    setCity("");
  }

  const onChangeDate = (e) => {
    console.log(e.target.value)
  }

  const getDatas = (dataCity, actDay, week) => {
    setDataOfCity(dataCity);
    setActiveDay(actDay);
    setActiveWeek(week);
  }

  const inputHandler = (city) => {
    setCity(city);
  }

  const getDayOfTheWeek = (date) => {
    const day = new Date(date);
    return day.getDay()
  }

  const changeActive = (id, day) => {
    setDefaultActive(id);
    setActiveDay(day);
    setActiveWeek(getDayOfTheWeek(day.applicable_date));
    setDefaultTemp("C");
  }

  const convertToFahrenheit = (temp, day) => {
    if (temp === "F") {
      setActiveDay({ ...activeDay, the_temp: (day.the_temp * 9 / 5) + 32 })
      setDefaultTemp(temp);
    } else {
      setActiveDay({ ...activeDay, the_temp: (day.the_temp - 32) * 5 / 9 })
      setDefaultTemp(temp);
    }
  }

  const addToFavourite = () => {
    const elem = favouritesList.find(item => item.id === dataOfCity.woeid)
    if (!elem) {
      dispatch(addCity(dataOfCity.woeid, dataOfCity.title));
    }
  }

  return (
    <div className="container">
      <Link to="/favourites"><FaHeart className="favourite-icon-link" /></Link>
      <Weather
        activeDay={activeDay}
        city={dataOfCity && dataOfCity.title}
        weekDay={dayWeekFull[activeWeek]}
        convertToFahrenheit={convertToFahrenheit}
        defaultTemp={defaultTemp}
        addToFavourite={addToFavourite}
      />
      <WeatherInfo
        inputHandler={inputHandler}
        getWeather={getWeather}
        dataOfCity={dataOfCity}
        setActiveDay={setActiveDay}
        defaultActive={defaultActive}
        setDefaultActive={setDefaultActive}
        dayWeek={dayWeek}
        getDayOfTheWeek={getDayOfTheWeek}
        changeActive={changeActive}
        setActiveWeek={setActiveWeek}
        city={city}
        onChangeDate={onChangeDate}
      />
    </div>
  );
}

export default Home;