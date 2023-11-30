import React, { useContext } from "react";
import { Projects } from "./models";
import { Context } from "../../context";
import ProjectList from "../../components/ProjectsList";
import { app } from "../../styles/App.module.css";
import { container } from "../../styles/Main.module.css";
import EventList from "../../components/EventList";

function Evenimente() {
  return (
    <div className={container}>
      <EventList />
    </div>
  );
}

export default Evenimente;
