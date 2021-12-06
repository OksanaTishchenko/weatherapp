import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import { Trans } from "react-i18next";

import Loader from "../../components/Loader/Loader";

import { useSelector } from "react-redux";

import axios from "axios";

import { FaArrowLeft } from "react-icons/fa";
import "./Calendar.css";

const Calendar = () => {

  const [dayForecast, setDayForecast] = useState([]);
  const [defaultActiveClassCal, setDefaultActiveClassCal] = useState(0);
  const [activeDayCal, setActiveDayCal] = useState(null);
  const [loading, setLoading] = useState(false);

  const activeCalendar = useSelector(state => state.favourites.activeCalendar);

  const getWeatherFromCalendar = useCallback(async () => {
    setLoading(true);
    if (activeCalendar !== null) {
      const weatherDay = await axios.get(`/${activeCalendar.woeid}/${activeCalendar.date}/`);
      setDayForecast(weatherDay.data);
      setActiveDayCal(weatherDay.data[defaultActiveClassCal])
    }
    setLoading(false)
  }, [activeCalendar, setDayForecast, defaultActiveClassCal]);

  const changeActiveClass = (day, idx) => {
    setDefaultActiveClassCal(idx);
    setActiveDayCal(dayForecast[defaultActiveClassCal])
  }

  //console.log(activeCalendar.date);

  useEffect(() => {
    getWeatherFromCalendar();
  }, [getWeatherFromCalendar]);

  if (!dayForecast.length || !activeCalendar) {
    return loading ?
      <Loader /> :
      <>
        <h1><Trans>This forecast is not yet available</Trans></h1>
        <Link to="/"><FaArrowLeft className="back-page" /></Link>
      </>
  }
  return (
    <div className="container container-calendar">

      <Link to="/"><FaArrowLeft className="back-page" /></Link>
      {
        loading ? <Loader />
          : <div className="info-side">
            <div className="today-info-container">
              <div className="today-info">
                <div className="today-city"><Trans>Forecast for</Trans>: {activeCalendar.title}</div>
                <div className="today-city"><Trans>Date</Trans>: {activeCalendar.date}</div>
                <div className="humidity">
                  <span className="title"><Trans>Humidity</Trans></span>
                  <span className="value">{activeDayCal && activeDayCal.humidity}%</span>
                </div>
                <div className="wind">
                  <span className="title"><Trans>Wind</Trans></span>
                  <span className="value">{activeDayCal && Math.floor(activeDayCal.wind_speed)}<Trans>km/h</Trans></span>
                </div>
              </div>
            </div>
            <div className="week-container">
              <ul className="week-list">
                {dayForecast && dayForecast.map((item, index) => (
                  <li key={item.id} onClick={() => changeActiveClass(item, index)} className={defaultActiveClassCal === index ? "active" : null}>
                    <div className="day-img">
                      <img
                        src={`https://www.metaweather.com/static/img/weather/png/${item.weather_state_abbr}.png`}
                        alt="Img" />
                    </div>
                    <span className="day-name">{new Date(item.created).toLocaleTimeString()}</span>
                    <span className="day-temp">{Math.floor(item.the_temp)}°C</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
      }
    </div>
  );
}

export default Calendar;