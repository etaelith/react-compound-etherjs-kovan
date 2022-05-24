import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserProvider"
import { ethers } from "ethers"
import { useState } from "react"

const CardTrade = () => {
    const {defaultAccount,chainName,onClickConnect} = useContext(UserContext)
    const [balance1, setBalance1] = useState(undefined)
    const addressContract = '0xF0d0EB522cfa50B716B3b1604C4F0fA6f04376AD'
    const abi = require('../utils/abi.json')
    const checkContra = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const erc20 = new ethers.Contract(addressContract, abi, provider);
        erc20.balanceOf(defaultAccount)
        .then((result) => {
            setBalance1(ethers.utils.formatUnits(result, 8))
        })
        .catch('error',console.error)
    }
    useEffect(() => {
        checkContra()
        // eslint-disable-next-line
    },[defaultAccount])
    const interact = (e) => {
        e.preventDefault()
        console.log(balance1)
    }
  return (
            <div className="flex h-screen p-4 w-auto bg-gray-200 rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6 m-auto bg-gray-300 rounded-lg border border-gray-300 shadow-md sm:p-6 lg:p-8 dark:bg-gray-900 dasrk:border-gray-900" action="#">
                    <h5 className="text-xl text-center font-medium text-gray-900 dark:text-white">Swap</h5>
                    <h5 className="text-xs text-center font-medium text-gray-900/25 dark:text-white/25">Network: {chainName}</h5>
                    <h6 className="text-xs text-center font-medium text-gray-900/25 dark:text-white/25">{defaultAccount ? defaultAccount : 'Log to see Address'}</h6>
                    <div>
                        <label htmlFor="change" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Change</label>
                        <input type="number" name="change" id="change" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none appearance-none" max={Number(balance1)} placeholder={defaultAccount ? `Max: ${balance1} cDAI` : 'Log to interact'} required disabled={!defaultAccount}></input>
                    </div>
                    <div>
                        <label htmlFor="forTake" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">For</label>
                        <input type="number" name="forTake" id="forTake" placeholder="0.3" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none appearance-none" required disabled={!defaultAccount}></input>
                    </div>
                    <button onClick={defaultAccount ? interact : onClickConnect} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{defaultAccount ? 'Interact' : 'Login to interact'}</button>
                </form>
            </div>
  )
}

export default CardTrade