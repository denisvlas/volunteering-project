import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Register from "./pages/Registration/Register";
import s from "./styles/App.module.css";
import { Context } from "./context";
import { useState } from "react";
import Main from "../src/pages/main/Main";
import Evenimente from "./pages/evenimente/Evenimente";
import { Projects } from "./pages/evenimente/models";
import Eveniment from "./pages/evenimente/Eveniment";
import NotFound from "./pages/NotFound";
import { User } from "./pages/Registration/models";
import Login from "./pages/Registration/Login";

function App() {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [userState, setUserState] = useState<User>({
    functie: "",
    nume: "",
    prenume: "",
    email: "",
    telefon: "",
    numeOrganizatie: "",
    cont: "",
    password:'',
    logged:false,
  });
  const [userInfo,setUserInfo]=useState<User>(userState);

 
  return (
    <Context.Provider value={{userInfo,setUserInfo, userState,setUserState,projects, setProjects }}>
      <div className={s.app}>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="/evenimente" element={<Evenimente />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/eveniment/:id" element={<Eveniment />} />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
