import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Trans } from "react-i18next";
import axios from "axios";

import Loader from "../../components/Loader/Loader";
import WeekContainerCalendar from "../../components/WeekContainerCalendar/WeekContainerCalendar";

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

  useEffect(() => {
    getWeatherFromCalendar();
  }, [getWeatherFromCalendar]);

  if (!dayForecast.length || !activeCalendar) {
    return loading ?
      <Loader /> :
      <>
        <h1 className="forecast-empty"><Trans>This forecast is not yet available</Trans></h1>
        <Link to="/"><FaArrowLeft className="back-page" /></Link>
      </>
  }
  return (
    <div className="container container-calendar">
      <Link to="/">
        <FaArrowLeft className="back-page" />
      </Link>
      <div className="info-side">
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
        <WeekContainerCalendar
          dayForecast={dayForecast}
          changeActiveClass={changeActiveClass}
          defaultActiveClassCal={defaultActiveClassCal} />
      </div>

    </div>
  );
}

export default Calendar;