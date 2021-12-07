import { Trans, useTranslation } from "react-i18next";

import WeekContainer from "../WeekContainer/WeekContainer";

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
  onChangeDate,
  floorNumber
}) => {
  const { t } = useTranslation()

  return (
    <div className="info-side">
      <div className="today-info-container">
        {
          dataOfCity && <div className="today-info">
            <div className="humidity">
              <span className="title"><Trans>Humidity</Trans></span>
              <span className="value">{dataOfCity.consolidated_weather[defaultActive].humidity} %</span>
            </div>
            <div className="wind">
              <span className="title"><Trans>Wind</Trans></span>
              <span className="value">{floorNumber(dataOfCity.consolidated_weather[defaultActive].wind_speed)} <Trans>km/h</Trans></span>
            </div>
          </div>
        }

      </div>
      <WeekContainer
        dataOfCity={dataOfCity}
        dayWeek={dayWeek}
        getDayOfTheWeek={getDayOfTheWeek}
        changeActive={changeActive}
        defaultActive={defaultActive}
      />
      <div >
        <form className="location-form" onSubmit={getWeather}>
          <input
            className="location-input"
            type="text"
            placeholder={t("input")}
            value={city}
            onChange={inputHandler}
          />
          <button className="form-btn" type="submit"><FaSearchLocation className="location-search" /></button>
        </form>
      </div>
      {dataOfCity && <input type="date" onChange={onChangeDate} />}
    </div>
  );
}

export default WeatherInfo;