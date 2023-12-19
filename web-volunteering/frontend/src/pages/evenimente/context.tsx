import { createContext } from "react";
import {
  menuType,
  menu,
  Projects,
  Transactions,
  IeditedValues,
} from "./models";

export const EvenimentContext = createContext<{
  section: menuType;
  setSection: React.Dispatch<React.SetStateAction<menuType>>;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showMenu: boolean;
  setProject: React.Dispatch<React.SetStateAction<Projects | undefined>>;
  p: Projects | undefined;
  id: string | undefined;
  showTr: boolean;
  setShowTr: React.Dispatch<React.SetStateAction<boolean>>;
  editToggle: boolean;
  setEditToggle: React.Dispatch<React.SetStateAction<boolean>>;
  editedValues: IeditedValues|undefined ;
  setEditedValues: React.Dispatch<
    React.SetStateAction<IeditedValues>
  >;
  handleInputChange: (field: string, value: string) => void
  handleSaveChanges: () => void
  handleDateChange: (field: string, date: Date) => void
  startDate: Date
  endDate: Date
  setStartDate: React.Dispatch<React.SetStateAction<Date>>
  setEndDate: React.Dispatch<React.SetStateAction<Date>>
}>({
  handleInputChange: (field: string, value: string) =>{},
  handleSaveChanges: () =>{},
  handleDateChange: (field: string, date: Date) => {},
  setStartDate:()=>{},
  setEndDate:()=>{},
  startDate:new Date(),
  endDate:new Date(),
  editToggle: false,
  setEditToggle: () => {},
  editedValues:{
  inceput: '' || new Date(),
  sfarsit: '' || new Date(),
  strada: '',
  oras: '',
  tara: '',
  categorie: '',
  descriere: '',
  status: '',
  nume: ''},
  setEditedValues: () => {},
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
