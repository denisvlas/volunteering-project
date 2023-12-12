import { createContext } from "react";
import {  menuType,menu, Projects, Transactions } from "./models";

export const SectionContext = createContext<{
  section:menuType
  setSection: React.Dispatch<React.SetStateAction<menuType>>
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
  showMenu:boolean
  setProject:  React.Dispatch<React.SetStateAction<Projects | undefined>>
  p: Projects | undefined,
  id: string | undefined,
  showTr: boolean
  setShowTr: React.Dispatch<React.SetStateAction<boolean>>
}>({ section: menu.InformatiiGenerale, setSection:()=>{},showMenu:false,setShowMenu:()=>{},setProject:()=>{},p:undefined,id:undefined,setShowTr:()=>{},showTr:false });
