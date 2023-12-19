import React, { useContext, useEffect, useState } from "react";
import { Projects } from "./models";
import { Context } from "../../context";
import ProjectList from "../../components/ProjectsList";
import { app } from "../../styles/App.module.css";
import { container } from "../../styles/Main.module.css";
import EventList from "../../components/EventList";
import axios from "axios";
import { SectionContext } from "./context";

function Evenimente() {
  const{projects,setProjects,userState,setUserInfo}=useContext(Context)

  async function getProjects() {
    try {
      const res = await axios.get("http://localhost:5000/get-all-projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProjects();
  }, [setProjects]);

  
  useEffect(() => {
    userState.logged&&
    localStorage.setItem('userInfo', JSON.stringify(userState));
  }, []);

  useEffect(() => {
    // Recuperare date din localStorage la încărcarea componentei
    const storedUserInfoString = localStorage.getItem('userInfo');

    if (storedUserInfoString !== null) {
      const storedUserInfo = JSON.parse(storedUserInfoString);
      setUserInfo(storedUserInfo);
    }
  }, []);

  return (
    <div className={container}>
      <EventList />
    </div>
  );
}

export default Evenimente;
