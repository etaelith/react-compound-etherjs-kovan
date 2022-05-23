import { useContext } from "react"
import { UserContext } from '../context/UserProvider'
import ConnectUser from "./ConnectUser"
const LogUser = () => {
    const {user, signIn, signOut} = useContext(UserContext)
    return (
        <>
            <div className="flex flex-wrap items-center justify-center">
                <h2 className="text-gray-500 dark:text-gray-400 mr-2">{user ? "On" : "Off"}</h2>
                {
                    user ? (
                        <>
                            <button type="button" onClick={signOut} className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">Out Web3</button>
                            <ConnectUser/>
                        </>
                    ) :
                    (   
                        <button type="button" onClick={signIn} className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">Web3 On</button>
                        
                    )
                }
                
                    
                
            </div>
        </>
    )
}

export default LogUser