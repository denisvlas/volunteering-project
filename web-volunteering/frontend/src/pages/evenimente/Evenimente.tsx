import React, { useContext, useEffect } from "react";
import { Projects } from "./models";
import { Context } from "../../context";
import ProjectList from "../../components/ProjectsList";
import { app } from "../../styles/App.module.css";
import { container } from "../../styles/Main.module.css";
import EventList from "../../components/EventList";

function Evenimente() {

  const{userState,setUserInfo}=useContext(Context)
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
