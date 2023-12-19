import React, { useContext } from 'react';
import c from "../pages/evenimente/Eveniment.module.css";
import { SectionContext } from '../pages/evenimente/context';
import { Transactions } from '../pages/evenimente/models';

interface Props {
  transactions: Transactions[] | null;
}

function HistoryTransactions({ transactions }: Props): JSX.Element {
  const { showTr } = useContext(SectionContext);

  return (
    <div>
      {showTr && (
        <div className={c.transactions}>
          <table className={c['my-table']}>
            <tbody>
              <tr className={`${c['transactions-header']} table-primary`}>
                <th>Sponsor</th>
                <th>Suma</th>
                <th>Data</th>
              </tr>
              {transactions?.map((t: Transactions, index: number) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'table-primary' : 'table-secondary'}
                >
                  <td>{t.organizatie}</td>
                  <td className={c.suma}>+ {t.suma}MDL</td>
                  <td>{t.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HistoryTransactions;
