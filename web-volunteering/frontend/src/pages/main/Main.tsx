import React, { useContext, useEffect } from "react";
import Header from "../../components/Header";
import Info from "../../components/Info";
import ProjectsList from "../../components/ProjectsList";
import s from "../../styles/Main.module.css";
import { Projects } from "../evenimente/models";
import { Context } from "../../context";
import { app } from "../../styles/App.module.css";
import axios from "axios";

function Main() {
  return (
    <div className={app}>
      <div className={s.container}>
        <div className={s.section}>
          <h1>Evenimente de caritate si voluntariat</h1>
          <h2>Ușurăm crearea și organizarea proiectelor de caritate</h2>
          <div className={s["reg-btns"]}>
            <a href="/register" className={s["reg-org"]}>
              Devina Organizator
            </a>{" "}
            <a href="" className={s["reg-voluntar"]}>
              Fii Voluntar
            </a>
          </div>
        </div>

        <Info />
        <ProjectsList />
      </div>
    </div>
  );
}

export default Main;
