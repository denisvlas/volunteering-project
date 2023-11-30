import React, { useContext } from 'react'
import s from '../pages/evenimente/Eveniment.module.css'
import { menuType,menu } from '../pages/evenimente/models'
import { SectionContext } from '../pages/evenimente/context';


function PopInfoMenu() {
    const { section, setSection,showMenu,setShowMenu } = useContext(SectionContext);
    const meniu = [menu.InformatiiGenerale, menu.Necesitati, menu.Statistica];

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

