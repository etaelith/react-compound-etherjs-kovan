import { useContext } from "react"
import { UserContext } from "../context/UserProvider"
import CardTrade from "../components/CardTrade"
import Loged from "../utils/Loged"

const VerifyUser = () => {

    const {user} = useContext(UserContext)

    if(!user){
        return <Loged/>
    }
  return <CardTrade/>
}

export default VerifyUser