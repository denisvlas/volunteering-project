import React, { useContext, useEffect, useState } from 'react'
import { SectionContext } from '../pages/evenimente/context';
import PopInfoMenu from './PopInfoMenu';
import c from '../pages/evenimente/Eveniment.module.css'
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';


function StatisticaSection() {
  const { p,setShowMenu,showMenu,section } = useContext(SectionContext);
  const [data,setData]=useState([])
  async function getMoney(){
    try{
        const res=await axios.get('http://localhost:5000/get-money')
        setData(res.data)
      }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    getMoney()
  },[])
  

  return (

   
      <div className={c.section}>
          <header className={c.header}><span>{section}</span>
            <i className="bi bi-list" onClick={()=>setShowMenu(!showMenu)}></i>
            {showMenu&&<PopInfoMenu/>}
            </header>
          <LineChart width={800} height={500} data={data}>
          <Line type="monotone" dataKey="suma" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="data" />
          <YAxis />
        </LineChart>
      </div>

)
}

export default StatisticaSection