import React, { useContext } from 'react'
import c from '../pages/evenimente/Eveniment.module.css'
import PopInfoMenu from './PopInfoMenu';
import { SectionContext } from '../pages/evenimente/context';
import x from '../styles/Main.module.css'

function InfoSection() {
    const { p,setShowMenu,showMenu,section } = useContext(SectionContext);
   
    return (
        <>
        {!p? (
          <div className={c.lodaing}>
            Loading...
            <div className={c["loading-spinner"]}>
            </div>
          </div>
        ) : (
        <div className={c.section}>
            <div className={c["informatii-section"]}>
            <header className={c.header}><span>{section}</span>
            <i className="bi bi-list" onClick={()=>setShowMenu(!showMenu)}></i>
            {showMenu&&<PopInfoMenu/>}
            </header>
              <div className={c["informatii"]}>
                <div className={c.col1} >
                  <span>Organizator:</span>
                  <span>Startul proiectului:</span>
                  <span>Sfarsitul proiectului:</span>
                  <span>Adresa locatiei:</span>
                  <span>Categoria:</span>
                  <span>Suma stransa:</span>
                  
                </div>
                <div className={c.col2}>
                  <span>{p.organizator}</span>
                  <span>{p.inceput}</span>
                  <span>{p.sfarsit}</span>
                  <span>str.{p.strada}, {p.oras}, {p.tara}</span>
                  <span>{p.categorie}</span>
                  <span>{p.suma}MDL</span>
                </div>
              </div>
            </div>
            <div className={c["descriere-section"]}>
              <header className={c.header}>Descrierea evenimentului</header>
              <div className={c.descriere}>
                <p>{p.descriere} lor</p>
              </div>
            </div>

            
          </div>)}
          </>
  )
}

export default InfoSection