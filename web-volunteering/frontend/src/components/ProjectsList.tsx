import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import s from "../styles/ProjecstList.module.css";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Projects } from "../pages/evenimente/models";
import { useLocation, useNavigate } from "react-router-dom";
import { MainContext } from "../pages/main/context";
import { functiiTypeBD } from "../pages/Registration/models";

export default function ProjectList() {
  const navigate = useNavigate();
 const{projects,setProjects,userInfo}=useContext(Context)

  function showDetails(idx: number) {
    navigate(`/eveniment/${idx}`);
  }
  

  const location = useLocation();
  
  // Verifică dacă sunteți pe o rută specifică
  const isOnSpecificRoute = location.pathname === "/profile";
  return (

    <div>
      <section className={s["projects-section"]}>
        
        {projects.length?projects
          .map((p: Projects,index:number) => (
            <div className={s.project} key={index}>
              
              <div className={s["img-div"]}>
              
              {p.img?<img className={s.img} src={p.img} alt="" />:
                  <img className={s["no-img"]} src={'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} alt="" />
                  }
              </div>
             
              <div className={s["p-info"]}>
              <div className={s["pr-header"]}>
              <span className={s.nume}>{p.nume}</span>
              {/* {userInfo.functie===functiiTypeBD.organizatori&&isOnSpecificRoute&&<i className={`bi bi-x ${s["close-x"]}`}></i>} */}
              </div>
                
                <div className={s["p-header"]}>
                  <span className={s.categorie}>{p.categorie}</span>
                  <span className={s.categorie}>{p.oras}</span>
                </div>
              
                <hr/>
                <span >Organizator: {p.organizator}</span>
                <span >Suma: {p.suma}MDL</span>
                <span>Status: {p.status}</span>
                <hr />
                <div className={s["footer-project"]}>
                  <button
                    className={s["detalii-btn"]}
                    onClick={() => showDetails(p.id_proiect)}
                  >
                    DETALII
                  </button>
                </div>
              </div>
            </div>
          )):<></>}
          
      </section>
    </div>
  );
}
