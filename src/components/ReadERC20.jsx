import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import { WalletContext } from '../context/WalletProvider'

const style = {
  header: `flex h-screen p-4 w-auto bg-gray-200 rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700`,
  card: `p-6 max-w-sm lg:max-h-auto bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700`,
  cardmb: `flex justify-between items-center mb-6`,
  label: `mb-2 text-sm font-medium text-gray-900 dark:text-gray-300`,
  input: `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`,
}
const ReadERC20 = () => {
  const {defaultAccount} = useContext(UserContext)
  const {
        totalSupplycDAI,totalSupplycETH,symbolcDAI,
        symbolcETH,balanceERCcDAI,balanceERCcETH,
        addressContractcDAI,addressContractcETH
        } = useContext(WalletContext)

  return (
    
      <div className={style.header}>
        <div className={style.card}>
          <div className={style.cardmb}>
            <label htmlFor="addressContractcDAI" className={style.label}>Contract Address</label>
            <input type="text" id="addressContractcDAI" className={style.input} placeholder={addressContractcDAI} disabled></input>
          </div>
          <div className={style.cardmb}>
            <label htmlFor="totalSupply" className={style.label}>Total Supply</label>
            <input type="text" id="totalSupply" className={style.input} placeholder={`${Number(totalSupplycDAI).toFixed(1)} ${symbolcDAI}`} disabled></input>
          </div>
          <div className={style.cardmb}>
            <label htmlFor="defaultAccount" className={style.label}>Account Address</label>
            <input type="text" id="defaultAccount" className={style.input} placeholder={defaultAccount === '0x5c0db99e9b4bacd45df713fa0e8843664a8f9f25' ? '' : defaultAccount} disabled></input>
          </div>
          <div className={style.cardmb}>
            <label htmlFor="defaultAccount" className={style.label}>In current Address</label>
            <input type="text" id="defaultAccount" className={style.input} placeholder={defaultAccount === '0x5c0db99e9b4bacd45df713fa0e8843664a8f9f25' ? '' : `${Number(balanceERCcDAI).toFixed(1)} ${symbolcDAI}`} disabled></input>
          </div>
        </div>
        
        <div className={style.card}>
          <div className={style.cardmb}>
            <label htmlFor="addressContractcETH" className={style.label}>Contract Address</label>
            <input type="text" id="addressContractcETH" className={style.input} placeholder={addressContractcETH} disabled></input>
          </div>
          <div className={style.cardmb}>
            <label htmlFor="totalSupply" className={style.label}>Total Supply</label>
            <input type="text" id="totalSupply" className={style.input} placeholder={`${Number(totalSupplycETH).toFixed(2)} ${symbolcETH}`} disabled></input>
          </div>
          <div className={style.cardmb}>
            <label htmlFor="defaultAccount" className={style.label}>Account Address</label>
            <input type="text" id="defaultAccount" className={style.input} placeholder={defaultAccount === '0x5c0db99e9b4bacd45df713fa0e8843664a8f9f25' ? '' : defaultAccount} disabled></input>
          </div>
          <div className={style.cardmb}>
            <label htmlFor="defaultAccount" className={style.label}>In current Address</label>
            <input type="text" id="defaultAccount" className={style.input} placeholder={defaultAccount === '0x5c0db99e9b4bacd45df713fa0e8843664a8f9f25' ? '' : `${balanceERCcETH} ${symbolcETH}`} disabled></input>
          </div>
        </div>

      </div>
  )
}

export default ReadERC20

