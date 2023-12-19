import { createContext } from "react";
import { Projects, menu, menuType } from "./pages/evenimente/models";
import { User } from "./pages/Registration/models";

export const Context = createContext<{
  projects: Projects[];
  setProjects: React.Dispatch<React.SetStateAction<Projects[]>>;
  userState: User,
  setUserState: React.Dispatch<React.SetStateAction<User>>
  userInfo: User 
  setUserInfo: React.Dispatch<React.SetStateAction<User>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  loading:boolean
}>({ loading:true,setLoading:()=>{},projects: [], setProjects: () => {},userState:{functie: "",nume: "",prenume: "",email: "",telefon: "",numeOrganizatie: "",cont: "",password:'',logged:false},setUserState:()=>{},userInfo:{functie: "",nume: "",prenume: "",email: "",telefon: "",numeOrganizatie: "",cont: "",password:'',logged:false},setUserInfo:()=>{} });
