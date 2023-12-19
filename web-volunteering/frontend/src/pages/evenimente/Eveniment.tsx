import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SectionContext } from "./context";
import {  Projects, Transactions, menu, menuType } from "./models";
import axios from "axios";
import c from "./Eveniment.module.css";
import s from '../../styles/ProjecstList.module.css'
import x from "../../styles/Main.module.css";
import PopInfoMenu from "../../components/PopInfoMenu";
import InfoSection from "../../components/InfoSection";
import Necesitati from "../../components/NecesitatiSection";
import NecesitatiSection from "../../components/NecesitatiSection";
import StatisticaSection from "../../components/StatisticaSection";
import HistoryTransactions from "../../components/HistoryTransactions";
import { Context } from "../../context";
import { parse, format } from 'date-fns';
import { statuses } from "../Registration/models";

function Eveniment() {
  const { id } = useParams();
  const [p, setProject] = useState<Projects|undefined>();
  async function getProjects() {
    try {
      const res = await axios.get(
        `http://localhost:5000/get-project-info/${id}`
      );
      setProject(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    getProjects();
  }, []);

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
  
  const [showMenu,setShowMenu]=useState(false)
  const [section,setSection]=useState<menuType>(menu.InformatiiGenerale)
  const[showTr,setShowTr]=useState(false);
  const [editToggle, setEditToggle] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const [editedValues, setEditedValues] = useState({
    inceput: p ? parse(p.inceput, 'dd-MM-yyyy', new Date()) : new Date(),
    sfarsit: p ? parse(p.sfarsit, 'dd-MM-yyyy', new Date()) : new Date(),
    strada: p?.strada || '',
    oras: p?.oras || '',
    tara: p?.tara || '',
    categorie: p?.categorie || 'Asistență medicală',
    descriere: p?.descriere || '',
    nume: p?.nume || '',
    status: p?.status || '',
  });
useEffect(()=>{
setEditedValues({
  inceput: p ? parse(p.inceput, 'dd-MM-yyyy', new Date()) : new Date(),
  sfarsit: p ? parse(p.sfarsit, 'dd-MM-yyyy', new Date()) : new Date(),
  strada: p?.strada || '',
  oras: p?.oras || '',
  tara: p?.tara || '',
  categorie: p?.categorie || 'Asistență medicală',
  descriere: p?.descriere || '',
  nume: p?.nume || '',
  status: p?.status || '',
})
},[p])

const [error,setError]=useState<null|string>(null)

async function updateProject(values:any) {
  try{
      const res=await axios.post(`http://localhost:5000/updateProject/${id}`,values)
      if(res.data.message){
        setError(null)
      }else{
        setError('Acest nume este ocupat')
        setEditToggle(true)
      }
      
      console.log(res.data);
      
      
  }catch(e){
    console.log(e);
    
  }
}

const handleSaveChanges = () => {
  setEditToggle(false);

  const formattedValues = {
    ...editedValues,
    inceput: format(editedValues.inceput, 'yyyy-MM-dd'),
    sfarsit: format(editedValues.sfarsit, 'yyyy-MM-dd'),
  };

  updateProject(formattedValues);
}
  return (
    <SectionContext.Provider value={{handleSaveChanges,handleInputChange,setEditToggle,editToggle,editedValues,setEditedValues,showTr,setShowTr,id,section, setSection,setShowMenu,showMenu,setProject,p }}>
    <div className={x.container}>
      {!p? (
        <div className={c.lodaing}>
          Loading...
          <div className={c["loading-spinner"]}>
          </div>
        </div>
      ) : (
        <div className={c.eveniment}>
          <div className={c.div}>
              <div className={s["img-div"]}>
                  <img className={s["img-ev"]} src={p.img} alt="" />
              </div>
              {
                editToggle? 
                <div className={c["p-info"]}>
                  {error&&<span className={c.error}>{error}</span>}
                <input  onChange={(e) => handleInputChange('nume', e.target.value)} value={editedValues.nume} className={`${s.nume} ${s.nume && error ? c["error-input"] : ''}`}/>
                  <div className={s["p-header"]}>
                    <span className={s.categorie}>{p.categorie}</span>
                    <span className={s.categorie}>{p.oras}</span>
                  </div>
                
                  <hr/>
                  <span >Suma: {p.suma}MDL</span>
                  <div >
                  <label htmlFor="status">Status: </label>
                  <select
                        name="status"
                        className={c.categorii}
                        value={editedValues.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                      >
                        <option value="Activ">Activ </option>
                        <option value="Finalizat">Finalizat</option>
                        <option value="Pauza">Pauza</option>
      </select>
    </div>
                  <hr />
              </div>:
              <div className={c["p-info"]}>
                <span className={s.nume}>{editedValues.nume}</span>
                <div className={s["p-header"]}>
                  <span className={s.categorie}>{p.categorie}</span>
                  <span className={s.categorie}>{p.oras}</span>
                </div>
              
                <hr/>
                <span >Suma: {p.suma}MDL</span>
                <span>Status: {editedValues.status}</span>
                <hr />
              </div>
              }
             

              
          </div>
          {section===menu.InformatiiGenerale&&<InfoSection/>}
          {section===menu.Necesitati&&<NecesitatiSection />}
          {section===menu.Finantari&&<StatisticaSection />}
        </div>
      )}
    </div>
    </SectionContext.Provider>
  );
}

export default Eveniment;