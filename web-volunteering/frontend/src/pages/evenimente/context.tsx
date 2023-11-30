import { createContext } from "react";
import {  menuType,menu, Projects } from "./models";

export const SectionContext = createContext<{
  section:menuType
  setSection: React.Dispatch<React.SetStateAction<menuType>>
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
  showMenu:boolean
  setProject:  React.Dispatch<React.SetStateAction<Projects | undefined>>
  p: Projects | undefined
  
}>({ section: menu.InformatiiGenerale, setSection:()=>{},showMenu:false,setShowMenu:()=>{},setProject:()=>{},p:undefined });
