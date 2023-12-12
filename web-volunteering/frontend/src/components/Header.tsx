import React, { useContext, useEffect } from "react";
import s from "../styles/Main.module.css";
import { Link } from "react-router-dom";
import { Context } from "../context";

import { Projects } from "../pages/evenimente/models";
import { functiiTypeBD } from "../pages/Registration/models";

function Header() {
  const{userInfo,setUserInfo,setUserState,userState}=useContext(Context)

  function logOut(){
    localStorage.setItem('userInfo', JSON.stringify({...userState,logged:false}));
    window.location.reload();
  } 
 
  return (
    <header className={s.header}>
      <div className={s.links}>
        <Link to={"/evenimente"}>Evenimente</Link>
        <Link to={"/"}>Acasa</Link>
      </div>
      {userInfo.logged&&
        <>
        {userInfo.functie===functiiTypeBD.voluntari&&<div onClick={()=>logOut()}className={s["v-profile"]}>V</div>}
        {userInfo.functie===functiiTypeBD.organizatori&&<div  onClick={()=>logOut()}className={s["o-profile"]}>O</div>}
        {userInfo.functie===functiiTypeBD.sponsori&&<div  onClick={()=>logOut()}className={s["s-profile"]}>S</div>}
        </>
        }
    </header>
  );
}

export default Header;
