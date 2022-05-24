import { useContext } from "react"
import { UserContext } from "../context/UserProvider"

const ConnectUser = () => {

    const { defaultAccount, onClickConnect , onClickDisconnect , balance } = useContext(UserContext)
    
    return (
            <button type="button" onClick={defaultAccount ==='0x5c0db99e9b4bacd45df713fa0e8843664a8f9f25' ? onClickConnect : defaultAccount ? onClickDisconnect : onClickConnect} className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">{defaultAccount === '0x5c0db99e9b4bacd45df713fa0e8843664a8f9f25' ? 'Connect' : defaultAccount ? `${balance} ETH` : 'Connect' }</button> 
    )
}

export default ConnectUser