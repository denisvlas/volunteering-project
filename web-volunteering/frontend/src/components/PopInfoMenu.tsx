import React, { useContext } from 'react'
import s from '../pages/evenimente/Eveniment.module.css'
import { menuType,menu } from '../pages/evenimente/models'
import { EvenimentContext } from '../pages/evenimente/context';


function PopInfoMenu() {
    const { section, setSection,showMenu,setShowMenu } = useContext(EvenimentContext);
    const meniu = [menu.InformatiiGenerale, menu.Necesitati, menu.Finantari];

    return (
        <div className={s['pop-info-menu']}onMouseLeave={() => setShowMenu(false)}>
            {meniu.map((m) => (
                <span key={m} onClick={() => setSection(m)}>
                    {m}
                </span>
            ))}
        </div>
    );
}

export default PopInfoMenu;

