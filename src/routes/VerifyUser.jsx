import { useContext } from "react"
import { UserContext } from "../context/UserProvider"
import Loged from "../utils/Loged"

const VerifyUser = ({children}) => {

    const {user} = useContext(UserContext)

    if(!user){
        return <Loged/>
    }
  return <>{children}</>
}

export default VerifyUser