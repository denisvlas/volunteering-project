import React from "react";
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

function App() {
  const [projects, setProjects] = useState<Projects[]>([]);

  return (
    <Context.Provider value={{ projects, setProjects }}>
      <div className={s.app}>
        <Header />
        <Routes>
          <Route path="register" element={<Register />} />
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
