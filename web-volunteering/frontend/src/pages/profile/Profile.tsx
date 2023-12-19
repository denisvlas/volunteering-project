import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import axios from "axios";
import { ProfileInfo, functiiTypeBD } from "../Registration/models";
import { Projects } from "../evenimente/models";
import s from "../../styles/Profile.module.css";
import ProjectList from "../../components/ProjectsList";

function Profile() {
  const {loading,setLoading, projects, setProjects, userState, userInfo, setUserInfo } =
    useContext(Context);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo[]>([
    {
      id: 0,
      nume: "",
      prenume: "",
      telefon: "",
      likeuri: 0,
      email: "",
      numar_proiecte: 0,
      suma_donata:0
    },
  ]);

  async function getProjects() {
    try {
      const res = await axios.post("http://localhost:5000/get-org-projects", {
        id: profileInfo[0].id,
      });

      setProjects(res.data);
      console.log("--------",res.data);
      res.data&&setLoading(false)

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchdata();
  }, [userInfo]);

  useEffect(() => {
    getProjects();
    
  }, [profileInfo]);

  const fetchdata = async () => {
    try {
      const res = await axios.post("http://localhost:5000/user-info", userInfo);
      setProfileInfo(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={s.container}>
      {loading ? (
        <div className={s.lodaing}>
          Loading...
          <div className={s["loading-spinner"]}></div>
        </div>
      ) : (
        <div className={s.wrapper}>
          <div className={s["user-info-section"]}>
            {userInfo.email && profileInfo[0] && (
              <div className={s.div}>
                <span className={s.nume}>Informatii {userInfo.functie}</span>
                <span className={s.categorie}>
                  {userInfo.functie === functiiTypeBD.sponsori
                    ? "Organizație"
                    : "Nume"}
                  : {profileInfo[0].nume}
                </span>
                {userInfo.functie !== functiiTypeBD.sponsori && (
                  <span className={s.categorie}>
                    prenume: {profileInfo[0].prenume}
                  </span>
                )}
                {userInfo.functie !== functiiTypeBD.sponsori &&
                <span className={s.categorie}>
                  telefon: {profileInfo[0].telefon}
                </span>
}
                <span className={s.categorie}>
                  likeuri: {profileInfo[0].likeuri}
                </span>
                <span className={s.categorie}>
                  email: {profileInfo[0].email}
                </span>
                <span className={s.categorie}>
                  Proiecte{' '}
                  {userInfo.functie === functiiTypeBD.organizatori &&
                    "organizate"
                    }
                  {userInfo.functie === functiiTypeBD.voluntari &&
                    "implicate"
                    }
                  {userInfo.functie === functiiTypeBD.sponsori &&
                    "sponsorizate"
                    }
                  : {profileInfo[0].numar_proiecte}
                </span>
                {userInfo.functie===functiiTypeBD.sponsori&&
                  <span className={s.categorie}>
                    Suma totala donată: {profileInfo[0].suma_donata}MDL
                  </span>}
              </div>
            )}
          </div>
          <div className={s["projects-section"]}>
            <h2 className={s.nume}>Proiecte organizate:</h2>
            {projects.length?<ProjectList />:<div className={s["no-projects"]}><i className="bi bi-emoji-frown"></i>Nu-s proiecte</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
