import React, { useContext, useEffect, useState } from "react";
import { SectionContext } from "../pages/evenimente/context";
import PopInfoMenu from "./PopInfoMenu";
import c from "../pages/evenimente/Eveniment.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Necesitati } from "../pages/evenimente/models";
import { project } from "../styles/ProjecstList.module.css";

function NecesitatiSection() {
  const { id,p, setShowMenu, showMenu, section } = useContext(SectionContext);
  const [necesitati, setNecesitati] = useState<Necesitati[]>([]);
  const [loading,setLoading]=useState(true)


  async function getNecesitati() {
    try {
      const res = await axios.get(`http://localhost:5000/get-necesitati/${id}`);
      setNecesitati(res.data);
      res.data&&setLoading(false)
    } catch (e) {
      console.log(e);
    }
  }

  async function php(){
    try{
        const res=await axios.get('http://localhost:80/api/index')
        console.log(res.data)
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    php();
    getNecesitati();
  }, []);
  console.log(necesitati);
  return (
    <div className={c.section}>
      <header className={c.header}>
        <span>{section}</span>
        <span className={c["cantitate-span"]}>Cantitate</span>
        <i className="bi bi-list" onClick={() => setShowMenu(!showMenu)}></i>
        {showMenu && <PopInfoMenu />}
      </header>
      <div className={c["table-container"]}>
      {loading?(<div className={c.lodaing}>
                Loading...
                <div className={c["loading-spinner"]}>
                </div>
              </div>):
       ( necesitati.length>1?(<table className={c["my-table"]}>
        <tbody>
          {necesitati.map((n, index) => (
            <tr key={index}
              className={index % 2 === 0 ? "table-primary" : "table-secondary"}
            >
              <td>{n.necesitate}</td>
              <td>{n.cantitate}</td>
            </tr>
          ))}
        </tbody></table>):<h3>Nu-s necesitati</h3>)}
      </div>
    </div>
  );
}

export default NecesitatiSection;
