import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Trans } from "react-i18next";

import { removeCity, activeLink } from "../../store/actions";

import Modal from "../../components/Modal/Modal";

import { FaTrashAlt, FaArrowLeft } from "react-icons/fa";
import "./Favourites.css";

const Favourites = () => {

  const [openModal, setOpenModal] = useState(false);
  const [currentCity, setCurrentCity] = useState(null);
  const favourites = useSelector(state => state.favourites.favourites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modalOpenHandler = (item) => {
    setOpenModal(true);
    setCurrentCity(item)
  }

  const modalCloseHandler = (text) => {
    if (text === "Yes") {
      dispatch(removeCity(currentCity.id));
    }
    setOpenModal(false);
  }

  const drawForecast = city => {
    dispatch(activeLink(city));
    navigate("/");
  }

  return (
    <div className="favourite">
      {openModal &&
        <Modal modalCloseHandler={modalCloseHandler} />
      }
      <Link to="/"><FaArrowLeft className="back-page" /></Link>
      {
        favourites.length
          ? <ul className="favourite-list">
            {favourites.map(item => (
              <li key={item.id} className="favourite-item">
                <div className="favourite-city" onClick={() => drawForecast(item.title)}>{item.title}</div>
                <FaTrashAlt className="favourite-remove" onClick={() => modalOpenHandler(item)} />
              </li>
            ))}
          </ul>
          : <div className="favourite-empty"><Trans>You do not have favourite weather forecasts</Trans></div>
      }
    </div>
  );
}

export default Favourites;