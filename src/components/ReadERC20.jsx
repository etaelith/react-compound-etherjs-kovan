import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserProvider'
import { ethers } from 'ethers'

const ReadERC20 = () => {
  const {defaultAccount} = useContext(UserContext)
  const [totalSupply, setTotalSupply] = useState()
  const [symbol, setSymbol] = useState('')
  const [balanceERC, setBalanceERC] = useState()
  const addressContract = '0xF0d0EB522cfa50B716B3b1604C4F0fA6f04376AD'
  const abi = require('../utils/abi.json')
  
  useEffect(() => {
    if(!window.ethereum) return
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const erc20 = new ethers.Contract(addressContract, abi, provider);
    erc20.symbol().then((result) => {
      setSymbol(result)
    }).catch('error', console.error)

    erc20.totalSupply().then((result) =>{
      setTotalSupply(ethers.utils.formatUnits(result,8))
    }).catch('error', console.error)

    erc20.balanceOf(defaultAccount)
        .then((result) => {
            setBalanceERC(ethers.utils.formatUnits(result, 8))
        })
        .catch('error',console.error)
    // eslint-disable-next-line
  },[defaultAccount])

  return (
    <>  
      <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="mb-6">
          <label htmlFor="addressContract" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Contract Address</label>
          <input type="text" id="addressContract" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={addressContract} disabled></input>
        </div>
        <div className="mb-6">
          <label htmlFor="totalSupply" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Total Supply</label>
          <input type="text" id="totalSupply" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={`${totalSupply} ${symbol}`} disabled></input>
        </div>
        <div className="mb-6">
          <label htmlFor="defaultAccount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Account Address</label>
          <input type="text" id="defaultAccount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={defaultAccount === '0x5c0db99e9b4bacd45df713fa0e8843664a8f9f25' ? '' : defaultAccount} disabled></input>
        </div>
        <div className="mb-6">
          <label htmlFor="defaultAccount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">In current Address</label>
          <input type="text" id="defaultAccount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={defaultAccount === '0x5c0db99e9b4bacd45df713fa0e8843664a8f9f25' ? '' : `${balanceERC} ${symbol}`} disabled></input>
        </div>
      </div>
    </>

  )
}

export default ReadERC20

