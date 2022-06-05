import { createContext, useContext,useEffect,useState} from "react";
import { ethers } from "ethers";

import { UserContext } from "./UserProvider";

export const WalletContext = createContext()

const WalletProvider = ({children}) => {

    const {defaultAccount} = useContext(UserContext)

  //cDAI
  const [totalSupplycDAI, setTotalSupplycDAI] = useState()
  const [symbolcDAI, setSymbolcDAI] = useState('')
  const [balanceERCcDAI, setBalanceERCcDAI] = useState()
  const addressContractcDAI = '0xF0d0EB522cfa50B716B3b1604C4F0fA6f04376AD'
  const abicDAI = require('../utils/abicDAI.json')
  
  //cETH
  const [totalSupplycETH, setTotalSupplycETH] = useState()
  const [symbolcETH, setSymbolcETH] = useState('')
  const [balanceERCcETH, setBalanceERCcETH] = useState()
  const addressContractcETH = '0x41b5844f4680a8c38fbb695b7f9cfd1f64474a72'
  const abicETH = require('../utils/abicETH.json')

  //date cERC to ReadERC20.jsx
  useEffect(() => {
    if(!window.ethereum) 
    return
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          //cDAI
          //symbol
          const erccDAI = new ethers.Contract(addressContractcDAI, abicDAI, provider);
          erccDAI.symbol().then((result) => {
            setSymbolcDAI(result)
          }).catch('error', console.error)
          //supply
          erccDAI.totalSupply().then((result) =>{
            setTotalSupplycDAI(ethers.utils.formatUnits(result,8))
          }).catch('error', console.error)
          //balance
          erccDAI.balanceOf(defaultAccount)
              .then((result) => {
                  setBalanceERCcDAI(ethers.utils.formatUnits(result, 8))
              })
              .catch('error',console.error)
          //cETH
          //symbol
          const erccETH = new ethers.Contract(addressContractcETH, abicETH, provider);
          erccETH.symbol().then((result) => {
            setSymbolcETH(result)
          }).catch('error', console.error)
          //supply
          erccETH.totalSupply().then((result) =>{
            setTotalSupplycETH(ethers.utils.formatUnits(result,8))
          }).catch('error', console.error)
          //balance
          erccETH.balanceOf(defaultAccount)
              .then((result) => {
                  setBalanceERCcETH(ethers.utils.formatUnits(result, 8))
              })
              .catch('error',console.error)
    // eslint-disable-next-line
  },[defaultAccount])

  
  return (
        <WalletContext.Provider value={{
            totalSupplycDAI,
            totalSupplycETH,
            symbolcDAI,
            symbolcETH,
            balanceERCcDAI,
            balanceERCcETH,
            addressContractcDAI,
            addressContractcETH
        }}>
            {children}
        </WalletContext.Provider>
  )
}
export default WalletProvider