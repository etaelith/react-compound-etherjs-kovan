import { createContext, useState } from "react"

export const UserContext = createContext()

const UserProvider = ({children}) => {
    const [user, setUser] = useState(false)
    const [connect, setConnect] = useState(false)
    const [walletAddress, setWalletAddress] = useState('')
    const { ethereum } = window
    
    const signIn = () => setUser(true)

    const signOut = () => setUser(false)

    const requestAccount = async() => {
      if(ethereum){
        setConnect(true)
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
          });
          setWalletAddress(accounts[0])
          console.log(accounts)
        } catch(error){
          alert(error.message)
          console.log(error)
        }
      } else {
        setConnect(false)
        alert('MetaMask not detected')
      }
    }

  return (
    <UserContext.Provider value={
      {
        user, 
        signIn, 
        signOut,
        connect,
        requestAccount,
        walletAddress
      }}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider

