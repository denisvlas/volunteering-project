import { createContext } from "react";
import { Projects, menu, menuType } from "./pages/evenimente/models";

export const Context = createContext<{
  projects: Projects[];
  setProjects: React.Dispatch<React.SetStateAction<Projects[]>>;
  
}>({ projects: [], setProjects: () => {}, });
