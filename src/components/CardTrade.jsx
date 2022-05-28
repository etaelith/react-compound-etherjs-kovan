import { useContext, useEffect, useRef } from "react"
import { UserContext } from "../context/UserProvider"
import { ethers } from "ethers"
import { useState } from "react"

const style = {
    container : `flex h-screen p-4 w-auto bg-gray-200 rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700`,
    form : `space-y-6 m-auto bg-gray-300 rounded-lg border border-gray-300 shadow-md sm:p-6 lg:p-8 dark:bg-gray-900 dasrk:border-gray-900`,
    h5 : `text-xl text-center font-medium text-gray-900 dark:text-white`,
    opacity : `text-xs text-center font-medium text-gray-900/25 dark:text-white/25`,
    label : `block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300`,
    input : `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none appearance-none`,
    button : `w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`
}
const CardTrade = () => {
    const {defaultAccount,chainName, balance} = useContext(UserContext)
    const [balance1, setBalance1] = useState(undefined)
    const [balanceCDAI, setBalanceCDAI] = useState(null)
    const [exchangeRateDAI, setExchangeRateDai] = useState(undefined)
    const addressContractcETH = '0x41b5844f4680a8c38fbb695b7f9cfd1f64474a72'
    const addressContractcDAI = '0xF0d0EB522cfa50B716B3b1604C4F0fA6f04376AD'
    const addressContractDAI = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa'
    const abicETH = require('../utils/abicETH.json')
    const abicDAI = require('../utils/abicDAI.json')
    const abiDAI = require('../utils/abiDAI.json')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const cDAIContract = new ethers.Contract(addressContractcDAI, abicDAI,signer)
    const formSwap = useRef(null)

    useEffect(() => {
        checkContra()
        checkCdaibalance()
        checkExchangeRate()
        // eslint-disable-next-line
    },[defaultAccount])
    const checkContra = () => {
        const ercDAI = new ethers.Contract(addressContractDAI, abiDAI, provider);
        ercDAI.balanceOf(defaultAccount)
        .then((result) => {
            setBalance1(ethers.utils.formatUnits(result, 18))
        })
        .catch('error',console.error)
    }
    const checkCdaibalance = () => {
        const erccDAI = new ethers.Contract(addressContractcDAI, abicDAI, provider)
        erccDAI.callStatic.balanceOfUnderlying(defaultAccount)
        .then((result) => {
            setBalanceCDAI(ethers.utils.formatUnits(result,8))
        })
    }
    const checkExchangeRate = async() => {
        let erCurrent = await cDAIContract.callStatic.exchangeRateCurrent()
        let exchangeRate = +erCurrent / Math.pow(10,18 + 18 - 8)
        setExchangeRateDai(exchangeRate)
    }
    const handleSubmitcETH = async(e) => {
        e.preventDefault()
        const datos = new FormData(formSwap.current)
        const objectDate = Object.fromEntries([...datos.entries()])
        const {swapAmount} = objectDate
        let cEthContract = new ethers.Contract(addressContractcETH, abicETH,signer)
        let tx = await cEthContract.mint({
                value: ethers.utils.parseUnits(swapAmount, 18)
        });
        await tx.wait(1)
        
    }
    const handleSubmitCDAI = async(e) => {
        e.preventDefault()
        const dato = new FormData(formSwap.current)
        const objectDateDai = Object.fromEntries([...dato.entries()])
        const {swapAmount} = objectDateDai
        const contractDai = new ethers.Contract(addressContractDAI, abiDAI, signer)
        const supplyDai = swapAmount * Math.pow(10, 18)
        let tx = await contractDai.approve(addressContractcDAI, supplyDai.toString())
        await tx.wait(1)

        tx = await cDAIContract.mint(supplyDai.toString())
        await tx.wait(1)
    }
    const handleSubmitDai = async(e) => {
        e.preventDefault()
        let cDAIBalance = +(await cDAIContract.callStatic.balanceOf(defaultAccount))/1e8
        let tx = await cDAIContract.redeem(cDAIBalance * 1e8)
        await tx.wait(1)
    }

  return (
            <div className={style.container}>
                <form className={style.form} ref={formSwap} onSubmit={handleSubmitcETH}>
                    <h5 className={style.h5}>Swap</h5>
                    <h5 className={style.opacity}>Network: {chainName}</h5>
                    <h6 className={style.opacity}>{defaultAccount ? defaultAccount : 'Log to see Address'}</h6>
                    <div>
                        <label htmlFor="swapAmount" className={style.label}>ETH</label>
                        <input type="number" name="swapAmount" id="swapAmount" className={style.input} max={Number(balance).toFixed(2)} placeholder={defaultAccount ? `Max: ${Number(balance).toFixed(2)} ETH` : 'Log to interact'} step=".01" required disabled={!defaultAccount}></input>
                    </div>
                    <div>
                        <label htmlFor="forTake" className={style.label}>For cEth</label>
                        <input type="number" name="forTake" id="forTake" placeholder="0.3" className={style.input} required disabled={!defaultAccount}></input>
                    </div>
                    <button className={style.button}>{defaultAccount ? 'Interact' : 'Login to interact'}</button>
                </form>
                <form className={style.form} ref={formSwap} onSubmit={handleSubmitDai}>
                    <h5 className={style.h5}>Swap</h5>
                    <h5 className={style.opacity}>Network: {chainName}</h5>
                    <h6 className={style.opacity}>{defaultAccount ? defaultAccount : 'Log to see Address'}</h6>
                    <div>
                        <label htmlFor="swapAmount" className={style.label}>cDAI for DAI</label>
                        <input type="number" name="swapAmount" id="swapAmount" className={style.input} placeholder={defaultAccount ? `${Number(balanceCDAI).toFixed(2)} cDAI, rate 1 cDAI = ${Number(exchangeRateDAI).toFixed(3)} DAI` : 'Log to interact'} step=".01" required disabled={true}></input>
                    </div>
                    <button className={style.button}>{defaultAccount ? 'Swap' : 'Login to interact'}</button>
                </form>
                <form className={style.form} ref={formSwap} onSubmit={handleSubmitCDAI}>
                    <h5 className={style.h5}>Swap</h5>
                    <h5 className={style.opacity}>Network: {chainName}</h5>
                    <h6 className={style.opacity}>{defaultAccount ? defaultAccount : 'Log to see Address'}</h6>
                    <div>
                        <label htmlFor="token" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
                        <select id="token" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="cETH">ETH to cETH</option>
                        <option value="ETH">cETH to ETH</option>
                        <option value="cDAI" selected>DAI to cDAI</option>
                        <option value="DAI">cDAI to DAI</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="swapAmount" className={style.label}>DAI</label>
                        <input type="number" name="swapAmount" id="swapAmount" className={style.input} max={Number(balance1).toFixed(2)} placeholder={defaultAccount ? `Max: ${Number(balance1).toFixed(2)} DAI` : 'Log to interact'} step=".01" required disabled={!defaultAccount}></input>
                    </div>
                    <div>
                        <label htmlFor="forTake" className={style.label}>For cDAI</label>
                        <input type="number" name="forTake" id="forTake" placeholder="0.3" className={style.input} required disabled={!defaultAccount}></input>
                    </div>
                    <button className={style.button}>{defaultAccount ? 'Interact' : 'Login to interact'}</button>
                </form>
            </div>
       
  )
}

export default CardTrade