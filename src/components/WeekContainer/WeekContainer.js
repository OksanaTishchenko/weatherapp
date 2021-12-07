import { Trans } from "react-i18next";

const WeekContainer = ({ dataOfCity, dayWeek, getDayOfTheWeek, changeActive, defaultActive }) => {
  return (
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
  );
}

export default WeekContainer;