import { useEffect, useState } from "react";
import s from "../../styles/Register.module.css";
import { functiiType } from "./models";

function Register() {
  const [functie, setFunctie] = useState<functiiType | "">(""); // Initialize with an empty string

  useEffect(() => {
    console.log(functie);

  }, [functie]);

  // const [nume,setNume]=useState<string>('');
  // const [preNume,setPreNume]=useState<string>('');
  // const [email,setEmail]=useState<string>('');
  // const [telefon,setTelefon]=useState<string>('');
  
  const[userState,setUserState]=useState<any>({
    
    nume:'',
    prenume:'',
    email:'',
    telefon:'',
    numeOrganizatie:'',
    cont:'',
  });

  


  return (
    <div className={s["register-page"]}>
      <section
        className={`${s["register-section"]} ${
          functie === functiiType.voluntar && s["voluntar-bg"]
        } ${functie === functiiType.organizator && s["organizator-bg"]} ${
          functie === functiiType.sponsor && s["sponsor-bg"]
        }`}
      >
        <span className={s["registration-title"]}>Registration</span>
        <div className={s.functie}>
          <label htmlFor="functie">Vreau sa fiu:</label>
          <select
            className={s.option}
            name="functie"
            onChange={(e) => setFunctie(e.target.value as functiiType)}
          >
            <option value="">Alege optiunea</option>
            <option value={functiiType.voluntar}>Voluntar</option>
            <option value={functiiType.organizator}>Organizator</option>
            <option value={functiiType.sponsor}>Sponsor</option>
          </select>
        </div>
        <div></div>
        {functie === functiiType.voluntar && (
          <div className={s["voluntar-input"]}>
            <div>
              <label htmlFor="nume">Nume</label>
              <input name="nume" type="text" placeholder="Nume" onChange={(e)=>setUserState({...userState,nume:e.target.value})} />
            </div>
            <div>
              <label htmlFor="prenume">Prenume</label>
              <input name="prenume" type="text" placeholder="Prenume" onChange={(e)=>setUserState({...userState,prenume:e.target.value})}/>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input name="email" type="text" placeholder="Email" onChange={(e)=>setUserState({...userState,email:e.target.value})}/>
            </div>
            <div>
              <label htmlFor="telefon">Telefon</label>
              <input name="telefon" type="text" placeholder="+373" onChange={(e)=>setUserState({...userState,telefon:e.target.value})}/>
            </div>
          </div>
        )}
        {functie === functiiType.organizator && (
          <div className={s["voluntar-input"]}>
          <div>
            <label htmlFor="nume">Nume</label>
            <input name="nume" type="text" placeholder="Nume" onChange={(e)=>setUserState({...userState,nume:e.target.value})} />
          </div>
          <div>
            <label htmlFor="prenume">Prenume</label>
            <input name="prenume" type="text" placeholder="Prenume" onChange={(e)=>setUserState({...userState,prenume:e.target.value})}/>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input name="email" type="text" placeholder="Email" onChange={(e)=>setUserState({...userState,email:e.target.value})}/>
          </div>
          <div>
            <label htmlFor="telefon">Telefon</label>
            <input name="telefon" type="text" placeholder="+373" onChange={(e)=>setUserState({...userState,telefon:e.target.value})}/>
          </div>
        </div>
        )}
        {functie === functiiType.sponsor && (
          <div className={s.cont}>
            <div>
              <label htmlFor="nume-organizatie">Numele companiei</label>
              <input
                name="nume-organizatie"
                type="text"
                placeholder="Numele organizatiei"
                onChange={(e)=>setUserState({...userState,numeOrganizatie:e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input name="email" type="text" placeholder="Email" onChange={(e)=>setUserState({...userState,email:e.target.value})}/>
            </div>
            <div>
              <label htmlFor="cont">Cont</label>
              <input name="cont" type="text" placeholder="MDXXXXXXXXXXXXX" onChange={(e)=>setUserState({...userState,cont:e.target.value})}/>
            </div>
          </div>
        )}
        <button onClick={()=>console.log(userState)} className={s.submit}>NEXT</button>
      </section>
    </div>
  );
}

export default Register;
