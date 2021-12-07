import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addCity, addToCash, clearLink, addFromCalendar, removeCity } from "../../store/actions";

import Weather from "../../components/Weather/Weather";
import WeatherInfo from "../../components/WeatherInfo/WeatherInfo";
import Loader from "../../components/Loader/Loader";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaHeart } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const dayWeekFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thuthday", "Fryday", "Saturday"];
  const dayWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fry", "Sat"];
  const [city, setCity] = useState("");
  const [dataOfCity, setDataOfCity] = useState(null);
  const [activeDay, setActiveDay] = useState(null)
  const [defaultActive, setDefaultActive] = useState(0);
  const [activeWeek, setActiveWeek] = useState(null);
  const [defaultTemp, setDefaultTemp] = useState("C");
  const [loading, setLoading] = useState(false);
  const [isAdd, setIsAdd] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favouritesList = useSelector(state => state.favourites.favourites);
  const actLinkCity = useSelector(state => state.favourites.activeLink);
  const cashCities = useSelector(state => state.favourites.cashCities);

  const getWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (city !== "" && /[A-Za-z]/.test(city)) {
      const findCity = cashCities.find(item => item.title.toLowerCase() === city.toLowerCase());
      if (!findCity) {
        const getWoeid = await axios.get(`/search/?query=${city}`);
        if (getWoeid.data.length === 0) {
          toast.error("This city not found", {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        } else {
          const getCity = await axios.get(`/${getWoeid.data[0].woeid}/`);
          dispatch(addToCash(getCity.data));
          getDatas(
            getCity.data,
            getCity.data.consolidated_weather[defaultActive],
            getDayOfTheWeek(getCity.data.consolidated_weather[defaultActive].applicable_date)
          );
        }
      } else {
        getDatas(
          findCity,
          findCity.consolidated_weather[defaultActive],
          getDayOfTheWeek(findCity.consolidated_weather[defaultActive].applicable_date)
        );
      }
    }
    setLoading(false);
    setCity("");
  }

  const onChangeDate = (e) => {
    dispatch(addFromCalendar(e.target.value.split("-").join("/"), dataOfCity.woeid, dataOfCity.title));
    navigate("/calendar");
  }

  const floorNumber = (num) => {
    return Math.floor(num);
  }

  const getDatas = (dataCity, actDay, week) => {
    setDataOfCity(dataCity);
    setActiveDay(actDay);
    setActiveWeek(week);
  }

  const inputHandler = (e) => {
    setCity(e.target.value);
  }

  const getDayOfTheWeek = (date) => {
    const day = new Date(date);
    return day.getDay();
  }

  const changeActive = (id, day) => {
    setDefaultActive(id);
    setActiveDay(day);
    setActiveWeek(getDayOfTheWeek(day.applicable_date));
    setDefaultTemp("C");
  }

  const convertToFahrenheit = () => {
    setActiveDay({ ...activeDay, the_temp: (activeDay.the_temp - 32) * 5 / 9 });
    setDefaultTemp("C");
  }

  const convertToCelcius = () => {
    setActiveDay({ ...activeDay, the_temp: (activeDay.the_temp * 9 / 5) + 32 });
    setDefaultTemp("F");
  }

  const reloadCity = useCallback(async () => {
    if (actLinkCity !== null) {
      const findCity = cashCities.find(item => item.title.toLowerCase() === actLinkCity.toLowerCase());
      getDatas(
        findCity,
        findCity.consolidated_weather[defaultActive],
        getDayOfTheWeek(findCity.consolidated_weather[defaultActive].applicable_date)
      );
      dispatch(clearLink());
    }
  }, [cashCities, actLinkCity, defaultActive, dispatch])

  const checkIsAddedDay = useCallback(() => {
    if (dataOfCity) {
      const elem = favouritesList.find(item => item.id === dataOfCity.woeid);
      setIsAdd(elem)
    }
  }, [favouritesList, dataOfCity])

  const addToFavourite = () => {
    const elem = favouritesList.find(item => item.id === dataOfCity.woeid);
    if (!elem) {
      dispatch(addCity(dataOfCity.woeid, dataOfCity.title, true));
      toast.success("The forecast has been added", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    } else {
      dispatch(removeCity(isAdd.id));
      toast.error("The forecast has been deleted", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }
  }

  useEffect(() => {
    reloadCity();
    checkIsAddedDay()
  }, [reloadCity, checkIsAddedDay])

  return (
    <div className="container">
      <Link to="/favourites">
        <FaHeart className="favourite-icon-link" />
      </Link>
      {loading && <Loader />}

      {!loading && <Weather
        activeDay={activeDay}
        city={dataOfCity && dataOfCity.title}
        weekDay={dayWeekFull[activeWeek]}
        convertToFahrenheit={convertToFahrenheit}
        convertToCelcius={convertToCelcius}
        defaultTemp={defaultTemp}
        addToFavourite={addToFavourite}
        isAdd={isAdd}
        floorNumber={floorNumber}
      />}
      {!loading && <WeatherInfo
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
        floorNumber={floorNumber}
      />}
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Home;