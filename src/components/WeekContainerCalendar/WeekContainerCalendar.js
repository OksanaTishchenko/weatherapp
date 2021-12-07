const WeekContainerCalendar = ({ dayForecast, changeActiveClass, defaultActiveClassCal }) => {
  return (
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
  );
}

export default WeekContainerCalendar;