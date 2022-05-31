import { useContext } from "react"
import { UserContext } from '../context/UserProvider'
import ConnectUser from "./ConnectUser"

const style = {
    buttonMode : `flex items-center text-gray-500 bg-gray-300 dark:bg-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl text-sm p-2.5 cursor-pointer`,
}

const LogUser = () => {
    const {user, signIn, signOut} = useContext(UserContext)
    
    return (
        <>
            <div className="flex flex-wrap items-center justify-center">
                
                {
                    user ? (
                        <>  
                            <ConnectUser/>
                            <button type="button" onClick={signOut} className={style.buttonMode}>Out Web3</button>
                        </>
                    ) :
                    (   
                        <button type="button" onClick={signIn} className={style.buttonMode}>Web3 In</button>
                        
                    )
                }
                <h2 className="text-gray-500 dark:text-gray-400 mr-2">{user ? "On" : "Off"}</h2>
            </div>
        </>
    )
}

export default LogUser