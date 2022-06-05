import { ethers } from "ethers"
import { createContext, useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"

export const ContractContext = createContext()

const ContractProvider = ({children}) => {
    const {defaultAccount,provider,balance} = useContext(UserContext)
    const [exchangeRateCERC,setExchangeRateCERC] = useState(null)
    const [placeholder,setPlaceholder] = useState(null)
    const [abi, setAbi] = useState()
    const [contract,setContract] = useState()
    const signer = provider.getSigner()
    //cETH
    const addressContractcETH = '0x41b5844f4680a8c38fbb695b7f9cfd1f64474a72'
    const abicETH = require('../utils/abicETH.json')
    //cDAI
    const addressContractcDAI = '0xF0d0EB522cfa50B716B3b1604C4F0fA6f04376AD'
    const abicDAI = require('../utils/abicDAI.json')
    //DAI
    const addressContractDAI = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa'
    const abiDAI = require('../utils/abiDAI.json')
    
    const [uiTag, setUiTag] = useState({
        tokenValue: 'ETH',
        swapValue: 'cETH',
        handleDisabled : false,
      })
    const [balSwap, setBalSwap] = useState({
        swapAmount: '',
        rateValue: '',
        token: ''
      })
      //change Token for interact
      const handleChange = e => {
        e.preventDefault()
        setBalSwap({
          ...balSwap,
          [e.target.name] : e.target.value
        })
        setUiTag({...uiTag, placeholderClean : true})
        setUiTag({...uiTag, placeholderClean : false})
    }
    //Exchange Value = swapAmount * exchangeRATEERC
    useEffect(() => {
    setBalSwap({...balSwap, rateValue: Number(balSwap.swapAmount) * exchangeRateCERC})
    // eslint-disable-next-line
    },[balSwap.swapAmount])
    //change TokenUI
    useEffect(() => {
    swapToken(balSwap.token)
    // eslint-disable-next-line
    },[balSwap.token])

    //set values for swap
    const swapToken = (token) => {
    switch (token) {

        case 'dai':
        setUiTag({...uiTag, tokenValue : 'DAI',swapValue : 'cDAI'})
        exchangeERC20(addressContractcDAI,abicDAI,provider)
        checkDAIbal(addressContractDAI,abicDAI,provider)
        setAbi(abiDAI)
        setContract(addressContractDAI)
        break;

        case 'cdai':
        setUiTag({...uiTag, tokenValue : 'cDAI',swapValue : 'DAI'})
        exchangeRateERC(addressContractcDAI,abicDAI,provider)
        checkBalance(addressContractcDAI,abicDAI,provider)
        setAbi(abicDAI)
        setContract(addressContractcDAI)
        break;

        default:
        setUiTag({...uiTag, tokenValue : 'ETH',swapValue : 'cETH'})
        exchangeERC20(addressContractcETH,abicETH,provider)
        setPlaceholder(Number(balance).toFixed(2))
        setAbi(abicETH)
        setContract(addressContractcETH)
        }
    }
    // exchange rate cERC 2 ERC
    const exchangeRateERC = async(addressContract,abi,provider) => {
        let cERCContract = new ethers.Contract(addressContract,abi,provider)
        let ercCurrent = await cERCContract.callStatic.exchangeRateCurrent()
        let exChangeRate = ercCurrent / Math.pow(10,18+18-8)
        setExchangeRateCERC(exChangeRate)
    }
    // exchange rate ERC 2 cERC 
    const exchangeERC20 = async(addressContract,abi,provider) => {
        let cERCContract = new ethers.Contract(addressContract,abi,provider)
        let ercCurrent = await cERCContract.callStatic.exchangeRateCurrent()
        let exChangeRate = ercCurrent / Math.pow(10,18+18-8)
        let val = 1 / exChangeRate
        setExchangeRateCERC(val)
    }
  
    // EXCHANGE LOGIC 
    // cERC balance
    const checkBalance = async(addressContract,abi,provider) => {
        let ercBal = new ethers.Contract(addressContract,abi,provider)
        ercBal.callStatic.balanceOf(defaultAccount)
        .then((result) => {
            setPlaceholder(Number(ethers.utils.formatUnits(result,8)).toFixed(2))
        })
    }
    // DAI balance
    const checkDAIbal = (addressContract,abi,provider) => {
        let ercDAI = new ethers.Contract(addressContract,abi,provider);
        ercDAI.balanceOf(defaultAccount)
        .then((result) => {
            let number = ethers.utils.formatUnits(result, 18)
            setPlaceholder(Number(number).toFixed(2))
        })
        .catch('error',console.error)
    }

    // handleSwap
    const handleSubmit = async(e) =>{
        e.preventDefault()
        setUiTag({...uiTag, handleDisabled : true})
        //cdai 2 dai
        if(balSwap.token === 'cdai'){
        let bal = ethers.utils.parseUnits(balSwap.swapAmount,8)
        let cERCContract = new ethers.Contract(contract,abi,signer)
        let tx = await cERCContract.redeem(bal)
        await tx.wait(1)
        console.log(`cDAI to DAI successful`)
        }
        //dai 2 cdai
        if(balSwap.token === 'dai'){
            let bal = balSwap.swapAmount * Math.pow(10,18)
            let daiContract = new ethers.Contract(contract,abi, signer)
            let tx = await daiContract.approve(addressContractcDAI, bal.toString())
            await tx.wait(1)
            let cERCContract = new ethers.Contract(addressContractcDAI,abicDAI,signer)
            tx = await cERCContract.mint(bal.toString())
            await tx.wait(1)
            console.log(`cDAI MINT successful`)
        }
        //eth 2 ceth
        if(balSwap.token === 'eth'){
            let cERCContract = new ethers.Contract(contract, abi, signer)
            let tx = await cERCContract.mint({
                value: ethers.utils.parseUnits(balSwap.swapAmount, 'ether')
            })
            await tx.wait(1)
            console.log(`cETH MINT successful`)
        }
        setUiTag({...uiTag, handleDisabled : false})

    }
  return (
      <ContractContext.Provider value={
          {
            exchangeRateCERC,
            handleChange,
            uiTag,
            balSwap,
            placeholder,
            handleSubmit,
      }}>
          {children}
      </ContractContext.Provider>
    )
}

export default ContractProvider