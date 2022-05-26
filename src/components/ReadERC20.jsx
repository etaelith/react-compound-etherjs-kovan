import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import { WalletContext } from '../context/WalletProvider'

const ReadERC20 = () => {
  const {defaultAccount} = useContext(UserContext)
  const {
        totalSupplycDAI,totalSupplycETH,symbolcDAI,
        symbolcETH,balanceERCcDAI,balanceERCcETH,
        addressContractcDAI,addressContractcETH
        } = useContext(WalletContext)

  return (
    <>  
      <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="mb-6">
          <label htmlFor="addressContractcDAI" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Contract Address</label>
          <input type="text" id="addressContractcDAI" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={addressContractcDAI} disabled></input>
        </div>
        <div className="mb-6">
          <label htmlFor="totalSupply" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Total Supply</label>
          <input type="text" id="totalSupply" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={`${totalSupplycDAI} ${symbolcDAI}`} disabled></input>
        </div>
        <div className="mb-6">
          <label htmlFor="defaultAccount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Account Address</label>
          <input type="text" id="defaultAccount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={defaultAccount === '0x5c0db99e9b4bacd45df713fa0e8843664a8f9f25' ? '' : defaultAccount} disabled></input>
        </div>
        <div className="mb-6">
          <label htmlFor="defaultAccount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">In current Address</label>
          <input type="text" id="defaultAccount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={defaultAccount === '0x5c0db99e9b4bacd45df713fa0e8843664a8f9f25' ? '' : `${balanceERCcDAI} ${symbolcDAI}`} disabled></input>
        </div>
      </div>
      
      <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="mb-6">
          <label htmlFor="addressContractcETH" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Contract Address</label>
          <input type="text" id="addressContractcETH" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={addressContractcETH} disabled></input>
        </div>
        <div className="mb-6">
          <label htmlFor="totalSupply" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Total Supply</label>
          <input type="text" id="totalSupply" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={`${totalSupplycETH} ${symbolcETH}`} disabled></input>
        </div>
        <div className="mb-6">
          <label htmlFor="defaultAccount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Account Address</label>
          <input type="text" id="defaultAccount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={defaultAccount === '0x5c0db99e9b4bacd45df713fa0e8843664a8f9f25' ? '' : defaultAccount} disabled></input>
        </div>
        <div className="mb-6">
          <label htmlFor="defaultAccount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">In current Address</label>
          <input type="text" id="defaultAccount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={defaultAccount === '0x5c0db99e9b4bacd45df713fa0e8843664a8f9f25' ? '' : `${balanceERCcETH} ${symbolcETH}`} disabled></input>
        </div>
      </div>
    </>

  )
}

export default ReadERC20

