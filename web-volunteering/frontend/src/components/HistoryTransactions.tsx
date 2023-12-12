import React, { useContext, useEffect, useState } from 'react'
import c from "../pages/evenimente/Eveniment.module.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { SectionContext } from '../pages/evenimente/context';
import { Transactions } from '../pages/evenimente/models';


function HistoryTransactions() {
    const { showTr,setShowTr,id} = useContext(SectionContext);
    
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
   },[])

  const [transactions,setTransactions]=useState<Transactions[]|null>(null)
    

  return (
    <div>
        
        {transactions&&showTr&&

        <div className={c.transactions}>
            
            <table className={c['my-table']}>
                
                <tbody>
                <tr className={`${c['transactions-header']} table-primary`}>
                        <th>Sponsor</th>
                        <th>Suma</th>
                        <th>Data</th>
                    </tr>
                    {transactions.map((t:Transactions,index:number)=>(
                    <tr key={index}
                    className={index % 2 === 0 ? "table-primary" : "table-secondary"}
                    >
                        <td>{t.organizatie}</td>
                        <td className={c.suma}>+ {t.suma}MDL</td>
                        <td>{t.data}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            
        </div>}
    </div>
  )
}

export default HistoryTransactions

{/* <table className={c["my-table"]}>
        <tbody>
          {necesitati.map((n, index) => (
            <tr key={index}
              className={index % 2 === 0 ? "table-primary" : "table-secondary"}
            >
              <td>{n.necesitate}</td>
              <td>{n.cantitate}</td>
            </tr>
          ))}
        </tbody></table> */}