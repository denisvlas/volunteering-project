import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SectionContext } from "./context";
import {  Projects, Transactions, menu, menuType } from "./models";
import axios from "axios";
import c from "./Eveniment.module.css";
import s from '../../styles/ProjecstList.module.css'
import x from "../../styles/Main.module.css";
import PopInfoMenu from "../../components/PopInfoMenu";
import InfoSection from "../../components/InfoSection";
import Necesitati from "../../components/NecesitatiSection";
import NecesitatiSection from "../../components/NecesitatiSection";
import StatisticaSection from "../../components/StatisticaSection";
import HistoryTransactions from "../../components/HistoryTransactions";

function Eveniment() {
  const { id } = useParams();
  const [p, setProject] = useState<Projects|undefined>();
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

  const [showMenu,setShowMenu]=useState(false)
  const [section,setSection]=useState<menuType>(menu.InformatiiGenerale)
  const[showTr,setShowTr]=useState(false);
 
  return (
    <SectionContext.Provider value={{showTr,setShowTr,id,section, setSection,setShowMenu,showMenu,setProject,p }}>
    <div className={x.container}>
      {!p? (
        <div className={c.lodaing}>
          Loading...
          <div className={c["loading-spinner"]}>
          </div>
        </div>
      ) : (
        <div className={c.eveniment}>
          <div className={c.div}>
              <div className={s["img-div"]}>
                  <img className={s["img-ev"]} src={p.img} alt="" />
              </div>
              <div className={c["p-info"]}>
                <span className={s.nume}>{p.nume}</span>
                <div className={s["p-header"]}>
                  <span className={s.categorie}>{p.categorie}</span>
                  <span className={s.categorie}>{p.oras}</span>
                </div>
              
                <hr/>
                <span >Suma: {p.suma}MDL</span>
                <span>Status: {p.status}</span>
                <hr />
              </div>
          </div>
          {/* {section===menu.InformatiiGenerale&&<InfoSection/>}
          {section===menu.Necesitati&&<NecesitatiSection />} */}
          {1&&<StatisticaSection />}
        </div>
      )}
    </div>
    </SectionContext.Provider>
  );
}

export default Eveniment;
