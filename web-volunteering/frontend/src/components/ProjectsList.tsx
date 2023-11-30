import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import s from "../styles/ProjecstList.module.css";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Projects } from "../pages/main/models";
import { useNavigate } from "react-router-dom";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  async function getProjects() {
    try {
      const res = await axios.get("http://127.0.0.1:5000/get-3-projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProjects();
  }, [setProjects]);

  function showDetails(idx: number) {
    navigate(`/eveniment/${idx}`);
  }

  return (
    <div>
      <section className={s["projects-section"]}>
        {projects
          .map((p: Projects,index:number) => (
            <div className={s.project} key={index}>
              <div className={s["img-div"]}>
                  <img className={s.img} src={p.img} alt="" />
              </div>
              <div className={s["p-info"]}>
                <span className={s.nume}>{p.nume}</span>
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
          ))}
      </section>
    </div>
  );
}
