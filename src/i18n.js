import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          "Humidity": "Humidity",
          "Wind": "Wind",
          "Sun": "Sun",
          "Mon": "Mon",
          "Tue": "Tue",
          "Wed": "Wed",
          "Thu": "Thu",
          "Fry": "Fry",
          "Sat": "Sat",
          "km/h": "km/h",
          "Sunday": "Sunday",
          "Monday": "Monday",
          "Tuesday": "Tuesday",
          "Wednesday": "Wednesday",
          "Thuthday": "Thuthday",
          "Fryday": "Fryday",
          "Saturday": "Saturday",
          "Add to": "Add to",
          "Snow": "Snow",
          "Sleet": "Sleet",
          "Hail": "Hail",
          "Thunder": "Thunder",
          "Heavy Rain": "Heavy Rain",
          "Light Rain": "Light Rain",
          "Showers": "Showers",
          "Heavy Cloud": "Heavy Cloud",
          "Light Cloud": "Light Cloud",
          "Clear": "Clear",
          "input": "Enter your city",
          "Are you sure you want to delete the weather forecast": "Are you sure you want to delete the weather forecast",
          "Yes": "Yes",
          "No": "No",
          "You do not have favourite weather forecasts": "You do not have favourite weather forecasts"
        }
      },
      uk: {
        translations: {
          "Humidity": "Вологість",
          "Wind": "Вітер",
          "Sun": "Нед",
          "Mon": "Пон",
          "Tue": "Вів",
          "Wed": "Сер",
          "Thu": "Чет",
          "Fry": "Птн",
          "Sat": "Суб",
          "km/h": "км/г",
          "Sunday": "Неділя",
          "Monday": "Понеділок",
          "Tuesday": "Вівторок",
          "Wednesday": "Середа",
          "Thuthday": "Четвер",
          "Fryday": "П'ятниця",
          "Saturday": "Субота",
          "Add to": "Додати",
          "Snow": "Сніжно",
          "Sleet": "Слизько",
          "Hail": "Град",
          "Thunder": "Грім",
          "Heavy Rain": "Сильна злива",
          "Light Rain": "Легка злива",
          "Showers": "Злива",
          "Heavy Cloud": "Хмарно",
          "Light Cloud": "Хмарно з проясненням",
          "Clear": "Сонячно",
          "input": "Введіть своє місто",
          "Are you sure you want to delete the weather forecast": "Чи ви впевнені що бажаєте видалити прогноз погоди",
          "Yes": "Так",
          "No": "Ні",
          "You do not have favourite weather forecasts": "У вас немає вибраних прогнозів погоди"
        }
      }
    },
    fallbackLng: "en",
    debug: true,
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;