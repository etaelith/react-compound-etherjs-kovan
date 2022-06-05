import { useContext } from "react"
import { UserContext } from "../context/UserProvider"

const style = {
    buttonMode : `flex items-center text-gray-500 bg-gray-300 dark:bg-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl text-sm p-2.5 cursor-pointer`,
}

const ConnectUser = () => {

    const { defaultAccount, onClickConnect , onClickDisconnect , balance } = useContext(UserContext)
    
    return (
            <button type="button" onClick={defaultAccount ==='0x5c0db99e9b4bacd45df713fa0e8843664a8f9f25' ? onClickConnect : defaultAccount ? onClickDisconnect : onClickConnect} className={style.buttonMode}>{defaultAccount === '0x5c0db99e9b4bacd45df713fa0e8843664a8f9f25' ? 'Connect' : defaultAccount ? `${Number(balance).toFixed(2)} ETH` : 'Connect' } </button> 
    )
}

export default ConnectUser
