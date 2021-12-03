import { Trans } from "react-i18next";

import { FaRegHeart } from "react-icons/fa";
import "./Weather.css";

const Weather = ({ activeDay, city, weekDay, convertToFahrenheit, defaultTemp, addToFavourite }) => {

  return (
    activeDay &&

    <div className="weather-side">
      <div className="weather-gradient"></div>
      <div className="date-container">
        <h2 className="date-dayname"><Trans>{weekDay}</Trans></h2>
        <span className="date-day">{activeDay.applicable_date.split('-').reverse().join('.')}</span>
        <span className="location">{city}</span>
        <div className="location-favourite" onClick={addToFavourite}>

          {/* {checkCity && <span><Trans>Added</Trans></span>} */}
          <span><Trans>Add to</Trans></span>
          <FaRegHeart className="favourite-icon" />
        </div>

      </div>
      <div className="weather-container">
        <div className="temperature">
          <button
            disabled={defaultTemp === "C"}
            onClick={() => convertToFahrenheit("C", activeDay)}
            className={defaultTemp === "C" ? "active-btn" : null}
          >
            ℃
          </button>
          <button
            disabled={defaultTemp === "F"}
            onClick={() => convertToFahrenheit("F", activeDay)}
            className={defaultTemp === "F" ? "active-btn" : null}
          >
            ℉
          </button>
        </div>
        <div>
          <h1 className="weather-temp">{Math.floor(activeDay.the_temp)}°{defaultTemp}</h1>
        </div>
        <h3 className="weather-desc"><Trans>{activeDay.weather_state_name}</Trans></h3>
      </div>
    </div>
  );
}

export default Weather;