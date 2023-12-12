import React, { useContext, useEffect, useState } from 'react'
import { SectionContext } from '../pages/evenimente/context';
import PopInfoMenu from './PopInfoMenu';
import c, { div } from '../pages/evenimente/Eveniment.module.css'
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import HistoryTransactions from './HistoryTransactions';
import { Transactions } from '../pages/evenimente/models';
import { Context } from '../context';
import { functiiTypeBD } from '../pages/Registration/models';


function StatisticaSection() {
  const { setShowTr,showTr,id,p,setShowMenu,showMenu,section } = useContext(SectionContext);
  const{userState,setUserInfo}=useContext(Context)
  const [data,setData]=useState([])
  const [loading,setLoading]=useState(true)
  const{userInfo}=useContext(Context)

  async function getMoney(){
    try{
        const res=await axios.get(`http://localhost:5000/get-money/${id}`)
        setData(res.data)
        res.data&&setLoading(false)
      }catch(e){
      console.log(e)
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
              <YAxis />
            </LineChart>
            <div className={c['transactions-btn-div']}>
               <div>
                {userInfo.functie===functiiTypeBD.sponsori&&<button className={c.sponsorizeaza}>Sponsorizează</button>}
              </div>
               <div>
                <i className={`bi bi-clock-history ${c['history-icon']}` } onClick={()=>setShowTr(!showTr)}></i>
              </div>
            </div>
           
            <HistoryTransactions/>
          </div>:
          (<h3>Nu-s inregistrari</h3>))
        }
      </div>

)
}

export default StatisticaSection