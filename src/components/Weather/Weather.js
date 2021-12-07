import { Trans } from "react-i18next";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import "./Weather.css";

const Weather = ({
  activeDay,
  city,
  weekDay,
  convertToFahrenheit,
  convertToCelcius,
  defaultTemp,
  addToFavourite,
  isAdd,
  floorNumber
}) => {

  return (

    activeDay &&

    <div className="weather-side">
      <div className="weather-gradient"></div>
      <div className="date-container">
        <h2 className="date-dayname"><Trans>{weekDay}</Trans></h2>
        <span className="date-day">{activeDay.applicable_date.split('-').reverse().join('.')}</span>
        <span className="location">{city}</span>
        {isAdd && isAdd.isAdded && <div className="location-favourite" onClick={addToFavourite}>
          <span ><Trans>Added</Trans></span>
          <FaHeart className="favourite-icon" />
        </div>}
        {!isAdd && <div className="location-favourite" onClick={addToFavourite}>
          <span><Trans>Add to</Trans></span>
          <FaRegHeart className="favourite-icon" />
        </div>}
      </div>
      <div className="weather-container">
        <div className="temperature">
          <button
            disabled={defaultTemp === "C"}
            onClick={convertToFahrenheit}
            className={defaultTemp === "C" ? "active-btn" : null}
          >
            ℃
          </button>
          <button
            disabled={defaultTemp === "F"}
            onClick={convertToCelcius}
            className={defaultTemp === "F" ? "active-btn" : null}
          >
            ℉
          </button>
        </div>
        <div>
          <h1 className="weather-temp">{floorNumber(activeDay.the_temp)}°{defaultTemp}</h1>
        </div>
        <h3 className="weather-desc"><Trans>{activeDay.weather_state_name}</Trans></h3>
      </div>
    </div>
  );
}

export default Weather;