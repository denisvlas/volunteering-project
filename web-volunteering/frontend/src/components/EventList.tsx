
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import s from "../styles/ProjecstList.module.css";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Projects } from "../pages/evenimente/models";
import { Navigate, useNavigate } from "react-router-dom";
import ProjectList from "./ProjectsList";


export default function EventList() {

  
 
  return (
    <ProjectList/>
  );
}
