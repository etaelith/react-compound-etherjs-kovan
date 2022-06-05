import { createContext, useEffect, useState } from "react"
import { ethers } from "ethers"
export const UserContext = createContext()

const UserProvider = ({children}) => {
    const [user, setUser] = useState(false)
    const [defaultAccount, setDefaultAccount] = useState(
      '0x5c0db99e9b4bacd45df713fa0e8843664a8f9f25'
      )
    const [balance, setBalance] = useState(null)
    const [chainId, setChainId] = useState(null)
    const [chainName, setChainName] = useState(null)
    
    const signIn = () => setUser(true)

    const signOut = () => setUser(false)
    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    
    useEffect(() => {
      if(!window.ethereum) 
      return
            setListener(window.ethereum)
            setWallet(window.ethereum)
            provider.getBalance(defaultAccount).then((result) =>{
              setBalance(ethers.utils.formatEther(result))
            })
            provider.getNetwork().then((result) =>{
              setChainId(result.chainId)
              setChainName(result.name)
            })
            
      return () => {
              removeListener(window.ethereum)
              removeWallet(window.ethereum)
            }
      // eslint-disable-next-line
    },[defaultAccount])

    const onClickConnect = () => {
      provider.send('eth_requestAccounts', [])
      .then((accounts) =>{
        if(accounts.length > 0) setDefaultAccount(accounts[0])
        console.log(`Connect ${accounts[0]}`)
      })
      .catch((e) => console.log(e))
    }

    const onClickDisconnect = () => {
      console.log('click disconnect')
      setBalance(null)
      setDefaultAccount('0x5c0db99e9b4bacd45df713fa0e8843664a8f9f25')
    }
    //Reload page when chain change, recommended by the documentation
    const setListener = (ethereum) => {
      ethereum.on('chainChanged', pageReload);
    }
    const removeListener = (ethereum) => {
      ethereum.removeListener('chainChanged', pageReload)
    }
    const pageReload = () => {
      window.location.reload()
    }
    //Event account change
    const setWallet = (ethereum) => {
      ethereum.on('accountsChanged', walletReload);
    }
    const removeWallet = (ethereum) => {
      ethereum.removeListener('accountsChanged', walletReload)
    }
    const walletReload = () => {
      provider.send('eth_requestAccounts', [])
      .then((accounts) =>{
        if(accounts.length > 0) setDefaultAccount(accounts[0])
        console.log(`Swap to ${accounts[0]}`)
      })
      .catch((e) => console.log(e))
    }
  return (
    <UserContext.Provider value={
      {
        user, 
        signIn, 
        signOut,
        defaultAccount,
        setDefaultAccount,
        balance,
        onClickConnect,
        onClickDisconnect,
        chainId,
        chainName,
        provider
      }}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider

