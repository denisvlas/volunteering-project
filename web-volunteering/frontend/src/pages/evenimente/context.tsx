import { createContext } from "react";
import {  menuType,menu, Projects, Transactions } from "./models";


export const SectionContext = createContext<{
  section: menuType;
  setSection: React.Dispatch<React.SetStateAction<menuType>>;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showMenu: boolean;
  setProject: React.Dispatch<React.SetStateAction<Projects | undefined>>;
  p: Projects | undefined;
  id: string | undefined;
  showTr: boolean;
  setShowTr: React.Dispatch<React.SetStateAction<boolean>>;
  editedValues: {
    inceput: Date;
    sfarsit: Date;
    strada: string;
    oras: string;
    tara: string;
    categorie: string;
    descriere: string;
    nume: string;
    status: string;
}
setEditedValues: React.Dispatch<React.SetStateAction<{
  inceput: Date;
  sfarsit: Date;
  strada: string;
  oras: string;
  tara: string;
  categorie: string;
  descriere: string;
  nume: string;
  status: string;
}>>
setEditToggle: React.Dispatch<React.SetStateAction<boolean>>
editToggle:boolean
handleInputChange: (field: string, value: string) => void
handleSaveChanges: () => void
}>({
  handleSaveChanges:()=>{},
  handleInputChange:()=>{},
  editToggle:false,
  setEditToggle:()=>{},
 editedValues: {
    inceput: new Date(),
    sfarsit: new Date(),
    strada: "",
    oras: "",
    tara: "",
    categorie: "",
    descriere: "",
    nume: "",
    status: "",
  },
  setEditedValues:()=>{},
  section: menu.InformatiiGenerale,
  setSection: () => {},
  showMenu: false,
  setShowMenu: () => {},
  setProject: () => {},
  p: undefined,
  id: undefined,
  setShowTr: () => {},
  showTr: false,
});
