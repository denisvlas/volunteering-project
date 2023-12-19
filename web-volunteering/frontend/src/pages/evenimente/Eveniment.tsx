import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EvenimentContext } from "./context";
import {
  IeditedValues,
  Projects,
  Transactions,
  menu,
  menuType,
} from "./models";
import axios from "axios";
import c, { div } from "./Eveniment.module.css";
import s from "../../styles/ProjecstList.module.css";
import x from "../../styles/Main.module.css";
import PopInfoMenu from "../../components/PopInfoMenu";
import InfoSection from "../../components/InfoSection";
import Necesitati from "../../components/NecesitatiSection";
import NecesitatiSection from "../../components/NecesitatiSection";
import StatisticaSection from "../../components/StatisticaSection";
import HistoryTransactions from "../../components/HistoryTransactions";
import { Context } from "../../context";

function Eveniment() {
  const { id } = useParams();
  const [p, setProject] = useState<Projects >();
  const { userInfo } = useContext(Context);
  async function getProjects() {
    try {
      const res = await axios.get(
        `http://localhost:5000/get-project-info/${id}`
      );
      setProject(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProjects();
  }, []);

  const { userState, setUserInfo } = useContext(Context);
  useEffect(() => {
    userState.logged &&
      localStorage.setItem("userInfo", JSON.stringify(userState));
  }, []);

  useEffect(() => {
    // Recuperare date din localStorage la încărcarea componentei
    const storedUserInfoString = localStorage.getItem("userInfo");

    if (storedUserInfoString !== null) {
      const storedUserInfo = JSON.parse(storedUserInfoString);
      setUserInfo(storedUserInfo);
    }
  }, []);

  const [showMenu, setShowMenu] = useState(false);
  const [section, setSection] = useState<menuType>(menu.InformatiiGenerale);
  const [showTr, setShowTr] = useState(false);

  const [editToggle, setEditToggle] = useState(false);
  const [editedValues, setEditedValues] = useState<IeditedValues>({
    inceput: p && p.inceput ? new Date(p.inceput) : new Date(),
    sfarsit: p && p.sfarsit ? new Date(p.sfarsit) : new Date(),
    oras: p?.oras ,
    strada: p?.strada,
    tara: p?.tara,
    categorie: p?.categorie,
    descriere: p?.descriere,
    status: p?.status,
    nume: p?.nume,
  });
  const handleInputChange = (field: string, value: string) => {
    value&&
    setEditedValues((prevValues: IeditedValues | undefined) => ({
      ...prevValues!,
      [field]: value,
    }));
  };

  const handleSaveChanges = () => {
    setEditToggle(false);
    console.log(editedValues);
  };

  const handleDateChange = (field: string, date: Date) => {
    if (date) {
      setEditedValues((prevValues: IeditedValues | undefined) => ({
        ...prevValues!,
        [field]: date,
      }));
    }
  };
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <EvenimentContext.Provider
      value={{
        handleDateChange,
        handleInputChange,
        handleSaveChanges,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        editedValues,
        editToggle,
        setEditedValues,
        setEditToggle,
        showTr,
        setShowTr,
        id,
        section,
        setSection,
        setShowMenu,
        showMenu,
        setProject,
        p,
      }}
    >
      <div className={x.container}>
        {!p ? (
          <div className={c.lodaing}>
            Loading...
            <div className={c["loading-spinner"]}></div>
          </div>
        ) : (
          <div className={c.eveniment}>
            <div className={c.div}>
              <div className={s["img-div"]}>
                <img className={s["img-ev"]} src={p.img} alt="" />
              </div>
              {!editToggle ? (
                <div className={c["p-info"]}>
                  <span className={s.nume}>{p.nume}</span>
                  <div className={s["p-header"]}>
                    <span className={s.categorie}>{p.categorie}</span>
                    <span className={s.categorie}>{p.oras}</span>
                  </div>

                  <hr />
                  <span>Suma: {p.suma}MDL</span>
                  <span>Status: {p.status}</span>
                  <hr />
                </div>
              ) : (
                <div className={c["p-info"]}>
                  <label className={c["loc-labels"]} htmlFor="nume">
                          Nume
                        </label>
                        <input
                          name="nume"
                          type="text"
                          value={editedValues.nume}
                          onChange={(e) =>
                            handleInputChange("nume", e.target.value)
                          }
                        />
                  <div className={s["p-header"]}>
                    <span className={s.categorie}>{p.categorie}</span>
                    <span className={s.categorie}>{p.oras}</span>
                  </div>

                  <hr />
                  <span>Suma: {p.suma}MDL</span>
                  <span>Status: {p.status}</span>
                  <hr />
                </div>
              )}
            </div>
            {section === menu.InformatiiGenerale && <InfoSection />}
            {section === menu.Necesitati && <NecesitatiSection />}
            {section === menu.Finantari && <StatisticaSection />}
          </div>
        )}
      </div>
    </EvenimentContext.Provider>
  );
}

export default Eveniment;
