import { Trans, useTranslation } from "react-i18next";

import { FaSearchLocation } from "react-icons/fa";
import "./WeatherInfo.css";

const WeatherInfo = ({ inputHandler,
  getWeather,
  dataOfCity,
  defaultActive,
  dayWeek,
  getDayOfTheWeek,
  changeActive,
  city,
  onChangeDate
}) => {
  const { t } = useTranslation()
  return (
    <div className="info-side">
      <div className="today-info-container">
        {
          dataOfCity && (<div className="today-info">
            <div className="humidity">
              <span className="title"><Trans>Humidity</Trans></span>
              <span className="value">{dataOfCity && dataOfCity.consolidated_weather[defaultActive].humidity} %</span>

            </div>
            <div className="wind">
              <span className="title"><Trans>Wind</Trans></span>
              <span className="value">{dataOfCity && Math.floor(dataOfCity.consolidated_weather[defaultActive].wind_speed)} <Trans>km/h</Trans></span>

            </div>
          </div>)
        }

      </div>
      <div className="week-container">
        <ul className="week-list">
          {dataOfCity && dataOfCity.consolidated_weather.map((item, index) => (
            <li key={item.id} className={defaultActive === index ? "active" : null} onClick={() => changeActive(index, item)}>
              <div className="day-img">
                <img src={`https://www.metaweather.com/static/img/weather/png/${item.weather_state_abbr}.png`} alt="Img" />
              </div>
              {dayWeek.map((day, index) => (
                <span className="day-name" key={index + 1}>
                  {
                    index === getDayOfTheWeek(item.applicable_date)
                      ? <Trans>{dayWeek[index]}</Trans>
                      : null
                  }
                </span>
              ))}
              <span className="day-temp">{Math.floor(item.the_temp)}°C</span>
            </li>
          ))}
        </ul>
      </div>
      <div >
        <form className="location-form" onSubmit={e => e.preventDefault()}>
          <input
            className="location-input"
            type="text"
            placeholder={t("input")}
            value={city}
            onChange={e => inputHandler(e.target.value)}
          />
          <FaSearchLocation className="location-search" onClick={getWeather} />
        </form>
      </div>
      {/* {dataOfCity && <input type="date" onChange={onChangeDate} />} */}
    </div>
  );
}

export default WeatherInfo;