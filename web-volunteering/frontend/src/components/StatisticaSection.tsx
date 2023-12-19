import React, { useContext, useEffect, useState } from 'react'
import { SectionContext } from '../pages/evenimente/context';
import PopInfoMenu from './PopInfoMenu';
import c, { div } from '../pages/evenimente/Eveniment.module.css'
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import HistoryTransactions from './HistoryTransactions';
import { Transactions } from '../pages/evenimente/models';
import { Context } from '../context';
import { ProfileInfo, functiiTypeBD } from '../pages/Registration/models';
import { useParams } from 'react-router-dom';


function StatisticaSection() {
  interface Data{
    data:string
    suma:string
  }
  const { setShowTr,showTr,id,p,setShowMenu,showMenu,section } = useContext(SectionContext);
  const{userState,setUserInfo}=useContext(Context)
  const [data,setData]=useState<Data[]>([])
  const [loading,setLoading]=useState(true)
  const{userInfo}=useContext(Context)
  const [maxSuma, setMaxSuma] = useState<number>();

  async function getMoney(){
    try{
        const res=await axios.get(`http://localhost:5000/get-money/${id}`)
        setData(res.data)
        res.data&&setLoading(false)
        
        setData((prevData) => {
          const max = Math.max(...prevData.map((i) => parseInt(i.suma)));
          setMaxSuma(max);
          console.log(max);
          return prevData; // Returning the previous data to keep the state consistent
        });
    }catch(e){
      console.log(e);
      
    }
  }

  useEffect(()=>{
    getMoney()
  },[])
  
  useEffect(() => {
    userState.logged&&
    localStorage.setItem('userInfo', JSON.stringify(userState));
  }, []);

  useEffect(() => {
    // Recuperare date din localStorage la încărcarea componentei
    const storedUserInfoString = localStorage.getItem('userInfo');

    if (storedUserInfoString !== null) {
      const storedUserInfo = JSON.parse(storedUserInfoString);
      setUserInfo(storedUserInfo);
      
    }
  }, []);

  useEffect(()=>{
    userInfo.email&&fetchdata(userInfo.email)
  },[userInfo])
  const[showTrForm,setShowTrForm]=useState(false)
  const[suma,setSuma]=useState(0)
const[sponsor_id,setSponsorId]=useState<number>(0)


const fetchdata=async(em:string)=>{
        
  try{
      const res=await axios.post('http://localhost:5000/sponsor-info',{email:em})
      setSponsorId(res.data[0].id)
          
      
  }catch(e){
    console.log(e)
  }
}



async function ajuta(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  e.preventDefault()
  setSuma(0)
  try{
      const res=await axios.post('http://localhost:5000/sponsorizare',{id_proiect:parseInt(id!),id_sponsor:sponsor_id,suma:suma})
     if (res.data) {
      getMoney();
      setSuccessPlaceholder(true);

      // Reset success placeholder after 2 seconds (you can adjust the timeout as needed)
      setTimeout(() => {
        setSuccessPlaceholder(false);
      }, 4000);
    }
  }catch(e){
    console.log(e)
  }
}



const [transactions,setTransactions]=useState<Transactions[]|null>(null)

async function getTransactions() {
  try{
      const res=await axios.get(`http://localhost:5000/get-project-transactions/${id}`)
      setTransactions(res.data)

  }catch(e){
      console.log(e);
      
  }
}

useEffect(()=>{
getTransactions()
},[setData,data])

const [successPlaceholder, setSuccessPlaceholder] = useState(false);

  return (

   
      <div className={`${showTr?c['section-st']:c.section}`}>
          <header className={c.header}><span>{section}</span>
            <i className="bi bi-list" onClick={()=>setShowMenu(!showMenu)}></i>
            {showMenu&&<PopInfoMenu/>}
            </header>
            {loading?(<div className={c.lodaing}>
                Loading...
                <div className={c["loading-spinner"]}>
                </div>
              </div>):
          (data.length>0?
          <div>
            <LineChart className={c.chart} width={800} height={400} data={data}>
              <Line type="monotone" dataKey="suma" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="data" />
              <YAxis domain={[20,maxSuma!]} />
            </LineChart>
            <div className={c['transactions-btn-div']}>
               <div>
                {userInfo.functie===functiiTypeBD.sponsori&&<button onClick={()=>setShowTrForm(!showTrForm)} className={c.sponsorizeaza}>Sponsorizează</button>}
                  {userInfo.functie===functiiTypeBD.sponsori&&showTrForm&&
                  <div className={c['sponsorizeaza-container']}>
                    
                  <form className={c['sponsorizeaza-form']} action="">
                  <i className={`bi bi-x ${c["close-x"]}`} onClick={()=>setShowTrForm(!showTrForm)}></i>
                    <div className={c['sponsor-input']}>
                    <input type="number" min={0}  value={suma} placeholder={successPlaceholder ? 'Succes' : 'Introdu suma dorită'} onChange={(e) => setSuma(parseInt(e.target.value, 10))} />
                    MDL
                    </div>
                    <button onClick={(e)=>ajuta(e)} className={c.ajuta}>Ajută</button>
                  </form>
                  
                  </div>}

              </div>
               <div>
                <i className={`bi bi-clock-history ${c['history-icon']}` } onClick={()=>setShowTr(!showTr)}></i>
              </div>
            </div>
           
            <HistoryTransactions transactions={transactions}/>
          </div>:
          (<h3>Nu-s inregistrari</h3>))
        }

            
      </div>

)
}

export default StatisticaSection