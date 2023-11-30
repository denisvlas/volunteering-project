import React, { useContext } from "react";
import s from "../styles/Main.module.css";
import { Link } from "react-router-dom";
import { Context } from "../context";
import { Projects } from "../pages/evenimente/models";

function Header() {
  return (
    <header className={s.header}>
      <div className={s.links}>
        <Link to={"/evenimente"}>Evenimente</Link>
        <Link to={"/"}>Acasa</Link>
      </div>
    </header>
  );
}

export default Header;
