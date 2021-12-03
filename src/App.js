import { useState } from "react";

import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Home from "./pages/Home/Home";
import Favourites from "./pages/Favourites/Favourites";

import "./App.css";

function App() {

  const { i18n } = useTranslation();

  const [defaultLanguage, setDefaultLanguage] = useState("")

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setDefaultLanguage(lang)
    // console.log('Lang ', lang)
  };


  return (
    <div className="wrapper">
      <div className="lang-btn">
        <button onClick={() => changeLanguage("en")} className={defaultLanguage === "en" ? "active-lang" : null}>EN</button>
        <button onClick={() => changeLanguage("uk")} className={defaultLanguage === "uk" ? "active-lang" : null}>UK</button>
      </div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </div>
  );
}

export default App;
